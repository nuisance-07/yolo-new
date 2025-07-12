# Yolo E-Commerce Application

## Overview
This project is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). It is containerized using Docker with microservices, a custom bridge network, and persistent MongoDB storage for the "Add Product" functionality.

## Requirements
- Docker[](https://docs.docker.com/engine/install/) with docker-compose plugin.
- Git[](https://git-scm.com/downloads).

## Project Structure
```
yolo-new/
├── client/                # React frontend
│   ├── Dockerfile         # Frontend Dockerfile
│   ├── package.json       # Frontend dependencies
│   ├── src/              # React source code
├── backend/               # Express.js backend
│   ├── Dockerfile         # Backend Dockerfile
│   ├── package.json       # Backend dependencies
│   ├── server.js         # Backend entry point
│   ├── routes/           # API routes
├── docker-compose.yaml    # Orchestrates microservices
├── explanation.md         # Implementation details
├── dockerhub-screenshot.png # Docker Hub screenshot
├── image.png              # Additional screenshot
├── Screenshot from 2025-07-11 20-43-06.png # Additional screenshot
├── Screenshot from 2025-07-12 10-21-19.png # Additional screenshot
├── Screenshot from 2025-07-12 10-21-48.png # Additional screenshot
├── Screenshot from 2025-07-12 11-22-35.png # Additional screenshot
```

## Setup Instructions
1. Clone the Repository:
   

2. Build and Run with Docker Compose:
   

3. Access the Application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/products
   - MongoDB: localhost:27017 (database: yolomy)

4. Test the Application:
   - Open http://localhost:3000 in a browser.
   - Use the "Add Product" form (supports file uploads via /api/products) to add products.
   - Verify data persistence:
     

5. Debugging:
   - View logs:
     
   - Check network:
     

## Docker Images
- Frontend: mwas121/yolo-client:1.0.0 (54.5MB)
- Backend: mwas121/yolo-backend:1.0.0 (226MB)
- MongoDB: mongo:latest
- Total size (frontend + backend): 280.5MB, meets rubric requirement of <400MB.

## Docker Hub
Images are pushed to Docker Hub[](https://hub.docker.com/u/mwas121). See dockerhub-screenshot.png for verification.
