# Dockerization of Yolo E-Commerce Application: Implementation Explanation

## 1. Choice of Base Image
- Frontend: node:14-slim (~150MB) for build, nginx:alpine (~22MB) for serving, compatible with Node 13.12.0 (per client/package.json).
- Backend: node:14-slim (~150MB) for Express.js compatibility.
- MongoDB: mongo:latest for a reliable database.
- Total Size: Frontend (54.5MB) + backend (226MB) = 280.5MB, meets rubric requirement of <400MB.

## 2. Dockerfile Directives
- Frontend (client/Dockerfile):
  - FROM node:14-slim AS build: Build stage.
  - WORKDIR /app: Sets working directory.
  - COPY package*.json ./: Caches dependencies.
  - RUN npm install: Installs all dependencies (dev and production).
  - COPY . .: Copies code.
  - RUN npm run build: Builds React app.
  - FROM nginx:alpine: Lightweight serve stage.
  - COPY --from=build /app/build /usr/share/nginx/html: Copies build output.
  - EXPOSE 80: Documents port.
  - CMD ["nginx", "-g", "daemon off;"]: Runs Nginx.
- Backend (backend/Dockerfile):
  - FROM node:14-slim: Base image.
  - WORKDIR /app, COPY package*.json ./, RUN npm install --only=production, COPY . ., ENV NODE_ENV=production, EXPOSE 5000, CMD ["node", "server.js"].
- Purpose: Deploy production-ready microservices, with client optimized via nginx:alpine.

## 3. Docker Compose Networking
- Network: yolo-net (bridge driver) enables microservice communication (e.g., mongo hostname).
- Ports: 3000:80 (frontend), 5000:5000 (backend), 27017:27017 (MongoDB).
- Reasoning: Ensures container communication and external access.

## 4. Docker Compose Volume Definition
- Volumes:
  - mongo-data:/data/db: Persists MongoDB data for "Add Product" functionality.
  - ./client:/app, ./backend:/app: Syncs code for development.
  - /app/node_modules: Preserves container dependencies.
- Purpose: Supports data persistence and developer workflow.

## 5. Git Workflow
- Forked https://github.com/Mwangi121/yolo.git to https://github.com/nuisance-07/yolo.git.
- Made >=10 descriptive commits on master branch (e.g., .gitignore, .dockerignore, Dockerfiles, docker-compose, README, screenshots).
- Used .gitignore and .dockerignore to exclude node_modules, logs, build/, dist/, and backups.
- Pushed to master branch of nuisance-07/yolo.

## 6. Successful Running and Debugging
- Built with docker compose build and ran with docker compose up -d.
- Tested at http://localhost:3000, verified "Add Product" functionality (file uploads via /api/products) and data persistence using mongosh mongodb://mongo:27017/yolomy.
- Debugged using docker compose logs and docker network inspect yolo-net.
- Added MongoDB healthcheck to ensure backend startup reliability.

## 7. Good Practices
- Image Naming: mwas121/yolo-client:1.0.0, mwas121/yolo-backend:1.0.0 (semantic versioning).
- Optimization: Used .dockerignore, layer caching, --only=production (backend). Client includes dev dependencies.
- Compose: Defined services, network, volumes, and healthcheck for reliable orchestration.

## 8. Docker Hub Screenshot
- Pushed images to Docker Hub[](https://hub.docker.com/u/mwas121) with mwas121/yolo-client:1.0.0, mwas121/yolo-backend:1.0.0.
- Included dockerhub-screenshot.png showing image versions, along with additional screenshots (image.png, Screenshot from 2025-07-11 20-43-06.png, Screenshot from 2025-07-12 10-21-19.png, Screenshot from 2025-07-12 10-21-48.png, Screenshot from 2025-07-12 11-22-35.png).
