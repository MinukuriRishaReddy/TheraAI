import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin, LayoutDashboard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">TheraAI</span>
            </div>
            <p className="text-gray-300 text-sm">
              An AI-driven healthcare diagnostic system designed to provide preliminary diagnosis 
              and medical recommendations based on symptoms and medical history.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
                 <li>
                <Link to="/medical-history" className="text-gray-300 hover:text-white transition-colors">
                  Medical History
                </Link>
              </li>
              <li>
                <Link to="/symptom-checker" className="text-gray-300 hover:text-white transition-colors">
                  Symptom Checker
                </Link>
              </li>
          
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
               <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-300">+91 8328382486</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-300">contact@theraai.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-300">Hyderabad</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <span className="text-gray-300">HIPAA Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TheraAI. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            This system is intended to provide informational guidance only and does not replace professional medical advice, 
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;