import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Menu, LogOut, User, ChevronDown, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(onLogout);
    setDropdownOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const goToDashboard = () => {
    navigate('/dashboard');
    setDropdownOpen(false);
  };

  const goToHome = () => {
    navigate('/services');
  };

  const gotoDonate = () => {
    navigate('/donate');
  };

  // Navigation links component
  const NavLinks = () => (
    <>
      <button
        onClick={goToHome}
        className="px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors duration-200"
      >
    Our Services
      </button>
      <button
      onClick={gotoDonate}
      className="px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors duration-200"
    >
     Donate Us
    </button>
     
    </>
  );

  // User dropdown component
  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium text-amber-600 hover:bg-gray-100 transition-colors duration-200"
      >
        <User size={16} color="#D97706" />
        <span className="truncate max-w-xs">{user.email}</span>
        <ChevronDown size={16} color="#D97706" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-amber-600 rounded-md shadow-lg z-50">
          <button
            onClick={goToDashboard}
            className="block w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors duration-200"
          >
            View Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  // Auth buttons component
  const AuthButtons = () => (
    <>
      <a
        href="/login"
        className="px-4 py-2 rounded-md text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-200"
      >
        Login
      </a>
      <a
        href="/signup"
        className="px-4 py-2 rounded-md text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-200"
      >
        Signup
      </a>
    </>
  );

  return (
    <nav className="bg-amber-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <PawPrint size={20} color="white" strokeWidth={2.5} />
            <Link to="/" className="text-xl font-bold tracking-wider">StreetPaws</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            {user ? (
              <>
                <div className="flex items-center space-x-4 mr-4">
                  <NavLinks />
                </div>
                <UserDropdown />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <AuthButtons />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md hover:bg-amber-700 transition-colors duration-200"
            >
              <Menu size={24} color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-600">
          <div className="px-2 pt-2 pb-3 space-y-2">
            {!user ? (
              <>
                <a
                  href="/login"
                  className="block px-3 py-2 rounded-md hover:bg-amber-700 text-center transition-colors duration-200"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block px-3 py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-center transition-colors duration-200"
                >
                  Signup
                </a>
              </>
            ) : (
              <div className="space-y-2">
                {/* Mobile Navigation Links */}
                <a
                  href="/services"
                  className="block px-3 py-2 rounded-md hover:bg-amber-700 text-center transition-colors duration-200"
                >
                  Our Services
                </a>
                <a
                  href="/donate"
                  className="block px-3 py-2 rounded-md hover:bg-amber-700 text-center transition-colors duration-200"
                >
                  Donate Us
                </a>
               
                
                {/* User Info */}
                <div className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md bg-white text-amber-600">
                  <User size={16} color="#D97706" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                
                {/* Action Buttons */}
                <button
                  onClick={goToDashboard}
                  className="w-full px-3 py-2 rounded-md text-base font-medium bg-white text-amber-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  View Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}