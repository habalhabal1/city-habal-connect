
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const riderFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
  contactNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const driverFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
  contactNumber: z.string().min(10, 'Valid contact number is required'),
  licenseNumber: z.string().min(3, 'License number is required'),
  licenseExpiry: z.string().min(1, 'Expiry date is required'),
  vehicleModel: z.string().min(2, 'Vehicle model is required'),
  plateNumber: z.string().min(2, 'Plate number is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");
  const { register: registerUser } = useAuth();
  
  const riderForm = useForm<z.infer<typeof riderFormSchema>>({
    resolver: zodResolver(riderFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
    },
  });

  const driverForm = useForm<z.infer<typeof driverFormSchema>>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      licenseNumber: '',
      licenseExpiry: '',
      vehicleModel: '',
      plateNumber: '',
    },
  });

  const onSubmitRider = async (values: z.infer<typeof riderFormSchema>) => {
    try {
      setIsSubmitting(true);
      await registerUser(values.name, values.email, values.password, 'rider');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitDriver = async (values: z.infer<typeof driverFormSchema>) => {
    try {
      setIsSubmitting(true);
      
      // First register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            role: 'driver'
          }
        }
      });

      if (authError) throw authError;
      
      if (authData?.user) {
        // After successful registration, add driver details
        const { error: driverError } = await supabase
          .from('driver_details')
          .insert({
            user_id: authData.user.id,
            license_number: values.licenseNumber,
            license_expiry: values.licenseExpiry,
            vehicle_model: values.vehicleModel,
            plate_number: values.plateNumber,
          });

        if (driverError) throw driverError;
        
        // Update contact number in profile
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ contact_number: values.contactNumber })
          .eq('id', authData.user.id);
          
        if (profileError) throw profileError;

        toast.success('Driver registration successful! Your application is pending approval.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
      console.error('Driver registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Join Habal-Connect to start booking rides
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "rider" | "driver")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rider">Register as Rider</TabsTrigger>
            <TabsTrigger value="driver">Register as Driver</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rider" className="mt-4">
            <Form {...riderForm}>
              <form onSubmit={riderForm.handleSubmit(onSubmitRider)} className="space-y-4">
                <FormField
                  control={riderForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field} 
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={riderForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          autoComplete="email" 
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={riderForm.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+63 9XX XXX XXXX" 
                          {...field} 
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={riderForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          autoComplete="new-password"
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={riderForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          autoComplete="new-password"
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit"
                  className="w-full bg-habal-primary hover:bg-habal-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Register as Rider"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="driver" className="mt-4">
            <Form {...driverForm}>
              <form onSubmit={driverForm.handleSubmit(onSubmitDriver)} className="space-y-4">
                <FormField
                  control={driverForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field} 
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          {...field} 
                          autoComplete="email" 
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+63 9XX XXX XXXX" 
                          {...field} 
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          autoComplete="new-password"
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={driverForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          autoComplete="new-password"
                          className="bg-white dark:bg-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <h3 className="text-sm font-semibold mb-3">Driver Information</h3>
                  <div className="space-y-4">
                    <FormField
                      control={driverForm.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your license number" 
                              {...field} 
                              className="bg-white dark:bg-gray-900"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="licenseExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Expiry Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field} 
                              className="bg-white dark:bg-gray-900"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your vehicle model" 
                              {...field} 
                              className="bg-white dark:bg-gray-900"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="plateNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plate Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your plate number" 
                              {...field} 
                              className="bg-white dark:bg-gray-900"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-habal-primary hover:bg-habal-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Register as Driver"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-center text-sm">
          <span>Already have an account? </span>
          <Link to="/login" className="text-habal-primary hover:underline">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
