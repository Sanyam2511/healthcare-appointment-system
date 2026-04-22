import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', userData);
      
      const { token, user } = response.data;
      const sessionData = { token, ...user };

      setUser(sessionData);
      localStorage.setItem('user', JSON.stringify(sessionData));
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', userData);
      
      const { token, user } = response.data;
      const sessionData = { token, ...user };

      setUser(sessionData);
      localStorage.setItem('user', JSON.stringify(sessionData));
      
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, registerUser, loginUser, logout }}> {/* <-- Added loginUser here */}
      {children}
    </AuthContext.Provider>
  );
};