import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, Clock, AlertCircle } from 'lucide-react';
import { trains } from '../data/sampleData';
import { Train } from '../types/railway';

export default function PriorityManagement() {
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityLabel = (priority: number) => {
    const labels = {
      1: 'VIP',
      2: 'High',
      3: 'Medium',
      4: 'Low',
      5: 'Lowest'
    };
    return labels[priority as keyof typeof labels];
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

  const filteredTrains = trains.filter(train => {
    const matchesSearch = train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         train.number.includes(searchQuery);
    const matchesPriority = selectedPriority === 'all' || train.priority.toString() === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const groupedByPriority = filteredTrains.reduce((acc, train) => {
    if (!acc[train.priority]) {
      acc[train.priority] = [];
    }
    acc[train.priority].push(train);
    return acc;
  }, {} as Record<number, Train[]>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Priority Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage train priorities and scheduling preferences
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search trains by name or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="1">Priority 1 - VIP</SelectItem>
                <SelectItem value="2">Priority 2 - High</SelectItem>
                <SelectItem value="3">Priority 3 - Medium</SelectItem>
                <SelectItem value="4">Priority 4 - Low</SelectItem>
                <SelectItem value="5">Priority 5 - Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Priority Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Priority System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((priority) => (
              <div key={priority} className="text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold ${getPriorityColor(priority)}`}>
                  {priority}
                </div>
                <div className="font-medium">{getPriorityLabel(priority)}</div>
                <div className="text-xs text-muted-foreground">
                  {priority === 1 && 'VIP/Special'}
                  {priority === 2 && 'Express'}
                  {priority === 3 && 'Regular'}
                  {priority === 4 && 'Local'}
                  {priority === 5 && 'Freight'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trains by Priority */}
      <div className="space-y-6">
        {Object.entries(groupedByPriority)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([priority, trains]) => (
            <Card key={priority}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getPriorityColor(parseInt(priority))}`}>
                    {priority}
                  </div>
                  Priority {priority} - {getPriorityLabel(parseInt(priority))}
                  <Badge variant="secondary">{trains.length} trains</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {trains.map((train) => (
                    <div key={train.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(train.priority)}`}></div>
                        <div>
                          <div className="font-semibold">{train.number} - {train.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span>Type: {train.type}</span>
                            <span>From: {train.currentStation}</span>
                            <span>To: {train.nextStation}</span>
                            {train.delay > 0 && (
                              <span className="flex items-center gap-1 text-warning">
                                <Clock className="h-3 w-3" />
                                Delay: {train.delay}min
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={train.status === 'running' ? 'default' : train.status === 'delayed' ? 'destructive' : 'secondary'}
                        >
                          {train.status}
                        </Badge>
                        <Badge variant="outline">
                          {train.currentSpeed} km/h
                        </Badge>
                        {train.priority <= 2 && (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredTrains.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No trains found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}