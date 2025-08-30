export interface Train {
  id: string;
  number: string;
  name: string;
  type: 'express' | 'local' | 'freight';
  currentSpeed: number;
  maxSpeed: number;
  currentStation: string;
  nextStation: string;
  delay: number;
  position: { x: number; y: number };
  direction: 'north' | 'south' | 'east' | 'west';
  status: 'running' | 'stopped' | 'delayed';
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