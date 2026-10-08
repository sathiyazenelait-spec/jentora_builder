package com.jentora.backend.repository;

import com.jentora.backend.entity.ContactQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactQueryRepository extends JpaRepository<ContactQuery, Long> {
    List<ContactQuery> findAllByOrderByCreatedAtDesc();
    List<ContactQuery> findByStatusOrderByCreatedAtDesc(String status);
    List<ContactQuery> findBySourceOrderByCreatedAtDesc(String source);
    
    long countByStatus(String status);

    @Query("SELECT q FROM ContactQuery q WHERE " +
           "LOWER(q.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.phone) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.projectName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.message) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY q.createdAt DESC")
    List<ContactQuery> searchQueries(@Param("keyword") String keyword);
}
