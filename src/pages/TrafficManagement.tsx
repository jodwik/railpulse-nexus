import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, Route, TrendingUp, AlertTriangle, Users, ArrowRight } from 'lucide-react';
import { trafficSuggestions } from '../data/trafficSuggestions';
import { trains } from '../data/sampleData';
import { TrafficSuggestion } from '../types/railway';

export default function TrafficManagement() {
  const [approvedSuggestions, setApprovedSuggestions] = useState<Set<string>>(new Set());
  const [rejectedSuggestions, setRejectedSuggestions] = useState<Set<string>>(new Set());

  const handleApproveSuggestion = (suggestionId: string) => {
    setApprovedSuggestions(prev => new Set([...prev, suggestionId]));
    setRejectedSuggestions(prev => {
      const newSet = new Set(prev);
      newSet.delete(suggestionId);
      return newSet;
    });
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    setRejectedSuggestions(prev => new Set([...prev, suggestionId]));
    setApprovedSuggestions(prev => {
      const newSet = new Set(prev);
      newSet.delete(suggestionId);
      return newSet;
    });
  };

  const getTrainById = (trainId: string) => {
    return trains.find(train => train.id === trainId);
  };

  const getPriorityColor = (priority: number) => {
    const colors = {
      1: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      2: 'bg-destructive',
      3: 'bg-warning',
      4: 'bg-muted',
      5: 'bg-muted-foreground'
    };
    return colors[priority as keyof typeof colors];
  };

  const getSuggestionIcon = (type: TrafficSuggestion['type']) => {
    switch (type) {
      case 'delay': return <Clock className="h-4 w-4" />;
      case 'reroute': return <Route className="h-4 w-4" />;
      case 'speed_adjust': return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (priority: TrafficSuggestion['priority']) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
    }
  };

  const getImpactColor = (impact: TrafficSuggestion['impact']) => {
    switch (impact) {
      case 'minimal': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'significant': return 'text-destructive';
    }
  };

  const pendingSuggestions = trafficSuggestions.filter(
    s => !approvedSuggestions.has(s.id) && !rejectedSuggestions.has(s.id)
  );

  const approved = trafficSuggestions.filter(s => approvedSuggestions.has(s.id));
  const rejected = trafficSuggestions.filter(s => rejectedSuggestions.has(s.id));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Traffic Management</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered suggestions for optimizing railway traffic flow
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{pendingSuggestions.length} Pending</Badge>
          <Badge variant="default">{approved.length} Approved</Badge>
          <Badge variant="destructive">{rejected.length} Rejected</Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suggestions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingSuggestions.length}</div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {approved.reduce((total, s) => total + s.estimatedDelay, 0)}min
            </div>
            <p className="text-xs text-muted-foreground">Through optimization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affected Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~2.4K</div>
            <p className="text-xs text-muted-foreground">Estimated passenger impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Suggestions */}
      {pendingSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Pending Traffic Optimization Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingSuggestions.map((suggestion) => {
              const affectedTrain = getTrainById(suggestion.affectedTrain);
              const beneficiaryTrain = getTrainById(suggestion.beneficiary);
              
              return (
                <div key={suggestion.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${getSuggestionColor(suggestion.priority)}`}>
                        {getSuggestionIcon(suggestion.type)}
                      </div>
                      <div>
                        <div className="font-semibold capitalize">
                          {suggestion.type.replace('_', ' ')} Recommendation
                        </div>
                        <div className="text-sm text-muted-foreground">{suggestion.reason}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'secondary' : 'outline'}>
                        {suggestion.priority} priority
                      </Badge>
                      <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} impact
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm font-medium">Affected Train</div>
                        <div className="text-xs text-muted-foreground">
                          {affectedTrain?.number} - {affectedTrain?.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-3 h-3 rounded-full ${affectedTrain ? getPriorityColor(affectedTrain.priority) : 'bg-muted'}`}></div>
                          <span className="text-xs">Priority {affectedTrain?.priority}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Beneficiary Train</div>
                        <div className="text-xs text-muted-foreground">
                          {beneficiaryTrain?.number} - {beneficiaryTrain?.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-3 h-3 rounded-full ${beneficiaryTrain ? getPriorityColor(beneficiaryTrain.priority) : 'bg-muted'}`}></div>
                          <span className="text-xs">Priority {beneficiaryTrain?.priority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Estimated Delay</div>
                      <div className="text-lg font-bold text-warning">{suggestion.estimatedDelay} min</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRejectSuggestion(suggestion.id)}
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleApproveSuggestion(suggestion.id)}
                    >
                      Approve & Implement
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Approved Suggestions */}
      {approved.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="h-5 w-5" />
              Approved & Implemented
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approved.map((suggestion) => {
                const affectedTrain = getTrainById(suggestion.affectedTrain);
                const beneficiaryTrain = getTrainById(suggestion.beneficiary);
                
                return (
                  <div key={suggestion.id} className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <div>
                        <div className="font-medium">
                          {affectedTrain?.number} → {beneficiaryTrain?.number}
                        </div>
                        <div className="text-sm text-muted-foreground">{suggestion.reason}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success border-success/50">
                      Implemented
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {pendingSuggestions.length === 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            All traffic optimization suggestions have been reviewed. The system is operating efficiently.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}