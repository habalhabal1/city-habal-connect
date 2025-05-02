
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, Users, 
  CreditCard, AlertTriangle, Search, 
  CheckCircle, XCircle, Clock, AlertCircle,
  UserCheck, UserX, User, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const AdminDashboard = () => {
  // Mock data for the admin dashboard
  const stats = {
    totalRiders: 245,
    totalDrivers: 78,
    activeDrivers: 52,
    pendingDrivers: 7,
    totalRides: 1879,
    todayRides: 58,
    totalEarnings: 145850,
    pendingApprovals: 7
  };
  
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'new_driver',
      name: 'Juan Pascual',
      photo: 'https://i.pravatar.cc/150?img=20',
      timestamp: '20 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'new_rider',
      name: 'Maria Reyes',
      photo: 'https://i.pravatar.cc/150?img=21',
      timestamp: '45 minutes ago',
      status: 'approved'
    },
    {
      id: 3,
      type: 'ride_completed',
      riderName: 'Carlos Tan',
      driverName: 'Roberto Santos',
      amount: 85,
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      type: 'ride_cancelled',
      riderName: 'Anna Lim',
      driverName: 'Miguel Garcia',
      timestamp: '2 hours ago',
      reason: 'Driver unavailable'
    },
    {
      id: 5,
      type: 'driver_approval',
      name: 'Fernando Bautista',
      photo: 'https://i.pravatar.cc/150?img=22',
      timestamp: '3 hours ago',
      status: 'approved'
    }
  ];

  // Mock data for pending drivers
  const pendingDrivers = [
    {
      id: 'd-001',
      name: 'Pedro Alvarez',
      photo: 'https://i.pravatar.cc/150?img=30',
      appliedDate: '2023-05-01',
      contactNumber: '+63 912 345 6789',
      vehicleType: 'Honda TMX',
      licenseNumber: 'A12345678'
    },
    {
      id: 'd-002',
      name: 'Juan Pascual',
      photo: 'https://i.pravatar.cc/150?img=31',
      appliedDate: '2023-05-01',
      contactNumber: '+63 912 345 7890',
      vehicleType: 'Yamaha RS',
      licenseNumber: 'B12345678'
    },
    {
      id: 'd-003',
      name: 'Ricardo Dalisay',
      photo: 'https://i.pravatar.cc/150?img=32',
      appliedDate: '2023-05-02',
      contactNumber: '+63 912 345 8901',
      vehicleType: 'Honda XRM',
      licenseNumber: 'C12345678'
    }
  ];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₱${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Riders</p>
                <h3 className="text-2xl font-bold">{stats.totalRiders}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 mr-4">
                <Car className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Drivers</p>
                <h3 className="text-2xl font-bold">{stats.totalDrivers}</h3>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <span className="font-medium">{stats.activeDrivers} active</span>
                  {stats.pendingDrivers > 0 && (
                    <Badge variant="outline" className="ml-2 text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-900 dark:border-amber-600">
                      {stats.pendingDrivers} pending
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 mr-4">
                <Car className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Rides</p>
                <h3 className="text-2xl font-bold">{stats.totalRides}</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  {stats.todayRides} today
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-3 mr-4">
                <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</p>
                <h3 className="text-2xl font-bold">{formatCurrency(stats.totalEarnings)}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pending Approvals */}
          <Card className={stats.pendingApprovals > 0 ? "border-amber-400" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pending Driver Approvals</CardTitle>
                {stats.pendingApprovals > 0 && (
                  <Badge className="bg-amber-500">{stats.pendingApprovals}</Badge>
                )}
              </div>
              <CardDescription>
                New driver applications requiring verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingDrivers.length === 0 ? (
                <div className="text-center py-6">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
                  <p className="mt-2 text-gray-500">No pending approvals</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingDrivers.slice(0, 3).map(driver => (
                    <div key={driver.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={driver.photo} alt={driver.name} />
                          <AvatarFallback>
                            {driver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-gray-500">
                            Applied: {formatDate(driver.appliedDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {pendingDrivers.length > 0 && (
                <div className="mt-4 text-center">
                  <Link to="/admin-dashboard/drivers/pending">
                    <Button variant="outline" className="w-full">
                      View All Pending Applications
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Activities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <CardDescription>
                Latest events from the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto">
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {activity.type === 'new_driver' && (
                      <>
                        <div className="mt-1 bg-blue-100 rounded-full p-1">
                          <Car className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.name}</span> applied as a driver
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            {activity.status === 'pending' && (
                              <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-300 bg-amber-50">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activity.type === 'new_rider' && (
                      <>
                        <div className="mt-1 bg-green-100 rounded-full p-1">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.name}</span> created a new rider account
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activity.type === 'ride_completed' && (
                      <>
                        <div className="mt-1 bg-purple-100 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.driverName}</span> completed a ride with{' '}
                            <span className="font-medium">{activity.riderName}</span>
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            </div>
                            <span className="text-xs font-medium text-green-600">
                              +{formatCurrency(activity.amount)}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activity.type === 'ride_cancelled' && (
                      <>
                        <div className="mt-1 bg-red-100 rounded-full p-1">
                          <XCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.riderName}</span> cancelled ride with{' '}
                            <span className="font-medium">{activity.driverName}</span>
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            <span className="text-xs text-red-500 ml-2">
                              {activity.reason}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activity.type === 'driver_approval' && (
                      <>
                        <div className="mt-1 bg-green-100 rounded-full p-1">
                          <UserCheck className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.name}</span> was{' '}
                            <span className="text-green-600 font-medium">approved</span> as driver
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              <Link to="/admin-dashboard/activities" className="mt-4 text-sm text-habal-primary hover:underline flex items-center justify-center">
                View all activities <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick Actions Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Frequently used admin tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <UserCheck className="mr-2 h-4 w-4" />
                View Driver Applications
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Search Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Reported Issues
              </Button>
              <Button className="w-full justify-start bg-habal-primary hover:bg-habal-dark">
                <Car className="mr-2 h-4 w-4" />
                Monitor Active Rides
              </Button>
            </CardContent>
          </Card>
          
          {/* Active Rides */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Active Rides</CardTitle>
              <CardDescription>Currently ongoing trips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Active ride 1 */}
                <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://i.pravatar.cc/150?img=40" alt="Driver" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Alex Mendoza (Driver)</p>
                        <div className="flex text-sm text-gray-500">
                          <span>with</span>
                          <span className="font-medium text-habal-dark ml-1">Maria Santos</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex space-x-2">
                      <MapPin className="h-4 w-4 text-habal-primary shrink-0 mt-0.5" />
                      <span>From Notre Dame University to People's Palace</span>
                    </div>
                    <div className="flex space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                      <span>Started 10 minutes ago</span>
                    </div>
                  </div>
                </div>
                
                {/* Active ride 2 */}
                <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://i.pravatar.cc/150?img=41" alt="Driver" />
                        <AvatarFallback>RD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Roberto Dela Cruz (Driver)</p>
                        <div className="flex text-sm text-gray-500">
                          <span>with</span>
                          <span className="font-medium text-habal-dark ml-1">John Carlos</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex space-x-2">
                      <MapPin className="h-4 w-4 text-habal-primary shrink-0 mt-0.5" />
                      <span>From Cotabato Medical Center to Cotabato State University</span>
                    </div>
                    <div className="flex space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                      <span>Started 5 minutes ago</span>
                    </div>
                  </div>
                </div>
                
                <Link to="/admin-dashboard/rides/active" className="block text-center text-sm text-habal-primary hover:underline">
                  View all active rides
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
