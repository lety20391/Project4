/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.AdminSessionBean.AdminSessionBeanLocal;
import com.sam.ejb.entity.AdminEntity;
import com.sam.ejb.entity.UserEntity;
import com.sam.web.security.JWTStore;
import com.sam.web.security.MobileService;
import com.sam.web.security.User;
import java.util.Arrays;
import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.POST;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import static org.apache.commons.text.CharacterPredicates.DIGITS;
import static org.apache.commons.text.CharacterPredicates.LETTERS;
import org.apache.commons.text.RandomStringGenerator;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("AdminAuth")
@RequestScoped
public class AdminAuthResource {

    @Context
    private UriInfo context;
    
    @EJB
    AdminSessionBeanLocal adminSessionBeanLocal;
    
    private JWTStore jwtStore;
    private MobileService mobileService = new MobileService();
    private String logClass= "--AdminAuthResource: ";

    /**
     * Creates a new instance of AdminAuthResource
     */
    public AdminAuthResource() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.AdminAuthResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of AdminAuthResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticate(User credential) {
        System.out.println("---------API Authenticate---------");
        // TODO: Should compare user credentials on the database.
        String phone = credential.getUsername();
        String password = credential.getPassword();
        
        jwtStore = new JWTStore();
        
        //default account
        if ("dat".equals(phone) && "abc".equals(password)){
            
            // TODO: Groups should retrieve from database based on authenticate user.
            //String token = this.jwtStore.generateToken(username, Arrays.asList("ADMIN", "MEMBER"));
            String token = this.jwtStore.generateToken(phone, Arrays.asList("ADMIN"));
            //logger.info( () -> MessageFormat.format("Token={0}", token));
            System.out.println(token);
            return Response.ok().header(AUTHORIZATION, token).build();
        }else if(!phone.isEmpty() && !password.isEmpty()){
            //check account neu co ca phone va pass
            AdminEntity returnAdmin = adminSessionBeanLocal.getAdminByPhone(phone);
            if (returnAdmin.getKeyCode().equals(password)){
                //login success
                //xoa keyCode trong database
                returnAdmin.setKeyCode("");
                adminSessionBeanLocal.updateAdmin(returnAdmin);
                
                // TODO: Groups should retrieve from database based on authenticate user.
                //String token = this.jwtStore.generateToken(username, Arrays.asList("ADMIN", "MEMBER"));
                String token = this.jwtStore.generateToken(returnAdmin.getUsername(), Arrays.asList("MEMBER"));
                //logger.info( () -> MessageFormat.format("Token={0}", token));
                System.out.println(token);
                return Response.ok().header(AUTHORIZATION, token).build();
            }else{
                //sai password
                return Response.noContent().build();
            }
        }
        else if(!phone.isEmpty() && password.isEmpty()){
            //neu chi co phone chua co pass thi gui pass ve dien thoai
            
            //lay user dang su dung so phone
            AdminEntity returnAdmin = adminSessionBeanLocal.getAdminByPhone(phone);
            
            //tao code random
            RandomStringGenerator generator = new RandomStringGenerator.Builder()
                    .withinRange('0', 'z').filteredBy(LETTERS, DIGITS).build();
            String smsCode = generator.generate(6);
            
            //set code vao user nay roi update user
            returnAdmin.setKeyCode(smsCode);
            //update user nay len database de luu code vao database
            AdminEntity adminAfterCodeSaved = adminSessionBeanLocal.updateAdmin(returnAdmin);
            
            System.out.println(logClass + " code update: " + adminAfterCodeSaved.getKeyCode() );
            
            mobileService.getMobileCode(smsCode, phone);
            return Response.ok().entity(returnAdmin.getAdminID()).build();            
        }
        return Response.noContent().build();
    }
}
