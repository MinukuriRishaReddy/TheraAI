import React, { useState, useEffect, useRef } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Symptom } from '../types';

interface SymptomDropdownProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectSymptom: (symptom: string) => void;
  onAddCustom: () => void;
  existingSymptoms: Symptom[];
  predefinedSymptoms: string[];
}

const SymptomDropdown: React.FC<SymptomDropdownProps> = ({
  searchTerm,
  onSearchChange,
  onSelectSymptom,
  onAddCustom,
  existingSymptoms,
  predefinedSymptoms,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Combine and sort all symptoms
  const allSymptoms = [...new Set([...predefinedSymptoms, ...existingSymptoms.map(s => s.name)])].sort();

  // Filter symptoms based on search term
  const filteredSymptoms = allSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if symptom already exists
  const isDuplicate = (symptom: string) => {
    return existingSymptoms.some(s => s.name.toLowerCase() === symptom.toLowerCase());
  };

  const handleSymptomSelect = (symptom: string) => {
    if (isDuplicate(symptom)) {
      setError('This symptom has already been added');
      return;
    }
    setError(null);
    onSelectSymptom(symptom);
    setShowDropdown(false);
  };

  const handleCustomSymptom = () => {
    if (isDuplicate(searchTerm)) {
      setError('This symptom has already been added');
      return;
    }
    setError(null);
    onAddCustom();
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300">
        <Search className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search or describe symptoms..."
          className="flex-1 p-3 outline-none"
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowDropdown(true);
            setError(null);
          }}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {error && (
        <div className="absolute w-full mt-1 p-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {showDropdown && searchTerm && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSymptomSelect(symptom)}
                >
                  {symptom}
                </li>
              ))
            ) : (
              <li
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-blue-600"
                onClick={handleCustomSymptom}
              >
                Add "{searchTerm}" as a new symptom
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SymptomDropdown;