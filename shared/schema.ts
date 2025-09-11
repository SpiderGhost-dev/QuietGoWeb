import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status").default("free"),
  subscriptionPlan: varchar("subscription_plan").default("free"), // free, pro_monthly, pro_yearly
  mealAiAddon: boolean("meal_ai_addon").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enums
export const bristolScaleEnum = pgEnum("bristol_scale", ["1", "2", "3", "4", "5", "6", "7"]);
export const logTypeEnum = pgEnum("log_type", ["stool", "meal"]);
export const fileTypeEnum = pgEnum("file_type", ["json", "csv", "image"]);

// Health logs table
export const healthLogs = pgTable("health_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: logTypeEnum("type").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  
  // Stool-specific fields
  bristolScale: bristolScaleEnum("bristol_scale"),
  stoolColor: varchar("stool_color"),
  effort: boolean("effort"),
  pain: boolean("pain"),
  
  // Meal-specific fields
  foods: jsonb("foods"), // Array of {name, quantity, unit, calories, macros}
  totalCalories: integer("total_calories"),
  
  // Common fields
  tags: text("tags").array(),
  notes: text("notes"),
  photoId: varchar("photo_id"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// File uploads table
export const fileUploads = pgTable("file_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  filename: varchar("filename").notNull(),
  originalName: varchar("original_name").notNull(),
  mimeType: varchar("mime_type").notNull(),
  size: integer("size").notNull(),
  type: fileTypeEnum("type").notNull(),
  processed: boolean("processed").default(false),
  processedAt: timestamp("processed_at"),
  metadata: jsonb("metadata"), // AI analysis results, import status, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// Patterns and insights table
export const patterns = pgTable("patterns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type").notNull(), // "regularity_window", "frequency", "correlation"
  data: jsonb("data").notNull(), // Pattern analysis results
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }), // 0.00 to 1.00
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Shared access table (for caregiver sharing)
export const sharedAccess = pgTable("shared_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  viewerEmail: varchar("viewer_email").notNull(),
  permissions: jsonb("permissions").notNull(), // {trends: boolean, photos: boolean}
  revokedAt: timestamp("revoked_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  healthLogs: many(healthLogs),
  fileUploads: many(fileUploads),
  patterns: many(patterns),
  sharedAccess: many(sharedAccess),
}));

export const healthLogsRelations = relations(healthLogs, ({ one }) => ({
  user: one(users, { fields: [healthLogs.userId], references: [users.id] }),
}));

export const fileUploadsRelations = relations(fileUploads, ({ one }) => ({
  user: one(users, { fields: [fileUploads.userId], references: [users.id] }),
}));

export const patternsRelations = relations(patterns, ({ one }) => ({
  user: one(users, { fields: [patterns.userId], references: [users.id] }),
}));

export const sharedAccessRelations = relations(sharedAccess, ({ one }) => ({
  user: one(users, { fields: [sharedAccess.userId], references: [users.id] }),
}));

// Insert schemas
export const insertHealthLogSchema = createInsertSchema(healthLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFileUploadSchema = createInsertSchema(fileUploads).omit({
  id: true,
  createdAt: true,
  processed: true,
  processedAt: true,
});

export const insertPatternSchema = createInsertSchema(patterns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSharedAccessSchema = createInsertSchema(sharedAccess).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type HealthLog = typeof healthLogs.$inferSelect;
export type InsertHealthLog = z.infer<typeof insertHealthLogSchema>;
export type FileUpload = typeof fileUploads.$inferSelect;
export type InsertFileUpload = z.infer<typeof insertFileUploadSchema>;
export type Pattern = typeof patterns.$inferSelect;
export type InsertPattern = z.infer<typeof insertPatternSchema>;
export type SharedAccess = typeof sharedAccess.$inferSelect;
export type InsertSharedAccess = z.infer<typeof insertSharedAccessSchema>;
