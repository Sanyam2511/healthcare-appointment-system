import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Sparkles, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FAF9F5] pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-6 mb-16 relative z-10 pt-2">
        <div className="lg:col-span-2">
          <h4 className="text-xl font-bold text-[#1A252A] mb-6">Contact</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6366F1] shrink-0">
                <Phone size={18} />
              </div>
              <span className="text-sm text-gray-600 font-medium pt-2">602-774-4735</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6366F1] shrink-0">
                <MapPin size={18} />
              </div>
              <span className="text-sm text-gray-600 font-medium pt-2 leading-relaxed">
                11022 South 51st Street Suite 105<br/>Phoenix, AZ 85044
              </span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6366F1] shrink-0">
                <Mail size={18} />
              </div>
              <span className="text-sm text-gray-600 font-medium pt-2">hello@medease.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-[#1A252A] mb-6">Navigate</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link to="/services" className="hover:text-[#6366F1] transition-colors">Services</Link></li>
            <li><Link to="/stories" className="hover:text-[#6366F1] transition-colors">Success Stories</Link></li>
            <li><Link to="/discover" className="hover:text-[#6366F1] transition-colors">Discover</Link></li>
            <li><Link to="/care" className="hover:text-[#6366F1] transition-colors">Care</Link></li>
            <li><Link to="/app" className="hover:text-[#6366F1] transition-colors">Download App</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-[#1A252A] mb-6">Solution</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link to="/contact" className="hover:text-[#6366F1] transition-colors">Get in Touch</Link></li>
            <li><Link to="/technology" className="hover:text-[#6366F1] transition-colors">Technology</Link></li>
            <li><Link to="/about" className="hover:text-[#6366F1] transition-colors">Who're We?</Link></li>
            <li><Link to="/expertise" className="hover:text-[#6366F1] transition-colors">Expertise</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-[#1A252A] mb-6">Discover</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><Link to="/news" className="hover:text-[#6366F1] transition-colors">Latest News</Link></li>
            <li><Link to="/arrivals" className="hover:text-[#6366F1] transition-colors">New Arrivals</Link></li>
            <li><Link to="/solution" className="hover:text-[#6366F1] transition-colors">Solution</Link></li>
            <li><Link to="/profession" className="hover:text-[#6366F1] transition-colors">Gain Profession</Link></li>
            <li><Link to="/career" className="hover:text-[#6366F1] transition-colors">Career</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-[#1A252A] mb-6">Follow Us</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li><a href="#" className="hover:text-[#6366F1] transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-[#6366F1] transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-[#6366F1] transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-[#6366F1] transition-colors">Twitter</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-500 font-medium relative z-10">
        <p>©Copyright MedEase.com All rights reserved. 2026</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-[#1A252A] transition-colors">Privacy & Policy</Link>
          <Link to="/terms" className="hover:text-[#1A252A] transition-colors">Terms & Condition</Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-60"></div>
    </footer>
  );
};

export default Footer;