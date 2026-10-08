package com.jentora.backend.dto;

import java.util.Map;

public class DashboardStatsDto {
    private long totalQueries;
    private long newQueries;
    private long inProgressQueries;
    private long resolvedQueries;
    private long totalUsers;
    private long totalProjects;
    private Map<String, Long> queriesBySource;

    public DashboardStatsDto() {}

    public long getTotalQueries() { return totalQueries; }
    public void setTotalQueries(long totalQueries) { this.totalQueries = totalQueries; }

    public long getNewQueries() { return newQueries; }
    public void setNewQueries(long newQueries) { this.newQueries = newQueries; }

    public long getInProgressQueries() { return inProgressQueries; }
    public void setInProgressQueries(long inProgressQueries) { this.inProgressQueries = inProgressQueries; }

    public long getResolvedQueries() { return resolvedQueries; }
    public void setResolvedQueries(long resolvedQueries) { this.resolvedQueries = resolvedQueries; }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalProjects() { return totalProjects; }
    public void setTotalProjects(long totalProjects) { this.totalProjects = totalProjects; }

    public Map<String, Long> getQueriesBySource() { return queriesBySource; }
    public void setQueriesBySource(Map<String, Long> queriesBySource) { this.queriesBySource = queriesBySource; }
}
