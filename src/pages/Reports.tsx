import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  Filter,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  FileSpreadsheet
} from 'lucide-react';
import { format } from 'date-fns';

export default function Reports() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 20),
    to: new Date()
  });

  const reportTemplates = [
    {
      id: 'daily_operations',
      name: 'Daily Operations Summary',
      description: 'Comprehensive daily performance and incident report',
      category: 'Operations',
      frequency: 'Daily',
      lastGenerated: '2024-01-28 06:00',
      size: '2.3 MB'
    },
    {
      id: 'performance_analysis',
      name: 'Performance Analysis Report',
      description: 'On-time performance, delays, and efficiency metrics',
      category: 'Performance',
      frequency: 'Weekly',
      lastGenerated: '2024-01-27 23:30',
      size: '5.7 MB'
    },
    {
      id: 'safety_incidents',
      name: 'Safety & Incident Report',
      description: 'Safety incidents, near-misses, and corrective actions',
      category: 'Safety',
      frequency: 'Weekly',
      lastGenerated: '2024-01-27 18:15',
      size: '1.8 MB'
    },
    {
      id: 'maintenance_summary',
      name: 'Maintenance Summary',
      description: 'Scheduled and emergency maintenance activities',
      category: 'Maintenance',
      frequency: 'Monthly',
      lastGenerated: '2024-01-25 12:00',
      size: '4.2 MB'
    },
    {
      id: 'financial_summary',
      name: 'Financial Performance Report',
      description: 'Revenue, costs, and financial KPIs',
      category: 'Financial',
      frequency: 'Monthly',
      lastGenerated: '2024-01-24 09:30',
      size: '3.1 MB'
    }
  ];

  const recentReports = [
    {
      id: 'r001',
      name: 'Weekly Performance Analysis - Week 4',
      type: 'Performance',
      generatedOn: '2024-01-28 09:15',
      status: 'Completed',
      size: '5.7 MB',
      downloadUrl: '#'
    },
    {
      id: 'r002',
      name: 'Daily Operations - January 28',
      type: 'Operations',
      generatedOn: '2024-01-28 06:00',
      status: 'Completed',
      size: '2.3 MB',
      downloadUrl: '#'
    },
    {
      id: 'r003',
      name: 'Safety Incident Report - Week 4',
      type: 'Safety',
      generatedOn: '2024-01-27 18:15',
      status: 'Processing',
      size: 'N/A',
      downloadUrl: null
    },
    {
      id: 'r004',
      name: 'Monthly Maintenance Summary - January',
      type: 'Maintenance',
      generatedOn: '2024-01-27 15:30',
      status: 'Failed',
      size: 'N/A',
      downloadUrl: null
    }
  ];

  const kpiMetrics = [
    { label: 'Total Reports Generated', value: '2,847', trend: '+12%', color: 'success' },
    { label: 'Automated Reports', value: '2,156', trend: '+18%', color: 'primary' },
    { label: 'Average Processing Time', value: '3.2 min', trend: '-15%', color: 'success' },
    { label: 'Failed Generations', value: '23', trend: '-5%', color: 'warning' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <Badge variant={metric.color as any} className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="custom">Custom Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>{template.name}</span>
                    </CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <div className="font-medium">{template.frequency}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">File Size:</span>
                      <div className="font-medium">{template.size}</div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last generated: {template.lastGenerated}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{report.generatedOn}</span>
                        <span>•</span>
                        <span>{report.type}</span>
                        {report.size !== 'N/A' && (
                          <>
                            <span>•</span>
                            <span>{report.size}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={
                        report.status === 'Completed' ? 'success' :
                        report.status === 'Processing' ? 'warning' : 'destructive'
                      }>
                        {report.status === 'Completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {report.status === 'Processing' && <Clock className="h-3 w-3 mr-1" />}
                        {report.status === 'Failed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {report.status}
                      </Badge>
                      {report.downloadUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Report Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Daily Operations Summary</h4>
                    <p className="text-sm text-muted-foreground">Every day at 06:00</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next: </span>
                    <span className="font-medium">Tomorrow 06:00</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Disable</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Weekly Performance Report</h4>
                    <p className="text-sm text-muted-foreground">Every Sunday at 23:30</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next: </span>
                    <span className="font-medium">Sunday 23:30</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Disable</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg opacity-50">
                  <div>
                    <h4 className="font-medium">Monthly Financial Summary</h4>
                    <p className="text-sm text-muted-foreground">1st of every month at 09:00</p>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next: </span>
                    <span className="font-medium">-</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="default">Enable</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="Enter report name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="custom">Custom Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Date Range</Label>
                <div className="flex space-x-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(range) => setDateRange(range as any || { from: undefined, to: undefined })}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Include Sections</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Executive Summary',
                    'Performance Metrics',
                    'Incident Analysis',
                    'Financial Data',
                    'Maintenance Records',
                    'Safety Statistics',
                    'Route Analysis',
                    'Recommendations'
                  ].map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <input type="checkbox" id={section} className="rounded" defaultChecked />
                      <Label htmlFor={section} className="text-sm">{section}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>PDF Report</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="excel">
                      <div className="flex items-center space-x-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        <span>Excel Workbook</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="csv">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>CSV Data</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  Save as Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}