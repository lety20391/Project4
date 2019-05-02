/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

/**
 *
 * @author Dat Le
 */
@ApplicationPath("rest")
public class JerseyApplication extends ResourceConfig {

    public JerseyApplication() {
        packages("com.sam.web.rest");
        register(RolesAllowedDynamicFeature.class);
    }
    
}
