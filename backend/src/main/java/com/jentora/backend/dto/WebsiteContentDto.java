package com.jentora.backend.dto;

import java.time.LocalDateTime;

public class WebsiteContentDto {
    private String key;
    private String jsonContent;
    private String updatedBy;
    private LocalDateTime updatedAt;

    public WebsiteContentDto() {}

    public WebsiteContentDto(String key, String jsonContent, String updatedBy, LocalDateTime updatedAt) {
        this.key = key;
        this.jsonContent = jsonContent;
        this.updatedBy = updatedBy;
        this.updatedAt = updatedAt;
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
