import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Upload, 
  Users, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Plus,
  Eye,
  IndianRupee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [eventData, setEventData] = useState({
    // Basic Info
    name: "",
    description: "",
    category: "",
    organizers: [] as string[],
    
    // Date & Time
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "IST",
    
    // Location
    locationType: "venue",
    venue: "",
    address: "",
    onlineUrl: "",
    
    // Registration
    maxParticipants: "",
    registrationStart: "",
    registrationEnd: "",
    customFields: [] as any[],
    
    // Payment - Multiple pricing tiers
    isPaid: false,
    pricingTiers: [] as any[],
    currency: "INR",
    
    // Documents
    banner: null as File | null,
    documents: [] as File[]
  });

  const [showFormPreview, setShowFormPreview] = useState(false);

  const steps = [
    { id: 1, name: "Basic Info", icon: Calendar },
    { id: 2, name: "Schedule", icon: Clock },
    { id: 3, name: "Location", icon: MapPin },
    { id: 4, name: "Registration", icon: Users },
    { id: 5, name: "Pricing", icon: CreditCard },
    { id: 6, name: "Documents", icon: Upload }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate unique registration link
      const registrationLink = `https://eventz.app/register/${eventData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      console.log("Event data:", { ...eventData, registrationLink });
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateEventData = (field: string, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const addPricingTier = () => {
    const newTier = {
      id: Date.now(),
      name: "",
      price: "",
      description: "",
      maxTickets: "",
      earlyBirdDiscount: false,
      discountPercentage: 0
    };
    updateEventData("pricingTiers", [...eventData.pricingTiers, newTier]);
  };

  const removePricingTier = (id: number) => {
    updateEventData("pricingTiers", eventData.pricingTiers.filter(tier => tier.id !== id));
  };

  const updatePricingTier = (id: number, field: string, value: any) => {
    updateEventData("pricingTiers", eventData.pricingTiers.map(tier => 
      tier.id === id ? { ...tier, [field]: value } : tier
    ));
  };

  const addCustomField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      type: "text",
      required: false,
      options: []
    };
    updateEventData("customFields", [...eventData.customFields, newField]);
  };

  const removeCustomField = (id: number) => {
    updateEventData("customFields", eventData.customFields.filter(field => field.id !== id));
  };

  const updateCustomField = (id: number, field: string, value: any) => {
    updateEventData("customFields", eventData.customFields.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const FormPreview = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Registration Form Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Full Name *</Label>
          <Input placeholder="Enter your full name" disabled />
        </div>
        <div>
          <Label>Email Address *</Label>
          <Input type="email" placeholder="your@email.com" disabled />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input placeholder="+91 9876543210" disabled />
        </div>
        
        {eventData.customFields.map((field) => (
          <div key={field.id}>
            <Label>{field.label} {field.required && '*'}</Label>
            {field.type === 'text' && <Input placeholder={`Enter ${field.label.toLowerCase()}`} disabled />}
            {field.type === 'email' && <Input type="email" placeholder="email@example.com" disabled />}
            {field.type === 'number' && <Input type="number" placeholder="0" disabled />}
            {field.type === 'textarea' && <Textarea placeholder={`Enter ${field.label.toLowerCase()}`} disabled />}
            {field.type === 'select' && (
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
              </Select>
            )}
          </div>
        ))}

        {eventData.isPaid && eventData.pricingTiers.length > 0 && (
          <div>
            <Label>Select Ticket Type *</Label>
            <div className="space-y-2 mt-2">
              {eventData.pricingTiers.map((tier) => (
                <div key={tier.id} className="border rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{tier.name || 'Ticket Type'}</h4>
                      <p className="text-sm text-gray-600">{tier.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{tier.price || '0'}</p>
                      {tier.earlyBirdDiscount && (
                        <p className="text-sm text-green-600">{tier.discountPercentage}% Early Bird</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Button className="w-full" disabled>
          {eventData.isPaid ? 'Proceed to Payment' : 'Register Now'}
        </Button>
      </CardContent>
    </Card>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Event Name *</Label>
              <Input
                id="name"
                placeholder="Enter event name"
                value={eventData.name}
                onChange={(e) => updateEventData("name", e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event"
                value={eventData.description}
                onChange={(e) => updateEventData("description", e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={eventData.category} onValueChange={(value) => updateEventData("category", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select event category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Organizers</Label>
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Add organizer email" />
                  <Button type="button" variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {eventData.organizers.map((organizer, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {organizer}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => {
                        updateEventData("organizers", eventData.organizers.filter((_, i) => i !== index));
                      }} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={eventData.startDate}
                  onChange={(e) => updateEventData("startDate", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={eventData.endDate}
                  onChange={(e) => updateEventData("endDate", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={eventData.startTime}
                  onChange={(e) => updateEventData("startTime", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={eventData.endTime}
                  onChange={(e) => updateEventData("endTime", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={eventData.timezone} onValueChange={(value) => updateEventData("timezone", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IST">Indian Standard Time (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                  <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                  <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Location Type</Label>
              <div className="mt-2 flex gap-4">
                <Button
                  type="button"
                  variant={eventData.locationType === "venue" ? "default" : "outline"}
                  onClick={() => updateEventData("locationType", "venue")}
                >
                  Physical Venue
                </Button>
                <Button
                  type="button"
                  variant={eventData.locationType === "online" ? "default" : "outline"}
                  onClick={() => updateEventData("locationType", "online")}
                >
                  Online Event
                </Button>
              </div>
            </div>
            
            {eventData.locationType === "venue" ? (
              <>
                <div>
                  <Label htmlFor="venue">Venue Name</Label>
                  <Input
                    id="venue"
                    placeholder="Enter venue name"
                    value={eventData.venue}
                    onChange={(e) => updateEventData("venue", e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter venue address"
                    value={eventData.address}
                    onChange={(e) => updateEventData("address", e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Google Maps Integration</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        We'll automatically geocode your address and add a map pin for participants.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="onlineUrl">Meeting URL</Label>
                <Input
                  id="onlineUrl"
                  type="url"
                  placeholder="https://zoom.us/j/..."
                  value={eventData.onlineUrl}
                  onChange={(e) => updateEventData("onlineUrl", e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                placeholder="Enter max participants (leave empty for unlimited)"
                value={eventData.maxParticipants}
                onChange={(e) => updateEventData("maxParticipants", e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationStart">Registration Opens</Label>
                <Input
                  id="registrationStart"
                  type="datetime-local"
                  value={eventData.registrationStart}
                  onChange={(e) => updateEventData("registrationStart", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="registrationEnd">Registration Closes</Label>
                <Input
                  id="registrationEnd"
                  type="datetime-local"
                  value={eventData.registrationEnd}
                  onChange={(e) => updateEventData("registrationEnd", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Custom Registration Fields</Label>
                <Button type="button" variant="outline" onClick={addCustomField}>
                  Add Field
                </Button>
              </div>
              
              <div className="space-y-4">
                {eventData.customFields.map((field) => (
                  <div key={field.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Field Label</Label>
                        <Input
                          placeholder="Field name"
                          value={field.label}
                          onChange={(e) => updateCustomField(field.id, "label", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Field Type</Label>
                        <Select value={field.type} onValueChange={(value) => updateCustomField(field.id, "type", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="select">Dropdown</SelectItem>
                            <SelectItem value="textarea">Text Area</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={field.required}
                            onCheckedChange={(checked) => updateCustomField(field.id, "required", checked)}
                          />
                          <Label>Required</Label>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCustomField(field.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowFormPreview(!showFormPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showFormPreview ? 'Hide' : 'Show'} Form Preview
              </Button>
            </div>

            {showFormPreview && <FormPreview />}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  checked={eventData.isPaid}
                  onCheckedChange={(checked) => updateEventData("isPaid", checked)}
                />
                <Label>This is a paid event</Label>
              </div>
              
              {eventData.isPaid && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Pricing Tiers</Label>
                    <Button type="button" variant="outline" onClick={addPricingTier}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Pricing Tier
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {eventData.pricingTiers.map((tier) => (
                      <div key={tier.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Tier Name</Label>
                            <Input
                              placeholder="e.g., Early Bird, Regular, VIP"
                              value={tier.name}
                              onChange={(e) => updatePricingTier(tier.id, "name", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              Price (INR)
                            </Label>
                            <Input
                              type="number"
                              placeholder="2500"
                              value={tier.price}
                              onChange={(e) => updatePricingTier(tier.id, "price", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Description</Label>
                            <Input
                              placeholder="Brief description of this tier"
                              value={tier.description}
                              onChange={(e) => updatePricingTier(tier.id, "description", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Max Tickets</Label>
                            <Input
                              type="number"
                              placeholder="100"
                              value={tier.maxTickets}
                              onChange={(e) => updatePricingTier(tier.id, "maxTickets", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={tier.earlyBirdDiscount}
                              onCheckedChange={(checked) => updatePricingTier(tier.id, "earlyBirdDiscount", checked)}
                            />
                            <Label>Early Bird Discount</Label>
                            {tier.earlyBirdDiscount && (
                              <Input
                                type="number"
                                placeholder="10"
                                value={tier.discountPercentage}
                                onChange={(e) => updatePricingTier(tier.id, "discountPercentage", e.target.value)}
                                className="w-20 ml-2"
                              />
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePricingTier(tier.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label>Event Banner</Label>
              <div className="mt-2">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload banner</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 1920x1080px)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600 mt-1">Follow the steps to set up your event</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > step.id ? 'bg-green-500 border-green-500 text-white' :
                  currentStep === step.id ? 'bg-blue-500 border-blue-500 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="border-0">
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].name}</CardTitle>
              <CardDescription>
                Step {currentStep} of {totalSteps}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === totalSteps ? 'Create Event' : 'Next'}
              {currentStep !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateEvent;
