// client/src/Fame.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import UploadForm from './UploadForm';

function Fame() {
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

  return (
    <div className="p-4 bg-amber-600 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">Animal Helpers Map</h1>
      <div className="bg-white/10 rounded-lg p-6 shadow-lg mb-6 backdrop-blur-sm">
        <UploadForm location={location} fetchSpots={fetchSpots} />
      </div>
      <div className="bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
        <MapComponent location={location} spots={spots} />
      </div>
    </div>
  );
}

export default Fame;