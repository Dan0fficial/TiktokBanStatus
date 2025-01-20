@echo off
cd /d "%~dp0"
echo Starting the server...
start "" http://localhost:3000
node server.js
pause
