
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
import { UserPlus } from "lucide-react";

const AddParticipantDialog = () => {
  const [participant, setParticipant] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    source: "",
    notes: ""
  });

  const handleSubmit = () => {
    console.log("Adding participant:", participant);
    // Handle participant addition logic here
    setParticipant({
      name: "",
      email: "",
      phone: "",
      event: "",
      source: "",
      notes: ""
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Participant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Participant</DialogTitle>
          <DialogDescription>
            Manually add a participant to an event
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="participant-name">Full Name</Label>
            <Input
              id="participant-name"
              placeholder="Enter participant name"
              value={participant.name}
              onChange={(e) => setParticipant({...participant, name: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="participant-email">Email Address</Label>
            <Input
              id="participant-email"
              type="email"
              placeholder="participant@example.com"
              value={participant.email}
              onChange={(e) => setParticipant({...participant, email: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="participant-phone">Phone Number</Label>
            <Input
              id="participant-phone"
              placeholder="+1-555-0123"
              value={participant.phone}
              onChange={(e) => setParticipant({...participant, phone: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="participant-event">Event</Label>
            <Select value={participant.event} onValueChange={(value) => setParticipant({...participant, event: value})}>
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

          <div>
            <Label htmlFor="participant-source">Source</Label>
            <Select value={participant.source} onValueChange={(value) => setParticipant({...participant, source: value})}>
              <SelectTrigger>
                <SelectValue placeholder="How did they find us?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="email-campaign">Email Campaign</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="participant-notes">Notes (Optional)</Label>
            <Textarea
              id="participant-notes"
              placeholder="Any additional information..."
              value={participant.notes}
              onChange={(e) => setParticipant({...participant, notes: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Add Participant</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddParticipantDialog;
