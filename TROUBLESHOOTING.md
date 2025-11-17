# 🔧 BIAnexus - Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### ❌ "npm: command not found"
**Problem:** Node.js is not installed or not in PATH

**Solution:**
1. Download and install Node.js from https://nodejs.org/
2. Choose LTS version (v18 or higher)
3. Restart terminal after installation
4. Verify: `node --version` and `npm --version`

---

#### ❌ "EACCES: permission denied"
**Problem:** Permission issues on Linux/Mac

**Solution:**
```bash
# Option 1: Use sudo (not recommended for development)
sudo npm install

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

#### ❌ "npm ERR! Cannot find module"
**Problem:** Dependencies not installed

**Solution:**
```bash
# Clean install
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json
npm run install-all
```

---

### Runtime Issues

#### ❌ "Port 3000 is already in use"
**Problem:** Another app is using port 3000

**Solution:**
```bash
# Option 1: Kill the process
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Option 2: Change port
# Edit client/package.json and add to scripts:
"start": "PORT=3005 react-scripts start"
```

---

#### ❌ "Port 3001 is already in use"
**Problem:** Backend port conflict

**Solution:**
Change in `.env`:
```
PORT=3002
```

Also update `client/package.json` proxy:
```json
"proxy": "http://localhost:3002"
```

---

#### ❌ "Cannot GET /api/chat"
**Problem:** Backend not running or proxy issue

**Solution:**
1. Make sure backend is running on port 3001
2. Check `client/package.json` has `"proxy": "http://localhost:3001"`
3. Restart both servers: `npm run dev`

---

#### ❌ "Network Error" when sending messages
**Problem:** CORS or backend connection issue

**Solution:**
1. Verify backend is running: `http://localhost:3001/api/health`
2. Check browser console for specific error
3. Ensure CORS is enabled in `server/index.js`:
```javascript
app.use(cors());
```

---

### Display Issues

#### ❌ Charts not showing
**Problem:** Recharts library issue

**Solution:**
```bash
cd client
npm install recharts --save
npm start
```

---

#### ❌ Tailwind styles not working
**Problem:** Tailwind not configured properly

**Solution:**
1. Verify `client/tailwind.config.js` exists
2. Verify `client/postcss.config.js` exists
3. Check `client/src/index.css` has Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Reinstall:
```bash
cd client
npm install tailwindcss autoprefixer postcss
npm start
```

---

#### ❌ Icons not displaying (Lucide React)
**Problem:** lucide-react not installed

**Solution:**
```bash
cd client
npm install lucide-react
npm start
```

---

### Performance Issues

#### ❌ App is slow or laggy
**Solutions:**
1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Disable browser extensions**: Some extensions interfere
3. **Check memory usage**: Close other apps
4. **Development mode is slower**: For demo, this is fine

---

#### ❌ Processing takes too long
**Problem:** Network latency or large data

**Solutions:**
1. Ensure `DEMO_MODE=true` in `.env` (no API calls)
2. Check browser DevTools Network tab for slow requests
3. Reduce mock data size in `server/data/mockDatabase.js`

---

### Database/API Issues

#### ❌ "API key not found"
**Problem:** .env file missing or misconfigured

**Solution:**
1. Copy `.env.example` to `.env`
2. For demo, ensure `DEMO_MODE=true`
3. No API key needed in demo mode!

---

#### ❌ "OpenAI API error"
**Problem:** Invalid API key or quota exceeded

**Solution:**
1. Set `DEMO_MODE=true` in `.env` (use mock data)
2. OR verify your OpenAI API key is correct
3. Check OpenAI dashboard for quota/billing

---

### Development Issues

#### ❌ Changes not reflecting
**Problem:** React not hot-reloading

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear cache and refresh
3. Restart dev server:
```bash
# Stop with Ctrl+C, then:
npm run dev
```

---

#### ❌ "Module not found: Can't resolve './components/...'"
**Problem:** File path issue

**Solution:**
1. Verify file exists at the path specified
2. Check capitalization (Linux/Mac are case-sensitive)
3. Ensure import path is correct:
```javascript
// Correct:
import Header from './components/Header';

// Incorrect:
import Header from './Components/Header';  // Wrong case
```

---

### Browser Issues

#### ❌ App works in Chrome but not Safari/Firefox
**Problem:** Browser compatibility

**Solution:**
1. Use Chrome/Edge for demo (best compatibility)
2. For other browsers, ensure they're updated
3. Check browser console for specific errors

---

#### ❌ "WebSocket connection failed"
**Problem:** React dev server WebSocket issue

**Solution:**
Add to `client/.env`:
```
WDS_SOCKET_PORT=0
```

---

### Docker Issues

#### ❌ "docker: command not found"
**Problem:** Docker not installed

**Solution:**
1. Download Docker Desktop from https://www.docker.com/
2. Install and start Docker
3. Verify: `docker --version`

---

#### ❌ "Cannot connect to Docker daemon"
**Problem:** Docker not running

**Solution:**
1. Start Docker Desktop
2. Wait for "Docker is running" status
3. Try again

---

#### ❌ Docker build fails
**Problem:** Build context or dependency issue

**Solution:**
```bash
# Clean build
docker-compose down
docker system prune -a
docker-compose build --no-cache
docker-compose up
```

---

## Demo-Specific Issues

### During Pitch

#### ❌ App crashes mid-demo
**Backup Plan:**
1. Have screenshots/video ready as backup
2. Refresh page (state will reset but app recovers)
3. Make light joke: "Even AI needs a coffee break!"
4. Continue with next demo point

---

#### ❌ Slow internet during live demo
**Prevention:**
1. Always use `DEMO_MODE=true` (no external API calls)
2. Test on local network beforehand
3. Have offline backup ready

---

#### ❌ Projector/screen resolution issues
**Quick Fix:**
1. Use browser zoom (Ctrl/Cmd + or -)
2. Press F11 for fullscreen
3. Adjust monitor resolution before demo

---

## Verification Checklist

Before your demo, verify everything works:

```bash
# 1. Backend health check
curl http://localhost:3001/api/health

# Should return: {"status":"healthy","timestamp":"..."}

# 2. Frontend loads
# Open: http://localhost:3000
# Should see: BIAnexus welcome screen

# 3. Sample query works
# Click any sample query button
# Should see: Processing animation → Results

# 4. Export works
# After getting results, click "Export Results (JSON)"
# Should download: bianexus-results-*.json
```

---

## Getting Help

### Self-Diagnosis
1. Check browser console (F12) for errors
2. Check terminal output for backend errors
3. Review `.env` file settings
4. Verify all files are present (see README)

### Quick Fixes to Try First
```bash
# Nuclear option - reset everything
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json
npm run install-all
npm run dev
```

### Still Not Working?
1. Create GitHub issue with:
   - Error message (full text)
   - Browser console screenshot
   - Terminal output
   - Your OS and Node version
2. Check existing issues for solutions
3. Review README.md setup instructions

---

## Performance Optimization

### For Faster Demos

**1. Reduce Processing Delay**
Edit `server/index.js`:
```javascript
// Change from 800ms to 300ms
await new Promise(resolve => setTimeout(resolve, 300));
```

**2. Reduce Step Animation Delay**
Edit `client/src/App.js`:
```javascript
// Change from 300ms to 150ms
await new Promise(resolve => setTimeout(resolve, 150));
```

**3. Preload Data**
Keep app running before demo (don't restart)

---

## Environment-Specific Tips

### Windows (WSL)
```bash
# Use WSL for better compatibility
wsl
cd /mnt/c/Users/user/Desktop/M2/startup
npm run dev
```

### macOS
```bash
# If port issues, use:
killall -9 node
npm run dev
```

### Linux
```bash
# May need to increase file watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## Emergency Reset Script

Save this as `reset.sh`:
```bash
#!/bin/bash
echo "🔄 Emergency Reset - BIAnexus"
echo "Killing all Node processes..."
killall -9 node 2>/dev/null
echo "Removing dependencies..."
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json 2>/dev/null
echo "Reinstalling..."
npm run install-all
echo "✅ Reset complete! Run: npm run dev"
```

---

## Pre-Demo Testing Script

```bash
#!/bin/bash
echo "🧪 Pre-Demo Test Suite"

# Test 1: Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node --version)"
else
    echo "❌ Node.js NOT installed"
    exit 1
fi

# Test 2: Check dependencies
if [ -d "node_modules" ] && [ -d "client/node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies missing - run: npm run install-all"
    exit 1
fi

# Test 3: Check .env
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env missing - copying from .env.example"
    cp .env.example .env
fi

# Test 4: Start and test backend
echo "Starting backend..."
npm run server &
SERVER_PID=$!
sleep 3

HEALTH=$(curl -s http://localhost:3001/api/health)
if [[ $HEALTH == *"healthy"* ]]; then
    echo "✅ Backend working"
else
    echo "❌ Backend not responding"
    kill $SERVER_PID
    exit 1
fi

kill $SERVER_PID
echo "✅ All tests passed! Ready for demo."
```

---

**Remember: Test everything 15 minutes before your pitch!**
