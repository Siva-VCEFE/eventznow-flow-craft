
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
import { Badge } from "@/components/ui/badge";
import { Plus, X, Users, Building, MapPin, Phone, Mail, Calendar, IndianRupee } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AddParticipantDialog = () => {
  const [participant, setParticipant] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    
    // Professional Information
    company: "",
    designation: "",
    industry: "",
    experience: "",
    businessType: "",
    annualRevenue: "",
    teamSize: "",
    
    // Address Information
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    
    // Event Specific
    selectedEvent: "",
    ticketType: "",
    registrationSource: "",
    referredBy: "",
    
    // Business Interests
    businessGoals: [],
    interests: [],
    networkingPreference: "both",
    
    // Call & Communication Settings
    callRequired: false,
    preferredCallTime: "",
    communicationPreference: "email",
    whatsappOptIn: false,
    smsOptIn: false,
    
    // Additional Information
    dietaryRestrictions: "",
    specialRequirements: "",
    previousEvents: 0,
    notes: "",
    
    // Payment Information
    paymentStatus: "pending",
    amountPaid: "",
    paymentMethod: "",
    invoiceRequired: false,
    gstNumber: ""
  });

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const businessInterests = [
    "Digital Marketing", "Sales & Lead Generation", "Business Development",
    "Entrepreneurship", "Startup Ecosystem", "Technology & Innovation",
    "Finance & Investment", "HR & Talent Management", "Operations",
    "Customer Experience", "Product Development", "Market Research"
  ];

  const businessGoals = [
    "Network Building", "Learn New Skills", "Business Growth",
    "Find Partners", "Investor Connections", "Market Expansion",
    "Team Building", "Industry Insights", "Technology Adoption",
    "Brand Building", "Knowledge Sharing", "Career Development"
  ];

  const businessTypes = [
    "Startup", "SME", "Enterprise", "Freelancer", "Consultant", 
    "Agency", "E-commerce", "Manufacturing", "Service Provider", 
    "Non-Profit", "Government", "Educational Institution"
  ];

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Retail",
    "Manufacturing", "Real Estate", "Hospitality", "Agriculture",
    "Automotive", "Media & Entertainment", "Logistics", "Others"
  ];

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGoalToggle = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Participant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Add New Participant
          </DialogTitle>
          <DialogDescription>
            Add detailed participant information for comprehensive event management
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Basic Information
              </h3>
            </div>
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                value={participant.firstName}
                onChange={(e) => setParticipant({...participant, firstName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                value={participant.lastName}
                onChange={(e) => setParticipant({...participant, lastName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={participant.email}
                onChange={(e) => setParticipant({...participant, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                value={participant.phone}
                onChange={(e) => setParticipant({...participant, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="alternatePhone">Alternate Phone</Label>
              <Input
                id="alternatePhone"
                placeholder="+91 9876543210"
                value={participant.alternatePhone}
                onChange={(e) => setParticipant({...participant, alternatePhone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="selectedEvent">Event *</Label>
              <Select value={participant.selectedEvent} onValueChange={(value) => setParticipant({...participant, selectedEvent: value})}>
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
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Professional Information
              </h3>
            </div>
            <div>
              <Label htmlFor="company">Company/Organization *</Label>
              <Input
                id="company"
                placeholder="Enter company name"
                value={participant.company}
                onChange={(e) => setParticipant({...participant, company: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                placeholder="CEO, Manager, etc."
                value={participant.designation}
                onChange={(e) => setParticipant({...participant, designation: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={participant.industry} onValueChange={(value) => setParticipant({...participant, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={participant.businessType} onValueChange={(value) => setParticipant({...participant, businessType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Select value={participant.experience} onValueChange={(value) => setParticipant({...participant, experience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-15">11-15 years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Select value={participant.teamSize} onValueChange={(value) => setParticipant({...participant, teamSize: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 people</SelectItem>
                  <SelectItem value="11-50">11-50 people</SelectItem>
                  <SelectItem value="51-200">51-200 people</SelectItem>
                  <SelectItem value="201-500">201-500 people</SelectItem>
                  <SelectItem value="500+">500+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address Information
              </h3>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter full address"
                value={participant.address}
                onChange={(e) => setParticipant({...participant, address: e.target.value})}
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={participant.city}
                onChange={(e) => setParticipant({...participant, city: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="Enter state"
                value={participant.state}
                onChange={(e) => setParticipant({...participant, state: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="pincode">PIN Code</Label>
              <Input
                id="pincode"
                placeholder="400001"
                value={participant.pincode}
                onChange={(e) => setParticipant({...participant, pincode: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={participant.country}
                onChange={(e) => setParticipant({...participant, country: e.target.value})}
              />
            </div>
          </div>

          {/* Business Interests & Goals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Business Interests & Goals
            </h3>
            <div>
              <Label>Business Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {businessInterests.map((interest) => (
                  <Badge 
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label>Business Goals</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {businessGoals.map((goal) => (
                  <Badge 
                    key={goal}
                    variant={selectedGoals.includes(goal) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                    {selectedGoals.includes(goal) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Communication Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={participant.callRequired}
                  onCheckedChange={(checked) => setParticipant({...participant, callRequired: checked})}
                />
                <Label>Requires Follow-up Call</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={participant.whatsappOptIn}
                  onCheckedChange={(checked) => setParticipant({...participant, whatsappOptIn: checked})}
                />
                <Label>WhatsApp Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={participant.smsOptIn}
                  onCheckedChange={(checked) => setParticipant({...participant, smsOptIn: checked})}
                />
                <Label>SMS Updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={participant.invoiceRequired}
                  onCheckedChange={(checked) => setParticipant({...participant, invoiceRequired: checked})}
                />
                <Label>Invoice Required</Label>
              </div>
            </div>
            {participant.invoiceRequired && (
              <div>
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  placeholder="Enter GST number"
                  value={participant.gstNumber}
                  onChange={(e) => setParticipant({...participant, gstNumber: e.target.value})}
                />
              </div>
            )}
          </div>

          {/* Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                Payment Information
              </h3>
            </div>
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select value={participant.paymentStatus} onValueChange={(value) => setParticipant({...participant, paymentStatus: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amountPaid">Amount Paid (₹)</Label>
              <Input
                id="amountPaid"
                type="number"
                placeholder="0"
                value={participant.amountPaid}
                onChange={(e) => setParticipant({...participant, amountPaid: e.target.value})}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                <Input
                  id="dietaryRestrictions"
                  placeholder="e.g., Vegetarian, Vegan, etc."
                  value={participant.dietaryRestrictions}
                  onChange={(e) => setParticipant({...participant, dietaryRestrictions: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="referredBy">Referred By</Label>
                <Input
                  id="referredBy"
                  placeholder="Name of referrer"
                  value={participant.referredBy}
                  onChange={(e) => setParticipant({...participant, referredBy: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information or special requirements"
                value={participant.notes}
                onChange={(e) => setParticipant({...participant, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Add Participant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddParticipantDialog;
