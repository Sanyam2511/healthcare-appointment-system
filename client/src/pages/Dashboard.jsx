import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Activity, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If not logged in, kick them to the login page
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
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

  // Helper function to format the date nicely
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-brand-dark text-white pt-16 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-brand-blue/80 text-lg">Manage your upcoming consultations and health records.</p>
        </div>
      </div>

      {/* Main Content Area (Pulled up to overlap the header) */}
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
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Activity size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-dark mb-2">No appointments yet</h3>
              <p className="text-gray-500 mb-6">You don't have any upcoming consultations scheduled.</p>
              <button onClick={() => navigate('/doctors')} className="text-brand-blue font-semibold hover:underline">
                Browse Doctors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((apt) => (
                <div key={apt._id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-brand-blue transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-brand-dark">
                        {apt.doctor?.user?.name || 'Doctor Unassigned'}
                      </h3>
                      <p className="text-brand-blue text-sm font-semibold">{apt.doctor?.specialty}</p>
                    </div>
                    {/* Status Badge */}
                    <span className="px-3 py-1 bg-brand-yellow/30 text-brand-dark text-xs font-bold rounded-full uppercase tracking-wide">
                      {apt.status}
                    </span>
                  </div>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <Calendar size={16} className="text-gray-400" /> {formatDate(apt.date)}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <Clock size={16} className="text-gray-400" /> {apt.timeSlot}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200/60 text-sm text-gray-500 line-clamp-1">
                    <span className="font-semibold text-gray-700">Reason:</span> {apt.reasonForVisit}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;