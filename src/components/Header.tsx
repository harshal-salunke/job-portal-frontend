import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-blue-600 group-hover:bg-blue-700 rounded-lg transition-colors">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TalentConnect</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/candidates"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
            >
              Find Talent
            </Link>
            <Link
              to="/recruiter/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
            >
              Dashboard
            </Link>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <Link
              to="/login"
              className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:shadow-blue-200 transition-all font-medium"
            >
              Get Started
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <Link
              to="/candidates"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Talent
            </Link>
            <Link
              to="/recruiter/dashboard"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="block mx-4 mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-center transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
