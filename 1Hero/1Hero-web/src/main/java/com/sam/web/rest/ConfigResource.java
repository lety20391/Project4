/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.MediaType;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("config")
@RequestScoped
public class ConfigResource {

    private final String rootURL = "http://localhost:34828/1Hero-web/";
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ConfigResource
     */
    public ConfigResource() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ConfigResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map getJSON() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        Map urlResource = new HashMap();
        
        //list url API here
        urlResource.put("productResourceAPI", rootURL + "rest/product");
        urlResource.put("serviceResourceAPI", rootURL + "rest/service");
        urlResource.put("datingResourceAPI", rootURL + "rest/dating");
        
        
        System.out.println("-----Url Resource------");
        System.out.println(urlResource.toString());
        return urlResource;
    }

    /**
     * PUT method for updating or creating an instance of ConfigResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
