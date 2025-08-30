import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  Shield, 
  Clock,
  Award,
  Activity,
  LogOut,
  Edit,
  Save,
  X
} from 'lucide-react';

interface ControllerModalProps {
  open: boolean;
  onClose: () => void;
}

interface ControllerProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  experience: string;
  certifications: string[];
  currentShift: string;
  lastLogin: string;
  sessionsToday: number;
  averageResponseTime: string;
}

export function ControllerModal({ open, onClose }: ControllerModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ControllerProfile>({
    id: 'CTRL001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@railways.in',
    role: 'Senior Traffic Controller',
    department: 'Central Command',
    experience: '8 years',
    certifications: ['Railway Safety', 'Traffic Management', 'Emergency Response'],
    currentShift: 'Morning (06:00 - 14:00)',
    lastLogin: '2024-01-28 05:58',
    sessionsToday: 3,
    averageResponseTime: '2.3 seconds'
  });

  const recentActivities = [
    { time: '09:15', action: 'Resolved signal conflict at Junction 12', status: 'completed' },
    { time: '08:42', action: 'Approved route change for Express 12001', status: 'completed' },
    { time: '08:20', action: 'Updated weather advisory for Delhi sector', status: 'completed' },
    { time: '07:55', action: 'Handled emergency braking incident', status: 'completed' },
    { time: '07:30', action: 'Completed shift handover documentation', status: 'completed' }
  ];

  const shiftMetrics = {
    trainsHandled: 47,
    decisionsRequired: 12,
    decisionsResolved: 11,
    averageResponseTime: '2.3s',
    alertsProcessed: 23,
    incidentsManaged: 3
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real application, this would save to backend
    console.log('Saving profile...', profile);
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    onClose();
    // In a real application, this would handle logout
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Controller Profile</span>
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="metrics">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-start space-x-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/controller-avatar.jpg" />
                  <AvatarFallback className="text-xl">RK</AvatarFallback>
                </Avatar>
                <Badge variant="success">On Duty</Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{profile.name}</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      disabled={!isEditing}
                      onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      disabled={!isEditing}
                      onChange={(e) => setProfile(prev => ({ ...prev, department: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={profile.experience}
                      disabled={!isEditing}
                      onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleSaveProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{shiftMetrics.trainsHandled}</div>
                  <div className="text-sm text-muted-foreground">Trains Handled Today</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">{shiftMetrics.decisionsResolved}</div>
                  <div className="text-sm text-muted-foreground">Decisions Resolved</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{shiftMetrics.averageResponseTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Shift Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Decision Resolution Rate</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full" 
                          style={{ width: `${(shiftMetrics.decisionsResolved / shiftMetrics.decisionsRequired) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round((shiftMetrics.decisionsResolved / shiftMetrics.decisionsRequired) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold">{shiftMetrics.alertsProcessed}</div>
                      <div className="text-sm text-muted-foreground">Alerts Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{shiftMetrics.incidentsManaged}</div>
                      <div className="text-sm text-muted-foreground">Incidents Managed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm font-mono text-muted-foreground min-w-[48px]">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                      </div>
                      <Badge variant="success" className="text-xs">
                        Completed
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Current Shift</span>
                    <div className="font-medium">{profile.currentShift}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Last Login</span>
                    <div className="font-medium">{profile.lastLogin}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Sessions Today</span>
                    <div className="font-medium">{profile.sessionsToday}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Avg Response Time</span>
                    <div className="font-medium">{profile.averageResponseTime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Personal Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email alerts for critical incidents</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Alerts</Label>
                    <p className="text-sm text-muted-foreground">Play sound for urgent notifications</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-refresh Dashboard</Label>
                    <p className="text-sm text-muted-foreground">Automatically update data every 5 seconds</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Update Security Questions
                </Button>
                <Button variant="outline" className="w-full">
                  Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}