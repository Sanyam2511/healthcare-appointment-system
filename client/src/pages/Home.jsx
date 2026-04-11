import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Users, ShieldCheck, Calendar, MapPin } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- MOCK DATA FOR CATEGORIES ---
const SPECIALTIES = [
  { 
    name: 'Cardiology', 
    desc: 'Preventive cardiology and advanced intervention strategies tailored to your circulatory health.',
    tags: ['Heart health', 'Hypertension', 'ECG Analysis']
  },
  { 
    name: 'Neurology', 
    desc: 'Expert care and advanced intervention strategies tailored to your nervous system.',
    tags: ['Migraines', 'Nerve Disorders', 'Stroke Care']
  },
  { 
    name: 'Pediatrics', 
    desc: 'Preventive pediatrics and advanced intervention strategies tailored to your child\'s health.',
    tags: ['Growth Tracking', 'Vaccinations', 'Child Development']
  },
  { 
    name: 'Orthopedics', 
    desc: 'Preventive care and advanced intervention strategies tailored to your musculoskeletal health.',
    tags: ['Fracture', 'Arthroscopy', 'Knee Pain']
  },
];

// --- ADD THIS: Hardcoded array of your 3 portfolio images ---
const DEMO_IMAGES = [
  '/dr1.png', 
  '/dr2.png', 
  '/dr3.png'
];

const Home = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctors on load
  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors');
        
        const allDoctors = response.data.data;
        const topDoctors = allDoctors
          .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
          .slice(0, 3);
          
        setFeaturedDoctors(topDoctors);
      } catch (error) {
        console.error('Error fetching featured doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  return (
    <div className="bg-[#F8F9FA] pb-12">
      
      {/* SECTION 1: The Hero */}
      <section className="min-h-[calc(100vh-80px)] px-6 md:px-12 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden">
        
        {/* Left Column: Typography & CTAs */}
        <div className="w-full md:w-1/2 flex flex-col items-start z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-dark leading-[1.1] mb-6">
            Simplify your <span className="text-brand-blue block md:inline">health</span><br />
            and wellbeing.
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-md">
            Unlock your personalized healthcare plan. Book top-rated doctors, manage appointments, and track your medical history all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link to="/doctors">
              <Button variant="primary" className="text-lg px-8 py-6 rounded-full group">
                Find a Doctor
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>

          {/* The Yellow Stat Card */}
          <div className="bg-brand-yellow p-4 pr-8 rounded-3xl flex items-center gap-4 shadow-sm w-max">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-brand-yellow flex items-center justify-center text-blue-600"><Users size={18}/></div>
              <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-brand-yellow flex items-center justify-center text-green-600"><ShieldCheck size={18}/></div>
              <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-brand-yellow flex items-center justify-center text-purple-600"><Calendar size={18}/></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-dark leading-none">2,500+</p>
              <p className="text-xs font-medium text-gray-700 uppercase tracking-wide mt-1">Appointments Booked</p>
            </div>
          </div>
        </div>

        {/* Right Column: Floating UI Elements */}
        <div className="w-full md:w-1/2 relative min-h-[400px] bg-brand-blue rounded-[3rem] p-8 flex items-center justify-center">
          <div className="absolute top-12 left-8 bg-white px-6 py-3 rounded-full shadow-md transform -rotate-6 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark">
            Cardiology ❤️
          </div>
          <div className="absolute top-1/3 right-8 bg-white px-6 py-3 rounded-full shadow-md transform rotate-3 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark">
            Dermatology ✨
          </div>
          <div className="absolute bottom-24 left-16 bg-white px-6 py-3 rounded-full shadow-md transform rotate-6 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark">
            Pediatrics 🧸
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center z-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-brand-dark">
              <span className="text-2xl">👩‍⚕️</span>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Connect with Experts</h3>
            <p className="text-gray-500 text-sm mb-6">Skip the waiting room. Book an online or in-person consultation instantly.</p>
            <Link to="/doctors">
              <Button variant="outline" className="w-full justify-center">
                View Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Browse by Specialty */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">(Category)</p>
            <h2 className="text-4xl md:text-5xl font-serif italic text-brand-dark mb-2 font-light">
              Find Your Specialist
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-brand-dark tracking-tight">
              Precision Care for Every Need
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTIES.map((spec) => (
              <div 
                key={spec.name} 
                className="bg-gradient-to-b from-white to-[#EBF4F6] border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative flex flex-col min-h-[320px]"
              >
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-brand-dark group-hover:shadow-md transition-all">
                  <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                
                <div className="mt-auto pt-12">
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">{spec.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed pr-4">{spec.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {spec.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-semibold text-gray-600 shadow-sm whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: Featured Doctors --- */}
      <section className="py-16 px-6 md:px-12 bg-[#1A252A] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/3 flex flex-col items-start z-10">
            <p className="text-sm font-semibold text-white/50 tracking-wide mb-6">(Our Specialist)</p>
            <h2 className="text-5xl lg:text-6xl text-white font-light mb-8 leading-[1.1]">
              Meet our <br />
              <span className="font-serif italic font-medium">expert doctors</span>
            </h2>
            <p className="text-white/70 text-lg mb-12 max-w-sm leading-relaxed">
              Highly experienced doctors and specialists committed to your unique health journey.
            </p>
            
            <div className="flex items-center gap-6">
              <Link to="/doctors">
                <Button className="rounded-full bg-[#273B43] hover:bg-[#324952] text-white border-none py-3 pl-3 pr-6 flex items-center gap-4 transition-colors">
                  <div className="bg-white text-brand-dark w-8 h-8 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={16} />
                  </div>
                  See All Specialists
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Fixed 3 Column Grid */}
          <div className="lg:w-2/3 w-full">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[340px]">
                <div className="animate-pulse bg-white/10 rounded-[2.5rem] w-full h-full"></div>
                <div className="animate-pulse bg-white/10 rounded-[2.5rem] w-full h-full hidden md:block"></div>
                <div className="animate-pulse bg-white/10 rounded-[2.5rem] w-full h-full hidden md:block"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                
                {/* Notice we added `index` here so we know if it's card 0, 1, or 2 */}
                {featuredDoctors.map((doc, index) => (
                  <div 
                    key={doc._id} 
                    className="h-[340px] bg-gray-200 rounded-[2.5rem] p-3 relative group cursor-pointer shadow-xl shadow-black/20 hover:-translate-y-2 transition-transform duration-300 overflow-hidden"
                  >
                    
                    {/* We pass the index into our hardcoded array so it always loads image 1, then 2, then 3! */}
                    <img 
                      src={DEMO_IMAGES[index]} 
                      alt={doc.user?.name || 'Expert Doctor'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                         // Fallback just in case you haven't added the images yet!
                         e.target.src = 'https://via.placeholder.com/300x400/E2E8F0/1A252A?text=Doctor';
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl">
                      <h3 className="text-brand-dark font-bold text-lg leading-tight mb-1 truncate">
                        {doc.user?.name || 'Doctor Profile'}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium truncate">
                        {doc.specialty} Specialist
                      </p>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span className="truncate">{doc.clinicAddress || 'Virtual Clinic / Telehealth'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </section>

      {/* SECTION 4: How it Works */}
      <section className="py-24 px-6 md:px-12 bg-white text-brand-dark rounded-[3rem] mx-4 md:mx-12 border border-gray-100 shadow-sm mt-12 mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-20">Healthcare, simplified.</h2>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="hidden md:block absolute top-8 left-[16.5%] w-[67%] h-[2px] bg-gray-100 z-0"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-white ring-8 ring-white border-2 border-gray-100 flex items-center justify-center text-xl mb-8 font-bold text-brand-dark shadow-sm">1</div>
              <h3 className="text-2xl font-bold mb-4">Find your doctor</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">Search by specialty, condition, or name to find the perfect match.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-yellow text-brand-dark ring-8 ring-white flex items-center justify-center text-xl mb-8 font-bold shadow-sm">2</div>
              <h3 className="text-2xl font-bold mb-4">Book a time</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">See real-time availability and book an appointment instantly.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-white ring-8 ring-white border-2 border-gray-100 flex items-center justify-center text-xl mb-8 font-bold text-brand-dark shadow-sm">3</div>
              <h3 className="text-2xl font-bold mb-4">Feel better</h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">Attend your consultation and manage your health records securely.</p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;