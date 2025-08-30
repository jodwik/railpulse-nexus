import React from 'react';
import { Train, Station } from '../types/railway';
import { TrainIcon } from './TrainIcon';

interface RailwayMapProps {
  trains: Train[];
  stations: Station[];
  onTrainClick: (train: Train) => void;
}

export function RailwayMap({ trains, stations, onTrainClick }: RailwayMapProps) {
  return (
    <div className="h-full bg-map-background rounded-lg border border-border relative overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-control">
        <h3 className="font-semibold text-card-foreground mb-2">Network Overview</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-active rounded-full"></div>
            <span className="text-muted-foreground">Active Track</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-track rounded-full"></div>
            <span className="text-muted-foreground">Inactive Track</span>
          </div>
        </div>
      </div>

      {/* Railway Network SVG */}
      <svg className="w-full h-full" viewBox="0 0 500 600">
        {/* Track Lines */}
        <g className="tracks">
          {/* Main Delhi-Ghaziabad line */}
          <line x1="200" y1="150" x2="350" y2="120" 
                stroke="hsl(var(--railway-active))" strokeWidth="4" strokeLinecap="round" />
          
          {/* Delhi-Agra line */}
          <line x1="200" y1="150" x2="280" y2="280" 
                stroke="hsl(var(--railway-active))" strokeWidth="4" strokeLinecap="round" />
          
          {/* Delhi-Jaipur line */}
          <line x1="200" y1="150" x2="120" y2="320" 
                stroke="hsl(var(--railway-active))" strokeWidth="4" strokeLinecap="round" />
          
          {/* Agra-Gwalior line */}
          <line x1="280" y1="280" x2="320" y2="380" 
                stroke="hsl(var(--railway-active))" strokeWidth="4" strokeLinecap="round" />
          
          {/* Jaipur-Bhopal line */}
          <line x1="120" y1="320" x2="180" y2="450" 
                stroke="hsl(var(--railway-active))" strokeWidth="4" strokeLinecap="round" />
          
          {/* Bhopal-Gwalior line */}
          <line x1="180" y1="450" x2="320" y2="380" 
                stroke="hsl(var(--railway-active))" strokeWidth="4" strokeLinecap="round" />
          
          {/* Ghaziabad-Agra line */}
          <line x1="350" y1="120" x2="280" y2="280" 
                stroke="hsl(var(--railway-track))" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Stations */}
        <g className="stations">
          {stations.map((station) => (
            <g key={station.id}>
              {/* Station Circle */}
              <circle 
                cx={station.position.x} 
                cy={station.position.y} 
                r="12" 
                fill="hsl(var(--card))" 
                stroke="hsl(var(--primary))" 
                strokeWidth="3"
                className="hover:stroke-primary-hover cursor-pointer transition-colors"
              />
              
              {/* Station Code */}
              <text 
                x={station.position.x} 
                y={station.position.y + 4}
                textAnchor="middle" 
                className="fill-primary text-xs font-bold pointer-events-none"
              >
                {station.code}
              </text>
              
              {/* Station Name */}
              <text 
                x={station.position.x} 
                y={station.position.y - 20}
                textAnchor="middle" 
                className="fill-foreground text-sm font-medium pointer-events-none"
              >
                {station.name}
              </text>
              
              {/* Platform Occupancy Indicator */}
              <circle 
                cx={station.position.x + 15} 
                cy={station.position.y - 10} 
                r="6" 
                fill={station.occupancy > station.platforms * 0.7 ? 'hsl(var(--destructive))' : 
                      station.occupancy > station.platforms * 0.4 ? 'hsl(var(--warning))' : 'hsl(var(--success))'}
                className="animate-pulse-signal"
              />
            </g>
          ))}
        </g>

        {/* Trains */}
        <g className="trains">
          {trains.map((train) => (
            <g key={train.id} className="cursor-pointer" onClick={() => onTrainClick(train)}>
              <TrainIcon 
                train={train} 
                x={train.position.x} 
                y={train.position.y}
                isAnimated={train.status === 'running'}
              />
            </g>
          ))}
        </g>

        {/* Distance Markers */}
        <g className="distance-markers">
          <text x="275" y="100" textAnchor="middle" className="fill-muted-foreground text-xs">
            DEL-GZB: 24km
          </text>
          <text x="240" y="220" textAnchor="middle" className="fill-muted-foreground text-xs">
            DEL-AGR: 203km
          </text>
          <text x="160" y="240" textAnchor="middle" className="fill-muted-foreground text-xs">
            DEL-JPR: 308km
          </text>
        </g>
      </svg>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-control">
        <h4 className="font-medium text-card-foreground mb-2">Train Types</h4>
        <div className="space-y-1 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Express</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Local</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Freight</span>
          </div>
        </div>
      </div>
    </div>
  );
}