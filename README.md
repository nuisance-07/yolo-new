# Yolo E-Commerce Application

## Overview
This project is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). It is containerized using Docker with microservices, a custom bridge network, and persistent MongoDB storage for the Add Product functionality. The application supports product uploads with file attachments via /api/products and persists data across container restarts.

## Requirements
- Docker[](https://docs.docker.com/engine/install/) with docker-compose plugin.
- Git[](https://git-scm.com/downloads).

## Project Structure
yolo-new/
├── client/                         # React frontend
│   ├── Dockerfile                  # Frontend Dockerfile
│   ├── package.json                # Frontend dependencies
│   ├── src/                       # React source code
├── backend/                        # Express.js backend
│   ├── Dockerfile                  # Backend Dockerfile
│   ├── package.json                # Backend dependencies
│   ├── server.js                   # Backend entry point
│   ├── routes/                    # API routes
├── docker-compose.yml              # Orchestrates microservices
├── explanation.md                  # Implementation details
├── dockerhub-screenshot.png        # Docker Hub screenshot
├── image.png                       # Additional screenshot
├── Screenshot from 2025-07-12 11-22-55.png # Additional screenshot
├── Screenshot from 2025-07-12 11-23-09.png # Additional screenshot

## Setup Instructions
1. Clone the Repository:
   git clone https://github.com/nuisance-07/yolo.git
   cd yolo

2. Build and Run with Docker Compose:
   docker compose -f docker-compose.yml build
   docker compose -f docker-compose.yml up -d

3. Access the Application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/products
   - MongoDB: localhost:27017 (database: yolomy)

4. Test the Application:
   - Open http://localhost:3000 in a browser.
   - Use the Add Product form to add products with file uploads.
   - Verify data persistence:
     docker compose -f docker-compose.yml down
     docker compose -f docker-compose.yml up -d
     docker exec -it container-ya-mongo mongo mongodb://mongo:27017/yolomy
     db.products.find()

5. Debugging:
   - View logs:
     docker compose -f docker-compose.yml logs
     docker compose -f docker-compose.yml logs yolo-client
     docker compose -f docker-compose.yml logs yolo-backend
     docker compose -f docker-compose.yml logs mongo
   - Check network:
     docker network inspect yolo-net

## Docker Images
- Frontend: mwas121/yolo-client:1.0.0 (54.5MB)
- Backend: mwas121/yolo-backend:1.0.0 (226MB)
- MongoDB: mongo:4.4
- Total size (frontend + backend): 280.5MB, meets rubric requirement of <400MB.

## Docker Hub
Images are pushed to Docker Hub[](https://hub.docker.com/u/mwas121). See dockerhub-screenshot.png for verification of mwas121/yolo-client:1.0.0 and mwas121/yolo-backend:1.0.0.
