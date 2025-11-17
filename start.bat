@echo off
echo 🧬 BIAnexus - AI Bioinformatics Chatbot
echo =======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm run install-all
    echo.
)

if not exist "client\node_modules" (
    echo 📦 Installing client dependencies...
    cd client
    call npm install
    cd ..
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo ⚙️  Creating .env file from template...
    copy .env.example .env
    echo ✅ .env file created with demo mode enabled
    echo.
)

echo 🚀 Starting BIAnexus...
echo.
echo 📊 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:3001
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start both servers
call npm run dev
