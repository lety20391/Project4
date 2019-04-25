/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.manageBean;

import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

/**
 *
 * @author Dat Le
 */
@ManagedBean(name="loginManagedBean")
@ViewScoped
public class LoginManagedBean implements Serializable{
    
    private String name = "";
    private String pass = "";
    
    @PostConstruct
    public void init(){
        //this.name = "test";
        //this.pass= "test";
        System.out.println("Init Current User: " + name);
    }
    
    public String checkLogin(){
        System.out.println("-----LoginMB: checkLogin()-------");
        System.out.println("Current User: " + name + "-" + pass);
        if ( "admin".equals(name) && "abc123".equals(pass))
            return "success";
        return "Login";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
    
    
}
