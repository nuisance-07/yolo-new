# Dockerization of Yolo E-Commerce Application: Implementation Explanation

## 1. Choice of Base Image
- Frontend: node:14-alpine (~150MB) chosen for compatibility with Node 13.12.0 (per client/package.json) and minimal size, ideal for React.
- Backend: node:14-alpine for consistency and Express.js compatibility.
- MongoDB: mongo:latest for a reliable MongoDB instance.
- Total Size: Frontend + backend <400MB (verified with docker images), achieved using --production and .dockerignore.

## 2. Dockerfile Directives
- Frontend (client/Dockerfile):
  - FROM node:14-alpine: Lightweight base image.
  - WORKDIR /app: Sets working directory.
  - COPY package*.json ./: Caches dependencies.
  - RUN npm install --production: Installs only production dependencies.
  - COPY . .: Copies code.
  - EXPOSE 3000: Documents port.
  - CMD ["npm", "start"]: Runs React app.
- Backend (backend/Dockerfile):
  - Similar, with EXPOSE 5000 and CMD ["node", "server.js"].
- Purpose: Optimized for minimal size and efficient development.

## 3. Docker Compose Networking
- Network: app-net (bridge driver, subnet 172.20.0.0/16) enables microservice communication (e.g., mongodb hostname).
- Ports: 3000:3000 (frontend), 5000:5000 (backend), 27017:27017 (MongoDB).
- Reasoning: Ensures isolation and connectivity.

## 4. Docker Compose Volume Definition
- Volumes:
  - app-mongo-data:/data/db: Persists MongoDB data for "Add Product" functionality.
  - ./client:/app, ./backend:/app: Syncs code for live development.
  - /app/node_modules: Preserves container dependencies.
- Reasoning: Enables data persistence and developer workflow.

## 5. Git Workflow
- Forked https://github.com/Mwangi121/yolo.git to https://github.com/nuisance-07/yolo.git.
- Made >=10 descriptive commits on master branch (e.g., .gitignore, Dockerfiles, docker-compose, README, Docker Hub push).
- Used .gitignore and .dockerignore to exclude node_modules, logs, and backups.
- Pushed to master branch of nuisance-07/yolo.

## 6. Successful Running and Debugging
- Built and ran with docker compose build and docker compose up -d.
- Tested at http://localhost:3000, verified "Add Product" functionality (file uploads via /api/products) and data persistence.
- Debugged using docker compose logs and docker network inspect app-net.
- Added MongoDB healthcheck for reliable backend startup.

## 7. Good Practices
- Image Naming: mwas121/yolo-client:1.0.0, mwas121/yolo-backend:1.0.0 (semantic versioning).
- Optimization: Used .dockerignore, layer caching, --production flag.
- Compose: Clear service names, named volumes, healthcheck.

## 8. Docker Hub Screenshot
- Pushed images to Docker Hub[](https://hub.docker.com/u/mwas121) with mwas121/yolo-client:1.0.0, mwas121/yolo-backend:1.0.0.
- Included dockerhub-screenshot.png showing image versions.
