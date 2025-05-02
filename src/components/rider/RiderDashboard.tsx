
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Clock, Star, Car, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const RiderDashboard = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  
  // Empty state for ride history until real data is available
  const hasRecentRides = false;
  const hasUpcomingRide = false;

  return (
    <DashboardLayout title="Rider Dashboard">
      <div className="space-y-3">
        {/* Welcome message - more compact */}
        <div className="bg-gradient-to-r from-habal-primary to-habal-secondary rounded-lg p-3 sm:p-4 text-white">
          <h2 className="text-lg sm:text-xl font-bold">Welcome back, {currentUser?.name || 'Rider'}!</h2>
          <p className="mt-1 text-sm opacity-90">Ready for a ride in Cotabato City?</p>
          
          <Link to="/rider-dashboard/book">
            <Button className="mt-2 sm:mt-3 bg-white text-habal-primary hover:bg-gray-100 text-xs sm:text-sm h-8">
              Book a Ride Now
            </Button>
          </Link>
        </div>
        
        {/* Stats - more compact */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Card className="shadow-sm">
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-xs text-gray-500">Total Rides</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="text-lg sm:text-xl font-bold">0</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-xs text-gray-500">This Month</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="text-lg sm:text-xl font-bold">0</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-xs text-gray-500">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 flex items-center">
              <div className="text-lg sm:text-xl font-bold mr-1">-</div>
              <Star className="h-4 w-4 text-gray-300" />
            </CardContent>
          </Card>
        </div>
        
        {/* Current or upcoming ride - empty state */}
        {hasUpcomingRide ? (
          <Card className="border-2 border-habal-primary">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-sm sm:text-base">Your upcoming ride</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-1 space-y-2">
              {/* Empty state - will be filled with real data */}
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-dashed border-gray-300">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Car className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="font-medium text-sm">No upcoming rides</h3>
              <p className="text-xs text-gray-500 mb-3">Book a ride to get started</p>
              <Link to="/rider-dashboard/book">
                <Button size="sm" className="h-7 text-xs">Book Now</Button>
              </Link>
            </CardContent>
          </Card>
        )}
        
        {/* Recent Rides - empty state */}
        <div>
          <h3 className="text-sm sm:text-base font-medium mb-2">Recent Ride History</h3>
          
          {hasRecentRides ? (
            <div className="space-y-2">
              {/* Will be populated with real ride history data */}
            </div>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 text-gray-400 mb-2" />
                <h3 className="font-medium text-sm">No ride history yet</h3>
                <p className="text-xs text-gray-500">Your completed rides will appear here</p>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-3 text-center">
            <Link to="/rider-dashboard/history">
              <Button variant="outline" size="sm" className="text-xs h-7">View All History</Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderDashboard;
