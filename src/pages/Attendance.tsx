
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  UserCheck,
  QrCode,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Download,
  Share,
  MessageSquare,
  Mail,
  Smartphone
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Attendance = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);

  const event = {
    id: eventId,
    name: "Tech Conference 2024",
    date: "2024-03-15",
    location: "Mumbai Convention Center",
    totalRegistered: 145,
    totalAttended: 87,
    attendancePercentage: 60
  };

  const participants = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+91-9876543210",
      ticketType: "VIP",
      registrationDate: "2024-02-15",
      attended: true,
      checkInTime: "09:15 AM",
      qrCode: "QR123456"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+91-9876543211",
      ticketType: "Regular",
      registrationDate: "2024-02-16",
      attended: false,
      checkInTime: null,
      qrCode: "QR123457"
    },
    {
      id: 3,
      name: "David Chen",
      email: "david@example.com",
      phone: "+91-9876543212",
      ticketType: "Student",
      registrationDate: "2024-02-17",
      attended: true,
      checkInTime: "09:45 AM",
      qrCode: "QR123458"
    }
  ];

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAttendance = (participantId: number) => {
    console.log(`Marking attendance for participant ${participantId}`);
    // This would update the attendance status
  };

  const handleBulkMarkAttendance = () => {
    console.log(`Bulk marking attendance for participants: ${selectedParticipants}`);
    setSelectedParticipants([]);
  };

  const handleParticipantSelection = (participantId: number) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleShareReport = (type: string) => {
    console.log(`Sharing attendance report via ${type}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Event Attendance</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{event.name} - {event.date}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              size="sm"
              variant="outline"
              onClick={() => console.log('Opening QR scanner')}
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Scanner
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleShareReport('whatsapp')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShareReport('email')}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShareReport('sms')}>
                  <Smartphone className="w-4 h-4 mr-2" />
                  SMS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registered</p>
                  <p className="text-2xl font-bold text-gray-900">{event.totalRegistered}</p>
                  <p className="text-xs text-gray-500">participants</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attended</p>
                  <p className="text-2xl font-bold text-gray-900">{event.totalAttended}</p>
                  <p className="text-xs text-gray-500">checked in</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{event.attendancePercentage}%</p>
                  <p className="text-xs text-gray-500">attendance rate</p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">No Shows</p>
                  <p className="text-2xl font-bold text-gray-900">{event.totalRegistered - event.totalAttended}</p>
                  <p className="text-xs text-gray-500">didn't attend</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search participants..." 
                  className="pl-10 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="bulk-mode"
                  checked={bulkMode}
                  onCheckedChange={setBulkMode}
                />
                <label htmlFor="bulk-mode" className="text-sm font-medium">
                  Bulk Mode
                </label>
              </div>
              {bulkMode && selectedParticipants.length > 0 && (
                <Button 
                  size="sm"
                  onClick={handleBulkMarkAttendance}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mark {selectedParticipants.length} Present
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Participants List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Participants</CardTitle>
            <CardDescription>Mark attendance for event participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredParticipants.map((participant) => (
                <div 
                  key={participant.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    participant.attended 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {bulkMode && (
                      <input
                        type="checkbox"
                        checked={selectedParticipants.includes(participant.id)}
                        onChange={() => handleParticipantSelection(participant.id)}
                        className="rounded border-gray-300"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={participant.attended ? 'default' : 'secondary'}>
                            {participant.attended ? 'Present' : 'Absent'}
                          </Badge>
                          <Badge variant="outline">
                            {participant.ticketType}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>📧 {participant.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📞 {participant.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📅 Registered: {participant.registrationDate}</span>
                        </div>
                        {participant.checkInTime && (
                          <div className="flex items-center gap-1">
                            <span>🕒 Check-in: {participant.checkInTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!participant.attended ? (
                      <Button 
                        size="sm"
                        onClick={() => handleMarkAttendance(participant.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Mark Present
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Present</span>
                      </div>
                    )}
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => console.log(`Showing QR for ${participant.qrCode}`)}
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
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

export default Attendance;
