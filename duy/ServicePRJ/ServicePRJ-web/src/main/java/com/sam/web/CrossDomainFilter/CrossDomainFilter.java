/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.CrossDomainFilter;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;
import java.io.IOException;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author Dat Le
 */
@Provider
public class CrossDomainFilter implements ContainerResponseFilter {

    @Override
    public ContainerResponse filter(ContainerRequest creq, ContainerResponse cres) {
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        System.out.println("----CrossDomainFilter: init----");
        //sua loi CORS
        cres.getHttpHeaders().add("Access-Control-Allow-Origin", "*");
        cres.getHttpHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
        cres.getHttpHeaders().add("Access-Control-Allow-Credentials", "true");
        cres.getHttpHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        cres.getHttpHeaders().add("Access-Control-Max-Age", "1209600");
        //cho phep javascript lay Header: Authorization de lay JWT
        cres.getHttpHeaders().add("Access-Control-Expose-Headers", "Authorization");
        System.out.println("----CrossDomainFilter: finish----");
        return cres;
    }

    
    
}
