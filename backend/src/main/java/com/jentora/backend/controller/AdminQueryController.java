package com.jentora.backend.controller;

import com.jentora.backend.dto.ApiResponse;
import com.jentora.backend.dto.UpdateQueryStatusRequest;
import com.jentora.backend.entity.ContactQuery;
import com.jentora.backend.repository.ContactQueryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin/queries")
public class AdminQueryController {

    private final ContactQueryRepository queryRepository;

    public AdminQueryController(ContactQueryRepository queryRepository) {
        this.queryRepository = queryRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContactQuery>>> getAllQueries(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String search) {

        List<ContactQuery> queries;
        if (search != null && !search.trim().isEmpty()) {
            queries = queryRepository.searchQueries(search.trim());
        } else if (status != null && !status.trim().isEmpty()) {
            queries = queryRepository.findByStatusOrderByCreatedAtDesc(status.trim());
        } else if (source != null && !source.trim().isEmpty()) {
            queries = queryRepository.findBySourceOrderByCreatedAtDesc(source.trim());
        } else {
            queries = queryRepository.findAllByOrderByCreatedAtDesc();
        }

        return ResponseEntity.ok(ApiResponse.ok(queries));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ContactQuery>> getQueryById(@PathVariable Long id) {
        return queryRepository.findById(id)
                .map(q -> ResponseEntity.ok(ApiResponse.ok(q)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContactQuery>> updateQueryStatus(
            @PathVariable Long id,
            @RequestBody UpdateQueryStatusRequest request) {

        return queryRepository.findById(id)
                .map(query -> {
                    if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {
                        query.setStatus(request.getStatus().trim().toUpperCase());
                    }
                    if (request.getInternalNotes() != null) {
                        query.setInternalNotes(request.getInternalNotes());
                    }
                    if (request.getAssignedTo() != null) {
                        query.setAssignedTo(request.getAssignedTo());
                    }
                    query.setUpdatedAt(LocalDateTime.now());
                    ContactQuery updated = queryRepository.save(query);
                    return ResponseEntity.ok(ApiResponse.ok("Query updated successfully", updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteQuery(@PathVariable Long id) {
        if (!queryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        queryRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Query deleted successfully", "Deleted ID: " + id));
    }
}
