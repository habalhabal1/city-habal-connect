
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Clock, CreditCard, User, CheckCircle, XCircle, Car, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const DriverDashboard = () => {
  const { currentUser } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [showRideRequest, setShowRideRequest] = useState(true);
  
  // Mock data for today's earnings
  const todayEarnings = 350;
  const weekEarnings = 2150;
  const completedRides = 5;
  const rating = 4.8;

  // Mock data for incoming ride request
  const rideRequest = {
    id: "req-001",
    rider: "Maria Santos",
    riderPhoto: "https://i.pravatar.cc/150?img=5",
    pickup: "Cotabato City Central Market",
    destination: "Notre Dame University",
    estimatedFare: 75,
    distance: 2.3,
    estimatedTime: "10 min"
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₱${amount.toFixed(0)}`;
  };

  const handleAvailabilityToggle = () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    
    toast.success(`You are now ${newStatus ? 'available' : 'unavailable'} for ride requests`);
    
    // If toggling to unavailable, hide any current ride request
    if (!newStatus) {
      setShowRideRequest(false);
    } else {
      // Simulate receiving a ride request when becoming available
      setTimeout(() => {
        setShowRideRequest(true);
      }, 3000);
    }
  };

  const acceptRideRequest = () => {
    toast.success("Ride request accepted!");
    setShowRideRequest(false);
  };

  const rejectRideRequest = () => {
    toast.info("Ride request rejected");
    setShowRideRequest(false);
  };

  return (
    <DashboardLayout title="Driver Dashboard">
      <div className="space-y-6">
        {/* Availability toggle */}
        <Card className="border-2 border-habal-primary">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-medium">Your Availability</h3>
                <p className="text-gray-500">Toggle to receive ride requests</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={isAvailable ? "text-green-600" : "text-gray-500"}>
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
                <Switch checked={isAvailable} onCheckedChange={handleAvailabilityToggle} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Incoming ride request */}
        {isAvailable && showRideRequest && (
          <Card className="border-2 border-habal-secondary animate-pulse-slow">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center text-lg text-habal-secondary">
                <Bell className="h-5 w-5 mr-2" /> 
                New Ride Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={rideRequest.riderPhoto} alt={rideRequest.rider} />
                  <AvatarFallback>
                    {rideRequest.rider.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{rideRequest.rider}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{rideRequest.distance} km away</span>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-lg">{formatCurrency(rideRequest.estimatedFare)}</p>
                  <p className="text-sm text-gray-500">Est. fare</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <MapPin className="h-5 w-5 text-habal-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium">{rideRequest.pickup}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <MapPin className="h-5 w-5 text-habal-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{rideRequest.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div>
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated trip time</p>
                    <p className="font-medium">{rideRequest.estimatedTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-2">
                <Button 
                  className="flex-1 bg-habal-secondary hover:bg-green-700"
                  onClick={acceptRideRequest}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-700"
                  onClick={rejectRideRequest}
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(todayEarnings)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(weekEarnings)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedRides}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Rating</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div className="text-2xl font-bold mr-2">{rating}</div>
              <svg
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </CardContent>
          </Card>
        </div>
        
        {/* Today's Schedule */}
        <div>
          <h3 className="text-lg font-medium mb-4">Today's Schedule</h3>
          <Card>
            <CardContent className="p-4">
              {/* Placeholder for a timeline or list of scheduled rides */}
              <div className="text-center py-6">
                <Car className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">No upcoming rides scheduled</p>
                <p className="text-sm text-gray-400">Keep your availability on to receive ride requests</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-medium mb-4">Recent Earnings Activity</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-medium">Ride with Juan Dela Cruz</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Today, 10:30 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₱65</p>
                    <p className="text-xs text-gray-500">2.5 km</p>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-medium">Ride with Anna Martinez</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Today, 09:15 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₱120</p>
                    <p className="text-xs text-gray-500">4.2 km</p>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 mt-1 text-gray-500" />
                    <div>
                      <p className="font-medium">Ride with Carlos Mendoza</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Today, 08:00 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+₱85</p>
                    <p className="text-xs text-gray-500">3.1 km</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-center">
            <Link to="/driver-dashboard/earnings">
              <Button variant="outline">View Earnings History</Button>
            </Link>
          </div>
        </div>
        
        {/* Wallet Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-habal-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-habal-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold">{formatCurrency(weekEarnings)}</p>
                  <p className="text-sm text-gray-500">Available for withdrawal</p>
                </div>
              </div>
              <Button>Withdraw</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
