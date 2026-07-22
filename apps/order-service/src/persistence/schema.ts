import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const orderStatus = pgEnum('order_status', [
  'created',
  'pending',
  'confirmed',
  'paid',
  'completed',
  'cancelled',
]);

export const outboxEventStatus = pgEnum('outbox_event_status', [
  'pending',
  'published',
  'failed',
]);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: text('customer_id').notNull(),
  status: orderStatus('status').notNull().default('created'),
  totalCents: integer('total_cents').notNull(),
  currency: text('currency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  sku: text('sku').notNull(),
  quantity: integer('quantity').notNull(),
  unitCents: integer('unit_cents').notNull(),
});

export const outboxEvents = pgTable('outbox_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  aggregateType: text('aggregate_type').notNull(),
  aggregateId: uuid('aggregate_id').notNull(),
  eventType: text('event_type').notNull(),
  eventVersion: integer('event_version').notNull(),
  payload: jsonb('payload').notNull(),
  status: outboxEventStatus('status').notNull().default('pending'),
  attempts: integer('attempts').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  lastError: text('last_error'),
});
