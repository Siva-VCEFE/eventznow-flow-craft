import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Download,
  UserPlus,
  Settings
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Switch } from "@/components/ui/switch";
import AddParticipantDialog from "@/components/AddParticipantDialog";
import ParticipantHistory from "@/components/ParticipantHistory";

const Participants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [multiAgentCalling, setMultiAgentCalling] = useState(false);

  const participants = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1-555-0123",
      event: "Tech Conference 2024",
      registrationDate: "2024-02-15",
      status: "Confirmed",
      lastCalled: "2024-02-20",
      callNotes: "Interested in AI workshops. Requested accessibility accommodations.",
      callHistory: [
        { date: "2024-02-20", notes: "Discussed workshop preferences", duration: "5 min" },
        { date: "2024-02-18", notes: "Initial registration confirmation", duration: "3 min" }
      ]
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+1-555-0124",
      event: "Product Launch Webinar",
      registrationDate: "2024-02-16",
      status: "Confirmed",
      lastCalled: null,
      callNotes: "",
      callHistory: []
    },
    {
      id: 3,
      name: "David Chen",
      email: "david@example.com",
      phone: "+1-555-0125",
      event: "Marketing Workshop",
      registrationDate: "2024-02-17",
      status: "Pending",
      lastCalled: "2024-02-18",
      callNotes: "Requested vegetarian meal option. Works at Tech Startup Inc.",
      callHistory: [
        { date: "2024-02-18", notes: "Discussed dietary requirements", duration: "4 min" }
      ]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1-555-0126",
      event: "Tech Conference 2024",
      registrationDate: "2024-02-19",
      status: "Confirmed",
      lastCalled: "2024-02-21",
      callNotes: "CEO at Innovation Labs. Interested in networking opportunities.",
      callHistory: [
        { date: "2024-02-21", notes: "Discussed VIP access and networking", duration: "8 min" },
        { date: "2024-02-19", notes: "Welcome call", duration: "2 min" }
      ]
    }
  ];

  const filteredParticipants = participants.filter(participant =>
    (participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     participant.event.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedEvent === "all" || participant.event === selectedEvent)
  );

  const handleExport = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Phone', 'Event', 'Registration Date', 'Status', 'Last Called'];
    const csvContent = [
      headers.join(','),
      ...filteredParticipants.map(p => [
        p.name,
        p.email,
        p.phone,
        p.event,
        p.registrationDate,
        p.status,
        p.lastCalled || 'Never'
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'participants.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const CallNotesDialog = ({ participant }: { participant: any }) => {
    const [newNote, setNewNote] = useState("");

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Notes
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Call Notes - {participant.name}</DialogTitle>
            <DialogDescription>
              View call history and add new notes for {participant.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Current Notes */}
            <div>
              <Label htmlFor="current-notes">Current Notes</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                {participant.callNotes || "No notes available"}
              </div>
            </div>

            {/* Call History */}
            <div>
              <Label>Call History</Label>
              <div className="mt-2 space-y-3">
                {participant.callHistory.length > 0 ? (
                  participant.callHistory.map((call: any, index: number) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{call.date}</span>
                        <span className="text-xs text-gray-500">{call.duration}</span>
                      </div>
                      <p className="text-sm text-gray-700">{call.notes}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No call history available</p>
                )}
              </div>
            </div>

            {/* Add New Note */}
            <div>
              <Label htmlFor="new-note">Add New Call Note</Label>
              <Textarea
                id="new-note"
                placeholder="Enter call notes..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="mt-2"
                rows={4}
              />
              <Button className="mt-3">Save Note</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const MultiAgentSettingsDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Call Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Multi-Agent Calling Settings</DialogTitle>
          <DialogDescription>
            Configure how multiple team members can call the same participant
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Multiple Agents</Label>
              <p className="text-sm text-gray-500">Multiple team members can call the same participant</p>
            </div>
            <Switch 
              checked={multiAgentCalling} 
              onCheckedChange={setMultiAgentCalling}
            />
          </div>
          
          {multiAgentCalling && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <Label>Call Coordination Rules</Label>
                <Select defaultValue="notify">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notify">Notify other agents before calling</SelectItem>
                    <SelectItem value="queue">Queue calls to avoid conflicts</SelectItem>
                    <SelectItem value="priority">Use agent priority system</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Max Concurrent Calls per Participant</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 call at a time</SelectItem>
                    <SelectItem value="2">2 calls maximum</SelectItem>
                    <SelectItem value="unlimited">No limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
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
            <h1 className="text-3xl font-bold text-gray-900">Participants</h1>
            <p className="text-gray-600 mt-1">Manage all event participants and communications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <AddParticipantDialog />
            <MultiAgentSettingsDialog />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Events</option>
            <option value="Tech Conference 2024">Tech Conference 2024</option>
            <option value="Product Launch Webinar">Product Launch Webinar</option>
            <option value="Marketing Workshop">Marketing Workshop</option>
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
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {participants.filter(p => p.status === 'Confirmed').length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Calls Made</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {participants.filter(p => p.lastCalled).length}
                  </p>
                </div>
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Follow-up</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {participants.filter(p => !p.lastCalled || p.status === 'Pending').length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>All Participants</CardTitle>
            <CardDescription>Manage participant communications and track call history</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Called</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParticipants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-gray-500">
                          Registered: {participant.registrationDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{participant.event}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {participant.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          {participant.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={participant.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {participant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {participant.lastCalled || 'Never'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <CallNotesDialog participant={participant} />
                        <ParticipantHistory participant={participant} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Participants;
