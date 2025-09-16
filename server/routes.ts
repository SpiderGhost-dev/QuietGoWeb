import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { analyzeStoolPhoto, analyzeMealPhoto } from "./openai.js";
import { insertHealthLogSchema, insertFileUploadSchema } from "@shared/schema";
import { z } from "zod";

// Multer setup for file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Import required modules
  const { Router } = await import('express');
  
  // Create separate routers for API and Admin
  const apiRouter = Router();
  const adminRouter = Router();
  
  // Setup auth middleware on main app (needed for passport config)
  await setupAuth(app);
  
  // But apply session middleware only to API router
  const { getSession } = await import("./replitAuth");
  apiRouter.use(getSession());

  // Auth routes (on API router)
  apiRouter.get('/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Health log routes (on API router)
  apiRouter.get("/health-logs", isAuthenticated, async (req: any, res) => {
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

  apiRouter.post("/health-logs", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const logData = insertHealthLogSchema.parse({
        ...req.body,
        userId,
      });
      const log = await storage.createHealthLog(logData);
      res.json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid log data", errors: error.errors });
      } else {
        console.error("Error creating health log:", error);
        res.status(500).json({ message: "Failed to create health log" });
      }
    }
  });

  // File upload routes (on API router)
  apiRouter.post("/upload", isAuthenticated, upload.array("files", 10), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const uploadedFiles = [];

      for (const file of files) {
        const fileType = file.mimetype.includes('json') ? 'json' : 
                        file.mimetype.includes('csv') ? 'csv' : 'image';

        const fileUpload = await storage.createFileUpload({
          userId,
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          type: fileType as any,
        });

        // Process file based on type
        if (fileType === 'json' || fileType === 'csv') {
          // Process data import in background
          processDataImport(file.path, fileUpload.id, userId);
        } else if (fileType === 'image') {
          // Process AI analysis in background
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

  apiRouter.get("/uploads", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const uploads = await storage.getFileUploads(userId);
      res.json(uploads);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      res.status(500).json({ message: "Failed to fetch uploads" });
    }
  });

  // Pattern analysis routes (on API router)
  apiRouter.get("/patterns", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const type = req.query.type as string;
      const patterns = await storage.getPatterns(userId, type);
      res.json(patterns);
    } catch (error) {
      console.error("Error fetching patterns:", error);
      res.status(500).json({ message: "Failed to fetch patterns" });
    }
  });

  apiRouter.post("/analyze-patterns", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { startDate, endDate } = req.body;
      
      const logs = await storage.getHealthLogsByDateRange(
        userId,
        new Date(startDate),
        new Date(endDate)
      );

      // Generate pattern analysis
      const patterns = await generatePatternAnalysis(logs, userId);
      
      res.json(patterns);
    } catch (error) {
      console.error("Error analyzing patterns:", error);
      res.status(500).json({ message: "Failed to analyze patterns" });
    }
  });

  // AI analysis routes (requires Pro subscription or CalcuPlate add-on)
  apiRouter.post("/ai/stool-analysis", isAuthenticated, upload.single("photo"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.subscriptionPlan === "free") {
        return res.status(403).json({ message: "Pro subscription required for AI photo analysis" });
      }

      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }

      const imageBuffer = await fs.readFile(file.path);
      const base64Image = imageBuffer.toString('base64');
      
      const analysis = await analyzeStoolPhoto(base64Image);
      
      // Clean up uploaded file
      await fs.unlink(file.path);
      
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing stool photo:", error);
      res.status(500).json({ message: "Failed to analyze stool photo" });
    }
  });

  apiRouter.post("/ai/meal-analysis", isAuthenticated, upload.single("photo"), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.mealAiAddon) {
        return res.status(403).json({ message: "CalcuPlate add-on required for meal photo analysis" });
      }

      const file = req.file as Express.Multer.File;
      if (!file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }

      const imageBuffer = await fs.readFile(file.path);
      const base64Image = imageBuffer.toString('base64');
      
      const analysis = await analyzeMealPhoto(base64Image);
      
      // Clean up uploaded file
      await fs.unlink(file.path);
      
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing meal photo:", error);
      res.status(500).json({ message: "Failed to analyze meal photo" });
    }
  });

  // Subscription info route (managed through mobile app stores)
  app.get('/api/subscription-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return subscription status (managed through app stores)
      res.json({
        subscriptionStatus: user.subscriptionStatus || 'free',
        subscriptionPlan: user.subscriptionPlan || 'free',
        mealAiAddon: user.mealAiAddon || false,
        message: 'Subscription managed through mobile app stores'
      });
    } catch (error: any) {
      console.error("Error fetching subscription status:", error);
      res.status(500).json({ message: 'Error fetching subscription status' });
    }
  });

  // Data export route
  apiRouter.post("/export-data", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { format, startDate, endDate } = req.body;

      const logs = startDate && endDate 
        ? await storage.getHealthLogsByDateRange(userId, new Date(startDate), new Date(endDate))
        : await storage.getHealthLogs(userId, 1000);

      if (format === 'csv') {
        const csvData = convertToCSV(logs);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="quietgo-data.csv"');
        res.send(csvData);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="quietgo-data.json"');
        res.json({ logs });
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      res.status(500).json({ message: "Failed to export data" });
    }
  });

  // Import admin authentication modules
  const { 
    getAdminSession, 
    isAdminAuthenticated, 
    authenticateAdmin, 
    createInitialAdmin 
  } = await import("./adminAuth");
  const { sql } = await import("drizzle-orm");
  const { db } = await import("./db");
  const { users, healthLogs, fileUploads } = await import("@shared/schema");
  const { desc, gte } = await import("drizzle-orm");
  
  // Rate limiting for admin endpoints
  const rateLimit = (await import("express-rate-limit")).default;
  const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: { message: "Too many login attempts, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Setup admin router with admin session middleware
  adminRouter.use(getAdminSession());
  
  // Admin authentication routes
  adminRouter.post('/api/login', adminLoginLimiter, async (req, res) => {
    try {
      const { username, password } = req.body;
      
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      const admin = await authenticateAdmin(username, password);
      
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      
      // Regenerate session to prevent fixation attacks (security)
      req.session.regenerate((err) => {
        if (err) {
          console.error('Session regeneration error:', err);
          return res.status(500).json({ message: "Login failed" });
        }
        
        // Set admin session
        (req.session as any).adminId = admin.id;
        (req.session as any).adminUsername = admin.username;
      
      
      // Save session
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error('Session save error:', saveErr);
          return res.status(500).json({ message: "Login failed" });
        }
        
          
          res.json({ 
            message: "Login successful",
            admin: {
              id: admin.id,
              username: admin.username,
              email: admin.email,
              firstName: admin.firstName,
              lastName: admin.lastName,
            }
          });
        });
      });
    } catch (error: any) {
      console.error("Admin login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  adminRouter.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  adminRouter.get('/api/me', isAdminAuthenticated, async (req: any, res) => {
    try {
      const adminId = req.session.adminId;
      const admin = await storage.getAdmin(adminId);
      
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      
      res.json({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        lastLoginAt: admin.lastLoginAt,
      });
    } catch (error: any) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ message: "Failed to fetch admin info" });
    }
  });

  // Admin management routes
  adminRouter.get('/api/users', isAdminAuthenticated, async (req, res) => {
    try {
      const allUsers = await db.select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        subscriptionStatus: users.subscriptionStatus,
        subscriptionPlan: users.subscriptionPlan,
        mealAiAddon: users.mealAiAddon,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      }).from(users).orderBy(desc(users.createdAt));
      
      res.json(allUsers);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  adminRouter.get('/api/admins', isAdminAuthenticated, async (req, res) => {
    try {
      const admins = await storage.getAllAdmins();
      // Don't return password hashes
      const safeAdmins = admins.map(admin => ({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        isActive: admin.isActive,
        lastLoginAt: admin.lastLoginAt,
        createdAt: admin.createdAt,
      }));
      
      res.json(safeAdmins);
    } catch (error: any) {
      console.error("Error fetching admins:", error);
      res.status(500).json({ message: "Failed to fetch admins" });
    }
  });

  // Analytics endpoints
  adminRouter.get('/api/stats', isAdminAuthenticated, async (req, res) => {
    try {
      const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
      const [logCount] = await db.select({ count: sql<number>`count(*)` }).from(healthLogs);
      const [uploadCount] = await db.select({ count: sql<number>`count(*)` }).from(fileUploads);
      
      // Recent user signups (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const [recentUsers] = await db.select({ count: sql<number>`count(*)` })
        .from(users)
        .where(gte(users.createdAt, thirtyDaysAgo));
      
      res.json({
        totalUsers: userCount.count,
        totalLogs: logCount.count,
        totalUploads: uploadCount.count,
        recentUsers: recentUsers.count,
      });
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Setup route for creating initial admin (one-time use)
  adminRouter.post('/api/setup', adminLoginLimiter, async (req, res) => {
    try {
      // Strict enforcement: Check if ANY admins exist (active or inactive)
      const adminCount = await storage.getAdminCount();
      if (adminCount > 0) {
        console.warn('Attempted unauthorized admin creation - setup already completed');
        return res.status(403).json({ message: "Admin setup already completed. Contact system administrator." });
      }
      
      const { username, email, firstName, lastName, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const admin = await createInitialAdmin(username, email, firstName, lastName, password);
      
      res.json({ 
        message: "Initial admin created successfully",
        adminId: admin.id 
      });
    } catch (error: any) {
      console.error("Error creating initial admin:", error);
      res.status(500).json({ message: "Failed to create admin" });
    }
  });

  // Mount routers on the main app
  app.use('/api', apiRouter);
  app.use('/admin', adminRouter);
  
  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions
async function processDataImport(filePath: string, uploadId: string, userId: string) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let data: any[];

    if (filePath.endsWith('.json')) {
      data = JSON.parse(fileContent);
    } else {
      // Parse CSV
      data = parseCSV(fileContent);
    }

    // Process and import health logs
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

    // Clean up file
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error processing data import:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    await storage.updateFileUploadProcessed(uploadId, { error: errorMessage });
  }
}

async function processImageAnalysis(filePath: string, uploadId: string, userId: string) {
  try {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString('base64');
    
    // Determine if it's a stool or meal photo (could use AI classification)
    // For now, assume stool analysis
    const analysis = await analyzeStoolPhoto(base64Image);
    
    await storage.updateFileUploadProcessed(uploadId, { analysis });

    // Clean up file
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error processing image analysis:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    await storage.updateFileUploadProcessed(uploadId, { error: errorMessage });
  }
}

function mapToHealthLog(item: any, userId: string): any {
  // Map imported data to health log format
  // This would need to handle different import formats
  return {
    userId,
    type: item.type || 'stool',
    timestamp: new Date(item.timestamp || item.date || Date.now()),
    bristolScale: item.bristol || item.bristolScale,
    stoolColor: item.color || item.stoolColor,
    effort: item.effort || false,
    pain: item.pain || false,
    foods: item.foods,
    totalCalories: item.calories || item.totalCalories,
    tags: Array.isArray(item.tags) ? item.tags : [],
    notes: item.notes || '',
  };
}

function parseCSV(content: string): any[] {
  const lines = content.split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const row: any = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim();
      });
      data.push(row);
    }
  }

  return data;
}

function convertToCSV(logs: any[]): string {
  if (logs.length === 0) return '';

  const headers = ['timestamp', 'type', 'bristolScale', 'stoolColor', 'effort', 'pain', 'totalCalories', 'tags', 'notes'];
  const csvRows = [headers.join(',')];

  logs.forEach(log => {
    const row = headers.map(header => {
      const value = log[header];
      if (Array.isArray(value)) {
        return `"${value.join(';')}"`;
      }
      return value || '';
    });
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

async function generatePatternAnalysis(logs: any[], userId: string): Promise<any> {
  // Simple pattern analysis - in a real app this would be more sophisticated
  const stoolLogs = logs.filter(log => log.type === 'stool');
  const mealLogs = logs.filter(log => log.type === 'meal');

  // Calculate regularity window
  const stoolTimes = stoolLogs.map(log => new Date(log.timestamp).getHours());
  const avgTime = stoolTimes.reduce((sum, time) => sum + time, 0) / stoolTimes.length;
  
  // Calculate frequency
  const daysWithLogs = new Set(stoolLogs.map(log => 
    new Date(log.timestamp).toDateString()
  )).size;

  const patterns = {
    regularityWindow: {
      start: Math.max(0, Math.floor(avgTime - 1.5)),
      end: Math.min(23, Math.ceil(avgTime + 1.5)),
      confidence: stoolLogs.length >= 7 ? 0.8 : 0.5,
    },
    frequency: {
      averagePerDay: stoolLogs.length / Math.max(daysWithLogs, 1),
      totalLogs: stoolLogs.length,
      daysTracked: daysWithLogs,
    },
    bristolDistribution: calculateBristolDistribution(stoolLogs),
  };

  return patterns;
}

function calculateBristolDistribution(stoolLogs: any[]): any {
  const distribution: any = {};
  stoolLogs.forEach(log => {
    if (log.bristolScale) {
      distribution[log.bristolScale] = (distribution[log.bristolScale] || 0) + 1;
    }
  });
  return distribution;
}
