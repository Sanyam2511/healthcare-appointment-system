import React from 'react';
import { Shield, Heart, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-[#F8F9FA] pb-24">
      
      {/* SECTION 1: Hero */}
      <section className="px-6 md:px-12 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/20 text-brand-blue font-semibold text-sm mb-6">
          <Heart size={16} fill="currentColor" /> Our Mission
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-dark leading-[1.1] mb-8">
          Putting your <span className="text-brand-blue">health</span> back in your hands.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We built CareConnect because we believe accessing quality healthcare should be as seamless as ordering your morning coffee. No waiting rooms, no endless phone calls. Just you and your health, simplified.
        </p>
      </section>

      {/* SECTION 2: Image / Graphic Area (Using CSS shapes to match our theme) */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-7xl mx-auto relative h-[400px] md:h-[500px] rounded-[3rem] bg-brand-dark overflow-hidden flex items-center justify-center">
          {/* Abstract floating shapes */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-blue rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-brand-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="relative z-10 text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-4">Healthcare for the modern age.</h2>
            <p className="text-gray-300 max-w-lg mx-auto">Built by a team of technologists and medical professionals dedicated to bridging the gap between patients and care.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Values */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue flex items-center justify-center text-white mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Uncompromising Trust</h3>
            <p className="text-gray-500 leading-relaxed">
              Your medical data is yours. We use enterprise-grade encryption to ensure your personal health information remains strictly confidential and secure.
            </p>
          </div>

          <div className="bg-brand-yellow p-10 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-dark mb-6">
              <Activity size={32} />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Frictionless Access</h3>
            <p className="text-gray-800 leading-relaxed">
              Whether you need a specialist at 2 AM or a routine checkup next week, our platform connects you instantly with the right professionals.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Vetted Professionals</h3>
            <p className="text-gray-500 leading-relaxed">
              Every doctor on our platform goes through a rigorous background check and verification process. You only see the best.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-brand-blue p-12 md:p-16 rounded-[3rem] text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">Ready to prioritize your health?</h2>
          <p className="text-brand-dark/70 mb-10 max-w-xl mx-auto">
            Join thousands of patients who have simplified their medical journey with CareConnect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" className="px-8 py-4 rounded-full text-lg w-full sm:w-auto">
                Create an account
              </Button>
            </Link>
            <Link to="/doctors">
              <Button variant="outline" className="px-8 py-4 rounded-full text-lg bg-white w-full sm:w-auto border-transparent hover:border-brand-dark">
                Browse Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;