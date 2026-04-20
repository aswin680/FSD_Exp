package com.fsd.exp6.repository;

import com.fsd.exp6.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * PART A & B — CategoryRepository
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Derived query — finds category by name (case-insensitive).
     * SQL: SELECT * FROM categories WHERE LOWER(name) = LOWER(?)
     */
    Optional<Category> findByNameIgnoreCase(String name);

    /**
     * JPQL query to fetch category WITH its products eagerly (avoids N+1).
     *
     * "JOIN FETCH" tells Hibernate to load products in the same SQL using a JOIN
     * instead of firing separate SELECT statements for each product.
     *
     * Generated SQL:
     *   SELECT c.*, p.*
     *   FROM categories c
     *   LEFT JOIN products p ON p.category_id = c.id
     *   WHERE c.id = ?
     */
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.products WHERE c.id = :id")
    Optional<Category> findByIdWithProducts(Long id);
}
