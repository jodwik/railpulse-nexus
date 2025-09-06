import { Bell, User, ChevronDown, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import indianRailwaysLogo from '@/assets/indian-railways-logo.png';

interface HeaderProps {
  systemStatus: 'online' | 'offline' | 'degraded';
  unreadNotifications: number;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export function Header({ systemStatus, unreadNotifications, onNotificationClick, onProfileClick }: HeaderProps) {
  const currentTime = new Date().toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'online': return 'text-success';
      case 'offline': return 'text-destructive';
      case 'degraded': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    return systemStatus === 'offline' ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />;
  };

  return (
    <header className="h-16 bg-gradient-header border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={indianRailwaysLogo} alt="Indian Railways" className="h-10 w-10" />
        <div>
          <h1 className="text-xl font-bold text-primary-foreground">Railway Traffic Control</h1>
          <p className="text-sm text-primary-foreground/80">Central Command Center</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* System Status */}
        <div className="flex items-center space-x-2">
          <div className={`${getStatusColor()}`}>
            {getStatusIcon()}
          </div>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {systemStatus.toUpperCase()}
          </span>
          {systemStatus === 'online' && (
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Current Time */}
        <div className="text-sm text-primary-foreground/90 font-mono">
          {currentTime}
        </div>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative text-primary-foreground hover:bg-primary-hover"
          onClick={onNotificationClick}
        >
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadNotifications}
            </Badge>
          )}
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-hover">
              <User className="h-5 w-5 mr-2" />
              <span>Controller</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onProfileClick}>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Shift Handover</DropdownMenuItem>
            <DropdownMenuItem>System Logs</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}