import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Camera, 
  Utensils, 
  TrendingUp, 
  Shield, 
  Eye, 
  FileText, 
  Clock,
  ChartPie,
  CloudUpload,
  Download,
  Settings,
  Check,
  Apple,
  Play,
  Menu,
  X,
  Sprout
} from "lucide-react";

export default function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [isAnnual, setIsAnnual] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleGetStarted = () => {
    window.location.href = "/api/login";
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-background text-foreground font-sans antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" data-testid="logo">
                  <Sprout className="text-primary-foreground text-sm" />
                </div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-serif font-semibold">QuietGo</span>
                <span className="ml-2 text-sm text-muted-foreground">Plate to pattern</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-features"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-pricing"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('privacy')} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-privacy"
                >
                  Privacy
                </button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogin}
                  data-testid="button-signin"
                >
                  Sign In
                </Button>
                <Button onClick={handleGetStarted} data-testid="button-get-started">
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('privacy')} 
                  className="text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </button>
                <Button variant="ghost" className="justify-start" onClick={handleLogin}>
                  Sign In
                </Button>
                <Button className="justify-start" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                Snap it.<br />
                <span className="text-primary">Understand it.</span><br />
                Build a routine.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                AI-powered stool and meal tracking that reveals patterns in your health. 
                Discreet, private, and designed for real insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* iOS App Store mockup button */}
                <Card className="flex items-center p-4 hover:shadow-lg transition-all cursor-pointer" data-testid="button-app-store">
                  <Apple className="text-2xl mr-3" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Card>
                {/* Google Play Store mockup button */}
                <Card className="flex items-center p-4 hover:shadow-lg transition-all cursor-pointer" data-testid="button-play-store">
                  <Play className="text-2xl mr-3 text-primary fill-current" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Card>
              </div>
              <div className="text-sm text-muted-foreground">
                ✨ Free to try • 🔒 Privacy-first • 📊 AI-powered insights
              </div>
            </div>
            <div className="relative">
              {/* Mockup phone showing app interface */}
              <div className="app-preview-shadow rounded-2xl mx-auto max-w-sm bg-gradient-to-br from-background to-card p-8 border border-border">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <Sprout className="text-primary-foreground text-2xl" />
                  </div>
                  <h3 className="font-semibold text-lg">QuietGo Mobile</h3>
                  <p className="text-sm text-muted-foreground">Professional health tracking interface</p>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Designed for discretion and insight</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI meets thoughtful privacy to help you understand your body's patterns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Stool Analysis */}
            <Card className="p-6 hover:shadow-lg transition-all" data-testid="card-stool-analysis">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Camera className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Stool Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Snap a photo for instant Bristol scale classification, color analysis, and plain-English health context.
              </p>
              <Badge variant="outline" className="text-primary border-primary">
                Educational insights, not diagnosis
              </Badge>
            </Card>

            {/* Meal Photo AI */}
            <Card className="p-6 hover:shadow-lg transition-all" data-testid="card-meal-ai">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Utensils className="text-accent text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meal Photo AI</h3>
              <p className="text-muted-foreground mb-4">
                Automatically detect foods, estimate portions, and calculate calories and macros with one-tap edits.
              </p>
              <Badge variant="outline" className="text-accent border-accent">
                $9.99/mo add-on service
              </Badge>
            </Card>

            {/* Pattern Recognition */}
            <Card className="p-6 hover:shadow-lg transition-all" data-testid="card-patterns">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pattern Recognition</h3>
              <p className="text-muted-foreground mb-4">
                Discover correlations between food, sleep, exercise, and digestive health over time.
              </p>
              <Badge variant="outline" className="text-primary border-primary">
                Regularity windows • Weekly cycles
              </Badge>
            </Card>

            {/* Privacy First */}
            <Card className="p-6 hover:shadow-lg transition-all" data-testid="card-privacy">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-secondary-foreground text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-muted-foreground mb-4">
                Photos auto-delete after analysis by default. Your data stays private with end-to-end encryption.
              </p>
              <Badge variant="outline" className="text-secondary-foreground border-secondary">
                HIPAA-aware design
              </Badge>
            </Card>

            {/* View-Only Sharing */}
            <Card className="p-6 hover:shadow-lg transition-all" data-testid="card-sharing">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="text-accent text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Caregiver Sharing</h3>
              <p className="text-muted-foreground mb-4">
                Share trend data with doctors, trainers, or caregivers. View-only access, revokable anytime.
              </p>
              <Badge variant="outline" className="text-accent border-accent">
                No photos shared by default
              </Badge>
            </Card>

            {/* Professional Reports */}
            <Card className="p-6 hover:shadow-lg transition-all" data-testid="card-reports">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medical Reports</h3>
              <p className="text-muted-foreground mb-4">
                Generate weekly Rhythm PDFs and CSV exports ready for healthcare providers.
              </p>
              <Badge variant="outline" className="text-primary border-primary">
                Doctor-ready formats
              </Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground mb-12">Start free, upgrade when you're ready for deeper insights</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card className="p-6 relative" data-testid="card-plan-free">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-4">$0</div>
              <ul className="text-left space-y-3 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Manual logging
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Basic patterns
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  7-day history
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGetStarted}
                data-testid="button-start-free"
              >
                Start Free
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="p-6 border-2 border-primary relative" data-testid="card-plan-pro">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-1">$4.99<span className="text-base text-muted-foreground">/mo</span></div>
              <div className="text-sm text-muted-foreground mb-4">or $39.99/year (save 33%)</div>
              <ul className="text-left space-y-3 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  AI photo analysis
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Deep correlations
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  HealthKit sync
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  PDF/CSV exports
                </li>
                <li className="flex items-center">
                  <Check className="text-primary mr-2 w-4 h-4" />
                  Unlimited history
                </li>
              </ul>
              <Button 
                className="w-full"
                onClick={() => setSubscriptionModalOpen(true)}
                data-testid="button-upgrade-pro"
              >
                Upgrade to Pro
              </Button>
            </Card>

            {/* Meal AI Add-on */}
            <Card className="p-6 relative" data-testid="card-meal-ai-addon">
              <h3 className="text-xl font-semibold mb-2">Meal AI</h3>
              <div className="text-3xl font-bold mb-1">+$9.99<span className="text-base text-muted-foreground">/mo</span></div>
              <div className="text-sm text-muted-foreground mb-4">Requires Pro plan</div>
              <ul className="text-left space-y-3 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  Food photo recognition
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  Automatic macros
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  Portion estimation
                </li>
                <li className="flex items-center">
                  <Check className="text-accent mr-2 w-4 h-4" />
                  One-tap corrections
                </li>
              </ul>
              <Button 
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={() => setSubscriptionModalOpen(true)}
                data-testid="button-add-meal-ai"
              >
                Add Meal AI
              </Button>
            </Card>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            All plans include privacy protection and discreet design. Cancel anytime.
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section id="privacy" className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Your privacy, our priority</h2>
            <p className="text-lg text-muted-foreground">
              Built from the ground up with healthcare-grade privacy and security standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="text-primary mr-3" />
                Data Protection
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>Photos auto-delete after AI analysis by default</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>End-to-end encryption for all sensitive data</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>HIPAA-aware design and data handling</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>Export or delete your data anytime</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="text-primary mr-3" />
                Discreet Design
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>Subtle app icon that doesn't reveal purpose</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>Professional, medical-grade interface</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>No social features or public sharing</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mt-1 mr-2 text-sm w-4 h-4" />
                  <span>View-only sharing with healthcare providers</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Card className="mt-12 p-6 bg-background border border-border">
            <div className="flex items-center mb-3">
              <Download className="text-primary mr-3" />
              <h4 className="text-lg font-semibold">Data Export & Account Management</h4>
            </div>
            <p className="text-muted-foreground mb-4">
              Access all your health data in standard formats. Sync across devices or take it with you if you leave.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleLogin}
                data-testid="button-export-data"
              >
                <Download className="mr-2 w-4 h-4" />
                Export My Data
              </Button>
              <Button 
                variant="outline"
                onClick={handleLogin}
                data-testid="button-privacy-settings"
              >
                <Settings className="mr-2 w-4 h-4" />
                Privacy Settings
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Subscription Modal */}
      <Dialog open={subscriptionModalOpen} onOpenChange={setSubscriptionModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Upgrade to Pro</DialogTitle>
          </DialogHeader>
          
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-sm mr-3">Monthly</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnnual(!isAnnual)}
              className={isAnnual ? "bg-primary text-primary-foreground" : ""}
              data-testid="button-billing-toggle"
            >
              {isAnnual ? "Annual" : "Monthly"}
            </Button>
            <span className="text-sm ml-3">Annual</span>
            {isAnnual && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                Save 33%
              </Badge>
            )}
          </div>
          
          {/* Price Display */}
          <div className="text-center mb-6">
            {isAnnual ? (
              <div className="text-3xl font-bold">
                $39.99<span className="text-base text-muted-foreground">/year</span>
              </div>
            ) : (
              <div className="text-3xl font-bold">
                $4.99<span className="text-base text-muted-foreground">/month</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              Unlock AI photo analysis and advanced insights
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Payment Method</Label>
              <div className="p-3 border border-input rounded-lg bg-background mt-1">
                <div className="flex items-center">
                  <div className="w-6 h-4 bg-blue-600 rounded mr-3"></div>
                  <span className="text-muted-foreground">Secure payment via Stripe</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6"
            onClick={handleLogin}
            data-testid="button-subscribe-now"
          >
            Subscribe Now
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Cancel anytime. No commitments.
          </p>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Sprout className="text-primary-foreground text-sm" />
                </div>
                <span className="text-lg font-serif font-semibold">QuietGo</span>
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                Discreet health tracking with AI-powered insights. Plate to pattern.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-background transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-background transition-colors">Pricing</button></li>
                <li><a href="#" className="hover:text-background transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-background transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Privacy</h3>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Data Processing</a></li>
                <li><a href="#" className="hover:text-background transition-colors">HIPAA Notice</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Health Resources</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Healthcare Providers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-background/70">© 2024 QuietGo. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-background/70">Not medical advice</span>
              <span className="text-background/40">•</span>
              <span className="text-sm text-background/70">General wellness only</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
