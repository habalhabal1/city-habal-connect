
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type UserRole = 'rider' | 'driver' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  contactNumber?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  getUserRole: () => UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rider User',
    email: 'rider@example.com',
    role: 'rider',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    contactNumber: '+63 912 345 6789'
  },
  {
    id: '2',
    name: 'Driver User',
    email: 'driver@example.com',
    role: 'driver',
    profileImage: 'https://i.pravatar.cc/150?img=2',
    contactNumber: '+63 912 345 6788'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    contactNumber: '+63 912 345 6787'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('habal_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('habal_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (user) => user.email === email && user.role === role
        );
        
        if (foundUser) {
          setCurrentUser(foundUser);
          localStorage.setItem('habal_user', JSON.stringify(foundUser));
          toast.success(`Welcome back, ${foundUser.name}!`);
          
          // Redirect based on role
          if (role === 'rider') {
            navigate('/rider-dashboard');
          } else if (role === 'driver') {
            navigate('/driver-dashboard');
          } else if (role === 'admin') {
            navigate('/admin-dashboard');
          }
          
          setIsLoading(false);
          resolve();
        } else {
          toast.error('Invalid email or password');
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((user) => user.email === email);
        
        if (existingUser) {
          toast.error('Email already in use');
          setIsLoading(false);
          reject(new Error('Email already in use'));
          return;
        }
        
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          name,
          email,
          role,
          profileImage: `https://i.pravatar.cc/150?img=${mockUsers.length + 4}`,
          contactNumber: '+63 912 345 0000'
        };
        
        // In a real app, you would send this to your API and get back the saved user
        mockUsers.push(newUser);
        setCurrentUser(newUser);
        localStorage.setItem('habal_user', JSON.stringify(newUser));
        
        toast.success('Account created successfully!');
        
        // Redirect based on role
        if (role === 'rider') {
          navigate('/rider-dashboard');
        } else if (role === 'driver') {
          navigate('/driver-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        }
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('habal_user');
    toast.info('You have been logged out');
    navigate('/');
  };

  const getUserRole = (): UserRole | null => {
    return currentUser?.role || null;
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
    getUserRole,
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
