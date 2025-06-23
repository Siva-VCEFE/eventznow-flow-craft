
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CheckSquare, 
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle,
  Circle,
  AlertTriangle,
  Users
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskAssignmentDialog from "@/components/TaskAssignmentDialog";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "Follow up with VIP attendees",
      description: "Contact all VIP ticket holders for special arrangements and confirm their attendance",
      event: "Tech Conference 2024",
      assignee: "Sarah Johnson",
      assigneeType: "individual",
      assigneeEmail: "sarah@eventznow.com",
      dueDate: "2024-03-10",
      status: "In Progress",
      priority: "High",
      createdDate: "2024-02-15",
      tags: ["VIP", "Follow-up"],
      estimatedHours: 6,
      actualHours: 4.5,
      teamMembers: []
    },
    {
      id: 2,
      title: "Setup registration desk",
      description: "Prepare registration area with banners, materials, and check-in systems",
      event: "Tech Conference 2024",
      assignee: "Event Setup Team",
      assigneeType: "team",
      teamMembers: ["Mike Chen", "Lisa Park", "David Wilson"],
      dueDate: "2024-03-14",
      status: "Pending",
      priority: "Medium",
      createdDate: "2024-02-20",
      tags: ["Setup", "Registration"],
      estimatedHours: 8,
      actualHours: 0
    },
    {
      id: 3,
      title: "Send welcome emails",
      description: "Send event details, schedule, and logistics information to all registered participants",
      event: "Marketing Workshop",
      assignee: "Lisa Park",
      assigneeType: "individual",
      assigneeEmail: "lisa@eventznow.com",
      dueDate: "2024-03-12",
      status: "Completed",
      priority: "Low",
      createdDate: "2024-02-18",
      tags: ["Email", "Communication"],
      estimatedHours: 3,
      actualHours: 2.8,
      teamMembers: []
    },
    {
      id: 4,
      title: "Coordinate catering setup",
      description: "Finalize menu, confirm headcount, and coordinate with catering team for event day",
      event: "Product Launch Webinar",
      assignee: "Logistics Team",
      assigneeType: "team",
      teamMembers: ["David Wilson", "Alex Johnson"],
      dueDate: "2024-03-08",
      status: "Overdue",
      priority: "High",
      createdDate: "2024-02-10",
      tags: ["Catering", "Logistics"],
      estimatedHours: 5,
      actualHours: 6.2
    },
    {
      id: 5,
      title: "Test AV equipment",
      description: "Check all audio/visual equipment, microphones, and presentation setup",
      event: "Tech Conference 2024",
      assignee: "Alex Johnson",
      assigneeType: "individual",
      assigneeEmail: "alex@eventznow.com",
      dueDate: "2024-03-13",
      status: "In Progress",
      priority: "Medium",
      createdDate: "2024-02-22",
      tags: ["AV", "Technical"],
      estimatedHours: 4,
      actualHours: 2.1,
      teamMembers: []
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || task.status.toLowerCase().replace(' ', '') === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority.toLowerCase() === filterPriority;
    const matchesAssignee = filterAssignee === "all" || task.assignee.toLowerCase().includes(filterAssignee.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Overdue':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const TaskFiltersDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Advanced Task Filters</DialogTitle>
          <DialogDescription>Apply detailed filters to find specific tasks</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Priority</Label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Assignee</Label>
            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="lisa">Lisa Park</SelectItem>
                <SelectItem value="david">David Wilson</SelectItem>
                <SelectItem value="alex">Alex Johnson</SelectItem>
                <SelectItem value="team">Team Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-1">Track and manage all event-related tasks and assignments</p>
          </div>
          <TaskAssignmentDialog />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <TaskFiltersDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                </div>
                <CheckSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter(t => t.status === 'Completed').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter(t => t.status === 'In Progress').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter(t => t.assigneeType === 'team').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>Manage and track task progress across all events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-1">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <Badge variant={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant={getStatusColor(task.status) as any}>
                            {task.status}
                          </Badge>
                          {task.assigneeType === 'team' && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Team Task
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Event: {task.event}
                      </div>
                      <div className="flex items-center gap-1">
                        {task.assigneeType === 'team' ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        {task.assignee}
                        {task.assigneeType === 'team' && (
                          <span className="text-xs text-gray-500">
                            ({task.teamMembers.length} members)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Due: {task.dueDate}
                      </div>
                      {task.estimatedHours && (
                        <div className="text-xs">
                          Time: {task.actualHours || 0}h / {task.estimatedHours}h
                        </div>
                      )}
                    </div>

                    {task.assigneeType === 'team' && task.teamMembers.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Team Members:</p>
                        <div className="flex flex-wrap gap-1">
                          {task.teamMembers.map((member, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    {task.status !== 'Completed' && (
                      <Button size="sm">
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
