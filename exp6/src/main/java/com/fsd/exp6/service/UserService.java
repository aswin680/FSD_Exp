package com.fsd.exp6.service;

import com.fsd.exp6.entity.Role;
import com.fsd.exp6.entity.User;
import com.fsd.exp6.repository.RoleRepository;
import com.fsd.exp6.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * PART B & C — UserService
 *
 * Demonstrates:
 *  - Fetching users with their roles (Many-to-Many)
 *  - Filtering users by role (JPQL custom query)
 *  - Aggregation: count users per role
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    // -------------------------------------------------------------------------
    // PART B — Fetching related data
    // -------------------------------------------------------------------------

    /**
     * Returns user WITH their roles loaded eagerly (JOIN FETCH).
     * Without JOIN FETCH, accessing roles on a detached entity would throw
     * LazyInitializationException.
     */
    @Transactional(readOnly = true)
    public User getUserWithRoles(Long id) {
        return userRepository.findByIdWithRoles(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    /**
     * Returns all users. Roles are LAZY — not loaded here.
     * Good for listing users without loading role data unnecessarily.
     */
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // -------------------------------------------------------------------------
    // PART C — Custom query: Filter users by role
    // -------------------------------------------------------------------------

    /**
     * Uses custom JPQL query that traverses Many-to-Many relationship.
     * See UserRepository.findByRoleNameWithRoles()
     */
    @Transactional(readOnly = true)
    public List<User> getUsersByRole(String roleName) {
        log.info("Fetching users with role: {}", roleName);
        return userRepository.findByRoleNameWithRoles(roleName.toUpperCase());
    }

    /**
     * Aggregation query: returns a map of roleName -> userCount.
     */
    @Transactional(readOnly = true)
    public Map<String, Long> getUserCountByRole() {
        List<Object[]> results = userRepository.countUsersByRole();
        return results.stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> (Long) row[1]
                ));
    }

    // -------------------------------------------------------------------------
    // Create / Assign Role
    // -------------------------------------------------------------------------

    @Transactional
    public User createUser(@NonNull User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User assignRoleToUser(Long userId, String roleName) {
        User user = userRepository.findByIdWithRoles(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        Role role = roleRepository.findByName(roleName.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        user.addRole(role);  // helper method maintains both sides of the relationship
        return userRepository.save(user);
    }
}
