@echo off
REM BIAnexus Installation Verification Script
REM Run this after installation to verify everything is set up correctly

echo 🧬 BIAnexus - Installation Verification
echo ========================================
echo.

set ERRORS=0

REM Check 1: Node.js
echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js found
    node --version
) else (
    echo [ERROR] Node.js not found
    set /a ERRORS+=1
)

REM Check 2: npm
echo Checking npm installation...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] npm found
    npm --version
) else (
    echo [ERROR] npm not found
    set /a ERRORS+=1
)

REM Check 3: Root dependencies
echo Checking root dependencies...
if exist "node_modules" (
    echo [OK] node_modules found
) else (
    echo [ERROR] node_modules not found
    set /a ERRORS+=1
)

REM Check 4: Client dependencies
echo Checking client dependencies...
if exist "client\node_modules" (
    echo [OK] client\node_modules found
) else (
    echo [ERROR] client\node_modules not found
    set /a ERRORS+=1
)

REM Check 5: Environment file
echo Checking .env file...
if exist ".env" (
    echo [OK] .env found
) else (
    echo [WARNING] .env not found - creating from .env.example
    copy .env.example .env >nul
)

REM Check 6: Critical files
echo.
echo Checking critical files:

set FILES=package.json server\index.js server\data\mockDatabase.js server\utils\analysisEngine.js client\package.json client\src\App.js client\src\index.js client\tailwind.config.js

for %%f in (%FILES%) do (
    if exist "%%f" (
        echo   [OK] %%f
    ) else (
        echo   [ERROR] %%f - MISSING
        set /a ERRORS+=1
    )
)

REM Check 7: Documentation
echo.
echo Checking documentation:

set DOCS=README.md PITCH_DEMO.md QUICK_START.md TROUBLESHOOTING.md SAMPLE_QUERIES.md

for %%d in (%DOCS%) do (
    if exist "%%d" (
        echo   [OK] %%d
    ) else (
        echo   [WARNING] %%d - Missing (optional)
    )
)

REM Summary
echo.
echo ========================================
if %ERRORS% equ 0 (
    echo [SUCCESS] All checks passed!
    echo.
    echo 🚀 Ready to start BIAnexus!
    echo.
    echo Run: npm run dev
    echo Then open: http://localhost:3000
) else (
    echo [FAIL] %ERRORS% error(s) found
    echo.
    echo To fix, run:
    echo   npm run install-all
)
echo.
pause
