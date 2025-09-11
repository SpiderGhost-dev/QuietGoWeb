# QuietGo - Health Tracking Application

## Overview

QuietGo is a discreet health tracking application focused on stool and meal logging with AI-powered analysis capabilities. The application provides pattern analysis and correlations while maintaining user privacy. It features camera-based AI classification for both stool (Bristol Scale) and meal analysis, subscription-based premium features, and comprehensive data visualization for health insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring cream/sage color palette
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: OpenID Connect (OIDC) via Replit Auth with session-based storage
- **File Handling**: Multer for multipart file uploads
- **API Design**: RESTful endpoints with consistent error handling middleware

### Database Design
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle migrations with type-safe schema definitions
- **Key Tables**: 
  - Users (with Stripe integration fields)
  - Health logs (stool/meal entries with Bristol scale enum)
  - File uploads (for image processing)
  - Patterns (AI-generated insights)
  - Sessions (mandatory for Replit Auth)

### AI Integration
- **Provider**: OpenAI GPT-5 for image analysis
- **Stool Analysis**: Bristol Scale classification (1-7), color identification, confidence scoring
- **Meal Analysis**: Food detection, portion estimation, calorie/macro calculation
- **Image Processing**: Base64 encoding with automatic deletion after analysis

### Authentication & Authorization
- **Method**: Replit's OpenID Connect implementation
- **Session Storage**: PostgreSQL-backed sessions with connect-pg-simple
- **User Management**: Automatic user creation/updates via OIDC claims
- **Protected Routes**: Middleware-based authentication checks

### Subscription System
- **Payment Processor**: Stripe with webhook support
- **Plans**: Free tier, Pro monthly/yearly, optional Meal AI addon
- **Features**: Tiered access to AI analysis and advanced pattern recognition

### File Upload & Storage
- **Upload Handling**: Multer with 10MB file size limits
- **Supported Formats**: JSON, CSV for data import; PNG, JPG, JPEG for images
- **Processing Pipeline**: Automatic AI analysis with metadata storage
- **Privacy**: Auto-deletion of original images after processing

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit OpenID Connect service
- **Deployment**: Replit hosting environment with development tooling

### Third-Party Services
- **AI Services**: OpenAI API for image analysis and health insights
- **Payment Processing**: Stripe for subscription management and payments
- **Email**: Configured for OTP verification (provider configurable)

### Development Tools
- **Build System**: Vite with TypeScript compilation and hot reload
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **UI Development**: Storybook-ready component architecture via Shadcn/ui

### Runtime Dependencies
- **Session Management**: PostgreSQL session store for scalable authentication
- **File Processing**: Sharp/Canvas for image manipulation (implied by AI analysis)
- **Validation**: Zod for runtime type validation and schema enforcement
- **HTTP Client**: Fetch API with credential management for secure API calls