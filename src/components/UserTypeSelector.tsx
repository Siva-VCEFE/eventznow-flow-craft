
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings,
  Users,
  Building,
  UserCheck,
  Crown,
  Shield,
  User,
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserTypeSelectorProps {
  onUserTypeSelect: (userType: string) => void;
  currentUserType: string;
}

const UserTypeSelector = ({ onUserTypeSelect, currentUserType }: UserTypeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const userTypes = [
    {
      type: 'administrator',
      name: 'Administrator',
      description: 'Full access to all features, events, team management',
      icon: Crown,
      color: 'bg-purple-100 text-purple-800',
      features: ['Event Management', 'Team Management', 'Analytics', 'Billing', 'All Reports']
    },
    {
      type: 'team_member',
      name: 'Team Member',
      description: 'Handle tasks, participant communications, limited access',
      icon: Users,
      color: 'bg-blue-100 text-blue-800',
      features: ['Task Management', 'Participant Contact', 'Basic Reports', 'Time Tracking']
    },
    {
      type: 'sponsor',
      name: 'Sponsor',
      description: 'View sponsorship details, event analytics, branding',
      icon: Building,
      color: 'bg-green-100 text-green-800',
      features: ['Sponsorship Dashboard', 'Event Analytics', 'Brand Management', 'ROI Reports']
    },
    {
      type: 'participant',
      name: 'Participant',
      description: 'View registered events, feedback, participation history',
      icon: UserCheck,
      color: 'bg-orange-100 text-orange-800',
      features: ['Event Registration', 'Participation History', 'Feedback', 'Certificates']
    }
  ];

  const handleUserTypeSelect = (userType: string) => {
    onUserTypeSelect(userType);
    setIsOpen(false);
  };

  const getCurrentUserTypeInfo = () => {
    return userTypes.find(ut => ut.type === currentUserType) || userTypes[0];
  };

  const currentUser = getCurrentUserTypeInfo();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <currentUser.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{currentUser.name}</span>
          <Settings className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Select User Type
          </DialogTitle>
          <DialogDescription>
            Choose user type to see different interface views (UI Demo Mode)
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {userTypes.map((userType) => (
            <Card 
              key={userType.type}
              className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                currentUserType === userType.type 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleUserTypeSelect(userType.type)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${userType.color}`}>
                      <userType.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{userType.name}</CardTitle>
                      {currentUserType === userType.type && (
                        <Badge className="mt-1" size="sm">Current</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {userType.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <h5 className="font-medium text-sm text-gray-900">Available Features:</h5>
                  <div className="flex flex-wrap gap-1">
                    {userType.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            Currently viewing as: <span className="font-medium">{currentUser.name}</span>
          </div>
          <Button onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeSelector;
