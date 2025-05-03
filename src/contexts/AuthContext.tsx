
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'rider' | 'driver' | 'admin';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  contactNumber?: string;
}

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  getUserRole: () => UserRole | null;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, sessionData) => {
        setSession(sessionData);
        
        if (sessionData?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase auth
          setTimeout(async () => {
            await fetchUserProfile(sessionData.user.id);
          }, 0);
        } else {
          setCurrentUser(null);
        }
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true);
      
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      
      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user.id);
      }
      
      setIsLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, name, email, role, profile_image, contact_number')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (profile) {
        setCurrentUser({
          id: profile.id,
          name: profile.name || '',
          email: profile.email || '',
          role: profile.role as UserRole,
          profileImage: profile.profile_image || undefined,
          contactNumber: profile.contact_number || undefined
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setCurrentUser(null);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      toast.success('Logged in successfully!');

      // Redirect based on role will happen automatically from the effect
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) {
        throw error;
      }

      toast.success('Account created successfully!');
      
      // Redirect will happen automatically once the auth state changes
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      toast.info('You have been logged out');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const getUserRole = (): UserRole | null => {
    return currentUser?.role || null;
  };

  // Redirect based on role
  useEffect(() => {
    if (currentUser && !isLoading) {
      const currentPath = window.location.pathname;
      
      // Only redirect if on login, register, or root page
      if (['/login', '/register', '/'].includes(currentPath)) {
        if (currentUser.role === 'rider') {
          navigate('/rider-dashboard');
        } else if (currentUser.role === 'driver') {
          navigate('/driver-dashboard');
        } else if (currentUser.role === 'admin') {
          navigate('/admin-dashboard');
        }
      }
    }
  }, [currentUser, isLoading, navigate]);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
    getUserRole,
    session
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
