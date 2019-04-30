/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import java.io.InputStream;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.POST;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import javax.ws.rs.core.Response;


/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("uploader")
@RequestScoped
public class UploaderServiceResource {
    @Context
    private UriInfo context;
    private static final String UPLOAD_FOLDER = "e:/uploadedFiles/";
    public UploaderServiceResource() {
    }  
    @POST
    @Path("file")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(
                    @FormDataParam("file") InputStream uploadedInputStream,
                    @FormDataParam("file") FormDataContentDisposition fileDetail) {
            // check if all form parameters are provided
            if (uploadedInputStream == null || fileDetail == null)
                    return Response.status(400).entity("Invalid form data").build();
            // create our destination folder, if it not exists
            try {
                    createFolderIfNotExists(UPLOAD_FOLDER);
            } catch (SecurityException se) {
                    return Response.status(500)
                                    .entity("Can not create destination folder on server")
                                    .build();
            }
            String uploadedFileLocation = UPLOAD_FOLDER + fileDetail.getFileName();
            try {
                    saveToFile(uploadedInputStream, uploadedFileLocation);
            } catch (IOException e) {
                    return Response.status(500).entity("Can not save file").build();
            }
            return Response.status(200)
                            .entity("File saved to " + uploadedFileLocation).build();
    }
	
	private void saveToFile(InputStream inStream, String target)
			throws IOException {
		OutputStream out = null;
		int read = 0;
		byte[] bytes = new byte[1024];
		out = new FileOutputStream(new File(target));
		while ((read = inStream.read(bytes)) != -1) {
			out.write(bytes, 0, read);
		}
		out.flush();
		out.close();
	}
	
	private void createFolderIfNotExists(String dirName)
			throws SecurityException {
		File theDir = new File(dirName);
		if (!theDir.exists()) {
			theDir.mkdir();
		}
	}
    
}
