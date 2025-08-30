import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  X,
  Bell,
  CloudRain,
  Zap,
  Construction
} from 'lucide-react';
import { Alert } from '../types/railway';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notifications: Alert[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationModal({ 
  open, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationModalProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string, severity: string) => {
    if (severity === 'critical') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (severity === 'warning') return <Clock className="h-4 w-4 text-warning" />;
    if (severity === 'info') return <CheckCircle className="h-4 w-4 text-primary" />;
    
    switch (type) {
      case 'weather': return <CloudRain className="h-4 w-4 text-primary" />;
      case 'system': return <Zap className="h-4 w-4 text-success" />;
      case 'maintenance': return <Construction className="h-4 w-4 text-warning" />;
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'default';
      default: return 'secondary';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>System Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} unread
                </Badge>
              )}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button size="sm" variant="outline" onClick={onMarkAllAsRead}>
                  Mark all as read
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2" />
                <p>No notifications available</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-colors cursor-pointer hover:bg-muted/50 ${
                    !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
                  }`}
                  onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type, notification.severity)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Badge 
                          variant={getSeverityColor(notification.severity) as any}
                          className="text-xs"
                        >
                          {notification.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-foreground mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {notifications.length > 10 && (
          <div className="text-center pt-4 border-t">
            <Button variant="outline" size="sm">
              View All Notifications
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}