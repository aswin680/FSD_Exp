package com.fsd.exp6.controller;

import com.fsd.exp6.entity.Product;
import com.fsd.exp6.repository.ProductRepository;
import com.fsd.exp6.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * PART A, B & C — ProductController
 *
 * REST endpoints to demonstrate all JPA/JPQL features.
 * Base URL: http://localhost:8080/api/products
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    // -----------------------------------------------------------------------
    // PART A — Basic CRUD (auto-implemented by JpaRepository)
    // -----------------------------------------------------------------------

    /** GET /api/products — list all products */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    /** GET /api/products/{id} — get by ID */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable @NonNull Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // -----------------------------------------------------------------------
    // PART B — Relationship-based filtering (derived query)
    // -----------------------------------------------------------------------

    /**
     * GET /api/products/category/{name}
     * Uses derived query: findByCategory_Name()
     * Demonstrates One-to-Many traversal in Spring Data.
     */
    @GetMapping("/category/{name}")
    public ResponseEntity<List<Product>> getByCategory(@PathVariable String name) {
        return ResponseEntity.ok(productRepository.findByCategory_Name(name));
    }

    // -----------------------------------------------------------------------
    // PART C — JPQL: Filter by price range with pagination & sorting
    // -----------------------------------------------------------------------

    /**
     * GET /api/products/price-range?minPrice=10&maxPrice=500&page=0&size=5&sortBy=price
     *
     * Uses JPQL @Query with Pageable.
     * Check console for Hibernate's generated SQL with LIMIT/OFFSET.
     */
    @GetMapping("/price-range")
    public ResponseEntity<Page<Product>> getByPriceRange(
            @RequestParam(defaultValue = "0")    BigDecimal minPrice,
            @RequestParam(defaultValue = "99999") BigDecimal maxPrice,
            @RequestParam(defaultValue = "0")    int page,
            @RequestParam(defaultValue = "5")    int size,
            @RequestParam(defaultValue = "price") String sortBy) {
        return ResponseEntity.ok(
                productService.getProductsByPriceRange(minPrice, maxPrice, page, size, sortBy)
        );
    }

    /**
     * GET /api/products/filter?minPrice=&maxPrice=&category=&page=&size=
     *
     * JPQL with both price range AND category filter + pagination.
     */
    @GetMapping("/filter")
    public ResponseEntity<Page<Product>> filterByPriceAndCategory(
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(
                    productService.getProductsByPriceRangeAndCategory(
                            minPrice != null ? minPrice : BigDecimal.ZERO,
                            maxPrice != null ? maxPrice : new BigDecimal("999999"),
                            category, page, size)
            );
        }
        return ResponseEntity.ok(
                productService.getProductsByPriceRange(
                        minPrice != null ? minPrice : BigDecimal.ZERO,
                        maxPrice != null ? maxPrice : new BigDecimal("999999"),
                        page, size, "price")
        );
    }

    /**
     * GET /api/products/search?keyword=laptop&page=0&size=5
     * Full-text search using LIKE in JPQL.
     */
    @GetMapping("/search")
    public ResponseEntity<Page<Product>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(productService.searchProducts(keyword, page, size));
    }

    // -----------------------------------------------------------------------
    // PART C — CRITERIA API: Dynamic queries
    // -----------------------------------------------------------------------

    /**
     * GET /api/products/criteria?minPrice=&maxPrice=&category=&keyword=&sortBy=price&sortDir=asc&page=0&size=5
     *
     * Uses Criteria API (EntityManager + CriteriaBuilder).
     * All parameters are OPTIONAL — predicates are added only when provided.
     * This is the key benefit of Criteria API over JPQL.
     *
     * Watch the console for the dynamically generated SQL!
     */
    @GetMapping("/criteria")
    public ResponseEntity<Page<Product>> filterWithCriteria(
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "price")  String sortBy,
            @RequestParam(defaultValue = "asc")    String sortDir,
            @RequestParam(defaultValue = "0")      int page,
            @RequestParam(defaultValue = "5")      int size) {
        return ResponseEntity.ok(
                productService.filterWithCriteriaAPI(
                        minPrice, maxPrice, category, keyword,
                        sortBy, sortDir, page, size)
        );
    }

    /**
     * GET /api/products/spec?minPrice=&maxPrice=&category=&sortBy=price&page=0&size=5
     *
     * Uses Specification API — a cleaner/simpler alternative to raw Criteria API.
     */
    @GetMapping("/spec")
    public ResponseEntity<Page<Product>> filterWithSpec(
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(
                productService.filterWithSpecification(minPrice, maxPrice, category, page, size, sortBy)
        );
    }

    // -----------------------------------------------------------------------
    // Analytics / Aggregation
    // -----------------------------------------------------------------------

    /**
     * GET /api/products/stats/avg-price
     * Returns average price per category (JPQL GROUP BY).
     */
    @GetMapping("/stats/avg-price")
    public ResponseEntity<List<Map<String, Object>>> getAvgPriceByCategory() {
        List<Object[]> raw = productRepository.findAvgPriceByCategory();
        List<Map<String, Object>> result = raw.stream()
                .map(r -> Map.of("category", r[0], "avgPrice", r[1]))
                .toList();
        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/products/stats/low-stock?threshold=10
     * Returns products with stock below threshold.
     */
    @GetMapping("/stats/low-stock")
    public ResponseEntity<List<Product>> getLowStock(
            @RequestParam(defaultValue = "10") int threshold) {
        return ResponseEntity.ok(productRepository.findLowStockProducts(threshold));
    }
}
