# Implementation Plan: Kubernetes Deployment for Todo App

**Branch**: `001-k8s-deployment` | **Date**: 2026-01-08 | **Spec**: [link to spec](./spec.md)
**Input**: Feature specification from `/specs/001-k8s-deployment/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deploy the Todo application to a local Kubernetes cluster using kind. The approach involves containerizing both frontend and backend applications with multi-stage Dockerfiles, creating a Helm chart for deployment management, configuring Kubernetes secrets for sensitive data, and establishing proper service networking with health checks and resource limits.

## Technical Context

**Language/Version**: Dockerfile (multi-stage), Helm Chart (v3), YAML (Kubernetes manifests)
**Primary Dependencies**: kind (Kubernetes in Docker), Helm 3, Docker, kubectl
**Storage**: Neon DB (external PostgreSQL) accessed via DATABASE_URL
**Testing**: Manual verification via port-forward and browser access
**Target Platform**: Local Kubernetes cluster using kind
**Project Type**: Web application with separate frontend (Next.js) and backend (FastAPI)
**Performance Goals**: Application responds within 2 seconds, operates within resource limits (CPU 500m, memory 512Mi)
**Constraints**: Must run on local kind cluster, use secrets for sensitive data, include health checks
**Scale/Scope**: Single instance deployments for development/testing

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-Driven Development**: Implementation must follow comprehensive specifications before coding
- **Cloud-Native Requirements**: Solution must use Docker for containerization, Helm for packaging, kubectl for management
- **Kubernetes Deployment**: Deployment must use kind (instead of Minikube) for WSL compatibility
- **Resource Management**: All deployments must include readiness/liveness probes and resource limits (CPU 500m, memory 512Mi)
- **Security Requirements**: Secrets must be used for DB URLs and API keys with least privilege principles
- **Reusable Intelligence**: Claude Subagents should be used for deployment tasks where applicable
- **Previous Phase Features**: All features from Basic, Intermediate, and Advanced phases must be preserved

## Project Structure

### Documentation (this feature)

```text
specs/001-k8s-deployment/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
api/
├── Dockerfile                   # Multi-stage build for FastAPI backend
├── requirements.txt
└── index.py                     # Main application entrypoint

frontend/
├── Dockerfile                   # Multi-stage build for Next.js frontend
├── package.json
├── next.config.js
└── src/
    └── ...

helm/
└── todo-chart/                  # Helm chart for deployment
    ├── Chart.yaml
    ├── values.yaml
    ├── templates/
    │   ├── backend-deployment.yaml
    │   ├── frontend-deployment.yaml
    │   ├── backend-service.yaml
    │   ├── frontend-service.yaml
    │   ├── secret.yaml
    │   └── configmap.yaml
    └── charts/

kind-config.yaml               # Configuration for kind cluster
```

**Structure Decision**: Web application with separate backend and frontend deployments. Backend runs FastAPI with SQLModel and Neon DB connection, frontend runs Next.js with ChatKit integration. Both are containerized and deployed via Helm chart to kind cluster.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Dependencies

- **kind**: Kubernetes in Docker for local cluster
- **Helm 3**: Package manager for Kubernetes
- **Docker**: Containerization platform
- **kubectl**: Kubernetes command-line tool
- **Neon DB**: External PostgreSQL database service
- **OpenAI API**: For ChatKit functionality

## Risks

- **Network connectivity**: Application requires internet access for Neon DB and OpenAI API
- **Resource constraints**: Limited local resources may affect performance during development
- **Secrets management**: Incorrect handling of sensitive data could lead to security vulnerabilities
- **Port conflicts**: NodePort service may conflict with other local services
- **Image build failures**: Multi-stage Docker builds may fail due to dependency issues

## Timeline

Estimated completion: 1-2 hours
- Setup kind cluster: 15 minutes
- Docker image builds: 30 minutes
- Helm chart creation: 30 minutes
- Deployment and testing: 30 minutes
- Documentation and validation: 15 minutes