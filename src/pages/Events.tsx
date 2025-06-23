
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Share2,
  ExternalLink,
  TrendingUp,
  Phone,
  MessageSquare,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import LiveRegistrationCounter from "@/components/LiveRegistrationCounter";

const Events = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      name: "Tech Conference 2024",
      description: "Annual technology conference featuring the latest innovations",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      location: "Mumbai Convention Center",
      organizers: ["John Doe", "Sarah Johnson"],
      registrations: 145,
      maxParticipants: 500,
      status: "Active",
      revenue: "₹8,75,000",
      type: "Paid",
      callSetting: "all-agents",
      registrationLink: "https://eventz.app/register/tech-conf-2024",
      liveCount: 12,
      paidCount: 98,
      attendedCount: 67,
      feedbackCollected: 45
    },
    {
      id: 2,
      name: "Product Launch Webinar",
      description: "Introducing our newest product line to customers",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      location: "Online Event",
      organizers: ["Mike Chen"],
      registrations: 89,
      maxParticipants: 1000,
      status: "Active",
      revenue: "₹0",
      type: "Free",
      callSetting: "single-agent",
      registrationLink: "https://eventz.app/register/product-launch-2024",
      liveCount: 5,
      paidCount: 0,
      attendedCount: 0,
      feedbackCollected: 0
    },
    {
      id: 3,
      name: "Marketing Workshop",
      description: "Hands-on workshop for digital marketing strategies",
      startDate: "2024-03-22",
      endDate: "2024-03-22",
      location: "Delhi Business Center",
      organizers: ["Lisa Park", "David Wilson"],
      registrations: 67,
      maxParticipants: 100,
      status: "Draft",
      revenue: "₹2,38,000",
      type: "Paid",
      callSetting: "no-calls",
      registrationLink: "https://eventz.app/register/marketing-workshop-2024",
      liveCount: 0,
      paidCount: 45,
      attendedCount: 0,
      feedbackCollected: 0
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === "all" || event.type.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleShare = (event, method) => {
    const message = `Check out ${event.name}! Register here: ${event.registrationLink}`;
    
    switch(method) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(message)}`);
        break;
    }
  };

  const CallSettingDialog = ({ event }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Phone className="w-4 h-4 mr-2" />
          Call Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Call Settings for {event?.name}</DialogTitle>
          <DialogDescription>Configure how participants are contacted for this event</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Call Strategy</Label>
            <Select defaultValue={event?.callSetting}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-agents">All agents can call same participant</SelectItem>
                <SelectItem value="single-agent">Only one agent per participant</SelectItem>
                <SelectItem value="no-calls">No calling required</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-2">
              {event?.callSetting === 'all-agents' && "Multiple agents can follow up with the same participant"}
              {event?.callSetting === 'single-agent' && "Each participant is assigned to only one agent"}
              {event?.callSetting === 'no-calls' && "This event doesn't require participant calls"}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label>Send SMS reminders</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label>Send email notifications</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch />
            <Label>WhatsApp notifications</Label>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const EventDetailsDialog = ({ event }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Quick View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {event?.name}
            <Badge variant={event?.status === 'Active' ? 'default' : 'secondary'}>
              {event?.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>Complete event overview and metrics</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Total Registered</p>
            <p className="text-2xl font-bold text-blue-900">{event?.registrations}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Paid</p>
            <p className="text-2xl font-bold text-green-900">{event?.paidCount}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Attended</p>
            <p className="text-2xl font-bold text-purple-900">{event?.attendedCount}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600">Feedback</p>
            <p className="text-2xl font-bold text-orange-900">{event?.feedbackCollected}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Registration Link:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm bg-white px-2 py-1 rounded">{event?.registrationLink}</code>
              <Button size="sm" variant="outline">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>Revenue Generated:</span>
            <span className="font-bold text-lg">{event?.revenue}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span>ROI Calculation:</span>
            <span className="font-bold text-green-600">
              {event?.revenue !== '₹0' ? '320%' : 'N/A'}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleShare(event, 'whatsapp')}>
              <MessageSquare className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare(event, 'email')}>
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>
          <Button onClick={() => navigate(`/events/${event?.id}`)}>
            View Full Details
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-1">Manage all your events and registrations</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => navigate('/create-event')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={event.status === 'Active' ? 'default' : event.status === 'Draft' ? 'secondary' : 'outline'}>
                        {event.status}
                      </Badge>
                      <Badge variant={event.type === 'Paid' ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                      {event.status === 'Active' && (
                        <LiveRegistrationCounter count={event.liveCount} />
                      )}
                    </div>
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/events/${event.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/events/${event.id}/edit`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare(event, 'whatsapp')}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Event
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.startDate} {event.endDate !== event.startDate && `- ${event.endDate}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.registrations} / {event.maxParticipants} registered</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-blue-600">Paid: {event.paidCount}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-green-600">Attended: {event.attendedCount}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">{event.revenue}</p>
                  </div>
                  <div className="flex gap-1">
                    <EventDetailsDialog event={event} />
                    <CallSettingDialog event={event} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;
