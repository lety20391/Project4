/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.UserSessionBean.UserManageSessionBeanLocal;
import com.sam.ejb.entity.UserEntity;
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
@Path("User")
@RequestScoped
public class ManageUser {

    @Context
    private UriInfo context;
    @EJB
    UserManageSessionBeanLocal userManageSessionBeanLocal;
    /**
     * Creates a new instance of ManageUser
     */
    public ManageUser() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageUser
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserEntity> getListUser() {
        //TODO return proper representation object
        return userManageSessionBeanLocal.listAll();
    }

    
    //Add new Service
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewUser(UserEntity newUser){
        UserEntity returnUser = userManageSessionBeanLocal.getUserByPhone(newUser.getUserTel());
        if(returnUser.getUserTel() == "0000000000" )
        {userManageSessionBeanLocal.addUser(newUser);
        return Response.status(200).entity(newUser).build();
        }else
            return Response.status(321).build();
    }
    
    //Find one by Id
    @GET
    @Path("getDetail/findID/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("userId") Long userId){
        return Response.status(200).entity(userManageSessionBeanLocal.findOne(userId)).build();
    }
    
    //Modify service
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(UserEntity service) {
        //userSessionBeanLocal.editUser(service);
        return Response.status(200).entity(service).build();
    }
    
    //Delete service
    @DELETE
    @Path("{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("userId") Long userId){
        //userSessionBeanLocal.deleteUser(userId);
        return Response.status(200).entity(new UserEntity()).build();
    }
}
