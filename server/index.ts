import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { getAdminSession } from "./adminAuth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Protect admin HTML pages before serving static files
  app.use('/admin', getAdminSession(), (req: any, res, next) => {
    // Allow admin API routes to be handled by adminRouter
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    // For admin HTML pages, check authentication
    if (req.session?.adminId) {
      return next();
    }
    
    // Not authenticated, redirect to admin login
    if (req.path === '/dashboard.html' || req.path === '/' || req.path === '') {
      return res.redirect('/admin/login.html');
    }
    
    // Allow login.html to be served without authentication
    if (req.path === '/login.html') {
      return next();
    }
    
    // For any other admin routes, redirect to login
    res.redirect('/admin/login.html');
  });

  // Serve static files from public directory
  app.use(express.static(path.resolve(process.cwd(), "public")));

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // In production, fall back to serving static HTML files for non-API routes
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      
      // Check if it's a specific HTML file request
      if (req.path === '/hub' || req.path === '/hub.html') {
        res.sendFile(path.resolve(process.cwd(), 'public', 'hub.html'));
      } else if (req.path === '/privacy' || req.path === '/privacy.html') {
        res.sendFile(path.resolve(process.cwd(), 'public', 'privacy.html'));
      } else {
        // Default to index.html for all other routes
        res.sendFile(path.resolve(process.cwd(), 'public', 'index.html'));
      }
    });
    
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
