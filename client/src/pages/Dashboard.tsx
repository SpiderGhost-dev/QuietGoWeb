import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { HealthLog, FileUpload, Pattern } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataUpload } from "@/components/DataUpload";
import { PatternVisualization } from "@/components/PatternVisualization";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { 
  Clock, 
  TrendingUp, 
  Calendar, 
  Download, 
  ChartPie,
  Activity,
  Utensils,
  Target,
  Sprout,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedDateRange, setSelectedDateRange] = useState("7d");

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

  // Fetch health logs
  const { data: healthLogs = [], isLoading: logsLoading } = useQuery<HealthLog[]>({
    queryKey: ["/api/health-logs"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Fetch pattern analysis
  const { data: patterns = [], isLoading: patternsLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Fetch file uploads
  const { data: uploads = [], isLoading: uploadsLoading } = useQuery<FileUpload[]>({
    queryKey: ["/api/uploads"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Export data mutation
  const exportDataMutation = useMutation({
    mutationFn: async (format: 'json' | 'csv') => {
      const response = await apiRequest("POST", "/api/export-data", { 
        format,
        startDate: getStartDateForRange(selectedDateRange),
        endDate: new Date().toISOString(),
      });
      return response;
    },
    onSuccess: async (response) => {
      const contentType = response.headers.get('content-type');
      const contentDisposition = response.headers.get('content-disposition');
      
      if (contentType?.includes('application/json')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quietgo-data.json';
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (contentType?.includes('text/csv')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quietgo-data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      }
      
      toast({
        title: "Export Complete",
        description: "Your data has been downloaded successfully.",
      });
    },
    onError: (error) => {
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
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const stoolLogs = healthLogs.filter((log: any) => log.type === 'stool');
  const mealLogs = healthLogs.filter((log: any) => log.type === 'meal');
  
  // Calculate basic stats
  const weeklyStats = calculateWeeklyStats(healthLogs);
  
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
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Sprout className="text-primary-foreground text-sm" />
                </div>
                <h1 className="text-xl font-serif font-semibold">Health Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SubscriptionStatus user={user} />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => exportDataMutation.mutate('csv')}
                disabled={exportDataMutation.isPending}
                data-testid="button-export-csv"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4" data-testid="tabs-dashboard">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="patterns" data-testid="tab-patterns">Patterns</TabsTrigger>
            <TabsTrigger value="sync" data-testid="tab-sync">Data Sync</TabsTrigger>
            <TabsTrigger value="export" data-testid="tab-export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card data-testid="card-total-logs">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-total-logs">
                    {healthLogs.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stoolLogs.length} stool, {mealLogs.length} meal
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-regularity">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Regularity</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-regularity">
                    {weeklyStats.regularity}%
                  </div>
                  <Progress value={weeklyStats.regularity} className="mt-2" />
                </CardContent>
              </Card>

              <Card data-testid="card-avg-meals">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Meals/Day</CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-avg-meals">
                    {weeklyStats.avgMealsPerDay}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-sync-status">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" data-testid="text-sync-status">
                    {uploads.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Files synced
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2" data-testid="card-recent-activity">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {logsLoading ? (
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-12 bg-muted animate-pulse rounded" />
                      ))}
                    </div>
                  ) : healthLogs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">No activity logged yet</p>
                      <p className="text-sm">Upload data from your mobile app to see activity here</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {healthLogs.slice(0, 10).map((log: any) => (
                        <div 
                          key={log.id} 
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                          data-testid={`activity-log-${log.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              log.type === 'stool' ? 'bg-primary' : 'bg-accent'
                            }`} />
                            <div>
                              <div className="text-sm font-medium capitalize">
                                {log.type} log
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {log.type === 'stool' && log.bristolScale && `Bristol ${log.bristolScale}`}
                            {log.type === 'meal' && log.totalCalories && `${log.totalCalories} cal`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Weekly Insights */}
              <Card data-testid="card-weekly-insights">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChartPie className="w-5 h-5 mr-2 text-accent" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Regularity</span>
                        <span className="font-medium" data-testid="text-regularity-percent">
                          {weeklyStats.regularity}%
                        </span>
                      </div>
                      <Progress value={weeklyStats.regularity} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Meals logged</span>
                        <span className="font-medium" data-testid="text-meals-logged">
                          {mealLogs.length}/21
                        </span>
                      </div>
                      <Progress value={(mealLogs.length / 21) * 100} />
                    </div>
                    
                    {weeklyStats.regularityWindow && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Regularity Window</p>
                        <p className="text-lg font-medium" data-testid="text-regularity-window">
                          {weeklyStats.regularityWindow}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <PatternVisualization 
              healthLogs={healthLogs}
              patterns={patterns}
              isLoading={patternsLoading}
            />
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <DataUpload uploads={uploads} isLoading={uploadsLoading} />
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card data-testid="card-export-data">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-primary" />
                  Export Your Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Data Export Options</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download your health data in standard formats for backup or analysis.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => exportDataMutation.mutate('json')}
                        disabled={exportDataMutation.isPending}
                        data-testid="button-export-json"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export as JSON
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => exportDataMutation.mutate('csv')}
                        disabled={exportDataMutation.isPending}
                        data-testid="button-export-csv-detailed"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export as CSV
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-sm font-medium mb-3">Data Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total logs:</span>
                        <span className="ml-2 font-medium" data-testid="text-export-total-logs">
                          {healthLogs.length}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date range:</span>
                        <span className="ml-2 font-medium" data-testid="text-export-date-range">
                          {healthLogs.length > 0 
                            ? `${new Date(Math.min(...healthLogs.map((l: any) => new Date(l.timestamp).getTime()))).toLocaleDateString()} - ${new Date().toLocaleDateString()}`
                            : 'No data'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function getStartDateForRange(range: string): string {
  const now = new Date();
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  return startDate.toISOString();
}

function calculateWeeklyStats(logs: any[]) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  
  const weeklyLogs = logs.filter(log => new Date(log.timestamp) > weekAgo);
  const stoolLogs = weeklyLogs.filter(log => log.type === 'stool');
  const mealLogs = weeklyLogs.filter(log => log.type === 'meal');
  
  // Calculate regularity (percentage of days with at least one stool log)
  const daysWithStoolLogs = new Set(
    stoolLogs.map(log => new Date(log.timestamp).toDateString())
  ).size;
  const regularity = Math.round((daysWithStoolLogs / 7) * 100);
  
  // Calculate average meals per day
  const daysWithMealLogs = new Set(
    mealLogs.map(log => new Date(log.timestamp).toDateString())
  ).size;
  const avgMealsPerDay = daysWithMealLogs > 0 ? (mealLogs.length / daysWithMealLogs).toFixed(1) : '0.0';
  
  // Calculate regularity window (most common time range)
  let regularityWindow = null;
  if (stoolLogs.length >= 3) {
    const hours = stoolLogs.map(log => new Date(log.timestamp).getHours());
    const avgHour = hours.reduce((sum, h) => sum + h, 0) / hours.length;
    const startHour = Math.max(0, Math.floor(avgHour - 1.5));
    const endHour = Math.min(23, Math.ceil(avgHour + 1.5));
    
    const formatHour = (h: number) => {
      if (h === 0) return '12:00 AM';
      if (h < 12) return `${h}:00 AM`;
      if (h === 12) return '12:00 PM';
      return `${h - 12}:00 PM`;
    };
    
    regularityWindow = `${formatHour(startHour)} - ${formatHour(endHour)}`;
  }
  
  return {
    regularity,
    avgMealsPerDay,
    regularityWindow,
  };
}
