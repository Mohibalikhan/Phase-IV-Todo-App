# Data Model: Kubernetes Deployment for Todo App

## Kubernetes Resources

### Backend Deployment
- **name**: String (unique identifier for the deployment)
- **replicas**: Integer (number of pod replicas, default: 1)
- **image**: String (Docker image reference)
- **ports**: Array of Port objects (containerPort, protocol)
- **env**: Array of EnvVar objects (name, valueFrom.secretKeyRef)
- **resources**: Object (requests and limits for CPU/memory)
- **livenessProbe**: Object (probe configuration)
- **readinessProbe**: Object (probe configuration)

### Frontend Deployment
- **name**: String (unique identifier for the deployment)
- **replicas**: Integer (number of pod replicas, default: 1)
- **image**: String (Docker image reference)
- **ports**: Array of Port objects (containerPort, protocol)
- **env**: Array of EnvVar objects (name, valueFrom.secretKeyRef)
- **resources**: Object (requests and limits for CPU/memory)
- **livenessProbe**: Object (probe configuration)
- **readinessProbe**: Object (probe configuration)

### Backend Service
- **name**: String (unique service identifier)
- **type**: String (ClusterIP)
- **ports**: Array of ServicePort objects (port, targetPort, protocol)
- **selector**: Object (labels to match deployment pods)

### Frontend Service
- **name**: String (unique service identifier)
- **type**: String (NodePort)
- **ports**: Array of ServicePort objects (port, targetPort, nodePort, protocol)
- **selector**: Object (labels to match deployment pods)

### Secret
- **name**: String (unique secret identifier)
- **data**: Map of String to Base64-encoded String (sensitive configuration)
- **keys**: Array of String (DATABASE_URL, OPENAI_API_KEY)

### ConfigMap
- **name**: String (unique configmap identifier)
- **data**: Map of String to String (non-sensitive configuration)
- **keys**: Array of String (NEXT_PUBLIC_API_URL)

### Helm Values
- **backend.image.repository**: String (backend image repository)
- **backend.image.tag**: String (backend image tag)
- **backend.service.port**: Integer (backend service port)
- **frontend.image.repository**: String (frontend image repository)
- **frontend.image.tag**: String (frontend image tag)
- **frontend.service.port**: Integer (frontend service port)
- **frontend.service.nodePort**: Integer (frontend node port)
- **resources.limits.cpu**: String (CPU limit)
- **resources.limits.memory**: String (memory limit)
- **resources.requests.cpu**: String (CPU request)
- **resources.requests.memory**: String (memory request)