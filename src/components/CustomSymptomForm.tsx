import React, { useState } from 'react';
import { X, Plus, AlertTriangle } from 'lucide-react';
import { Symptom } from '../types';

interface CustomSymptomFormProps {
  initialName?: string;
  onAdd: (symptom: Omit<Symptom, 'id'>) => void;
  onCancel: () => void;
}

const CustomSymptomForm: React.FC<CustomSymptomFormProps> = ({ 
  initialName = '',
  onAdd, 
  onCancel 
}) => {
  const [name, setName] = useState(initialName);
  const [severity, setSeverity] = useState<number>(5);
  const [duration, setDuration] = useState(1);
  const [description, setDescription] = useState('');
  const [bodyLocation, setBodyLocation] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    // Show warning for severe symptoms
    if (severity >= 8) {
      setShowWarning(true);
      return;
    }

    onAdd({
      name: name.trim(),
      severity: severity <= 3 ? 'mild' : severity <= 6 ? 'moderate' : 'severe',
      duration,
      description: description.trim(),
      bodyLocation: bodyLocation.trim(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Add Custom Symptom</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Symptom Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter symptom name"
            required
          />
        </div>

        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
            Severity (1-10)*
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="severity"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-gray-600 font-medium">{severity}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duration (days)*
          </label>
          <input
            type="number"
            id="duration"
            min="1"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="bodyLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Body Location
          </label>
          <input
            type="text"
            id="bodyLocation"
            value={bodyLocation}
            onChange={(e) => setBodyLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., lower back, left shoulder"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe any additional details about this symptom..."
          />
        </div>

        {showWarning && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
            <AlertTriangle className="text-red-500 h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-800 font-medium">Warning: Severe Symptom</h4>
              <p className="text-red-700 text-sm mt-1">
                You've indicated a severe level of discomfort. Please seek immediate medical attention
                if you're experiencing severe pain or life-threatening symptoms.
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowWarning(false)}
                  className="text-red-700 hover:text-red-800 font-medium text-sm"
                >
                  Continue anyway
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-red-700 hover:text-red-800 font-medium text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 button-hover"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 button-hover flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add Symptom
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomSymptomForm;