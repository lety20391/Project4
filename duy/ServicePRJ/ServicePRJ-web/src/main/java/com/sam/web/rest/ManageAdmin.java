/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.AdminSessionBean.AdminSessionBeanLocal;
import com.sam.ejb.entity.AdminEntity;
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
@Path("admin")
@RequestScoped
public class ManageAdmin {

    @Context
    private UriInfo context;
    @EJB
    AdminSessionBeanLocal adminSessionBeanLocal;
    /**
     * Creates a new instance of ManageAdmin
     */
    public ManageAdmin() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageAdmin
     * @return an instance of java.lang.String
     */
   @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<AdminEntity> getJson() {
        //TODO return proper representation object
        return adminSessionBeanLocal.listAll();
    }

    
    //Add new Service
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewAdmin(AdminEntity user){
        adminSessionBeanLocal.addAdmin(user);
        return Response.status(200).entity(user).build();
    }
    
    //Find one by Id
    @GET
    @Path("{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("userId") Long userId){
        return Response.status(200).entity(adminSessionBeanLocal.findOne(userId)).build();
    }
    
    //Modify service
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateAdmin(AdminEntity admin) {
        adminSessionBeanLocal.editAdmin(admin);
        return Response.status(200).entity(admin).build();
    }
    
    //Delete service
    @DELETE
    @Path("{AdminId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("AdminId") Long AdminId){
        adminSessionBeanLocal.deleteAdmin(AdminId);
        return Response.status(200).entity(new AdminEntity()).build();
    }
}
