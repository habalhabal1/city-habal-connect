
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
  
  // Mock data for recent rides
  const recentRides = [
    {
      id: "ride-001",
      date: "2023-05-01T14:30:00",
      pickup: "Cotabato State University",
      destination: "Cotabato City Hall",
      driver: "John Smith",
      driverPhoto: "https://i.pravatar.cc/150?img=10",
      status: "completed",
      fare: 80,
      rating: 5
    },
    {
      id: "ride-002",
      date: "2023-04-28T09:15:00",
      pickup: "Notre Dame University",
      destination: "PC Plaza Mall",
      driver: "Michael Johnson",
      driverPhoto: "https://i.pravatar.cc/150?img=11",
      status: "completed",
      fare: 65,
      rating: 4
    },
    {
      id: "ride-003",
      date: "2023-04-25T18:45:00",
      pickup: "Cotabato Regional Medical Center",
      destination: "Awang Airport",
      driver: "Robert Davis",
      driverPhoto: "https://i.pravatar.cc/150?img=12",
      status: "completed",
      fare: 120,
      rating: 5
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout title="Rider Dashboard">
      <div className="space-y-3">
        {/* Welcome message - more compact */}
        <div className="bg-gradient-to-r from-habal-primary to-habal-secondary rounded-lg p-3 sm:p-4 text-white">
          <h2 className="text-lg sm:text-xl font-bold">Welcome back, {currentUser?.name}!</h2>
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
              <div className="text-lg sm:text-xl font-bold">12</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-xs text-gray-500">This Month</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0">
              <div className="text-lg sm:text-xl font-bold">3</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-xs text-gray-500">Avg Rating</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 flex items-center">
              <div className="text-lg sm:text-xl font-bold mr-1">4.8</div>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </CardContent>
          </Card>
        </div>
        
        {/* Current or upcoming ride */}
        <Card className="border-2 border-habal-primary">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-sm sm:text-base">Your upcoming ride</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-1 space-y-2">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-habal-light p-2 rounded-full">
                <Car className="h-4 w-4 sm:h-5 sm:w-5 text-habal-primary" />
              </div>
              <div>
                <p className="font-medium text-xs sm:text-sm">Habal-habal ride with Alex Mendoza</p>
                <p className="text-xs text-gray-500">Today at 2:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="mt-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-habal-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pickup</p>
                <p className="font-medium text-xs sm:text-sm">Cotabato State University, Main Gate</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="mt-1">
                <Navigation className="h-3 w-3 sm:h-4 sm:w-4 text-habal-secondary" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="font-medium text-xs sm:text-sm">People's Palace, Cotabato City</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button size="sm" className="h-7 text-xs">Track Your Ride</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Rides */}
        <div>
          <h3 className="text-sm sm:text-base font-medium mb-2">Recent Ride History</h3>
          <div className="space-y-2">
            {recentRides.slice(0, isMobile ? 2 : 3).map((ride) => (
              <Card key={ride.id} className="overflow-hidden shadow-sm">
                <div className="flex flex-row">
                  <div className="flex-grow p-2 sm:p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm">{ride.pickup} to {ride.destination}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(ride.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-xs sm:text-sm">₱{ride.fare}</div>
                        <div className="flex items-center text-xs mt-0.5">
                          <span className="text-gray-600 mr-1">Rating:</span>
                          <div className="flex items-center">
                            <span>{ride.rating}</span>
                            <Star className="h-3 w-3 ml-0.5 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-1.5 flex items-center">
                      <img 
                        src={ride.driverPhoto} 
                        alt={ride.driver}
                        className="h-5 w-5 rounded-full mr-1.5" 
                      />
                      <span className="text-xs text-gray-600">Driver: {ride.driver}</span>
                    </div>
                  </div>
                  
                  <div className="w-20 sm:w-24 p-2 border-l flex flex-col justify-between items-center bg-gray-50 dark:bg-gray-800">
                    <div className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">
                      Completed
                    </div>
                    
                    <Link to={`/rider-dashboard/history/${ride.id}`} className="text-habal-primary text-xs mt-1">
                      View Details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
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
