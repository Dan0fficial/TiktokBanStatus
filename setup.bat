@echo off
echo Checking for Node.js installation...

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

echo Node.js is installed. Proceeding with setup...

:: Change directory to script location
cd /d "%~dp0"

:: Check if package.json exists
if not exist package.json (
    echo Error: package.json not found. Ensure you are in the correct directory.
    pause
    exit /b
)

:: Install dependencies
echo Installing dependencies...
npm install
npm install express
if %errorlevel% neq 0 (
    echo npm install failed. Check your internet connection or package.json file.
    pause
    exit /b
)

