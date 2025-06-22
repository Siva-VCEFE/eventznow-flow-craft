
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  Share2,
  Edit,
  Settings,
  Phone,
  Mail,
  FileText,
  Plus,
  CheckCircle,
  Circle,
  User
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const event = {
    id: 1,
    name: "Tech Conference 2024",
    description: "Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders and innovators for three days of learning and networking.",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    location: "San Francisco Convention Center",
    address: "747 Howard St, San Francisco, CA 94103",
    organizers: ["John Doe", "Sarah Johnson"],
    registrations: 145,
    maxParticipants: 500,
    status: "Active",
    revenue: "$12,500",
    type: "Paid",
    registrationLink: "https://eventznow.com/register/tech-conf-2024"
  };

  const participants = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1-555-0123",
      registrationDate: "2024-02-15",
      status: "Confirmed",
      lastCalled: "2024-02-20",
      callNotes: "Interested in AI workshops"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+1-555-0124",
      registrationDate: "2024-02-16",
      status: "Confirmed",
      lastCalled: null,
      callNotes: ""
    },
    {
      id: 3,
      name: "David Chen",
      email: "david@example.com",
      phone: "+1-555-0125",
      registrationDate: "2024-02-17",
      status: "Pending",
      lastCalled: "2024-02-18",
      callNotes: "Requested vegetarian meal option"
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Follow up with VIP attendees",
      description: "Contact all VIP ticket holders for special arrangements",
      assignee: "Sarah Johnson",
      dueDate: "2024-03-10",
      status: "In Progress",
      priority: "High"
    },
    {
      id: 2,
      title: "Setup registration desk",
      description: "Prepare registration area with banners and materials",
      assignee: "Mike Chen",
      dueDate: "2024-03-14",
      status: "Pending",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Send welcome emails",
      description: "Send event details and schedule to all registered participants",
      assignee: "Lisa Park",
      dueDate: "2024-03-12",
      status: "Completed",
      priority: "Low"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
              <Badge variant={event.status === 'Active' ? 'default' : 'secondary'}>
                {event.status}
              </Badge>
            </div>
            <p className="text-gray-600">{event.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Event Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{event.registrations}</p>
                  <p className="text-xs text-gray-500">of {event.maxParticipants} max</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{event.revenue}</p>
                  <p className="text-xs text-gray-500">Total earned</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Date</p>
                  <p className="text-lg font-bold text-gray-900">{event.startDate}</p>
                  <p className="text-xs text-gray-500">{event.startTime}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-lg font-bold text-gray-900">SF Center</p>
                  <p className="text-xs text-gray-500">Convention Hall</p>
                </div>
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="participants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Participants</CardTitle>
                    <CardDescription>Manage event registrations and participant communications</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Export List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                          <Badge variant={participant.status === 'Confirmed' ? 'default' : 'secondary'}>
                            {participant.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {participant.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {participant.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Registered: {participant.registrationDate}
                          </div>
                        </div>
                        {participant.callNotes && (
                          <div className="mt-2 text-sm text-gray-700">
                            <strong>Last call notes:</strong> {participant.callNotes}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
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
                    <CardTitle>Event Tasks</CardTitle>
                    <CardDescription>Track and manage event preparation tasks</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="mt-1">
                        {task.status === 'Completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <Badge variant={
                            task.priority === 'High' ? 'destructive' : 
                            task.priority === 'Medium' ? 'default' : 'secondary'
                          }>
                            {task.priority}
                          </Badge>
                          <Badge variant={
                            task.status === 'Completed' ? 'default' :
                            task.status === 'In Progress' ? 'secondary' : 'outline'
                          }>
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {task.assignee}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {task.dueDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Registration Link</CardTitle>
                <CardDescription>Share this link with potential participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={event.registrationLink} 
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <Button>Copy Link</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Daily registration statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Registration chart would go here
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Participant Demographics</CardTitle>
                  <CardDescription>Breakdown by location and company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Demographics chart would go here
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

export default EventDetails;
