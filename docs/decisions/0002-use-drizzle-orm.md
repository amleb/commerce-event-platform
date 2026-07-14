# ADR 0002: Use Drizzle ORM

## Status

Accepted

## Context

This project needs a persistence solution for Node.js, TypeScript, and PostgreSQL.

The persistence technology must provide type-safe database access and migration support without coupling domain entities to database models.

The following options were considered:

- Prisma;
- TypeORM;
- Drizzle.

## Decision

Use Drizzle as the PostgreSQL query and schema management library.

Drizzle will be used only in the infrastructure layer.

Domain entities and application use cases must not depend on Drizzle types, table definitions, or database-generated models.

Repository interfaces will be defined at the application or domain boundary, and Drizzle-based repository implementations will reside in the infrastructure layer.

Drizzle Kit will be used to generate and apply version-controlled SQL migrations.

## Rationale

Drizzle was selected because it:

- provides type-safe TypeScript database access;
- remains close to SQL and PostgreSQL concepts;
- supports explicit database transactions;
- produces inspectable SQL migrations;
- allows repositories to remain explicit;
- is suitable for implementing transactional outbox and inbox patterns;
- introduces less pressure to model domain entities as ORM entities.

This project values architectural clarity and database understanding over minimizing persistence boilerplate.

## Considered Alternatives

### Prisma

Prisma provides strong developer ergonomics, a generated type-safe client, and convenient migration tooling.

It was not selected because its generated persistence model could too easily become the application’s de facto domain model. Prisma remains a valid alternative if development speed becomes more important than SQL visibility.

### TypeORM

TypeORM supports both Data Mapper and Active Record patterns and offers mature relational mapping features.

It was not selected because decorator-based entities and the availability of Active Record could encourage coupling between the domain and persistence layers. Using it correctly would require additional conventions and enforcement.

### Direct node-postgres

Using node-postgres directly would provide maximum SQL control.

It was not selected because it would require more manual result typing, schema mapping, and query infrastructure than is useful for the initial project scope.

## Consequences

Positive:

- Database queries and migrations remain explicit.
- PostgreSQL behavior is easier to inspect and reason about.
- Domain entities remain independent of the persistence library.
- Complex queries and database constraints can be expressed without fighting a high-level ORM.
- The selected approach supports explicit transaction management for state changes and outbox records.

Trade-offs:

- More mapping code may be required between rows and domain entities.
- Developers must understand SQL and PostgreSQL.
- Drizzle provides fewer high-level object-graph abstractions than Prisma.
- Repository implementations may contain more explicit query logic.

## Constraints:

- Drizzle imports are allowed only in infrastructure and database tooling.
- Domain entities must not use database decorators or generated persistence types.
- Database rows must not be returned directly from application use cases.
- Monetary values must be stored using an explicitly chosen representation, not floating-point numbers.
- Business invariants must be enforced in the domain and, where appropriate, reinforced with database constraints.
- Migrations must be committed to version control and reviewed before application.
- Schema synchronization commands must not replace reviewed migrations in production.
- State changes and outbox inserts must occur within the same local database transaction.
