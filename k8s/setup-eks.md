# AWS EKS Setup for Yolo E-Commerce (Week 8 IP 4)

1. Installed AWS CLI: `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install`
2. Configured AWS CLI: `aws configure` with credentials and region us-east-1.
3. Installed eksctl: `curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz" | tar xz -C /tmp && sudo mv /tmp/eksctl /usr/local/bin`
4. Installed kubectl: `curl -LO "https://dl.k8s.io/release/v1.33.3/bin/linux/amd64/kubectl" && chmod +x kubectl && sudo mv kubectl /usr/local/bin`
5. Verified: `aws --version`, `eksctl version`, `kubectl version --client`.
6. Troubleshot eksctl failure: `exceeded max wait time for StackCreateComplete waiter` due to nodegroup issues.
7. Created IAM roles in AWS Console: `yolo-cluster-role` (AmazonEKSClusterPolicy, AmazonEKSServicePolicy), `yolo-node-role` (AmazonEKSWorkerNodePolicy, AmazonEC2ContainerRegistryReadOnly, AmazonEKS_CNI_Policy).
8. Created EKS cluster in AWS Console: Name `yolo-cluster`, version 1.32, subnets `subnet-066887cb11abc9091,subnet-0bb939c150b3b19f7`.
9. Created nodegroup in AWS Console: Name `yolo-nodes`, 3 t3.medium nodes, AL2023 AMI.
10. Updated kubeconfig: `aws eks update-kubeconfig --region us-east-1 --name yolo-cluster`
11. Verified: `kubectl get nodes`
