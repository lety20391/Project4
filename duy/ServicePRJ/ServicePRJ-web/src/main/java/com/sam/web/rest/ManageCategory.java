/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.entity.productEntity;
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
import com.sam.ejb.CateSessionBean.CategorySessionBeanLocal;
import com.sam.ejb.entity.cateEntity;


/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("Category")
@RequestScoped
public class ManageCategory {

    @Context
    private UriInfo context;
    
    @EJB
    CategorySessionBeanLocal categorySessionBeanLocal;

    /**
     * Creates a new instance of ManageCategory
     */
    public ManageCategory() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageCategory
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<cateEntity> getJson() {
        //TODO return proper representation object
        return categorySessionBeanLocal.listAll();
    }

    
    //Add new Cate
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewProduct(cateEntity newCate){
        categorySessionBeanLocal.addCate(newCate);
        return Response.status(200).entity(newCate).build();
    }
    
    //Find one by Id
    @GET
    @Path("/getDetail/findID/{cateID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("cateID") Long cateID){
        cateEntity searchCate = categorySessionBeanLocal.findOne(cateID);
        if (searchCate == null)
            return Response.status(404).entity("Cate Not Found").build();
        System.out.println("--ManageCate: " + searchCate.getCateName());
        return Response.status(200).entity(searchCate).build();
    }
    
    //Modify product
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCategory(cateEntity updatedCate) {
        categorySessionBeanLocal.editCate(updatedCate);
        return Response.status(200).entity(updatedCate).build();
    }
    
    //Delete product
    @DELETE
    @Path("{cateID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("cateID") Long cateID){
        categorySessionBeanLocal.deleteCate(cateID);
        return Response.status(200).entity(new cateEntity()).build();
    }
}
