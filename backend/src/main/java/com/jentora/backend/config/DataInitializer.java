package com.jentora.backend.config;

import com.jentora.backend.entity.ContactQuery;
import com.jentora.backend.entity.User;
import com.jentora.backend.entity.WebsiteContent;
import com.jentora.backend.repository.ContactQueryRepository;
import com.jentora.backend.repository.UserRepository;
import com.jentora.backend.repository.WebsiteContentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ContactQueryRepository queryRepository;
    private final WebsiteContentRepository contentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            ContactQueryRepository queryRepository,
            WebsiteContentRepository contentRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.queryRepository = queryRepository;
        this.contentRepository = contentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Super Admin User if not exists
        if (userRepository.findByUsername("superadmin").isEmpty()) {
            User superAdmin = new User();
            superAdmin.setUsername("superadmin");
            superAdmin.setPassword(passwordEncoder.encode("Admin@Jentora2026!"));
            superAdmin.setEmail("admin@jentora.co.in");
            superAdmin.setFullName("Jentora Super Administrator");
            superAdmin.setRole("ROLE_SUPER_ADMIN");
            superAdmin.setActive(true);
            superAdmin.setCreatedAt(LocalDateTime.now());
            userRepository.save(superAdmin);
            System.out.println(">>> SEEDED SUPER ADMIN USER: superadmin / Admin@Jentora2026!");
        }

        // 2. Seed Standard Admin User if not exists
        if (userRepository.findByUsername("manager").isEmpty()) {
            User manager = new User();
            manager.setUsername("manager");
            manager.setPassword(passwordEncoder.encode("Manager@Jentora2026!"));
            manager.setEmail("manager@jentora.co.in");
            manager.setFullName("Operations Manager");
            manager.setRole("ROLE_ADMIN");
            manager.setActive(true);
            manager.setCreatedAt(LocalDateTime.now());
            userRepository.save(manager);
            System.out.println(">>> SEEDED ADMIN USER: manager / Manager@Jentora2026!");
        }

        // 3. Seed Sample Inquiries if empty
        if (queryRepository.count() == 0) {
            ContactQuery q1 = new ContactQuery();
            q1.setName("Karthik Sundaram");
            q1.setEmail("karthik.s@example.com");
            q1.setPhone("+91 98401 23456");
            q1.setProjectType("Residential Construction");
            q1.setProjectName("Custom Villa in Anna Nagar");
            q1.setMessage("Looking for end-to-end luxury villa construction on a 3,600 sq.ft plot with sustainable architecture and modern interior woodwork.");
            q1.setSource("CONTACT_PAGE");
            q1.setStatus("NEW");
            q1.setCreatedAt(LocalDateTime.now().minusHours(3));
            queryRepository.save(q1);

            ContactQuery q2 = new ContactQuery();
            q2.setName("Dr. Ananya Natarajan");
            q2.setEmail("ananya.natarajan@healthgroup.in");
            q2.setPhone("+91 98840 98765");
            q2.setProjectType("Commercial Construction");
            q2.setProjectName("Jentora Edone (Choolaimedu)");
            q2.setMessage("Interested in acquiring 2 floors in Jentora Edone for a specialized diagnostic center and clinic setup. Requesting brochure and pricing breakdown.");
            q2.setSource("PROJECT_QUOTE_POPUP");
            q2.setStatus("IN_PROGRESS");
            q2.setAssignedTo("Mrs. Girija");
            q2.setInternalNotes("Sent initial floor plan brochure via WhatsApp. Meeting scheduled for Friday.");
            q2.setCreatedAt(LocalDateTime.now().minusDays(1));
            queryRepository.save(q2);

            ContactQuery q3 = new ContactQuery();
            q3.setName("Rajeshwar Menon");
            q3.setEmail("menon.rajeshwar@logistics.com");
            q3.setPhone("+91 94450 11223");
            q3.setProjectType("Turnkey Projects");
            q3.setProjectName("Jentora Highland Prive");
            q3.setMessage("Enquiring about villa unit booking in Highland Prive Coimbatore. Need milestone payment schedule and DTCP approval documents.");
            q3.setSource("PROJECT_QUOTE_POPUP");
            q3.setStatus("RESOLVED");
            q3.setAssignedTo("Mr. Saravanan V");
            q3.setInternalNotes("Client visited site. Booking advance processed for Villa #14.");
            q3.setCreatedAt(LocalDateTime.now().minusDays(3));
            queryRepository.save(q3);

            System.out.println(">>> SEEDED SAMPLE CONTACT & QUOTE INQUIRIES");
        }

        // 4. Seed Initial Website Content
        seedContentIfAbsent("company_info", "{\"name\":\"Jentora Builder Private Limited\",\"tagline\":\"Passion in every idea. Precision in every detail. Perfection in every project.\",\"experience\":\"17+\",\"completedProjects\":2,\"primaryPhone\":\"+91 9444484625\",\"secondaryPhone\":\"+91 9444434196\",\"email\":\"info@jentora.co.in\",\"whatsapp\":\"+91 9444484625\",\"address\":\"Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar, Chennai – 600040.\",\"operatingHours\":\"Monday to Saturday – 10.00 am to 6.00 pm\"}");
    }

    private void seedContentIfAbsent(String key, String jsonContent) {
        if (contentRepository.findByKey(key).isEmpty()) {
            WebsiteContent content = new WebsiteContent(key, jsonContent, "SYSTEM");
            contentRepository.save(content);
        }
    }
}
