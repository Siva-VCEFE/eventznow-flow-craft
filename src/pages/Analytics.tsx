
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  Clock,
  MessageSquare,
  Mail,
  Phone,
  Share2
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import TimeTrackingReports from "@/components/TimeTrackingReports";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("last-30-days");

  const overviewStats = [
    {
      title: "Total Revenue",
      value: "₹33,54,890",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign
    },
    {
      title: "Total Events",
      value: "23",
      change: "+8.3%",
      changeType: "positive",
      icon: Calendar
    },
    {
      title: "Total Participants",
      value: "2,847",
      change: "+15.2%",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Avg Event Revenue",
      value: "₹1,45,865",
      change: "+5.1%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  const eventPerformance = [
    {
      event: "Tech Conference 2024",
      registrations: 145,
      revenue: "₹8,75,000",
      satisfaction: 4.8,
      taskEfficiency: 92,
      teamHours: 65.2,
      roi: 320,
      attendanceRate: 87,
      feedbackCount: 89
    },
    {
      event: "Product Launch Webinar",
      registrations: 89,
      revenue: "₹0",
      satisfaction: 4.2,
      taskEfficiency: 78,
      teamHours: 28.5,
      roi: 0,
      attendanceRate: 94,
      feedbackCount: 56
    },
    {
      event: "Marketing Workshop",
      registrations: 67,
      revenue: "₹2,38,000",
      satisfaction: 4.6,
      taskEfficiency: 85,
      teamHours: 42.8,
      roi: 245,
      attendanceRate: 78,
      feedbackCount: 45
    }
  ];

  const revenueByMonth = [
    { month: "Jan", revenue: 595000, events: 3 },
    { month: "Feb", revenue: 861000, events: 4 },
    { month: "Mar", revenue: 1092000, events: 5 },
    { month: "Apr", revenue: 784000, events: 4 },
    { month: "May", revenue: 1323000, events: 6 },
    { month: "Jun", revenue: 1498000, events: 7 }
  ];

  const participantDemographics = {
    bySource: [
      { source: "Website", count: 1245, percentage: 44 },
      { source: "Social Media", count: 892, percentage: 31 },
      { source: "Email Campaign", count: 456, percentage: 16 },
      { source: "Referral", count: 254, percentage: 9 }
    ],
    byLocation: [
      { location: "Mumbai", count: 658, percentage: 23 },
      { location: "Delhi", count: 542, percentage: 19 },
      { location: "Bangalore", count: 423, percentage: 15 },
      { location: "Chennai", count: 389, percentage: 14 },
      { location: "Other Cities", count: 835, percentage: 29 }
    ]
  };

  const handleShare = (reportType: string, method: string) => {
    const message = `Check out our latest ${reportType} report from EventzNow Analytics`;
    
    switch(method) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(`${reportType} Report`)}&body=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(message)}`);
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into your events, team, and revenue</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <p className={`text-xs mt-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-gray-50">
                        <stat.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue Trend (INR)</CardTitle>
                      <CardDescription>Monthly revenue and event count</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleShare('Revenue Trend', 'whatsapp')}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShare('Revenue Trend', 'email')}>
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Revenue chart visualization would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Event Performance</CardTitle>
                      <CardDescription>Registration vs satisfaction scores</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleShare('Event Performance', 'whatsapp')}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleShare('Event Performance', 'email')}>
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Performance chart visualization would go here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Event Performance Report</CardTitle>
                    <CardDescription>Detailed analysis with ROI calculations and attendance tracking</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare('Event Performance', 'whatsapp')}>
                      <MessageSquare className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare('Event Performance', 'email')}>
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventPerformance.map((event, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-lg">{event.event}</h4>
                        <Badge variant="secondary">{event.registrations} registered</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-semibold text-lg">{event.revenue}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">ROI</p>
                          <p className="font-semibold text-lg text-green-600">
                            {event.roi > 0 ? `${event.roi}%` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Attendance Rate</p>
                          <p className="font-semibold text-lg">{event.attendanceRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Satisfaction</p>
                          <p className="font-semibold text-lg">{event.satisfaction}/5.0</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Team Hours</p>
                          <p className="font-semibold text-lg">{event.teamHours}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Feedback</p>
                          <p className="font-semibold text-lg">{event.feedbackCount}</p>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">ROI Calculation:</h5>
                        <p className="text-sm text-blue-800">
                          {event.roi > 0 ? (
                            `Revenue (${event.revenue}) - Costs (₹${Math.round(parseInt(event.revenue.replace('₹', '').replace(',', '')) / (event.roi/100 + 1)).toLocaleString()}) = Profit of ${event.roi}%`
                          ) : (
                            'Free event - ROI calculated based on lead generation value and team efficiency'
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue by Month (INR)</CardTitle>
                      <CardDescription>Track monthly revenue growth</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('Monthly Revenue', 'whatsapp')}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {revenueByMonth.map((month, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="font-medium">{month.month}</span>
                        <div className="text-right">
                          <p className="font-semibold">₹{month.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{month.events} events</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                  <CardDescription>Breakdown by event type and pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Paid Events</span>
                      <span className="font-semibold">₹31,67,230 (94.4%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Sponsorships</span>
                      <span className="font-semibold">₹1,86,360 (5.6%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Premium Features</span>
                      <span className="font-semibold">₹62,300 (1.9%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Participant Sources</CardTitle>
                      <CardDescription>Where participants are coming from</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('Participant Sources', 'whatsapp')}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {participantDemographics.bySource.map((source, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{source.source}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{source.count}</span>
                          <Badge variant="outline">{source.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Geographic Distribution</CardTitle>
                      <CardDescription>Participant locations across India</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleShare('Geographic Distribution', 'whatsapp')}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {participantDemographics.byLocation.map((location, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{location.location}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{location.count}</span>
                          <Badge variant="outline">{location.percentage}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Participant Engagement Metrics</CardTitle>
                    <CardDescription>Detailed engagement and retention analytics</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare('Engagement Metrics', 'whatsapp')}>
                      <MessageSquare className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare('Engagement Metrics', 'email')}>
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">87%</p>
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">4.6</p>
                    <p className="text-sm text-gray-600">Avg Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">23%</p>
                    <p className="text-sm text-gray-600">Repeat Participants</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">3.2</p>
                    <p className="text-sm text-gray-600">Avg Events per User</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time-tracking">
            <TimeTrackingReports />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
