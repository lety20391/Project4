/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.ejb.DatingMasterSessionBean.DatingMasterManageSessionBeanLocal;
import com.sam.ejb.entity.DatingMasterEntity;
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

/**
 * REST Web Service
 *
 * @author Dat Le
 */
@Path("DatingMaster")
@RequestScoped
public class ManageDatingMaster {

    @Context
    private UriInfo context;
    @EJB
    DatingMasterManageSessionBeanLocal datingMasterManageSessionBeanLocal;

    /**
     * Creates a new instance of ManageDatingMaster
     */
    public ManageDatingMaster() {
    }

    /**
     * Retrieves representation of an instance of com.sam.web.rest.ManageDatingMaster
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<DatingMasterEntity> getJSON() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return datingMasterManageSessionBeanLocal.listAll();
    }

    /**
     * PUT method for updating or creating an instance of ManageDatingMaster
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
}
