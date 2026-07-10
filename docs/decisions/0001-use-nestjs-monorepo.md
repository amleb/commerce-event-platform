# ADR 0001: Use a NestJS Monorepo

## Status

Accepted

## Context

The project is a portfolio-grade event-driven order processing platform. It needs to demonstrate production backend engineering, distributed systems, and service boundaries while remaining practical to build incrementally.

## Decision

Use a pnpm-based NestJS monorepo with deployable applications under `apps/` and small shared packages under `packages/`.

NestJS will be used for:

- application composition
- dependency injection
- HTTP and messaging adapters
- configuration integration
- testing conventions

Domain logic must remain independent of NestJS and infrastructure libraries.

## Consequences

Positive:

- Strong conventions for a multi-service TypeScript backend.
- Familiar structure for enterprise Node.js reviewers.
- Easier testing and dependency injection setup.
- Good fit for future HTTP, Kafka, and background worker adapters.

Trade-offs:

- NestJS modules can become too central if boundaries are not enforced.
- Decorators and framework abstractions may hide architectural decisions.
- Shared packages must be controlled carefully to avoid a distributed monolith.
