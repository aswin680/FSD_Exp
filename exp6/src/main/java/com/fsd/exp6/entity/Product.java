package com.fsd.exp6.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * PART A & B — Product Entity
 *
 * Demonstrates:
 *  - Basic JPA entity (Part A)
 *  - Many-to-One relationship with Category (Part B)
 *
 * Hibernate SQL:
 *   CREATE TABLE products (
 *     id         BIGINT NOT NULL AUTO_INCREMENT,
 *     name       VARCHAR(150) NOT NULL,
 *     description VARCHAR(1000),
 *     price      DECIMAL(10,2) NOT NULL,
 *     stock      INTEGER NOT NULL,
 *     category_id BIGINT,          ← foreign key to categories
 *     PRIMARY KEY (id)
 *   )
 *
 * The category_id column is the FOREIGN KEY that implements the One-to-Many
 * relationship. The "many" side (Product) always owns the FK column.
 */
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "category")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 1000)
    private String description;

    /**
     * Using BigDecimal for monetary values — never use float/double for money!
     * precision=10, scale=2 → up to 99,999,999.99
     */
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Min(0)
    @Column(nullable = false)
    private int stock;

    /**
     * MANY-TO-ONE: Many products belong to one category.
     *
     * This side is the "owner" of the relationship — it holds the FK column.
     * FetchType.LAZY: category is NOT loaded unless accessed (avoids extra join by default).
     *
     * Hibernate generates: category_id BIGINT REFERENCES categories(id)
     */
    @JsonIgnore   // Product's category field hidden from JSON to prevent circular loop
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    /** Convenience field for JSON response — shows category name only */
    public String getCategoryName() {
        return category != null ? category.getName() : null;
    }
}
