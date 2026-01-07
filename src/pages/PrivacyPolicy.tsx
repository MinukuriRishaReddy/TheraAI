import React from 'react';
import { Lock, Shield, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Privacy Policy & Data Security</h1>
          <p className="text-lg text-gray-600">
            We take the privacy and security of your medical information very seriously.
          </p>
        </div>

        {/* Policy Highlights */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <Shield className="mr-2 h-5 w-5 text-blue-600" />
            Policy Highlights
          </h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">HIPAA Compliant</h3>
                <p className="text-gray-600">
                  We comply with all requirements of the Health Insurance Portability and Accountability Act.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">End-to-End Encryption</h3>
                <p className="text-gray-600">
                  All data is encrypted both in transit and at rest using AES-256 encryption standards.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">Data Minimization</h3>
                <p className="text-gray-600">
                  We only collect the data necessary to provide you with accurate diagnostic information.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">No Data Sharing</h3>
                <p className="text-gray-600">
                  Your data is never shared with third parties without your explicit consent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
              <p className="text-yellow-700">
                The HealthDiagnostics tool provides preliminary information only and is not intended to replace 
                professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other
                qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Policy */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
            <FileText className="mr-2 h-5 w-5 text-blue-600" />
            Detailed Privacy Policy
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Information We Collect</h3>
              <p className="text-gray-600 mb-3">
                We collect the following types of information to provide and improve our diagnostic services:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Symptoms and their characteristics</li>
                <li>Medical history information</li>
                <li>Demographic information (age, gender)</li>
                <li>Physical characteristics (height, weight)</li>
                <li>Vital signs (when provided)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">How We Use Your Information</h3>
              <p className="text-gray-600 mb-3">
                Your information is used for the following purposes:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>To generate preliminary diagnoses and recommendations</li>
                <li>To improve the accuracy of our diagnostic algorithms</li>
                <li>To enhance the user experience of our service</li>
                <li>For internal research and development</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Data Security Measures</h3>
              <p className="text-gray-600 mb-3">
                We implement a variety of security measures to maintain the safety of your personal information:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure storage with AES-256 encryption</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Strict access controls for all personnel</li>
                <li>Automatic logging of all data access</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Your Rights</h3>
              <p className="text-gray-600 mb-3">
                Under HIPAA and GDPR regulations, you have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your information</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Policy Updates</h3>
              <p className="text-gray-600">
           
Created by Team <bold>Tech Trios</bold> © 2025 .
MRN .  All Rights Reserved .


              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-gray-500 text-sm">
            <p>Last updated: May 3, 2025</p>
            <p>Effective: May 3, 2025</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Questions About Our Privacy Policy?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about our privacy policy or data practices, please contact our 
            Data Protection Officer:
          </p>
          <div className="bg-white rounded-md p-4 inline-block">
            <p className="text-gray-800 font-medium">Contact Information:</p>
            <p className="text-gray-600">Email: contact@theraai.com</p>
            <p className="text-gray-600">Phone: +91 8328382486</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;