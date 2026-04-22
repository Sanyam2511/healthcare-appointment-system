import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2, ArrowUpRight } from 'lucide-react';

const BENTO_SPECIALTIES = [
  {
    name: 'General Practice',
    desc: 'Comprehensive primary care and holistic health management for all ages.',
    colSpan: 'lg:col-span-1 md:col-span-2 col-span-1',
    theme: 'from-emerald-50/80 to-[#E8F5EE] border-emerald-100 hover:border-emerald-300',
    iconColor: 'text-emerald-600 bg-emerald-100/60'
  },
  {
    name: 'Dermatology',
    desc: 'Advanced skincare and clinical dermatology services for healthy skin.',
    colSpan: 'lg:col-span-1 md:col-span-2 col-span-1',
    theme: 'from-orange-50/80 to-[#FFF0E6] border-orange-100 hover:border-orange-300',
    iconColor: 'text-orange-500 bg-orange-100/60'
  },
  {
    name: 'Cardiology',
    desc: 'Expert preventive cardiology and advanced cardiovascular intervention strategies tailored to your circulatory health.',
    colSpan: 'lg:col-span-2 md:col-span-4 col-span-1',
    theme: 'from-rose-50/80 to-[#FCEEED] border-rose-100 hover:border-rose-300',
    iconColor: 'text-rose-600 bg-rose-100/60',
    decoration: 'ring' 
  },
  {
    name: 'Pediatrics',
    desc: 'Compassionate pediatric care, growth tracking, and specialized child development support for your little ones.',
    colSpan: 'lg:col-span-2 md:col-span-4 col-span-1',
    theme: 'from-blue-50/80 to-[#E8F2F6] border-blue-100 hover:border-blue-300',
    iconColor: 'text-brand-blue bg-blue-100/60',
    decoration: 'waves'
  },
  {
    name: 'Neurology',
    desc: 'Specialized diagnosis and treatment for neurological disorders and brain health.',
    colSpan: 'lg:col-span-1 md:col-span-2 col-span-1',
    theme: 'from-purple-50/80 to-[#F2EBF5] border-purple-100 hover:border-purple-300',
    iconColor: 'text-purple-600 bg-purple-100/60'
  },
  {
    name: 'Orthopedics',
    desc: 'Expert care for musculoskeletal conditions, joint pain, and sports injuries.',
    colSpan: 'lg:col-span-1 md:col-span-2 col-span-1',
    theme: 'from-indigo-50/80 to-[#EAEBF5] border-indigo-100 hover:border-indigo-300',
    iconColor: 'text-indigo-600 bg-indigo-100/60'
  }
];

const Specialties = () => {
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

  const getDoctorCount = (specialtyName) => {
    return doctors.filter(doc => doc.specialty === specialtyName).length;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-gray-400 mb-4 tracking-widest uppercase">(Specialties)</p>
          <h1 className="text-4xl md:text-6xl font-serif italic text-brand-dark mb-4 font-light">
            Find Your Specialist
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Precision care tailored to your unique needs. Browse our network of top-rated experts.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-brand-blue" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
            
            {BENTO_SPECIALTIES.map((spec) => {
              const count = getDoctorCount(spec.name);
              
              return (
                <Link 
                  to={`/doctors?specialty=${spec.name}`}
                  key={spec.name} 
                  className={`
                    ${spec.colSpan} 
                    bg-gradient-to-br ${spec.theme}
                    border-2 rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-between
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group min-h-[320px]
                  `}
                >
                  {spec.decoration === 'ring' && (
                    <div className="absolute -right-12 -top-12 w-48 h-48 border-[30px] border-rose-500/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                  )}
                  {spec.decoration === 'waves' && (
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                  )}

                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">
                      {spec.name}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-medium line-clamp-3">
                      {spec.desc}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white text-gray-600 text-xs font-bold uppercase tracking-wider shadow-sm">
                      <span className={`w-2 h-2 rounded-full animate-pulse ${spec.iconColor.split(' ')[0].replace('text-', 'bg-')}`}></span>
                      {count} {count === 1 ? 'Doctor' : 'Doctors'}
                    </div>
                  </div>
                </Link>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default Specialties;