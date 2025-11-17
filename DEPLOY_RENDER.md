# BIAnexus Deployment Guide - Render

## Quick Deploy to Render

### Prerequisites
1. GitHub account
2. Render account (free): https://render.com
3. Git installed

---

## Step 1: Prepare for GitHub

First, let's initialize git and create a `.gitignore`:

```bash
cd /mnt/c/Users/user/Desktop/M2/startup
git init
git add .
git commit -m "Initial commit - BIAnexus bioinformatics chatbot"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/bianexus.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

1. Go to https://render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:

**Settings:**
- **Name**: `bianexus-backend` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server/index.js`
- **Plan**: `Free`

**Environment Variables:**
Click "Add Environment Variable" and add:
```
DEMO_MODE=true
PORT=3001
```

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. Copy the URL (will be like: `https://bianexus-backend.onrender.com`)

---

## Step 3: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:

**Settings:**
- **Name**: `bianexus` (or your choice)
- **Branch**: `main`
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Plan**: `Free`

**Environment Variables:**
```
REACT_APP_API_URL=https://bianexus-backend.onrender.com
```
(Replace with YOUR backend URL from Step 2)

4. Click **"Create Static Site"**
5. Wait for deployment (5-10 minutes)

---

## Step 4: Update Frontend to Use API URL

We need to modify the frontend to use the environment variable for the API URL.
