import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Activity, Loader2, X, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import ReviewModal from '../components/ReviewModal';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [appointmentToReview, setAppointmentToReview] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const response = await axios.get('/api/appointments/my-appointments', config);
        setAppointments(response.data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;
    setCancelLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/appointments/${appointmentToCancel}`, config);
      
      setAppointments(appointments.filter(apt => apt._id !== appointmentToCancel));
      
      setCancelModalOpen(false);
      setAppointmentToCancel(null);
    } catch (error) {
      console.error('Failed to cancel:', error);
      alert('Failed to cancel appointment. Please try again.');
    } finally {
      setCancelLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const promptCancel = (id) => {
    setAppointmentToCancel(id);
    setCancelModalOpen(true);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FA] pb-20 relative">
      
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/30 backdrop-blur-sm" onClick={() => setCancelModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 relative z-10 shadow-2xl text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 mb-8 text-sm">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button onClick={() => setCancelModalOpen(false)} variant="outline" className="flex-1 py-3">No, keep it</Button>
              <Button 
                onClick={handleCancelAppointment} 
                className="flex-1 py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-medium transition-colors"
                disabled={cancelLoading}
              >
                {cancelLoading ? 'Canceling...' : 'Yes, cancel'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-brand-dark text-white pt-16 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-brand-blue/80 text-lg">Manage your upcoming consultations and health records.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 min-h-[400px]">
          
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-brand-blue/20 rounded-2xl flex items-center justify-center text-brand-blue">
              <Calendar size={24} />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark">Upcoming Appointments</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-brand-blue" size={48} />
            </div>
          ) : appointments.filter(apt => apt.status !== 'completed').length === 0 && appointments.filter(apt => apt.status === 'completed').length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Activity size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">No appointments yet</h3>
              <p className="text-gray-500 mb-6">You don't have any upcoming consultations scheduled.</p>
              <button onClick={() => navigate('/doctors')} className="text-brand-blue font-semibold hover:underline">
                Browse Doctors
              </button>
            </div>
          ) : (
            <>
              {appointments.filter(apt => apt.status !== 'completed').length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {appointments.filter(apt => apt.status !== 'completed').map((apt) => (
                    <div key={apt._id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all relative group">
                      <button 
                        onClick={() => promptCancel(apt._id)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors tooltip-trigger"
                        title="Cancel Appointment"
                      >
                        <X size={20} />
                      </button>

                      <div className="flex justify-between items-start mb-4 pr-8">
                        <div>
                          <h3 className="font-bold text-lg text-brand-dark">
                            {apt.doctor?.user?.name || 'Doctor Unassigned'}
                          </h3>
                          <p className="text-brand-blue text-sm font-semibold">{apt.doctor?.specialty}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mt-6">
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                          <Calendar size={16} className="text-gray-400" /> {formatDate(apt.date)}
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                          <Clock size={16} className="text-gray-400" /> {apt.timeSlot}
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 line-clamp-2 bg-gray-50 p-3 rounded-xl">
                        <span className="font-semibold text-gray-700">Reason:</span> {apt.reasonForVisit}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {appointments.filter(apt => apt.status === 'completed').length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-6 mt-8 pt-8 border-t border-gray-100">Completed Appointments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appointments.filter(apt => apt.status === 'completed').map((apt) => (
                      <div key={apt._id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 relative group">
                        <div className="absolute top-4 right-4 text-green-500">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>

                        <div className="flex justify-between items-start mb-4 pr-8">
                          <div>
                            <h3 className="font-bold text-lg text-brand-dark">
                              {apt.doctor?.user?.name || 'Doctor Unassigned'}
                            </h3>
                            <p className="text-green-700 text-sm font-semibold">{apt.doctor?.specialty}</p>
                          </div>
                        </div>

                        <div className="space-y-3 mt-6">
                          <div className="flex items-center gap-3 text-gray-600 text-sm">
                            <Calendar size={16} className="text-green-600" /> {formatDate(apt.date)}
                          </div>
                          <div className="flex items-center gap-3 text-gray-600 text-sm">
                            <Clock size={16} className="text-green-600" /> {apt.timeSlot}
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-green-200 text-sm text-gray-600 line-clamp-2 bg-white p-3 rounded-xl">
                          <span className="font-semibold text-gray-700">Reason:</span> {apt.reasonForVisit}
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full mt-4 justify-center py-2 border-green-300 text-green-700 hover:bg-green-100"
                          onClick={() => {
                            setAppointmentToReview(apt);
                            setReviewModalOpen(true);
                          }}
                        >
                          Rate your experience
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
      <ReviewModal 
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        appointment={appointmentToReview}
      />
    </div>
  );
};

export default Dashboard;