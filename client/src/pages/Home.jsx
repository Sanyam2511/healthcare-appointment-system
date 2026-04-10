import React from 'react';
import { ArrowRight, Users, ShieldCheck, Calendar, Heart, Baby, Brain, Stethoscope, Star } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const SPECIALTIES = [
  { name: 'Cardiology', icon: <Heart size={28} />, color: 'bg-red-50 text-red-500', doctors: '124 Specialists', desc: 'Heart and cardiovascular health.' },
  { name: 'Pediatrics', icon: <Baby size={28} />, color: 'bg-blue-50 text-brand-blue', doctors: '86 Specialists', desc: 'Care for infants and children.' },
  { name: 'Neurology', icon: <Brain size={28} />, color: 'bg-purple-50 text-purple-500', doctors: '64 Specialists', desc: 'Brain and nervous system.' },
  { name: 'General', icon: <Stethoscope size={28} />, color: 'bg-green-50 text-green-500', doctors: '210 Specialists', desc: 'Primary care and checkups.' },
];

const FEATURED_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', rating: '4.9', reviews: 124, imageColor: 'bg-brand-blue' },
  { id: 2, name: 'Dr. Marcus Chen', specialty: 'Dermatology', rating: '4.8', reviews: 98, imageColor: 'bg-brand-yellow' },
  { id: 3, name: 'Dr. Emily Carter', specialty: 'General Practice', rating: '5.0', reviews: 210, imageColor: 'bg-green-100' },
];

const Home = () => {
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
          
          {/* Center Main Card */}
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Browse by specialty</h2>
              <p className="text-lg text-gray-500 max-w-md">Find experienced doctors across all major medical specialties.</p>
            </div>
            <Link to="/doctors" className="text-brand-dark font-semibold hover:text-brand-blue transition-colors mt-4 md:mt-0 flex items-center gap-2 group">
              View all specialties <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTIES.map((spec) => (
              <div key={spec.name} className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group text-left relative overflow-hidden">
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${spec.color} opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${spec.color} relative z-10`}>
                  {spec.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2 relative z-10">{spec.name}</h3>
                <p className="text-gray-500 text-sm mb-8 relative z-10">{spec.desc}</p>
                
                <div className="flex items-center justify-between text-sm font-semibold relative z-10">
                  <span className="text-gray-400">{spec.doctors}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Featured Doctors */}
      <section className="py-24 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">Top-rated specialists</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_DOCTORS.map((doc) => (
              <div key={doc.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full ${doc.imageColor}`}></div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-1 text-brand-dark font-bold">
                    <Star size={16} className="fill-brand-yellow text-brand-yellow" />
                    {doc.rating} <span className="text-gray-400 font-normal text-sm">({doc.reviews} reviews)</span>
                  </div>
                </div>
                
                <Link to="/doctors">
                  <Button variant="ghost" className="w-full justify-between hover:bg-gray-50 group">
                    View Profile
                    <ArrowRight size={18} className="text-gray-400 group-hover:text-brand-dark transition-colors" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: How it Works */}
      <section className="py-24 px-6 md:px-12 bg-brand-dark text-white rounded-[3rem] mx-4 md:mx-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-20">Healthcare, simplified.</h2>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* The Connecting Line */}
            <div className="hidden md:block absolute top-8 left-[16.5%] w-[67%] h-[2px] bg-white/10 z-0"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 ring-8 ring-brand-dark flex items-center justify-center text-xl mb-8 font-bold">1</div>
              <h3 className="text-2xl font-bold mb-4">Find your doctor</h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-xs">Search by specialty, condition, or name to find the perfect match.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-yellow text-brand-dark ring-8 ring-brand-dark flex items-center justify-center text-xl mb-8 font-bold">2</div>
              <h3 className="text-2xl font-bold mb-4">Book a time</h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-xs">See real-time availability and book an appointment instantly.</p>
            </div>

            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 ring-8 ring-brand-dark flex items-center justify-center text-xl mb-8 font-bold">3</div>
              <h3 className="text-2xl font-bold mb-4">Feel better</h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-xs">Attend your consultation and manage your health records securely.</p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;