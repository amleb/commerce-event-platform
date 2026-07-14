import { eq } from 'drizzle-orm';
import { pool, db } from '../../src/persistence/database';
import { orderItems, orders } from '../../src/persistence/schema';

describe('order persistence', () => {
  afterEach(async () => {
    await db.delete(orderItems);
    await db.delete(orders);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('persists and reads an order with items', async () => {
    const [order] = await db
      .insert(orders)
      .values({
        customerId: 'customer-1',
        status: 'created',
        totalCents: 2599,
        currency: 'USD',
      })
      .returning();

    await db.insert(orderItems).values({
      orderId: order.id,
      sku: 'sku-1',
      quantity: 2,
      unitCents: 1299,
    });

    const persistedOrders = await db.select().from(orders).where(eq(orders.id, order.id));

    const persistedItems = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    expect(persistedOrders).toHaveLength(1);
    expect(persistedOrders[0]).toMatchObject({
      id: order.id,
      customerId: 'customer-1',
      status: 'created',
      totalCents: 2599,
      currency: 'USD',
    });

    expect(persistedItems).toHaveLength(1);
    expect(persistedItems[0]).toMatchObject({
      orderId: order.id,
      sku: 'sku-1',
      quantity: 2,
      unitCents: 1299,
    });
  });
});
