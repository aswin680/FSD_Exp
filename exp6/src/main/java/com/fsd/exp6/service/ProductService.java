package com.fsd.exp6.service;

import com.fsd.exp6.entity.Product;
import com.fsd.exp6.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * PART C — ProductService
 *
 * Demonstrates TWO approaches for dynamic, flexible queries:
 *
 * 1. JPQL via repository (see ProductRepository.java)
 * 2. Criteria API via EntityManager (in this class)
 *
 * Criteria API advantages:
 *  - Type-safe (compile-time checks)
 *  - Dynamically build predicates at runtime (no string concatenation)
 *  - Can build complex queries programmatically based on input params
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final EntityManager entityManager; // injected by Spring

    // -------------------------------------------------------------------------
    // JPQL-based queries (delegates to ProductRepository)
    // -------------------------------------------------------------------------

    /**
     * Returns a paginated list of products within a price range.
     * Uses JPQL @Query defined in ProductRepository.
     */
    public Page<Product> getProductsByPriceRange(BigDecimal min, BigDecimal max,
                                                  int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        log.info("JPQL Query: Products with price between {} and {}, page={}, size={}, sort={}",
                min, max, page, size, sortBy);
        return productRepository.findByPriceRange(min, max, pageable);
    }

    /**
     * Returns paginated products filtered by price range + category.
     */
    public Page<Product> getProductsByPriceRangeAndCategory(
            BigDecimal min, BigDecimal max, String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("price").ascending());
        return productRepository.findByPriceRangeAndCategory(min, max, category, pageable);
    }

    /**
     * Full-text search with pagination.
     */
    public Page<Product> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.searchByKeyword(keyword, pageable);
    }

    // -------------------------------------------------------------------------
    // CRITERIA API — Dynamic query building
    // -------------------------------------------------------------------------

    /**
     * PART C — Criteria API: Dynamically filter, sort, and paginate products.
     *
     * Unlike JPQL where the query string is fixed, Criteria API builds the query
     * programmatically — predicates are added only when parameters are provided.
     *
     * This is equivalent to:
     *   SELECT p FROM Product p
     *   WHERE (:min IS NULL OR p.price >= :min)
     *     AND (:max IS NULL OR p.price <= :max)
     *     AND (:category IS NULL OR p.category.name = :category)
     *     AND (:keyword IS NULL OR p.name LIKE %:keyword%)
     *   ORDER BY p.{sortBy} {direction}
     *   LIMIT :size OFFSET :page*:size
     *
     * Generated SQL is logged to console (spring.jpa.show-sql=true).
     */
    public Page<Product> filterWithCriteriaAPI(
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String category,
            String keyword,
            String sortBy,
            String sortDir,
            int page,
            int size) {

        log.info("=== Criteria API Query ===");
        log.info("Params: minPrice={}, maxPrice={}, category={}, keyword={}, sortBy={}, sortDir={}, page={}, size={}",
                minPrice, maxPrice, category, keyword, sortBy, sortDir, page, size);

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // ---- Build the main data query ----
        CriteriaQuery<Product> query = cb.createQuery(Product.class);
        Root<Product> root = query.from(Product.class);

        // Join to Category for category-based filtering
        Join<Object, Object> categoryJoin = root.join("category", JoinType.LEFT);

        // Collect predicates dynamically
        List<Predicate> predicates = buildPredicates(cb, root, categoryJoin,
                minPrice, maxPrice, category, keyword);

        query.select(root).where(predicates.toArray(new Predicate[0]));

        // Apply sorting
        if ("desc".equalsIgnoreCase(sortDir)) {
            query.orderBy(cb.desc(root.get(sortBy)));
        } else {
            query.orderBy(cb.asc(root.get(sortBy)));
        }

        // Execute with pagination
        TypedQuery<Product> typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult(page * size);   // OFFSET
        typedQuery.setMaxResults(size);            // LIMIT

        List<Product> results = typedQuery.getResultList();

        // ---- Build the count query (for Page metadata) ----
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Product> countRoot = countQuery.from(Product.class);
        Join<Object, Object> countCategoryJoin = countRoot.join("category", JoinType.LEFT);

        List<Predicate> countPredicates = buildPredicates(cb, countRoot, countCategoryJoin,
                minPrice, maxPrice, category, keyword);

        countQuery.select(cb.count(countRoot)).where(countPredicates.toArray(new Predicate[0]));
        Long total = entityManager.createQuery(countQuery).getSingleResult();

        log.info("=== Criteria API returned {} results (total={}) ===", results.size(), total);

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return new PageImpl<>(results, pageable, total);
    }

    /**
     * Helper — builds predicates list based on which params are non-null/non-empty.
     * This is the key advantage of Criteria API: conditional query building.
     */
    private List<Predicate> buildPredicates(
            CriteriaBuilder cb,
            Root<Product> root,
            Join<Object, Object> categoryJoin,
            BigDecimal minPrice, BigDecimal maxPrice,
            String category, String keyword) {

        List<Predicate> predicates = new ArrayList<>();

        // Price >= minPrice
        if (minPrice != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        // Price <= maxPrice
        if (maxPrice != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        // Category name filter
        if (category != null && !category.isBlank()) {
            predicates.add(cb.equal(
                    cb.lower(categoryJoin.get("name")),
                    category.toLowerCase()
            ));
        }

        // Keyword search in name or description
        if (keyword != null && !keyword.isBlank()) {
            String pattern = "%" + keyword.toLowerCase() + "%";
            Predicate nameLike = cb.like(cb.lower(root.get("name")), pattern);
            Predicate descLike = cb.like(cb.lower(root.get("description")), pattern);
            predicates.add(cb.or(nameLike, descLike));
        }

        return predicates;
    }

    // -------------------------------------------------------------------------
    // Specification API (alternative to Criteria API — more concise)
    // -------------------------------------------------------------------------

    /**
     * JPA Specification approach — uses lambda-based Specification<Product>.
     * Works with JpaSpecificationExecutor in the repository.
     *
     * Simpler but less control than raw Criteria API.
     */
    public Page<Product> filterWithSpecification(
            BigDecimal minPrice, BigDecimal maxPrice, String category,
            int page, int size, String sortBy) {

        Specification<Product> spec = Specification.where(null);

        if (minPrice != null) {
            spec = spec.and((root, q, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, q, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }
        if (category != null && !category.isBlank()) {
            spec = spec.and((root, q, cb) ->
                    cb.equal(cb.lower(root.join("category").get("name")),
                            category.toLowerCase()));
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        log.info("Specification query — minPrice={}, maxPrice={}, category={}", minPrice, maxPrice, category);

        return productRepository.findAll(spec, pageable);
    }
}
