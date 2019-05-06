/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.entity.serviceEntity;
import com.sam.ejb.sessionbean.ServiceSessionBeanLocal;
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
import javax.print.attribute.standard.DateTimeAtCompleted;
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
@Path("Service")
@RequestScoped
public class ManageService {

    @Context
    private UriInfo context;
    @EJB
    ServiceSessionBeanLocal serviceSessionBeanLocal;
    /**
     * Creates a new instance of ManageService
     */
    public ManageService() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageService
     * @return an instance of java.lang.String
     */
    //Get list service
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<serviceEntity> getJson() {
        //TODO return proper representation object
        return serviceSessionBeanLocal.listAll();
    }

    
    //Add new Service
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewService(serviceEntity service){
        serviceSessionBeanLocal.addService(service);
        return Response.status(200).entity(service).build();
    }
    
    //Find one by Id
    @GET
    @Path("{serviceId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("serviceId") Long serviceId){
        return Response.status(200).entity(serviceSessionBeanLocal.findOne(serviceId)).build();
    }
    
    //Modify service
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateService(serviceEntity service) {
        serviceSessionBeanLocal.editService(service);
        return Response.status(200).entity(service).build();
    }
    
    //Delete service
    @DELETE
    @Path("{serviceId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("serviceId") Long serviceId){
        serviceSessionBeanLocal.deleteService(serviceId);
        return Response.status(200).entity(new serviceEntity()).build();
    }
    
    
}
