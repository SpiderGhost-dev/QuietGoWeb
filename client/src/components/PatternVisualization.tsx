import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target,
  BarChart3,
  RefreshCw
} from "lucide-react";

interface PatternVisualizationProps {
  healthLogs: any[];
  patterns: any[];
  isLoading: boolean;
}

export function PatternVisualization({ healthLogs, patterns, isLoading }: PatternVisualizationProps) {
  const { toast } = useToast();

  // Generate pattern analysis mutation
  const analyzePatternsMutation = useMutation({
    mutationFn: async () => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      
      const response = await apiRequest("POST", "/api/analyze-patterns", {
        startDate: thirtyDaysAgo.toISOString(),
        endDate: now.toISOString(),
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/patterns"] });
      toast({
        title: "Pattern Analysis Complete",
        description: "Your health patterns have been updated.",
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
        title: "Analysis Failed",
        description: "Failed to analyze patterns. Please try again.",
        variant: "destructive",
      });
    },
  });

  const stoolLogs = healthLogs.filter(log => log.type === 'stool');
  const mealLogs = healthLogs.filter(log => log.type === 'meal');

  // Calculate basic pattern data
  const patternData = calculatePatterns(healthLogs);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-32 bg-muted animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (healthLogs.length === 0) {
    return (
      <Card data-testid="card-no-patterns">
        <CardContent className="text-center py-12">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No patterns to analyze yet</h3>
          <p className="text-muted-foreground mb-6">
            Upload health data or sync from your mobile app to see pattern insights.
          </p>
          <Button 
            onClick={() => analyzePatternsMutation.mutate()}
            disabled={analyzePatternsMutation.isPending}
            data-testid="button-analyze-empty"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pattern Analysis Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-semibold">Pattern Analysis</h2>
          <p className="text-muted-foreground">
            Insights based on {healthLogs.length} health logs
          </p>
        </div>
        <Button
          onClick={() => analyzePatternsMutation.mutate()}
          disabled={analyzePatternsMutation.isPending}
          variant="outline"
          data-testid="button-refresh-patterns"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${analyzePatternsMutation.isPending ? 'animate-spin' : ''}`} />
          Refresh Analysis
        </Button>
      </div>

      {/* Regularity Pattern */}
      <Card data-testid="card-regularity-pattern">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary" />
            Regularity Window
            {patternData.regularity.confidence >= 0.7 && (
              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                High Confidence
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patternData.regularity.window ? (
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary" data-testid="text-regularity-window">
                {patternData.regularity.window}
              </div>
              <p className="text-muted-foreground">
                Your most consistent time window for bowel movements
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consistency</span>
                    <span>{Math.round(patternData.regularity.consistency * 100)}%</span>
                  </div>
                  <Progress value={patternData.regularity.consistency * 100} />
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {stoolLogs.length} logs
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Not enough data to establish a regularity pattern</p>
              <p className="text-sm">Track for at least 7 days to see patterns</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Frequency Analysis */}
      <Card data-testid="card-frequency-analysis">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-accent" />
            Frequency Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold" data-testid="text-avg-daily-frequency">
                {patternData.frequency.avgDaily}
              </div>
              <p className="text-sm text-muted-foreground">Average per day</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" data-testid="text-weekly-frequency">
                {patternData.frequency.weekly}
              </div>
              <p className="text-sm text-muted-foreground">This week</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" data-testid="text-consistency-score">
                {Math.round(patternData.frequency.consistency * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Consistency score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bristol Scale Distribution */}
      <Card data-testid="card-bristol-distribution">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Bristol Scale Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(patternData.bristol).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(patternData.bristol).map(([type, count]) => {
                const percentage = ((count as number) / stoolLogs.length) * 100;
                return (
                  <div key={type} className="space-y-2" data-testid={`bristol-type-${type}`}>
                    <div className="flex justify-between text-sm">
                      <span>Type {type}</span>
                      <span>{count} logs ({Math.round(percentage)}%)</span>
                    </div>
                    <Progress value={percentage} />
                  </div>
                );
              })}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Ideal range:</strong> Types 3-4 indicate healthy stool consistency.
                  This is educational information only, not medical advice.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No Bristol scale data available</p>
              <p className="text-sm">Use the mobile app for AI-powered stool analysis</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card data-testid="card-weekly-trends">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-accent" />
            Weekly Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
              const dayData = patternData.weeklyTrends[index] || { count: 0, avgTime: null };
              return (
                <div 
                  key={day} 
                  className="text-center p-3 rounded-lg border bg-card"
                  data-testid={`weekly-trend-${day.toLowerCase()}`}
                >
                  <div className="text-xs text-muted-foreground mb-1">{day}</div>
                  <div className="text-lg font-semibold">{dayData.count}</div>
                  {dayData.avgTime && (
                    <div className="text-xs text-muted-foreground">
                      ~{dayData.avgTime}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              <strong>Most active day:</strong> {patternData.mostActiveDay || 'Not enough data'}
            </p>
            <p>
              <strong>Least active day:</strong> {patternData.leastActiveDay || 'Not enough data'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meal Correlations */}
      {mealLogs.length > 0 && (
        <Card data-testid="card-meal-correlations">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-accent" />
              Meal & Digestive Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Meal Frequency</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average meals per day</span>
                    <span className="font-medium" data-testid="text-meal-avg-daily">
                      {patternData.meals.avgDaily}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total meals logged</span>
                    <span className="font-medium" data-testid="text-meal-total">
                      {mealLogs.length}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Nutritional Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average daily calories</span>
                    <span className="font-medium" data-testid="text-avg-calories">
                      {patternData.meals.avgCalories || 'N/A'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Enable CalcuPlate add-on for detailed macro tracking
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function calculatePatterns(healthLogs: any[]) {
  const stoolLogs = healthLogs.filter(log => log.type === 'stool');
  const mealLogs = healthLogs.filter(log => log.type === 'meal');
  
  // Calculate regularity window
  const stoolTimes = stoolLogs.map(log => {
    const date = new Date(log.timestamp);
    return date.getHours() + (date.getMinutes() / 60);
  });
  
  let regularityWindow = null;
  let consistency = 0;
  
  if (stoolTimes.length >= 3) {
    const avgTime = stoolTimes.reduce((sum, time) => sum + time, 0) / stoolTimes.length;
    const variance = stoolTimes.reduce((sum, time) => sum + Math.pow(time - avgTime, 2), 0) / stoolTimes.length;
    const stdDev = Math.sqrt(variance);
    
    consistency = Math.max(0, Math.min(1, 1 - (stdDev / 12))); // Normalize to 0-1
    
    if (consistency >= 0.5) {
      const startHour = Math.max(0, Math.floor(avgTime - 1.5));
      const endHour = Math.min(23, Math.ceil(avgTime + 1.5));
      
      const formatHour = (h: number) => {
        const hour = Math.floor(h);
        const minutes = Math.round((h - hour) * 60);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
      };
      
      regularityWindow = `${formatHour(startHour)} - ${formatHour(endHour)}`;
    }
  }
  
  // Calculate frequency
  const now = new Date();
  const daysTracked = Math.max(1, Math.ceil(
    (now.getTime() - new Date(stoolLogs[stoolLogs.length - 1]?.timestamp || now).getTime()) / (24 * 60 * 60 * 1000)
  ));
  
  const avgDaily = (stoolLogs.length / daysTracked).toFixed(1);
  
  // Weekly frequency
  const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  const weeklyLogs = stoolLogs.filter(log => new Date(log.timestamp) > weekAgo);
  
  // Bristol scale distribution
  const bristolDistribution: Record<string, number> = {};
  stoolLogs.forEach(log => {
    if (log.bristolScale) {
      bristolDistribution[log.bristolScale] = (bristolDistribution[log.bristolScale] || 0) + 1;
    }
  });
  
  // Weekly trends by day
  const weeklyTrends = Array.from({ length: 7 }, () => ({ count: 0, times: [] as number[] }));
  stoolLogs.forEach(log => {
    const date = new Date(log.timestamp);
    const dayOfWeek = date.getDay();
    const timeOfDay = date.getHours() + (date.getMinutes() / 60);
    
    weeklyTrends[dayOfWeek].count++;
    weeklyTrends[dayOfWeek].times.push(timeOfDay);
  });
  
  // Calculate average times and find most/least active days
  const processedTrends = weeklyTrends.map(day => ({
    count: day.count,
    avgTime: day.times.length > 0 
      ? formatHour(day.times.reduce((sum, time) => sum + time, 0) / day.times.length)
      : null
  }));
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mostActiveDay = weeklyTrends.reduce((max, day, index) => 
    day.count > weeklyTrends[max].count ? index : max, 0
  );
  const leastActiveDay = weeklyTrends.reduce((min, day, index) => 
    day.count < weeklyTrends[min].count ? index : min, 0
  );
  
  // Meal patterns
  const mealDaysTracked = Math.max(1, Math.ceil(
    (now.getTime() - new Date(mealLogs[mealLogs.length - 1]?.timestamp || now).getTime()) / (24 * 60 * 60 * 1000)
  ));
  
  const avgMealsDaily = (mealLogs.length / mealDaysTracked).toFixed(1);
  const avgCalories = mealLogs.length > 0 
    ? Math.round(mealLogs.reduce((sum, log) => sum + (log.totalCalories || 0), 0) / mealLogs.length)
    : null;
  
  return {
    regularity: {
      window: regularityWindow,
      consistency,
      confidence: consistency
    },
    frequency: {
      avgDaily,
      weekly: weeklyLogs.length,
      consistency
    },
    bristol: bristolDistribution,
    weeklyTrends: processedTrends,
    mostActiveDay: dayNames[mostActiveDay],
    leastActiveDay: dayNames[leastActiveDay],
    meals: {
      avgDaily: avgMealsDaily,
      avgCalories
    }
  };
}

function formatHour(h: number): string {
  const hour = Math.floor(h);
  const minutes = Math.round((h - hour) * 60);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
}
