package com.fsd.exp6.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * PART B — Role Entity (Many-to-Many with User)
 *
 * Represents a user authority/permission role.
 * Hibernate SQL:
 *   CREATE TABLE roles (id BIGINT, name VARCHAR(20))
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "users")  // avoid circular toString
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Role name stored as a string in DB column.
     * Example values: "ADMIN", "USER", "MODERATOR"
     */
    @Column(nullable = false, unique = true, length = 20)
    private String name;

    /**
     * Inverse (non-owning) side of the Many-to-Many.
     * "mappedBy" refers to the field name in User.java.
     * Hibernate does NOT create an extra join table from this side.
     */
    @JsonIgnore   // Prevents infinite loop: Role → Users → Roles → ...
    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<User> users = new HashSet<>();
}
