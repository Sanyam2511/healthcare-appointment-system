import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Loader2, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [needsProfile, setNeedsProfile] = useState(false);
  const [profileData, setProfileData] = useState({ specialty: 'General Practice', experience: '', consultationFee: '', clinicAddress: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const response = await axios.get('/api/appointments/doctor-appointments', config);
        setAppointments(response.data.data);
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to load appointments';
        
        if (errorMsg.includes('Doctor profile not found')) {
          setNeedsProfile(true);
        } else {
          setError(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/doctors/profile', profileData, config);
      
      setNeedsProfile(false);
      window.location.reload(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FA] pb-20">
      <div className="bg-brand-blue text-brand-dark pt-16 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-sm">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Dr. {user?.name?.split(' ')[1] || user?.name}</h1>
            <p className="text-brand-dark/70 text-lg font-medium">Provider Dashboard & Schedule</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 min-h-[400px]">
          
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-brand-dark">Upcoming Patients</h2>
            <div className="bg-gray-50 px-4 py-2 rounded-full text-sm font-bold text-gray-500">
              {appointments.length} Total
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-brand-blue" size={48} />
            </div>
          ) : needsProfile ? (
            /* --- THE NEW ONBOARDING FORM --- */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Complete Your Profile</h3>
                <p className="text-gray-500">Patients need to know a bit more about you before they can book an appointment.</p>
              </div>
              
              <form onSubmit={handleCreateProfile} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none"
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                  >
                    <option value="General Practice">General Practice</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    placeholder="e.g. 5"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none"
                    onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Fee ($)</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    placeholder="e.g. 100"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none"
                    onChange={(e) => setProfileData({...profileData, consultationFee: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Clinic Address</label>
                  <input 
                    type="text" 
                    required
                    placeholder="123 Medical Plaza, Suite 400"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-brand-dark focus:ring-2 focus:ring-brand-blue outline-none"
                    onChange={(e) => setProfileData({...profileData, clinicAddress: e.target.value})}
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full py-4 text-lg rounded-2xl mt-4" disabled={savingProfile}>
                  {savingProfile ? 'Saving...' : 'Save Profile & Continue'}
                </Button>
              </form>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500 bg-red-50 rounded-2xl font-medium">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-2xl font-medium">
              You have no upcoming appointments.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {appointments.map((apt) => (
                <div key={apt._id} className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-blue hover:shadow-md transition-all">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-brand-dark mb-1">
                      {apt.patient?.name || 'Unknown Patient'}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{apt.patient?.email}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
                      <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"><Calendar size={16} className="text-brand-blue" /> {formatDate(apt.date)}</span>
                      <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"><Clock size={16} className="text-brand-yellow" /> {apt.timeSlot}</span>
                    </div>
                  </div>

                  {/* Reason & Action */}
                  <div className="flex-1 md:border-l md:border-gray-100 md:pl-6">
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                      <span className="font-semibold text-gray-700">Reason:</span> {apt.reasonForVisit}
                    </p>
                    <Button variant="outline" className="w-full text-sm py-2">
                      <CheckCircle2 size={16} className="mr-2" /> Mark Completed
                    </Button>
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

export default DoctorDashboard;