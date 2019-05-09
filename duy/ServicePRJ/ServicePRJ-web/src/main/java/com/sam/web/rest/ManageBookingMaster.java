/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.entity.bookingMasterEntity;
import com.sam.ejb.sessionbean.BookingMasterSessionBeanLocal;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author DuDu
 */
@Path("BookingMaster")
@RequestScoped
public class ManageBookingMaster {

    @Context
    private UriInfo context;
    @EJB
    BookingMasterSessionBeanLocal bookingMasterSessionBeanLocal;
    /**
     * Creates a new instance of ManageBookingMaster
     */
    public ManageBookingMaster() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageBookingMaster
     * @return an instance of java.lang.String
     */
    //list all booking master
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<bookingMasterEntity> getJson() {
        //TODO return proper representation object
        System.out.println("-------RestAPI ManageBMaster----");        
        return bookingMasterSessionBeanLocal.listAll();
    }

    
    //Add new booking master
    @POST
    @Path("/Post")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewBookingMaster(bookingMasterEntity service){
        bookingMasterSessionBeanLocal.addbookingMaster(service);
        return Response.status(200).entity(service).build();
    }
    
    //Find one by Id
    @GET
    @Path("{bmID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("bmId") Long bmId){
        return Response.status(200).entity(bookingMasterSessionBeanLocal.findOne(bmId)).build();
    }
    
    //Modify booking master
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBookingMaster(bookingMasterEntity service) {
        bookingMasterSessionBeanLocal.editbookingMaster(service);
        return Response.status(200).entity(service).build();
    }
    
    //Delete booking master
    @DELETE
    @Path("{bdID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("bmId") Long bmId){
        bookingMasterSessionBeanLocal.deletebookingMaster(bmId);
        return Response.status(200).entity(new bookingMasterEntity()).build();
    }
}
