// client/src/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapComponent({ location, spots }) {
  return (
    <div className="flex flex-col items-center">
 
      <div className="w-full  mx-auto p-4">
        <MapContainer 
          center={location || [20.59, 78.96]} 
          zoom={5} 
          style={{ 
            height: '500px', 
            border: '4px solid #d97706', // amber-600 border
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)' // amber shadow
          }}
          className="z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {spots.map((s, idx) => (
            <Marker key={idx} position={[s.lat, s.lng]} icon={markerIcon}>
              <Popup className="custom-popup">
                <div className="bg-amber-50 p-2 rounded">
                  <img src={s.image} alt="animal selfie" className="w-40 h-40 object-cover rounded" />
                  <p className="text-amber-800 font-medium mt-2">Thanks for helping!</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;