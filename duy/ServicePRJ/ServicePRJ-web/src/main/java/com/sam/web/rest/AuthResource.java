/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.UserSessionBean.UserManageSessionBeanLocal;
import com.sam.ejb.entity.UserEntity;
import com.sam.web.security.JWTStore;
import com.sam.web.security.MobileService;
import com.sam.web.security.User;
import java.util.Arrays;
import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.OPTIONS;
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
@Path("tokens")
@RequestScoped
public class AuthResource {

    @Context
    private UriInfo context;
    
    @EJB
    UserManageSessionBeanLocal userManageSessionBeanLocal;

    private JWTStore jwtStore;
    private MobileService mobileService = new MobileService();
    private String logClass= "--AuthResource: ";
    /**
     * Creates a new instance of AuthResource
     */
    public AuthResource() {
    }
    
    @OPTIONS
    @Produces(MediaType.APPLICATION_JSON)
    public Response resToRequest(){
        return Response.ok().build();
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.AuthResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return "Auth Resource";
    }

    /**
     * PUT method for updating or creating an instance of AuthResource
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
            UserEntity returnUser = userManageSessionBeanLocal.getUserByPhone(phone);
            if (returnUser.getKeyCode().equals(password)){
                //login success
                //xoa keyCode trong database
                returnUser.setKeyCode("");
                userManageSessionBeanLocal.updateUser(returnUser);
                
                // TODO: Groups should retrieve from database based on authenticate user.
                //String token = this.jwtStore.generateToken(username, Arrays.asList("ADMIN", "MEMBER"));
                String token = this.jwtStore.generateToken(returnUser.getUserName(), Arrays.asList("MEMBER"));
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
            UserEntity returnUser = userManageSessionBeanLocal.getUserByPhone(phone);
            
            //tao code random
            RandomStringGenerator generator = new RandomStringGenerator.Builder()
                    .withinRange('0', 'z').filteredBy(LETTERS, DIGITS).build();
            String smsCode = generator.generate(6);
            
            //set code vao user nay roi update user
            returnUser.setKeyCode(smsCode);
            //update user nay len database de luu code vao database
            UserEntity userAfterCodeSaved = userManageSessionBeanLocal.updateUser(returnUser);
            
            System.out.println(logClass + " code update: " + userAfterCodeSaved.getKeyCode() );
            
            mobileService.getMobileCode(smsCode, phone);
            return Response.ok().entity(returnUser.getUserID()).build();            
        }
        return Response.noContent().build();
    }
    
}
