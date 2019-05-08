/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.google.gson.Gson;
import com.sam.ejb.PetSessionBean.PetManageSessionBeanLocal;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("Pet")
@RequestScoped
public class ManagePet {

    @Context
    private UriInfo context;
    
    @EJB
    PetManageSessionBeanLocal petManageSessionBeanLocal;

    /**
     * Creates a new instance of ManagePet
     */
    public ManagePet() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManagePet
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<PetEntity> getJSON() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return petManageSessionBeanLocal.listAll();
    }
    
    @POST
    @Path("/Post")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewPet(PetEntity newPet) {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        PetEntity returnPet = petManageSessionBeanLocal.addNew(newPet);
        return Response.ok().entity(new Gson().toJson(returnPet)).build();
    }

    /**
     * PUT method for updating or creating an instance of ManagePet
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
