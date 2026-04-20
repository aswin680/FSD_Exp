@echo off
title EXP6 Spring Boot App

echo ===============================================
echo   EXP6 - Spring Boot JPA Demo
echo ===============================================
echo.

:: Set Java
set "JAVA_HOME=C:\Program Files\Java\jdk-17"

:: Kill anything on port 8082 first
echo Freeing port 8082...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8082 "') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo Port 8082 ready.
echo.

:: Find Maven
if exist "%TEMP%\maven\apache-maven-3.9.6\bin\mvn.cmd" (
    set "MVN=%TEMP%\maven\apache-maven-3.9.6\bin\mvn.cmd"
    goto :run
)

echo Maven not found. Downloading...
powershell -Command "Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip' -OutFile '%TEMP%\maven.zip' -UseBasicParsing; Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath '%TEMP%\maven' -Force"
set "MVN=%TEMP%\maven\apache-maven-3.9.6\bin\mvn.cmd"
echo Done.

:run
echo Starting app on http://localhost:8082
echo Press Ctrl+C to stop.
echo.
call "%MVN%" spring-boot:run

pause
