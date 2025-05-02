
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-habal-primary rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h3 className="text-xl font-bold text-habal-dark dark:text-white">Habal-Connect</h3>
            </div>
            <p className="text-habal-gray dark:text-gray-400">
              Connecting riders and drivers for safe, efficient habal-habal transportation in Cotabato City.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-habal-dark dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div className="space-y-4">
            <h3 className="font-semibold text-habal-dark dark:text-white">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  Register as Rider
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  Become a Driver
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  Login to Account
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-habal-dark dark:text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-habal-primary shrink-0 mt-1" />
                <span className="text-habal-gray dark:text-gray-400">
                  123 Main Street, Cotabato City, Philippines
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-habal-primary shrink-0" />
                <span className="text-habal-gray dark:text-gray-400">
                  +63 (912) 345 6789
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-habal-primary shrink-0" />
                <span className="text-habal-gray dark:text-gray-400">
                  support@habal-connect.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-habal-gray dark:text-gray-400">
              &copy; {currentYear} Habal-Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-habal-gray hover:text-habal-primary dark:text-gray-400 dark:hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
