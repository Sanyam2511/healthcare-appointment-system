import { Link } from 'react-router-dom';
import { User, Menu, Activity} from 'lucide-react';
import Button from '../components/Button';

const Navbar = () => {
  return (
    <nav className="w-full bg-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold tracking-tight text-brand-dark flex items-center gap-2 group">
        {/* Replaced the black circle with a styled icon */}
        <div className="bg-brand-blue/20 p-1.5 rounded-xl text-brand-blue group-hover:scale-110 transition-transform duration-300">
          <Activity size={22} strokeWidth={2.5} />
        </div>
        CareConnect
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link to="/doctors" className="hover:text-brand-dark transition-colors">Find a Doctor</Link>
        <Link to="/specialties" className="hover:text-brand-dark transition-colors">Specialties</Link>
        <Link to="/about" className="hover:text-brand-dark transition-colors">About Us</Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium hover:text-brand-dark">Log in</Link>
        <Button variant="primary" className="text-sm py-2">
          Sign up
        </Button>
      </div>

      <button className="md:hidden text-brand-dark">
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;