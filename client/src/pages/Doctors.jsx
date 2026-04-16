import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, Loader2, Star, ShieldPlus, ChevronLeft, ChevronRight, MapPin, ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import BookingModal from '../components/BookingModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const INITIAL_CATEGORIES = ['All', 'Cardiology', 'Dermatology', 'General Practice', 'Pediatrics', 'Neurology', 'Orthopedics'];

const Doctors = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSpecialty = queryParams.get('specialty') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialSpecialty);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rotateRight = () => {
    setCategories((prev) => {
      const newArray = [...prev];
      newArray.push(newArray.shift());
      return newArray;
    });
  };

  const rotateLeft = () => {
    setCategories((prev) => {
      const newArray = [...prev];
      newArray.unshift(newArray.pop());
      return newArray;
    });
  };

  const uniqueLocations = ['All', ...new Set(doctors.map(doc => doc.clinicAddress || 'Virtual Clinic / Telehealth'))];

  const filteredDoctors = doctors.filter(doc => {
    const matchesCategory = activeCategory === 'All' || doc.specialty === activeCategory;
    const doctorName = doc.user?.name || '';
    const matchesSearch = doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const docLoc = doc.clinicAddress || 'Virtual Clinic / Telehealth';
    const matchesLocation = selectedLocation === 'All' || docLoc === selectedLocation;

    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 overflow-x-hidden">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #94a3b8;
          }
        `}
      </style>

      <div className="bg-[#489ea7] relative pt-20 pb-32 md:pb-40 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
          <div className="w-full md:w-3/5 flex flex-col items-start relative z-20 pt-8">
            <div className="flex items-center gap-2 text-white font-bold text-xs tracking-widest uppercase mb-6 opacity-90">
              <ShieldPlus size={16} /> Welcome to MedEase
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Doctor Directory. <br />
              Find the right care.
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              Find the right specialist for your unique health needs and book your consultation instantly.
            </p>
          </div>

          <div className="absolute top-0 bottom-0 right-0 w-full md:w-1/2 h-[120%] flex justify-end items-end pointer-events-none z-10 opacity-40 md:opacity-100">
            <img 
              src="/doctors.png" 
              alt="Medical Professional" 
              className="h-[90%] md:h-full object-contain object-bottom drop-shadow-2xl"
              onError={(e) => {
                 e.target.src = 'https://via.placeholder.com/600x800/transparent/ffffff?text=Doctor+Image+Here';
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 md:-mt-20 relative z-30">
        <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-100 flex flex-col lg:flex-row items-center gap-8 justify-between">
          
          <div className="flex flex-col sm:flex-row w-full lg:w-1/2 gap-4">
            <div className="relative flex-1 shadow-sm group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400 group-focus-within:text-[#489ea7] transition-colors" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-full text-brand-dark focus:ring-2 focus:ring-[#489ea7] outline-none transition-all" 
                placeholder="Search by name..."
              />
            </div>

            <div className="relative shadow-sm sm:w-64 shrink-0" ref={dropdownRef}>
              <div 
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className={`flex items-center justify-between w-full pl-5 pr-4 py-4 bg-gray-50 rounded-full cursor-pointer transition-all border-2 ${isLocationDropdownOpen ? 'border-[#489ea7] ring-2 ring-[#489ea7]/20' : 'border-transparent hover:bg-gray-100'}`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MapPin size={18} className={isLocationDropdownOpen ? 'text-[#489ea7]' : 'text-gray-400'} />
                  <span className={`text-sm font-medium truncate select-none ${selectedLocation !== 'All' ? 'text-brand-dark' : 'text-gray-500'}`}>
                    {selectedLocation === 'All' ? 'All Locations' : selectedLocation}
                  </span>
                </div>
                <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isLocationDropdownOpen ? 'rotate-180 text-[#489ea7]' : ''}`} />
              </div>

              {isLocationDropdownOpen && (
                <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 transform origin-top transition-all">
                  <ul className="max-h-60 overflow-y-auto custom-scrollbar pr-1">
                    {uniqueLocations.map((loc, idx) => (
                      <li 
                        key={idx}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`px-5 py-3 mx-2 rounded-xl text-sm cursor-pointer transition-colors flex items-center justify-between group ${
                          selectedLocation === loc 
                            ? 'bg-[#EBF4F6] text-[#2A5C66] font-bold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className="truncate pr-4">{loc === 'All' ? 'Everywhere' : loc}</span>
                        {selectedLocation === loc && (
                          <div className="w-2 h-2 rounded-full bg-[#489ea7]"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-3 w-full lg:w-1/2">
            <button 
              onClick={rotateLeft} 
              className="w-10 h-10 shrink-0 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#489ea7] transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-3 overflow-hidden w-full relative mask-edges">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all ${
                    activeCategory === category 
                      ? 'bg-[#489ea7] text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button 
              onClick={rotateRight} 
              className="w-10 h-10 shrink-0 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#489ea7] transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#489ea7]" size={48} />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">No doctors found</h3>
            <p className="text-gray-500">We couldn't find any doctors matching your search and location criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setActiveCategory('All');
              }} 
              variant="outline" 
              className="mt-6"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {filteredDoctors.map((doc) => (
              <div key={doc._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col h-full relative group hover:-translate-y-1">
                
                <div className="flex justify-between items-start mb-12">
                  <div className="border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2 z-10 bg-white shadow-sm">
                    <span className="text-xs font-semibold text-gray-700">{doc.specialty}</span>
                  </div>
                </div>

                <div className="absolute top-24 right-6 w-20 h-20 rounded-full bg-[#489ea7] opacity-10 -z-0 group-hover:scale-125 transition-transform duration-700 ease-out"></div>

                <div className="z-10 mt-auto">
                  <h3 className="text-2xl font-bold text-brand-dark leading-tight mb-2">
                    {doc.user?.name || 'Doctor'}
                  </h3>
                  <div className="flex items-center gap-1 text-brand-dark font-bold mb-2">
                    <Star size={16} className="fill-brand-yellow text-brand-yellow" />
                    {doc.averageRating > 0 ? doc.averageRating : "New"} 
                    <span className="text-gray-400 font-normal text-sm ml-1">
                      ({doc.reviewCount || 0} reviews)
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3 font-medium">
                    {doc.experience} yrs experience • ${doc.consultationFee}/consultation
                  </p>

                  <div className="flex items-start gap-1.5 text-gray-500 text-sm font-medium mb-6">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{doc.clinicAddress || 'Virtual Clinic / Telehealth'}</span>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setIsModalOpen(true);
                    }}
                    variant="primary" 
                    className="w-full justify-between px-6 py-4 rounded-2xl group-hover:bg-[#489ea7] group-hover:text-white transition-colors shadow-sm"
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
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        doctor={selectedDoctor} 
      />
    </div>
  );
};

export default Doctors;