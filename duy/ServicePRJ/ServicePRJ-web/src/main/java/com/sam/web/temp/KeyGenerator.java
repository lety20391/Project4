package com.sam.web.temp;

//import id.swhp.javaee.jwt.business.exception.SystemException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 *
 * @author Sukma Wardana
 * @since 1.0
 */
public class KeyGenerator {

    private static final String SECRET_KEY = "secret";
    private static final String SHA_256 = "SHA-256";

    public String generateKey() {
        return getHashText(SECRET_KEY);
    }

    protected String getHashText(final String text) {
        try {
            System.out.println("-------GetHashText-------");
            MessageDigest messageDigest = MessageDigest.getInstance(SHA_256);
            byte[] hash = messageDigest.digest(text.getBytes(StandardCharsets.UTF_8));
            String encoded = Base64.getEncoder().encodeToString(hash);
            System.out.println(encoded);
            return encoded;
        } catch (NoSuchAlgorithmException ex) {
            throw new SystemException();
        }
    }
}
