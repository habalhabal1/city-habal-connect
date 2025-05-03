
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await login(values.email, values.password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login to Habal-Connect</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      autoComplete="current-password"
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
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {showAdvanced ? (
          <Alert variant="default" className="bg-gray-50 dark:bg-gray-800 border-gray-200">
            <Info className="h-4 w-4" />
            <AlertTitle>Admin & Driver Access</AlertTitle>
            <AlertDescription>
              <p className="mb-1">Access credentials:</p>
              <p><strong>Admin:</strong> admin@example.com</p>
              <p><strong>Driver:</strong> driver@example.com</p>
              <p className="mt-1"><strong>Password:</strong> password123 (for all accounts)</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={() => setShowAdvanced(false)}
              >
                Hide
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-muted-foreground" 
            onClick={() => setShowAdvanced(true)}
          >
            Admin & Driver Access
          </Button>
        )}
        <div className="text-center text-sm">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-habal-primary hover:underline">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
