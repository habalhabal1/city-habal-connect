
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Flag, 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  User, 
  X 
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const BookRide = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isNow, setIsNow] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const estimatedFare = 0; // This would be calculated based on distance

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmModalOpen(true);
    }, 1000);
  };

  const confirmBooking = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmModalOpen(false);
      setIsConfirmed(true);
      toast.success("Your ride has been booked successfully!");
    }, 1500);
  };

  const cancelBooking = () => {
    setIsConfirmModalOpen(false);
  };

  const handleUseCurrentLocation = () => {
    // This would use the browser's geolocation API in a real app
    toast.info("Getting your current location...");
    setTimeout(() => {
      setPickup("Current Location");
      toast.success("Location detected!");
    }, 1000);
  };

  return (
    <DashboardLayout title="Book a Ride">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Map View (Main Component) */}
        <div className="md:col-span-2">
          <Card className="h-[450px] md:h-[600px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Will Be Displayed Here</p>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                <MapPin className="h-4 w-4 mr-1 text-habal-primary" />
                Center Map
              </Button>
            </div>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Book Your Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-habal-primary" />
                    Pickup Location
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="shrink-0 text-xs" 
                      onClick={handleUseCurrentLocation}
                    >
                      Current Location
                    </Button>
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center">
                    <Flag className="h-4 w-4 mr-1 text-habal-secondary" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>

                {/* Ride Schedule */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Schedule
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={isNow ? "default" : "outline"}
                      className={`flex-1 ${isNow ? 'bg-habal-primary' : ''}`}
                      onClick={() => setIsNow(true)}
                    >
                      Now
                    </Button>
                    <Button
                      type="button"
                      variant={!isNow ? "default" : "outline"}
                      className={`flex-1 ${!isNow ? 'bg-habal-primary' : ''}`}
                      onClick={() => setIsNow(false)}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>

                {/* Date & Time Picker (only if scheduled) */}
                {!isNow && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left justify-start font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required={!isNow}
                      />
                    </div>
                  </div>
                )}

                {/* Fare Estimate */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estimated Fare:</span>
                    <span className="font-semibold text-lg">
                      {estimatedFare > 0 ? `₱${estimatedFare.toFixed(2)}` : "Calculating..."}
                    </span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Payment Method
                  </Label>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer">Cash</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gcash" id="gcash" />
                      <Label htmlFor="gcash" className="cursor-pointer">GCash</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Notes to Driver */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Notes to Driver (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={100}
                    rows={2}
                  />
                </div>

                {/* Book Now Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-habal-primary hover:bg-habal-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Book Now"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 mt-1 text-habal-primary" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium">{pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Flag className="h-5 w-5 mt-1 text-habal-secondary" />
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium">{destination}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 mt-1 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">When</p>
                <p className="font-medium">
                  {isNow ? "As soon as possible" : `${date ? format(date, 'PPP') : ''} at ${time}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CreditCard className="h-5 w-5 mt-1 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium">{paymentMethod === 'cash' ? 'Cash' : 'GCash'}</p>
              </div>
            </div>

            {notes && (
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 mt-1 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="font-medium">{notes}</p>
                </div>
              </div>
            )}

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between">
                <p className="font-medium">Estimated fare:</p>
                <p className="font-bold">{estimatedFare > 0 ? `₱${estimatedFare.toFixed(2)}` : "TBD"}</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex sm:justify-between">
            <Button 
              variant="outline" 
              onClick={cancelBooking} 
              className="sm:w-auto w-full"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              onClick={confirmBooking} 
              className="sm:w-auto w-full bg-habal-primary hover:bg-habal-dark"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Success Dialog */}
      <Dialog open={isConfirmed} onOpenChange={setIsConfirmed}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Successful!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <p className="mt-4 font-medium text-lg">Your ride has been requested!</p>
            <p className="text-gray-500 mt-1">We're looking for a driver near you.</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md mt-2">
            <p className="text-sm text-center">You can track your ride status in the dashboard</p>
          </div>
          <DialogFooter>
            <Button 
              variant="default" 
              className="w-full bg-habal-primary hover:bg-habal-dark"
              onClick={() => {
                setIsConfirmed(false);
                window.location.href = '/rider-dashboard';
              }}
            >
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default BookRide;
