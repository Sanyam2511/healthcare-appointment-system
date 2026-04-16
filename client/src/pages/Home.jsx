import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Search, Shield, Star, CheckCircle2, Clock, Lock, UserCheck, Calendar } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

// --- EXPANDED MOCK DATA (NOW WITH IMAGES) ---
const SPECIALTIES = [
  { 
    name: 'Cardiology', 
    desc: 'Preventive cardiology and advanced intervention strategies tailored to your circulatory health.',
    tags: ['Heart health', 'Hypertension', 'ECG Analysis'],
    image: '/cardiology.png' 
  },
  { 
    name: 'Neurology', 
    desc: 'Expert care and advanced intervention strategies tailored to your nervous system.',
    tags: ['Migraines', 'Nerve Disorders', 'Stroke Care'],
    image: '/neuro.png' 
  },
  { 
    name: 'Pediatrics', 
    desc: 'Preventive pediatrics and advanced intervention strategies tailored to your child\'s health.',
    tags: ['Growth Tracking', 'Vaccinations', 'Child Development'],
    image: '/pedia.png' 
  },
  { 
    name: 'Orthopedics', 
    desc: 'Preventive care and advanced intervention strategies tailored to your musculoskeletal health.',
    tags: ['Fracture', 'Arthroscopy', 'Knee Pain'],
    image: '/ortho.png' 
  },
  { 
    name: 'Dermatology', 
    desc: 'Advanced skincare, acne treatment, and clinical dermatology services for healthy, glowing skin.',
    tags: ['Skin Care', 'Acne', 'Anti-aging'],
    image: '/derma.png' 
  },
  { 
    name: 'Psychiatry', 
    desc: 'Comprehensive mental health care, therapy, and psychiatric evaluations.',
    tags: ['Anxiety', 'Depression', 'Therapy'],
    image: '/psychiatry.png' 
  },
  { 
    name: 'General Practice', 
    desc: 'Comprehensive primary care, routine check-ups, and holistic health management.',
    tags: ['Check-ups', 'Vaccines', 'Primary Care'],
    image: '/general.png' 
  },
];

const DEMO_IMAGES = [
  '/dr1.png', 
  '/dr2.png', 
  '/dr3.png'
];

const Home = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-white pb-12 overflow-x-hidden">
      
      {/* INJECTED CSS FOR INFINITE MARQUEE */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(calc(-50% - 0.75rem)); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* --- SECTION 1: The Hero --- */}
      <section className="relative pt-20 pb-16 px-6 md:px-12 overflow-hidden bg-gradient-to-r from-white via-[#F0F8FA] to-[#E2F0F5]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center relative z-10">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start z-20 pt-8 lg:pt-0">
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#1A252A] leading-[1.1] tracking-tight mb-6">
              Simplify your <br />
              <span className="font-serif italic font-light text-[#2A5C66]">health</span> and <br />
              wellbeing.
            </h1>
            
            <p className="text-lg text-gray-600 max-w-md mb-10 leading-relaxed">
              Unlock your personalized healthcare plan. Connect with top-rated doctors who listen and prioritize your health journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <Link to="/doctors">
                <button className="flex items-center gap-3 bg-[#1A252A] hover:bg-[#2A5C66] text-white px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-lg shadow-brand-dark/20 group">
                  <Search size={20} className="text-brand-blue group-hover:text-white transition-colors" />
                  Find a Doctor
                </button>
              </Link>
              <button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-[#1A252A] px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-sm border border-gray-100 group">
                <ArrowUpRight size={20} className="text-gray-400 group-hover:text-[#1A252A] transition-colors" />
                How it Works
              </button>
            </div>

            <div className="flex items-start gap-8 border-t border-gray-200/60 pt-8 mt-4 w-full max-w-lg">
              <div className="flex-1">
                <h4 className="text-[#1A252A] font-bold text-lg mb-2">2,500+ Booked</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Join thousands of patients who found the right doctor instantly.</p>
              </div>
              <div className="w-px h-16 bg-gray-200/60 hidden sm:block"></div>
              <div className="flex-1">
                <h4 className="text-[#1A252A] font-bold text-lg mb-2">Verified Experts</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Comprehensive evaluation and rigorous background checks.</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] mt-16 lg:mt-0 flex justify-center items-end z-10">
            <img 
              src="/doctor4.png" 
              alt="Smiling Doctor" 
              className="relative z-10 h-[90%] lg:h-[95%] object-contain object-bottom drop-shadow-2xl"
              onError={(e) => {
                 e.target.src = 'https://via.placeholder.com/600x800/transparent/1A252A?text=Doctor+Image';
              }}
            />

            <div className="absolute top-1/3 -left-4 lg:-left-12 bg-white/90 backdrop-blur-xl p-4 md:p-5 rounded-2xl shadow-xl border border-white z-20 w-64 animate-in slide-in-from-left duration-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2A5C66] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  2.5k+
                </div>
              </div>
              <p className="text-xs text-[#1A252A] font-medium leading-relaxed">
                Join thousands who found the right doctor for their unique health needs.
              </p>
            </div>

            <div className="absolute top-1/4 right-0 lg:-right-8 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-white z-20 flex items-center gap-3 animate-in slide-in-from-right duration-700 delay-150">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#1A252A]">
                <Shield size={14} />
              </div>
              <p className="text-xs text-[#1A252A] font-medium leading-tight max-w-[120px]">
                Your full medical history available securely.
              </p>
            </div>

            <div className="absolute bottom-16 right-0 lg:-right-4 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white z-20 flex items-center gap-4 w-72 animate-in slide-in-from-bottom duration-700 delay-300">
              <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                <img src="/dr2.png" alt="Doctor" className="w-full h-full object-cover" 
                     onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A252A] mb-1">24/7 Virtual Care</h4>
                <p className="text-[11px] text-gray-500 leading-tight">Board certified doctors available anytime.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: Browse by Specialty (Infinite Carousel with Images) --- */}
      <section className="py-24 bg-[#F2F8FA] overflow-hidden border-y border-brand-blue/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#2A5C66] mb-4 tracking-wide">(Category)</p>
            <h2 className="text-4xl md:text-5xl font-serif italic text-brand-dark mb-2 font-light">
              Find Your Specialist
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-brand-dark tracking-tight">
              Precision Care for Every Need
            </h3>
          </div>
        </div>

        {/* Full Bleed Marquee Container */}
        <div className="relative flex overflow-x-hidden w-full">
          {/* Duplicated array for seamless loop */}
          <div className="flex gap-6 w-max animate-marquee px-3">
            {[...SPECIALTIES, ...SPECIALTIES].map((spec, index) => (
              <div 
                key={index} 
                className="w-[320px] md:w-[360px] shrink-0 bg-white border border-white shadow-sm rounded-[2.5rem] hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group relative flex flex-col min-h-[380px] overflow-hidden"
              >
                
                {/* --- IMAGE SECTION --- */}
                <div className="h-48 w-full relative overflow-hidden bg-[#EBF4F6]">
                  <img 
                    src={spec.image} 
                    alt={spec.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                       // Fallback placeholder if you haven't uploaded the image yet!
                       e.target.src = `https://via.placeholder.com/400x300/E2F0F5/2A5C66?text=${spec.name}`;
                    }}
                  />
                  {/* Floating Action Button over image */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center text-brand-dark group-hover:bg-[#1A252A] group-hover:text-white transition-all">
                    <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* --- BOTTOM TEXT SECTION --- */}
                <div className="p-6 md:p-8 flex flex-col flex-1 bg-gradient-to-b from-white to-[#FAFCFC]">
                  <h3 className="text-2xl font-bold text-[#1A252A] mb-2 tracking-tight">{spec.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{spec.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {spec.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 bg-white border border-gray-100 rounded-full text-[11px] font-semibold text-gray-600 shadow-sm whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link to={`/doctors?specialty=${spec.name}`} className="absolute inset-0 z-10"></Link>
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

          <div className="lg:w-2/3 w-full">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[340px]">
                <div className="animate-pulse bg-white/10 rounded-[2.5rem] w-full h-full"></div>
                <div className="animate-pulse bg-white/10 rounded-[2.5rem] w-full h-full hidden md:block"></div>
                <div className="animate-pulse bg-white/10 rounded-[2.5rem] w-full h-full hidden md:block"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                
                {featuredDoctors.map((doc, index) => (
                  <div 
                    key={doc._id} 
                    className="h-[340px] bg-gray-200 rounded-[2.5rem] p-3 relative group cursor-pointer shadow-xl shadow-black/20 hover:-translate-y-2 transition-transform duration-300 overflow-hidden"
                  >
                    
                    <img 
                      src={DEMO_IMAGES[index]} 
                      alt={doc.user?.name || 'Expert Doctor'}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </section>

      {/* --- SECTION 4: How it Works (New Bento Box Design) --- */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden border-t border-brand-blue/5 bg-white">
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Grid: 4 Feature Cards (NO Background image behind these) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            
            {/* Card 1 */}
            <div className="bg-[#FAF9F5] p-8 rounded-3xl flex flex-col items-center text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#E8F2EF] flex items-center justify-center text-[#2A5C66] mb-6">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A252A] mb-3">Find your doctor</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Search by specialty, condition, or name to find the perfect match.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF9F5] p-8 rounded-3xl flex flex-col items-center text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#E8F2EF] flex items-center justify-center text-[#2A5C66] mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A252A] mb-3">24/7 availability</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Healthcare support whenever you need it, day or night.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF9F5] p-8 rounded-3xl flex flex-col items-center text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#E8F2EF] flex items-center justify-center text-[#2A5C66] mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A252A] mb-3">Secure & private</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Your medical data and personal history are always protected.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FAF9F5] p-8 rounded-3xl flex flex-col items-center text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#E8F2EF] flex items-center justify-center text-[#2A5C66] mb-6">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A252A] mb-3">Easy & accessible</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Book a time and consult in just a few simple clicks.</p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;