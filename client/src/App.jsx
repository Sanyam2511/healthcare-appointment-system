import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Dashboard from './pages/Dashboard';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Specialties from './pages/Specialties';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-brand-dark">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/specialties" element={<Specialties />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;