import { TrafficSuggestion } from '../types/railway';

export const trafficSuggestions: TrafficSuggestion[] = [
  {
    id: 'TS001',
    type: 'delay',
    affectedTrain: 'T005', // Freight Special
    beneficiary: 'T001', // Shatabdi Express
    reason: 'Priority 1 train needs clear passage through Delhi-Ghaziabad section',
    estimatedDelay: 8,
    priority: 'high',
    impact: 'minimal'
  },
  {
    id: 'TS002',
    type: 'reroute',
    affectedTrain: 'T010', // Local Goods
    beneficiary: 'T006', // Golden Temple Mail
    reason: 'VIP train requires priority routing through Agra-Delhi corridor',
    estimatedDelay: 12,
    priority: 'high',
    impact: 'moderate'
  },
  {
    id: 'TS003',
    type: 'speed_adjust',
    affectedTrain: 'T004', // Local Passenger
    beneficiary: 'T002', // Jan Shatabdi
    reason: 'Express service optimization on Ghaziabad-Agra route',
    estimatedDelay: 4,
    priority: 'medium',
    impact: 'minimal'
  },
  {
    id: 'TS004',
    type: 'delay',
    affectedTrain: 'T014', // Goods Special
    beneficiary: 'T007', // Grand Trunk Express
    reason: 'Express train schedule maintenance priority',
    estimatedDelay: 15,
    priority: 'medium',
    impact: 'moderate'
  },
  {
    id: 'TS005',
    type: 'reroute',
    affectedTrain: 'T012', // Passenger Local
    beneficiary: 'T013', // JP-BPL Express
    reason: 'Long-distance express requires priority over local service',
    estimatedDelay: 6,
    priority: 'low',
    impact: 'minimal'
  }
];