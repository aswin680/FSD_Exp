package com.fsd.exp6.controller;

import com.fsd.exp6.entity.User;
import com.fsd.exp6.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * PART B & C — UserController
 *
 * REST endpoints for User + Role Many-to-Many relationship.
 * Base URL: http://localhost:8080/api/users
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /** GET /api/users — all users (roles are LAZY, not shown) */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * GET /api/users/{id}
     * Fetches user WITH roles using JOIN FETCH.
     * Check the console to see a SINGLE SQL with a JOIN (not two separate queries).
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserWithRoles(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserWithRoles(id));
    }

    /**
     * GET /api/users/by-role?role=ADMIN
     *
     * PART C — JPQL custom query: filter users by role.
     * Traverses Many-to-Many relationship in JPQL.
     *
     * Try: /api/users/by-role?role=ADMIN
     *      /api/users/by-role?role=USER
     *      /api/users/by-role?role=MODERATOR
     */
    @GetMapping("/by-role")
    public ResponseEntity<List<User>> getUsersByRole(@RequestParam String role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    /**
     * GET /api/users/stats/role-counts
     * Returns how many users have each role (JPQL GROUP BY aggregation).
     *
     * Generated SQL:
     *   SELECT r.name, COUNT(u.id)
     *   FROM users u JOIN user_roles ur ... JOIN roles r ...
     *   GROUP BY r.name
     */
    @GetMapping("/stats/role-counts")
    public ResponseEntity<Map<String, Long>> getRoleCounts() {
        return ResponseEntity.ok(userService.getUserCountByRole());
    }

    /**
     * POST /api/users/{id}/assign-role?roleName=ADMIN
     * Assigns an existing role to a user (demonstrates Many-to-Many update).
     */
    @PostMapping("/{id}/assign-role")
    public ResponseEntity<User> assignRole(
            @PathVariable Long id,
            @RequestParam String roleName) {
        return ResponseEntity.ok(userService.assignRoleToUser(id, roleName));
    }
}
