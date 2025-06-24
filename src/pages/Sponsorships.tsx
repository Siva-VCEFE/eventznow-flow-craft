
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Search,
  IndianRupee,
  Users,
  Calendar,
  MapPin,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Globe,
  FileText,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Sponsorships = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [addSponsorDialog, setAddSponsorDialog] = useState(false);

  const events = [
    { id: 1, name: "Tech Conference 2024", sponsorshipSlots: 8, filledSlots: 3 },
    { id: 2, name: "Product Launch Webinar", sponsorshipSlots: 5, filledSlots: 2 },
    { id: 3, name: "Marketing Workshop", sponsorshipSlots: 3, filledSlots: 3 }
  ];

  const sponsorships = [
    {
      id: 1,
      eventName: "Tech Conference 2024",
      eventId: 1,
      sponsorName: "TechCorp Solutions",
      contactPerson: "Rajesh Sharma",
      email: "rajesh@techcorp.in",
      phone: "+91-9876543210",
      website: "www.techcorp.in",
      sponsorshipTier: "Platinum",
      amount: "₹2,50,000",
      status: "Confirmed",
      benefits: "Logo on all materials, 10-minute presentation slot, Premium booth",
      notes: "Interested in future events as well",
      signedDate: "2024-02-15",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      eventName: "Tech Conference 2024",
      eventId: 1,
      sponsorName: "StartupHub India",
      contactPerson: "Priya Patel",
      email: "priya@startuphub.in",
      phone: "+91-9876543211",
      website: "www.startuphub.in",
      sponsorshipTier: "Gold",
      amount: "₹1,50,000",
      status: "Pending",
      benefits: "Logo on banners, Standard booth, Networking session",
      notes: "Waiting for final approval from board",
      signedDate: null,
      paymentStatus: "Pending"
    },
    {
      id: 3,
      eventName: "Product Launch Webinar",
      eventId: 2,
      sponsorName: "Digital Marketing Pro",
      contactPerson: "Amit Kumar",
      email: "amit@digitalmarketing.in",
      phone: "+91-9876543212",
      website: "www.digitalmarketing.in",
      sponsorshipTier: "Silver",
      amount: "₹75,000",
      status: "Confirmed",
      benefits: "Logo on website, Social media mentions",
      notes: "First time sponsor, very enthusiastic",
      signedDate: "2024-03-01",
      paymentStatus: "Paid"
    }
  ];

  const filteredSponsorships = sponsorships.filter(sponsorship => {
    if (selectedEvent !== "all" && sponsorship.eventId.toString() !== selectedEvent) return false;
    if (selectedStatus !== "all" && sponsorship.status.toLowerCase() !== selectedStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const totalRevenue = sponsorships
    .filter(s => s.paymentStatus === 'Paid')
    .reduce((sum, s) => sum + parseInt(s.amount.replace('₹', '').replace(',', '')), 0);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Sponsorships</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage event sponsorships and partnerships</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setAddSponsorDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Sponsor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sponsors</p>
                  <p className="text-2xl font-bold text-gray-900">{sponsorships.length}</p>
                  <p className="text-xs text-gray-500">across all events</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sponsorships.filter(s => s.status === 'Confirmed').length}
                  </p>
                  <p className="text-xs text-gray-500">sponsors confirmed</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sponsorships.filter(s => s.status === 'Pending').length}
                  </p>
                  <p className="text-xs text-gray-500">awaiting approval</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500">from sponsorships</p>
                </div>
                <IndianRupee className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search sponsors..." className="pl-10 text-sm" />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by Event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sponsorships List */}
        <div className="space-y-4">
          {filteredSponsorships.map((sponsorship) => (
            <Card key={sponsorship.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Main Sponsor Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{sponsorship.sponsorName}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(sponsorship.status)}>
                              {sponsorship.status}
                            </Badge>
                            <Badge className={getTierColor(sponsorship.sponsorshipTier)}>
                              {sponsorship.sponsorshipTier}
                            </Badge>
                            <Badge variant="outline">
                              {sponsorship.eventName}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{sponsorship.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{sponsorship.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{sponsorship.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{sponsorship.website}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">
                          {sponsorship.signedDate ? `Signed: ${sponsorship.signedDate}` : 'Not signed yet'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">Payment: {sponsorship.paymentStatus}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2 text-sm">Sponsorship Benefits:</h4>
                      <p className="text-blue-700 text-sm">{sponsorship.benefits}</p>
                    </div>

                    {/* Notes */}
                    {sponsorship.notes && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">Notes:</h4>
                        <p className="text-gray-700 text-sm">{sponsorship.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Amount & Actions */}
                  <div className="lg:w-64 space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                      <div className="flex items-center justify-center gap-1 text-green-700 mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="font-semibold text-sm">Sponsorship Amount</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{sponsorship.amount}</div>
                      <Badge 
                        variant={sponsorship.paymentStatus === 'Paid' ? 'default' : 'secondary'}
                        className="mt-2"
                      >
                        {sponsorship.paymentStatus}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                      >
                        <Eye className="w-3 h-3 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                      >
                        <Edit className="w-3 h-3 mr-2" />
                        Edit Sponsor
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                      >
                        <FileText className="w-3 h-3 mr-2" />
                        Generate Contract
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-xs"
                      >
                        <TrendingUp className="w-3 h-3 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Sponsor Dialog */}
        <Dialog open={addSponsorDialog} onOpenChange={setAddSponsorDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Sponsor</DialogTitle>
              <DialogDescription>
                Add a new sponsor for your events
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsor-name">Sponsor Name</Label>
                  <Input id="sponsor-name" placeholder="Company Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Contact Person Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91-9876543210" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="www.company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event">Event</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(event => (
                        <SelectItem key={event.id} value={event.id.toString()}>
                          {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tier">Sponsorship Tier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" placeholder="Enter amount" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea id="benefits" placeholder="List sponsorship benefits..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAddSponsorDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddSponsorDialog(false)}>
                Add Sponsor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Sponsorships;
