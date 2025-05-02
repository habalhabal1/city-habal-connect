
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Clock, Shield, Phone, ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-habal-primary to-habal-dark text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fast & Reliable Habal-Habal Rides in Cotabato City
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                Connect with trusted drivers and enjoy convenient transportation at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-habal-primary hover:bg-gray-100">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/10 rounded-lg transform rotate-6 scale-105"></div>
                <img 
                  src="https://images.unsplash.com/photo-1528179341992-c4aab2d4f2de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90b3JjeWNsZSUyMHRheGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Habal-habal ride" 
                  className="relative z-10 rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,160L60,144C120,128,240,96,360,90.7C480,85,600,107,720,128C840,149,960,171,1080,165.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-habal-dark">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Get from point A to point B in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 rounded-full bg-habal-primary text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create an account with your details to get started.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 rounded-full bg-habal-primary text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Book a Ride</h3>
              <p className="text-gray-600">
                Enter your pickup and destination points to find available drivers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-12 h-12 rounded-full bg-habal-primary text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Meet your driver and reach your destination safely.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/register">
              <Button className="bg-habal-primary hover:bg-habal-dark">
                Get Started Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-habal-primary to-habal-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Better Transportation?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of satisfied users in Cotabato City who rely on Habal-Connect for their daily commute.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-habal-primary hover:bg-gray-100">
                  Sign Up as Rider
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Become a Driver
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center text-lg">
              <Phone className="mr-2 h-5 w-5" />
              <span>Support: +63 912 345 6789</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
