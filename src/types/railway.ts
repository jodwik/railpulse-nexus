export interface Train {
  id: string;
  number: string;
  name: string;
  type: 'express' | 'local' | 'freight';
  priority: 1 | 2 | 3 | 4 | 5; // 1 = Highest (VIP), 5 = Lowest
  currentSpeed: number;
  maxSpeed: number;
  currentStation: string;
  nextStation: string;
  delay: number;
  position: { x: number; y: number };
  direction: 'north' | 'south' | 'east' | 'west';
  status: 'running' | 'stopped' | 'delayed';
}

export interface TrafficSuggestion {
  id: string;
  type: 'delay' | 'reroute' | 'speed_adjust';
  affectedTrain: string;
  beneficiary: string;
  reason: string;
  estimatedDelay: number;
  priority: 'high' | 'medium' | 'low';
  impact: 'minimal' | 'moderate' | 'significant';
}

export interface Station {
  id: string;
  name: string;
  code: string;
  position: { x: number; y: number };
  platforms: number;
  occupancy: number;
}

export interface Conflict {
  id: string;
  type: 'junction' | 'platform' | 'signal';
  description: string;
  severity: 'critical' | 'warning' | 'info';
  trains: string[];
  location: string;
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: 'system' | 'weather' | 'maintenance' | 'emergency';
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
  isRead: boolean;
}