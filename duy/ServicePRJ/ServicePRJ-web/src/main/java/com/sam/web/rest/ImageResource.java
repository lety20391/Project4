/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("GetImage")
@RequestScoped
public class ImageResource {

    @Context
    private UriInfo context;
    
    @Context
    SecurityContext sc;
    
    @Context
    ServletContext servletContext;
    
    private static final String logClass ="---Image Resource: ";

//    private String IMG_FOLDER = "d:/WebResources/uploadedFiles/";
    //Change folder to root folder of Glassfish server
    private String IMG_FOLDER = "/usr/local/glassfish4/glassfish/domains/domain1/applications/ServicePRJ-ear-1.0-SNAPSHOT/ServicePRJ-web-1.0-SNAPSHOT_war/WebResources/uploadedFiles/";
    /**
     * Creates a new instance of ImageResource
     */
    public ImageResource() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ImageResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("{cate}/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllImage(@PathParam("cate") String cate, 
            @PathParam("id") String id) throws IOException {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
//        String currentPath = servletContext.getRealPath("/");
//        System.out.println(logClass + " checkPath:" + currentPath);
        
        
        List<String> listFileName = new ArrayList<>();
        File folder = new File(IMG_FOLDER + cate + "/" + id);
        File[] listOfFiles = folder.listFiles();
        for (File item : listOfFiles) {
            if (item.isFile()){
                System.out.println(item.getName());
                listFileName.add(item.getName());
            }
        }
        return Response.ok().entity(new Gson().toJson(listFileName)).build();
    }

    /**
     * PUT method for updating or creating an instance of ImageResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
