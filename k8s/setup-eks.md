# AWS EKS Setup for Yolo E-Commerce (Week 8 IP 4)

1. Installed AWS CLI: `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install`
2. Configured AWS CLI: `aws configure --profile yolo-admin` with credentials and region us-east-1.
3. Installed eksctl: `curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp && sudo mv /tmp/eksctl /usr/local/bin`
4. Installed kubectl: `curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && chmod +x kubectl && sudo mv kubectl /usr/local/bin`
5. Verified: `aws --version`, `eksctl version`, `kubectl version --client`.
6. Fixed InvalidClientTokenId error by recreating access keys for yolo-admin.
7. Fixed NodeCreationFailure by adding security group yolo-cluster-sg and verifying yolo-node-role, subnets.
8. Freed vCPUs by terminating unused instances.
9. Created EKS cluster in AWS Console: Name `yolo-cluster`, version 1.33, subnets `subnet-066887cb11abc9091,subnet-0bb939c150b3b19f7`.
10. Created nodegroup: `yolo-nodes` with 3 t3.medium nodes, AL2023 AMI, 20 GiB disk.
11. Fixed yolo-mongo-0 Pending status by using ebs.csi.aws.com provisioner, installing EBS CSI Driver, and recreating StatefulSet with storageClassName: gp2.
12. Fixed yolo-frontend-service Pending IP by installing AWS Load Balancer Controller and tagging subnets.
13. Updated kubeconfig: `aws eks update-kubeconfig --region us-east-1 --name yolo-cluster`
14. Verified: `kubectl get nodes` showed 3 nodes in Ready status.
15. Applied manifests: `kubectl apply -f k8s/`
16. Tested: Added product at http://<external-ip>:3000, verified persistence.