package com.fsd.exp6.config;

import com.fsd.exp6.entity.*;
import com.fsd.exp6.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;

/**
 * DataInitializer — Seeds the H2 in-memory database with sample data on startup.
 *
 * Implements CommandLineRunner so it runs after the Spring context is ready.
 * This populates all entities and relationships so all API endpoints work
 * immediately without any manual data entry.
 *
 * Data created:
 *  Roles:      ADMIN, USER, MODERATOR
 *  Users:      alice(ADMIN,USER), bob(USER), charlie(MODERATOR,USER),
 *              diana(ADMIN,MODERATOR), eve(USER)
 *  Categories: Electronics, Clothing, Books, Sports, Home
 *  Products:   15+ products spread across categories
 */
@Component
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("null")
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository    roleRepository;
    private final UserRepository    userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("=======================================================");
        log.info("  Seeding database with sample data...");
        log.info("=======================================================");

        // ---- Roles ----
        Role adminRole = createRole("ADMIN");
        Role userRole  = createRole("USER");
        Role modRole   = createRole("MODERATOR");

        // ---- Users ----
        User alice   = createUser("alice",   "alice@example.com",   "pass123");
        User bob     = createUser("bob",     "bob@example.com",     "pass123");
        User charlie = createUser("charlie", "charlie@example.com", "pass123");
        User diana   = createUser("diana",   "diana@example.com",   "pass123");
        User eve     = createUser("eve",     "eve@example.com",     "pass123");

        // Assign roles — Many-to-Many
        alice.addRole(adminRole);
        alice.addRole(userRole);

        bob.addRole(userRole);

        charlie.addRole(modRole);
        charlie.addRole(userRole);

        diana.addRole(adminRole);
        diana.addRole(modRole);

        eve.addRole(userRole);

        userRepository.save(alice);
        userRepository.save(bob);
        userRepository.save(charlie);
        userRepository.save(diana);
        userRepository.save(eve);

        // ---- Categories ----
        Category electronics = createCategory("Electronics",
                "Gadgets, devices, and electronic components");
        Category clothing = createCategory("Clothing",
                "Apparel and fashion accessories");
        Category books = createCategory("Books",
                "Fiction, non-fiction, textbooks, and more");
        Category sports = createCategory("Sports",
                "Sports equipment and outdoor gear");
        Category home = createCategory("Home",
                "Home decor and furniture");

        // ---- Products — Electronics ----
        addProduct(electronics, "Laptop Pro 15",
                "High-performance laptop with 16GB RAM, 512GB SSD", new BigDecimal("899.99"), 25);
        addProduct(electronics, "Wireless Headphones",
                "Noise-cancelling Bluetooth headphones", new BigDecimal("149.99"), 80);
        addProduct(electronics, "Smart Watch",
                "Fitness tracker with heart rate monitor and GPS", new BigDecimal("249.99"), 60);
        addProduct(electronics, "USB-C Hub",
                "7-in-1 USB-C hub with HDMI and SD card slot", new BigDecimal("39.99"), 150);
        addProduct(electronics, "Mechanical Keyboard",
                "Tenkeyless mechanical keyboard with RGB backlight", new BigDecimal("119.99"), 45);

        // ---- Products — Clothing ----
        addProduct(clothing, "Running Shoes",
                "Lightweight breathable marathon running shoes", new BigDecimal("79.99"), 200);
        addProduct(clothing, "Denim Jacket",
                "Classic blue denim jacket, slim fit", new BigDecimal("59.99"), 120);
        addProduct(clothing, "Cotton T-Shirt",
                "Premium organic cotton T-shirt", new BigDecimal("19.99"), 500);

        // ---- Products — Books ----
        addProduct(books, "Clean Code",
                "A handbook of agile software craftsmanship by Robert C. Martin", new BigDecimal("34.99"), 75);
        addProduct(books, "Spring Boot in Action",
                "Practical guide to building Spring Boot applications", new BigDecimal("44.99"), 40);
        addProduct(books, "Designing Data-Intensive Applications",
                "The big ideas behind reliable, scalable, and maintainable systems", new BigDecimal("52.99"), 30);

        // ---- Products — Sports ----
        addProduct(sports, "Yoga Mat",
                "Non-slip eco-friendly yoga mat, 6mm thickness", new BigDecimal("29.99"), 180);
        addProduct(sports, "Dumbbells Set",
                "Adjustable dumbbell set 5–50 lbs", new BigDecimal("189.99"), 35);

        // ---- Products — Home ----
        addProduct(home, "Desk Lamp",
                "LED desk lamp with adjustable brightness and USB charging", new BigDecimal("35.99"), 95);
        addProduct(home, "Coffee Maker",
                "12-cup programmable drip coffee maker", new BigDecimal("69.99"), 55);

        categoryRepository.save(electronics);
        categoryRepository.save(clothing);
        categoryRepository.save(books);
        categoryRepository.save(sports);
        categoryRepository.save(home);

        log.info("=======================================================");
        log.info("  Database seeded successfully!");
        log.info("  Users: {}",    userRepository.count());
        log.info("  Roles: {}",    roleRepository.count());
        log.info("  Categories: {}", categoryRepository.count());
        log.info("  Products: {}",  productRepository.count());
        log.info("=======================================================");
        log.info("  H2 Console: http://localhost:8082/h2-console");
        log.info("  JDBC URL:   jdbc:h2:mem:fsd_exp6");
        log.info("=======================================================");
        log.info("  Sample API calls:");
        log.info("  GET /api/products?page=0&size=5");
        log.info("  GET /api/products/price-range?minPrice=30&maxPrice=200&page=0&size=5&sortBy=price");
        log.info("  GET /api/products/category/Electronics");
        log.info("  GET /api/products/criteria?minPrice=50&maxPrice=300&sortBy=price&sortDir=desc");
        log.info("  GET /api/products/spec?minPrice=20&maxPrice=100&category=Clothing");
        log.info("  GET /api/users/by-role?role=ADMIN");
        log.info("  GET /api/users/stats/role-counts");
        log.info("  GET /api/products/stats/avg-price");
        log.info("=======================================================");
    }

    @NonNull
    private Role createRole(String name) {
        return roleRepository.findByName(name)
                .orElseGet(() -> roleRepository.save(
                        Role.builder().name(name).build()));
    }

    @NonNull
    private User createUser(String username, String email, String password) {
        return userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .username(username)
                                .email(email)
                                .password(password)
                                .build()));
    }

    @NonNull
    private Category createCategory(String name, String desc) {
        return categoryRepository.findByNameIgnoreCase(name)
                .orElseGet(() -> {
                    Category c = Category.builder().name(name).description(desc).build();
                    return categoryRepository.save(c);
                });
    }

    private void addProduct(Category category, String name, String desc,
                             BigDecimal price, int stock) {
        Product p = Product.builder()
                .name(name)
                .description(desc)
                .price(price)
                .stock(stock)
                .category(category)
                .build();
        category.getProducts().add(p);
    }
}
