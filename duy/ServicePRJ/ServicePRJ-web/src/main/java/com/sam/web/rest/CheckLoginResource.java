/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.google.gson.Gson;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("CheckLogin")
@RequestScoped
public class CheckLoginResource {

    @Context
    private UriInfo context;
    
    @Context
    SecurityContext sc;

    /**
     * Creates a new instance of CheckLoginResource
     */
    public CheckLoginResource() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.CheckLoginResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkLoginByJWT() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        String userPhone = sc.getUserPrincipal().getName();
        return Response.status(200).entity(new Gson().toJson(userPhone)).build();
    }

    /**
     * PUT method for updating or creating an instance of CheckLoginResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
