import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Route, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const performanceData = {
    onTimePerformance: [
      { date: '2024-01-22', value: 92.5 },
      { date: '2024-01-23', value: 94.2 },
      { date: '2024-01-24', value: 89.8 },
      { date: '2024-01-25', value: 95.1 },
      { date: '2024-01-26', value: 91.7 },
      { date: '2024-01-27', value: 93.4 },
      { date: '2024-01-28', value: 94.8 }
    ],
    averageDelay: [
      { category: 'Express', value: 3.2, change: -0.8 },
      { category: 'Local', value: 2.1, change: -0.3 },
      { category: 'Freight', value: 8.7, change: +1.2 },
      { category: 'Special', value: 1.9, change: -0.5 }
    ],
    routeEfficiency: [
      { route: 'Delhi-Mumbai', efficiency: 87.5, volume: 245 },
      { route: 'Kolkata-Chennai', efficiency: 91.2, volume: 189 },
      { route: 'Bangalore-Hyderabad', efficiency: 85.8, volume: 156 },
      { route: 'Delhi-Kolkata', efficiency: 89.3, volume: 203 },
      { route: 'Mumbai-Chennai', efficiency: 92.1, volume: 167 }
    ]
  };

  const operationalMetrics = {
    fuelConsumption: {
      total: '1,247,890 L',
      perKm: '2.34 L/km',
      efficiency: '+5.2%',
      trend: 'up'
    },
    passengerLoad: {
      average: '78.5%',
      peak: '94.2%',
      offPeak: '62.8%',
      trend: 'up'
    },
    maintenance: {
      scheduled: 42,
      completed: 38,
      overdue: 4,
      efficiency: '90.5%'
    }
  };

  const incidentAnalysis = [
    { type: 'Signal Failure', count: 23, trend: -12, severity: 'medium' },
    { type: 'Track Obstruction', count: 8, trend: -3, severity: 'high' },
    { type: 'Weather Delay', count: 15, trend: +7, severity: 'low' },
    { type: 'Technical Issues', count: 31, trend: -5, severity: 'medium' },
    { type: 'Platform Congestion', count: 19, trend: +2, severity: 'low' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Railway Analytics</h1>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* On-Time Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>On-Time Performance Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-2 p-4 bg-muted/30 rounded-lg">
                {performanceData.onTimePerformance.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-success rounded-t-sm min-h-[20px] flex items-end justify-center"
                      style={{ height: `${(data.value / 100) * 200}px` }}
                    >
                      <span className="text-xs text-success-foreground font-medium pb-1">
                        {data.value}%
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {new Date(data.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Average Delay by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Average Delay by Train Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.averageDelay.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <span className="font-medium">{item.category}</span>
                        <Badge 
                          variant={item.change < 0 ? 'success' : 'warning'} 
                          className="ml-2"
                        >
                          {item.change > 0 ? '+' : ''}{item.change} min
                        </Badge>
                      </div>
                      <span className="text-lg font-bold">{item.value} min</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="h-5 w-5" />
                  <span>Route Efficiency Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceData.routeEfficiency.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{route.route}</div>
                        <div className="text-sm text-muted-foreground">{route.volume} trains/week</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{route.efficiency}%</div>
                        <Badge variant={route.efficiency >= 90 ? 'success' : route.efficiency >= 85 ? 'warning' : 'destructive'}>
                          {route.efficiency >= 90 ? 'Excellent' : route.efficiency >= 85 ? 'Good' : 'Poor'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">{operationalMetrics.fuelConsumption.total}</div>
                  <div className="text-sm text-muted-foreground">Total consumption this month</div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-success">{operationalMetrics.fuelConsumption.efficiency} improvement</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm">Per KM: {operationalMetrics.fuelConsumption.perKm}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Passenger Load Factor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">{operationalMetrics.passengerLoad.average}</div>
                  <div className="text-sm text-muted-foreground">Average occupancy</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Peak Hours</span>
                      <span className="font-medium">{operationalMetrics.passengerLoad.peak}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Off-Peak</span>
                      <span className="font-medium">{operationalMetrics.passengerLoad.offPeak}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold">{operationalMetrics.maintenance.efficiency}</div>
                  <div className="text-sm text-muted-foreground">Completion rate</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Scheduled</span>
                      <span className="font-medium">{operationalMetrics.maintenance.scheduled}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span className="font-medium text-success">{operationalMetrics.maintenance.completed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Overdue</span>
                      <span className="font-medium text-destructive">{operationalMetrics.maintenance.overdue}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Analysis & Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidentAnalysis.map((incident, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        incident.severity === 'high' ? 'bg-destructive' :
                        incident.severity === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <div>
                        <div className="font-medium">{incident.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {incident.count} incidents this month
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={incident.trend < 0 ? 'success' : 'warning'}>
                        {incident.trend > 0 ? '+' : ''}{incident.trend}
                      </Badge>
                      <div className="text-right">
                        <div className="font-bold text-lg">{incident.count}</div>
                        <div className="text-xs text-muted-foreground">Cases</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Maintenance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="font-medium text-warning-foreground">Engine 1245 - Due in 7 days</div>
                    <div className="text-sm text-muted-foreground">Predicted brake system maintenance required</div>
                  </div>
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="font-medium text-destructive-foreground">Track Section 45-A - Critical</div>
                    <div className="text-sm text-muted-foreground">Immediate rail replacement recommended</div>
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="font-medium text-primary-foreground">Signal Box 12 - Scheduled</div>
                    <div className="text-sm text-muted-foreground">Routine inspection in 14 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">Peak Expected</div>
                    <div className="text-sm text-muted-foreground">Today 18:00 - 20:00</div>
                    <div className="text-xs text-muted-foreground mt-1">Estimated 15% above normal</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Delhi - Mumbai</span>
                      <Badge variant="warning">High Demand</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kolkata - Chennai</span>
                      <Badge variant="default">Normal</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bangalore - Hyderabad</span>
                      <Badge variant="success">Low Demand</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}