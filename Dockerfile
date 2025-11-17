# Multi-stage build for BIAnexus

# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup backend and serve
FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY package*.json ./
COPY server/ ./server/
RUN npm install --production

# Copy built frontend from stage 1
COPY --from=frontend-build /app/client/build ./client/build

# Set environment
ENV NODE_ENV=production
ENV PORT=3001
ENV DEMO_MODE=true

EXPOSE 3001

# Start the server
CMD ["node", "server/index.js"]
