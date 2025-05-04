import React, { useEffect, useState } from 'react';
import { Map, Navigation, MapPin, Compass } from 'lucide-react';

const NearbyVeterinarians = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [mapVisible, setMapVisible] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError('Failed to get location');
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    const fetchVets = async () => {
      if (!location) return;

      const { lat, lon } = location;
      const radius = 10000; // 10km search radius

      const query = `
        [out:json];
        (
          node["amenity"="veterinary"](around:${radius},${lat},${lon});
          way["amenity"="veterinary"](around:${radius},${lat},${lon});
          relation["amenity"="veterinary"](around:${radius},${lat},${lon});
        );
        out center;
      `;

      try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: query,
        });

        const data = await response.json();

        const results = data.elements.map((el) => ({
          id: el.id,
          name: el.tags?.name || 'Unnamed Veterinary Clinic',
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
          address: el.tags?.["addr:street"] ? 
            `${el.tags?.["addr:housenumber"] || ""} ${el.tags?.["addr:street"] || ""}` : 
            (el.tags?.address || "Address not available"),
          phone: el.tags?.phone || "Phone not available"
        }));

        setVets(results);
      } catch (err) {
        setError('Failed to fetch veterinarian data');
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, [location]);

  const handleNavigate = (vet) => {
    // Open in Google Maps
    const url = `https://www.google.com/maps/dir/?api=1&destination=${vet.lat},${vet.lon}&travelmode=driving`;
    window.open(url, '_blank');
  };

  // Simple distance calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  // Render the map
  const renderMap = () => {
    if (!location) return null;
    
    return (
      <div className="rounded-lg mb-4 relative overflow-hidden h-96 border border-gray-300">
        {/* Use placeholder image as map background */}
       
        
        {/* Map overlay with vet locations */}
        <div className="absolute inset-0">
          {/* Your current location indicator */}
          <div className="absolute bg-blue-500 w-6 h-6 rounded-full" 
               style={{ 
                 left: '50%', 
                 top: '50%',
                 transform: 'translate(-50%, -50%)',
                 zIndex: 10 
               }}>
            <div className="absolute w-12 h-12 bg-blue-500 opacity-30 rounded-full" 
                 style={{ top: '-12px', left: '-12px' }}></div>
            <div className="absolute text-xs bg-white px-2 py-1 rounded-lg shadow-md whitespace-nowrap"
                 style={{ top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
              Your Location
            </div>
          </div>
          
          {/* Vet locations */}
          {vets.map((vet, index) => {
            // Distribute the vets around the center in a more organized way
            // This creates a visual pattern for the demo
            const angle = (index * (360 / vets.length)) * (Math.PI / 180);
            const radius = Math.min(vets.length * 5, 40); // Adjust radius based on number of vets
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;
            
            return (
              <div key={vet.id}
                className={`absolute w-5 h-5 rounded-full cursor-pointer flex items-center justify-center
                          ${selectedVet?.id === vet.id ? 'bg-red-600' : 'bg-red-500'}`}
                style={{ 
                  left: `calc(50% + ${offsetX}%)`, 
                  top: `calc(50% + ${offsetY}%)`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 5
                }}
                onClick={() => setSelectedVet(vet)}>
                <span className="text-white text-xs font-bold">{index + 1}</span>
                
                {selectedVet?.id === vet.id && (
                  <div className="absolute bg-white p-2 rounded shadow-lg text-sm w-40 z-20"
                       style={{ bottom: '24px', left: '50%', transform: 'translateX(-50%)' }}>
                    <p className="font-bold truncate">{vet.name}</p>
                    <div className="flex justify-between mt-1">
                      <button 
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(vet);
                        }}>
                        Navigate
                      </button>
                      <span className="text-xs text-gray-500">
                        {location ? calculateDistance(location.lat, location.lon, vet.lat, vet.lon) : '?'} km
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Map controls */}
          <div className="absolute top-2 right-2 bg-white rounded shadow-lg">
            <div className="p-2 flex flex-col space-y-2">
              <button className="bg-white hover:bg-gray-100 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold">+</button>
              <button className="bg-white hover:bg-gray-100 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold">−</button>
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow text-sm">
            <div className="flex items-center mb-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span>Veterinarians</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Nearby Veterinarians</h2>
        <button 
          onClick={() => setMapVisible(!mapVisible)}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded">
          <Map size={16} className="mr-1" />
          {mapVisible ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
      
      {!loading && vets.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center">
          <Compass className="text-blue-500 mr-2" size={20} />
          <p className="text-sm">
            <span className="font-semibold">{vets.length} veterinarians</span> found within 10km of your location.
            {' '}{mapVisible ? 'Click on a pin to see details.' : 'Enable map to see locations.'}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {mapVisible && renderMap()}

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : vets.length > 0 ? (
        <ul className="space-y-3">
          {vets.map((vet) => {
            const distance = location ? calculateDistance(
              location.lat, location.lon, vet.lat, vet.lon
            ) : null;
            
            return (
              <li 
                key={vet.id} 
                className={`border p-4 rounded-lg shadow hover:bg-gray-50 cursor-pointer
                          ${selectedVet?.id === vet.id ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setSelectedVet(vet.id === selectedVet?.id ? null : vet)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{vet.name}</h3>
                    <p className="text-gray-600">{vet.address}</p>
                    <p className="text-gray-600">{vet.phone}</p>
                    {distance && (
                      <p className="text-sm text-gray-500 mt-1">
                        {distance} km away
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(vet);
                    }}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded flex items-center">
                    <Navigation size={16} className="mr-1" />
                    Navigate
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center p-8 bg-gray-50 rounded-lg">No veterinarians found nearby.</p>
      )}
    </div>
  );
};

export default NearbyVeterinarians;