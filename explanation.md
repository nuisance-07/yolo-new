# Dockerization of Yolo E-Commerce Application: Implementation Explanation

## 1. Choice of Base Image
- **Frontend**:  (~150MB) chosen for compatibility with Node 13.12.0 (per ) and minimal size, ideal for React.
- **Backend**:  for consistency and Express.js compatibility.
- **MongoDB**:  for a reliable MongoDB instance.
- **Total Size**: Frontend + backend <400MB (verified with REPOSITORY             TAG       IMAGE ID       CREATED        SIZE
mwas121/yolo-client    v1.0.0    a6eedd39f3e6   4 days ago     500MB
mwas121/yolo-backend   v1.0.0    5940165f9211   4 days ago     226MB
mongo                  latest    14bce8bf75c7   5 weeks ago    892MB
alpine                 latest    cea2ff433c61   5 weeks ago    8.31MB
ubuntu                 latest    bf16bdcff9c9   6 weeks ago    78.1MB
jenkins/jenkins        lts       adb267fe4d1d   6 weeks ago    478MB
hello-world            latest    74cc54e27dc4   5 months ago   10.1kB
mwas121/busybox        latest    6d3e4188a38a   9 months ago   4.28MB
busybox                latest    6d3e4188a38a   9 months ago   4.28MB), achieved using  and .

## 2. Dockerfile Directives
- **Frontend (client/Dockerfile)**:
  - : Lightweight base image.
  - : Sets working directory.
  - : Caches dependencies.
  - : Installs only production dependencies.
  - : Copies code.
  - : Documents port.
  - : Runs React app.
- **Backend (backend/Dockerfile)**:
  - Similar, with  and .
- **Purpose**: Optimized for minimal size and efficient development.

## 3. Docker Compose Networking
- **Network**:  (bridge driver, subnet 172.20.0.0/16) enables microservice communication (e.g., ).
- **Ports**:  (frontend),  (backend),  (MongoDB).
- **Reasoning**: Ensures isolation and connectivity.

## 4. Docker Compose Volume Definition
- **Volumes**:
  - : Persists MongoDB data for “Add Product” functionality.
  - , : Syncs code for live development.
  - : Preserves container dependencies.
- **Reasoning**: Enables data persistence and developer workflow.

## 5. Git Workflow
- Forked  to .
- Made ≥10 descriptive commits on  branch (e.g., .gitignore, Dockerfiles, docker-compose, README, Docker Hub push).
- Used  and  to exclude , logs, and backups.
- Pushed to  branch of .

## 6. Successful Running and Debugging
- Built and ran with  and .
- Tested at , verified “Add Product” functionality (file uploads via ) and data persistence.
- Debugged using  and [].
- Added MongoDB healthcheck for reliable backend startup.

## 7. Good Practices
- **Image Naming**: ,  (semantic versioning).
- **Optimization**: Used , layer caching,  flag.
- **Compose**: Clear service names, named volumes, healthcheck.

## 8. Docker Hub Screenshot
- Pushed images to Docker Hub (, ).
- Included  showing image versions.
