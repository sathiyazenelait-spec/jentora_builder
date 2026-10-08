package com.jentora.backend.controller;

import com.jentora.backend.dto.ApiResponse;
import com.jentora.backend.dto.AuthRequest;
import com.jentora.backend.dto.AuthResponse;
import com.jentora.backend.dto.UserDto;
import com.jentora.backend.entity.User;
import com.jentora.backend.repository.UserRepository;
import com.jentora.backend.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider,
            UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .or(() -> userRepository.findByEmail(loginRequest.getUsername()))
                .orElseThrow();

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse authResponse = new AuthResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole()
        );

        return ResponseEntity.ok(ApiResponse.ok("Login successful", authResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logoutUser() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(ApiResponse.ok("Logged out successfully", "Session terminated"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLoginAt(user.getLastLoginAt());

        return ResponseEntity.ok(ApiResponse.ok(dto));
    }
}
