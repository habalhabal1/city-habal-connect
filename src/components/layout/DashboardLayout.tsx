
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Bell, 
  LogOut,
  Car,
  Users,
  ListChecks
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const getMenuItems = (role: UserRole | null) => {
  switch (role) {
    case 'rider':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/rider-dashboard' },
        { icon: Car, label: 'Book a Ride', href: '/rider-dashboard/book' },
        { icon: ListChecks, label: 'Ride History', href: '/rider-dashboard/history' },
        { icon: Bell, label: 'Notifications', href: '/rider-dashboard/notifications' },
        { icon: User, label: 'Profile', href: '/rider-dashboard/profile' },
        { icon: Settings, label: 'Settings', href: '/rider-dashboard/settings' }
      ];
    case 'driver':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/driver-dashboard' },
        { icon: Users, label: 'Ride Requests', href: '/driver-dashboard/requests' },
        { icon: Car, label: 'My Rides', href: '/driver-dashboard/rides' },
        { icon: ListChecks, label: 'History', href: '/driver-dashboard/history' },
        { icon: Bell, label: 'Notifications', href: '/driver-dashboard/notifications' },
        { icon: User, label: 'Profile', href: '/driver-dashboard/profile' },
        { icon: Settings, label: 'Settings', href: '/driver-dashboard/settings' }
      ];
    case 'admin':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin-dashboard' },
        { icon: Users, label: 'Users', href: '/admin-dashboard/users' },
        { icon: Car, label: 'Rides', href: '/admin-dashboard/rides' },
        { icon: ListChecks, label: 'Reports', href: '/admin-dashboard/reports' },
        { icon: Settings, label: 'Settings', href: '/admin-dashboard/settings' }
      ];
    default:
      return [];
  }
};

const getInitials = (name: string) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { currentUser, logout, getUserRole } = useAuth();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const menuItems = getMenuItems(userRole);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className="md:w-64">
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-habal-primary rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-base">H</span>
              </div>
              <span className="text-lg font-bold text-habal-dark dark:text-white">Habal-Connect</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentUser?.profileImage} />
                  <AvatarFallback>{getInitials(currentUser?.name || '')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{currentUser?.name}</span>
                  <span className="text-xs text-habal-gray dark:text-gray-400 capitalize">{userRole}</span>
                </div>
              </div>
            </div>
            
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full text-red-500 justify-start px-3"
                    onClick={logout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Log out</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="block md:hidden" />
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate(`/${userRole}-dashboard/profile`)}>
                  <AvatarImage src={currentUser?.profileImage} />
                  <AvatarFallback>{getInitials(currentUser?.name || '')}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
