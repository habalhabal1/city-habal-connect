
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import RiderDashboard from "./components/rider/RiderDashboard";
import BookRide from "./components/rider/BookRide";
import DriverDashboard from "./components/driver/DriverDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Route protection component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { isAuthenticated, isLoading, getUserRole } = useAuth();
  const userRole = getUserRole();
  
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to the appropriate dashboard based on role
    if (userRole === 'rider') {
      return <Navigate to="/rider-dashboard" />;
    } else if (userRole === 'driver') {
      return <Navigate to="/driver-dashboard" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
  }
  
  return <>{children}</>;
};

// Public only routes (redirect to dashboard if logged in)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, getUserRole } = useAuth();
  const userRole = getUserRole();
  
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (isAuthenticated) {
    // Redirect to the appropriate dashboard based on role
    if (userRole === 'rider') {
      return <Navigate to="/rider-dashboard" />;
    } else if (userRole === 'driver') {
      return <Navigate to="/driver-dashboard" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/register" element={
        <PublicOnlyRoute>
          <Register />
        </PublicOnlyRoute>
      } />
      
      {/* Protected Routes with role-based access */}
      <Route path="/rider-dashboard" element={
        <ProtectedRoute allowedRoles={['rider']}>
          <RiderDashboard />
        </ProtectedRoute>
      } />
      <Route path="/rider-dashboard/book" element={
        <ProtectedRoute allowedRoles={['rider']}>
          <BookRide />
        </ProtectedRoute>
      } />
      <Route path="/driver-dashboard" element={
        <ProtectedRoute allowedRoles={['driver']}>
          <DriverDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" closeButton={true} />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
