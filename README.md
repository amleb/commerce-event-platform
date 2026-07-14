# Commerce Event Platform

A production-style portfolio project for an event-driven order processing platform.

## Goals

- Demonstrate Node.js and TypeScript in a realistic backend system.
- Model distributed order processing with Kafka, PostgreSQL, and Redis.
- Use NestJS as the application framework while keeping domain code framework-independent.
- Practice Clean Architecture, Domain-Driven Design, and technical decision documentation.
- Keep the project AWS-oriented so the local design can map to cloud infrastructure later.

## Current Status

- [x] Milestone 1 – Repository Foundation
- [x] Milestone 2 – Service Boundary Design
- [x] Milestone 3 – Order Service Skeleton
- [x] Milestone 4 – Persistence
- [ ] Milestone 5 – Event Publishing
- [ ] Milestone 6 – Downstream Consumers
- [ ] Milestone 7 – Reliability
- [ ] Milestone 8 – AWS-Oriented Architecture

## Planned Services

- Order Service
- Payment Service
- Inventory Service
- Notification Service

## Architecture Principles

- Domain logic must not depend on NestJS or infrastructure libraries.
- Application services coordinate use cases through ports.
- Infrastructure adapters implement ports for PostgreSQL, Kafka, Redis, and external systems.
- Shared packages should stay small and stable to avoid accidental coupling.
- Significant architectural choices should be captured as ADRs.
