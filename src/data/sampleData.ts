import { Train, Station, Conflict, Alert } from '../types/railway';

export const stations: Station[] = [
  { id: 'DEL', name: 'New Delhi', code: 'NDLS', position: { x: 200, y: 150 }, platforms: 16, occupancy: 8 },
  { id: 'GZB', name: 'Ghaziabad', code: 'GZB', position: { x: 350, y: 120 }, platforms: 8, occupancy: 3 },
  { id: 'AGR', name: 'Agra Cantt', code: 'AGC', position: { x: 280, y: 280 }, platforms: 6, occupancy: 2 },
  { id: 'JPR', name: 'Jaipur', code: 'JP', position: { x: 120, y: 320 }, platforms: 10, occupancy: 5 },
  { id: 'BPL', name: 'Bhopal', code: 'BPL', position: { x: 180, y: 450 }, platforms: 8, occupancy: 4 },
  { id: 'GWL', name: 'Gwalior', code: 'GWL', position: { x: 320, y: 380 }, platforms: 6, occupancy: 2 },
];

export const trains: Train[] = [
  {
    id: 'T001', number: '12001', name: 'Shatabdi Express', type: 'express',
    currentSpeed: 85, maxSpeed: 130, currentStation: 'DEL', nextStation: 'GZB',
    delay: 5, position: { x: 220, y: 145 }, direction: 'east', status: 'running'
  },
  {
    id: 'T002', number: '12002', name: 'Jan Shatabdi', type: 'express',
    currentSpeed: 75, maxSpeed: 120, currentStation: 'GZB', nextStation: 'AGR',
    delay: 0, position: { x: 340, y: 130 }, direction: 'south', status: 'running'
  },
  {
    id: 'T003', number: '19019', name: 'Dehradun Express', type: 'express',
    currentSpeed: 0, maxSpeed: 110, currentStation: 'DEL', nextStation: 'GZB',
    delay: 15, position: { x: 200, y: 150 }, direction: 'north', status: 'delayed'
  },
  {
    id: 'T004', number: '54321', name: 'Local Passenger', type: 'local',
    currentSpeed: 45, maxSpeed: 80, currentStation: 'AGR', nextStation: 'GWL',
    delay: 2, position: { x: 295, y: 285 }, direction: 'east', status: 'running'
  },
  {
    id: 'T005', number: '56789', name: 'Freight Special', type: 'freight',
    currentSpeed: 35, maxSpeed: 60, currentStation: 'BPL', nextStation: 'GWL',
    delay: 8, position: { x: 195, y: 445 }, direction: 'north', status: 'running'
  },
  {
    id: 'T006', number: '12903', name: 'Golden Temple Mail', type: 'express',
    currentSpeed: 95, maxSpeed: 130, currentStation: 'JPR', nextStation: 'DEL',
    delay: 0, position: { x: 135, y: 315 }, direction: 'north', status: 'running'
  },
  {
    id: 'T007', number: '12615', name: 'Grand Trunk Express', type: 'express',
    currentSpeed: 80, maxSpeed: 120, currentStation: 'GWL', nextStation: 'BPL',
    delay: 12, position: { x: 315, y: 375 }, direction: 'south', status: 'running'
  },
  {
    id: 'T008', number: '14717', name: 'BKN-JP Express', type: 'express',
    currentSpeed: 70, maxSpeed: 110, currentStation: 'JPR', nextStation: 'AGR',
    delay: 3, position: { x: 125, y: 325 }, direction: 'east', status: 'running'
  },
  {
    id: 'T009', number: '19665', name: 'Kurukshetra Express', type: 'express',
    currentSpeed: 0, maxSpeed: 120, currentStation: 'GZB', nextStation: 'DEL',
    delay: 25, position: { x: 350, y: 120 }, direction: 'west', status: 'stopped'
  },
  {
    id: 'T010', number: '52456', name: 'Local Goods', type: 'freight',
    currentSpeed: 25, maxSpeed: 50, currentStation: 'AGR', nextStation: 'DEL',
    delay: 5, position: { x: 275, y: 275 }, direction: 'north', status: 'running'
  },
  {
    id: 'T011', number: '12049', name: 'Dadar Express', type: 'express',
    currentSpeed: 90, maxSpeed: 130, currentStation: 'BPL', nextStation: 'AGR',
    delay: 0, position: { x: 185, y: 455 }, direction: 'north', status: 'running'
  },
  {
    id: 'T012', number: '54123', name: 'Passenger Local', type: 'local',
    currentSpeed: 40, maxSpeed: 75, currentStation: 'DEL', nextStation: 'JPR',
    delay: 7, position: { x: 205, y: 155 }, direction: 'south', status: 'running'
  },
  {
    id: 'T013', number: '19711', name: 'JP-BPL Express', type: 'express',
    currentSpeed: 85, maxSpeed: 120, currentStation: 'JPR', nextStation: 'BPL',
    delay: 0, position: { x: 130, y: 330 }, direction: 'south', status: 'running'
  },
  {
    id: 'T014', number: '58901', name: 'Goods Special', type: 'freight',
    currentSpeed: 30, maxSpeed: 55, currentStation: 'GWL', nextStation: 'AGR',
    delay: 10, position: { x: 310, y: 385 }, direction: 'west', status: 'running'
  },
  {
    id: 'T015', number: '12919', name: 'Malwa Express', type: 'express',
    currentSpeed: 0, maxSpeed: 130, currentStation: 'AGR', nextStation: 'JPR',
    delay: 18, position: { x: 280, y: 280 }, direction: 'west', status: 'delayed'
  }
];

export const conflicts: Conflict[] = [
  {
    id: 'C001',
    type: 'junction',
    description: 'Platform conflict at New Delhi - trains T001 and T003 requiring same platform',
    severity: 'critical',
    trains: ['T001', 'T003'],
    location: 'New Delhi Junction',
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    id: 'C002',
    type: 'signal',
    description: 'Signal failure causing delay for T009 at Ghaziabad',
    severity: 'warning',
    trains: ['T009'],
    location: 'Ghaziabad Signal Box',
    timestamp: new Date(Date.now() - 15 * 60000)
  },
  {
    id: 'C003',
    type: 'platform',
    description: 'Platform capacity exceeded at Agra Cantt - T015 delayed',
    severity: 'warning',
    trains: ['T015'],
    location: 'Agra Cantt Platform 3',
    timestamp: new Date(Date.now() - 8 * 60000)
  }
];

export const alerts: Alert[] = [
  {
    id: 'A001',
    type: 'weather',
    message: 'Heavy fog expected in Delhi-Ghaziabad sector, reduce speeds',
    severity: 'warning',
    timestamp: new Date(Date.now() - 30 * 60000),
    isRead: false
  },
  {
    id: 'A002',
    type: 'maintenance',
    message: 'Track maintenance scheduled on Platform 2, New Delhi at 14:00',
    severity: 'info',
    timestamp: new Date(Date.now() - 45 * 60000),
    isRead: true
  },
  {
    id: 'A003',
    type: 'system',
    message: 'Communication system restored on all sectors',
    severity: 'info',
    timestamp: new Date(Date.now() - 20 * 60000),
    isRead: false
  },
  {
    id: 'A004',
    type: 'emergency',
    message: 'Emergency braking reported by T009 - investigating',
    severity: 'critical',
    timestamp: new Date(Date.now() - 10 * 60000),
    isRead: false
  }
];