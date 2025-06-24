
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  CheckSquare, 
  Clock,
  Phone,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Activity,
  Target,
  Calendar,
  IndianRupee,
  Share,
  MessageSquare,
  Mail,
  Smartphone
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const agentsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      status: "Active",
      activeTasksToday: 3,
      followupTasksCompleted: 8,
      followupTasksPending: 5,
      totalCallsToday: 12,
      successfulCalls: 9,
      timeSpentToday: "4.5h",
      participantsContacted: 15,
      participantsPending: 8,
      efficiency: 85
    },
    {
      id: 2,
      name: "Mike Chen",
      status: "Active",
      activeTasksToday: 2,
      followupTasksCompleted: 6,
      followupTasksPending: 3,
      totalCallsToday: 8,
      successfulCalls: 6,
      timeSpentToday: "3.2h",
      participantsContacted: 12,
      participantsPending: 4,
      efficiency: 78
    },
    {
      id: 3,
      name: "Lisa Park",
      status: "Inactive",
      activeTasksToday: 0,
      followupTasksCompleted: 4,
      followupTasksPending: 2,
      totalCallsToday: 5,
      successfulCalls: 4,
      timeSpentToday: "2.1h",
      participantsContacted: 8,
      participantsPending: 2,
      efficiency: 92
    }
  ];

  const participantReports = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      totalEvents: 3,
      agentsContacted: 2,
      pendingContacts: 1,
      lastContactDate: "2024-03-10",
      status: "Responsive",
      subscriptionStatus: "Active"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      totalEvents: 1,
      agentsContacted: 1,
      pendingContacts: 2,
      lastContactDate: "2024-03-08",
      status: "Needs Follow-up",
      subscriptionStatus: "Pending"
    }
  ];

  const handleShareReport = (type: string, reportType: string) => {
    console.log(`Sharing ${reportType} report via ${type}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Monitor team performance and participant management</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agentsData.filter(agent => agent.status === 'Active').length}
                  </p>
                  <p className="text-xs text-gray-500">of {agentsData.length} total</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasks Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agentsData.reduce((sum, agent) => sum + agent.activeTasksToday, 0)}
                  </p>
                  <p className="text-xs text-gray-500">across all agents</p>
                </div>
                <CheckSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Calls Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agentsData.reduce((sum, agent) => sum + agent.followupTasksCompleted, 0)}
                  </p>
                  <p className="text-xs text-gray-500">follow-up calls</p>
                </div>
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(agentsData.reduce((sum, agent) => sum + agent.efficiency, 0) / agentsData.length)}%
                  </p>
                  <p className="text-xs text-gray-500">team performance</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 max-w-md">
            <TabsTrigger value="agents">Agent Performance</TabsTrigger>
            <TabsTrigger value="participants">Participant Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Agent Performance Today</CardTitle>
                    <CardDescription>Real-time agent activity and task completion status</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share Report
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShareReport('whatsapp', 'agent-performance')}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareReport('email', 'agent-performance')}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareReport('sms', 'agent-performance')}>
                        <Smartphone className="w-4 h-4 mr-2" />
                        SMS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentsData.map((agent) => (
                    <div key={agent.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                            <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                              {agent.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {agent.efficiency}% Efficiency
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <div className="font-semibold text-blue-600">{agent.activeTasksToday}</div>
                              <div className="text-xs text-blue-500">Active Tasks</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                              <div className="font-semibold text-green-600">{agent.followupTasksCompleted}</div>
                              <div className="text-xs text-green-500">Completed</div>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded">
                              <div className="font-semibold text-orange-600">{agent.followupTasksPending}</div>
                              <div className="text-xs text-orange-500">Pending</div>
                            </div>
                            <div className="text-center p-2 bg-purple-50 rounded">
                              <div className="font-semibold text-purple-600">{agent.totalCallsToday}</div>
                              <div className="text-xs text-purple-500">Total Calls</div>
                            </div>
                            <div className="text-center p-2 bg-indigo-50 rounded">
                              <div className="font-semibold text-indigo-600">{agent.participantsContacted}</div>
                              <div className="text-xs text-indigo-500">Contacted</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <div className="font-semibold text-gray-600">{agent.timeSpentToday}</div>
                              <div className="text-xs text-gray-500">Time Spent</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-48 space-y-2">
                          <div className="text-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-700">Participants</div>
                            <div className="flex justify-between text-xs mt-1">
                              <span className="text-green-600">Contacted: {agent.participantsContacted}</span>
                              <span className="text-orange-600">Pending: {agent.participantsPending}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Participant Contact Reports</CardTitle>
                    <CardDescription>Track agent contact progress with participants</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share Report
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShareReport('whatsapp', 'participant-contacts')}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareReport('email', 'participant-contacts')}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareReport('sms', 'participant-contacts')}>
                        <Smartphone className="w-4 h-4 mr-2" />
                        SMS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participantReports.map((participant) => (
                    <div key={participant.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                            <Badge variant={participant.status === 'Responsive' ? 'default' : 'secondary'}>
                              {participant.status}
                            </Badge>
                            <Badge variant={participant.subscriptionStatus === 'Active' ? 'default' : 'outline'}>
                              {participant.subscriptionStatus} Subscription
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="truncate">{participant.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>Events: {participant.totalEvents}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-gray-400" />
                              <span>Contacted by: {participant.agentsContacted} agents</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>Last contact: {participant.lastContactDate}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-48 space-y-2">
                          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-700">Contact Status</div>
                            <div className="flex justify-between text-xs mt-1">
                              <span className="text-green-600">Done: {participant.agentsContacted}</span>
                              <span className="text-orange-600">Pending: {participant.pendingContacts}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
