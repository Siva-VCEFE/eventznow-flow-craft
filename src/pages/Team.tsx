
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  UserPlus,
  Search,
  Mail,
  MoreVertical,
  Shield,
  Crown,
  User,
  Settings
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const Team = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@eventznow.com",
      role: "Owner",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      tasksCompleted: 24,
      eventsManaged: 8,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@eventznow.com",
      role: "Admin",
      joinDate: "2024-01-20",
      lastActive: "1 hour ago",
      tasksCompleted: 18,
      eventsManaged: 5,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@eventznow.com",
      role: "Member",
      joinDate: "2024-02-01",
      lastActive: "30 minutes ago",
      tasksCompleted: 12,
      eventsManaged: 3,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 4,
      name: "Lisa Park",
      email: "lisa@eventznow.com",
      role: "Member",
      joinDate: "2024-02-10",
      lastActive: "1 day ago",
      tasksCompleted: 15,
      eventsManaged: 4,
      avatar: "/placeholder-avatar.jpg"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@eventznow.com",
      role: "Member",
      joinDate: "2024-02-15",
      lastActive: "5 hours ago",
      tasksCompleted: 9,
      eventsManaged: 2,
      avatar: "/placeholder-avatar.jpg"
    }
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'Admin':
        return <Shield className="w-4 h-4 text-blue-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'default';
      case 'Admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const InviteMemberDialog = () => {
    const [invitation, setInvitation] = useState({
      email: "",
      role: "Member",
      message: ""
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your organization
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@company.com"
                value={invitation.email}
                onChange={(e) => setInvitation({...invitation, email: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="invite-role">Role</Label>
              <Select value={invitation.role} onValueChange={(value) => setInvitation({...invitation, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="invite-message">Personal Message (Optional)</Label>
              <Input
                id="invite-message"
                placeholder="Join our event management team!"
                value={invitation.message}
                onChange={(e) => setInvitation({...invitation, message: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button>Send Invitation</Button>
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
            <h1 className="text-3xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-600 mt-1">Manage your organization members and permissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Team Settings
            </Button>
            <InviteMemberDialog />
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.role === 'Admin' || m.role === 'Owner').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => 
                      m.lastActive.includes('hour') || m.lastActive.includes('minutes')
                    ).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">●</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-bold">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage roles, permissions, and member activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <Badge variant={getRoleColor(member.role) as any} className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          {member.role}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </div>
                        <span>•</span>
                        <span>Joined: {member.joinDate}</span>
                        <span>•</span>
                        <span>Last active: {member.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{member.tasksCompleted}</p>
                      <p className="text-xs text-gray-500">Tasks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{member.eventsManaged}</p>
                      <p className="text-xs text-gray-500">Events</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        {member.role !== 'Owner' && (
                          <DropdownMenuItem className="text-red-600">
                            Remove Member
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default Team;
