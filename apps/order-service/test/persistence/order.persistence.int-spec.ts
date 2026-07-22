import { eq } from 'drizzle-orm';
import { CreateOrderHandler } from '../../src/application/create-order.handler';
import { pool, db } from '../../src/persistence/database';
import { orderItems, orders, outboxEvents } from '../../src/persistence/schema';

describe('CreateOrderHandler (integration)', () => {
  afterEach(async () => {
    await db.delete(outboxEvents);
    await db.delete(orderItems);
    await db.delete(orders);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('commits an order, its items, and exactly one pending OrderCreated outbox event', async () => {
    const createOrder = new CreateOrderHandler();
    const { order } = await createOrder.execute({
      customerId: 'customer-1',
      totalCents: 2599,
      currency: 'USD',
      items: [
        { sku: 'sku-1', quantity: 2, unitCents: 1299 },
        { sku: 'sku-2', quantity: 1, unitCents: 1 },
      ],
    });

    const persistedOrders = await db.select().from(orders).where(eq(orders.id, order.id));

    const persistedItems = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    const persistedEvents = await db
      .select()
      .from(outboxEvents)
      .where(eq(outboxEvents.aggregateId, order.id));

    expect(persistedOrders).toHaveLength(1);
    expect(persistedOrders[0]).toMatchObject({
      id: order.id,
      customerId: 'customer-1',
      status: 'created',
      totalCents: 2599,
      currency: 'USD',
    });

    expect(persistedItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          orderId: order.id,
          sku: 'sku-1',
          quantity: 2,
          unitCents: 1299,
        }),
        expect.objectContaining({
          orderId: order.id,
          sku: 'sku-2',
          quantity: 1,
          unitCents: 1,
        }),
      ]),
    );
    expect(persistedItems).toHaveLength(2);

    expect(persistedEvents).toHaveLength(1);
    expect(persistedEvents[0]).toMatchObject({
      aggregateType: 'order',
      aggregateId: order.id,
      eventType: 'OrderCreated',
      eventVersion: 1,
      status: 'pending',
      attempts: 0,
      payload: {
        orderId: order.id,
        customerId: 'customer-1',
        totalCents: 2599,
        currency: 'USD',
        items: [
          { sku: 'sku-1', quantity: 2, unitCents: 1299 },
          { sku: 'sku-2', quantity: 1, unitCents: 1 },
        ],
      },
    });
  });
});
