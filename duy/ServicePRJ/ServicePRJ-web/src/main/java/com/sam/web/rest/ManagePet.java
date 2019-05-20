/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.google.gson.Gson;
import com.sam.ejb.PetSessionBean.PetManageSessionBeanLocal;
import com.sam.ejb.entity.PetEntity;
import com.sam.ejb.entity.productEntity;
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
    
    private final String logClass = "--Manage Pet: ";

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
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PetEntity> getJSON() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return petManageSessionBeanLocal.listAll();
    }
    
    @GET
    @Path("/list/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PetEntity> getPetOfUser(@PathParam("userID") Long userID) {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return petManageSessionBeanLocal.listPetOfUser(userID);
    }
    
    @GET
    @Path("/list/Except/{userID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PetEntity> getPetExceptUser(@PathParam("userID") Long userID) {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return petManageSessionBeanLocal.listPetExceptUser(userID);
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
    
    //Find one by Id
    @GET
    @Path("/getDetail/findID/{petId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("petId") Long petID){
        PetEntity searchPet = petManageSessionBeanLocal.findOne(petID);
        if (searchPet == null)
            return Response.status(404).entity("Pet Not Found").build();
        System.out.println("--Managepet : " + searchPet.getPetName());
        return Response.status(200).entity(searchPet).build();
    }

    /**
     * PUT method for updating or creating an instance of ManagePet
     * @param content representation for the resource
     */
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public PetEntity updatePet(PetEntity updatedPet) {
        System.out.println(logClass + " update Pet: " + updatedPet.getPetName());
        return petManageSessionBeanLocal.editPet(updatedPet);
    }
}
