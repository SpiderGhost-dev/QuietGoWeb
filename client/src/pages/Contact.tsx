import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QuietGoBrand } from "@/components/QuietGoBrand";
import logoGraphic from "@assets/logo-graphic_1757613896603.png";
import { 
  ArrowLeft, 
  Mail, 
  MessageCircle, 
  Shield, 
  HelpCircle,
  FileText
} from "lucide-react";

export default function Contact() {
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
                <h1 className="text-xl font-serif font-semibold">Contact <QuietGoBrand size="md" className="inline" /></h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about <QuietGoBrand size="md" className="inline" />? Need help with your account? 
            We're here to help with privacy-focused support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Primary Support */}
          <Card className="p-6" data-testid="card-email-support">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-xl">
                <Mail className="w-6 h-6 text-primary mr-3" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <p className="text-muted-foreground mb-4">
                For all support inquiries, account questions, and technical issues:
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-lg font-mono text-center" data-testid="text-support-email">
                  Support@QuietGo.app
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours during business days.
              </p>
              <Button 
                className="w-full mt-4" 
                onClick={() => window.location.href = 'mailto:Support@QuietGo.app'}
                data-testid="button-email-support"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          {/* Quick Help */}
          <Card className="p-6" data-testid="card-quick-help">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center text-xl">
                <HelpCircle className="w-6 h-6 text-accent mr-3" />
                Quick Help
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Account Issues</h4>
                  <p className="text-sm text-muted-foreground">Login problems, subscription questions, data export</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Privacy Questions</h4>
                  <p className="text-sm text-muted-foreground">Data handling, photo deletion, sharing controls</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Technical Support</h4>
                  <p className="text-sm text-muted-foreground">App sync issues, mobile app problems, web dashboard</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Feature Requests</h4>
                  <p className="text-sm text-muted-foreground">Suggestions for new features or improvements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="mb-12" data-testid="card-contact-form">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-6 h-6 text-primary mr-3" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    className="mt-1"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="mt-1"
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="What's this about?" 
                  className="mt-1"
                  data-testid="input-subject"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help..."
                  className="mt-1 min-h-[120px]"
                  data-testid="textarea-message"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  type="button" 
                  className="flex-1"
                  onClick={() => window.location.href = 'mailto:Support@QuietGo.app'}
                  data-testid="button-send-message"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send via Email
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    const subject = (document.getElementById('subject') as HTMLInputElement)?.value || 'QuietGo Support';
                    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || '';
                    const name = (document.getElementById('name') as HTMLInputElement)?.value || '';
                    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                    
                    const body = `${message}\n\n---\nFrom: ${name} (${email})`;
                    window.location.href = `mailto:Support@QuietGo.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  data-testid="button-prefill-email"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Pre-fill Email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="p-6 bg-card border border-border">
          <div className="flex items-center mb-3">
            <Shield className="text-primary mr-3 w-5 h-5" />
            <h3 className="text-lg font-semibold">Privacy Notice</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            When you contact us, we only use your information to respond to your inquiry. We don't share your contact 
            information with third parties and don't use it for marketing purposes. Your support conversations are treated 
            with the same privacy standards as your health data.
          </p>
        </Card>
      </main>
    </div>
  );
}