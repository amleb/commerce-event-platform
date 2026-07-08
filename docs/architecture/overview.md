# Architecture Overview

This system will model an event-driven commerce order platform.

## Initial Service Boundaries

- Order Service owns order creation and order lifecycle state.
- Payment Service owns payment authorization and settlement decisions.
- Inventory Service owns stock reservation and release.
- Notification Service owns outbound customer and operational notifications.

## Architectural Style

Each service should use Clean Architecture:

- `domain`: entities, value objects, domain events, and domain services.
- `application`: use cases, commands, queries, and ports.
- `infrastructure`: adapters for databases, messaging, cache, and external systems.
- `interfaces`: inbound adapters such as HTTP controllers and Kafka consumers.

NestJS is used for composition, dependency injection, transport adapters, and testing utilities.
Domain code should remain framework-independent.

## Local Infrastructure

Local development uses Docker Compose for PostgreSQL, Kafka, and Redis.

## Cloud Direction

The design should map cleanly to AWS-managed services later, such as ECS or Lambda, MSK or SQS/SNS, RDS PostgreSQL, and ElastiCache Redis.
