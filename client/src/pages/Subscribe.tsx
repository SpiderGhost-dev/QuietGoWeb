import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  Sprout, 
  Camera, 
  TrendingUp, 
  FileText, 
  Utensils,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscribeForm = ({ plan, onSuccess }: { plan: string; onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/?subscribed=true`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Welcome to QuietGo Pro!",
      });
      onSuccess();
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="form-subscribe">
      <PaymentElement className="mb-6" />
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || isSubmitting}
        data-testid="button-confirm-payment"
      >
        {isSubmitting ? "Processing..." : "Subscribe Now"}
      </Button>
    </form>
  );
};

export default function Subscribe() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("pro_monthly");
  const [clientSecret, setClientSecret] = useState("");
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const createSubscription = async (plan: string) => {
    setIsCreatingSubscription(true);
    try {
      const response = await apiRequest("POST", "/api/create-subscription", { plan });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error: any) {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Subscription Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingSubscription(false);
    }
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setClientSecret("");
    createSubscription(plan);
  };

  const onSubscriptionSuccess = () => {
    // Refresh user data and redirect to dashboard
    window.location.href = "/dashboard?subscribed=true";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // If user already has a pro subscription
  if (user?.subscriptionPlan !== 'free') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="mr-4" data-testid="button-back">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-serif font-semibold">Subscription</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center p-8" data-testid="card-already-subscribed">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">You're already subscribed!</h2>
            <p className="text-muted-foreground mb-6">
              You have access to all Pro features. 
              {user.mealAiAddon && " You also have the Meal AI add-on enabled."}
            </p>
            <Link href="/dashboard">
              <Button data-testid="button-go-dashboard">
                Go to Dashboard
              </Button>
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  const planDetails = {
    pro_monthly: {
      name: "Pro Monthly",
      price: "$4.99",
      period: "/month",
      description: "Perfect for trying out Pro features",
    },
    pro_yearly: {
      name: "Pro Yearly",
      price: "$39.99",
      period: "/year",
      description: "Best value - save 33%",
      badge: "Save 33%",
    },
    meal_ai_addon: {
      name: "Meal AI Add-on",
      price: "+$9.99",
      period: "/month",
      description: "Requires Pro subscription",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Sprout className="text-primary-foreground text-sm" />
                </div>
                <h1 className="text-xl font-serif font-semibold">Upgrade to Pro</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold mb-4">Unlock AI-powered insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get advanced features to better understand your health patterns and correlations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
            
            <Tabs value={selectedPlan} onValueChange={handlePlanSelect} data-testid="tabs-plan-selection">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pro_monthly" data-testid="tab-pro-monthly">Monthly</TabsTrigger>
                <TabsTrigger value="pro_yearly" data-testid="tab-pro-yearly">
                  Yearly
                  <Badge variant="secondary" className="ml-2">33% off</Badge>
                </TabsTrigger>
                <TabsTrigger value="meal_ai_addon" data-testid="tab-meal-ai">Meal AI</TabsTrigger>
              </TabsList>

              {Object.entries(planDetails).map(([key, plan]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <Card className={selectedPlan === key ? "border-2 border-primary" : ""}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          {plan.name}
                          {plan.badge && (
                            <Badge className="ml-2 bg-primary text-primary-foreground">
                              {plan.badge}
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {plan.price}
                            <span className="text-sm text-muted-foreground font-normal">
                              {plan.period}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </CardHeader>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Features List */}
            <Card data-testid="card-features">
              <CardHeader>
                <CardTitle>What's included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Camera className="w-4 h-4 text-primary mr-3" />
                    AI stool photo analysis with Bristol classification
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-primary mr-3" />
                    Advanced pattern recognition and correlations
                  </li>
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 text-primary mr-3" />
                    PDF reports and CSV data exports
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    HealthKit and Health Connect sync
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    Unlimited data history
                  </li>
                  {selectedPlan === 'meal_ai_addon' && (
                    <li className="flex items-center text-accent">
                      <Utensils className="w-4 h-4 text-accent mr-3" />
                      Meal photo AI with automatic macro calculation
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Payment Details</h3>
            
            {isCreatingSubscription ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-muted-foreground">Setting up subscription...</p>
                  </div>
                </CardContent>
              </Card>
            ) : clientSecret ? (
              <Card data-testid="card-payment-form">
                <CardContent className="pt-6">
                  <Elements 
                    stripe={stripePromise} 
                    options={{ 
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                      },
                    }}
                  >
                    <SubscribeForm plan={selectedPlan} onSuccess={onSubscriptionSuccess} />
                  </Elements>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Select a plan to continue</p>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>🔒 Payments secured by Stripe</p>
              <p>Cancel anytime • No long-term commitments</p>
              <p>30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
