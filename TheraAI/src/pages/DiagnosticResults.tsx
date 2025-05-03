import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHealthcare } from '../context/HealthcareContext';
import { Activity, AlertTriangle, CheckCircle, ChevronRight, Clock, Printer, Share2, ArrowRight, Pill, Brain, History, HeartPulse } from 'lucide-react';

const DiagnosticResults: React.FC = () => {
  const navigate = useNavigate();
  const { symptoms, diagnoses, recommendations, careAnalysis } = useHealthcare();

  // If no diagnoses, redirect to symptom checker
  React.useEffect(() => {
    if (diagnoses.length === 0) {
      navigate('/symptom-checker');
    }
  }, [diagnoses, navigate]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'urgent':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'soon':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'routine':
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Moderate';
    return 'Low';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTreatmentIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-5 w-5" />;
      case 'therapy':
        return <Brain className="h-5 w-5" />;
      case 'procedure':
        return <Activity className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getTreatmentTypeColor = (type: string) => {
    switch (type) {
      case 'medication':
        return 'text-purple-600 bg-purple-50';
      case 'therapy':
        return 'text-blue-600 bg-blue-50';
      case 'procedure':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  if (diagnoses.length === 0) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Diagnostic Results</h1>
        <div className="flex space-x-2">
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Print results"
          >
            <Printer size={20} />
          </button>
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Share results"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-8 flex">
        <AlertTriangle className="text-orange-500 h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-orange-800 font-medium">Important Medical Disclaimer</p>
          <p className="text-orange-700 text-sm">
            This is a preliminary assessment based on the information provided. It is not a definitive diagnosis 
            and should not replace professional medical advice. Please consult with a healthcare provider for 
            proper evaluation.
          </p>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Reported Symptoms</h3>
            <ul className="list-disc list-inside text-gray-600 pl-2">
              {symptoms.map((symptom) => (
                <li key={symptom.id}>
                  {symptom.name} ({symptom.severity}, {symptom.duration} day{symptom.duration !== 1 ? 's' : ''})
                  {symptom.bodyLocation && ` - ${symptom.bodyLocation}`}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Assessment Date</h3>
            <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Possible Diagnoses with Treatments */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Possible Diagnoses & Treatments</h2>
      <div className="space-y-4 mb-8">
        {diagnoses.map((diagnosis) => (
          <div key={diagnosis.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{diagnosis.condition}</h3>
                <div className={`text-sm font-medium ${getConfidenceColor(diagnosis.confidenceLevel)} px-3 py-1 rounded-full bg-opacity-10 bg-current`}>
                  {getConfidenceLabel(diagnosis.confidenceLevel)} Confidence
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{diagnosis.description}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Matching Symptoms</h4>
                <ul className="list-disc list-inside text-gray-600 pl-2">
                  {diagnosis.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Factors</h4>
                <ul className="list-disc list-inside text-gray-600 pl-2">
                  {diagnosis.riskFactors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>

              {/* Treatments Section */}
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Recommended Treatments</h4>
                <div className="space-y-3">
                  {diagnosis.treatments.map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <div className={`${getTreatmentTypeColor(treatment.type)} p-2 rounded-full mr-3`}>
                          {getTreatmentIcon(treatment.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-gray-800">{treatment.name}</h5>
                              <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              treatment.priority === 'primary' 
                                ? 'bg-blue-100 text-blue-700'
                                : treatment.priority === 'secondary'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {treatment.priority.charAt(0).toUpperCase() + treatment.priority.slice(1)}
                            </span>
                          </div>
                          
                          {treatment.duration && (
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">Duration:</span> {treatment.duration}
                            </p>
                          )}

                          {treatment.contraindications.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-red-600">Contraindications:</p>
                              <ul className="list-disc list-inside text-sm text-red-500 pl-2">
                                {treatment.contraindications.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {treatment.sideEffects.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-yellow-600">Possible Side Effects:</p>
                              <ul className="list-disc list-inside text-sm text-yellow-500 pl-2">
                                {treatment.sideEffects.map((effect, index) => (
                                  <li key={index}>{effect}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="mt-2">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-600 mr-2">Effectiveness:</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-[200px]">
                                <div 
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ width: `${treatment.effectiveness * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                {Math.round(treatment.effectiveness * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">General Recommendations</h2>
      <div className="space-y-4 mb-8">
        {recommendations.map((recommendation) => (
          <div key={recommendation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <div className={`mr-4 p-2 rounded-full ${recommendation.urgency === 'routine' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  {recommendation.urgency === 'routine' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{recommendation.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getUrgencyColor(recommendation.urgency)}`}>
                      {recommendation.urgency.charAt(0).toUpperCase() + recommendation.urgency.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600">{recommendation.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Care Analysis Section */}
      {careAnalysis && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Care Analysis</h2>
          
          {/* Hereditary Risks */}
          {careAnalysis.hereditaryRisks.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <HeartPulse className="h-5 w-5 mr-2 text-red-500" />
                  Hereditary Risk Factors
                </h3>
                <div className="space-y-4">
                  {careAnalysis.hereditaryRisks.map((risk, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{risk.condition}</h4>
                          <p className="text-sm text-gray-600">
                            Related symptoms: {risk.relatedSymptoms.join(', ')}
                          </p>
                        </div>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          risk.likelihood > 0.7 ? 'bg-red-100 text-red-700' :
                          risk.likelihood > 0.4 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {Math.round(risk.likelihood * 100)}% Likelihood
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Symptom Patterns */}
          {careAnalysis.symptomPatterns.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <History className="h-5 w-5 mr-2 text-blue-500" />
                  Historical Symptom Patterns
                </h3>
                <div className="space-y-4">
                  {careAnalysis.symptomPatterns.map((pattern, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{pattern.pattern}</h4>
                          <p className="text-sm text-gray-600">
                            Occurs {pattern.frequency} times per year
                          </p>
                          <p className="text-sm text-gray-600">
                            Last occurrence: {new Date(pattern.lastOccurrence).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Associated with:</span>
                          <ul className="text-sm text-gray-700">
                            {pattern.associatedDiagnoses.map((diagnosis, i) => (
                              <li key={i}>{diagnosis}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Treatment History */}
          {careAnalysis.treatmentHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <Pill className="h-5 w-5 mr-2 text-purple-500" />
                  Previous Treatment Outcomes
                </h3>
                <div className="space-y-4">
                  {careAnalysis.treatmentHistory.map((history, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{history.treatment}</h4>
                          
                          <div className="mt-2">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-600 mr-2">
                                Historical Effectiveness:
                              </span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-[200px]">
                                <div 
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ width: `${history.effectiveness * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                {Math.round(history.effectiveness * 100)}%
                              </span>
                            </div>
                          </div>

                          {history.adverseReactions.length > 0 && (
                            <div className="mt-2">
                              <span className="text-sm font-medium text-red-600">
                                Previous Adverse Reactions:
                              </span>
                              <ul className="list-disc list-inside text-sm text-red-500">
                                {history.adverseReactions.map((reaction, i) => (
                                  <li key={i}>{reaction}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {history.recommendedAlternatives && (
                            <div className="mt-3">
                              <span className="text-sm font-medium text-blue-600">
                                Recommended Alternatives:
                              </span>
                              <ul className="list-disc list-inside text-sm text-blue-500">
                                {history.recommendedAlternatives.map((alt, i) => (
                                  <li key={i}>{alt.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Current Health Factors */}
          {careAnalysis.currentHealthFactors.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Current Health Considerations
                </h3>
                <div className="space-y-4">
                  {careAnalysis.currentHealthFactors.map((factor, index) => (
                    <div key={index} className={`border-l-4 pl-4 py-2 ${
                      factor.impact === 'positive' ? 'border-green-500' :
                      factor.impact === 'negative' ? 'border-red-500' :
                      'border-yellow-500'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{factor.factor}</h4>
                          <ul className="mt-1">
                            {factor.considerations.map((consideration, i) => (
                              <li key={i} className="text-sm text-gray-600">
                                • {consideration}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          factor.impact === 'positive' ? 'bg-green-100 text-green-700' :
                          factor.impact === 'negative' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Next Steps</h2>
        <p className="text-blue-700 mb-4">
          Remember that this assessment is preliminary. Depending on your symptoms and their severity, 
          consider the following options:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-blue-700">Schedule an appointment with your primary care physician</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-blue-700">If symptoms worsen, consider urgent care or emergency services</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-blue-700">Follow the recommended treatments and monitor your progress</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/symptom-checker"
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Edit Symptoms
        </Link>
        <Link
          to="/"
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Return to Home
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default DiagnosticResults;