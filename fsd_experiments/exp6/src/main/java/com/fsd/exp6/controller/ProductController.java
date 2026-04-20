package com.fsd.exp6.controller;

import com.fsd.exp6.entity.Product;
import com.fsd.exp6.repository.ProductRepository;
import com.fsd.exp6.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
    
    @PostMapping("/category/{categoryId}")
    public ResponseEntity<?> createProduct(@PathVariable Long categoryId, @RequestBody Product product) {
        return categoryRepository.findById(categoryId).map(category -> {
            product.setCategory(category);
            return ResponseEntity.ok(productRepository.save(product));
        }).orElse(ResponseEntity.badRequest().build());
    }
}
