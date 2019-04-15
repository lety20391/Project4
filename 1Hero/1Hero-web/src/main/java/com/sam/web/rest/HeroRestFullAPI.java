/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.core.MediaType;

import com.sam.ejb.sessionbean.TestSessionBeanLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("hero")
@RequestScoped
public class HeroRestFullAPI {

    @Context
    private UriInfo context;
    @EJB
    TestSessionBeanLocal testSessionBeanLocal;

    /**
     * Creates a new instance of HeroRestFullAPI
     */
    public HeroRestFullAPI() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.HeroRestFullAPI
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List getJSON() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
//        Map result = new HashMap();
//        List listHero = testSessionBeanLocal.listAll();
//        result.put("size", listHero.size());
//        result.put("list", listHero);
        return testSessionBeanLocal.listAll();
    }

    /**
     * PUT method for updating or creating an instance of HeroRestFullAPI
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
