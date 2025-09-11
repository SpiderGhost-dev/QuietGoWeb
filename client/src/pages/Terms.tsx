import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Check
} from "lucide-react";

export default function Terms() {
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
                <h1 className="text-xl font-serif font-semibold">Terms of Service</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Contact Information */}
        <Card className="mb-8 p-6 bg-card" data-testid="card-contact-info">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="text-primary mr-3 w-6 h-6" />
              <h3 className="text-lg font-semibold">Questions About These Terms?</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Contact us if you have questions about these terms, need clarification, or want to report an issue.
            </p>
            <div className="space-y-3">
              <div className="text-lg font-mono">Support@QuietGo.app</div>
              <Button 
                onClick={() => window.location.href = 'mailto:Support@QuietGo.app?subject=Terms of Service Question'}
                data-testid="button-terms-contact"
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