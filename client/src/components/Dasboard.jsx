import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { Mail, User, Image, Clock, Calendar, Bell, Settings, LogOut } from 'lucide-react';
import UploadForm from './UploadForm';
import axios from 'axios';
export default function Dashboard({ user }) {
  const [location, setLocation] = useState(null);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation([pos.coords.latitude, pos.coords.longitude]);
    });
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    const res = await axios.get('http://localhost:4000/spots');
    setSpots(res.data);
  };
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRef = ref(db, 'users/' + user.uid);
    const unsubscribe = onValue(userRef, (snapshot) => {
      setData(snapshot.val());
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-6 max-w-sm bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No user data found</h3>
          <p className="mt-2 text-sm text-gray-500">We couldn't load your profile information. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-amber-50">
      {/* Top Navigation */}
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="absolute -top-12">
              <div className="rounded-full border-4 border-white overflow-hidden bg-gray-200 w-24 h-24 flex items-center justify-center">
                {data.photoURL ? (
                  <img src={data.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-gray-400" />
                )}
              </div>
            </div>
            <div className="ml-35">
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {data.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Mail className="h-4 w-4 mr-1" />
                <span>{data.email}</span>
              </div>
              <div className="mt-4 flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                  Active User
                </span>
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Last login: Today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Info */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{data.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{data.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-gray-500">Post Rescue</p>
              <div className="bg-white/10 rounded-lg p-6 shadow-lg mb-6 backdrop-blur-sm">
              
                    <UploadForm location={location} fetchSpots={fetchSpots} />
                  </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Image className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Profile Image</h3>
            </div>
            <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border border-gray-200">
              {data.photoURL ? (
                <img src={data.photoURL} alt="Profile" className="max-h-40 max-w-full rounded shadow" />
              ) : (
                <div className="text-center">
                  <User className="h-16 w-16 text-gray-300 mx-auto" />
                  <p className="mt-2 text-sm text-gray-500">No profile image available</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 truncate">
                <span className="font-medium">Image URL:</span> {data.photoURL || 'No URL available'}
              </div>
              <button className="mt-2 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700">
                Update Image
              </button>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Profile updated</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <LogOut className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Last login</p>
                  <p className="text-xs text-gray-500">Today, 9:30 AM</p>
                  
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Settings changed</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                  <h1 className="text-2xl font-bold mb-4 text-white">Animal Helpers Map</h1>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
