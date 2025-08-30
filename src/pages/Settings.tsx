import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings as SettingsIcon, 
  Users, 
  Shield, 
  Bell, 
  Database,
  Wifi,
  Monitor,
  Save,
  RotateCcw,
  AlertTriangle,
  Download
} from 'lucide-react';

interface SettingsState {
  notifications: {
    criticalAlerts: boolean;
    systemUpdates: boolean;
    maintenanceReminders: boolean;
    performanceReports: boolean;
  };
  system: {
    autoBackup: boolean;
    realtimeUpdates: boolean;
    advancedAnalytics: boolean;
    experimentalFeatures: boolean;
  };
  display: {
    theme: string;
    refreshRate: string;
    mapDetail: string;
    timezone: string;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      criticalAlerts: true,
      systemUpdates: true,
      maintenanceReminders: true,
      performanceReports: false
    },
    system: {
      autoBackup: true,
      realtimeUpdates: true,
      advancedAnalytics: false,
      experimentalFeatures: false
    },
    display: {
      theme: 'system',
      refreshRate: '5',
      mapDetail: 'high',
      timezone: 'Asia/Kolkata'
    }
  });

  const systemInfo = {
    version: '2.1.0',
    buildDate: '2024-01-15',
    uptime: '15 days, 8 hours',
    lastBackup: '2024-01-28 06:00',
    databaseSize: '2.4 GB',
    activeConnections: 12
  };

  const connectedSystems = [
    { name: 'Signal Management System', status: 'connected', lastSync: '2 min ago' },
    { name: 'Track Monitoring System', status: 'connected', lastSync: '1 min ago' },
    { name: 'Weather Service API', status: 'connected', lastSync: '5 min ago' },
    { name: 'Emergency Services', status: 'degraded', lastSync: '15 min ago' },
    { name: 'Passenger Information System', status: 'disconnected', lastSync: '2 hours ago' }
  ];

  const userRoles = [
    { name: 'System Administrator', users: 2, permissions: 'Full Access' },
    { name: 'Traffic Controller', users: 8, permissions: 'Control Operations' },
    { name: 'Maintenance Supervisor', users: 5, permissions: 'Maintenance & Reports' },
    { name: 'Safety Observer', users: 3, permissions: 'Read-only Access' }
  ];

  const handleSaveSettings = () => {
    console.log('Saving settings...', settings);
    // In a real application, this would save to backend
  };

  const handleResetSettings = () => {
    console.log('Resetting settings to defaults...');
    // Reset to default values
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleResetSettings}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span>Display Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.display.theme} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, display: { ...prev.display, theme: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">Refresh Rate (seconds)</Label>
                  <Select value={settings.display.refreshRate} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, display: { ...prev.display, refreshRate: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 second</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="map-detail">Map Detail Level</Label>
                  <Select value={settings.display.mapDetail} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, display: { ...prev.display, mapDetail: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Performance)</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High (Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.display.timezone} onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, display: { ...prev.display, timezone: value } }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">India Standard Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="h-5 w-5" />
                  <span>System Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Daily system backups at 02:00</p>
                  </div>
                  <Switch 
                    id="auto-backup"
                    checked={settings.system.autoBackup}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, system: { ...prev.system, autoBackup: checked } }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="realtime-updates">Real-time Updates</Label>
                    <p className="text-sm text-muted-foreground">Live data synchronization</p>
                  </div>
                  <Switch 
                    id="realtime-updates"
                    checked={settings.system.realtimeUpdates}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, system: { ...prev.system, realtimeUpdates: checked } }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="advanced-analytics">Advanced Analytics</Label>
                    <p className="text-sm text-muted-foreground">AI-powered insights and predictions</p>
                  </div>
                  <Switch 
                    id="advanced-analytics"
                    checked={settings.system.advancedAnalytics}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, system: { ...prev.system, advancedAnalytics: checked } }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="experimental-features">Experimental Features</Label>
                    <p className="text-sm text-muted-foreground">Beta features and new capabilities</p>
                  </div>
                  <Switch 
                    id="experimental-features"
                    checked={settings.system.experimentalFeatures}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, system: { ...prev.system, experimentalFeatures: checked } }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="critical-alerts">Critical System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Emergency situations and system failures</p>
                </div>
                <Switch 
                  id="critical-alerts"
                  checked={settings.notifications.criticalAlerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, criticalAlerts: checked } }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Software updates and maintenance notices</p>
                </div>
                <Switch 
                  id="system-updates"
                  checked={settings.notifications.systemUpdates}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, systemUpdates: checked } }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
                  <p className="text-sm text-muted-foreground">Scheduled maintenance and inspections</p>
                </div>
                <Switch 
                  id="maintenance-reminders"
                  checked={settings.notifications.maintenanceReminders}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, maintenanceReminders: checked } }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="performance-reports">Performance Reports</Label>
                  <p className="text-sm text-muted-foreground">Daily and weekly performance summaries</p>
                </div>
                <Switch 
                  id="performance-reports"
                  checked={settings.notifications.performanceReports}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, performanceReports: checked } }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="strict">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8 characters)</SelectItem>
                      <SelectItem value="medium">Medium (12 characters + special)</SelectItem>
                      <SelectItem value="strict">Strict (16 characters + complexity)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" defaultChecked />
                    <span className="text-sm text-muted-foreground">Required for all users</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-whitelist">IP Address Whitelist</Label>
                  <Textarea 
                    id="ip-whitelist"
                    placeholder="Enter IP addresses, one per line"
                    rows={4}
                    defaultValue="192.168.1.0/24&#10;10.0.0.0/8&#10;172.16.0.0/12"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Successful Login</div>
                      <div className="text-xs text-muted-foreground">admin@railway.in - 2 min ago</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Failed Login Attempt</div>
                      <div className="text-xs text-muted-foreground">Unknown IP - 15 min ago</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Security Scan Completed</div>
                      <div className="text-xs text-muted-foreground">No issues found - 1 hour ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5" />
                <span>Connected Systems</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedSystems.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'connected' ? 'bg-success' :
                        system.status === 'degraded' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <div>
                        <div className="font-medium">{system.name}</div>
                        <div className="text-sm text-muted-foreground">Last sync: {system.lastSync}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={
                        system.status === 'connected' ? 'success' :
                        system.status === 'degraded' ? 'warning' : 'destructive'
                      }>
                        {system.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {system.status === 'disconnected' ? 'Reconnect' : 'Configure'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Roles & Permissions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {role.users} users • {role.permissions}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Manage Users</Button>
                      <Button size="sm" variant="outline">Edit Permissions</Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add New Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>System Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">{systemInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Build Date</span>
                  <span className="font-medium">{systemInfo.buildDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System Uptime</span>
                  <span className="font-medium">{systemInfo.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Backup</span>
                  <span className="font-medium">{systemInfo.lastBackup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Database Size</span>
                  <span className="font-medium">{systemInfo.databaseSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Connections</span>
                  <span className="font-medium">{systemInfo.activeConnections}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Create System Backup
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export System Logs
                </Button>
                <Button className="w-full" variant="outline">
                  <Monitor className="h-4 w-4 mr-2" />
                  Run System Diagnostics
                </Button>
                <Button className="w-full" variant="destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Restart System Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}