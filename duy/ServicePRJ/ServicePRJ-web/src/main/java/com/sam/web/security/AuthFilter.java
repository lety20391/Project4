/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;

/**
 *
 * @author Dat Le
 */
@PreMatching
public class AuthFilter implements ContainerRequestFilter{

    private static final String BEARER = "Bearer ";
    private static String whitelistURL[] = new String [] {
                                                            "/tokens",
                                                            "/BookingDetail/getAll"    
                                                        };
    private static final List<String> WHITELISTED = Arrays.asList(whitelistURL);
    private final Logger logger = Logger.getLogger(getClass().getName());

    private JWTIdentityStore jwtIdentityStore = new JWTIdentityStore();

//    @Inject
//    JWTStore jwtStore;
    //private IdentityStore identityStore = new IdentityStore();
    private JWTStore jwtStore = new JWTStore();
    private String logClass = "---AUTHFILTER: ";
    
    @Override
    public void filter(ContainerRequestContext req) throws IOException {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println(logClass + "Validating Request URL: " + req.getUriInfo());
    	//logger.info( () -> "Validating " + req.getPathInfo());

        String authorizationHeader = req.getHeaderString(AUTHORIZATION);
        String requestMethod = req.getMethod();
        System.out.println(logClass + "Header: "+ authorizationHeader +"----");
        System.out.println(logClass + "Http Request Method: " + requestMethod + "-----");
        JWTCredential credential = null;
        
        if(requestMethod.equals("OPTIONS")){
            System.out.println(logClass + "This is pre-light Request: OK----");
            return;
        }

        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER)) {
            System.out.println(logClass + "Check Authen Token----");
            String token = authorizationHeader.substring(BEARER.length());
            credential = this.jwtStore.getCredential(token);
        }

        if (credential != null) {
            System.out.println(logClass + "Valid credential----");
            String name = credential.getCaller();
            Set roleSet = credential.getGroups();
            List<String> roleList = new ArrayList<>();
            for (Object role : roleSet) {
                roleList.add(role.toString());
            }
            User currentUser = new User(name, roleList);
            
            System.out.println(logClass + "Set SecurityContext");
            String scheme = req.getUriInfo().getRequestUri().getScheme();
            System.out.println(logClass + " User: " + currentUser.getName() + " Role:" + currentUser.getRole().toString());
            req.setSecurityContext(new JerseySecurity(currentUser, scheme));
        } else {
            System.out.println(logClass + "InValid credential----");
            if (WHITELISTED.contains(req.getUriInfo())) {
                System.out.println(logClass + "This is whitelist URL---");
            	return;
            } else {
            	return;
            }
        }
    }
    
}
