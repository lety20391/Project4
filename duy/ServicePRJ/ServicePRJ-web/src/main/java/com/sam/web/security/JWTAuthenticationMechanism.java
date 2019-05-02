package com.sam.web.security;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.security.enterprise.AuthenticationException;
import javax.security.enterprise.AuthenticationStatus;
import javax.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import javax.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import javax.security.enterprise.credential.Credential;
import javax.security.enterprise.identitystore.IdentityStore;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

/**
 *
 * @author Sukma Wardana
 * @author Werner Keil
 * @since 1.0
 */
@ApplicationScoped
public class JWTAuthenticationMechanism implements HttpAuthenticationMechanism {
    private static final String BEARER = "Bearer ";
    private static final List<String> WHITELISTED = Arrays.asList(new String[] {"/tokens"});
    private final Logger logger = Logger.getLogger(getClass().getName());

    @Inject
    IdentityStore identityStore;

//    @Inject
//    JWTStore jwtStore;
    //private IdentityStore identityStore = new IdentityStore();
    private JWTStore jwtStore = new JWTStore();
    private String logClass = "---JWTAuthMechanism: ";

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest req, HttpServletResponse res, HttpMessageContext context) throws AuthenticationException {
        System.out.println(logClass + "Validating Request URL: " + req.getPathInfo());
    	//logger.info( () -> "Validating " + req.getPathInfo());

        String authorizationHeader = req.getHeader(AUTHORIZATION);
        String requestMethod = req.getMethod();
        System.out.println(logClass + "Header: "+ authorizationHeader +"----");
        System.out.println(logClass + "Http Request Metho: " + requestMethod + "-----");
        Credential credential = null;
        
        if(requestMethod.equals("OPTIONS")){
            System.out.println(logClass + "This is pre-light Request: OK----");
            return context.doNothing();
        }

        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER)) {
            System.out.println(logClass + "Check Authen Token----");
            String token = authorizationHeader.substring(BEARER.length());
            credential = this.jwtStore.getCredential(token);
        }
        

        if (credential != null) {
            System.out.println(logClass + "Valid credential----");
            return context.notifyContainerAboutLogin(this.identityStore.validate(credential));
        } else {
            System.out.println(logClass + "InValid credential----");
            if (WHITELISTED.contains(req.getPathInfo())) {
                System.out.println(logClass + "This is whitelist URL---");
            	return context.doNothing();
            } else {
            	return context.responseUnauthorized();
            }
        }
    }
}
