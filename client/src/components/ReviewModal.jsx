import React, { useState, useContext } from 'react';
import { X, Star, AlertCircle, CheckCircle } from 'lucide-react';
import Button from './Button';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ReviewModal = ({ isOpen, onClose, appointment }) => {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { user } = useContext(AuthContext);

  if (!isOpen || !appointment) return null;

  const doctorName = appointment.doctor?.user?.name || 'Doctor';
  const doctorId = appointment.doctor?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      await axios.post(`/api/doctors/${doctorId}/reviews`, { rating, comment }, config);
      setIsSuccess(true);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoverValue(0);
    setComment('');
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-sm" onClick={handleClose}></div>

      <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={handleClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-brand-dark transition-colors">
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-in zoom-in duration-500">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Thank You!</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Your review for {doctorName} has been submitted successfully and added to their profile.
            </p>
            <Button onClick={handleClose} variant="primary" className="w-full py-4 text-lg rounded-2xl">
              Done
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-brand-dark mb-1">Rate Your Visit</h2>
            <p className="text-sm text-gray-500 mb-6 font-medium">with {doctorName}</p>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 flex items-center gap-2 text-sm font-medium">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">How was your experience?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-transform hover:scale-110 focus:outline-none"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverValue(star)}
                      onMouseLeave={() => setHoverValue(0)}
                    >
                      <Star 
                        size={36} 
                        className={`transition-colors duration-200 ${
                          (hoverValue || rating) >= star 
                            ? 'fill-brand-yellow text-brand-yellow' 
                            : 'text-gray-200'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Leave a review (optional)</label>
                 <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you like about this doctor?"
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
                  {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;