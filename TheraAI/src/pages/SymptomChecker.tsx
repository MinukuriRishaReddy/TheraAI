import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { useHealthcare } from '../context/HealthcareContext';
import { Symptom } from '../types';
import CustomSymptomForm from '../components/CustomSymptomForm';
import SymptomDropdown from '../components/SymptomDropdown';

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Shortness of breath',
  'Sore throat', 'Muscle pain', 'Nausea', 'Dizziness', 'Chest pain'
].sort();

const SymptomChecker: React.FC = () => {
  const navigate = useNavigate();
  const { symptoms, addSymptom, removeSymptom, generateDiagnosis } = useHealthcare();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState('');

  const handleSelectSymptom = (symptom: string) => {
    setSelectedSymptom(symptom);
    setShowCustomForm(true);
  };

  const handleAddCustomSymptom = (symptomData: Omit<Symptom, 'id'>) => {
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      ...symptomData
    };
    addSymptom(newSymptom);
    setShowCustomForm(false);
    setSearchTerm('');
  };

  const handleSubmit = () => {
    generateDiagnosis();
    navigate('/diagnostic-results');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Symptom Checker</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter Your Symptoms</h2>
          
          <SymptomDropdown
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectSymptom={handleSelectSymptom}
            onAddCustom={() => {
              setShowCustomForm(true);
              setSelectedSymptom(searchTerm);
            }}
            existingSymptoms={symptoms}
            predefinedSymptoms={commonSymptoms}
          />

          {showCustomForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <CustomSymptomForm
                initialName={selectedSymptom}
                onAdd={handleAddCustomSymptom}
                onCancel={() => setShowCustomForm(false)}
              />
            </div>
          )}

          {symptoms.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3 text-gray-700">Your Symptoms:</h3>
              <ul className="space-y-2">
                {symptoms.map((symptom) => (
                  <li
                    key={symptom.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                  >
                    <div>
                      <span className="font-medium">{symptom.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({symptom.severity}, {symptom.duration} day{symptom.duration !== 1 ? 's' : ''})
                      </span>
                      {symptom.bodyLocation && (
                        <span className="block text-sm text-gray-500">
                          Location: {symptom.bodyLocation}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSymptom(symptom.id)}
                      className="p-1 text-gray-400"
                      aria-label="Remove symptom"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={symptoms.length === 0}
            className={`px-6 py-2 rounded-md flex items-center ${
              symptoms.length > 0
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
          >
            Get Diagnosis
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
        <div className="flex items-start">
          <AlertTriangle className="text-yellow-600 h-5 w-5 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-yellow-800 mb-2">Important Note</h3>
            <p className="text-yellow-700 text-sm">
              This AI diagnostic tool provides preliminary guidance only and is not a substitute for professional 
              medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for 
              medical concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;