package com.jentora.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "website_contents")
public class WebsiteContent {

    @Id
    @Column(name = "content_key", nullable = false, length = 100)
    private String key;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String jsonContent;

    @Column(length = 100)
    private String updatedBy;

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public WebsiteContent() {}

    public WebsiteContent(String key, String jsonContent, String updatedBy) {
        this.key = key;
        this.jsonContent = jsonContent;
        this.updatedBy = updatedBy;
        this.updatedAt = LocalDateTime.now();
    }

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public String getJsonContent() { return jsonContent; }
    public void setJsonContent(String jsonContent) { this.jsonContent = jsonContent; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
