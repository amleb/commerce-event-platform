import { db } from '../persistence/database.js';
import { orderItems, orders, outboxEvents } from '../persistence/schema.js';

export interface CreateOrderInput {
  customerId: string;
  totalCents: number;
  currency: string;
  items: Array<{
    sku: string;
    quantity: number;
    unitCents: number;
  }>;
}

export class CreateOrderHandler {
  async execute(input: CreateOrderInput) {
    return db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          customerId: input.customerId,
          status: 'created',
          totalCents: input.totalCents,
          currency: input.currency,
        })
        .returning();

      const items = await tx
        .insert(orderItems)
        .values(
          input.items.map((item) => ({
            orderId: order.id,
            ...item,
          })),
        )
        .returning();

      const [outboxEvent] = await tx
        .insert(outboxEvents)
        .values({
          aggregateType: 'order',
          aggregateId: order.id,
          eventType: 'OrderCreated',
          eventVersion: 1,
          payload: {
            orderId: order.id,
            customerId: order.customerId,
            totalCents: order.totalCents,
            currency: order.currency,
            items: input.items,
          },
        })
        .returning();

      return { order, items, outboxEvent };
    });
  }
}
