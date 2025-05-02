
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Clock, CreditCard, User, CheckCircle, XCircle, Car, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const DriverDashboard = () => {
  const { currentUser } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [showRideRequest, setShowRideRequest] = useState(false);
  
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
      <div className="space-y-4">
        {/* Availability toggle */}
        <Card className="border-2 border-habal-primary">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-3 sm:mb-0">
                <h3 className="text-base font-medium">Your Availability</h3>
                <p className="text-sm text-gray-500">Toggle to receive ride requests</p>
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
            <CardHeader className="pb-0 p-3">
              <CardTitle className="flex items-center text-base text-habal-secondary">
                <Bell className="h-4 w-4 mr-2" /> 
                New Ride Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>RQ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">New Request</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Calculating distance...</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-base">₱0</p>
                  <p className="text-xs text-gray-500">Est. fare</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="mt-1">
                    <MapPin className="h-4 w-4 text-habal-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pickup</p>
                    <p className="text-sm font-medium">Loading pickup location...</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="mt-1">
                    <MapPin className="h-4 w-4 text-habal-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="text-sm font-medium">Loading destination...</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <Button 
                  className="flex-1 bg-habal-secondary hover:bg-green-700 h-8 text-xs"
                  onClick={acceptRideRequest}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300 text-gray-700 h-8 text-xs"
                  onClick={rejectRideRequest}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-2">
          <Card>
            <CardHeader className="pb-1 p-3">
              <CardTitle className="text-xs font-medium text-gray-500">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-lg font-bold">{formatCurrency(0)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 p-3">
              <CardTitle className="text-xs font-medium text-gray-500">This Week</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-lg font-bold">{formatCurrency(0)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 p-3">
              <CardTitle className="text-xs font-medium text-gray-500">Completed Rides</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-lg font-bold">0</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-1 p-3">
              <CardTitle className="text-xs font-medium text-gray-500">Rating</CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex items-center">
              <div className="text-lg font-bold mr-1">0.0</div>
              <svg
                className="h-4 w-4 text-gray-300"
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
          <h3 className="text-sm font-medium mb-2">Today's Schedule</h3>
          <Card>
            <CardContent className="p-3">
              <div className="text-center py-4">
                <Car className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">No upcoming rides scheduled</p>
                <p className="text-xs text-gray-400">Keep your availability on to receive ride requests</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Earnings Activity</h3>
          <Card>
            <CardContent className="p-0">
              <div className="text-center py-4">
                <Clock className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">No earnings activity yet</p>
                <p className="text-xs text-gray-400">Completed rides will appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-3 text-center">
            <Link to="/driver-dashboard/earnings">
              <Button variant="outline" className="text-xs h-7">View Earnings History</Button>
            </Link>
          </div>
        </div>
        
        {/* Wallet Section */}
        <Card>
          <CardHeader className="pb-2 p-3">
            <CardTitle className="text-sm">Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-habal-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-habal-primary" />
                </div>
                <div>
                  <p className="text-base font-bold">{formatCurrency(0)}</p>
                  <p className="text-xs text-gray-500">Available for withdrawal</p>
                </div>
              </div>
              <Button className="text-xs h-7">Withdraw</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
