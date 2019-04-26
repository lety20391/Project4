/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.web.temp.JWTStore;
import com.sam.web.temp.User;
import java.text.MessageFormat;
import java.util.Arrays;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.json.JsonObject;
import javax.ws.rs.POST;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("tokens")
@RequestScoped
public class AuthResource {

    private final Logger logger = Logger.getLogger(getClass().getName());
    
    @Context
    private UriInfo context;
    
    private JWTStore jwtStore;

    /**
     * Creates a new instance of AuthResource
     */
    public AuthResource() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.AuthResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getXml() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return "AUTH Resource";
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
        String username = credential.getUsername();
        String password = credential.getPassword();
        
        jwtStore = new JWTStore();
        // TODO: Groups should retrieve from database based on authenticate user.
        String token = this.jwtStore.generateToken(username, Arrays.asList("ADMIN", "MEMBER"));
        //logger.info( () -> MessageFormat.format("Token={0}", token));
        System.out.println(token);
        if ("dat".equals(username) && "abc".equals(password))
            return Response.ok().header(AUTHORIZATION, "Bearer " + token).build();
        return Response.noContent().build();
    }
}
