
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown, 
  Zap, 
  Star,
  Users,
  Calendar,
  BarChart3,
  Shield
} from "lucide-react";

const SubscriptionModel = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: Zap,
      features: [
        "Up to 5 events per month",
        "Up to 100 participants per event",
        "Basic analytics",
        "Email support",
        "Standard templates",
        "Basic participant management"
      ],
      limits: {
        events: 5,
        participants: 100,
        teamMembers: 3,
        storage: "1GB"
      }
    },
    {
      name: "Professional",
      description: "Ideal for growing organizations",
      monthlyPrice: 79,
      yearlyPrice: 790,
      icon: Star,
      popular: true,
      features: [
        "Up to 25 events per month",
        "Up to 1,000 participants per event",
        "Advanced analytics & reports",
        "Priority support",
        "Custom branding",
        "Advanced participant management",
        "Team collaboration tools",
        "API access",
        "Multi-agent calling system"
      ],
      limits: {
        events: 25,
        participants: 1000,
        teamMembers: 10,
        storage: "10GB"
      }
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      icon: Crown,
      features: [
        "Unlimited events",
        "Unlimited participants",
        "Custom analytics dashboard",
        "24/7 dedicated support",
        "White-label solution",
        "Advanced integrations",
        "Custom workflows",
        "SSO integration",
        "Advanced security features",
        "Dedicated account manager"
      ],
      limits: {
        events: "Unlimited",
        participants: "Unlimited",
        teamMembers: "Unlimited",
        storage: "100GB"
      }
    }
  ];

  const getCurrentPrice = (plan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Scale your event management with our flexible pricing plans. All plans include our core features with different limits and capabilities.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Yearly
          </span>
          {billingCycle === 'yearly' && (
            <Badge variant="secondary" className="ml-2">Save up to 20%</Badge>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <plan.icon className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">
                  ${getCurrentPrice(plan)}
                  <span className="text-lg font-normal text-gray-500">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-green-600">
                    Save ${getSavings(plan)} per year
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Usage Limits */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <h4 className="font-medium text-gray-900">Usage Limits</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {plan.limits.events} events
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {plan.limits.participants} participants
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {plan.limits.teamMembers} team members
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    {plan.limits.storage} storage
                  </div>
                </div>
              </div>

              <Button 
                className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise Contact */}
      <div className="text-center space-y-4 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Need a Custom Solution?</h3>
        <p className="text-gray-600">
          Contact our sales team for custom pricing, integrations, and enterprise features.
        </p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
};

export default SubscriptionModel;
