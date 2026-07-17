# Roadmap

## Milestone 1: Repository Foundation

- Initialize monorepo structure.
- Add TypeScript, linting, formatting, and workspace configuration.
- Add Docker Compose for PostgreSQL, Kafka, and Redis.
- Add architecture overview and ADR process.

## Milestone 2: Service Boundary Design

- Define order lifecycle.
- Define service ownership.
- Draft first event catalog.
- Document failure scenarios and consistency boundaries.

## Milestone 3: Order Service Skeleton

- Add NestJS order service.
- Add health endpoint.
- Add validated configuration.
- Add structured logging.
- Add unit test setup.

## Milestone 4: Persistence

- Add PostgreSQL access.
- Model order aggregate persistence.
- Add migrations.
- Add integration tests.

## Milestone 5: Event Publishing

- Introduce the outbox pattern.
- Add Kafka producer.
- Publish `OrderCreated`.

## Milestone 6: Downstream Consumers

- Add payment and inventory consumers.
- Model eventual consistency.
- Add idempotency.

## Milestone 7: Reliability

- Add retries.
- Add dead-letter topics.
- Add correlation IDs.
- Add observability foundations.

## Milestone 8: AWS-Oriented Architecture

- Document AWS deployment mapping.
- Add infrastructure-as-code direction.
- Add deployment and operations documentation.
