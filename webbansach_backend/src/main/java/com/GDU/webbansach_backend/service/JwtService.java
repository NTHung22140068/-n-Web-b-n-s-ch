package com.GDU.webbansach_backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtService {
    public static final String SERECT = "ABC1234";

    // tạo JWT dựa trên tên đăng nhập
    public String generteToken(String tenDangNhap) {
        Map<String, Object> clamis = new HashMap<>();
//        clamis.put("isAdmin", true);
        return createToken(clamis, tenDangNhap);
    }

    // tạo jwt với các claim đã cho
    private String createToken(Map<String, Object> clamis, String tenDangNhap) {
        return Jwts.builder()
                .setClaims(clamis)
                .setSubject(tenDangNhap)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 1000)) // hết hạn sau 30p
                .signWith(SignatureAlgorithm.HS256, getSigneKey())
                .compact();
    }

    // Lấy serert key
    private Key getSigneKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SERECT);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //  Trích xuất thông tin
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(getSigneKey()).parseClaimsJws(token).getBody();

    }
}
