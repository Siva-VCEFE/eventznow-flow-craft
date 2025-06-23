import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Plus, 
  Settings,
  Bell,
  Search,
  MoreVertical,
  MapPin,
  Clock,
  UserCheck,
  Eye,
  Edit,
  Share2,
  Phone,
  Mail,
  CheckSquare,
  PlayCircle,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Events",
      value: "12",
      change: "+2 from last month",
      icon: Calendar,
      color: "text-blue-600",
      onClick: () => navigate('/events')
    },
    {
      title: "Total Registrations",
      value: "1,243",
      change: "+15% from last month",
      icon: Users,
      color: "text-green-600",
      onClick: () => navigate('/participants')
    },
    {
      title: "Revenue",
      value: "₹17,25,890",
      change: "+8% from last month",
      icon: IndianRupee,
      color: "text-purple-600",
      onClick: () => navigate('/analytics')
    },
    {
      title: "Active Tasks",
      value: "28",
      change: "4 due today",
      icon: TrendingUp,
      color: "text-orange-600",
      onClick: () => navigate('/tasks')
    }
  ];

  const recentEvents = [
    {
      id: 1,
      name: "Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Mumbai, India",
      registrations: 145,
      status: "Active",
      revenue: "₹8,75,000",
      paidCount: 98,
      attendedCount: 0, // Event hasn't happened yet
      feedbackCount: 0,
      isUpcoming: true
    },
    {
      id: 2,
      name: "Product Launch Webinar",
      date: "2024-03-18",
      time: "02:00 PM",
      location: "Online",
      registrations: 89,
      status: "Active",
      revenue: "₹0",
      paidCount: 0,
      attendedCount: 0,
      feedbackCount: 0
    },
    {
      id: 3,
      name: "Marketing Workshop",
      date: "2024-03-22",
      time: "10:00 AM",
      location: "Delhi, India",
      registrations: 67,
      status: "Draft",
      revenue: "₹2,38,000",
      paidCount: 45,
      attendedCount: 0,
      feedbackCount: 0
    }
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Follow up with VIP attendees",
      event: "Tech Conference 2024",
      assignee: "Sarah Johnson",
      dueDate: "Today",
      priority: "High",
      timeSpent: "2.5h",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Setup registration desk",
      event: "Product Launch Webinar",
      assignee: "Mike Chen",
      dueDate: "Tomorrow",
      priority: "Medium",
      timeSpent: "1.2h"
    },
    {
      id: 3,
      title: "Send welcome emails",
      event: "Marketing Workshop",
      assignee: "Lisa Park",
      dueDate: "Mar 20",
      priority: "Low",
      timeSpent: "0.8h"
    }
  ];

  const handleEventAction = (eventId: number, action: string) => {
    switch(action) {
      case 'view':
        navigate(`/events/${eventId}`);
        break;
      case 'edit':
        navigate(`/create-event?edit=${eventId}`);
        break;
      case 'participants':
        navigate(`/participants?event=${eventId}`);
        break;
      case 'tasks':
        navigate(`/tasks?event=${eventId}`);
        break;
      case 'analytics':
        navigate(`/analytics?event=${eventId}`);
        break;
      case 'share':
        // Handle sharing functionality
        console.log('Sharing event', eventId);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleTaskAction = (taskId: number, action: string) => {
    switch(action) {
      case 'view':
        navigate(`/tasks?highlight=${taskId}`);
        break;
      case 'edit':
        navigate(`/tasks?edit=${taskId}`);
        break;
      case 'complete':
        console.log('Completing task', taskId);
        break;
      case 'assign':
        console.log('Reassigning task', taskId);
        break;
      default:
        console.log('Unknown task action:', action);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your events.</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => navigate('/create-event')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats Grid - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={stat.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="events">Recent Events</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Events</CardTitle>
                    <CardDescription>Manage your upcoming and ongoing events</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/events')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{event.name}</h4>
                          <Badge variant={event.status === 'Active' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <UserCheck className="w-4 h-4" />
                            {event.registrations} registered
                          </div>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>Paid: {event.paidCount}</span>
                          {event.isUpcoming ? (
                            <span>Attendance: Will be marked on event day</span>
                          ) : (
                            <span>Attended: {event.attendedCount}</span>
                          )}
                          <span>Feedback: {event.feedbackCount}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-center sm:text-right">
                          <p className="font-semibold text-gray-900">{event.revenue}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEventAction(event.id, 'view')}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEventAction(event.id, 'edit')}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEventAction(event.id, 'participants')}>
                              <Users className="w-4 h-4 mr-2" />
                              View Participants
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEventAction(event.id, 'tasks')}>
                              <CheckSquare className="w-4 h-4 mr-2" />
                              Manage Tasks
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEventAction(event.id, 'analytics')}>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEventAction(event.id, 'share')}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Tasks</CardTitle>
                    <CardDescription>Track and manage your team's tasks with time tracking</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/tasks')}>
                    <Plus className="w-4 h-4 mr-2" />
                    View All Tasks
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <Badge variant={
                            task.priority === 'High' ? 'destructive' : 
                            task.priority === 'Medium' ? 'default' : 'secondary'
                          }>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline">
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>Event: {task.event}</span>
                          <span>•</span>
                          <span>Assigned to: {task.assignee}</span>
                          <span>•</span>
                          <span>Due: {task.dueDate}</span>
                          <span>•</span>
                          <span className="text-blue-600 font-medium">Time: {task.timeSpent}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {task.status === 'In Progress' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleTaskAction(task.id, 'complete')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckSquare className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleTaskAction(task.id, 'view')}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Task
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTaskAction(task.id, 'edit')}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTaskAction(task.id, 'assign')}>
                              <Users className="w-4 h-4 mr-2" />
                              Reassign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics')}>
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Track registration patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                      <p>Click to view detailed analytics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/analytics')}>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monitor your event revenue streams in INR</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <IndianRupee className="w-12 h-12 mx-auto mb-2 text-green-600" />
                      <p>Click to view revenue reports</p>
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

export default Dashboard;
