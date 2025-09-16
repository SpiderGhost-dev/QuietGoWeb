var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import multer from "multer";
import fs from "fs/promises";
import Stripe from "stripe";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  bristolScaleEnum: () => bristolScaleEnum,
  fileTypeEnum: () => fileTypeEnum,
  fileUploads: () => fileUploads,
  fileUploadsRelations: () => fileUploadsRelations,
  healthLogs: () => healthLogs,
  healthLogsRelations: () => healthLogsRelations,
  insertFileUploadSchema: () => insertFileUploadSchema,
  insertHealthLogSchema: () => insertHealthLogSchema,
  insertPatternSchema: () => insertPatternSchema,
  insertSharedAccessSchema: () => insertSharedAccessSchema,
  logTypeEnum: () => logTypeEnum,
  patterns: () => patterns,
  patternsRelations: () => patternsRelations,
  sessions: () => sessions,
  sharedAccess: () => sharedAccess,
  sharedAccessRelations: () => sharedAccessRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { sql } from "drizzle-orm";
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
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status").default("free"),
  subscriptionPlan: varchar("subscription_plan").default("free"),
  // free, pro_monthly, pro_yearly
  mealAiAddon: boolean("meal_ai_addon").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var bristolScaleEnum = pgEnum("bristol_scale", ["1", "2", "3", "4", "5", "6", "7"]);
var logTypeEnum = pgEnum("log_type", ["stool", "meal"]);
var fileTypeEnum = pgEnum("file_type", ["json", "csv", "image"]);
var healthLogs = pgTable("health_logs", {
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
  foods: jsonb("foods"),
  // Array of {name, quantity, unit, calories, macros}
  totalCalories: integer("total_calories"),
  // Common fields
  tags: text("tags").array(),
  notes: text("notes"),
  photoId: varchar("photo_id"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var fileUploads = pgTable("file_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  filename: varchar("filename").notNull(),
  originalName: varchar("original_name").notNull(),
  mimeType: varchar("mime_type").notNull(),
  size: integer("size").notNull(),
  type: fileTypeEnum("type").notNull(),
  processed: boolean("processed").default(false),
  processedAt: timestamp("processed_at"),
  metadata: jsonb("metadata"),
  // AI analysis results, import status, etc.
  createdAt: timestamp("created_at").defaultNow()
});
var patterns = pgTable("patterns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type").notNull(),
  // "regularity_window", "frequency", "correlation"
  data: jsonb("data").notNull(),
  // Pattern analysis results
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  // 0.00 to 1.00
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var sharedAccess = pgTable("shared_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  viewerEmail: varchar("viewer_email").notNull(),
  permissions: jsonb("permissions").notNull(),
  // {trends: boolean, photos: boolean}
  revokedAt: timestamp("revoked_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var usersRelations = relations(users, ({ many }) => ({
  healthLogs: many(healthLogs),
  fileUploads: many(fileUploads),
  patterns: many(patterns),
  sharedAccess: many(sharedAccess)
}));
var healthLogsRelations = relations(healthLogs, ({ one }) => ({
  user: one(users, { fields: [healthLogs.userId], references: [users.id] })
}));
var fileUploadsRelations = relations(fileUploads, ({ one }) => ({
  user: one(users, { fields: [fileUploads.userId], references: [users.id] })
}));
var patternsRelations = relations(patterns, ({ one }) => ({
  user: one(users, { fields: [patterns.userId], references: [users.id] })
}));
var sharedAccessRelations = relations(sharedAccess, ({ one }) => ({
  user: one(users, { fields: [sharedAccess.userId], references: [users.id] })
}));
var insertHealthLogSchema = createInsertSchema(healthLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertFileUploadSchema = createInsertSchema(fileUploads).omit({
  id: true,
  createdAt: true,
  processed: true,
  processedAt: true
});
var insertPatternSchema = createInsertSchema(patterns).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSharedAccessSchema = createInsertSchema(sharedAccess).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and, gte, lte, isNull } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async updateUserSubscription(id, subscriptionData) {
    const [user] = await db.update(users).set({
      ...subscriptionData,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, id)).returning();
    return user;
  }
  // Health log operations
  async createHealthLog(log2) {
    const [healthLog] = await db.insert(healthLogs).values(log2).returning();
    return healthLog;
  }
  async getHealthLogs(userId, limit = 50) {
    return await db.select().from(healthLogs).where(eq(healthLogs.userId, userId)).orderBy(desc(healthLogs.timestamp)).limit(limit);
  }
  async getHealthLogsByDateRange(userId, startDate, endDate) {
    return await db.select().from(healthLogs).where(
      and(
        eq(healthLogs.userId, userId),
        gte(healthLogs.timestamp, startDate),
        lte(healthLogs.timestamp, endDate)
      )
    ).orderBy(desc(healthLogs.timestamp));
  }
  // File upload operations
  async createFileUpload(upload2) {
    const [fileUpload] = await db.insert(fileUploads).values(upload2).returning();
    return fileUpload;
  }
  async getFileUploads(userId) {
    return await db.select().from(fileUploads).where(eq(fileUploads.userId, userId)).orderBy(desc(fileUploads.createdAt));
  }
  async updateFileUploadProcessed(id, metadata) {
    const [fileUpload] = await db.update(fileUploads).set({
      processed: true,
      processedAt: /* @__PURE__ */ new Date(),
      metadata
    }).where(eq(fileUploads.id, id)).returning();
    return fileUpload;
  }
  // Pattern operations
  async createPattern(pattern) {
    const [patternRecord] = await db.insert(patterns).values(pattern).returning();
    return patternRecord;
  }
  async getPatterns(userId, type) {
    const whereConditions = type ? and(eq(patterns.userId, userId), eq(patterns.type, type)) : eq(patterns.userId, userId);
    return await db.select().from(patterns).where(whereConditions).orderBy(desc(patterns.createdAt));
  }
  // Shared access operations
  async createSharedAccess(access) {
    const [sharedAccessRecord] = await db.insert(sharedAccess).values(access).returning();
    return sharedAccessRecord;
  }
  async getSharedAccess(userId) {
    return await db.select().from(sharedAccess).where(and(eq(sharedAccess.userId, userId), isNull(sharedAccess.revokedAt))).orderBy(desc(sharedAccess.createdAt));
  }
  async revokeSharedAccess(id) {
    await db.update(sharedAccess).set({ revokedAt: /* @__PURE__ */ new Date() }).where(eq(sharedAccess.id, id));
  }
};
var storage = new DatabaseStorage();

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});
async function analyzeStoolPhoto(base64Image) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant specializing in stool analysis. Analyze the provided stool photo and classify it according to the Bristol Stool Scale (1-7), identify the color, provide a confidence score (0-1), and give a brief educational summary. This is for educational purposes only, not medical diagnosis. Respond with JSON in this format: { 'bristol': number, 'color': string, 'confidence': number, 'summary': string }"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this stool photo according to the Bristol Stool Scale. Provide the Bristol type (1-7), color description, confidence level, and educational summary."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 500
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      bristol: Math.max(1, Math.min(7, Math.round(result.bristol || 4))),
      color: result.color || "brown",
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      summary: result.summary || "Analysis completed. This is for educational purposes only and not medical advice."
    };
  } catch (error) {
    console.error("Error analyzing stool photo:", error);
    throw new Error("Failed to analyze stool photo: " + error.message);
  }
}
async function analyzeMealPhoto(base64Image) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a nutrition AI assistant specializing in food recognition and macro calculation. Analyze the provided meal photo and identify foods, estimate portions, calculate calories and macronutrients. Respond with JSON in this format: { 'foods': [{'name': string, 'quantity': number, 'unit': string, 'calories': number, 'macros': {'protein': number, 'carbs': number, 'fat': number, 'fiber': number}, 'confidence': number}], 'totalCalories': number, 'summary': string }"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this meal photo and identify all visible foods, estimate portion sizes, and calculate calories and macronutrients (protein, carbs, fat, fiber) for each item."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1e3
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    const foods = Array.isArray(result.foods) ? result.foods : [];
    const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0);
    return {
      foods: foods.map((food) => ({
        name: food.name || "Unknown food",
        quantity: food.quantity || 1,
        unit: food.unit || "serving",
        calories: food.calories || 0,
        macros: {
          protein: food.macros?.protein || 0,
          carbs: food.macros?.carbs || 0,
          fat: food.macros?.fat || 0,
          fiber: food.macros?.fiber || 0
        },
        confidence: Math.max(0, Math.min(1, food.confidence || 0.5))
      })),
      totalCalories,
      summary: result.summary || "Meal analysis completed. Nutritional values are estimates."
    };
  } catch (error) {
    console.error("Error analyzing meal photo:", error);
    throw new Error("Failed to analyze meal photo: " + error.message);
  }
}

// server/routes.ts
import { z } from "zod";
var stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_for_development";
var stripe = new Stripe(stripeKey, {
  apiVersion: "2024-06-20"
});
var upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/health-logs", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit) : 50;
      const logs = await storage.getHealthLogs(userId, limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching health logs:", error);
      res.status(500).json({ message: "Failed to fetch health logs" });
    }
  });
  app2.post("/api/health-logs", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const logData = insertHealthLogSchema.parse({
        ...req.body,
        userId
      });
      const log2 = await storage.createHealthLog(logData);
      res.json(log2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid log data", errors: error.errors });
      } else {
        console.error("Error creating health log:", error);
        res.status(500).json({ message: "Failed to create health log" });
      }
    }
  });
  app2.post("/api/upload", isAuthenticated, upload.array("files", 10), async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const uploadedFiles = [];
      for (const file of files) {
        const fileType = file.mimetype.includes("json") ? "json" : file.mimetype.includes("csv") ? "csv" : "image";
        const fileUpload = await storage.createFileUpload({
          userId,
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          type: fileType
        });
        if (fileType === "json" || fileType === "csv") {
          processDataImport(file.path, fileUpload.id, userId);
        } else if (fileType === "image") {
          processImageAnalysis(file.path, fileUpload.id, userId);
        }
        uploadedFiles.push(fileUpload);
      }
      res.json({ uploads: uploadedFiles });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ message: "Failed to upload files" });
    }
  });
  app2.get("/api/uploads", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const uploads = await storage.getFileUploads(userId);
      res.json(uploads);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      res.status(500).json({ message: "Failed to fetch uploads" });
    }
  });
  app2.get("/api/patterns", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const type = req.query.type;
      const patterns2 = await storage.getPatterns(userId, type);
      res.json(patterns2);
    } catch (error) {
      console.error("Error fetching patterns:", error);
      res.status(500).json({ message: "Failed to fetch patterns" });
    }
  });
  app2.post("/api/analyze-patterns", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const { startDate, endDate } = req.body;
      const logs = await storage.getHealthLogsByDateRange(
        userId,
        new Date(startDate),
        new Date(endDate)
      );
      const patterns2 = await generatePatternAnalysis(logs, userId);
      res.json(patterns2);
    } catch (error) {
      console.error("Error analyzing patterns:", error);
      res.status(500).json({ message: "Failed to analyze patterns" });
    }
  });
  app2.post("/api/ai/stool-analysis", isAuthenticated, upload.single("photo"), async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (user?.subscriptionPlan === "free") {
        return res.status(403).json({ message: "Pro subscription required for AI photo analysis" });
      }
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }
      const imageBuffer = await fs.readFile(file.path);
      const base64Image = imageBuffer.toString("base64");
      const analysis = await analyzeStoolPhoto(base64Image);
      await fs.unlink(file.path);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing stool photo:", error);
      res.status(500).json({ message: "Failed to analyze stool photo" });
    }
  });
  app2.post("/api/ai/meal-analysis", isAuthenticated, upload.single("photo"), async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user?.mealAiAddon) {
        return res.status(403).json({ message: "CalcuPlate add-on required for meal photo analysis" });
      }
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }
      const imageBuffer = await fs.readFile(file.path);
      const base64Image = imageBuffer.toString("base64");
      const analysis = await analyzeMealPhoto(base64Image);
      await fs.unlink(file.path);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing meal photo:", error);
      res.status(500).json({ message: "Failed to analyze meal photo" });
    }
  });
  app2.post("/api/create-subscription", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      const { plan } = req.body;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.stripeSubscriptionId) {
        const subscription2 = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        if (subscription2.status === "active") {
          const invoice2 = await stripe.invoices.retrieve(subscription2.latest_invoice, {
            expand: ["payment_intent"]
          });
          return res.json({
            subscriptionId: subscription2.id,
            clientSecret: invoice2.payment_intent?.client_secret
          });
        }
      }
      if (!user.email) {
        return res.status(400).json({ message: "No user email on file" });
      }
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId }
        });
        customerId = customer.id;
        await storage.updateUserSubscription(userId, { stripeCustomerId: customerId });
      }
      const priceIds = {
        pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || "price_pro_monthly",
        pro_yearly: process.env.STRIPE_PRICE_PRO_YEARLY || "price_pro_yearly",
        meal_ai_addon: process.env.STRIPE_PRICE_MEAL_AI || "price_meal_ai"
      };
      const priceId = priceIds[plan];
      if (!priceId) {
        return res.status(400).json({ message: "Invalid subscription plan" });
      }
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"]
      });
      await storage.updateUserSubscription(userId, {
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        subscriptionPlan: plan,
        mealAiAddon: plan === "meal_ai_addon" || Boolean(user.mealAiAddon)
      });
      const invoice = subscription.latest_invoice;
      res.json({
        subscriptionId: subscription.id,
        clientSecret: invoice.payment_intent.client_secret
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Error creating subscription: " + error.message });
    }
  });
  app2.post("/api/export-data", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const { format, startDate, endDate } = req.body;
      const logs = startDate && endDate ? await storage.getHealthLogsByDateRange(userId, new Date(startDate), new Date(endDate)) : await storage.getHealthLogs(userId, 1e3);
      if (format === "csv") {
        const csvData = convertToCSV(logs);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", 'attachment; filename="quietgo-data.csv"');
        res.send(csvData);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", 'attachment; filename="quietgo-data.json"');
        res.json({ logs });
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      res.status(500).json({ message: "Failed to export data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
async function processDataImport(filePath, uploadId, userId) {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    let data;
    if (filePath.endsWith(".json")) {
      data = JSON.parse(fileContent);
    } else {
      data = parseCSV(fileContent);
    }
    let importCount = 0;
    for (const item of data) {
      try {
        const logData = mapToHealthLog(item, userId);
        await storage.createHealthLog(logData);
        importCount++;
      } catch (error) {
        console.error("Error importing log item:", error);
      }
    }
    await storage.updateFileUploadProcessed(uploadId, {
      importCount,
      totalItems: data.length
    });
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error processing data import:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    await storage.updateFileUploadProcessed(uploadId, { error: errorMessage });
  }
}
async function processImageAnalysis(filePath, uploadId, userId) {
  try {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString("base64");
    const analysis = await analyzeStoolPhoto(base64Image);
    await storage.updateFileUploadProcessed(uploadId, { analysis });
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error processing image analysis:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    await storage.updateFileUploadProcessed(uploadId, { error: errorMessage });
  }
}
function mapToHealthLog(item, userId) {
  return {
    userId,
    type: item.type || "stool",
    timestamp: new Date(item.timestamp || item.date || Date.now()),
    bristolScale: item.bristol || item.bristolScale,
    stoolColor: item.color || item.stoolColor,
    effort: item.effort || false,
    pain: item.pain || false,
    foods: item.foods,
    totalCalories: item.calories || item.totalCalories,
    tags: Array.isArray(item.tags) ? item.tags : [],
    notes: item.notes || ""
  };
}
function parseCSV(content) {
  const lines = content.split("\n");
  const headers = lines[0].split(",");
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(",");
      const row = {};
      headers.forEach((header, index2) => {
        row[header.trim()] = values[index2]?.trim();
      });
      data.push(row);
    }
  }
  return data;
}
function convertToCSV(logs) {
  if (logs.length === 0) return "";
  const headers = ["timestamp", "type", "bristolScale", "stoolColor", "effort", "pain", "totalCalories", "tags", "notes"];
  const csvRows = [headers.join(",")];
  logs.forEach((log2) => {
    const row = headers.map((header) => {
      const value = log2[header];
      if (Array.isArray(value)) {
        return `"${value.join(";")}"`;
      }
      return value || "";
    });
    csvRows.push(row.join(","));
  });
  return csvRows.join("\n");
}
async function generatePatternAnalysis(logs, userId) {
  const stoolLogs = logs.filter((log2) => log2.type === "stool");
  const mealLogs = logs.filter((log2) => log2.type === "meal");
  const stoolTimes = stoolLogs.map((log2) => new Date(log2.timestamp).getHours());
  const avgTime = stoolTimes.reduce((sum, time) => sum + time, 0) / stoolTimes.length;
  const daysWithLogs = new Set(stoolLogs.map(
    (log2) => new Date(log2.timestamp).toDateString()
  )).size;
  const patterns2 = {
    regularityWindow: {
      start: Math.max(0, Math.floor(avgTime - 1.5)),
      end: Math.min(23, Math.ceil(avgTime + 1.5)),
      confidence: stoolLogs.length >= 7 ? 0.8 : 0.5
    },
    frequency: {
      averagePerDay: stoolLogs.length / Math.max(daysWithLogs, 1),
      totalLogs: stoolLogs.length,
      daysTracked: daysWithLogs
    },
    bristolDistribution: calculateBristolDistribution(stoolLogs)
  };
  return patterns2;
}
function calculateBristolDistribution(stoolLogs) {
  const distribution = {};
  stoolLogs.forEach((log2) => {
    if (log2.bristolScale) {
      distribution[log2.bristolScale] = (distribution[log2.bristolScale] || 0) + 1;
    }
  });
  return distribution;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
