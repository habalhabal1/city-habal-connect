
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, Users, 
  CreditCard, AlertTriangle, Search, 
  CheckCircle, XCircle, Clock, 
  UserCheck, User, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  
  // Empty states until real data is available
  const stats = {
    totalRiders: 0,
    totalDrivers: 0,
    activeDrivers: 0,
    pendingDrivers: 0,
    totalRides: 0,
    todayRides: 0,
    totalEarnings: 0,
    pendingApprovals: 0
  };
  
  // Empty state for pending drivers
  const hasPendingDrivers = false;
  const hasActiveRides = false;
  const hasRecentActivities = false;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-3">
        {/* Stats Grid - Compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <Card className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-2 sm:p-3 sm:mr-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Riders</p>
                <h3 className="text-lg sm:text-xl font-bold">{stats.totalRiders}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-2 sm:p-3 sm:mr-3">
                <Car className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Drivers</p>
                <h3 className="text-lg sm:text-xl font-bold">{stats.totalDrivers}</h3>
                <div className="flex items-center text-xs">
                  <span className="font-medium">{stats.activeDrivers} active</span>
                  {stats.pendingDrivers > 0 && (
                    <Badge variant="outline" className="ml-1 text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-900 dark:border-amber-600 text-[10px] py-0">
                      {stats.pendingDrivers} pending
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-2 mr-2 sm:p-3 sm:mr-3">
                <Car className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Rides</p>
                <h3 className="text-lg sm:text-xl font-bold">{stats.totalRides}</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  {stats.todayRides} today
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center">
              <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2 mr-2 sm:p-3 sm:mr-3">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Earnings</p>
                <h3 className="text-lg sm:text-xl font-bold">{formatCurrency(stats.totalEarnings)}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Action Cards - More compact layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Pending Approvals */}
          <Card className={stats.pendingApprovals > 0 ? "border-amber-400" : ""}>
            <CardHeader className="p-3 sm:p-4 pb-0 sm:pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md sm:text-lg">Pending Driver Approvals</CardTitle>
                {stats.pendingApprovals > 0 && (
                  <Badge className="bg-amber-500">{stats.pendingApprovals}</Badge>
                )}
              </div>
              <CardDescription className="text-xs sm:text-sm">
                New driver applications requiring verification
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-2">
              {!hasPendingDrivers ? (
                <div className="text-center py-6">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm text-gray-500">No pending approvals</p>
                  <p className="text-xs text-gray-400">New driver applications will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Will be populated with real pending driver data */}
                </div>
              )}
              
              <div className="mt-3 text-center">
                <Link to="/admin-dashboard/drivers/pending">
                  <Button variant="outline" size="sm" className="w-full text-xs h-7">
                    View Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activities */}
          <Card>
            <CardHeader className="p-3 sm:p-4 pb-0 sm:pb-1">
              <CardTitle className="text-md sm:text-lg">Recent Activities</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Latest events from the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-2 max-h-[200px] overflow-y-auto">
              {!hasRecentActivities ? (
                <div className="text-center py-6">
                  <Clock className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">No recent activities</p>
                  <p className="text-xs text-gray-400">Activities will appear here as they occur</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Will be populated with real activity data */}
                </div>
              )}
              
              <Link to="/admin-dashboard/activities" className="mt-3 text-xs text-habal-primary hover:underline flex items-center justify-center">
                View all activities <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom Cards - More compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Quick Actions Card */}
          <Card className="md:col-span-1">
            <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
              <CardTitle className="text-md sm:text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Admin tools</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-1 space-y-2">
              <Button className="w-full justify-start text-xs h-8" variant="outline">
                <UserCheck className="mr-1 h-3 w-3" />
                Driver Applications
              </Button>
              <Button className="w-full justify-start text-xs h-8" variant="outline">
                <Search className="mr-1 h-3 w-3" />
                Search Users
              </Button>
              <Button className="w-full justify-start text-xs h-8" variant="outline">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Reported Issues
              </Button>
              <Button className="w-full justify-start text-xs h-8 bg-habal-primary hover:bg-habal-dark">
                <Car className="mr-1 h-3 w-3" />
                Monitor Rides
              </Button>
            </CardContent>
          </Card>
          
          {/* Active Rides */}
          <Card className="md:col-span-2">
            <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
              <CardTitle className="text-md sm:text-lg">Active Rides</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Currently ongoing trips</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-1">
              {!hasActiveRides ? (
                <div className="text-center py-6">
                  <Car className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">No active rides</p>
                  <p className="text-xs text-gray-400">Active rides will appear here</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Will be populated with real active ride data */}
                </div>
              )}
              
              <Link to="/admin-dashboard/rides/active" className="block text-center text-xs text-habal-primary hover:underline mt-3">
                View all active rides
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
