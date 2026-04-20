package com.fsd.exp6.repository;

import com.fsd.exp6.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * PART A & C — ProductRepository
 *
 * Extends BOTH:
 *  - JpaRepository       → CRUD + pagination helpers
 *  - JpaSpecificationExecutor → allows Criteria API / Specification queries
 *
 * This is the most feature-rich repository in the project.
 */
@Repository
public interface ProductRepository
        extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    // -----------------------------------------------------------------------
    // PART B — Derived finder methods (relationship traversal)
    // -----------------------------------------------------------------------

    /**
     * Derived query that traverses Product → Category relationship.
     * Method name tells Spring Data: WHERE p.category.name = ?
     *
     * Generated SQL:
     *   SELECT p.* FROM products p
     *   JOIN categories c ON p.category_id = c.id
     *   WHERE c.name = ?
     */
    List<Product> findByCategory_Name(String categoryName);

    // -----------------------------------------------------------------------
    // PART C — Custom JPQL queries with filtering, sorting, pagination
    // -----------------------------------------------------------------------

    /**
     * Filter products by price range with pagination.
     *
     * :min and :max are named parameters bound via @Param.
     * Pageable controls: page number, page size, sort direction & field.
     *
     * Example JPQL: SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max
     *
     * Generated SQL (with page=0, size=5, sort by price ASC):
     *   SELECT p.*
     *   FROM products p
     *   WHERE p.price BETWEEN ? AND ?
     *   ORDER BY p.price ASC
     *   LIMIT 5 OFFSET 0
     */
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    Page<Product> findByPriceRange(
            @Param("min") BigDecimal min,
            @Param("max") BigDecimal max,
            Pageable pageable
    );

    /**
     * Filter by price range AND category name, with pagination.
     *
     * Demonstrates JPQL JOIN navigation across relationships.
     *
     * Generated SQL:
     *   SELECT p.*
     *   FROM products p
     *   JOIN categories c ON p.category_id = c.id
     *   WHERE p.price BETWEEN ? AND ?
     *     AND LOWER(c.name) = LOWER(?)
     *   ORDER BY p.price DESC
     *   LIMIT ? OFFSET ?
     */
    @Query("SELECT p FROM Product p JOIN p.category c " +
           "WHERE p.price BETWEEN :min AND :max " +
           "AND LOWER(c.name) = LOWER(:category)")
    Page<Product> findByPriceRangeAndCategory(
            @Param("min") BigDecimal min,
            @Param("max") BigDecimal max,
            @Param("category") String category,
            Pageable pageable
    );

    /**
     * Full-text search on product name/description using LIKE.
     *
     * Generated SQL:
     *   SELECT p.*
     *   FROM products p
     *   WHERE LOWER(p.name) LIKE ? OR LOWER(p.description) LIKE ?
     *   LIMIT ? OFFSET ?
     */
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    /**
     * Aggregate query: find average price per category.
     * Returns List<Object[]> where each element is [categoryName, avgPrice].
     *
     * Generated SQL:
     *   SELECT c.name, AVG(p.price)
     *   FROM products p
     *   JOIN categories c ON p.category_id = c.id
     *   GROUP BY c.name
     *   ORDER BY AVG(p.price) DESC
     */
    @Query("SELECT p.category.name, AVG(p.price) FROM Product p " +
           "GROUP BY p.category.name ORDER BY AVG(p.price) DESC")
    List<Object[]> findAvgPriceByCategory();

    /**
     * Find products with low stock (stock below threshold).
     *
     * Generated SQL:
     *   SELECT p.* FROM products p WHERE p.stock < ? ORDER BY p.stock ASC
     */
    @Query("SELECT p FROM Product p WHERE p.stock < :threshold ORDER BY p.stock ASC")
    List<Product> findLowStockProducts(@Param("threshold") int threshold);
}
