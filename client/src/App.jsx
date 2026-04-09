import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Doctors from './pages/Doctors'; // <-- Add this import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-brand-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} /> {/* <-- Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;