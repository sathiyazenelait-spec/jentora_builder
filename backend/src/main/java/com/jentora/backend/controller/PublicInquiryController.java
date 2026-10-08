package com.jentora.backend.controller;

import com.jentora.backend.dto.ApiResponse;
import com.jentora.backend.dto.ContactQueryRequest;
import com.jentora.backend.entity.ContactQuery;
import com.jentora.backend.entity.WebsiteContent;
import com.jentora.backend.repository.ContactQueryRepository;
import com.jentora.backend.repository.WebsiteContentRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PublicInquiryController {

    private final ContactQueryRepository queryRepository;
    private final WebsiteContentRepository contentRepository;

    public PublicInquiryController(
            ContactQueryRepository queryRepository,
            WebsiteContentRepository contentRepository) {
        this.queryRepository = queryRepository;
        this.contentRepository = contentRepository;
    }

    @PostMapping("/contact/submit")
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitContactInquiry(@Valid @RequestBody ContactQueryRequest request) {
        ContactQuery query = new ContactQuery();
        query.setName(request.getName());
        query.setEmail(request.getEmail());
        query.setPhone(request.getPhone());
        query.setProjectType(request.getProjectType());
        query.setProjectName(request.getProjectName());
        query.setMessage(request.getMessage());
        query.setSource("CONTACT_PAGE");
        query.setStatus("NEW");
        query.setCreatedAt(LocalDateTime.now());

        ContactQuery saved = queryRepository.save(query);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("referenceId", "JENTORA-ENQ-" + saved.getId());
        responseData.put("name", saved.getName());
        responseData.put("receivedAt", saved.getCreatedAt());

        return ResponseEntity.ok(ApiResponse.ok("Thank you! Your enquiry has been received by Jentora Builder.", responseData));
    }

    @PostMapping("/quote/submit")
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitQuoteRequest(@Valid @RequestBody ContactQueryRequest request) {
        ContactQuery query = new ContactQuery();
        query.setName(request.getName());
        query.setEmail(request.getEmail());
        query.setPhone(request.getPhone());
        query.setProjectType(request.getProjectType() != null ? request.getProjectType() : "Project Quote Request");
        query.setProjectName(request.getProjectName());
        query.setMessage(request.getMessage());
        query.setSource("PROJECT_QUOTE_POPUP");
        query.setStatus("NEW");
        query.setCreatedAt(LocalDateTime.now());

        ContactQuery saved = queryRepository.save(query);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("quoteReferenceId", "JENTORA-QTE-" + saved.getId());
        responseData.put("projectName", saved.getProjectName());
        responseData.put("receivedAt", saved.getCreatedAt());

        return ResponseEntity.ok(ApiResponse.ok("Quote request registered successfully for " + saved.getProjectName(), responseData));
    }

    @GetMapping("/public/content")
    public ResponseEntity<ApiResponse<Map<String, String>>> getAllPublicContent() {
        List<WebsiteContent> list = contentRepository.findAll();
        Map<String, String> contentMap = new HashMap<>();
        for (WebsiteContent item : list) {
            contentMap.put(item.getKey(), item.getJsonContent());
        }
        return ResponseEntity.ok(ApiResponse.ok(contentMap));
    }

    @GetMapping("/public/content/{key}")
    public ResponseEntity<ApiResponse<String>> getPublicContentByKey(@PathVariable String key) {
        return contentRepository.findByKey(key)
                .map(c -> ResponseEntity.ok(ApiResponse.ok(c.getJsonContent())))
                .orElse(ResponseEntity.notFound().build());
    }
}
