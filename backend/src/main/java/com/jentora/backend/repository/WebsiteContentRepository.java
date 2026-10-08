package com.jentora.backend.repository;

import com.jentora.backend.entity.WebsiteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WebsiteContentRepository extends JpaRepository<WebsiteContent, String> {
    Optional<WebsiteContent> findByKey(String key);
}
