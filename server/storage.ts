import {
  users,
  healthLogs,
  fileUploads,
  patterns,
  sharedAccess,
  type User,
  type UpsertUser,
  type HealthLog,
  type InsertHealthLog,
  type FileUpload,
  type InsertFileUpload,
  type Pattern,
  type InsertPattern,
  type SharedAccess,
  type InsertSharedAccess,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, isNull } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserSubscription(id: string, subscriptionData: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
    mealAiAddon?: boolean;
  }): Promise<User>;

  // Health log operations
  createHealthLog(log: InsertHealthLog): Promise<HealthLog>;
  getHealthLogs(userId: string, limit?: number): Promise<HealthLog[]>;
  getHealthLogsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<HealthLog[]>;

  // File upload operations
  createFileUpload(upload: InsertFileUpload): Promise<FileUpload>;
  getFileUploads(userId: string): Promise<FileUpload[]>;
  updateFileUploadProcessed(id: string, metadata?: any): Promise<FileUpload>;

  // Pattern operations
  createPattern(pattern: InsertPattern): Promise<Pattern>;
  getPatterns(userId: string, type?: string): Promise<Pattern[]>;

  // Shared access operations
  createSharedAccess(access: InsertSharedAccess): Promise<SharedAccess>;
  getSharedAccess(userId: string): Promise<SharedAccess[]>;
  revokeSharedAccess(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserSubscription(id: string, subscriptionData: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
    mealAiAddon?: boolean;
  }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...subscriptionData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Health log operations
  async createHealthLog(log: InsertHealthLog): Promise<HealthLog> {
    const [healthLog] = await db.insert(healthLogs).values(log).returning();
    return healthLog;
  }

  async getHealthLogs(userId: string, limit = 50): Promise<HealthLog[]> {
    return await db
      .select()
      .from(healthLogs)
      .where(eq(healthLogs.userId, userId))
      .orderBy(desc(healthLogs.timestamp))
      .limit(limit);
  }

  async getHealthLogsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<HealthLog[]> {
    return await db
      .select()
      .from(healthLogs)
      .where(
        and(
          eq(healthLogs.userId, userId),
          gte(healthLogs.timestamp, startDate),
          lte(healthLogs.timestamp, endDate)
        )
      )
      .orderBy(desc(healthLogs.timestamp));
  }

  // File upload operations
  async createFileUpload(upload: InsertFileUpload): Promise<FileUpload> {
    const [fileUpload] = await db.insert(fileUploads).values(upload).returning();
    return fileUpload;
  }

  async getFileUploads(userId: string): Promise<FileUpload[]> {
    return await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.userId, userId))
      .orderBy(desc(fileUploads.createdAt));
  }

  async updateFileUploadProcessed(id: string, metadata?: any): Promise<FileUpload> {
    const [fileUpload] = await db
      .update(fileUploads)
      .set({
        processed: true,
        processedAt: new Date(),
        metadata,
      })
      .where(eq(fileUploads.id, id))
      .returning();
    return fileUpload;
  }

  // Pattern operations
  async createPattern(pattern: InsertPattern): Promise<Pattern> {
    const [patternRecord] = await db.insert(patterns).values(pattern).returning();
    return patternRecord;
  }

  async getPatterns(userId: string, type?: string): Promise<Pattern[]> {
    let query = db.select().from(patterns).where(eq(patterns.userId, userId));
    
    if (type) {
      query = query.where(and(eq(patterns.userId, userId), eq(patterns.type, type)));
    }

    return await query.orderBy(desc(patterns.createdAt));
  }

  // Shared access operations
  async createSharedAccess(access: InsertSharedAccess): Promise<SharedAccess> {
    const [sharedAccessRecord] = await db.insert(sharedAccess).values(access).returning();
    return sharedAccessRecord;
  }

  async getSharedAccess(userId: string): Promise<SharedAccess[]> {
    return await db
      .select()
      .from(sharedAccess)
      .where(and(eq(sharedAccess.userId, userId), isNull(sharedAccess.revokedAt)))
      .orderBy(desc(sharedAccess.createdAt));
  }

  async revokeSharedAccess(id: string): Promise<void> {
    await db
      .update(sharedAccess)
      .set({ revokedAt: new Date() })
      .where(eq(sharedAccess.id, id));
  }
}

export const storage = new DatabaseStorage();
