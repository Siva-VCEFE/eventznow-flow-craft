
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  const overviewStats = [
    {
      title: "Total Revenue",
      value: "$48,532",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Events",
      value: "28",
      change: "+8 this month",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Total Participants",
      value: "2,847",
      change: "+23% from last month",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Conversion Rate",
      value: "68.4%",
      change: "+5.2% from last month",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const eventPerformance = [
    {
      name: "Tech Conference 2024",
      registrations: 245,
      revenue: "$18,900",
      conversionRate: "72%",
      status: "Completed"
    },
    {
      name: "Product Launch Webinar",
      registrations: 189,
      revenue: "$0",
      conversionRate: "89%",
      status: "Active"
    },
    {
      name: "Marketing Workshop",
      registrations: 156,
      revenue: "$7,800",
      conversionRate: "65%",
      status: "Upcoming"
    },
    {
      name: "Design Thinking Session",
      registrations: 98,
      revenue: "$4,900",
      conversionRate: "58%",
      status: "Completed"
    }
  ];

  const registrationTrends = [
    { month: "Jan", registrations: 120, revenue: 6000 },
    { month: "Feb", registrations: 180, revenue: 9000 },
    { month: "Mar", registrations: 240, revenue: 12000 },
    { month: "Apr", registrations: 200, revenue: 10000 },
    { month: "May", registrations: 290, revenue: 14500 },
    { month: "Jun", registrations: 350, revenue: 17500 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-1">Track performance and insights across all your events</p>
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

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Registration Trends Chart */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Registration Trends
                  </CardTitle>
                  <CardDescription>Monthly registration and revenue growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Registration trends chart would be displayed here</p>
                      <p className="text-sm text-gray-400 mt-1">Integration with chart library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Types Distribution */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Event Categories
                  </CardTitle>
                  <CardDescription>Distribution of events by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Event distribution pie chart would be displayed here</p>
                      <p className="text-sm text-gray-400 mt-1">Shows breakdown by event types</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Insights */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Important metrics and trends from your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900">Peak Registration Day</h3>
                    <p className="text-blue-700">Tuesdays see 35% more registrations</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-900">Best Performing Event</h3>
                    <p className="text-green-700">Tech Conference had 95% attendance</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-purple-900">Audience Growth</h3>
                    <p className="text-purple-700">23% increase in repeat attendees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Event Performance Analysis</CardTitle>
                <CardDescription>Detailed performance metrics for each event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventPerformance.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{event.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{event.registrations} registrations</span>
                          <span>•</span>
                          <span>{event.conversionRate} conversion rate</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            event.status === 'Active' ? 'bg-green-100 text-green-800' :
                            event.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{event.revenue}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Participant Demographics</CardTitle>
                  <CardDescription>Breakdown of participant characteristics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Age 18-25</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/4 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Age 26-35</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Age 36+</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/5 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Participant Engagement</CardTitle>
                  <CardDescription>How participants interact with events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Event Attendance Rate</span>
                      <span className="text-lg font-semibold text-gray-900">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Session Duration</span>
                      <span className="text-lg font-semibold text-gray-900">2.3 hrs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Repeat Participants</span>
                      <span className="text-lg font-semibold text-gray-900">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Post-Event Surveys</span>
                      <span className="text-lg font-semibold text-gray-900">4.6/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Revenue by Event Type</CardTitle>
                  <CardDescription>Revenue breakdown across different event categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium text-blue-900">Conferences</span>
                      <span className="font-bold text-blue-900">$28,400</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium text-green-900">Workshops</span>
                      <span className="font-bold text-green-900">$12,800</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium text-purple-900">Webinars</span>
                      <span className="font-bold text-purple-900">$7,332</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>How participants prefer to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Credit/Debit Cards</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-4/5 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Digital Wallets</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/5 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bank Transfer</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div className="w-1/12 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">7%</span>
                      </div>
                    </div>
                  </div>
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
