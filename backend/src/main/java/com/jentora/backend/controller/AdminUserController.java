package com.jentora.backend.controller;

import com.jentora.backend.dto.ApiResponse;
import com.jentora.backend.dto.CreateUserRequest;
import com.jentora.backend.dto.UpdateUserRequest;
import com.jentora.backend.dto.UserDto;
import com.jentora.backend.entity.User;
import com.jentora.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AdminUserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(u -> ResponseEntity.ok(ApiResponse.ok(toDto(u))))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> createUser(@Valid @RequestBody CreateUserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Username is already taken!"));
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Email is already registered!"));
        }

        User user = new User();
        user.setUsername(request.getUsername().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setFullName(request.getFullName().trim());
        user.setRole(request.getRole().startsWith("ROLE_") ? request.getRole() : "ROLE_" + request.getRole());
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);
        return ResponseEntity.ok(ApiResponse.ok("User created successfully", toDto(saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest request) {

        return userRepository.findById(id)
                .map(user -> {
                    if (request.getFullName() != null && !request.getFullName().trim().isEmpty()) {
                        user.setFullName(request.getFullName().trim());
                    }
                    if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
                        user.setEmail(request.getEmail().trim().toLowerCase());
                    }
                    if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
                        user.setPassword(passwordEncoder.encode(request.getPassword().trim()));
                    }
                    if (request.getRole() != null && !request.getRole().trim().isEmpty()) {
                        user.setRole(request.getRole().startsWith("ROLE_") ? request.getRole() : "ROLE_" + request.getRole());
                    }
                    if (request.getActive() != null) {
                        user.setActive(request.getActive());
                    }
                    User updated = userRepository.save(user);
                    return ResponseEntity.ok(ApiResponse.ok("User updated successfully", toDto(updated)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    if ("superadmin".equalsIgnoreCase(user.getUsername())) {
                        return ResponseEntity.badRequest().body(ApiResponse.<String>error("Cannot delete default Super Admin account"));
                    }
                    userRepository.delete(user);
                    return ResponseEntity.ok(ApiResponse.ok("User deleted successfully", "User ID: " + id));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLoginAt(user.getLastLoginAt());
        return dto;
    }
}
