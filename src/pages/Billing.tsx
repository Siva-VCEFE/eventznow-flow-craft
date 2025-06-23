
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar,
  TrendingUp,
  Check,
  X,
  Download,
  AlertCircle,
  Crown,
  Zap,
  Shield
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState("professional");
  
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "₹999",
      period: "month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 events per month",
        "Up to 100 participants per event", 
        "Basic analytics",
        "Email support",
        "Standard templates"
      ],
      limitations: [
        "No custom branding",
        "Limited integrations",
        "No priority support"
      ],
      popular: false
    },
    {
      id: "professional",
      name: "Professional",
      price: "₹2,499",
      period: "month",
      description: "Best for growing businesses",
      features: [
        "Up to 25 events per month",
        "Up to 1,000 participants per event",
        "Advanced analytics & reports",
        "Priority email & chat support",
        "Custom branding",
        "API access",
        "Team collaboration tools",
        "Time tracking features"
      ],
      limitations: [
        "Limited WhatsApp integrations"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "₹7,999",
      period: "month",
      description: "For large organizations with advanced needs",
      features: [
        "Unlimited events",
        "Unlimited participants",
        "Advanced analytics with custom reports",
        "24/7 phone & chat support",
        "Full custom branding",
        "Advanced API access",
        "Dedicated account manager",
        "Custom integrations",
        "WhatsApp Business API",
        "SMS & Email automation",
        "Multi-tenant management"
      ],
      limitations: [],
      popular: false
    }
  ];

  const currentPlanData = plans.find(plan => plan.id === currentPlan);

  const billingHistory = [
    {
      id: 1,
      date: "2024-03-01",
      description: "Professional Plan - Monthly",
      amount: "₹2,499",
      status: "Paid",
      invoice: "INV-2024-003"
    },
    {
      id: 2,
      date: "2024-02-01", 
      description: "Professional Plan - Monthly",
      amount: "₹2,499",
      status: "Paid",
      invoice: "INV-2024-002"
    },
    {
      id: 3,
      date: "2024-01-01",
      description: "Professional Plan - Monthly", 
      amount: "₹2,499",
      status: "Paid",
      invoice: "INV-2024-001"
    }
  ];

  const usageStats = {
    events: { used: 12, limit: 25, percentage: 48 },
    participants: { used: 1243, limit: 1000, percentage: 124 },
    storage: { used: 2.4, limit: 10, percentage: 24, unit: "GB" },
    apiCalls: { used: 8450, limit: 50000, percentage: 17 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-gray-600 mt-1">Manage your subscription and billing information</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{currentPlanData?.name}</h3>
                        <p className="text-gray-600">{currentPlanData?.description}</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{currentPlanData?.price}</span>
                      <span className="text-gray-600">/{currentPlanData?.period}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Change Plan</Button>
                      <Button variant="outline" size="sm">Cancel Subscription</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">**** **** **** 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Next billing date:</span>
                        <span className="font-medium">April 1, 2024</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Amount:</span>
                        <span className="font-medium">₹2,499</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Update Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Usage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{usageStats.events.used}</p>
                    <p className="text-sm text-gray-600">of {usageStats.events.limit} events</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(usageStats.events.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{usageStats.participants.used.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">of {usageStats.participants.limit.toLocaleString()} participants</p>  
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(usageStats.participants.percentage, 100)}%` }}
                      ></div>
                    </div>
                    {usageStats.participants.percentage > 100 && (
                      <p className="text-xs text-red-600 mt-1">Over limit - consider upgrading</p>
                    )}
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{usageStats.storage.used}</p>
                    <p className="text-sm text-gray-600">of {usageStats.storage.limit} {usageStats.storage.unit}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${usageStats.storage.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{usageStats.apiCalls.used.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">of {usageStats.apiCalls.limit.toLocaleString()} API calls</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${usageStats.apiCalls.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-gray-600 mb-6">Select the plan that best fits your event management needs</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {plan.id === 'starter' && <Shield className="w-5 h-5 text-green-600" />}
                        {plan.id === 'professional' && <Zap className="w-5 h-5 text-blue-600" />}
                        {plan.id === 'enterprise' && <Crown className="w-5 h-5 text-yellow-600" />}
                        {plan.name}
                      </CardTitle>
                      {currentPlan === plan.id && <Badge variant="outline">Current</Badge>}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Included:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {plan.limitations.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Limitations:</h4>
                          <ul className="space-y-1">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full"
                        variant={currentPlan === plan.id ? "outline" : "default"}
                        disabled={currentPlan === plan.id}
                      >
                        {currentPlan === plan.id ? "Current Plan" : "Upgrade to " + plan.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Usage Statistics</CardTitle>
                <CardDescription>Monitor your current usage against plan limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Events This Month</span>
                      <span className="text-sm text-gray-600">{usageStats.events.used} / {usageStats.events.limit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(usageStats.events.percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total Participants</span>
                      <span className="text-sm text-gray-600">{usageStats.participants.used.toLocaleString()} / {usageStats.participants.limit.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${usageStats.participants.percentage > 100 ? 'bg-red-600' : 'bg-green-600'}`}
                        style={{ width: `${Math.min(usageStats.participants.percentage, 100)}%` }}
                      ></div>
                    </div>
                    {usageStats.participants.percentage > 100 && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">You've exceeded your participant limit. Consider upgrading your plan.</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Storage Used</span>
                      <span className="text-sm text-gray-600">{usageStats.storage.used} / {usageStats.storage.limit} {usageStats.storage.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${usageStats.storage.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">API Calls This Month</span>
                      <span className="text-sm text-gray-600">{usageStats.apiCalls.used.toLocaleString()} / {usageStats.apiCalls.limit.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-orange-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${usageStats.apiCalls.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>View and download your past invoices</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{bill.description}</h4>
                          <p className="text-sm text-gray-600">{bill.date} • {bill.invoice}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{bill.amount}</p>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {bill.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
