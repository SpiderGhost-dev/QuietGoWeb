import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuietGoBrand } from "@/components/QuietGoBrand";
import logoGraphic from "@assets/logo-graphic_1757613896603.png";
import { 
  ArrowLeft, 
  FileText, 
  AlertTriangle, 
  CreditCard, 
  Shield, 
  Download,
  Mail,
  X,
  Check,
  Eye,
  Trash2,
  Share2,
  Clock,
  Database,
  Key
} from "lucide-react";

export default function Legal() {
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
                <h1 className="text-xl font-serif font-semibold">Terms & Privacy</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation within the page */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('terms')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-jump-terms"
          >
            <FileText className="w-4 h-4 mr-2" />
            Terms of Service
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-jump-privacy"
          >
            <Shield className="w-4 h-4 mr-2" />
            Privacy Policy
          </Button>
        </div>

        {/* TERMS OF SERVICE SECTION */}
        <section id="terms" className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These terms govern your use of <QuietGoBrand size="md" className="inline" />. 
              By using our service, you agree to these terms.
            </p>
          </div>

          {/* Educational Software Notice */}
          <Card className="mb-8 border-2 border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800" data-testid="card-educational-notice">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-orange-900 dark:text-orange-100">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                Educational Software - Not Medical Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 dark:text-orange-200">
                <QuietGoBrand size="sm" className="inline" /> is educational software designed to help you track and understand patterns in your digestive health. 
                It is <strong>not medical advice</strong> and should not replace professional healthcare consultation. 
                Always consult qualified healthcare providers about health concerns or before making medical decisions.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Our Service</h2>
            <Card className="p-6" data-testid="card-service-description">
              <p className="text-muted-foreground mb-4">
                <QuietGoBrand size="md" className="inline" /> provides:
              </p>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  AI-powered analysis of stool and meal photos for educational purposes
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Pattern recognition and correlation analysis of your health data
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Data export tools (PDF/CSV) for personal record-keeping
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Privacy-focused health tracking with automatic photo deletion
                </li>
              </ul>
            </Card>
          </div>

          {/* Subscriptions & Billing */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Subscriptions & Billing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6" data-testid="card-subscription-terms">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <CreditCard className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Subscription Plans</h3>
                </div>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Free plan: Manual logging with basic features</li>
                  <li>• Pro plan: AI analysis, advanced patterns, unlimited history</li>
                  <li>• Meal AI add-on: Photo-based food recognition</li>
                  <li>• All subscriptions managed through Apple App Store</li>
                </ul>
              </Card>

              <Card className="p-6" data-testid="card-billing-policy">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Billing Policy</h3>
                </div>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Billing handled by Apple App Store</li>
                  <li>• Refunds subject to App Store refund policies</li>
                  <li>• Cancel subscriptions through App Store settings</li>
                  <li>• No hidden fees or surprise charges</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Acceptable Use */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Acceptable Use</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6" data-testid="card-permitted-use">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
                    <Check className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">You May</h3>
                </div>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Use the service for personal health tracking</li>
                  <li>• Export your own data for personal use</li>
                  <li>• Share trend data with healthcare providers</li>
                  <li>• Upload photos of your own stool and meals</li>
                </ul>
              </Card>

              <Card className="p-6" data-testid="card-prohibited-use">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center mr-4">
                    <X className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">You May Not</h3>
                </div>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>• Upload unlawful, harmful, or inappropriate content</li>
                  <li>• Share or distribute others' health data</li>
                  <li>• Reverse engineer or attempt to hack the service</li>
                  <li>• Use the service for commercial purposes without permission</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Data Export Rights */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Your Data Rights</h2>
            <Card className="p-6" data-testid="card-data-rights">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Download className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Data Export & Portability</h3>
              </div>
              <div className="text-muted-foreground space-y-4 text-sm">
                <p>
                  <strong>Pro subscribers</strong> can export their data in PDF and CSV formats at any time. 
                  This includes all health logs, pattern analysis, and structured data (but not raw photos, which are deleted after analysis).
                </p>
                <p>
                  <strong>Free plan users</strong> can request data export by contacting support. 
                  We will provide your data in a standard format within 30 days.
                </p>
                <p>
                  You own your health data and can take it with you if you choose to leave <QuietGoBrand size="sm" className="inline" />.
                </p>
              </div>
            </Card>
          </div>

          {/* Service Availability */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Service Terms</h2>
            <Card className="p-6" data-testid="card-service-terms">
              <div className="space-y-4 text-muted-foreground text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">"As Is" Service</h4>
                  <p>
                    <QuietGoBrand size="sm" className="inline" /> is provided "as is" without warranties of any kind. 
                    While we strive for accuracy in our AI analysis, results are for educational purposes only and may contain errors.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Service Availability</h4>
                  <p>
                    We aim for 99.9% uptime but cannot guarantee uninterrupted service. 
                    Maintenance windows and occasional outages may occur.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Changes to Terms</h4>
                  <p>
                    We may update these terms occasionally. Significant changes will be communicated through the app or via email. 
                    Continued use after changes indicates acceptance of new terms.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* PRIVACY POLICY SECTION */}
        <section id="privacy" className="mb-16">
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
        </section>

        {/* Contact Information */}
        <Card className="mb-8 p-6 bg-card" data-testid="card-contact-info">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="text-primary mr-3 w-6 h-6" />
              <h3 className="text-lg font-semibold">Questions About These Terms or Privacy?</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Contact us if you have questions about these terms, privacy policies, need clarification, or want to report an issue.
            </p>
            <div className="space-y-3">
              <div className="text-lg font-mono">Support@QuietGo.app</div>
              <Button 
                onClick={() => window.location.href = 'mailto:Support@QuietGo.app?subject=Legal or Privacy Question'}
                data-testid="button-legal-contact"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Last updated: September 2025</p>
          <p>These terms are governed by the laws of the United States.</p>
        </div>
      </main>
    </div>
  );
}