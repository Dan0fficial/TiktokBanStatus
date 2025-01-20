@echo off
echo Checking for Node.js installation...

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

echo Node.js is installed. Proceeding with dependency removal...

:: Change directory to script location
cd /d "%~dp0"

:: Check if package.json exists
if not exist package.json (
    echo Error: package.json not found. Ensure you are in the correct directory.
    pause
    exit /b
)

:: Remove node_modules folder
echo Removing node_modules folder...
rmdir /s /q node_modules
if exist node_modules (
    echo Failed to remove node_modules. Try running this script as administrator.
    pause
    exit /b
)

:: Remove package-lock.json (optional)
if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)

echo Dependencies removed successfully.
pause
exit /b
