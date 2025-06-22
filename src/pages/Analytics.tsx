
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar,
  DollarSign,
  Download,
  Eye,
  Share2,
  BarChart3
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  const analyticsData = {
    overview: {
      totalEvents: 12,
      totalRegistrations: 1243,
      totalRevenue: 24567,
      averageAttendance: 89,
      trends: {
        events: 15.2,
        registrations: 23.4,
        revenue: 8.7,
        attendance: -2.1
      }
    },
    eventBreakdown: [
      {
        name: "Tech Conference 2024",
        registrations: 145,
        revenue: 12500,
        attendanceRate: 92,
        status: "Active"
      },
      {
        name: "Product Launch Webinar",
        registrations: 89,
        revenue: 0,
        attendanceRate: 78,
        status: "Completed"
      },
      {
        name: "Marketing Workshop",
        registrations: 67,
        revenue: 3400,
        attendanceRate: 95,
        status: "Active"
      }
    ],
    demographics: {
      byLocation: [
        { location: "California", count: 342, percentage: 27.5 },
        { location: "New York", count: 256, percentage: 20.6 },
        { location: "Texas", count: 189, percentage: 15.2 },
        { location: "Florida", count: 145, percentage: 11.7 },
        { location: "Others", count: 311, percentage: 25.0 }
      ],
      byCompany: [
        { company: "Tech Corp", count: 45, percentage: 3.6 },
        { company: "Innovation Labs", count: 38, percentage: 3.1 },
        { company: "StartupX", count: 32, percentage: 2.6 },
        { company: "Digital Agency", count: 28, percentage: 2.3 },
        { company: "Others", count: 1100, percentage: 88.4 }
      ]
    },
    performance: {
      registrationTrends: [
        { month: "Jan", registrations: 156 },
        { month: "Feb", registrations: 234 },
        { month: "Mar", registrations: 189 },
        { month: "Apr", registrations: 267 },
        { month: "May", registrations: 298 },
        { month: "Jun", registrations: 234 }
      ],
      revenueTrends: [
        { month: "Jan", revenue: 4500 },
        { month: "Feb", revenue: 6700 },
        { month: "Mar", revenue: 5200 },
        { month: "Apr", revenue: 8900 },
        { month: "May", revenue: 12400 },
        { month: "Jun", revenue: 9800 }
      ]
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, prefix = "", suffix = "" }: any) => (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{prefix}{value.toLocaleString()}{suffix}</p>
            <div className="flex items-center gap-1 mt-1">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}% from last month
              </span>
            </div>
          </div>
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into your event performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Events"
            value={analyticsData.overview.totalEvents}
            change={analyticsData.overview.trends.events}
            icon={Calendar}
          />
          <MetricCard
            title="Total Registrations"
            value={analyticsData.overview.totalRegistrations}
            change={analyticsData.overview.trends.registrations}
            icon={Users}
          />
          <MetricCard
            title="Total Revenue"
            value={analyticsData.overview.totalRevenue}
            change={analyticsData.overview.trends.revenue}
            icon={DollarSign}
            prefix="$"
          />
          <MetricCard
            title="Avg Attendance"
            value={analyticsData.overview.averageAttendance}
            change={analyticsData.overview.trends.attendance}
            icon={BarChart3}
            suffix="%"
          />
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Event Performance Breakdown</CardTitle>
                <CardDescription>Detailed metrics for each event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.eventBreakdown.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{event.name}</h4>
                          <Badge variant={event.status === 'Active' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Registrations</p>
                            <p className="font-semibold">{event.registrations}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-semibold">${event.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Attendance Rate</p>
                            <p className="font-semibold">{event.attendanceRate}%</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Participants by Location</CardTitle>
                  <CardDescription>Geographic distribution of registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.demographics.byLocation.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          <span className="font-medium">{item.location}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.count}</p>
                          <p className="text-sm text-gray-600">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Top Companies</CardTitle>
                  <CardDescription>Organizations with most registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.demographics.byCompany.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                          <span className="font-medium">{item.company}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.count}</p>
                          <p className="text-sm text-gray-600">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Monthly registration statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Registration trends chart would go here
                    <div className="ml-4 text-sm">
                      {analyticsData.performance.registrationTrends.map((item, index) => (
                        <div key={index} className="flex justify-between w-24">
                          <span>{item.month}:</span>
                          <span>{item.registrations}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Revenue trends chart would go here
                    <div className="ml-4 text-sm">
                      {analyticsData.performance.revenueTrends.map((item, index) => (
                        <div key={index} className="flex justify-between w-24">
                          <span>{item.month}:</span>
                          <span>${item.revenue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Event Summary Report</CardTitle>
                  <CardDescription>Complete overview of all events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Participant List</CardTitle>
                  <CardDescription>Detailed participant information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Financial Report</CardTitle>
                  <CardDescription>Revenue and payment breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
