# Multi-stage build for Spring Boot 3.4 (Java 17)
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build jar
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests -B

# Lightweight JRE runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create directory for persistent/file database
RUN mkdir -p /app/data

# Copy jar from builder stage
COPY --from=builder /app/target/jentora-backend-*.jar app.jar

ENV PORT=8082
ENV JAVA_TOOL_OPTIONS="-Xmx380m -Xms180m -XX:+UseG1GC"
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
