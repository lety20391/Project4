package id.swhp.javaee.jwt.application;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;

import id.swhp.javaee.jwt.business.security.boundary.JWTStore;
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

    @Inject
    JWTStore jwtStore;

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest req, HttpServletResponse res, HttpMessageContext context) throws AuthenticationException {
        
    	logger.info( () -> "Validating " + req.getPathInfo());

        String authorizationHeader = req.getHeader(AUTHORIZATION);
        Credential credential = null;

        if (authorizationHeader != null && authorizationHeader.startsWith(BEARER)) {
            String token = authorizationHeader.substring(BEARER.length());

            credential = this.jwtStore.getCredential(token);
        }

        if (credential != null) {
            return context.notifyContainerAboutLogin(this.identityStore.validate(credential));
        } else {
            if (WHITELISTED.contains(req.getPathInfo())) {
            	return context.doNothing();
            } else {
            	return context.responseUnauthorized();
            }
        }
    }
}
