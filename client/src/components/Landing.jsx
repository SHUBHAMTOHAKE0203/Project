import { useState,useEffect } from 'react';
import { Heart, PawPrint, Users, Calendar, Gift, Mail, ChevronRight, ArrowRight, Facebook, Instagram, Twitter } from 'lucide-react';
import axios from 'axios';
import MapComponent from './MapComponent';
export default function StreetPawsLandingPage() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! We'll keep you updated on our rescue efforts.`);
    setEmail('');
  };
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
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      
      <header className="relative bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1553688738-a278b9f063e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
    <div className="md:w-2/3 text-white">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Give a Paw, Save a Life</h1>
      <p className="text-xl md:text-2xl mb-8">
        StreetPaws is dedicated to rescuing, rehabilitating, and rehoming abandoned animals in our community.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 flex items-center justify-center">
          Adopt Now <ChevronRight className="ml-2 h-5 w-5" />
        </button>
        <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center">
          Donate <Heart className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</header>


      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-amber-600 mb-2">450+</p>
              <p className="text-gray-600">Animals Rescued</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-amber-600 mb-2">380+</p>
              <p className="text-gray-600">Adoptions</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-amber-600 mb-2">50+</p>
              <p className="text-gray-600">Volunteers</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-amber-600 mb-2">8</p>
              <p className="text-gray-600">Years Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Help</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our rescue team works tirelessly to provide care and love to animals in need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <PawPrint className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rescue Operations</h3>
              <p className="text-gray-600">
                We rescue stray, abandoned, and abused animals from the streets and provide immediate medical care.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Adoption Program</h3>
              <p className="text-gray-600">
                We match rescued animals with loving forever homes through our thorough adoption process.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Education</h3>
              <p className="text-gray-600">
                We organize events and workshops to raise awareness about animal welfare and responsible pet ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Friends</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These lovely animals are looking for their forever homes. Could you be their perfect match?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pet Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <img src="https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dog named Buddy" className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Buddy</h3>
                  <span className="bg-amber-100 text-amber-800 text-sm py-1 px-3 rounded-full">Dog</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Buddy is a 3-year-old friendly Labrador mix who loves playing fetch and cuddling.
                </p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                  Meet Buddy
                </button>
              </div>
            </div>

            {/* Pet Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cat named Luna" className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Luna</h3>
                  <span className="bg-amber-100 text-amber-800 text-sm py-1 px-3 rounded-full">Cat</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Luna is a gentle 2-year-old calico who enjoys window watching and gentle pets.
                </p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                  Meet Luna
                </button>
              </div>
            </div>

            {/* Pet Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Rabbit named Thumper" className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Thumper</h3>
                  <span className="bg-amber-100 text-amber-800 text-sm py-1 px-3 rounded-full">Rabbit</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Thumper is an adorable 1-year-old rabbit who loves fresh vegetables and hopping around.
                </p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                  Meet Thumper
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="bg-transparent hover:bg-amber-500 text-amber-500 hover:text-white border border-amber-500 font-medium py-3 px-8 rounded-md transition duration-300 inline-flex items-center">
              View All Adoptable Pets <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <h2 className="text-3xl font-bold text-center text-black ">Thank You For Saving Our Lives!</h2>
      <p className="text-xl text-center mt-4 text-gray-600 ">Thanking Our Volunteers For Rescuing The animals</p>
     <div className="bg-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
             <MapComponent location={location} spots={spots} />
           </div>

      {/* Donate Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-500 rounded-lg overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-4">Make a Difference Today</h2>
                <p className="text-white text-lg mb-8">
                  Your donation helps us rescue more animals and provide them with the care they need until they find their forever homes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-amber-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md shadow-md transition duration-300 inline-flex items-center">
                    <Gift className="mr-2 h-5 w-5" /> Donate Now
                  </button>
                  <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold py-3 px-8 rounded-md transition duration-300 inline-flex items-center">
                    Become a Volunteer
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1532598735201-8932203d3004?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Rescued dog" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Join our newsletter to receive updates about our rescue operations, upcoming events, and adorable adoption success stories.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
              >
                Subscribe <Mail className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StreetPaws</h3>
              <p className="text-gray-400 mb-6">
                Dedicated to rescuing and rehoming animals in need since 2015.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Adoption Process</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Help Out</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Donate</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Volunteer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Foster</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Sponsor</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Rescue Street</li>
                <li>Pawsville, CA 90210</li>
                <li>info@streetpaws.org</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} StreetPaws Animal Rescue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}