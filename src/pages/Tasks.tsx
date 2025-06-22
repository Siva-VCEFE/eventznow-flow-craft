
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CheckSquare, 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle,
  Circle,
  AlertTriangle
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "Follow up with VIP attendees",
      description: "Contact all VIP ticket holders for special arrangements and confirm their attendance",
      event: "Tech Conference 2024",
      assignee: "Sarah Johnson",
      assigneeEmail: "sarah@eventznow.com",
      dueDate: "2024-03-10",
      status: "In Progress",
      priority: "High",
      createdDate: "2024-02-15",
      tags: ["VIP", "Follow-up"]
    },
    {
      id: 2,
      title: "Setup registration desk",
      description: "Prepare registration area with banners, materials, and check-in systems",
      event: "Tech Conference 2024",
      assignee: "Mike Chen",
      assigneeEmail: "mike@eventznow.com",
      dueDate: "2024-03-14",
      status: "Pending",
      priority: "Medium",
      createdDate: "2024-02-20",
      tags: ["Setup", "Registration"]
    },
    {
      id: 3,
      title: "Send welcome emails",
      description: "Send event details, schedule, and logistics information to all registered participants",
      event: "Marketing Workshop",
      assignee: "Lisa Park",
      assigneeEmail: "lisa@eventznow.com",
      dueDate: "2024-03-12",
      status: "Completed",
      priority: "Low",
      createdDate: "2024-02-18",
      tags: ["Email", "Communication"]
    },
    {
      id: 4,
      title: "Coordinate catering setup",
      description: "Finalize menu, confirm headcount, and coordinate with catering team for event day",
      event: "Product Launch Webinar",
      assignee: "David Wilson",
      assigneeEmail: "david@eventznow.com",
      dueDate: "2024-03-08",
      status: "Overdue",
      priority: "High",
      createdDate: "2024-02-10",
      tags: ["Catering", "Logistics"]
    },
    {
      id: 5,
      title: "Test AV equipment",
      description: "Check all audio/visual equipment, microphones, and presentation setup",
      event: "Tech Conference 2024",
      assignee: "Alex Johnson",
      assigneeEmail: "alex@eventznow.com",
      dueDate: "2024-03-13",
      status: "In Progress",
      priority: "Medium",
      createdDate: "2024-02-22",
      tags: ["AV", "Technical"]
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || task.status.toLowerCase().replace(' ', '') === filterStatus;
    
    return matchesSearch && matchesFilter;
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

  const CreateTaskDialog = () => {
    const [newTask, setNewTask] = useState({
      title: "",
      description: "",
      event: "",
      assignee: "",
      dueDate: "",
      priority: "Medium"
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task for your event team to track and complete
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                placeholder="Enter task title..."
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                placeholder="Enter task description..."
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-event">Event</Label>
                <Select value={newTask.event} onValueChange={(value) => setNewTask({...newTask, event: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-conference">Tech Conference 2024</SelectItem>
                    <SelectItem value="product-launch">Product Launch Webinar</SelectItem>
                    <SelectItem value="marketing-workshop">Marketing Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="task-assignee">Assignee</Label>
                <Select value={newTask.assignee} onValueChange={(value) => setNewTask({...newTask, assignee: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="lisa">Lisa Park</SelectItem>
                    <SelectItem value="david">David Wilson</SelectItem>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-due-date">Due Date</Label>
                <Input
                  id="task-due-date"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="task-priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Create Task</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-1">Track and manage all event-related tasks and assignments</p>
          </div>
          <CreateTaskDialog />
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
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
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
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter(t => t.status === 'Overdue').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
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
                        <User className="w-4 h-4" />
                        {task.assignee}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Due: {task.dueDate}
                      </div>
                    </div>

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
