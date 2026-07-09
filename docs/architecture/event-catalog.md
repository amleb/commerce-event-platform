# Event Catalog

## Purpose

This document defines the initial domain events used by the commerce event platform.
Events represent facts that already happened in the system and are used for asynchronous communication between services.

---

## Event Design Principles

- Events are named in past tense.
- Events describe business facts, not commands.
- Each event has a single clear owner.
- Consumers should not depend on another service’s database.
- Events should include enough data for consumers to react without synchronous calls where reasonable.
- Event schemas should be versioned.

---

## Event Naming Convention

Format:

```text
<BusinessEntity><PastTenseAction>
```

## Event Metadata

## Kafka Topic Strategy

## Partitioning Strategy

## Delivery Semantics

## Event Versioning

## Initial Event Catalog (table)

## Event Definitions

    - OrderCreated
    - InventoryReserved
    - InventoryReservationFailed
    - PaymentAuthorized
    - PaymentFailed
    - OrderConfirmed
    - OrderCancelled
    - FulfillmentStarted
    - FulfillmentCompleted
    - OrderCompleted

## Event Flow

## Idempotency Expectations

## Sensitive Data Policy

## Future Improvements
