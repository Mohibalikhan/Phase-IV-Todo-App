# Todo App - Phase 4: Kubernetes Deployment

This document outlines the steps to deploy the Todo application on a local Kubernetes cluster using kind and Helm.

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
# Create Kubernetes secrets from environment variables
kubectl create secret generic todo-secrets \
  --from-literal=database-url=$(echo -n "your_neon_db_url_here" | base64) \
  --from-literal=openai-api-key=$(echo -n "your_openai_key_here" | base64)
```

### 4. Install Helm Chart

```bash
# Navigate to helm directory
cd ../helm/

# Install the todo-chart with secrets
helm install todo-app todo-chart/ \
  --set secrets.databaseUrl="your_neon_db_url_here" \
  --set secrets.openaiApiKey="your_openai_key_here"
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
# Port forward frontend service (if NodePort is not accessible)
kubectl port-forward svc/todo-frontend-service 3000:3000

# In another terminal, port forward backend service
kubectl port-forward svc/todo-backend-service 8000:8000
```

Access the application at http://localhost:3000

### 7. Test Chatbot Functionality

Once the application is running, test the chatbot functionality by using commands like "reschedule meeting" to verify that the OpenAI integration is working properly.

The chatbot functionality is implemented using OpenAI's function calling feature, allowing natural language interactions with the todo system. The backend API provides the following functions for the AI agent:

- `add_todo`: Add a new todo task
- `get_all_todos`: Get all todos for the current user
- `get_pending_todos`: Get all pending (not completed) todos
- `get_completed_todos`: Get all completed todos
- `complete_todo`: Mark a todo as complete
- `delete_todo`: Delete a todo task
- `update_todo`: Update an existing todo task

When users issue commands like "reschedule meeting", the AI agent will:
1. Use `get_all_todos` to find meeting-related todos
2. Use `update_todo` to change the due date/time of the meeting
3. Potentially create new reminders with `add_todo`

### 8. Using kubectl-ai (Optional)

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

## Troubleshooting

1. **Image Pull Errors**: Ensure images are loaded into the kind cluster with `kind load docker-image`
2. **Port Already Allocated**: Check if port 3000 or 8000 is in use on your host system
3. **Secrets Not Found**: Verify that the secret name matches what's specified in the deployment
4. **Health Check Failures**: Check application logs with `kubectl logs <pod-name>`
5. **Chatbot Not Working**: Verify that the OPENAI_API_KEY is correctly set in the secrets and that the API is accessible

## Architecture Overview

The deployed application consists of:
- **Backend Service**: FastAPI application handling API requests and database operations
- **Frontend Service**: Next.js application providing the user interface
- **Database**: Connected via Neon DB URL stored securely in Kubernetes secrets
- **AI Integration**: OpenAI API for chatbot functionality with function calling
- **Persistent Storage**: SQLModel with PostgreSQL for todo data persistence

The system supports all features from previous phases:
- Basic: add/delete/update/view/mark complete
- Intermediate: priorities/tags/search/filter/sort
- Advanced: recurring tasks/due dates/reminders