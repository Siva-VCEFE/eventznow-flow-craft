
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Share2,
  Settings,
  Phone,
  IndianRupee,
  TrendingUp,
  UserCheck,
  Bell,
  Copy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import LiveRegistrationCounter from "@/components/LiveRegistrationCounter";
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
import { Switch } from "@/components/ui/switch";

const Events = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const events = [
    {
      id: 1,
      name: "Tech Conference 2024",
      description: "Annual technology conference featuring AI, blockchain, and cloud computing innovations",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      location: "Mumbai Convention Center",
      address: "BKC, Mumbai, Maharashtra",
      category: "Conference",
      status: "Active",
      registrations: 145,
      maxParticipants: 500,
      revenue: "₹8,75,000",
      paidRegistrations: 98,
      pendingPayments: 47,
      attendedCount: 0, // Event hasn't happened yet
      feedbackCount: 0,
      callSetting: "all_agents",
      callsCompleted: 15,
      callsPending: 10,
      registrationLink: "https://eventz.app/register/tech-conference-2024",
      isUpcoming: true,
      daysUntilEvent: 12
    },
    {
      id: 2,
      name: "Product Launch Webinar",
      description: "Exclusive product launch and demo session for new SaaS platform",
      startDate: "2024-03-18",
      endDate: "2024-03-18",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
      location: "Online",
      address: "Zoom Platform",
      category: "Webinar",
      status: "Active",
      registrations: 89,
      maxParticipants: 200,
      revenue: "₹0",
      paidRegistrations: 0,
      pendingPayments: 0,
      attendedCount: 0,
      feedbackCount: 0,
      callSetting: "individual_agents",
      callsCompleted: 8,
      callsPending: 5,
      registrationLink: "https://eventz.app/register/product-launch-webinar",
      isUpcoming: true,
      daysUntilEvent: 15
    },
    {
      id: 3,
      name: "Marketing Workshop",
      description: "Comprehensive digital marketing strategies for small businesses",
      startDate: "2024-02-28",
      endDate: "2024-02-28",
      startTime: "10:00 AM",
      endTime: "05:00 PM",
      location: "Delhi Business Center",
      address: "Connaught Place, New Delhi",
      category: "Workshop",
      status: "Completed",
      registrations: 67,
      maxParticipants: 80,
      revenue: "₹2,38,000",
      paidRegistrations: 45,
      pendingPayments: 0,
      attendedCount: 42, // Event completed
      feedbackCount: 38,
      callSetting: "no_calls",
      callsCompleted: 0,
      callsPending: 0,
      registrationLink: "https://eventz.app/register/marketing-workshop",
      isUpcoming: false,
      daysUntilEvent: -5
    }
  ];

  const filteredEvents = events.filter(event => {
    if (selectedStatus !== "all" && event.status.toLowerCase() !== selectedStatus) return false;
    if (selectedCategory !== "all" && event.category.toLowerCase() !== selectedCategory) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCallSettingChange = (eventId: number, newSetting: string) => {
    console.log(`Changed call setting for event ${eventId} to ${newSetting}`);
    // This would update the event's call setting
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-1">Manage your events and track performance</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
            onClick={() => navigate('/create-event')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search events..." className="pl-10" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Event Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <Badge variant="outline">
                              {event.category}
                            </Badge>
                            {event.isUpcoming && (
                              <LiveRegistrationCounter count={event.registrations} />
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-3">{event.description}</p>
                      </div>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{event.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{event.startTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{event.registrations} registered</span>
                      </div>
                    </div>

                    {/* Registration & Payment Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{event.registrations}</div>
                        <div className="text-xs text-gray-500">Total Registered</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{event.paidRegistrations}</div>
                        <div className="text-xs text-gray-500">Paid</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-orange-600">{event.pendingPayments}</div>
                        <div className="text-xs text-gray-500">Payment Pending</div>
                      </div>
                      <div className="text-center">
                        {event.status === 'Completed' ? (
                          <>
                            <div className="font-semibold text-purple-600">{event.attendedCount}</div>
                            <div className="text-xs text-gray-500">Actually Attended</div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-gray-400">-</div>
                            <div className="text-xs text-gray-500">Will be marked on event day</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Call Settings & Progress (only for events that require calls) */}
                    {event.callSetting !== 'no_calls' && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <h4 className="font-medium text-blue-900 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Call Follow-up Settings
                          </h4>
                          <Select 
                            value={event.callSetting} 
                            onValueChange={(value) => handleCallSettingChange(event.id, value)}
                          >
                            <SelectTrigger className="w-full sm:w-48 bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all_agents">All agents can call same participant</SelectItem>
                              <SelectItem value="individual_agents">Individual agent assignment</SelectItem>
                              <SelectItem value="no_calls">No calls required</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-green-700">{event.callsCompleted}</div>
                            <div className="text-green-600">Calls Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-orange-700">{event.callsPending}</div>
                            <div className="text-orange-600">Calls Pending</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Registration Link */}
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-green-900 mb-1">Registration Link:</div>
                          <div className="text-xs text-green-700 truncate font-mono">{event.registrationLink}</div>
                        </div>
                        <Button size="sm" variant="outline" className="flex-shrink-0">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Revenue & Actions */}
                  <div className="lg:w-64 space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                      <div className="flex items-center justify-center gap-1 text-green-700 mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-semibold">Revenue</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{event.revenue}</div>
                      {event.status === 'Completed' && event.feedbackCount > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {event.feedbackCount} feedback received
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/participants?event=${event.id}`)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Participants
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/tasks?event=${event.id}`)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Tasks
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            <MoreVertical className="w-4 h-4 mr-2" />
                            More Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => navigate(`/events/${event.id}/edit`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Event
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          {event.status === 'Active' && event.isUpcoming && (
                            <DropdownMenuItem>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Mark Attendance
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
