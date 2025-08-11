# AWS EKS Setup for Yolo E-Commerce (Week 8 IP 4)

1. Installed AWS CLI: `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install`
2. Configured AWS CLI: `aws configure` with credentials and region us-east-1.
3. Installed eksctl: `curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz" | tar xz -C /tmp && sudo mv /tmp/eksctl /usr/local/bin`
4. Installed kubectl: `curl -LO "https://dl.k8s.io/release/v1.33.3/bin/linux/amd64/kubectl" && chmod +x kubectl && sudo mv kubectl /usr/local/bin`
5. Verified: `aws --version`, `eksctl version`, `kubectl version --client`.
6. Fixed IAM permissions: Requested admin to attach AmazonEKSClusterPolicy, AmazonEKSServicePolicy, AmazonEKSWorkerNodePolicy, AmazonEC2ContainerRegistryReadOnly to user kolo-muani or assumed role yolo-eks-role.
7. Created EKS cluster: `eksctl create cluster --name yolo-cluster --region us-east-1 --nodegroup-name yolo-nodes --node-type t3.medium --nodes 3`
8. Updated kubeconfig: `aws eks update-kubeconfig --region us-east-1 --name yolo-cluster`
9. Verified: `kubectl get nodes`
