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
    private static String whitelistURL[] = new String [] {
                                                            "/tokens",
                                                            "/BookingDetail/getAll",
                                                            "/User/add",
                                                            "/User/list",
                                                            "/Product/list",
                                                            "/Product/getDetail",
                                                            "/BookingDetail/Post",
                                                            "/BookingMaster/Post",
                                                            "/OrderDetail/Post",
                                                            "/OrderMaster/Post",
                                                            "/Pet/getDetail",
                                                            "/Pet/list",
                                                            "/DatingDetail",
                                                            "/DatingDetail/Post",
                                                            "/Service/list",
                                                            "/Service/getDetail"
                                                        };
    private static final List<String> WHITELISTED = Arrays.asList(whitelistURL);
    private final Logger logger = Logger.getLogger(getClass().getName());

    private JWTIdentityStore jwtIdentityStore = new JWTIdentityStore();

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
        String contentType = req.getHeader("Content-Type");
        System.out.println(logClass + "Header: "+ authorizationHeader +"----");
        System.out.println(logClass + "Http Request Method: " + requestMethod + "-----");
        System.out.println(logClass + "Content-Type: " + contentType);
        JWTCredential credential = null;

        if(req.getPathInfo() == null)
            return context.doNothing();

        if(requestMethod.equals("OPTIONS")){
            System.out.println(logClass + "This is pre-light Request: OK----");
            //res.setStatus(200);
            return context.doNothing();
        }

        if(contentType != null && contentType.contains("multipart/form-data")){
            System.out.println(logClass + "This is upload data");
            return context.doNothing();
        }


        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER)) {
            System.out.println(logClass + "Check Authen Token----");
            String token = authorizationHeader.substring(BEARER.length());
            credential = this.jwtStore.getCredential(token);
        }

        if (credential != null) {
            System.out.println(logClass + "Valid credential----");
            return context.notifyContainerAboutLogin(this.jwtIdentityStore.validate(credential));
        } else {
            System.out.println(logClass + "InValid credential----");
            if (req.getPathInfo() == null)
                return context.responseUnauthorized();
            if (WHITELISTED.contains(req.getPathInfo()) || req.getPathInfo().contains("findID") || req.getPathInfo().contains("/GetImage/") || req.getPathInfo().contains("/Pet/list/")) {
                System.out.println(logClass + "This is whitelist URL---");
            	return context.doNothing();
            } else {
            	return context.responseUnauthorized();
            }
        }
    }
}
