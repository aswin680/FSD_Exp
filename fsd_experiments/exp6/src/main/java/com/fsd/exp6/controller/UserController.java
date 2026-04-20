package com.fsd.exp6.controller;

import com.fsd.exp6.entity.Role;
import com.fsd.exp6.entity.User;
import com.fsd.exp6.repository.RoleRepository;
import com.fsd.exp6.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.save(user));
    }
    
    @GetMapping("/roles")
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
    
    @PostMapping("/{userId}/roles/{roleId}")
    public ResponseEntity<?> assignRole(@PathVariable Long userId, @PathVariable Long roleId) {
        return userRepository.findById(userId).flatMap(user -> 
            roleRepository.findById(roleId).map(role -> {
                user.getRoles().add(role);
                return ResponseEntity.ok(userRepository.save(user));
            })
        ).orElse(ResponseEntity.badRequest().build());
    }
}
