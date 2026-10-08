package com.jentora.backend.dto;

public class UpdateQueryStatusRequest {

    private String status; // NEW, IN_PROGRESS, RESOLVED, ARCHIVED
    private String internalNotes;
    private String assignedTo;

    public UpdateQueryStatusRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getInternalNotes() { return internalNotes; }
    public void setInternalNotes(String internalNotes) { this.internalNotes = internalNotes; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
}
