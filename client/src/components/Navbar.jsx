import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Menu, LogOut, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    navigate('/');
  };

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h3 className="text-xl font-bold tracking-wider">MyApp</h3>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {!user ? (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-800 hover:bg-indigo-900 transition-colors duration-300"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
                  >
                    Signup
                  </a>
                </>
              ) : (
                <>
                  <div className="ml-10 flex items-center space-x-4">
                    {/* Navigation Links */}
                    <button
                      onClick={goToHome}
                      className="px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-900"
                    >
                      Home
                    </button>
                    <button
                      onClick={goToAbout}
                      className="px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-900"
                    >
                      About Us
                    </button>
                  </div>
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-800 rounded-md text-sm font-medium"
                    >
                      <User size={16} />
                      <span className="truncate max-w-xs">{user.email}</span>
                      <ChevronDown size={16} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                        <button
                          onClick={goToDashboard}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          View Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-indigo-800">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <a
                  href="/login"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-900 text-center"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-center"
                >
                  Signup
                </a>
              </>
            ) : (
              <div className="space-y-2 p-2">
                {/* Mobile Navigation Links */}
                <a
                  href="/"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-900 text-center"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-900 text-center"
                >
                  About Us
                </a>
                {/* User Info */}
                <div className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md bg-indigo-700">
                  <User size={16} />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
                <button
                  onClick={goToDashboard}
                  className="w-full px-3 py-2 rounded-md text-base font-medium bg-white text-indigo-700 hover:bg-gray-100"
                >
                  View Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 rounded-md text-base font-medium bg-purple-500 hover:bg-purple-600"
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
