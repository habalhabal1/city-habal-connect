
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, ChevronDown, Home } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout, getUserRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = getUserRole();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'rider':
        return '/rider-dashboard';
      case 'driver':
        return '/driver-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/';
    }
  };
  
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-habal-primary rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold text-habal-dark">Habal-Connect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-habal-gray hover:text-habal-dark font-medium">Home</Link>
            <Link to="/about" className="text-habal-gray hover:text-habal-dark font-medium">About</Link>
            <Link to="/services" className="text-habal-gray hover:text-habal-dark font-medium">Services</Link>
            <Link to="/contact" className="text-habal-gray hover:text-habal-dark font-medium">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to={getDashboardLink()}>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Home size={16} />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.profileImage} />
                        <AvatarFallback>{getInitials(currentUser?.name || '')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{currentUser?.name}</span>
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-habal-gray hover:text-habal-primary">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-habal-primary hover:bg-habal-dark text-white">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" className="p-2" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-inner">
          <div className="container mx-auto px-4 py-3 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-habal-gray hover:text-habal-primary font-medium p-2"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-habal-gray hover:text-habal-primary font-medium p-2"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className="text-habal-gray hover:text-habal-primary font-medium p-2"
                onClick={toggleMobileMenu}
              >
                Services
              </Link>
              <Link 
                to="/contact" 
                className="text-habal-gray hover:text-habal-primary font-medium p-2"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <Link 
                  to={getDashboardLink()} 
                  className="w-full"
                  onClick={toggleMobileMenu}
                >
                  <Button variant="outline" className="w-full flex justify-center items-center space-x-2">
                    <Home size={16} />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.profileImage} />
                      <AvatarFallback>{getInitials(currentUser?.name || '')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{currentUser?.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-red-500">
                    <LogOut size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" className="w-full" onClick={toggleMobileMenu}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/register" className="w-full" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-habal-primary hover:bg-habal-dark text-white">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
