import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Activity, LogOut, User as UserIcon, ArrowUpRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Specialties', path: '/specialties' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
      <Link to="/" className="text-xl font-bold tracking-tight text-brand-dark flex items-center gap-2 group w-1/4">
        <div className="bg-brand-dark p-1.5 rounded-full text-white group-hover:scale-110 transition-transform duration-300">
          <Activity size={18} strokeWidth={3} />
        </div>
        MedEase
      </Link>

      <div className="hidden md:flex items-center bg-[#F4F5F7] p-1.5 rounded-full border border-gray-100">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            to={link.path} 
            className={`
              px-5 py-2 rounded-full text-m font-semibold transition-all duration-300
              ${isActive(link.path) 
                ? 'bg-white text-brand-dark shadow-sm' 
                : 'text-gray-500 hover:text-brand-dark hover:bg-gray-200/50'
              }
            `}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center justify-end gap-6 w-1/4">
        {user ? (
          <>
            <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <UserIcon size={16} className="text-gray-400" />
              <span className="text-m font-semibold text-gray-600">{user.name.split(' ')[0]}</span>
            </div>

            <Link 
              to={user.role === 'doctor' ? "/doctor-dashboard" : "/dashboard"}
              className="flex items-center gap-3 bg-brand-dark text-white pl-6 pr-1.5 py-1.5 rounded-full hover:bg-gray-800 transition-colors group"
            >
              <span className="text-sm font-semibold">Dashboard</span>
              <div className="bg-white text-brand-dark w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </Link>

            <button 
              onClick={logout} 
              className="w-11 h-11 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors border border-gray-100"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-brand-dark transition-colors">
              Log in
            </Link>
            
            <Link 
              to="/register"
              className="flex items-center gap-3 bg-brand-dark text-white pl-6 pr-1.5 py-1.5 rounded-full hover:bg-gray-800 transition-colors group"
            >
              <span className="text-sm font-semibold">Sign up</span>
              <div className="bg-white text-brand-dark w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </>
        )}
      </div>

      <button className="md:hidden text-brand-dark p-2 bg-gray-50 rounded-full">
        <Menu size={20} />
      </button>
    </nav>
  );
};

export default Navbar;