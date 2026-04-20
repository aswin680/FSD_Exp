package com.fsd.exp6;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the JPA & Hibernate Demo application.
 *
 * This application demonstrates:
 *  - Part A: Basic JPA entity + Repository with H2/MySQL/PostgreSQL
 *  - Part B: One-to-Many (Category -> Product) and Many-to-Many (User <-> Role)
 *  - Part C: Custom JPQL queries, Criteria API, filtering, sorting, and pagination
 */
@SpringBootApplication
public class Exp6Application {

    public static void main(String[] args) {
        SpringApplication.run(Exp6Application.class, args);
    }
}
