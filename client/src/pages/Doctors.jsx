import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Plus, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import BookingModal from '../components/BookingModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CATEGORIES = ['All', 'Cardiology', 'Dermatology', 'General Practice', 'Pediatrics', 'Neurology', 'Orthopedics'];

const Doctors = () => {
  // Check if we came from the Specialties page with a pre-selected category
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSpecialty = queryParams.get('specialty') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialSpecialty);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // New State for REAL database data
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real doctors from your backend on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors');
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter against the real state array
  const filteredDoctors = activeCategory === 'All' 
    ? doctors 
    : doctors.filter(doc => doc.specialty === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Section */}
      <div className="bg-white pt-12 pb-6 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Doctor <br /> Directory <span className="inline-block bg-brand-dark text-white rounded-full p-1 ml-2"><ArrowRight size={28}/></span>
          </h1>
          <p className="text-gray-600 max-w-md mb-8">
            Find the right specialist for your unique health needs and book your consultation instantly.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-full text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none" 
              placeholder="Search by name or condition..."
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-brand-dark text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section - Now rendering REAL data */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-brand-blue" size={48} />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No doctors found for this specialty.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {filteredDoctors.map((doc) => (
              <div key={doc._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full relative group">
                
                {/* Top Card Navigation */}
                <div className="flex justify-between items-start mb-12">
                  <div className="border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2 z-10 bg-white">
                    <span className="text-xs font-semibold text-gray-700">{doc.specialty}</span>
                  </div>
                </div>

                {/* Decorative Visual Element */}
                <div className="absolute top-24 right-6 w-20 h-20 rounded-full bg-brand-blue opacity-10 -z-0 group-hover:scale-110 transition-transform duration-500"></div>

                {/* Doctor Details from MongoDB */}
                <div className="z-10 mt-auto">
                  <h3 className="text-2xl font-bold text-brand-dark leading-tight mb-2">
                    {doc.user?.name || 'Doctor'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">
                    {doc.experience} yrs experience • ${doc.consultationFee}/consultation
                  </p>
                  
                  <Button 
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setIsModalOpen(true);
                    }}
                    variant="primary" 
                    className="w-full justify-between px-6 py-4 rounded-2xl group-hover:bg-brand-blue group-hover:text-brand-dark transition-colors"
                  >
                    Book appointment
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        doctor={selectedDoctor} 
      />
    </div>
  );
};

export default Doctors;