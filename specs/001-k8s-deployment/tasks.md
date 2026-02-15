---
description: "Task list for Kubernetes deployment of Todo application"
---

# Tasks: Kubernetes Deployment for Todo App

**Input**: Design documents from `/specs/001-k8s-deployment/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Create kind cluster configuration file at `kind-config.yaml`
- [ ] T002 [P] Install and verify kubectl-ai plugin for AI-assisted commands
- [x] T003 [P] Create directory structure for Helm chart at `helm/todo-chart/`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Setup kind cluster for local Kubernetes deployment
- [x] T005 Create Dockerfile for backend (FastAPI) application in `api/Dockerfile`
- [x] T006 Create Dockerfile for frontend (Next.js) application in `frontend/Dockerfile`
- [x] T007 Create Helm chart structure with Chart.yaml and values.yaml in `helm/todo-chart/`
- [ ] T008 Configure kubectl-ai for generating Kubernetes manifests

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

## Phase 3: User Story 1 - Deploy Todo Application on Kubernetes (Priority: P1) 🎯 MVP

**Goal**: Containerize the Todo application and create basic Kubernetes deployments

**Independent Test**: The application can be successfully deployed to a kind cluster using Helm, with both frontend and backend accessible and functioning correctly.

### Implementation for User Story 1

- [x] T009 [P] [US1] Create backend deployment template in `helm/todo-chart/templates/backend-deployment.yaml`
- [x] T010 [P] [US1] Create frontend deployment template in `helm/todo-chart/templates/frontend-deployment.yaml`
- [x] T011 [P] [US1] Create backend service template in `helm/todo-chart/templates/backend-service.yaml`
- [x] T012 [P] [US1] Create frontend service template in `helm/todo-chart/templates/frontend-service.yaml`
- [x] T013 [US1] Build backend Docker image using multi-stage build
- [x] T014 [US1] Build frontend Docker image using multi-stage build
- [x] T015 [US1] Load Docker images to kind cluster using `kind load docker-image`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

## Phase 4: User Story 2 - Secure Configuration Management (Priority: P2)

**Goal**: Implement secure configuration management using Kubernetes secrets

**Independent Test**: The application can start and connect to the database and external services using configuration loaded from Kubernetes secrets.

### Implementation for User Story 2

- [x] T016 [P] [US2] Create secret template in `helm/todo-chart/templates/secret.yaml`
- [x] T017 [P] [US2] Update backend deployment to use secret for DATABASE_URL
- [x] T018 [P] [US2] Update backend deployment to use secret for OPENAI_API_KEY
- [x] T019 [P] [US2] Update frontend deployment to use NEXT_PUBLIC_API_URL
- [ ] T020 [US2] Test secret loading in deployment

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

## Phase 5: User Story 3 - Resilient Application Runtime (Priority: P3)

**Goal**: Ensure the deployed application has proper health checks and resource constraints

**Independent Test**: The application pods respond correctly to readiness and liveness probes and operate within defined resource limits.

### Implementation for User Story 3

- [x] T021 [P] [US3] Add readiness and liveness probes to backend deployment
- [x] T022 [P] [US3] Add readiness and liveness probes to frontend deployment
- [x] T023 [P] [US3] Add resource limits (CPU 500m, memory 512Mi) to backend deployment
- [x] T024 [P] [US3] Add resource limits (CPU 500m, memory 512Mi) to frontend deployment
- [ ] T025 [US3] Test health checks and resource limits functionality

**Checkpoint**: All user stories should now be independently functional

## Phase 6: AIOps Integration (Priority: P2)

**Goal**: Integrate kubectl-ai for AI-assisted Kubernetes operations

- [ ] T026 [P] Generate Helm chart using kubectl-ai command: "generate helm chart for todo app"
- [ ] T027 [P] Use kubectl-ai to verify deployments: "show me the status of todo deployments"
- [ ] T028 Test deployment verification with kubectl-ai

## Phase 7: Deployment and Testing

**Goal**: Deploy the application and verify functionality

- [ ] T029 [P] Install Helm chart using `helm install todo-app helm/todo-chart/`
- [ ] T030 [P] Verify deployments are running with `kubectl get deployments`
- [ ] T031 Test port-forward to backend: `kubectl port-forward svc/todo-backend-service 8000:8000`
- [ ] T032 Test port-forward to frontend: `kubectl port-forward svc/todo-frontend-service 3000:3000`
- [ ] T033 Verify chatbot functionality by testing "reschedule meeting" command in UI

## Phase 8: Bonus - Claude Subagent for Cloud-Native Blueprint

**Goal**: Create a reusable Claude subagent for cloud-native Kubernetes setup

- [ ] T034 Create Claude subagent for cloud-native blueprint deployment
- [ ] T035 Document the subagent for reusable K8s setup
- [ ] T036 Test the subagent with a sample deployment

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T037 [P] Update documentation in quickstart.md with new procedures
- [ ] T038 [P] Validate Helm chart with proper resource limits (CPU 500m, memory 512Mi)
- [ ] T039 Test deployment on kind cluster
- [ ] T040 Verify readiness and liveness probes functionality
- [ ] T041 Run quickstart.md validation

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **AIOps Integration (Phase 6)**: Can run in parallel with user stories
- **Deployment and Testing (Phase 7)**: Depends on all deployments being ready
- **Bonus Phase (Phase 8)**: Can run in parallel or after main phases
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Task Dependencies

- **T009-T012** depend on T007 (Helm chart structure)
- **T013-T014** can run in parallel after Dockerfiles are created
- **T015** depends on T013-T014 (images must be built first)
- **T017-T018** depend on T016 (secret must exist first)
- **T029** depends on all Helm templates being ready
- **T031-T032** depend on successful deployment (T029)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All deployment templates within a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Estimated Time

- Phase 1-2 (Setup & Foundation): 30 minutes
- Phase 3 (User Story 1): 45 minutes
- Phase 4 (User Story 2): 30 minutes
- Phase 5 (User Story 3): 30 minutes
- Phase 6 (AIOps): 15 minutes
- Phase 7 (Deployment & Testing): 30 minutes
- Phase 8 (Bonus): 30 minutes
- Phase N (Polish): 15 minutes
- **Total**: ~235 minutes (≈4 hours)