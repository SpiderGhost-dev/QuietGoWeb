import {
  users,
  healthLogs,
  fileUploads,
  patterns,
  sharedAccess,
  admins,
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
  type Admin,
  type InsertAdmin,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, isNull, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserSubscription(id: string, subscriptionData: {
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

  // Admin operations
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  updateAdminLogin(id: string): Promise<Admin>;
  getAllAdmins(): Promise<Admin[]>;
  updateAdmin(id: string, updates: Partial<InsertAdmin>): Promise<Admin>;
  deactivateAdmin(id: string): Promise<Admin>;
  getAdminCount(): Promise<number>;
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
    const whereConditions = type 
      ? and(eq(patterns.userId, userId), eq(patterns.type, type))
      : eq(patterns.userId, userId);
    
    return await db
      .select()
      .from(patterns)
      .where(whereConditions)
      .orderBy(desc(patterns.createdAt));
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

  // Admin operations
  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const [adminRecord] = await db.insert(admins).values(admin).returning();
    return adminRecord;
  }

  async getAdmin(id: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }

  async updateAdminLogin(id: string): Promise<Admin> {
    const [admin] = await db
      .update(admins)
      .set({
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(admins.id, id))
      .returning();
    return admin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    return await db
      .select()
      .from(admins)
      .where(eq(admins.isActive, true))
      .orderBy(desc(admins.createdAt));
  }

  async getAdminCount(): Promise<number> {
    const [result] = await db.select({ count: sql<number>`count(*)` }).from(admins);
    return result.count;
  }

  async updateAdmin(id: string, updates: Partial<InsertAdmin>): Promise<Admin> {
    const [admin] = await db
      .update(admins)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(admins.id, id))
      .returning();
    return admin;
  }

  async deactivateAdmin(id: string): Promise<Admin> {
    const [admin] = await db
      .update(admins)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(admins.id, id))
      .returning();
    return admin;
  }
}

export const storage = new DatabaseStorage();
