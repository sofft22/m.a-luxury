// lib/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(), 
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description"), 
  category: text("category").notNull(),
  image: text("image").notNull(),
  images: text("images"),
  inStock: integer("inStock").default(1),
  sizes: text("sizes"), 
  featured: integer("featured").default(1),
});

export const services = sqliteTable("services", {
  id: text("id").primaryKey(), 
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  options: text("options"), 
  image: text("image"), 
  duration: integer("duration").default(60), // Duration in minutes
  inStock: integer("inStock").default(1),
});

export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  serviceId: text("serviceId").notNull(),
  serviceName: text("serviceName").notNull(),
  customerName: text("customerName").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  date: text("date").notNull(),
  startTime: text("startTime").notNull(),
  endTime: text("endTime").notNull(),
  depositPaid: integer("depositPaid").default(1),
  createdAt: text("createdAt").notNull(),
});

export const availability = sqliteTable("availability", {
  id: text("id").primaryKey(),
  date: text("date").notNull().unique(),
  isOpen: integer("isOpen").default(1),
  startTime: text("startTime").default("09:00"),
  endTime: text("endTime").default("18:00"),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  customerName: text("customerName").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city"),
  state: text("state"),
  items: text("items").notNull(),
  subtotal: integer("subtotal").notNull(),
  deliveryFee: integer("deliveryFee").notNull(),
  discountAmount: integer("discountAmount").default(0),
  promoCode: text("promoCode"),
  processingFee: integer("processingFee").default(0), 
  total: integer("total").notNull(),
  paymentMethod: text("paymentMethod").notNull(),
  status: text("status").default("Pending"),
  date: text("date").notNull(),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("productId").notNull(),
  customerName: text("customerName").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  approved: integer("approved").default(0),
  date: text("date").notNull(),
});

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey(),
  deliveryFee: integer("deliveryFee").default(0),
  deliveryZones: text("deliveryZones"),
  whatsappNumber: text("whatsappNumber"),
  bankName: text("bankName"),
  accountName: text("accountName"),
  accountNumber: text("accountNumber"),
  bannerText: text("bannerText"),
  bannerActive: integer("bannerActive").default(0),
  boxBuilderConfig: text("boxBuilderConfig"), 
});

export const promos = sqliteTable("promos", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  type: text("type").notNull(), 
  value: integer("value").notNull(), 
  minSpend: integer("minSpend").default(0),
  maxUses: integer("maxUses").default(0),
  currentUses: integer("currentUses").default(0),
  expiresAt: text("expiresAt"),
  isActive: integer("isActive").default(1),
});

export const promoUsage = sqliteTable("promo_usage", {
  id: text("id").primaryKey(),
  promoId: text("promoId").notNull(),
  phone: text("phone").notNull(),
  date: text("date").notNull(),
});
