package com.fsd.exp8.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ApiController {

    // Simulating database
    private List<Map<String, Object>> products = List.of(
            Map.of("id", 1, "name", "Gaming Laptop", "price", 1500),
            Map.of("id", 2, "name", "Wireless Mouse", "price", 50)
    );

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getProducts() {
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Map<String, Object> product) {
        if (!product.containsKey("name") || !product.containsKey("price")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name and price are required"));
        }
        
        // Simulating error
        if (product.get("name").toString().length() < 3) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name must be at least 3 characters"));
        }
        
        return ResponseEntity.ok(Map.of("message", "Product created successfully", "product", product));
    }
}
