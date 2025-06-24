
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Bell,
  Search,
  Plus,
  UserCircle,
  Home,
  Users2,
  CreditCard,
  Shield,
  Building,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import UserTypeSelector from "@/components/UserTypeSelector";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState('administrator');
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationForUserType = (userType: string) => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
    ];

    switch(userType) {
      case 'administrator':
        return [
          ...baseNavigation,
          { name: 'Admin Dashboard', href: '/admin-dashboard', icon: Shield },
          { name: 'Events', href: '/events', icon: Calendar },
          { name: 'Participants', href: '/participants', icon: Users },
          { name: 'Tasks', href: '/tasks', icon: CheckSquare },
          { name: 'Team', href: '/team', icon: Users2 },
          { name: 'Sponsorships', href: '/sponsorships', icon: Building },
          { name: 'Analytics', href: '/analytics', icon: BarChart3 },
          { name: 'Billing', href: '/billing', icon: CreditCard },
          { name: 'Settings', href: '/settings', icon: Settings },
        ];
      case 'team_member':
        return [
          ...baseNavigation,
          { name: 'My Tasks', href: '/tasks', icon: CheckSquare },
          { name: 'Participants', href: '/participants', icon: Users },
          { name: 'Events', href: '/events', icon: Calendar },
          { name: 'Reports', href: '/analytics', icon: BarChart3 },
        ];
      case 'sponsor':
        return [
          ...baseNavigation,
          { name: 'My Sponsorships', href: '/sponsorships', icon: Building },
          { name: 'Events', href: '/events', icon: Calendar },
          { name: 'Analytics', href: '/analytics', icon: BarChart3 },
        ];
      case 'participant':
        return [
          ...baseNavigation,
          { name: 'My Events', href: '/events', icon: Calendar },
          { name: 'History', href: '/participant-history', icon: UserCheck },
        ];
      default:
        return baseNavigation;
    }
  };

  const navigation = getNavigationForUserType(userType);
  const isActive = (path: string) => location.pathname === path;

  const handleUserTypeChange = (newUserType: string) => {
    setUserType(newUserType);
    // Navigate to appropriate dashboard based on user type
    if (newUserType === 'administrator') {
      navigate('/dashboard');
    } else if (newUserType === 'team_member') {
      navigate('/tasks');
    } else if (newUserType === 'sponsor') {
      navigate('/sponsorships');
    } else if (newUserType === 'participant') {
      navigate('/events');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">EventzNow</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={isActive(item.href) ? "default" : "ghost"}
                className={`w-full justify-start text-sm ${
                  isActive(item.href) 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </Button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 text-sm"
            onClick={() => navigate('/')}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4 sm:px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-48 lg:w-64 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <UserTypeSelector 
                currentUserType={userType}
                onUserTypeSelect={handleUserTypeChange}
              />
              
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hidden sm:flex"
                onClick={() => navigate('/create-event')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
              
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <UserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">
                    {userType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
