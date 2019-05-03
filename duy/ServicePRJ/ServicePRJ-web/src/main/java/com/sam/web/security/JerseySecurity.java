/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.security;

import java.security.Principal;
import javax.ws.rs.core.SecurityContext;

/**
 *
 * @author Dat Le
 */
public class JerseySecurity implements SecurityContext{
    private User user;
    private String scheme;

    public JerseySecurity() {
    }  
    
    
    public JerseySecurity(User user, String scheme){
        this.user = user;
        this.scheme = scheme;
    }
    

    @Override
    public Principal getUserPrincipal() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return this.user;
    }

    @Override
    public boolean isUserInRole(String role) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        if(user == null)
            System.out.println("---JSecurity: User Null ");
        if (user.getRole() != null){
            System.out.println("---JSecurity:" + user.getRole().contains(role));
            return user.getRole().contains(role);
        }
        return false;
    }

    @Override
    public boolean isSecure() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return "https".equals(this.scheme);
    }

    @Override
    public String getAuthenticationScheme() {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        return SecurityContext.BASIC_AUTH;
    }
}
