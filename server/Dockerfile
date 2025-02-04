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

# Expose port 8080 (default for Spring Boot) and 5005 for remote debugging
EXPOSE 8080 5005

# Run the application
CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"]

