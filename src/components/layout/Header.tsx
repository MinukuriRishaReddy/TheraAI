import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Menu, X, LayoutDashboard } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">TheraAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
              <Link to="/medical-history" className="text-gray-700 hover:text-blue-600 transition-colors">
              Medical History
            </Link>
            <Link to="/symptom-checker" className="text-gray-700 hover:text-blue-600 transition-colors">
              Symptom Checker
            </Link>
          
            <Link to="/privacy-policy" className="text-gray-700 hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-4 border-t mt-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link 
              to="/symptom-checker" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Symptom Checker
            </Link>
            <Link 
              to="/medical-history" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Medical History
            </Link>
            <Link 
              to="/privacy-policy" 
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;