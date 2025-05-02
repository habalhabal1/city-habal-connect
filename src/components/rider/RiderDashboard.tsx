
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Clock, Star, Car, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

const RiderDashboard = () => {
  const { currentUser } = useAuth();
  
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
      <div className="space-y-6">
        {/* Welcome message */}
        <div className="bg-gradient-to-r from-habal-primary to-habal-secondary rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold">Welcome back, {currentUser?.name}!</h2>
          <p className="mt-2 opacity-90">Ready to book a habal-habal ride in Cotabato City?</p>
          
          <Link to="/rider-dashboard/book">
            <Button className="mt-4 bg-white text-habal-primary hover:bg-gray-100">
              Book a Ride Now
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Rides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div className="text-3xl font-bold mr-2">4.8</div>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </CardContent>
          </Card>
        </div>
        
        {/* Current or upcoming ride (if available) */}
        <Card className="border-2 border-habal-primary">
          <CardHeader>
            <CardTitle className="text-lg">Your upcoming ride</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-habal-light p-3 rounded-full">
                <Car className="h-6 w-6 text-habal-primary" />
              </div>
              <div>
                <p className="font-medium">Habal-habal ride with Alex Mendoza</p>
                <p className="text-sm text-gray-500">Today at 2:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <MapPin className="h-5 w-5 text-habal-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium">Cotabato State University, Main Gate</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                <Navigation className="h-5 w-5 text-habal-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium">People's Palace, Cotabato City</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button>Track Your Ride</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Rides */}
        <div>
          <h3 className="text-lg font-medium mb-4">Recent Ride History</h3>
          <div className="space-y-4">
            {recentRides.map((ride) => (
              <Card key={ride.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{ride.pickup} to {ride.destination}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDate(ride.date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₱{ride.fare}</div>
                        <div className="flex items-center text-sm mt-1">
                          <span className="text-gray-600 mr-1">Rating:</span>
                          <div className="flex items-center">
                            <span>{ride.rating}</span>
                            <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center">
                      <img 
                        src={ride.driverPhoto} 
                        alt={ride.driver}
                        className="h-6 w-6 rounded-full mr-2" 
                      />
                      <span className="text-sm text-gray-600">Driver: {ride.driver}</span>
                    </div>
                  </div>
                  
                  <div className="md:w-32 p-4 md:border-l flex md:flex-col justify-between items-center md:items-center bg-gray-50 dark:bg-gray-800">
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Completed
                    </div>
                    
                    <Link to={`/rider-dashboard/history/${ride.id}`} className="text-habal-primary text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/rider-dashboard/history">
              <Button variant="outline">View All Ride History</Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderDashboard;
