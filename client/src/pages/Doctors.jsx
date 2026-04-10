import React, { useState } from 'react';
import { ArrowRight, Search, Plus } from 'lucide-react';
import Button from '../components/Button';
import BookingModal from '../components/BookingModal';

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', experience: '12 yrs', fee: '$80', color: 'bg-brand-blue' },
  { id: 2, name: 'Dr. Marcus Chen', specialty: 'Dermatology', experience: '8 yrs', fee: '$60', color: 'bg-brand-yellow' },
  { id: 3, name: 'Dr. Emily Carter', specialty: 'General Practice', experience: '15 yrs', fee: '$50', color: 'bg-green-100' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Pediatrics', experience: '10 yrs', fee: '$70', color: 'bg-purple-100' },
];

const CATEGORIES = ['All', 'Cardiology', 'Dermatology', 'General Practice', 'Pediatrics'];

const Doctors = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = activeCategory === 'All' 
    ? MOCK_DOCTORS 
    : MOCK_DOCTORS.filter(doc => doc.specialty === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Section (Mimicking the top half of the Product Library) */}
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

          {/* Category Pills (Mimicking "Minerals / Vitamins") */}
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

      {/* Grid Section (Mimicking the Calcium Plus D3 Cards) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full relative group">
              
              {/* Top Card Navigation */}
              <div className="flex justify-between items-start mb-12">
                <div className="border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">{doc.specialty}</span>
                </div>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-dark hover:border-brand-dark transition-colors">
                  <Plus size={16} />
                </button>
              </div>

              {/* Decorative Visual Element (Replacing the pill bottle image) */}
              <div className={`absolute top-24 right-6 w-20 h-20 rounded-full ${doc.color} opacity-20 -z-0 group-hover:scale-110 transition-transform duration-500`}></div>

              {/* Doctor Details */}
              <div className="z-10 mt-auto">
                <h3 className="text-2xl font-bold text-brand-dark leading-tight mb-2">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-500 mb-6 font-medium">
                  {doc.experience} experience • {doc.fee}/consultation
                </p>
                
                <Button 
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setIsModalOpen(true);
                  }}
                  variant="primary" 
                  className="w-full justify-between px-6 py-4 rounded-2xl group-hover:bg-brand-blue group-hover:text-brand-dark"
                >
                  Book appointment
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          ))}

        </div>
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