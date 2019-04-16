package id.swhp.javaee.jwt.application;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

/**
 * ExceptionMapper to ensure that the WebApplicationExceptions are not handled by the
 * GlobalExceptionMapper (e.g. the HTTP status codes need to be the same).
 *
 * List subclasses of {@link WebApplicationException} on:
 * http://docs.oracle.com/javaee/7/api/javax/ws/rs/class-use/WebApplicationException.html
 *
 * @see GlobalExceptionMapper
 * @author Sukma Wardana
 * @since 1.0
 */
public class WebApplicationExceptionMapper implements ExceptionMapper<WebApplicationException> {

    @Override
    public Response toResponse(WebApplicationException exception) {
        return Response.fromResponse(exception.getResponse()).build();
    }

}
