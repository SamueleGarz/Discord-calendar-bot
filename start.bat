@echo off
title Discord Bot Starter
echo ================================
echo   Starting Discord Bot
echo ================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install it from https://nodejs.org/
    pause
    exit /b
)

if not exist "config.json" (
    echo [ERROR] config.json not found in the current directory!
    echo Please create a config.json according to the README.
    pause
    exit /b
)

:: Run npm start (your package.json handles install + launch)
echo Running bot...
npm start

echo.
pause
