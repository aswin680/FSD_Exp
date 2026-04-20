package com.fsd.exp7.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resource")
public class ResourceController {

    @GetMapping("/public")
    public String publicAccess() {
        return "Public Content - Anyone can see this context if bypassing security, but currently mapped behind ANY authentication.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public String userAccess() {
        return "User Content - Accessed by USER or ADMIN";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String adminAccess() {
        return "Admin Content - Accessed ONLY by ADMIN";
    }
}
