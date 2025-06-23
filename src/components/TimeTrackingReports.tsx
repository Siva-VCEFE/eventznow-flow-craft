
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Award,
  BarChart3
} from "lucide-react";

const TimeTrackingReports = () => {
  const timeTrackingData = {
    teamPerformance: [
      {
        id: 1,
        member: "Sarah Johnson",
        role: "Admin",
        totalHours: 42.5,
        tasksCompleted: 8,
        avgTimePerTask: 5.3,
        efficiency: 92,
        currentTasks: 3
      },
      {
        id: 2,
        member: "Mike Chen",
        role: "Member",
        totalHours: 38.2,
        tasksCompleted: 12,
        avgTimePerTask: 3.2,
        efficiency: 87,
        currentTasks: 2
      },
      {
        id: 3,
        member: "Lisa Park",
        role: "Member",
        totalHours: 35.8,
        tasksCompleted: 9,
        avgTimePerTask: 4.0,
        efficiency: 89,
        currentTasks: 4
      }
    ],
    participantEngagement: [
      {
        id: 1,
        participant: "Alex Johnson",
        event: "Tech Conference 2024",
        timeSpent: "2.5 hours",
        interactions: 15,
        engagementScore: 94,
        feedback: "Excellent"
      },
      {
        id: 2,
        participant: "Maria Garcia",
        event: "Product Launch Webinar",
        timeSpent: "1.8 hours",
        interactions: 8,
        engagementScore: 78,
        feedback: "Good"
      }
    ],
    taskBreakdown: [
      {
        task: "VIP attendee follow-up",
        assignee: "Sarah Johnson",
        estimated: 6,
        actual: 5.5,
        efficiency: 109,
        status: "Completed"
      },
      {
        task: "Registration desk setup",
        assignee: "Mike Chen",
        estimated: 4,
        actual: 3.2,
        efficiency: 125,
        status: "Completed"
      },
      {
        task: "Welcome email campaign",
        assignee: "Lisa Park",
        estimated: 3,
        actual: 4.2,
        efficiency: 71,
        status: "In Progress"
      }
    ]
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return "text-green-600";
    if (efficiency >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getEfficiencyBadge = (efficiency) => {
    if (efficiency >= 90) return "default";
    if (efficiency >= 80) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Time Tracking & Performance</h2>
          <p className="text-gray-600 mt-1">Monitor team productivity and participant engagement</p>
        </div>
      </div>

      <Tabs defaultValue="team-performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team-performance">Team Performance</TabsTrigger>
          <TabsTrigger value="task-tracking">Task Tracking</TabsTrigger>
          <TabsTrigger value="participant-engagement">Participant Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="team-performance" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold">116.5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tasks Completed</p>
                    <p className="text-2xl font-bold">29</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg Efficiency</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Team Member Performance</CardTitle>
              <CardDescription>Individual productivity metrics and task completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Avg Time/Task</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Current Tasks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeTrackingData.teamPerformance.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{member.member}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </TableCell>
                      <TableCell>{member.totalHours}h</TableCell>
                      <TableCell>{member.tasksCompleted}</TableCell>
                      <TableCell>{member.avgTimePerTask}h</TableCell>
                      <TableCell>
                        <Badge variant={getEfficiencyBadge(member.efficiency)}>
                          {member.efficiency}%
                        </Badge>
                      </TableCell>
                      <TableCell>{member.currentTasks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task-tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Time Analysis</CardTitle>
              <CardDescription>Compare estimated vs actual time spent on tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Estimated Hours</TableHead>
                    <TableHead>Actual Hours</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeTrackingData.taskBreakdown.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{task.task}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.estimated}h</TableCell>
                      <TableCell>{task.actual}h</TableCell>
                      <TableCell>
                        <span className={getEfficiencyColor(task.efficiency)}>
                          {task.efficiency}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={task.status === 'Completed' ? 'default' : 'secondary'}>
                          {task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participant-engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Participant Engagement Metrics</CardTitle>
              <CardDescription>Track how participants spend time during events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Time Spent</TableHead>
                    <TableHead>Interactions</TableHead>
                    <TableHead>Engagement Score</TableHead>
                    <TableHead>Feedback</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeTrackingData.participantEngagement.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.participant}</TableCell>
                      <TableCell>{participant.event}</TableCell>
                      <TableCell>{participant.timeSpent}</TableCell>
                      <TableCell>{participant.interactions}</TableCell>
                      <TableCell>
                        <Badge variant={participant.engagementScore >= 90 ? 'default' : 'secondary'}>
                          {participant.engagementScore}%
                        </Badge>
                      </TableCell>
                      <TableCell>{participant.feedback}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeTrackingReports;
