#!/bin/bash

# BIAnexus - Quick Deploy to Render via GitHub

echo "🚀 BIAnexus - Deploy to Render via GitHub"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .

# Commit
echo ""
echo "💾 Creating commit..."
git commit -m "Deploy: BIAnexus bioinformatics chatbot" || echo "Nothing to commit or already committed"

# Instructions for GitHub
echo ""
echo "=========================================="
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Create a NEW repository on GitHub:"
echo "   https://github.com/new"
echo "   Name it: bianexus"
echo ""
echo "2️⃣  Run these commands (replace YOUR_USERNAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/bianexus.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  Deploy on Render:"
echo "   https://render.com"
echo ""
echo "   BACKEND (Web Service):"
echo "   - Build Command: npm install"
echo "   - Start Command: node server/index.js"
echo "   - Environment: DEMO_MODE=true"
echo ""
echo "   FRONTEND (Static Site):"
echo "   - Root Directory: client"
echo "   - Build Command: npm install && npm run build"
echo "   - Publish Directory: build"
echo "   - Environment: REACT_APP_API_URL=https://YOUR-BACKEND-URL.onrender.com"
echo ""
echo "📖 Full guide: DEPLOY_RENDER.md"
echo "=========================================="
