# Quickstart Guide: Kubernetes Deployment for Todo App

## Prerequisites

- Docker installed and running
- kind (Kubernetes in Docker) installed
- Helm 3 installed
- kubectl installed
- Access to Neon DB and OpenAI API

## Setup Instructions

### 1. Create kind Cluster

```bash
# Create a kind cluster with specific configuration
kind create cluster --name todo-cluster --config kind-config.yaml
```

### 2. Build Docker Images

```bash
# Build backend image
cd api/
docker build -t todo-backend:latest .

# Build frontend image
cd ../frontend/
docker build -t todo-frontend:latest .

# Load images into kind cluster
kind load docker-image todo-backend:latest --name todo-cluster
kind load docker-image todo-frontend:latest --name todo-cluster
```

### 3. Prepare Secrets

```bash
# Create a file with your environment variables
cat <<EOF > .env
DATABASE_URL=your_neon_db_url_here
OPENAI_API_KEY=your_openai_key_here
EOF

# Create Kubernetes secrets from the .env file
kubectl create secret generic todo-secrets \
  --from-env-file=.env
```

### 4. Install Helm Chart

```bash
# Navigate to helm directory
cd ../helm/

# Install the todo-chart
helm install todo-app todo-chart/ --values todo-chart/values.yaml
```

### 5. Verify Installation

```bash
# Check if pods are running
kubectl get pods

# Check services
kubectl get svc

# Check deployments
kubectl get deployments
```

### 6. Test the Application

```bash
# Port forward frontend service
kubectl port-forward svc/todo-frontend-service 3000:3000

# In another terminal, port forward backend service
kubectl port-forward svc/todo-backend-service 8000:8000
```

Access the application at http://localhost:3000

## Using kubectl-ai (Optional)

```bash
# Use AI to generate kubectl commands
kubectl ai "show me all pods in the default namespace"
kubectl ai "describe the todo-backend deployment"
```

## Cleanup

```bash
# Uninstall the Helm release
helm uninstall todo-app

# Delete the kind cluster
kind delete cluster --name todo-cluster
```