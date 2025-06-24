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
  Copy,
  CheckCircle,
  AlertCircle,
  FileImage,
  QrCode,
  Share,
  MessageSquare,
  Mail,
  Smartphone
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const Events = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [attendanceDialog, setAttendanceDialog] = useState(false);
  const [selectedEventForAttendance, setSelectedEventForAttendance] = useState(null);

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
      attendedCount: 0,
      feedbackCount: 0,
      callSetting: "all_agents",
      callsCompleted: 15,
      callsPending: 10,
      registrationLink: "https://eventz.app/register/tech-conference-2024",
      isUpcoming: true,
      daysUntilEvent: 12,
      hasActiveTasks: true,
      bannerImage: "photo-1465146344425-f00d5f5c8f07",
      sponsorshipSlots: 8,
      filledSponsorships: 3
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
      daysUntilEvent: 15,
      hasActiveTasks: false,
      bannerImage: "photo-1482938289607-e9573fc25ebb",
      sponsorshipSlots: 5,
      filledSponsorships: 2
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
      attendedCount: 42,
      feedbackCount: 38,
      callSetting: "no_calls",
      callsCompleted: 0,
      callsPending: 0,
      registrationLink: "https://eventz.app/register/marketing-workshop",
      isUpcoming: false,
      daysUntilEvent: -5,
      hasActiveTasks: false,
      bannerImage: "photo-1500673922987-e212871fec22",
      sponsorshipSlots: 3,
      filledSponsorships: 3
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
    const event = events.find(e => e.id === eventId);
    if (event?.hasActiveTasks) {
      alert("Cannot change call setting while tasks are active. Complete or pause active tasks first.");
      return;
    }
    console.log(`Changed call setting for event ${eventId} to ${newSetting}`);
  };

  const handleMarkAttendance = (eventId: number) => {
    setSelectedEventForAttendance(eventId);
    setAttendanceDialog(true);
  };

  const handleShareReport = (type: string, eventId: number) => {
    console.log(`Sharing ${type} report for event ${eventId}`);
    // This would generate and share the report
  };

  const isEventDay = (eventDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    return eventDate === today;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your events and track performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => navigate('/create-event')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => navigate('/sponsorships')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Sponsorships
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search events..." className="pl-10 text-sm" />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-32">
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
                  <SelectTrigger className="w-full sm:w-32">
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              {/* Event Banner */}
              <div className="h-32 sm:h-40 lg:h-48 relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/${event.bannerImage}?w=800&h=300&fit=crop`}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{event.name}</h3>
                    <p className="text-sm opacity-90">{event.location}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  {event.isUpcoming && (
                    <LiveRegistrationCounter count={event.registrations} />
                  )}
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Main Event Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge variant="outline">
                        Sponsorships: {event.filledSponsorships}/{event.sponsorshipSlots}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm sm:text-base">{event.description}</p>
                    
                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{event.startDate} - {event.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{event.registrations}/{event.maxParticipants}</span>
                      </div>
                    </div>

                    {/* Registration & Payment Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg text-center">
                      <div>
                        <div className="font-semibold text-blue-600 text-sm sm:text-base">{event.registrations}</div>
                        <div className="text-xs text-gray-500">Registered</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600 text-sm sm:text-base">{event.paidRegistrations}</div>
                        <div className="text-xs text-gray-500">Paid</div>
                      </div>
                      <div>
                        <div className="font-semibold text-orange-600 text-sm sm:text-base">{event.pendingPayments}</div>
                        <div className="text-xs text-gray-500">Pending</div>
                      </div>
                      <div>
                        {event.status === 'Completed' ? (
                          <>
                            <div className="font-semibold text-purple-600 text-sm sm:text-base">{event.attendedCount}</div>
                            <div className="text-xs text-gray-500">Attended</div>
                          </>
                        ) : isEventDay(event.startDate) ? (
                          <>
                            <div className="font-semibold text-blue-600 text-sm sm:text-base">Mark</div>
                            <div className="text-xs text-gray-500">Attendance</div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-gray-400 text-sm sm:text-base">-</div>
                            <div className="text-xs text-gray-500">On Event Day</div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Call Settings & Progress */}
                    {event.callSetting !== 'no_calls' && (
                      <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <h4 className="font-medium text-blue-900 flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4" />
                            Call Follow-up Settings
                          </h4>
                          <div className="flex items-center gap-2">
                            <Select 
                              value={event.callSetting} 
                              onValueChange={(value) => handleCallSettingChange(event.id, value)}
                              disabled={event.hasActiveTasks}
                            >
                              <SelectTrigger className="w-full sm:w-48 bg-white text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all_agents">All agents can call</SelectItem>
                                <SelectItem value="individual_agents">Individual assignment</SelectItem>
                                <SelectItem value="no_calls">No calls required</SelectItem>
                              </SelectContent>
                            </Select>
                            {event.hasActiveTasks && (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-green-700">{event.callsCompleted}</div>
                            <div className="text-green-600 text-xs">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-orange-700">{event.callsPending}</div>
                            <div className="text-orange-600 text-xs">Pending</div>
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
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            <QrCode className="w-3 h-3 mr-1" />
                            QR
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue & Actions */}
                  <div className="lg:w-64 space-y-3">
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                      <div className="flex items-center justify-center gap-1 text-green-700 mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-semibold text-sm">Revenue</span>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">{event.revenue}</div>
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
                        className="w-full justify-start text-xs"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <Eye className="w-3 h-3 mr-2" />
                        View Details
                      </Button>
                      
                      {isEventDay(event.startDate) && (
                        <Button 
                          size="sm" 
                          className="w-full justify-start text-xs bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleMarkAttendance(event.id)}
                        >
                          <UserCheck className="w-3 h-3 mr-2" />
                          Mark Attendance
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                        onClick={() => navigate(`/participants?event=${event.id}`)}
                      >
                        <Users className="w-3 h-3 mr-2" />
                        Participants
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                        onClick={() => navigate(`/tasks?event=${event.id}`)}
                      >
                        <Settings className="w-3 h-3 mr-2" />
                        Tasks
                      </Button>

                      {/* Share Reports */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            <Share className="w-3 h-3 mr-2" />
                            Share Reports
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleShareReport('whatsapp', event.id)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareReport('email', event.id)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareReport('sms', event.id)}>
                            <Smartphone className="w-4 h-4 mr-2" />
                            SMS
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            <MoreVertical className="w-3 h-3 mr-2" />
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
                          <DropdownMenuItem onClick={() => navigate(`/sponsorships?event=${event.id}`)}>
                            <IndianRupee className="w-4 h-4 mr-2" />
                            Manage Sponsorships
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Attendance Marking Dialog */}
        <Dialog open={attendanceDialog} onOpenChange={setAttendanceDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
              <DialogDescription>
                Mark attendance for participants who actually attended the event
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                This will open the attendance marking interface where you can:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Scan QR codes or manually mark attendance</li>
                  <li>Track real-time attendance numbers</li>
                  <li>Generate attendance reports</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setAttendanceDialog(false);
                    navigate(`/attendance/${selectedEventForAttendance}`);
                  }}
                >
                  Open Attendance
                </Button>
                <Button variant="outline" onClick={() => setAttendanceDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Events;
