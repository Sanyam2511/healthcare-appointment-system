import React, { useState, useContext } from 'react';
import { X, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import Button from './Button';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MOCK_TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:00 PM'];

const BookingModal = ({ isOpen, onClose, doctor }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pull the logged-in user from global state
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("1. Button was clicked!");
    console.log("2. Is User Logged In?", user);
    console.log("3. Sending Data:", { doctorId: doctor._id, selectedDate, selectedTime, reason });
    
    // Check if user is logged in first!
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // We must attach the token to the request headers for security
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // The data we are sending to the backend
      const appointmentData = {
        doctorId: doctor._id, // Using the real MongoDB ID
        date: selectedDate,
        timeSlot: selectedTime,
        reasonForVisit: reason
      };

      await axios.post('/api/appointments', appointmentData, config);
      
      alert(`Success! Appointment requested with ${doctor.user?.name}!`);
      
      // Reset form and close modal
      setSelectedDate('');
      setSelectedTime('');
      setReason('');
      onClose();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-brand-dark transition-colors">
          <X size={18} />
        </button>

        <h2 className="text-2xl font-bold text-brand-dark mb-1">Book Appointment</h2>
        <p className="text-sm text-gray-500 mb-6 font-medium">with {doctor?.user?.name} • {doctor?.specialty}</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4 flex items-center gap-2 text-sm font-medium">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <CalendarIcon size={16} className="text-brand-blue" /> Select Date
            </label>
            <input 
              type="date" 
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clock size={16} className="text-brand-yellow" /> Available Times
            </label>
            <div className="flex flex-wrap gap-3">
              {MOCK_TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTime === time ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for visit</label>
             <textarea 
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none resize-none h-24"
             ></textarea>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full py-4 text-lg rounded-2xl"
              disabled={loading}
            >
              {loading ? 'Confirming...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;