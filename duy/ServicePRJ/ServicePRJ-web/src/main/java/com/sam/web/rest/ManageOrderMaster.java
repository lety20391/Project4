/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.OrderMasterSessionBean.OrderMasterSessionBeanLocal;
import com.sam.ejb.entity.OrderMasterEntity;
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
@Path("OrderMaster")
@RequestScoped
public class ManageOrderMaster {

    @Context
    private UriInfo context;

        @EJB
        OrderMasterSessionBeanLocal orderMasterSessionBeanLocal;
    /**
     * Creates a new instance of ManageOrderMaster
     */
    public ManageOrderMaster() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageOrderMaster
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<OrderMasterEntity> getJson() {
        //TODO return proper representation object
        return orderMasterSessionBeanLocal.listAll();
    }

    
    //Add new booking detail
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewBookingDetail(OrderMasterEntity ordermaster){
        orderMasterSessionBeanLocal.addOrderMaster(ordermaster);
        return Response.status(200).entity(ordermaster).build();
    }
    
    //Find one by Id
    @GET
    @Path("{omID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("omID") Long omID){
        return Response.status(200).entity(orderMasterSessionBeanLocal.findOne(omID)).build();
    }
    
    //Modify booking detail
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBookingDetail(OrderMasterEntity orderMaster) {
        orderMasterSessionBeanLocal.editOrderMaster(orderMaster);
        return Response.status(200).entity(orderMaster).build();
    }
    
    //Delete booking detail
    @DELETE
    @Path("{omID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("omId") Long omId){
        orderMasterSessionBeanLocal.deleteOrderMaster(omId);
        return Response.status(200).entity(new OrderMasterEntity()).build();
    }
}
