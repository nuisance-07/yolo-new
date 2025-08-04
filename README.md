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

Yolo E-Commerce Application (IP3)
Overview
This project is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js), containerized using Docker with microservices, a custom bridge network (yolo-net), and persistent MongoDB storage. It supports product uploads with file attachments via /api/products, with data persisting across container restarts. An Ansible playbook automates setup for Stage 1 (local Vagrant VM) and Stage 2 (Vagrant with enhanced configuration), ensuring anyone can clone, build, and run the platform from GitHub.
Requirements

Vagrant (with VirtualBox provider).
Docker with docker-compose plugin.
Git.
Ansible (version 2.10 or higher).
Python 3 (required for Ansible).

Project Structure
yolo-new/
├── Vagrantfile                    # Vagrant configuration for Stage 1
├── ansible.cfg                    # Ansible configuration
├── playbook.yml                   # Main Ansible playbook
├── inventory.yml                  # Ansible inventory
├── roles/                         # Ansible roles
│   ├── clone_repo/                # Clones the repository
│   ├── docker/                    # Installs Docker
│   ├── network/                   # Sets up Docker network
│   ├── mongodb/                   # Configures MongoDB
│   ├── backend/                   # Deploys backend service
│   ├── frontend/                  # Deploys frontend service
│   ├── verify_app/                # Verifies application and persistence
├── backend/                       # Express.js backend
│   ├── Dockerfile                 # Backend Dockerfile
│   ├── models/Products.js         # MongoDB product schema
│   ├── routes/api/productRoute.js # API routes for products
│   ├── server.js                  # Backend entry point
│   ├── upload.js                  # File upload logic
├── client/                        # React frontend
│   ├── Dockerfile                 # Frontend Dockerfile
│   ├── public/                    # Static assets
│   ├── src/components/            # React components (e.g., AddProduct.js)
│   ├── src/images/                # Image assets
├── docker-compose.yml             # Orchestrates microservices
├── stage-two/                     # Stage 2 configuration
│   ├── Vagrantfile                # Vagrant configuration for Stage 2
│   ├── group_vars/all.yml         # Ansible variables
├── IP3_README.md                  # Project documentation
├── IP3_explanation.md             # Ansible playbook details
├── dockerhub-screenshot.png       # Docker Hub screenshot
├── image.png                      # Additional screenshot

Setup Instructions
Stage 1: Ansible Instrumentation

Clone the Repository:
git clone https://github.com/nuisance-07/yolo-new.git
cd yolo-new


Provision Vagrant VM:

Start the Vagrant VM using geerlingguy/ubuntu2004:vagrant up




Run the Ansible Playbook:



Execute the playbook:vagrant ssh -c "ansible-playbook /vagrant/playbook.yml -i /vagrant/inventory.yml --become"


The playbook:
Installs Docker.
Clones the repository to /home/vagrant/yolo.
Creates the yolo-net network.
Deploys MongoDB, backend, and frontend containers.
Verifies application functionality and data persistence.




Access the Application:

Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/products
MongoDB: localhost:27017 (database: yolomy)


Test the Application:

Open http://localhost:3000 and use the Add Product form to upload a product.
Verify data persistence:vagrant ssh -c "docker compose -f /home/vagrant/yolo/docker-compose.yml down"
vagrant ssh -c "docker compose -f /home/vagrant/yolo/docker-compose.yml up -d"
vagrant ssh -c "docker exec -it container-ya-mongo mongosh mongodb://mongo:27017/yolomy --eval 'db.products.find()'"




Debugging:

View Docker logs:vagrant ssh -c "docker compose -f /home/vagrant/yolo/docker-compose.yml logs"


Check network:vagrant ssh -c "docker network inspect yolo-net"





Stage 2: Ansible Instrumentation (Vagrant)

Switch to Stage 2 Branch:
git checkout stage_two
cd stage-two


Provision Vagrant VM:

Start the Vagrant VM:vagrant up




Run the Ansible Playbook:

Use the same playbook with variables from stage-two/group_vars/all.yml:vagrant ssh -c "ansible-playbook /vagrant/playbook.yml -i /vagrant/inventory.yml --become"




Access and Test:

Follow the same access and test steps as Stage 1.



Docker Images

Frontend: mwas121/yolo-client:1.0.0 (54.5MB)
Backend: mwas121/yolo-backend:1.0.0 (226MB)
MongoDB: mongo:4.4
Total size (frontend + backend): 280.5MB, meets rubric requirement of <400MB.

Docker Hub
Images are available at Docker Hub. See dockerhub-screenshot.png for verification.