import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in (checking local storage for a token)
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  // Register Function
  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Notice we just use /api because of our Vite proxy!
      const response = await axios.post('/api/auth/register', userData);
      
      const { token, user } = response.data;
      const sessionData = { token, ...user };

      // Save to state and local storage
      setUser(sessionData);
      localStorage.setItem('user', JSON.stringify(sessionData));
      
      navigate('/'); // Redirect to home page after success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};