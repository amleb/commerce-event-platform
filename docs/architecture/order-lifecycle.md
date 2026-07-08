# Order Lifecycle

## Purpose

> This document describes how an order moves through the platform, which services participate in processing it, and where ownership of business decisions lies.

---

# Business Goal

> A customer places an order. The platform validates it, reserves inventory, processes payment, prepares fulfillment, and eventually completes or cancels the order.

---

# Order States

| State                | Description                       | Owner               |
| -------------------- | --------------------------------- | ------------------- |
| Created              | Customer submitted an order       | Order Service       |
| Pending              | Waiting for downstream processing | Order Service       |
| Confirmed            | Order accepted                    | Order Service       |
| Paid                 | Payment completed                 | Payment Service     |
| FulfillmentRequested | Shipment requested                | Fulfillment Service |
| Completed            | Successfully fulfilled            | Order Service       |
| Cancelled            | Order cancelled                   | Order Service       |

---

# Happy Path

Describe the ideal flow.

1. Customer submits an order.
2. Order Service validates it.
3. OrderCreated event is published.
4. Inventory reserves stock.
5. Payment is processed.
6. Order becomes confirmed.
7. Fulfillment begins.
8. Order completes.

---

# State Transitions

| Current         | Event                | Next            |
| --------------- | -------------------- | --------------- |
| Created         | InventoryReserved    | AwaitingPayment |
| AwaitingPayment | PaymentSucceeded     | Confirmed       |
| Confirmed       | FulfillmentStarted   | InFulfillment   |
| InFulfillment   | FulfillmentCompleted | Completed       |

---

# Failure Scenarios

### Inventory reservation fails

Result:

- order is cancelled
- stock remains unchanged
- customer is notified

---

### Payment fails

Result:

- inventory reservation is released
- order becomes cancelled

---

### Fulfillment fails

Result:

- retry
- manual intervention
- refund?

---

# Domain Rules

- An order cannot be paid twice.
- Completed orders cannot be cancelled.
- Payment cannot start before inventory is reserved.
- Inventory is reserved only once.

---

# Open Questions

- Should payment happen before inventory reservation?
- Do we support partial fulfillment?
- Can orders be modified after confirmation?
