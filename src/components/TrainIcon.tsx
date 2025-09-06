import React from 'react';
import { Train } from '../types/railway';

interface TrainIconProps {
  train: Train;
  x: number;
  y: number;
  isAnimated?: boolean;
}

export function TrainIcon({ train, x, y, isAnimated = false }: TrainIconProps) {
  const getTrainColor = () => {
    switch (train.type) {
      case 'express': return 'hsl(var(--success))';
      case 'local': return 'hsl(var(--primary))';
      case 'freight': return 'hsl(var(--warning))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getStatusColor = () => {
    switch (train.status) {
      case 'running': return getTrainColor();
      case 'stopped': return 'hsl(var(--destructive))';
      case 'delayed': return 'hsl(var(--warning))';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getPriorityColor = () => {
    switch (train.priority) {
      case 1: return 'hsl(45, 100%, 50%)'; // Gold
      case 2: return 'hsl(var(--destructive))'; // Red
      case 3: return 'hsl(var(--warning))'; // Orange
      case 4: return 'hsl(var(--muted))'; // Gray
      case 5: return 'hsl(var(--muted-foreground))'; // Darker gray
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  return (
    <g className={isAnimated ? 'animate-train-move' : ''}>
      {/* Train Body */}
      <rect 
        x={x - 8} 
        y={y - 6} 
        width="16" 
        height="12" 
        rx="2" 
        fill={getStatusColor()}
        stroke="hsl(var(--card))" 
        strokeWidth="1"
      />
      
      {/* Train Number */}
      <text 
        x={x} 
        y={y + 2}
        textAnchor="middle" 
        className="fill-primary-foreground text-xs font-bold pointer-events-none"
      >
        {train.number.slice(-3)}
      </text>
      
      {/* Direction Indicator */}
      <polygon 
        points={`${x + 8},${y - 2} ${x + 12},${y} ${x + 8},${y + 2}`}
        fill={getStatusColor()}
        className="opacity-80"
      />
      
      {/* Priority Indicator */}
      <circle 
        cx={x - 12} 
        cy={y + 8} 
        r="3" 
        fill={getPriorityColor()}
        stroke="hsl(var(--card))" 
        strokeWidth="1"
        className="opacity-90"
      />
      <text 
        x={x - 12} 
        y={y + 10}
        textAnchor="middle" 
        className="fill-primary-foreground text-xs font-bold pointer-events-none"
      >
        {train.priority}
      </text>
      
      {/* Speed Indicator */}
      {train.currentSpeed > 0 && (
        <g>
          <circle 
            cx={x - 12} 
            cy={y - 8} 
            r="3" 
            fill="hsl(var(--card))" 
            stroke={getTrainColor()} 
            strokeWidth="1"
          />
          <text 
            x={x - 12} 
            y={y - 6}
            textAnchor="middle" 
            className="fill-foreground text-xs font-medium pointer-events-none"
          >
            {train.currentSpeed}
          </text>
        </g>
      )}
      
      {/* Delay Warning */}
      {train.delay > 10 && (
        <circle 
          cx={x + 12} 
          cy={y - 8} 
          r="4" 
          fill="hsl(var(--destructive))"
          className="animate-pulse"
        />
      )}
    </g>
  );
}