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

- **Issue**: Vagrant attempted to use KVM (libvirt) provider, causing kernel extension errors.
  - **Fix**: Switched to VirtualBox provider:
    - Installed VirtualBox: `sudo apt install virtualbox`.
    - Used `vagrant up --provider=virtualbox` to start the VM.
    - Loaded VirtualBox kernel modules: `sudo modprobe vboxdrv`.
    - Verified provider with `vagrant status` (confirmed `provider: virtualbox`).

## Ansible Playbook Execution Order and Role Details
- **Execution Order**: The playbook (`playbook.yml`) runs sequentially, ensuring dependencies are met before deploying containers. Tasks are grouped into roles (`common`, `frontend`, `backend`) executed in this order to set up the environment, clone the repository, create the network, and deploy containers.
- **Roles and Functions**:
  - **common**: Prepares the Vagrant VM environment.
    - **Purpose**: Installs prerequisites (Git, Docker, etc.) and configures the Docker service and user permissions.
    - **Positioning**: Runs first to ensure the VM has the necessary tools before cloning the repository or deploying containers.
    - **Tasks and Modules**:
      - `Install Git`: Uses the `apt` module to install Git (`git`) for cloning the repository.
      - `Add Docker GPG apt key`: Uses the `apt_key` module to add Docker’s GPG key for secure package installation.
      - `Add Docker repository`: Uses the `apt_repository` module to configure the Docker repository.
      - `Install Docker and dependencies`: Uses the `apt` module to install Docker packages (`docker.io`, etc.).
      - `Ensure Docker service is running`: Uses the `service` module to start and enable the Docker service.
      - `Add vagrant user to docker group`: Uses the `user` module to add the `vagrant` user to the `docker` group for permissionless Docker commands.
  - **frontend**: Deploys the frontend service and supporting components.
    - **Purpose**: Clones the repository and runs the `container-ya-frontend` container.
    - **Positioning**: Runs after `common` to use Git and Docker. The network is created before the frontend container to ensure connectivity.
    - **Tasks and Modules**:
      - `Clone the repository`: Uses the `git` module to clone `https://github.com/nuisance-07/yolo.git` to `/home/vagrant/yolo`.
      - `Create Docker network`: Uses the `docker_network` module to create the `yolo-net` bridge network.
      - `Run frontend container`: Uses the `docker_container` module to deploy `container-ya-frontend` with `mwas121/yolo-client:1.0.0`, mapping port `3000:80`, setting `REACT_APP_API_URL`, and connecting to `yolo-net`.
  - **backend**: Deploys the MongoDB and backend services.
    - **Purpose**: Runs `container-ya-mongo` and `container-ya-backend`, ensuring database availability before the backend starts.
    - **Positioning**: Runs last, as the backend depends on the repository (cloned by `frontend`) and the `yolo-net` network. MongoDB is deployed before the backend for connectivity.
    - **Tasks and Modules**:
      - `Run MongoDB container`: Uses the `docker_container` module to deploy `container-ya-mongo` with `mongo:4.4`, mapping port `27017:27017`, setting volume `mongo-data:/data/db`, and connecting to `yolo-net`. Includes a healthcheck using `mongo --quiet --eval "db.adminCommand('ping')"`.
      - `Run backend container`: Uses the `docker_container` module to deploy `container-ya-backend` with `mwas121/yolo-backend:1.0.0`, mapping port `5000:5000`, setting `MONGO_URL`, and connecting to `yolo-net`.
- **Reasoning**: The sequential order ensures prerequisites (Git, Docker) are installed first (`common`), followed by repository cloning and network creation (`frontend`), and finally database and backend deployment (`backend`). This avoids dependency issues (e.g., backend needing MongoDB, frontend needing the repository).

Playbook Target Host

Target Host: The Ansible playbook (playbook.yml) targets a single Vagrant-managed virtual machine named ecommerce-server, running on VirtualBox. This VM is accessed via SSH at 127.0.0.1:2222 (localhost with port forwarding) using the vagrant user and a private key generated by Vagrant.
Inventory Configuration: The inventory file (inventory.yml) defines the target host as follows:all:
  hosts:
    ecommerce-server:
      ansible_host: 127.0.0.1
      ansible_port: 2222
      ansible_user: vagrant
      ansible_ssh_private_key_file: /home/collins/yolo-new/.vagrant/machines/default/virtualbox/private_key
      ansible_ssh_common_args: '-o PubkeyAcceptedKeyTypes=+ssh-rsa -o HostKeyAlgorithms=+ssh-rsa'

The Vagrant VM (ecommerce-server) hosts all Docker containers (container-ya-frontend, container-ya-backend, container-ya-mongo) on the yolo-net network. Ansible connects to the VM via SSH to execute tasks, including installing prerequisites, cloning the repository, and deploying containers.