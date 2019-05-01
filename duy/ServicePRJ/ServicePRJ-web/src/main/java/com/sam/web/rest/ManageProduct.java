/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.ProductSessionBean.ProductSessionBeanLocal;
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

/**
 * REST Web Product
 *
 * @author DuDu
 */
@Path("Product")
@RequestScoped
public class ManageProduct {

    @Context
    private UriInfo context;
    @EJB
    ProductSessionBeanLocal productSessionBeanLocal;
    /**
     * Creates a new instance of ProductResource
     */
    public ManageProduct() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ProductResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<productEntity> getJson() {
        //TODO return proper representation object
        return productSessionBeanLocal.listAll();
    }

    
    //Add new Product
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewProduct(productEntity product){
        productSessionBeanLocal.addProduct(product);
        return Response.status(200).entity(product).build();
    }
    
    //Find one by Id
    @GET
    @Path("{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("productId") Long productId){
        return Response.status(200).entity(productSessionBeanLocal.findOne(productId)).build();
    }
    
    //Modify product
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProduct(productEntity product) {
        productSessionBeanLocal.editProduct(product);
        return Response.status(200).entity(product).build();
    }
    
    //Delete product
    @DELETE
    @Path("{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteById(@PathParam("productId") Long productId){
        productSessionBeanLocal.deleteProduct(productId);
        return Response.status(200).entity(new productEntity()).build();
    }
}