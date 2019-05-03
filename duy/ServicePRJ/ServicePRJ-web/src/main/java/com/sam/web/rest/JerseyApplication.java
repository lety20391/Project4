/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sam.web.rest;

import com.sam.web.CrossDomainFilter.CrossDomainFilter;
import com.sam.web.security.AuthFilter;
import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
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
        register(MultiPartFeature.class);
        register(RolesAllowedDynamicFeature.class);
        register(new AuthFilter());
        register(new CrossDomainFilter());
    }
    
}
