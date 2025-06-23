
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, 
  Calendar, 
  Star, 
  MapPin, 
  Users,
  TrendingUp,
  MessageCircle
} from "lucide-react";

interface ParticipantHistoryProps {
  participant: any;
}

const ParticipantHistory = ({ participant }: ParticipantHistoryProps) => {
  const participantHistory = {
    totalEvents: 8,
    completedEvents: 6,
    upcomingEvents: 2,
    totalSpent: "$2,450",
    averageRating: 4.8,
    joinedFrom: "LinkedIn Campaign",
    registrationDate: "2023-08-15",
    events: [
      {
        id: 1,
        name: "Tech Conference 2024",
        date: "2024-03-15",
        status: "Attended",
        rating: 5,
        feedback: "Excellent event with great networking opportunities!",
        spent: "$299"
      },
      {
        id: 2,
        name: "AI Workshop Series",
        date: "2024-02-20",
        status: "Attended",
        rating: 4,
        feedback: "Very informative, would recommend to others.",
        spent: "$199"
      },
      {
        id: 3,
        name: "Marketing Summit",
        date: "2024-01-10",
        status: "Registered",
        rating: null,
        feedback: null,
        spent: "$0"
      }
    ],
    preferences: {
      preferredTopics: ["Technology", "AI/ML", "Business Strategy"],
      preferredFormat: "In-person",
      dietaryRestrictions: "Vegetarian",
      accessibilityNeeds: "None"
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="w-4 h-4 mr-2" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Participant History - {participant.name}</DialogTitle>
          <DialogDescription>
            Complete history and analytics for {participant.name}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Events</p>
                      <p className="text-xl font-bold">{participantHistory.totalEvents}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Attended</p>
                      <p className="text-xl font-bold">{participantHistory.completedEvents}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Spent</p>
                      <p className="text-xl font-bold">{participantHistory.totalSpent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                      <p className="text-xl font-bold">{participantHistory.averageRating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acquisition Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined From:</span>
                  <Badge variant="secondary">{participantHistory.joinedFrom}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration Date:</span>
                  <span>{participantHistory.registrationDate}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {participantHistory.events.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{event.date}</span>
                        <Badge variant={event.status === 'Attended' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{event.spent}</p>
                      {event.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{event.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            {participantHistory.events.filter(e => e.feedback).map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < event.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600">({event.rating}/5)</span>
                  </div>
                  <p className="text-gray-700">{event.feedback}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Preferred Topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {participantHistory.preferences.preferredTopics.map((topic, index) => (
                      <Badge key={index} variant="outline">{topic}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Preferred Format:</p>
                  <Badge variant="secondary">{participantHistory.preferences.preferredFormat}</Badge>
                </div>
                <div>
                  <p className="font-medium mb-2">Dietary Restrictions:</p>
                  <span className="text-gray-700">{participantHistory.preferences.dietaryRestrictions}</span>
                </div>
                <div>
                  <p className="font-medium mb-2">Accessibility Needs:</p>
                  <span className="text-gray-700">{participantHistory.preferences.accessibilityNeeds}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantHistory;
