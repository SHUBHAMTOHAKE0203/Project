import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup from './components/Signup';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/Dasboard';
import ImageCarousel from './components/ImageCarousel';
import FirstAidAI from './components/Chatbot';
import Chatbot from './components/Chatbot';
import StripeContainer from './components/StripeContainer';
import NearbyVeterinarians from './components/NearbyVeterinarians';
import Fame from './components/Fame';
import UploadForm from './components/UploadForm';
import MapRender from './components/MapComponent';
import StreetPawsLanding from './components/Landing';
import ServiceCard from './components/ServiceCard'
import PharmacyFinder from './components/PharmacyFinder'
import Community from './components/Community';
import Report from './components/Report'
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      {/* Navbar will be shown across all routes */}
      <Navbar user={user} onLogout={handleLogout} />
      
      <Routes>
        {/* Root path with Landing Page */}
        <Route path="/" element={<StreetPawsLanding />} />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          }
        />
        
        {/* Other Routes */}
        <Route path="/nearby-pharmacy" element={<PharmacyFinder/>}/>
        <Route path="/chatboot" element={<Chatbot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/services" element={<ServiceCard />} />
        <Route path="/vet" element={<NearbyVeterinarians/>}/>
       <Route path="/blog" element={<Community/>}/>
       <Route path="/donate" element={<StripeContainer/>}/>
        {/* Redirect to dashboard if any unknown route */}
        <Route path="/report-spam" element={<Report/>}/>
      </Routes>
    </Router>
  );
}

export default App;
