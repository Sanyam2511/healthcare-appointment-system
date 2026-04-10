import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // Pull our global logic from Context
  const { loginUser, loading, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Welcome back</h1>
          <p className="text-gray-500">Enter your details to access your account.</p>
        </div>

        {/* Display Errors if they exist */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 flex items-center gap-2 text-sm font-medium">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input 
              type="email" 
              placeholder="Email address"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input 
              type="password" 
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 rounded-2xl text-lg mt-4 group" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-dark font-semibold hover:underline">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;