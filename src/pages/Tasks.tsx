
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  CheckSquare, 
  Clock,
  Filter,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Check,
  Phone,
  User,
  Share2,
  FileText,
  PlayCircle,
  PauseCircle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import TaskAssignmentDialog from "@/components/TaskAssignmentDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tasks = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Call VIP attendees - Tech Conference 2024",
      description: "Contact all VIP ticket holders for special arrangements and requirements",
      event: "Tech Conference 2024",
      assignee: "Sarah Johnson",
      assigneeType: "individual",
      dueDate: "2024-03-10",
      status: "In Progress",
      priority: "High",
      timeSpent: "2.5h",
      totalParticipants: 25,
      contacted: 15,
      pending: 10,
      type: "call_followup",
      callSetting: "all_agents"
    },
    {
      id: 2,
      title: "Setup registration desk materials",
      description: "Prepare registration area with banners, materials, and welcome kits",
      event: "Product Launch Webinar",
      assignee: "Marketing Team",
      assigneeType: "team",
      dueDate: "2024-03-14",
      status: "Pending",
      priority: "Medium",
      timeSpent: "1.2h",
      totalParticipants: 0,
      contacted: 0,
      pending: 0,
      type: "setup",
      callSetting: null
    },
    {
      id: 3,
      title: "Send welcome emails to participants",
      description: "Send event details, schedule, and joining instructions",
      event: "Marketing Workshop",
      assignee: "Lisa Park",
      assigneeType: "individual",
      dueDate: "2024-03-12",
      status: "Completed",
      priority: "Low",
      timeSpent: "0.8h",
      totalParticipants: 67,
      contacted: 67,
      pending: 0,
      type: "communication",
      callSetting: null
    }
  ]);

  const handleTaskAction = (taskId: number, action: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          switch(action) {
            case 'complete':
              return { ...task, status: 'Completed' };
            case 'start':
              return { ...task, status: 'In Progress' };
            case 'pause':
              return { ...task, status: 'Paused' };
            default:
              return task;
          }
        }
        return task;
      })
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab !== "all" && task.status.toLowerCase().replace(" ", "_") !== activeTab) return false;
    if (selectedEvent !== "all" && task.event !== selectedEvent) return false;
    if (selectedStatus !== "all" && task.status !== selectedStatus) return false;
    if (selectedPriority !== "all" && task.priority !== selectedPriority) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Task Management</h1>
            <p className="text-gray-600 mt-1">Manage and track all event-related tasks</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <TaskAssignmentDialog />
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search tasks..." className="pl-10" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="Tech Conference 2024">Tech Conference 2024</SelectItem>
                    <SelectItem value="Product Launch Webinar">Product Launch Webinar</SelectItem>
                    <SelectItem value="Marketing Workshop">Marketing Workshop</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 max-w-2xl">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{task.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority} Priority
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          <Badge variant="outline">
                            {task.assigneeType === 'individual' ? <User className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                            {task.assigneeType === 'individual' ? 'Individual' : 'Team'}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Event: {task.event}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Assigned: {task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 font-medium">Time: {task.timeSpent}</span>
                        </div>
                      </div>

                      {task.type === 'call_followup' && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-blue-900">{task.totalParticipants}</div>
                              <div className="text-blue-600">Total Participants</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-green-700">{task.contacted}</div>
                              <div className="text-green-600">Contacted</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-orange-700">{task.pending}</div>
                              <div className="text-orange-600">Pending</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2 lg:w-48 justify-end lg:justify-start">
                      {task.status === 'Pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleTaskAction(task.id, 'start')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Task
                        </Button>
                      )}
                      {task.status === 'In Progress' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleTaskAction(task.id, 'complete')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Complete
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleTaskAction(task.id, 'pause')}
                          >
                            <PauseCircle className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                        </>
                      )}
                      {task.status === 'Paused' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleTaskAction(task.id, 'start')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
