import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuietGoBrand } from "@/components/QuietGoBrand";
import logoGraphic from "@assets/logo-graphic_1757613896603.png";
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  Download, 
  Trash2, 
  Share2,
  AlertTriangle,
  Check,
  Clock,
  Database,
  Key
} from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center">
                <img src={logoGraphic} alt="QuietGo Logo" className="w-8 h-8 mr-3" />
                <h1 className="text-xl font-serif font-semibold">Privacy Policy</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Your Privacy Matters</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <QuietGoBrand size="md" className="inline" /> is designed with privacy as the foundation. 
            Here's exactly what we collect, how we use it, and what control you have.
          </p>
        </div>

        {/* Quick Summary */}
        <Card className="mb-8 border-2 border-primary" data-testid="card-privacy-summary">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Shield className="w-6 h-6 text-primary mr-3" />
              Privacy Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-3">
                <Check className="text-primary mt-0.5 w-4 h-4 flex-shrink-0" />
                <div>
                  <strong>Photos auto-delete</strong>
                  <p className="text-muted-foreground">After AI analysis, images are automatically removed</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-primary mt-0.5 w-4 h-4 flex-shrink-0" />
                <div>
                  <strong>Minimal data collection</strong>
                  <p className="text-muted-foreground">Only structured logs, no raw photos stored</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-primary mt-0.5 w-4 h-4 flex-shrink-0" />
                <div>
                  <strong>Full control</strong>
                  <p className="text-muted-foreground">Export, share, or delete your data anytime</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data We Collect */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-6">Data We Collect</h2>
          <div className="space-y-6">
            <Card className="p-6" data-testid="card-account-data">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Key className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Account email address</li>
                    <li>• Basic subscription and privacy settings</li>
                    <li>• Authentication tokens (secure, encrypted)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6" data-testid="card-health-data">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Health Data</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Structured logs (timestamps, Bristol scale ratings, meal calories)</li>
                    <li>• Pattern analysis results (correlations, trends)</li>
                    <li>• <strong>No raw photos stored</strong> - images analyzed then deleted</li>
                    <li>• Manual entries and notes you add</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6" data-testid="card-usage-data">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Basic app usage patterns (login frequency, features used)</li>
                    <li>• Error logs for troubleshooting</li>
                    <li>• No location data or device identifiers</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Your Controls */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-6">Your Data Controls</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6" data-testid="card-sharing-controls">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Share2 className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Sharing Controls</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Generate view-only links for healthcare providers
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Set expiration dates for shared links
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Revoke access anytime
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  No photos shared by default
                </li>
              </ul>
            </Card>

            <Card className="p-6" data-testid="card-data-export">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <Download className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Data Export & Deletion</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  Export all data as PDF or CSV (Pro subscribers)
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  Request complete data deletion
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  Download data before canceling account
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Important Notices */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-6">Important Information</h2>
          <div className="space-y-6">
            <Card className="p-6 border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800" data-testid="card-medical-disclaimer">
              <div className="flex items-center mb-3">
                <AlertTriangle className="text-orange-600 mr-3 w-5 h-5" />
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Educational Use Only</h3>
              </div>
              <p className="text-orange-800 dark:text-orange-200 text-sm">
                <QuietGoBrand size="sm" className="inline" /> provides educational information about digestive patterns. 
                It is not medical advice and should not replace professional healthcare consultation. 
                Always consult your healthcare provider about health concerns.
              </p>
            </Card>

            <Card className="p-6" data-testid="card-data-retention">
              <div className="flex items-center mb-3">
                <Clock className="text-primary mr-3 w-5 h-5" />
                <h3 className="text-lg font-semibold">Data Retention</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Photos: Deleted immediately after AI analysis (default setting)</li>
                <li>• Health logs: Retained until account deletion</li>
                <li>• Account data: Deleted within 30 days of account closure</li>
                <li>• Backup copies: Removed within 90 days</li>
              </ul>
            </Card>

            <Card className="p-6" data-testid="card-security">
              <div className="flex items-center mb-3">
                <Shield className="text-primary mr-3 w-5 h-5" />
                <h3 className="text-lg font-semibold">Security & Encryption</h3>
              </div>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• End-to-end encryption for sensitive data</li>
                <li>• HIPAA-aware design and data handling practices</li>
                <li>• Regular security audits and updates</li>
                <li>• Secure cloud infrastructure with industry-standard protections</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Contact */}
        <Card className="p-6 bg-card">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Questions About Your Privacy?</h3>
            <p className="text-muted-foreground mb-4">
              Contact us anytime about your data, privacy settings, or to request data export/deletion.
            </p>
            <Button 
              onClick={() => window.location.href = 'mailto:Support@QuietGo.app?subject=Privacy Question'}
              data-testid="button-privacy-contact"
            >
              Contact Support
            </Button>
          </div>
        </Card>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Last updated: September 2025</p>
        </div>
      </main>
    </div>
  );
}