import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- Add this import

import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Specialties from './pages/Specialties';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      {/* Wrap everything inside the AuthProvider */}
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
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;