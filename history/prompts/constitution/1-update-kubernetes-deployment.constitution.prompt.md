---
id: 1
title: "Update Kubernetes Deployment"
stage: "constitution"
date_iso: "2026-01-08"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "main"
user: "user"
command: "/sp.constitution"
labels: ["constitution", "kubernetes", "deployment"]
files_yaml: |
 - .specify/memory/constitution.md
tests_yaml: |
 - none
links:
  spec: null
  ticket: null
  adr: null
  pr: null
---

# Prompt

```
You are Claude Code for the Todo Hackathon Phase IV.

Update the project CONSTITUTION.md for Phase IV: Local Kubernetes Deployment using kind (instead of Minikube due to WSL compatibility).

Core principles:
- Spec-Driven Development: No manual code; refine specs until correct output.
- Cloud-Native: Use Docker for containerization, Helm for packaging, kubectl for management.
- Reusable Intelligence: Use Claude Subagents for deployment tasks.
- Security: Secrets for DB URL and API keys, least privilege.
- Best Practices: Readiness/liveness probes, resource limits (CPU 500m, memory 512Mi), event-driven if possible.
- All features from previous phases: Basic (add/delete/update/view/mark complete), Intermediate (priorities/tags/search/filter/sort), Advanced (recurring tasks/due dates/reminders).
- Frontend: Next.js with OpenAI ChatKit.
- Backend: FastAPI, SQLModel, Neon DB.

Generate the updated CONSTITUTION.md file.
```

# Response

Constitution file updated successfully to version 2.0.0 with new principles for Phase IV Kubernetes deployment. The updated constitution now includes:

- Cloud-Native Kubernetes Deployment principle with kind, Docker, Helm, and kubectl
- Spec-Driven Development emphasis
- Comprehensive Todo Feature Set covering all previous phases
- Security in Kubernetes Environment with secrets management
- Reusable Intelligence and Automation with Claude Subagents
- Resource Management with readiness/liveness probes and resource limits
- Updated technical constraints and workflow requirements for Kubernetes

The version was bumped from 1.0.0 to 2.0.0 as this is a major update with new architectural principles for Kubernetes deployment.

outcome: "Constitution successfully updated to reflect Phase IV requirements"
evaluation: "All requested principles were incorporated into the constitution, with appropriate version bump and sync impact report added"