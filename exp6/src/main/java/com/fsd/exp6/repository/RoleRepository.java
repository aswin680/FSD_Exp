package com.fsd.exp6.repository;

import com.fsd.exp6.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * PART A — RoleRepository
 *
 * Extends JpaRepository which provides out-of-the-box CRUD:
 *   save(), findById(), findAll(), deleteById(), count(), etc.
 *
 * Spring Data JPA automatically generates the implementation at runtime —
 * no SQL or implementation class needed!
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Spring Data JPA derives the query from the method name:
     *   SELECT r FROM Role r WHERE r.name = ?1
     *
     * Generated SQL:
     *   select r1_0.id, r1_0.name from roles r1_0 where r1_0.name=?
     */
    Optional<Role> findByName(String name);

    boolean existsByName(String name);
}
