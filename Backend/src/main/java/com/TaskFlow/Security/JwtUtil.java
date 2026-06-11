package com.TaskFlow.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
@Component
public class JwtUtil {
    private final String SECRET_CODE = "qwertyuiopasdfghjklzxcvbnmqwerwe";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_CODE.getBytes());
    }
    public String generateJwtToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+8*60*60*1000))
                .compact();
    }
    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean verifyToken(String token) {
        try{
            getUsername(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
