package com.jentora.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
public class KeepAliveCronJob {

    private static final Logger log = LoggerFactory.getLogger(KeepAliveCronJob.class);

    @Value("${server.port:8082}")
    private String serverPort;

    @Value("${jentora.keepalive.url:https://jentora-builder-backend-2kx8.onrender.com/api/public/content}")
    private String keepAliveUrl;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    /**
     * Executes cron job every 9 minutes (540,000 ms) to keep the backend server continuously active
     * and prevent cloud containers (Railway / Render) from idling or sleeping.
     */
    @Scheduled(fixedRate = 540000, initialDelay = 60000)
    public void pingSelfKeepAlive() {
        // 1. Direct local heartbeat
        try {
            String localUrl = "http://localhost:" + serverPort + "/api/public/content";
            HttpRequest localReq = HttpRequest.newBuilder()
                    .uri(URI.create(localUrl))
                    .timeout(Duration.ofSeconds(5))
                    .GET()
                    .build();
            HttpResponse<String> localRes = httpClient.send(localReq, HttpResponse.BodyHandlers.ofString());
            log.info("Local keep-alive ping executed. Status: {}", localRes.statusCode());
        } catch (Exception e) {
            log.debug("Local keep-alive ping note: {}", e.getMessage());
        }

        // 2. Public domain heartbeat
        try {
            if (keepAliveUrl != null && !keepAliveUrl.isBlank()) {
                HttpRequest extReq = HttpRequest.newBuilder()
                        .uri(URI.create(keepAliveUrl))
                        .timeout(Duration.ofSeconds(12))
                        .GET()
                        .build();
                HttpResponse<String> extRes = httpClient.send(extReq, HttpResponse.BodyHandlers.ofString());
                log.info("External keep-alive ping executed. Status: {}, URL: {}", extRes.statusCode(), keepAliveUrl);
            }
        } catch (Exception e) {
            log.warn("External keep-alive cron ping warning: {}", e.getMessage());
        }
    }
}
