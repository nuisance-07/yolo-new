# Week 8 IP 4: Kubernetes Implementation

## 1. Kubernetes Objects
- **MongoDB**: Used **StatefulSet** (`yolo-mongo`) for stable network IDs and ordered pod creation (e.g., `yolo-mongo-0`). Ensures persistent storage for `products` collection.
- **Backend/Frontend**: Used **Deployments** (`yolo-backend`, `yolo-frontend`) with 2 replicas each for availability via ReplicaSets.
- **Services**: 
  - Headless ClusterIP (`yolo-mongo-service`) for MongoDB (internal, port 27017).
  - ClusterIP (`yolo-backend-service`) for backend (port 5000).
  - LoadBalancer (`yolo-frontend-service`) for frontend (public, port 3000 to 80).
- **Labels/Annotations**: Added `app: yolo-mongo`, `app: yolo-backend`, etc., and annotations like `version: "1.0.0"` for tracking.

## 2. Exposure Method
- **MongoDB**: Headless ClusterIP for internal access by backend (`mongodb://yolo-mongo-service:27017/yolomy`).
- **Backend**: ClusterIP for internal access by frontend (`http://yolo-backend-service:5000/api/products`).
- **Frontend**: LoadBalancer for public access at `http://<external-ip>:3000`.

## 3. Persistent Storage
- Used **PersistentVolumeClaim** in MongoDB StatefulSet (`mongo-data`, 5Gi) with `gp2` storage class (ebs.csi.aws.com) for `/data/db`. Tested by deleting pod (`kubectl delete pod yolo-mongo-0 -n yolo`) and verifying product data persists via `db.products.find()`.

## 4. Git Workflow
- Created `k8s/` and organized manifests.
- Made 10+ descriptive commits (e.g., "Add MongoDB StatefulSet", "Fix PVC with EBS CSI Driver").
- Created `week8-ip4-readme.md` and `week8-ip4-explanation.md` for clarity.

## 5. Debugging
- Checked pod status: `kubectl get pods -n yolo`.
- Viewed logs: `kubectl logs yolo-mongo-0 -n yolo`.
- Described resources: `kubectl describe pod yolo-mongo-0 -n yolo`.
- Ensured images accessible: `mwas121/yolo-client:1.0.0`, `mwas121/yolo-backend:1.0.0`.

## 6. Docker Practices
- Used semantic tags: `mwas121/yolo-client:1.0.0`, `mwas121/yolo-backend:1.0.0`.
- Images total <400MB (280.5MB).