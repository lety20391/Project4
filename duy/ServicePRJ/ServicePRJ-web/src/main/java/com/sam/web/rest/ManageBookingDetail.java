/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.entity.bookingDetailEntity;
import com.sam.ejb.sessionbean.bookingDetailSessionBeanLocal;
import java.util.List;
import javax.annotation.security.RolesAllowed;
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
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author DuDu
 */
@Path("BookingDetail")
@RequestScoped
public class ManageBookingDetail {

    @Context
    private UriInfo context;

    @EJB
    bookingDetailSessionBeanLocal bookingDetailSessionBeanLocal;
    /**
     * Creates a new instance of ManageBookingDetail
     */
    public ManageBookingDetail() {
    }
    
    @OPTIONS
    @Produces(MediaType.APPLICATION_JSON)
    public Response resToRequest(){
        return Response.ok().build();
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageBookingDetail
     * @return an instance of java.lang.String
     */
    //List all booking detail
    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<bookingDetailEntity> getJson() {
        //TODO return proper representation object
        return bookingDetailSessionBeanLocal.listAll();
    }
    
    @RolesAllowed("ADMIN")
    @GET
    @Path("/getBy")    
    @Produces(MediaType.APPLICATION_JSON)
    public List<bookingDetailEntity> getBy() {
        //TODO return proper representation object
        return bookingDetailSessionBeanLocal.listAll();
    }

    
    //Add new booking detail
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewBookingDetail(bookingDetailEntity service){
        bookingDetailSessionBeanLocal.addBookingDetail(service);
        return Response.status(200).entity(service).build();
    }
    
    //Find one by Id
    @GET
    @Path("{bdID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("bdId") Long bdId){
        return Response.status(200).entity(bookingDetailSessionBeanLocal.findOne(bdId)).build();
    }
    
    //Modify booking detail
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBookingDetail(bookingDetailEntity service) {
        bookingDetailSessionBeanLocal.editBookingDetail(service);
        return Response.status(200).entity(service).build();
    }
    
    //Delete booking detail
    @DELETE
    @Path("{bdID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("bdId") Long bdId){
        bookingDetailSessionBeanLocal.deleteBookingDetail(bdId);
        return Response.status(200).entity(new bookingDetailEntity()).build();
    }
}
