import bcrypt from "bcrypt";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import type { Admin } from "@shared/schema";

// Admin session configuration
export function getAdminSession() {
  const sessionTtl = 24 * 60 * 60 * 1000; // 24 hours for admin sessions
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  return session({
    name: "admin_session", // Different session name for admins
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'lax', // Allow navigation to work properly
      maxAge: sessionTtl,
      // Remove path restriction to ensure cookie works properly
    },
  });
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Admin authentication middleware
export const isAdminAuthenticated: RequestHandler = (req: any, res, next) => {
  console.log(`Admin auth check for ${req.path}:`, {
    hasSession: !!req.session,
    sessionId: req.session?.id,
    adminId: req.session?.adminId,
    cookies: req.headers.cookie
  });
  
  if (req.session?.adminId) {
    console.log(`Admin authenticated for ${req.path}`);
    return next();
  }
  
  console.log(`Admin NOT authenticated for ${req.path}`);
  
  // For API requests, return JSON error
  if (req.path.startsWith("/admin/api")) {
    return res.status(401).json({ message: "Admin authentication required" });
  }
  
  // For page requests, redirect to admin login
  res.redirect("/admin/login.html");
};

// Admin login function
export async function authenticateAdmin(username: string, password: string): Promise<Admin | null> {
  try {
    const admin = await storage.getAdminByUsername(username);
    
    if (!admin || !admin.isActive) {
      return null;
    }
    
    const isValidPassword = await verifyPassword(password, admin.passwordHash);
    
    if (!isValidPassword) {
      return null;
    }
    
    // Update last login
    await storage.updateAdminLogin(admin.id);
    
    return admin;
  } catch (error) {
    console.error("Admin authentication error:", error);
    return null;
  }
}

// Create first admin account (for setup)
export async function createInitialAdmin(
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<Admin> {
  const passwordHash = await hashPassword(password);
  
  const admin = await storage.createAdmin({
    username,
    email,
    firstName,
    lastName,
    passwordHash,
    isActive: true,
  });
  
  return admin;
}

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminUsername?: string;
  }
}