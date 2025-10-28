FROM eclipse-temurin:21-jdk-alpine

WORKDIR /App

RUN apk add --no-cache mediainfo

COPY .mvn .mvn
COPY mvnw pom.xml ./
COPY src src

RUN ./mvnw dependency:go-offline
CMD ["./mvnw", "spring-boot:run"]
