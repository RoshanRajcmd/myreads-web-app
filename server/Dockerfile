# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-focal

# Set the working directory to /myreads-server-app
WORKDIR /myreads-server-app

# Copy the current directory contents into the container at /myreads-server-app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Install Maven and its dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Run the application
CMD ["./mvnw", "spring-boot:run"]

# Expose port 3306 (default for Spring Boot)
EXPOSE 3306