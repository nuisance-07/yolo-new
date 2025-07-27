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
## July 28, 2025 - Ansible Deployment Fixes and Validation
- **Issue**: Playbook failed due to undefined `volume_mapping` in `roles/backend/tasks/main.yml`.
  - **Fix**: Removed `volumes` field from backend task in `roles/backend/tasks/main.yml`.
- **Issue**: Incomplete `vars/main.yml` due to repeated typos, missing `MONGO_URL` and other fields.
  - **Fix**: Updated `vars/main.yml` with complete configuration, including `MONGO_URL: mongodb://container-ya-mongo:27017/yolomy`, `db_container`, and `network_name`.
- **Deployment**: Executed full playbook (`ansible-playbook -i inventory.yml playbook.yml`), completing 12 tasks with 9 changed, deploying:
  - Git, Docker, and dependencies.
  - Cloned repository at `/home/vagrant/yolo`.
  - `yolo-net` bridge network.
  - Containers: `container-ya-frontend` (port 3000), `container-ya-backend` (port 5000), `container-ya-mongo` (port 27017).
- **Verification**:
  - Confirmed all containers running (`docker ps -a`).
  - Verified `yolo-net` network (`docker network ls`).
  - Checked repository structure (`ls -l /home/vagrant/yolo`).
  - Backend logs show `Server listening on port 5000`.
  - Frontend accessible at `http://localhost:3000`.
- **Pending**:
  - Test backend API (`curl -f http://localhost:5000/api/products`) to verify MongoDB connectivity and data retrieval.
  - Confirm frontend fetches product data in browser at `http://localhost:3000`.
- **Git Workflow**: Committed changes with messages like "Ensure vars/main.yml includes MONGO_URL and all required fields".
- **Cleanup**: Removed unused files in `/home/vagrant/yolo` (confirmed none remained).
