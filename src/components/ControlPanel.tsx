import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Train, Conflict, Alert } from '../types/railway';
import { Clock, AlertTriangle, CheckCircle, XCircle, RotateCcw, CloudRain } from 'lucide-react';

interface ControlPanelProps {
  trains: Train[];
  conflicts: Conflict[];
  alerts: Alert[];
  onDecision: (conflictId: string, decision: 'allow' | 'hold' | 'reroute') => void;
}

export function ControlPanel({ trains, conflicts, alerts, onDecision }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState('trains');

  const getDelayColor = (delay: number) => {
    if (delay === 0) return 'success';
    if (delay <= 10) return 'warning';
    return 'destructive';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'default';
      default: return 'secondary';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trains">Active Trains</TabsTrigger>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
        </TabsList>

        <TabsContent value="trains" className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {trains.map((train) => (
                <Card key={train.id} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={train.type === 'express' ? 'default' : train.type === 'local' ? 'secondary' : 'outline'}>
                        {train.type.toUpperCase()}
                      </Badge>
                      <span className="font-semibold">{train.number}</span>
                    </div>
                    <Badge variant={getDelayColor(train.delay)}>
                      {train.delay === 0 ? 'On Time' : `+${train.delay}m`}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-2">{train.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>Current: {train.currentStation}</div>
                    <div>Next: {train.nextStation}</div>
                    <div>Speed: {train.currentSpeed} km/h</div>
                    <div>Status: {train.status}</div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="decisions" className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {conflicts.map((conflict) => (
                <Card key={conflict.id} className="p-4">
                  <CardHeader className="p-0 mb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{conflict.type.toUpperCase()} CONFLICT</span>
                      </CardTitle>
                      <Badge variant={getSeverityColor(conflict.severity)}>
                        {conflict.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 space-y-3">
                    <p className="text-sm text-muted-foreground">{conflict.description}</p>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(conflict.timestamp)}</span>
                      <span>•</span>
                      <span>{conflict.location}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => onDecision(conflict.id, 'allow')}
                        className="flex-1"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Allow
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDecision(conflict.id, 'hold')}
                        className="flex-1"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Hold
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => onDecision(conflict.id, 'reroute')}
                        className="flex-1"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reroute
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="alerts" className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card key={alert.id} className={`p-3 ${!alert.isRead ? 'border-l-4 border-l-primary' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(alert.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm">{alert.message}</p>
                  
                  <div className="flex items-center space-x-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {alert.type}
                    </Badge>
                    {!alert.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="weather" className="flex-1 mt-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CloudRain className="h-5 w-5" />
                <span>Weather Conditions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">28°C</div>
                    <div className="text-sm text-muted-foreground">New Delhi</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Visibility</span>
                    <span className="text-sm font-medium">2.5 km</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm">Wind Speed</span>
                    <span className="text-sm font-medium">15 km/h</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Fog Level</span>
                    <Badge variant="warning">Dense</Badge>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-warning-foreground">
                    ⚠️ Dense fog conditions expected until 10:00 AM. Reduce train speeds in Delhi-Ghaziabad sector.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}