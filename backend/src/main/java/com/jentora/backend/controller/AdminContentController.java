package com.jentora.backend.controller;

import com.jentora.backend.dto.ApiResponse;
import com.jentora.backend.dto.DashboardStatsDto;
import com.jentora.backend.dto.WebsiteContentDto;
import com.jentora.backend.entity.WebsiteContent;
import com.jentora.backend.repository.ContactQueryRepository;
import com.jentora.backend.repository.UserRepository;
import com.jentora.backend.repository.WebsiteContentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminContentController {

    private final WebsiteContentRepository contentRepository;
    private final ContactQueryRepository queryRepository;
    private final UserRepository userRepository;

    public AdminContentController(
            WebsiteContentRepository contentRepository,
            ContactQueryRepository queryRepository,
            UserRepository userRepository) {
        this.contentRepository = contentRepository;
        this.queryRepository = queryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalQueries(queryRepository.count());
        stats.setNewQueries(queryRepository.countByStatus("NEW"));
        stats.setInProgressQueries(queryRepository.countByStatus("IN_PROGRESS"));
        stats.setResolvedQueries(queryRepository.countByStatus("RESOLVED"));
        stats.setTotalUsers(userRepository.count());
        stats.setTotalProjects(4); // Default 4 active projects

        Map<String, Long> bySource = new HashMap<>();
        bySource.put("CONTACT_PAGE", (long) queryRepository.findBySourceOrderByCreatedAtDesc("CONTACT_PAGE").size());
        bySource.put("PROJECT_QUOTE_POPUP", (long) queryRepository.findBySourceOrderByCreatedAtDesc("PROJECT_QUOTE_POPUP").size());
        stats.setQueriesBySource(bySource);

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }

    @GetMapping("/content")
    public ResponseEntity<ApiResponse<List<WebsiteContentDto>>> getAllContent() {
        List<WebsiteContentDto> list = contentRepository.findAll().stream()
                .map(c -> new WebsiteContentDto(c.getKey(), c.getJsonContent(), c.getUpdatedBy(), c.getUpdatedAt()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/content/{key}")
    public ResponseEntity<ApiResponse<WebsiteContentDto>> getContentByKey(@PathVariable String key) {
        return contentRepository.findByKey(key)
                .map(c -> ResponseEntity.ok(ApiResponse.ok(new WebsiteContentDto(c.getKey(), c.getJsonContent(), c.getUpdatedBy(), c.getUpdatedAt()))))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/content/{key}")
    public ResponseEntity<ApiResponse<WebsiteContentDto>> updateContent(
            @PathVariable String key,
            @RequestBody Map<String, String> body) {

        String jsonContent = body.get("jsonContent");
        if (jsonContent == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("jsonContent is required"));
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth != null ? auth.getName() : "admin";

        WebsiteContent content = contentRepository.findByKey(key)
                .orElse(new WebsiteContent(key, jsonContent, currentUsername));

        content.setJsonContent(jsonContent);
        content.setUpdatedBy(currentUsername);
        content.setUpdatedAt(LocalDateTime.now());

        WebsiteContent saved = contentRepository.save(content);
        return ResponseEntity.ok(ApiResponse.ok("Content updated successfully for key: " + key,
                new WebsiteContentDto(saved.getKey(), saved.getJsonContent(), saved.getUpdatedBy(), saved.getUpdatedAt())));
    }
}
