package com.fsd.exp6.repository;

import com.fsd.exp6.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Custom JPQL Query
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice ORDER BY p.price DESC")
    List<Product> findProductsInPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);

    // Derived Query with Pagination
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);
}
