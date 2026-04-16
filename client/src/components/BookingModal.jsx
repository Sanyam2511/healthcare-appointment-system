import React, { useState, useContext } from 'react';
import { X, Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import Button from './Button';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';

const MOCK_TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:00 PM'];

const BookingModal = ({ isOpen, onClose, doctor }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Pull the logged-in user from global state
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time.');
      return;
    }

    setShowPayment(true);
  };

  const handleCloseModal = () => {
    setSelectedDate('');
    setSelectedTime('');
    setReason('');
    setIsSuccess(false);
    setShowPayment(false);
    onClose();
  };

  const finalizeBooking = async () => {
    setShowPayment(false); // Hide payment screen
    setLoading(true);
    setError(null);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const appointmentData = {
        doctorId: doctor._id,
        date: selectedDate,
        timeSlot: selectedTime,
        reasonForVisit: reason
      };

      await axios.post('/api/appointments', appointmentData, config);
      setIsSuccess(true); // Show your existing green checkmark screen
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
        <button onClick={handleCloseModal} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-brand-dark transition-colors">
          <X size={18} />
        </button>

        {isSuccess ? (
          /* --- THE NEW SUCCESS SCREEN --- */
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-in zoom-in duration-500">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Your appointment with {doctor?.user?.name} has been successfully scheduled. You can manage it in your Dashboard.
            </p>
            <Button onClick={handleCloseModal} variant="primary" className="w-full py-4 text-lg rounded-2xl">
              Done
            </Button>
          </div>
        ) : (
        <>
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
        </>
        )}
      </div>
      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={finalizeBooking}
        amount={doctor?.consultationFee || 100}
        doctorName={doctor?.user?.name || 'Doctor'}
      />
    </div>
  );
};

export default BookingModal;