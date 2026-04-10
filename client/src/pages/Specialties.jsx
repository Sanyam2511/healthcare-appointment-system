import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Baby, Brain, Stethoscope, 
  Eye, Bone, Wind, Sparkles, 
  Search, ArrowRight, Activity 
} from 'lucide-react';
import Button from '../components/Button';

// Expanded mock data for the dedicated page
const ALL_SPECIALTIES = [
  { id: 1, name: 'Cardiology', icon: <Heart size={28} />, color: 'bg-red-50 text-red-500', doctors: 124, desc: 'Heart and cardiovascular health.' },
  { id: 2, name: 'Pediatrics', icon: <Baby size={28} />, color: 'bg-blue-50 text-brand-blue', doctors: 86, desc: 'Care for infants and children.' },
  { id: 3, name: 'Neurology', icon: <Brain size={28} />, color: 'bg-purple-50 text-purple-500', doctors: 64, desc: 'Brain and nervous system.' },
  { id: 4, name: 'General Practice', icon: <Stethoscope size={28} />, color: 'bg-green-50 text-green-500', doctors: 210, desc: 'Primary care and checkups.' },
  { id: 5, name: 'Orthopedics', icon: <Bone size={28} />, color: 'bg-orange-50 text-orange-500', doctors: 92, desc: 'Bones, joints, and muscles.' },
  { id: 6, name: 'Ophthalmology', icon: <Eye size={28} />, color: 'bg-teal-50 text-teal-500', doctors: 45, desc: 'Eye and vision care.' },
  { id: 7, name: 'Pulmonology', icon: <Wind size={28} />, color: 'bg-cyan-50 text-cyan-500', doctors: 38, desc: 'Lungs and respiratory tract.' },
  { id: 8, name: 'Dermatology', icon: <Sparkles size={28} />, color: 'bg-brand-yellow text-brand-dark', doctors: 76, desc: 'Skin, hair, and nail conditions.' },
  { id: 9, name: 'Psychiatry', icon: <Activity size={28} />, color: 'bg-indigo-50 text-indigo-500', doctors: 112, desc: 'Mental health and wellness.' },
];

const Specialties = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Live filter logic based on user search
  const filteredSpecialties = ALL_SPECIALTIES.filter(spec => 
    spec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    spec.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      
      {/* Page Header with Search */}
      <section className="bg-white pt-16 pb-12 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-4 tracking-tight">
              Medical Specialties
            </h1>
            <p className="text-lg text-gray-500">
              Browse our comprehensive list of medical departments to find the exact care you need.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search specialties or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none transition-all shadow-sm"
            />
          </div>

        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 md:px-12 pt-16">
        <div className="max-w-7xl mx-auto">
          
          {filteredSpecialties.length === 0 ? (
             <div className="text-center py-20">
               <h3 className="text-2xl font-bold text-brand-dark mb-2">No specialties found</h3>
               <p className="text-gray-500">We couldn't find any matches for "{searchTerm}". Try adjusting your search.</p>
               <Button variant="outline" className="mt-6 mx-auto" onClick={() => setSearchTerm('')}>Clear Search</Button>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecialties.map((spec) => (
                <Link to={`/doctors?specialty=${spec.name}`} key={spec.id} className="block">
                  <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group text-left relative overflow-hidden h-full flex flex-col">
                    
                    {/* Expanding background decoration */}
                    <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${spec.color} opacity-10 group-hover:scale-[2] transition-transform duration-700 ease-out`}></div>
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${spec.color} relative z-10 shadow-sm`}>
                      {spec.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-brand-dark mb-3 relative z-10">{spec.name}</h3>
                    <p className="text-gray-500 text-base mb-8 relative z-10 flex-grow">{spec.desc}</p>
                    
                    <div className="flex items-center justify-between text-sm font-semibold relative z-10 pt-4 border-t border-gray-50">
                      <span className="text-brand-dark/60 bg-gray-50 px-4 py-1.5 rounded-full">{spec.doctors} Specialists</span>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Specialties;