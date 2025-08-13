# Yolo E-Commerce Application (Week 8 IP 4)

MERN stack e-commerce app deployed on AWS EKS with Kubernetes.

## Overview
Built with MongoDB, Express.js, React, Node.js. Supports adding products via `/api/products`, persisted in MongoDB's `yolomy` database (treated as cart functionality). Deployed using Kubernetes on AWS EKS with StatefulSet for MongoDB, Deployments for frontend/backend, and persistent storage.

## Requirements
- AWS CLI, eksctl, kubectl
- Docker images: mwas121/yolo-client:1.0.0, mwas121/yolo-backend:1.0.0, mongo:4.4
- Git

## Setup
1. Clone: `git clone https://github.com/nuisance-07/yolo-new.git`
2. Set up EKS: See `k8s/setup-eks.md`
3. Apply manifests: `kubectl apply -f k8s/`
4. Get URL: `kubectl get svc yolo-frontend-service -n yolo -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'`
5. Access: `http://<external-ip>:3000`

## Test
- Add product at `http://<external-ip>:3000` (e.g., name: "Test Product", price: 10, quantity: 1).
- Delete MongoDB pod: `kubectl delete pod yolo-mongo-0 -n yolo`.
- Verify persistence: `kubectl exec -it yolo-mongo-0 -n yolo -- mongosh mongodb://yolo-mongo-service:27017/yolomy --eval 'db.products.find()'`

## Live URL
http://<external-ip>:3000