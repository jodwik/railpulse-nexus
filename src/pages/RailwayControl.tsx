import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { RailwayMap } from '../components/RailwayMap';
import { ControlPanel } from '../components/ControlPanel';
import { NotificationModal } from '../components/NotificationModal';
import { ControllerModal } from '../components/ControllerModal';
import { trains as initialTrains, stations, conflicts, alerts } from '../data/sampleData';
import { Train, Conflict } from '../types/railway';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Simulations from './Simulations';
import Reports from './Reports';
import Settings from './Settings';
import PriorityManagement from './PriorityManagement';
import TrafficManagement from './TrafficManagement';

export default function RailwayControl() {
  const [trains, setTrains] = useState<Train[]>(initialTrains);
  const [activeSection, setActiveSection] = useState('operations');
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'degraded'>('online');
  const [unreadNotifications, setUnreadNotifications] = useState(alerts.filter(a => !a.isRead).length);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showController, setShowController] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains(prevTrains => 
        prevTrains.map(train => ({
          ...train,
          position: {
            x: train.position.x + (Math.random() - 0.5) * 2,
            y: train.position.y + (Math.random() - 0.5) * 2
          },
          currentSpeed: train.status === 'running' 
            ? Math.max(0, train.currentSpeed + (Math.random() - 0.5) * 10)
            : 0
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTrainClick = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleDecision = (conflictId: string, decision: 'allow' | 'hold' | 'reroute') => {
    console.log(`Decision for conflict ${conflictId}: ${decision}`);
    // In a real application, this would make an API call
  };

  const handleMarkAsRead = (id: string) => {
    // Mark notification as read
    setUnreadNotifications(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setUnreadNotifications(0);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'operations': return (
        <div className="p-4 flex space-x-4">
          <div className="flex-1 min-w-0">
            <RailwayMap 
              trains={trains}
              stations={stations}
              onTrainClick={handleTrainClick}
            />
          </div>
          <div className="w-96 flex-shrink-0">
            <ControlPanel 
              trains={trains}
              conflicts={conflicts}
              alerts={alerts}
              onDecision={handleDecision}
            />
          </div>
        </div>
      );
      case 'analytics': return <Analytics />;
      case 'priority': return <PriorityManagement />;
      case 'traffic': return <TrafficManagement />;
      case 'simulations': return <Simulations />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return (
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-muted-foreground">This section is under development.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header 
        systemStatus={systemStatus} 
        unreadNotifications={unreadNotifications}
        onNotificationClick={() => setShowNotifications(true)}
        onProfileClick={() => setShowController(true)}
      />
      
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        {renderActiveSection()}
      </div>

      <NotificationModal
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={alerts}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <ControllerModal
        open={showController}
        onClose={() => setShowController(false)}
      />
    </div>
  );
}