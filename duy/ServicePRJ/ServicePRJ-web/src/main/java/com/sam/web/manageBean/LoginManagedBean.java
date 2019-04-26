/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.manageBean;

import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.view.ViewScoped;
import javax.inject.Named;
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
    
    @PostConstruct
    public void init(){
        //this.name = "test";
        //this.pass= "test";
        System.out.println("Init Current User: " + phone);
    }
    
    public String checkLogin(){
        System.out.println("-----LoginMB: checkLogin()-------");
        System.out.println("Current User: " + phone + "-" + pass);
        if ( this.code.equals(pass))
            return "success";
        return "Login";
    }
    
    public void getCode(){
        //generate random alpha numeric key
        RandomStringGenerator generator = new RandomStringGenerator.Builder().withinRange('0', 'z').filteredBy(LETTERS, DIGITS).build();
        this.code = generator.generate(6);
        System.out.println("----ManagedBean: getCode(): " + this.code);
        //mobileService.getMobileCode(this.code);
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
