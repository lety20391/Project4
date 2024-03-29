/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.google.gson.Gson;
import com.sam.ejb.OrderDetailSessionBean.OrderDetailSessionBeanLocal;
import com.sam.ejb.entity.OrderDetailEntity;
import com.sam.ejb.entity.ReportObject;
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
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author DuDu
 */
@Path("TopSeller")
@RequestScoped
public class ManageTopSeller {

    @EJB
    OrderDetailSessionBeanLocal orderDetailSessionBeanLocal;
    @Context
    private UriInfo context;
    
    private final String logClass = "--Manage Top Seller: ";

    /**
     * Creates a new instance of ManageTopSeller
     */
    public ManageTopSeller() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageTopSeller
     * @return an instance of java.lang.String
     */
    @Path("/list")
   @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTopSeller() {
        System.out.println(logClass + " get Top Seller");
        return Response.status(200).entity( new Gson().toJson( orderDetailSessionBeanLocal.listTop())).build();
    }

    /**
     * PUT method for updating or creating an instance of ManageTopSeller
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
