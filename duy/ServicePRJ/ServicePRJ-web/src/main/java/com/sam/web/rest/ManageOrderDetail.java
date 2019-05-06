/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.OrderDetailSessionBean.OrderDetailSessionBeanLocal;
import com.sam.ejb.entity.OrderDetailEntity;
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
@Path("OrderDetail")
@RequestScoped
public class ManageOrderDetail {

    @Context
    private UriInfo context;

    @EJB
    OrderDetailSessionBeanLocal orderDetailSessionBeanLocal;
    /**
     * Creates a new instance of ManageOderDetail
     */
    public ManageOrderDetail() {
    }

    /**
     * Retrieves representation of an instance of
     * com.sam.web.rest.ManageOderDetail
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<OrderDetailEntity> getJson() {
        //TODO return proper representation object
        return orderDetailSessionBeanLocal.listAll();
    }

    
    //Add new booking detail
    @POST
    @Path("/Post")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewBookingDetail(OrderDetailEntity orderdetail){
        orderDetailSessionBeanLocal.addOrderDetail(orderdetail);
        return Response.status(200).entity(orderdetail).build();
    }
    
    //Find one by Id
    @GET
    @Path("{odID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("odID") Long odID){
        return Response.status(200).entity(orderDetailSessionBeanLocal.findOne(odID)).build();
    }
    
    //Modify booking detail
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateBookingDetail(OrderDetailEntity orderDetail) {
        orderDetailSessionBeanLocal.editOrderDetail(orderDetail);
        return Response.status(200).entity(orderDetail).build();
    }
    
    //Delete booking detail
    @DELETE
    @Path("{odID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("odId") Long odId){
        orderDetailSessionBeanLocal.deleteOrderDetail(odId);
        return Response.status(200).entity(new OrderDetailEntity()).build();
    }
}
