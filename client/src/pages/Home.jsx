import React from 'react';
import { ArrowRight, Users, ShieldCheck, Calendar } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FA] px-6 md:px-12 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden">
      
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

        {/* The Yellow Stat Card (Inspired by the 1151 Quiz card) */}
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

      {/* Right Column: Floating Speciality Tags (Inspired by the Blue/White pills) */}
      <div className="w-full md:w-1/2 relative min-h-[400px] bg-brand-blue rounded-[3rem] p-8 flex items-center justify-center">
        
        {/* Decorative elements simulating floating cards */}
        <div className="absolute top-12 left-8 bg-white px-6 py-3 rounded-full shadow-md transform -rotate-6 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark">
          Cardiology ❤️
        </div>
        
        <div className="absolute top-1/3 right-8 bg-white px-6 py-3 rounded-full shadow-md transform rotate-3 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark">
          Dermatology ✨
        </div>

        <div className="absolute bottom-24 left-16 bg-white px-6 py-3 rounded-full shadow-md transform rotate-6 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark">
          Pediatrics 🧸
        </div>

        <div className="absolute bottom-12 right-12 bg-white px-6 py-3 rounded-full shadow-md transform -rotate-3 hover:rotate-0 transition-all cursor-pointer font-medium text-brand-dark flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div> General Practice
        </div>
        
        {/* Center Main Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center z-10">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-brand-dark">
            <span className="text-2xl">👩‍⚕️</span>
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-2">Connect with Experts</h3>
          <p className="text-gray-500 text-sm mb-6">Skip the waiting room. Book an online or in-person consultation instantly.</p>
          <Button variant="outline" className="w-full justify-center">
            View Directory
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Home;