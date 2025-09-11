import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, BarChart3, Upload, Settings, LogOut } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Sprout className="text-primary-foreground text-sm" />
              </div>
              <div>
                <span className="text-xl font-serif font-semibold">QuietGo</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {user?.subscriptionPlan === 'free' ? 'Free' : 'Pro'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName || user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Your Health Hub</h1>
          <p className="text-muted-foreground">
            Sync data from your mobile devices and gain insights into your health patterns.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" data-testid="card-dashboard">
            <Link href="/dashboard">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Dashboard</h3>
                  <p className="text-sm text-muted-foreground">View patterns & insights</p>
                </div>
              </div>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" data-testid="card-upload">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                <Upload className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Sync Data</h3>
                <p className="text-sm text-muted-foreground">Upload mobile exports</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" data-testid="card-settings">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                <Settings className="text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-muted-foreground">Privacy & preferences</p>
              </div>
            </div>
          </Card>

          {user?.subscriptionPlan === 'free' && (
            <Card className="p-6 border-2 border-primary hover:shadow-lg transition-all cursor-pointer" data-testid="card-upgrade">
              <Link href="/subscribe">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Sprout className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Upgrade Pro</h3>
                    <p className="text-sm text-muted-foreground">Unlock AI features</p>
                  </div>
                </div>
              </Link>
            </Card>
          )}
        </div>

        {/* Feature Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Mobile App Benefits</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                AI-powered stool photo analysis with Bristol scale classification
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                Meal photo recognition with automatic macro calculation
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                Pattern recognition and health correlations over time
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                Privacy-first design with automatic photo deletion
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Download Mobile Apps</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the full QuietGo experience on your mobile device for easy logging and AI analysis.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" data-testid="button-ios-download">
                <div className="w-6 h-6 bg-gray-900 rounded mr-3"></div>
                Download for iOS
              </Button>
              <Button variant="outline" className="w-full justify-start" data-testid="button-android-download">
                <div className="w-6 h-6 bg-green-600 rounded mr-3"></div>
                Download for Android
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity Preview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" data-testid="button-view-all">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-2">No data synced yet</p>
            <p className="text-sm">Upload data from your mobile app or start logging manually</p>
          </div>
        </Card>
      </main>
    </div>
  );
}
