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

```typescript
{
    eventId: string;
    eventType: string;
    eventVersion: number;
    occurredAt: string;
    aggregateType: string;
    aggregateId: string;
    correlationId?: string;
    payload: {};
}
```

## Kafka Topic Strategy

## Partitioning Strategy

## Delivery Semantics

## Event Versioning

## Event Summary

| Event               | Producer          | Consumers               | Purpose                        |
| ------------------- | ----------------- | ----------------------- | ------------------------------ |
| `OrderCreated`      | Order Service     | Inventory, Notification | A new order entered the system |
| `InventoryReserved` | Inventory Service | Payment, Order          | Stock reserved successfully    |
| `PaymentAuthorized` | Payment Service   | Order                   | Payment approved               |
| `OrderConfirmed`    | Order Service     | Fulfillment             | Order ready for fulfillment    |

## Event Definitions

## OrderCreated

Producer:
Order Service

Consumers:
Inventory Service
Notification Service

Purpose:
A customer order has been accepted by the Order Service and entered the processing workflow.

Key Data:

- orderId
- customerId
- items
- totalCents
- currency

Notes:

- This event does not imply inventory has been reserved.
- This event does not imply payment has been authorized.
- It starts the asynchronous order processing workflow.

---

### @todo

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
