import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Zap,
  AlertTriangle,
  CloudRain,
  Construction,
  Clock
} from 'lucide-react';

export default function Simulations() {
  const [currentSimulation, setCurrentSimulation] = useState<string | null>(null);
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');

  const predefinedScenarios = [
    {
      id: 'rush_hour',
      name: 'Rush Hour Peak Traffic',
      description: 'Simulate peak morning rush hour with 150% normal traffic',
      duration: '2 hours',
      complexity: 'Medium',
      participants: 45
    },
    {
      id: 'weather_disruption',
      name: 'Severe Weather Disruption',
      description: 'Heavy monsoon causing delays and track flooding',
      duration: '4 hours',
      complexity: 'High',
      participants: 78
    },
    {
      id: 'signal_failure',
      name: 'Major Signal System Failure',
      description: 'Critical signal failure at main junction',
      duration: '1.5 hours',
      complexity: 'High',
      participants: 32
    },
    {
      id: 'maintenance_window',
      name: 'Planned Maintenance Window',
      description: 'Track maintenance with reduced capacity',
      duration: '6 hours',
      complexity: 'Low',
      participants: 18
    }
  ];

  const runningSimulations = [
    {
      id: 'sim_001',
      name: 'Emergency Response Drill',
      progress: 67,
      timeRemaining: '15 minutes',
      participants: 12,
      status: 'active'
    },
    {
      id: 'sim_002',
      name: 'Network Optimization Test',
      progress: 23,
      timeRemaining: '1.2 hours',
      participants: 8,
      status: 'active'
    }
  ];

  const simulationResults = [
    {
      id: 'result_001',
      scenario: 'Rush Hour Peak Traffic',
      date: '2024-01-28',
      duration: '2h 15m',
      performance: 87.5,
      issues: 3,
      recommendations: 5
    },
    {
      id: 'result_002',
      scenario: 'Weather Disruption',
      date: '2024-01-27',
      duration: '4h 32m',
      performance: 72.3,
      issues: 8,
      recommendations: 12
    },
    {
      id: 'result_003',
      scenario: 'Signal System Failure',
      date: '2024-01-26',
      duration: '1h 45m',
      performance: 65.8,
      issues: 15,
      recommendations: 8
    }
  ];

  const handleStartSimulation = (scenarioId: string) => {
    setCurrentSimulation(scenarioId);
    setSimulationStatus('running');
  };

  const handlePauseSimulation = () => {
    setSimulationStatus('paused');
  };

  const handleStopSimulation = () => {
    setCurrentSimulation(null);
    setSimulationStatus('idle');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Railway Simulations</h1>
        <div className="flex items-center space-x-3">
          <Badge variant={simulationStatus === 'running' ? 'success' : 'secondary'}>
            {simulationStatus === 'running' ? 'Simulation Active' : 'System Ready'}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scenarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="active">Active Sims</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {predefinedScenarios.map((scenario) => (
              <Card key={scenario.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      {scenario.id === 'weather_disruption' && <CloudRain className="h-5 w-5 text-primary" />}
                      {scenario.id === 'signal_failure' && <Zap className="h-5 w-5 text-warning" />}
                      {scenario.id === 'rush_hour' && <Clock className="h-5 w-5 text-success" />}
                      {scenario.id === 'maintenance_window' && <Construction className="h-5 w-5 text-muted-foreground" />}
                      <span>{scenario.name}</span>
                    </CardTitle>
                    <Badge variant={
                      scenario.complexity === 'High' ? 'destructive' :
                      scenario.complexity === 'Medium' ? 'warning' : 'default'
                    }>
                      {scenario.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium">{scenario.duration}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Participants:</span>
                      <div className="font-medium">{scenario.participants} trains</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleStartSimulation(scenario.id)}
                      disabled={simulationStatus === 'running'}
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Simulation
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {simulationStatus === 'running' && currentSimulation && (
            <Card className="border-success">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    <span>Current Simulation</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={handlePauseSimulation}>
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleStopSimulation}>
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {predefinedScenarios.find(s => s.id === currentSimulation)?.name}
                    </span>
                    <Badge variant="success">Running</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="font-bold">32</div>
                      <div className="text-muted-foreground">Active Trains</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="font-bold">2</div>
                      <div className="text-muted-foreground">Issues Detected</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <div className="font-bold">25m</div>
                      <div className="text-muted-foreground">Time Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {runningSimulations.map((sim) => (
              <Card key={sim.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{sim.name}</h4>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{sim.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${sim.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{sim.participants} participants</span>
                      <span>{sim.timeRemaining} remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="space-y-4">
            {simulationResults.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">{result.scenario}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{result.date}</span>
                      <span>•</span>
                      <span>{result.duration}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-success">{result.performance}%</div>
                      <div className="text-sm text-muted-foreground">Performance Score</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-destructive">{result.issues}</div>
                      <div className="text-sm text-muted-foreground">Issues Found</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary">{result.recommendations}</div>
                      <div className="text-sm text-muted-foreground">Recommendations</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button size="sm" variant="outline">View Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Simulation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sim-name">Simulation Name</Label>
                  <Input id="sim-name" placeholder="Enter simulation name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input id="duration" type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participants">Number of Trains</Label>
                  <Input id="participants" type="number" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scenario-type">Scenario Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scenario type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traffic">Traffic Management</SelectItem>
                      <SelectItem value="emergency">Emergency Response</SelectItem>
                      <SelectItem value="maintenance">Maintenance Window</SelectItem>
                      <SelectItem value="weather">Weather Disruption</SelectItem>
                      <SelectItem value="mixed">Mixed Scenario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description"
                  className="w-full p-3 border border-border rounded-md bg-background"
                  rows={3}
                  placeholder="Describe the simulation scenario..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Create & Start Simulation
                </Button>
                <Button variant="outline">Save as Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}