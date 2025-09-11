import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Crown, 
  Utensils, 
  Calendar,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

interface SubscriptionStatusProps {
  user: any;
}

export function SubscriptionStatus({ user }: SubscriptionStatusProps) {
  if (!user) {
    return null;
  }

  const isPro = user.subscriptionPlan !== 'free';
  const hasMealAi = user.mealAiAddon;

  if (!isPro) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="outline" data-testid="badge-free-plan">
          Free Plan
        </Badge>
        <Link href="/subscribe">
          <Button size="sm" data-testid="button-upgrade-header">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge className="bg-primary text-primary-foreground" data-testid="badge-pro-plan">
        <Crown className="w-3 h-3 mr-1" />
        Pro
      </Badge>
      
      {hasMealAi && (
        <Badge variant="outline" className="text-accent border-accent" data-testid="badge-meal-ai">
          <Utensils className="w-3 h-3 mr-1" />
          CalcuPlate
        </Badge>
      )}

      <div className="text-xs text-muted-foreground hidden sm:block">
        {user.subscriptionPlan === 'pro_yearly' ? 'Annual' : 'Monthly'}
      </div>
    </div>
  );
}
