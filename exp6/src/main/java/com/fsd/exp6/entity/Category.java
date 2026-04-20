package com.fsd.exp6.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * PART B — Category Entity (One-to-Many with Product)
 *
 * One Category can have MANY Products.
 *
 * Hibernate SQL generated:
 *   CREATE TABLE categories (id BIGINT, name VARCHAR, description VARCHAR)
 *
 * The foreign key lives in the "products" table (category_id column),
 * not in this table — that's how One-to-Many works in relational DBs.
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "products")  // avoid LazyInitializationException in toString
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    /**
     * ONE-TO-MANY: This is the "one" side.
     *
     * mappedBy = "category" → refers to the field in Product.java
     * CascadeType.ALL     → if category is deleted, all its products are deleted
     * orphanRemoval       → if product is removed from this list, it's deleted from DB
     * FetchType.LAZY      → products are loaded only when accessed (default for collections)
     *
     * Hibernate does NOT add a join column here; the FK lives in the products table.
     */
    @JsonIgnore   // Prevents infinite loop: Category → Products → Category → ...
    @OneToMany(mappedBy = "category",
               cascade = CascadeType.ALL,
               orphanRemoval = true,
               fetch = FetchType.LAZY)
    @Builder.Default
    private List<Product> products = new ArrayList<>();

    // ----- Helper Method -----
    public void addProduct(Product product) {
        products.add(product);
        product.setCategory(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setCategory(null);
    }
}
