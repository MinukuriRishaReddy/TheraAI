import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Heart, Thermometer, Droplets, Sun as Lung, ArrowUp, ArrowDown, TrendingUp, AlertTriangle, Calendar, Clock, User, CheckCircle, X } from 'lucide-react';
import { useHealthcare } from '../../context/HealthcareContext';
import ConfidenceGauge from '../../components/charts/ConfidenceGauge';
import CorrelationMatrix from '../../components/charts/CorrelationMatrix';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { medicalHistory, careAnalysis } = useHealthcare();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [schedulingSuccess, setSchedulingSuccess] = useState(false);

  const getVitalStatus = (value: number, type: string) => {
    switch (type) {
      case 'heartRate':
        return value < 60 ? 'low' : value > 100 ? 'high' : 'normal';
      case 'systolic':
        return value < 90 ? 'low' : value > 140 ? 'high' : 'normal';
      case 'temperature':
        return value < 36 ? 'low' : value > 37.8 ? 'high' : 'normal';
      case 'oxygenSaturation':
        return value < 95 ? 'low' : 'normal';
      default:
        return 'normal';
    }
  };

  // Calculate vital sign trends
  const vitalTrends = {
    heartRate: {
      value: medicalHistory.vitalSigns.heartRate,
      change: 1.7,
      status: getVitalStatus(medicalHistory.vitalSigns.heartRate, 'heartRate')
    },
    bloodPressure: {
      value: `${medicalHistory.vitalSigns.bloodPressure.systolic}/${medicalHistory.vitalSigns.bloodPressure.diastolic}`,
      normalRange: '77%',
      status: getVitalStatus(medicalHistory.vitalSigns.bloodPressure.systolic, 'systolic')
    },
    temperature: {
      value: medicalHistory.vitalSigns.temperature,
      normalRange: '100%',
      status: getVitalStatus(medicalHistory.vitalSigns.temperature, 'temperature')
    },
    oxygenSaturation: {
      value: medicalHistory.vitalSigns.oxygenSaturation,
      status: getVitalStatus(medicalHistory.vitalSigns.oxygenSaturation, 'oxygenSaturation')
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'text-blue-600 bg-blue-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'normal':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <ArrowDown className="h-4 w-4" />;
      case 'high':
        return <ArrowUp className="h-4 w-4" />;
      case 'normal':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleScheduleCheckup = () => {
    setShowScheduleModal(true);
  };

  const handleViewHistory = () => {
    navigate('/medical-history');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call to schedule the appointment
    setSchedulingSuccess(true);
    setTimeout(() => {
      setShowScheduleModal(false);
      setSchedulingSuccess(false);
    }, 2000);
  };

  // Generate available time slots for the selected date
  const getAvailableTimeSlots = () => {
    return [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
  };

  // Get next available date (excluding weekends)
  const getNextAvailableDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
                <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleScheduleCheckup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Check-up
              </button>
              <button 
                onClick={handleViewHistory}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <Clock className="h-4 w-4 mr-2" />
                View History
              </button>
            </div>
          </div>
        </div>

        {/* Vital Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Heart Rate */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                getStatusColor(vitalTrends.heartRate.status)
              }`}>
                {getStatusIcon(vitalTrends.heartRate.status)}
                <span>{vitalTrends.heartRate.status}</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Heart Rate</h3>
            <div className="flex items-baseline mt-2">
              <p className="text-2xl font-bold text-gray-900">{vitalTrends.heartRate.value}</p>
              <p className="ml-2 text-gray-500">bpm</p>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Change: {vitalTrends.heartRate.change}% per minute
            </div>
            <ConfidenceGauge 
              value={vitalTrends.heartRate.value / 100} 
              width={120} 
              height={80} 
            />
          </div>

          {/* Blood Pressure */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                getStatusColor(vitalTrends.bloodPressure.status)
              }`}>
                {getStatusIcon(vitalTrends.bloodPressure.status)}
                <span>{vitalTrends.bloodPressure.status}</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Blood Pressure</h3>
            <div className="flex items-baseline mt-2">
              <p className="text-2xl font-bold text-gray-900">{vitalTrends.bloodPressure.value}</p>
              <p className="ml-2 text-gray-500">mmHg</p>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {vitalTrends.bloodPressure.normalRange} of normal range
            </div>
            <ConfidenceGauge 
              value={parseInt(vitalTrends.bloodPressure.normalRange) / 100} 
              width={120} 
              height={80} 
            />
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Thermometer className="h-6 w-6 text-orange-600" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                getStatusColor(vitalTrends.temperature.status)
              }`}>
                {getStatusIcon(vitalTrends.temperature.status)}
                <span>{vitalTrends.temperature.status}</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Temperature</h3>
            <div className="flex items-baseline mt-2">
              <p className="text-2xl font-bold text-gray-900">{vitalTrends.temperature.value}</p>
              <p className="ml-2 text-gray-500">°C</p>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {vitalTrends.temperature.normalRange} of normal range
            </div>
            <ConfidenceGauge 
              value={parseInt(vitalTrends.temperature.normalRange) / 100} 
              width={120} 
              height={80} 
            />
          </div>

          {/* Oxygen Saturation */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Lung className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                getStatusColor(vitalTrends.oxygenSaturation.status)
              }`}>
                {getStatusIcon(vitalTrends.oxygenSaturation.status)}
                <span>{vitalTrends.oxygenSaturation.status}</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Oxygen Saturation</h3>
            <div className="flex items-baseline mt-2">
              <p className="text-2xl font-bold text-gray-900">{vitalTrends.oxygenSaturation.value}</p>
              <p className="ml-2 text-gray-500">%</p>
            </div>
            <ConfidenceGauge 
              value={vitalTrends.oxygenSaturation.value / 100} 
              width={120} 
              height={80} 
            />
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs Correlation</h3>
            <div className="h-64">
              <CorrelationMatrix 
                data={[
                  { x: 'Heart Rate', y: 'Blood Pressure', value: 0.7 },
                  { x: 'Heart Rate', y: 'Temperature', value: 0.3 },
                  { x: 'Heart Rate', y: 'Oxygen', value: 0.5 },
                  { x: 'Blood Pressure', y: 'Temperature', value: 0.2 },
                  { x: 'Blood Pressure', y: 'Oxygen', value: 0.4 },
                  { x: 'Temperature', y: 'Oxygen', value: 0.6 }
                ]}
                width={400}
                height={250}
              />
            </div>
          </div>

          {/* Health Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Alerts</h3>
            <div className="space-y-4">
              {careAnalysis?.currentHealthFactors.map((factor, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border flex items-start space-x-3 ${
                    factor.impact === 'negative' 
                      ? 'bg-red-50 border-red-200' 
                      : factor.impact === 'positive'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <AlertTriangle className={`h-5 w-5 ${
                    factor.impact === 'negative' 
                      ? 'text-red-500' 
                      : factor.impact === 'positive'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`} />
                  <div>
                    <h4 className={`font-medium ${
                      factor.impact === 'negative' 
                        ? 'text-red-800' 
                        : factor.impact === 'positive'
                        ? 'text-green-800'
                        : 'text-yellow-800'
                    }`}>
                      {factor.factor}
                    </h4>
                    <ul className="mt-1 space-y-1">
                      {factor.considerations.map((consideration, i) => (
                        <li key={i} className={`text-sm ${
                          factor.impact === 'negative' 
                            ? 'text-red-600' 
                            : factor.impact === 'positive'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}>
                          • {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/symptom-checker"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Check Symptoms
          </Link>
          <Link
            to="/medical-history"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
            Update Medical History
          </Link>
        </div>

        {/* Scheduling Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              {schedulingSuccess ? (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Scheduled!</h3>
                  <p className="text-gray-600">
                    Your appointment has been scheduled for {selectedDate} at {selectedTime}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Schedule Check-up</h3>
                    <button
                      onClick={() => setShowScheduleModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <form onSubmit={handleScheduleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <input
                        type="date"
                        min={getNextAvailableDate()}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Time
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                      >
                        <option value="">Choose a time</option>
                        {getAvailableTimeSlots().map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowScheduleModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Schedule Appointment
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;