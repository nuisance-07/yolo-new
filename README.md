# Yolo E-Commerce Application

## Overview
This project is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). It is containerized using Docker to enable microservices, with a custom bridge network and persistent MongoDB storage for the “Add Product” functionality.

## Requirements
- [Docker](https://docs.docker.com/engine/install/) with  plugin.
- [Git](https://git-scm.com/downloads).

## Project Structure
```
yolo/
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
```

## Setup Instructions
1. **Clone the Repository**:
   

2. **Build and Run with Docker Compose**:
   

3. **Access the Application**:
   - Frontend: 
   - Backend API: 
   - MongoDB:  (database: )

4. **Test the Application**:
   - Open  in a browser.
   - Use the “Add Product” form (supports file uploads via ) to add products.
   - Verify data persistence:
     
   - Check MongoDB data:
     

5. **Debugging**:
   - View logs:
     
   - Check network:
     

## Docker Images
- Frontend:  (~200MB)
- Backend:  (~200MB)
- MongoDB: 
- Total size (frontend + backend): <400MB (optimized with node:14 alpine and --production).

## Docker Hub
Images are pushed to [Docker Hub](https://hub.docker.com/u/mwas121). See  for verification.
