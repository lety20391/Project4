/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.google.gson.Gson;
import com.sam.ejb.DatingDetailSessionBean.DatingDetailSessionBeanLocal;
import com.sam.ejb.entity.DatingDetailEntity;
import com.sam.ejb.entity.PetEntity;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.ws.spi.http.HttpContext;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("DatingDetail")
@RequestScoped
public class ManageDatingDetail {

    @Context
    private UriInfo context;
    
    @EJB
    DatingDetailSessionBeanLocal datingDetailSessionBeanLocal;
    
    private final String logClass = "--Manage Dating Detail: ";

    /**
     * Creates a new instance of ManageDatingDetail
     */
    public ManageDatingDetail() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageDatingDetail
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<DatingDetailEntity> getJSON() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        
        return datingDetailSessionBeanLocal.listAll();
    }
    
    @GET
    @Path("/list/{petID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<DatingDetailEntity> getDatingRecievedOfPet(@PathParam("petID") Long petID) {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        System.out.println(logClass + " getDatingRecievedOfPet");
        return datingDetailSessionBeanLocal.getListDatingReceivedByPetID(petID);
    }
    
    @POST
    @Path("/Post")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addDatingDetail(DatingDetailEntity newDatingDetail) {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        System.out.println(logClass + " add Dating Detail");
        DatingDetailEntity returnDating = datingDetailSessionBeanLocal.addDatingDetail(newDatingDetail);
        System.out.println(logClass + " new Dating Detail ID: " + returnDating.getDatingDetailID());
        return Response.ok().entity(new Gson().toJson(returnDating)).build();
    }

    /**
     * PUT method for updating or creating an instance of ManageDatingDetail
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
