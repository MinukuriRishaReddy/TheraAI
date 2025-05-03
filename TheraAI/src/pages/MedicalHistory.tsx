import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Shield } from 'lucide-react';
import { useHealthcare } from '../context/HealthcareContext';
import { MedicalRecord } from '../types';

const MedicalHistory: React.FC = () => {
  const navigate = useNavigate();
  const { medicalHistory, updateMedicalHistory } = useHealthcare();
  const [formData, setFormData] = useState<MedicalRecord>(medicalHistory);
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newFamilyHistory, setNewFamilyHistory] = useState('');
  const [saved, setSaved] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof MedicalRecord] as object,
          [child]: parseFloat(value) || value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'age' || name === 'height' || name === 'weight' 
          ? parseFloat(value) || 0 
          : value,
      }));
    }
  };

  const handleAddItem = (
    type: 'allergies' | 'medications' | 'chronicConditions' | 'familyHistory',
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
      setter('');
    }
  };

  const handleRemoveItem = (
    type: 'allergies' | 'medications' | 'chronicConditions' | 'familyHistory',
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMedicalHistory(formData);
    setSaved(true);
    
    // Reset the saved message after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button 
          className="mr-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
          onClick={() => navigate('/')}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Medical History</h1>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8 flex">
        <Shield className="text-blue-500 h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-800 font-medium">Your Data is Secure</p>
          <p className="text-blue-700 text-sm">
            All information is encrypted and securely stored in compliance with HIPAA regulations. 
            Your data is never shared without your explicit consent.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Vital Signs</h2>
            <p className="text-sm text-gray-500 mt-1">
              Optional: This information can help improve diagnostic accuracy
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 mb-1">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                id="heartRate"
                name="vitalSigns.heartRate"
                value={formData.vitalSigns.heartRate || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="systolic" className="block text-sm font-medium text-gray-700 mb-1">
                  Systolic Pressure (mmHg)
                </label>
                <input
                  type="number"
                  id="systolic"
                  name="vitalSigns.bloodPressure.systolic"
                  value={formData.vitalSigns.bloodPressure.systolic || ''}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700 mb-1">
                  Diastolic Pressure (mmHg)
                </label>
                <input
                  type="number"
                  id="diastolic"
                  name="vitalSigns.bloodPressure.diastolic"
                  value={formData.vitalSigns.bloodPressure.diastolic || ''}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                Temperature (°C)
              </label>
              <input
                type="number"
                id="temperature"
                name="vitalSigns.temperature"
                value={formData.vitalSigns.temperature || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                step="0.1"
              />
            </div>
            <div>
              <label htmlFor="respiratoryRate" className="block text-sm font-medium text-gray-700 mb-1">
                Respiratory Rate (breaths/min)
              </label>
              <input
                type="number"
                id="respiratoryRate"
                name="vitalSigns.respiratoryRate"
                value={formData.vitalSigns.respiratoryRate || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="oxygenSaturation" className="block text-sm font-medium text-gray-700 mb-1">
                Oxygen Saturation (%)
              </label>
              <input
                type="number"
                id="oxygenSaturation"
                name="vitalSigns.oxygenSaturation"
                value={formData.vitalSigns.oxygenSaturation || ''}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Allergies</h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Add an allergy..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                className="border border-gray-300 rounded-l-md p-2 flex-1"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                onClick={() => handleAddItem('allergies', newAllergy, setNewAllergy)}
              >
                Add
              </button>
            </div>
            
            {formData.allergies.length > 0 ? (
              <ul className="space-y-2">
                {formData.allergies.map((allergy, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{allergy}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem('allergies', index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No allergies added</p>
            )}
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Current Medications</h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Add a medication..."
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                className="border border-gray-300 rounded-l-md p-2 flex-1"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                onClick={() => handleAddItem('medications', newMedication, setNewMedication)}
              >
                Add
              </button>
            </div>
            
            {formData.medications.length > 0 ? (
              <ul className="space-y-2">
                {formData.medications.map((medication, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{medication}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem('medications', index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No medications added</p>
            )}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Chronic Conditions</h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Add a chronic condition..."
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                className="border border-gray-300 rounded-l-md p-2 flex-1"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                onClick={() => handleAddItem('chronicConditions', newCondition, setNewCondition)}
              >
                Add
              </button>
            </div>
            
            {formData.chronicConditions.length > 0 ? (
              <ul className="space-y-2">
                {formData.chronicConditions.map((condition, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{condition}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem('chronicConditions', index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No chronic conditions added</p>
            )}
          </div>
        </div>

        {/* Family History */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Family Medical History</h2>
          </div>
          <div className="p-6">
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Add family medical history..."
                value={newFamilyHistory}
                onChange={(e) => setNewFamilyHistory(e.target.value)}
                className="border border-gray-300 rounded-l-md p-2 flex-1"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                onClick={() => handleAddItem('familyHistory', newFamilyHistory, setNewFamilyHistory)}
              >
                Add
              </button>
            </div>
            
            {formData.familyHistory.length > 0 ? (
              <ul className="space-y-2">
                {formData.familyHistory.map((history, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span>{history}</span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem('familyHistory', index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No family history added</p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Medical History
          </button>
        </div>

        {/* Success message */}
        {saved && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-md animate-fade-in-up">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Medical history saved successfully!
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MedicalHistory;