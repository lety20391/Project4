/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.manageBean;

import com.sam.web.temp.JWTStore;
import java.io.Serializable;
import java.util.Arrays;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Named;
import javax.servlet.http.HttpServletResponse;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import javax.ws.rs.core.Response;
import org.apache.commons.text.RandomStringGenerator;
import static org.apache.commons.text.CharacterPredicates.DIGITS;
import static org.apache.commons.text.CharacterPredicates.LETTERS;

/**
 *
 * @author Dat Le
 */
@ManagedBean(name="loginManagedBean")
@SessionScoped
public class LoginManagedBean implements Serializable{
    
    private String phone = "";
    private String pass = "";
    private String code = "";
    private MobileService mobileService = new MobileService();
    private JWTStore jwtStore;
    
    @PostConstruct
    public void init(){
        //this.name = "test";
        //this.pass= "test";
        System.out.println("Init Current User: " + phone);
    }
    
    public Response checkLogin(){
        System.out.println("-----LoginMB: checkLogin()-------");
        System.out.println("Current User: " + phone + "-" + pass);
        
        jwtStore = new JWTStore();
        // TODO: Groups should retrieve from database based on authenticate user.
        String token = this.jwtStore.generateToken(phone, Arrays.asList("ADMIN", "MEMBER"));
        //logger.info( () -> MessageFormat.format("Token={0}", token));
        System.out.println(token);
        
        if ( "abc".equals(pass)){
            System.out.println("--CheckLogin(): OK---");
            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
        }
        return Response.serverError().build();
    }
    
    public void getCode(){
        //generate random alpha numeric key
        RandomStringGenerator generator = new RandomStringGenerator.Builder().withinRange('0', 'z').filteredBy(LETTERS, DIGITS).build();
        this.code = generator.generate(6);
        System.out.println("----ManagedBean: getCode(): " + this.code);
        mobileService.getMobileCode(this.code, this.phone);
        //return "Login";
    }
    

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }    

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
    
    
}
