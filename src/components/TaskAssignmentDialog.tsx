
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Users } from "lucide-react";

const TaskAssignmentDialog = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    event: "",
    assignmentType: "individual", // individual or team
    assignees: [],
    dueDate: "",
    priority: "Medium",
    estimatedHours: "",
    tags: []
  });

  const [selectedMembers, setSelectedMembers] = useState([]);

  const teamMembers = [
    { id: 1, name: "Sarah Johnson", role: "Admin" },
    { id: 2, name: "Mike Chen", role: "Member" },
    { id: 3, name: "Lisa Park", role: "Member" },
    { id: 4, name: "David Wilson", role: "Member" },
    { id: 5, name: "Alex Johnson", role: "Member" }
  ];

  const handleMemberToggle = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Assign tasks to individuals or teams with detailed tracking
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              placeholder="Enter task title..."
              value={task.title}
              onChange={(e) => setTask({...task, title: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="Enter detailed task description..."
              value={task.description}
              onChange={(e) => setTask({...task, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="task-event">Event</Label>
              <Select value={task.event} onValueChange={(value) => setTask({...task, event: value})}>
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
              <Label htmlFor="assignment-type">Assignment Type</Label>
              <Select value={task.assignmentType} onValueChange={(value) => setTask({...task, assignmentType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual Task</SelectItem>
                  <SelectItem value="team">Team Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {task.assignmentType === 'team' ? 'Select Team Members' : 'Select Assignee'}
            </Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto border rounded-md p-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`member-${member.id}`}
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => handleMemberToggle(member.id)}
                  />
                  <label htmlFor={`member-${member.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {member.name} ({member.role})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="task-due-date">Due Date</Label>
              <Input
                id="task-due-date"
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({...task, dueDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="task-priority">Priority</Label>
              <Select value={task.priority} onValueChange={(value) => setTask({...task, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estimated-hours">Estimated Hours</Label>
              <Input
                id="estimated-hours"
                type="number"
                placeholder="0"
                value={task.estimatedHours}
                onChange={(e) => setTask({...task, estimatedHours: e.target.value})}
              />
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

export default TaskAssignmentDialog;
