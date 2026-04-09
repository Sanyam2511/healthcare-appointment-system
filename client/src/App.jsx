import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-brand-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* We will add more routes here like /login and /doctors later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;