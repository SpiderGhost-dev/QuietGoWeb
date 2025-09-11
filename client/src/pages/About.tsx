import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuietGoBrand } from "@/components/QuietGoBrand";
import logoGraphic from "@assets/logo-graphic_1757613896603.png";
import { 
  ArrowLeft, 
  Shield, 
  TrendingUp, 
  Download, 
  Smartphone, 
  BarChart3,
  Eye,
  MessageCircle,
  Sprout
} from "lucide-react";

export default function About() {
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
                <h1 className="text-xl font-serif font-semibold">About <QuietGoBrand size="md" className="inline" /></h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
            Understanding Your Digestive Health<br />
            <span className="text-primary">The Private Way</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe digestive health insights should be private, actionable, and designed for real life. 
            No social features, no judgment—just patterns that help you understand your body better.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6" data-testid="card-mobile-capture">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Smartphone className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Mobile Capture</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Use our iOS app to discreetly log stool and meal photos. AI analyzes images instantly using the Bristol scale and nutritional recognition.
              </p>
              <Badge variant="outline" className="text-primary border-primary">
                Photos auto-delete after analysis
              </Badge>
            </Card>

            <Card className="p-6" data-testid="card-web-insights">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Web Dashboard</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                View your patterns on this web dashboard. Sync data seamlessly across devices and discover correlations in plain English.
              </p>
              <Badge variant="outline" className="text-accent border-accent">
                Pattern recognition included
              </Badge>
            </Card>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Our Principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center" data-testid="card-privacy-default">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Privacy by Default</h3>
              <p className="text-muted-foreground text-sm">
                Images analyzed then auto-deleted. No social features. Your health data stays private and under your control.
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-patterns-noise">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Patterns Over Noise</h3>
              <p className="text-muted-foreground text-sm">
                AI finds meaningful correlations between food, exercise, sleep, and digestive health. Insights in plain English, not medical jargon.
              </p>
            </Card>

            <Card className="p-6 text-center" data-testid="card-your-choice">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Your Data, Your Choice</h3>
              <p className="text-muted-foreground text-sm">
                Export as PDF/CSV anytime. Share with healthcare providers using view-only links. Delete your account whenever you want.
              </p>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">What Makes Us Different</h2>
          <div className="space-y-6">
            <Card className="p-6" data-testid="card-discreet-design">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Discreet Design</h3>
                  <p className="text-muted-foreground">
                    Subtle app icon that doesn't reveal its purpose. Professional, medical-grade interface designed for privacy. 
                    No embarrassing notifications or social features.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6" data-testid="card-ai-powered">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sprout className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-muted-foreground">
                    Advanced computer vision for Bristol scale classification and meal recognition. 
                    Pattern detection algorithms find correlations human eyes might miss.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6" data-testid="card-healthcare-ready">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Healthcare Ready</h3>
                  <p className="text-muted-foreground">
                    Generate professional PDF reports for doctors. Share trend data (not photos) with healthcare providers. 
                    HIPAA-aware design and data handling.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-card p-8 rounded-lg">
          <h2 className="text-2xl font-serif font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Digestive health affects everything—energy, mood, sleep, and overall well-being. Yet it remains one of the most 
            private and least discussed aspects of health. <QuietGoBrand size="md" className="inline" /> bridges the gap between 
            discretion and insight, giving you the tools to understand your body without compromising your privacy.
          </p>
        </div>
      </main>
    </div>
  );
}