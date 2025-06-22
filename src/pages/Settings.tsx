
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Building,
  Users,
  Bell,
  CreditCard,
  Shield,
  Upload,
  Save
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [organizationSettings, setOrganizationSettings] = useState({
    name: "Acme Events",
    description: "Leading event management company specializing in corporate conferences and workshops.",
    website: "https://acmeevents.com",
    phone: "+1-555-0199",
    address: "123 Business Ave, San Francisco, CA 94105",
    timezone: "America/Los_Angeles",
    currency: "USD"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    eventUpdates: true,
    weeklyReports: false,
    marketingEmails: false
  });

  const [teamSettings, setTeamSettings] = useState({
    allowAllAgentsToCall: true,
    requireApprovalForEvents: false,
    defaultEventCapacity: 100,
    autoAssignTasks: true
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your organization preferences and configurations</p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl">
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Organization Information
                </CardTitle>
                <CardDescription>Update your organization details and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={organizationSettings.name}
                      onChange={(e) => setOrganizationSettings({
                        ...organizationSettings,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="org-website">Website</Label>
                    <Input
                      id="org-website"
                      value={organizationSettings.website}
                      onChange={(e) => setOrganizationSettings({
                        ...organizationSettings,
                        website: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="org-description">Description</Label>
                  <Textarea
                    id="org-description"
                    value={organizationSettings.description}
                    onChange={(e) => setOrganizationSettings({
                      ...organizationSettings,
                      description: e.target.value
                    })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="org-phone">Phone Number</Label>
                    <Input
                      id="org-phone"
                      value={organizationSettings.phone}
                      onChange={(e) => setOrganizationSettings({
                        ...organizationSettings,
                        phone: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="org-timezone">Timezone</Label>
                    <Select 
                      value={organizationSettings.timezone}
                      onValueChange={(value) => setOrganizationSettings({
                        ...organizationSettings,
                        timezone: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PST)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (EST)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CST)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="org-address">Address</Label>
                  <Input
                    id="org-address"
                    value={organizationSettings.address}
                    onChange={(e) => setOrganizationSettings({
                      ...organizationSettings,
                      address: e.target.value
                    })}
                  />
                </div>

                <div>
                  <Label>Organization Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Logo
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Settings
                </CardTitle>
                <CardDescription>Configure team permissions and default behaviors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow all agents to call all participants</Label>
                      <p className="text-sm text-gray-600">When enabled, any team member can contact any event participant</p>
                    </div>
                    <Switch
                      checked={teamSettings.allowAllAgentsToCall}
                      onCheckedChange={(checked) => setTeamSettings({
                        ...teamSettings,
                        allowAllAgentsToCall: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require approval for new events</Label>
                      <p className="text-sm text-gray-600">New events must be approved by an admin before going live</p>
                    </div>
                    <Switch
                      checked={teamSettings.requireApprovalForEvents}
                      onCheckedChange={(checked) => setTeamSettings({
                        ...teamSettings,
                        requireApprovalForEvents: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-assign tasks</Label>
                      <p className="text-sm text-gray-600">Automatically distribute tasks among team members</p>
                    </div>
                    <Switch
                      checked={teamSettings.autoAssignTasks}
                      onCheckedChange={(checked) => setTeamSettings({
                        ...teamSettings,
                        autoAssignTasks: checked
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="default-capacity">Default Event Capacity</Label>
                  <Input
                    id="default-capacity"
                    type="number"
                    value={teamSettings.defaultEventCapacity}
                    onChange={(e) => setTeamSettings({
                      ...teamSettings,
                      defaultEventCapacity: parseInt(e.target.value)
                    })}
                    className="max-w-xs"
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Team Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Task Reminders</Label>
                      <p className="text-sm text-gray-600">Get reminded about upcoming task deadlines</p>
                    </div>
                    <Switch
                      checked={notificationSettings.taskReminders}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        taskReminders: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Event Updates</Label>
                      <p className="text-sm text-gray-600">Notifications about event changes and updates</p>
                    </div>
                    <Switch
                      checked={notificationSettings.eventUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        eventUpdates: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-gray-600">Receive weekly performance summaries</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        weeklyReports: checked
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-gray-600">Product updates and marketing communications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({
                        ...notificationSettings,
                        marketingEmails: checked
                      })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>Manage your subscription and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Current Plan: Professional</h3>
                  <p className="text-blue-700">$29/month - Up to 50 events per month</p>
                  <p className="text-sm text-blue-600 mt-1">Next billing date: March 15, 2024</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Payment Method</h4>
                  <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-md">
                    <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Update
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Billing History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                      <div>
                        <p className="font-medium">February 2024</p>
                        <p className="text-sm text-gray-600">Professional Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$29.00</p>
                        <Button variant="link" size="sm" className="p-0 h-auto">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Password</h4>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-gray-600">+1 •••• •••• ••99</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-600">Chrome on macOS - San Francisco, CA</p>
                      </div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">Sign Out All Devices</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
