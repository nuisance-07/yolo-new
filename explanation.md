# Dockerization of Yolo E-Commerce Application: Implementation Explanation

## 1. Choice of Base Images
- Frontend: node:14-slim (~150MB) for building, nginx:alpine (~22MB) for serving, compatible with Node 13.12.0 (per client/package.json).
- Backend: node:14-slim (~150MB) for Express.js compatibility.
- MongoDB: mongo:4.4 for reliable database with mongo shell for healthchecks.
- Total Size: Frontend (54.5MB) + Backend (226MB) = 280.5MB, meets rubric requirement of <400MB.

## 2. Dockerfile Directives
- Frontend (client/Dockerfile):
  - FROM node:14-slim AS build: Build stage for React app.
  - WORKDIR /app: Sets working directory.
  - COPY package*.json ./: Caches dependencies for efficient builds.
  - RUN npm install: Installs all dependencies (dev and production).
  - COPY . .: Copies frontend code.
  - RUN npm run build: Builds React app.
  - FROM nginx:alpine: Lightweight serving stage.
  - COPY --from=build /app/build /usr/share/nginx/html: Copies build output.
  - EXPOSE 80: Documents port.
  - CMD ["nginx", "-g", "daemon off;"]: Runs Nginx.
- Backend (backend/Dockerfile):
  - FROM node:14-slim: Base image.
  - WORKDIR /app
  - COPY package*.json ./
  - RUN npm install --only=production
  - COPY . .
  - ENV NODE_ENV=production
  - EXPOSE 5000
  - CMD ["node", "server.js"]
- Purpose: Optimized microservices with minimal image sizes; frontend uses nginx:alpine for efficient serving.

## 3. Docker Compose Networking
- Network: yolo-net (bridge driver) enables communication (e.g., mongo hostname for backend).
- Ports: 3000:80 (frontend), 5000:5000 (backend), 27017:27017 (MongoDB).
- Reasoning: Ensures isolated, reliable communication and external access.

## 4. Docker Compose Volume Definition
- Volumes:
  - mongo-data:/data/db: Persists MongoDB data for Add Product functionality.
  - ./client:/app, ./backend:/app: Syncs code for development.
  - /app/node_modules: Preserves container dependencies.
- Purpose: Ensures data persistence and supports developer workflow.

## 5. Git Workflow
- Forked https://github.com/Vinge1718/yolo.git to https://github.com/nuisance-07/yolo.git.
- Made 48 descriptive commits on master branch (e.g., .gitignore, .dockerignore, Dockerfiles, docker-compose.yml, README.md, explanation.md, screenshots).
- Used .gitignore and .dockerignore to exclude node_modules, logs, build/, dist/, and backups.
- Pushed to master branch of nuisance-07/yolo.

## 6. Successful Running and Debugging
- Built with docker compose -f docker-compose.yml build and ran with docker compose -f docker-compose.yml up -d.
- Tested at http://localhost:3000, verified Add Product functionality (file uploads via /api/products) and data persistence using docker exec -it container-ya-mongo mongo mongodb://mongo:27017/yolomy.
- Debugged using docker compose -f docker-compose.yml logs and docker network inspect yolo-net.
- Fixed MongoDB reliability with healthcheck (mongo:4.4, mongo --quiet --eval "db.adminCommand('ping')").

## 7. Good Practices
- Image Naming: mwas121/yolo-client:1.0.0, mwas121/yolo-backend:1.0.0 (semantic versioning).
- Optimization: Used .dockerignore, layer caching, and --only=production (backend). Frontend includes dev dependencies for build.
- Compose: Defined services, network, volumes, and healthcheck for robust orchestration.

## 8. Docker Hub Screenshot
- Pushed images to Docker Hub[](https://hub.docker.com/u/mwas121) with mwas121/yolo-client:1.0.0 and mwas121/yolo-backend:1.0.0.
- Included dockerhub-screenshot.png showing image versions, along with additional screenshots (image.png, Screenshot from 2025-07-12 11-22-55.png, Screenshot from 2025-07-12 11-23-09.png).

Explanation of Ansible Playbook for Yolo E-Commerce Application (IP3)
This document details the Ansible playbook (playbook.yml) for deploying the Yolo e-commerce application, a containerized MERN stack application with persistent MongoDB storage. It explains each role’s function and execution order, aligning with IP3 Stage 1 and Stage 2 requirements.
Playbook Overview
The playbook automates setup, deployment, and verification of the Yolo application on a Vagrant-provisioned Ubuntu 20.04 VM (geerlingguy/ubuntu2004). It uses roles, variables from stage-two/group_vars/all.yml, and blocks/tags for modularity, ensuring a reproducible e-commerce platform with product upload functionality via /api/products.
Playbook Structure
The playbook includes the following roles, executed sequentially:

docker: Installs Docker.
clone_repo: Clones the repository.
network: Creates the yolo-net Docker network.
mongodb: Configures MongoDB with persistent storage.
backend: Deploys the Express.js backend.
frontend: Deploys the React frontend.
verify_app: Verifies application functionality and data persistence.

Execution Order Reasoning

docker: Installs Docker, required for containers.
clone_repo: Clones the repository for source files.
network: Creates yolo-net for container communication.
mongodb: Sets up the database, needed by the backend.
backend: Deploys the API, required by the frontend.
frontend: Deploys the UI, which interacts with the backend.
**verify_app`: Confirms functionality and persistence.

Role Details
1. Role: docker
Purpose: Installs Docker and ensures the service is running.Position: First, as Docker is a prerequisite.Reasoning: Docker is required for all container tasks.
2. Role: clone_repo
Purpose: Clones the repository to /home/vagrant/yolo.Position: Second, to provide source files.Reasoning: Provides docker-compose.yml and source files.
3. Role: network
Purpose: Creates the yolo-net Docker network.Position: Third, for container communication.Reasoning: Network is needed before container deployment.
4. Role: mongodb
Purpose: Configures MongoDB with persistent storage.Position: Fourth, as the backend depends on it.Reasoning: MongoDB is required for backend data storage.
5. Role: backend
Purpose: Deploys the Express.js backend.Position: Fifth, as it depends on MongoDB.Reasoning: Backend requires MongoDB to function.
6. Role: frontend
Purpose: Deploys the React frontend.Position: Sixth, as it depends on the backend.Reasoning: Frontend interacts with the backend API.
7. Role: verify_app
Purpose: Verifies application functionality and data persistence.Position: Last, to confirm deployment success.Reasoning: Ensures application accessibility and persistence.
Stage 2: Ansible Instrumentation
Stage 2 uses the same playbook in the stage-two directory with variables from stage-two/group_vars/all.yml, running on a Vagrant-provisioned Ubuntu 20.04 VM.
Data Persistence
Persistence is achieved via a Docker volume (mongo-data) mapped to /home/vagrant/mongo-data. The verify_app role tests this by restarting containers and querying the yolomy database. Add products via the frontend before verification.