package com.fsd.exp6.repository;

import com.fsd.exp6.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * PART A, B & C — UserRepository
 *
 * Demonstrates:
 *  - Basic derived queries (Part A)
 *  - Custom JPQL queries for relationship traversal (Part B & C)
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    // -----------------------------------------------------------------------
    // PART B — Fetching related data (User with their Roles)
    // -----------------------------------------------------------------------

    /**
     * Fetches a User AND eagerly loads their roles in a single SQL JOIN.
     * Without JOIN FETCH, accessing user.getRoles() would fire a second SELECT (N+1 problem).
     *
     * Generated SQL:
     *   SELECT u.*, r.*
     *   FROM users u
     *   LEFT JOIN user_roles ur ON ur.user_id = u.id
     *   LEFT JOIN roles r ON r.id = ur.role_id
     *   WHERE u.id = ?
     */
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.id = :id")
    Optional<User> findByIdWithRoles(@Param("id") Long id);

    // -----------------------------------------------------------------------
    // PART C — Custom JPQL queries for filtering
    // -----------------------------------------------------------------------

    /**
     * JPQL traversal across Many-to-Many: find users that have a specific role.
     *
     * "JOIN u.roles r" navigates the relationship defined in the entity —
     * Hibernate handles the join table resolution automatically.
     *
     * Generated SQL:
     *   SELECT DISTINCT u.*
     *   FROM users u
     *   INNER JOIN user_roles ur ON ur.user_id = u.id
     *   INNER JOIN roles r ON r.id = ur.role_id
     *   WHERE r.name = ?
     */
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r WHERE r.name = :roleName")
    List<User> findByRoleName(@Param("roleName") String roleName);

    /**
     * Fetches users filtered by role AND eagerly loads their roles (avoids N+1).
     *
     * Generated SQL:
     *   SELECT DISTINCT u.*, r2.*
     *   FROM users u
     *   JOIN user_roles ur1 ON ur1.user_id = u.id
     *   JOIN roles r1 ON r1.id = ur1.role_id
     *   LEFT JOIN user_roles ur2 ON ur2.user_id = u.id
     *   LEFT JOIN roles r2 ON r2.id = ur2.role_id
     *   WHERE r1.name = ?
     */
    @Query("SELECT DISTINCT u FROM User u JOIN u.roles r LEFT JOIN FETCH u.roles WHERE r.name = :roleName")
    List<User> findByRoleNameWithRoles(@Param("roleName") String roleName);

    /**
     * Count users per role — useful for reporting.
     *
     * Generated SQL:
     *   SELECT r.name, COUNT(u.id)
     *   FROM users u
     *   JOIN user_roles ur ON ur.user_id = u.id
     *   JOIN roles r ON r.id = ur.role_id
     *   GROUP BY r.name
     */
    @Query("SELECT r.name, COUNT(u) FROM User u JOIN u.roles r GROUP BY r.name")
    List<Object[]> countUsersByRole();
}
