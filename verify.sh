#!/bin/bash

# BIAnexus Installation Verification Script
# Run this after installation to verify everything is set up correctly

echo "🧬 BIAnexus - Installation Verification"
echo "========================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: Node.js
echo -n "Checking Node.js installation... "
if command -v node &> /dev/null
then
    VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found $VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: npm
echo -n "Checking npm installation... "
if command -v npm &> /dev/null
then
    VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found v$VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    ERRORS=$((ERRORS + 1))
fi

# Check 3: Root dependencies
echo -n "Checking root dependencies... "
if [ -d "node_modules" ]; then
    COUNT=$(ls -1 node_modules | wc -l)
    echo -e "${GREEN}✓${NC} Found $COUNT packages"
else
    echo -e "${RED}✗${NC} node_modules not found"
    ERRORS=$((ERRORS + 1))
fi

# Check 4: Client dependencies
echo -n "Checking client dependencies... "
if [ -d "client/node_modules" ]; then
    COUNT=$(ls -1 client/node_modules | wc -l)
    echo -e "${GREEN}✓${NC} Found $COUNT packages"
else
    echo -e "${RED}✗${NC} client/node_modules not found"
    ERRORS=$((ERRORS + 1))
fi

# Check 5: Environment file
echo -n "Checking .env file... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} Not found (creating from .env.example)"
    cp .env.example .env
fi

# Check 6: Critical files
echo ""
echo "Checking critical files:"

FILES=(
    "package.json"
    "server/index.js"
    "server/data/mockDatabase.js"
    "server/utils/analysisEngine.js"
    "client/package.json"
    "client/src/App.js"
    "client/src/index.js"
    "client/tailwind.config.js"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file - MISSING"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check 7: Documentation
echo ""
echo "Checking documentation:"

DOCS=(
    "README.md"
    "PITCH_DEMO.md"
    "QUICK_START.md"
    "TROUBLESHOOTING.md"
    "SAMPLE_QUERIES.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "  ${GREEN}✓${NC} $doc"
    else
        echo -e "  ${YELLOW}⚠${NC} $doc - Missing (optional)"
    fi
done

# Summary
echo ""
echo "========================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "🚀 Ready to start BIAnexus!"
    echo ""
    echo "Run: npm run dev"
    echo "Then open: http://localhost:3000"
else
    echo -e "${RED}✗ $ERRORS error(s) found${NC}"
    echo ""
    echo "To fix, run:"
    echo "  npm run install-all"
fi
echo ""
