import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Stethoscope, ClipboardList, Shield, ArrowRight, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                AI-Powered Healthcare Diagnostics
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Get preliminary diagnoses and evidence-based recommendations from our advanced AI system.
                Fast, accessible, and always improving.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/symptom-checker"
                  className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  Check Your Symptoms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/medical-history"
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  Update Medical Profile
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg"
                alt="Doctor with digital healthcare interface" 
                className="rounded-lg shadow-lg max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Report Your Symptoms</h3>
              <p className="text-gray-600">
                Enter your symptoms using our intuitive interface. Describe how you're feeling
                in natural language and answer follow-up questions for clarity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI system analyzes your symptoms and medical history using
                machine learning models trained on vast medical datasets.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive preliminary diagnoses with confidence levels and evidence-based 
                recommendations for next steps in your healthcare journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col space-y-6">
              {/* Trust Point 1 */}
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                  <Shield className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Data Privacy & Security</h3>
                  <p className="text-gray-600">
                    Your data is encrypted and securely stored in compliance with HIPAA and GDPR regulations.
                    We never share your information without explicit consent.
                  </p>
                </div>
              </div>

              {/* Trust Point 2 */}
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-4 mt-1">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Medical Expertise</h3>
                  <p className="text-gray-600">
                    Our system is developed in collaboration with experienced healthcare professionals
                    to ensure accuracy and clinical relevance.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <img 
                src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg"
                alt="Healthcare professionals" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take control of your health journey with our AI-powered diagnostic system.
          </p>
          <Link
            to="/symptom-checker"
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center"
          >
            Check Your Symptoms Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;