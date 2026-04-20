package com.fsd.exp7.controller;

import com.fsd.exp7.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtils jwtUtils;

    public AuthController(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Basic Hardcoded check
        if ("admin".equals(username) && "admin123".equals(password)) {
            String token = jwtUtils.generateToken(username, "ROLE_ADMIN");
            return ResponseEntity.ok(Map.of("token", token));
        } else if ("user".equals(username) && "user123".equals(password)) {
            String token = jwtUtils.generateToken(username, "ROLE_USER");
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
