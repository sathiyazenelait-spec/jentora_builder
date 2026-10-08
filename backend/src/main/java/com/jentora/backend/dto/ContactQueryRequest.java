package com.jentora.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ContactQueryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String projectType;

    private String projectName;

    @NotBlank(message = "Message or requirement is required")
    private String message;

    private String source = "CONTACT_PAGE"; // CONTACT_PAGE or PROJECT_QUOTE_POPUP

    public ContactQueryRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getProjectType() { return projectType; }
    public void setProjectType(String projectType) { this.projectType = projectType; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
