import React from 'react';
import { ArrowUpRight, Shield, Activity, CheckCircle2, Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white pb-24 font-sans text-brand-dark">
      
      <section className="px-6 md:px-12 pt-12 pb-20 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 z-10">
          <h1 className="text-6xl md:text-[5.5rem] font-medium tracking-tight text-brand-dark leading-[1.05] mb-8">
            Putting your <br />
            <span className="font-serif italic font-light text-brand-blue">health</span> back <br />
            in your hands.
          </h1>
          <p className="text-lg text-gray-500 max-w-md leading-relaxed mb-10">
            We built MedEase because we believe accessing quality healthcare should be as seamless as ordering your morning coffee. No waiting rooms, no endless phone calls. Just you and your health, simplified.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-3 bg-[#1A252A] text-white px-8 py-4 rounded-full hover:bg-brand-blue transition-colors duration-300 font-medium group"
          >
            Join MedEase
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-6 mt-20 opacity-40 grayscale pointer-events-none">
            <span className="text-xl font-bold font-serif">Aetna</span>
            <span className="text-xl font-bold tracking-tighter">Cigna</span>
            <span className="text-xl font-bold flex items-center gap-1"><Plus size={20}/> UnitedHealth</span>
            <span className="text-xl font-bold tracking-widest">Kaiser</span>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative h-[600px] md:h-[700px] rounded-[2.5rem] bg-gray-100 overflow-hidden flex items-center justify-center">
          <img 
            src="/doctor1.png" 
            alt="Medical professional smiling" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="absolute top-1/4 -left-6 md:left-[-2rem] bg-white/70 backdrop-blur-md border border-white/50 p-5 rounded-2xl shadow-xl w-64 transform -rotate-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider ml-2">CareConnect Platform</span>
            </div>
            <h3 className="font-serif italic text-2xl text-brand-dark mb-1">Frictionless</h3>
            <h3 className="font-medium text-xl text-brand-dark mb-4">Scheduling</h3>
            <div className="flex justify-between text-xs text-gray-500 font-medium border-t border-gray-200/50 pt-3 mt-2">
              <span>Availability</span>
              <span className="text-brand-dark">24/7 Access</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pt-20 pb-32 max-w-[1400px] mx-auto">
        
        <div className="flex justify-between items-center border-t border-gray-200 pt-6 mb-16 text-sm font-medium text-brand-dark">
          <span>About Us</span>
          <span>(01)</span>
        </div>

        <div className="relative max-w-5xl mx-auto text-center py-12 md:py-24">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1A252A] leading-[1.2] tracking-tight relative z-10">
            Healthcare for the modern age — <br className="hidden md:block"/>
            built by technologists and medical professionals dedicated to bridging the gap between <span className="font-serif italic font-light text-brand-blue">patients and care.</span>
          </h2>

          <div className="hidden md:flex absolute top-0 left-[-5%] w-48 h-48 bg-gray-200 rounded-3xl shadow-lg -rotate-6 items-center justify-center overflow-hidden z-0">
             <img 
               src="/doctor2.png" 
               alt="Healthcare team" 
               className="w-full h-full object-cover"
             />
          </div>

          <div className="hidden md:flex absolute -bottom-24 right-0 w-64 h-48 bg-gray-200 rounded-3xl shadow-lg rotate-3 items-center justify-center overflow-hidden z-20">
             <div className="absolute top-6 -left-6 w-24 h-24 border-[1px] border-dashed border-white/50 rounded-full flex items-center justify-center bg-brand-blue/90 backdrop-blur-sm z-30">
               <div className="text-[10px] uppercase tracking-widest text-white font-bold rotate-[-30deg]">Verified</div>
             </div>
             <img 
               src="/doctor3.png" 
               alt="Patient consultation" 
               className="w-full h-full object-cover"
             />
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mt-12 gap-8 relative z-10">
          
          <div className="flex gap-12 md:gap-20">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-2">Trusted by Thousands</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light text-brand-dark">98</span>
                <span className="text-2xl text-brand-blue">%</span>
              </div>
              <p className="text-m text-gray-500 mt-1">Satisfaction</p>
            </div>
            
            <div>
               <p className="text-m text-gray-500 font-medium mb-2 uppercase text-transparent select-none">.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light text-brand-dark">5,000</span>
                <span className="text-2xl text-brand-blue">+</span>
              </div>
              <p className="text-m text-gray-500 mt-1">Appointments Booked</p>
            </div>

            <div>
              <p className="text-m text-gray-500 font-medium mb-2 uppercase text-transparent select-none">.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-light text-brand-dark">4.9</span>
                <Star className="text-brand-yellow fill-brand-yellow mb-1" size={20} />
              </div>
              <p className="text-m text-gray-500 mt-1">Platform Rating</p>
            </div>
          </div>

          <Link to="/doctors" className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white transition-colors duration-300">
            <ArrowUpRight size={24} />
          </Link>
          
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-[1400px] mx-auto">
        
        <div className="flex justify-between items-center border-t border-gray-200 pt-6 mb-16 text-m font-medium text-brand-dark">
          <span>Our Values</span>
          <span>(02)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
              <Shield size={20} />
            </div>
            <h3 className="text-2xl font-medium text-brand-dark mb-4">Uncompromising Trust</h3>
            <p className="text-gray-500 leading-relaxed font-light">
              Your medical data is yours. We use enterprise-grade encryption to ensure your personal health information remains strictly confidential and secure at all times.
            </p>
          </div>

          <div className="group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
              <Activity size={20} />
            </div>
            <h3 className="text-2xl font-medium text-brand-dark mb-4">Frictionless Access</h3>
            <p className="text-gray-500 leading-relaxed font-light">
              Whether you need a specialist at 2 AM or a routine checkup next week, our platform connects you instantly with the right professionals without the red tape.
            </p>
          </div>

          <div className="group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-2xl font-medium text-brand-dark mb-4">Vetted Professionals</h3>
            <p className="text-gray-500 leading-relaxed font-light">
              Every doctor on our platform goes through a rigorous background check and credential verification process. You only see the best healthcare providers available.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;