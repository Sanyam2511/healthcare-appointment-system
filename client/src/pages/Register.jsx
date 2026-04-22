import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'; 
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });
  const { registerUser, loading, error } = useContext(AuthContext); 

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData); 
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-brand-blue flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Join CareConnect</h1>
          <p className="text-gray-500">Create an account to simplify your health.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 flex items-center gap-2 text-sm font-medium">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex p-1 bg-gray-50 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'patient'})}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${formData.role === 'patient' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
            >
              I am a Patient
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'doctor'})}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${formData.role === 'doctor' ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
            >
              I am a Doctor
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input type="email" placeholder="Email address" required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input type="password" placeholder="Create Password" minLength="6" required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 rounded-2xl text-lg mt-6 group" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-dark font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;