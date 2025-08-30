import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Train, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users,
  Activity,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const metrics = {
    activeTrains: 157,
    onTimePerformance: 94.2,
    averageDelay: 4.8,
    networkUtilization: 78,
    criticalAlerts: 3,
    resolvedIssues: 12,
    controllerOnDuty: 8,
    systemUptime: 99.7
  };

  const recentAlerts = [
    { id: 1, message: "Platform 3 capacity exceeded at Mumbai Central", time: "2 min ago", severity: "warning" },
    { id: 2, message: "Signal failure resolved at Ghaziabad Junction", time: "5 min ago", severity: "success" },
    { id: 3, message: "Weather advisory: Heavy rain expected in Chennai sector", time: "12 min ago", severity: "info" },
    { id: 4, message: "Emergency braking system activated on Express 12001", time: "18 min ago", severity: "critical" }
  ];

  const topRoutes = [
    { route: "Delhi - Mumbai", trains: 24, onTime: 96, utilization: 85 },
    { route: "Kolkata - Chennai", trains: 18, onTime: 92, utilization: 78 },
    { route: "Bangalore - Hyderabad", trains: 15, onTime: 88, utilization: 72 },
    { route: "Delhi - Kolkata", trains: 21, onTime: 94, utilization: 81 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Control Center Dashboard</h1>
        <Badge variant="success" className="px-3 py-1">
          System Operational
        </Badge>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
            <Train className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeTrains}</div>
            <p className="text-xs text-muted-foreground">
              +12 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.onTimePerformance}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              -5 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Network Utilization</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Overall Capacity</span>
                <span className="text-sm font-medium">{metrics.networkUtilization}%</span>
              </div>
              <Progress value={metrics.networkUtilization} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-primary">{metrics.controllerOnDuty}</div>
                <div className="text-xs text-muted-foreground">Controllers On Duty</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-success">{metrics.resolvedIssues}</div>
                <div className="text-xs text-muted-foreground">Issues Resolved Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Recent System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'critical' ? 'bg-destructive' :
                    alert.severity === 'warning' ? 'bg-warning' :
                    alert.severity === 'success' ? 'bg-success' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Routes Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Route Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{route.route}</h4>
                  <p className="text-sm text-muted-foreground">{route.trains} active trains</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{route.onTime}%</div>
                    <div className="text-xs text-muted-foreground">On Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{route.utilization}%</div>
                    <div className="text-xs text-muted-foreground">Utilization</div>
                  </div>
                  <Badge variant={route.onTime >= 95 ? 'success' : route.onTime >= 85 ? 'warning' : 'destructive'}>
                    {route.onTime >= 95 ? 'Excellent' : route.onTime >= 85 ? 'Good' : 'Needs Attention'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}