import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthcareProvider } from './context/HealthcareContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import DiagnosticResults from './pages/DiagnosticResults';
import MedicalHistory from './pages/MedicalHistory';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <HealthcareProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/diagnostic-results" element={<DiagnosticResults />} />
              <Route path="/medical-history" element={<MedicalHistory />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HealthcareProvider>
  );
}

export default App;