import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Search className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          We couldn't find the page you're looking for. The page may have been moved, 
          deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
          <Link
            to="/symptom-checker"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
          >
            Check Symptoms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;