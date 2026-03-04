import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: real('price').notNull(),
    image: text('image').notNull(),
    category: text('category').notNull(),
    stock: integer('stock').notNull().default(10),
});

export const orders = sqliteTable('orders', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    customerName: text('customer_name').notNull(),
    customerPhone: text('customer_phone').notNull(),
    total: real('total').notNull(),
    status: text('status').notNull().default('pending'),
    createdAt: text('created_at').notNull().default(new Date().toISOString()),
});

export const orderItems = sqliteTable('order_items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    orderId: integer('order_id').references(() => orders.id),
    productId: integer('product_id').references(() => products.id),
    quantity: integer('quantity').notNull(),
    price: real('price').notNull(),
});
