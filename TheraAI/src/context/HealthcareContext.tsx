import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Symptom, 
  Diagnosis, 
  MedicalRecord, 
  Recommendation, 
  Treatment,
  Episode,
  CareAnalysis 
} from '../types';

interface HealthcareContextType {
  symptoms: Symptom[];
  medicalHistory: MedicalRecord;
  diagnoses: Diagnosis[];
  recommendations: Recommendation[];
  careAnalysis: CareAnalysis | null;
  addSymptom: (symptom: Symptom) => void;
  removeSymptom: (id: string) => void;
  updateMedicalHistory: (data: Partial<MedicalRecord>) => void;
  generateDiagnosis: () => void;
  analyzeCare: () => void;
  clearData: () => void;
}

const initialMedicalRecord: MedicalRecord = {
  age: 0,
  gender: '',
  height: 0,
  weight: 0,
  allergies: [],
  medications: [],
  chronicConditions: [],
  familyHistory: [],
  vitalSigns: {
    heartRate: 0,
    bloodPressure: {
      systolic: 0,
      diastolic: 0,
    },
    temperature: 0,
    respiratoryRate: 0,
    oxygenSaturation: 0,
  },
  previousEpisodes: [],
};

const HealthcareContext = createContext<HealthcareContextType | undefined>(undefined);

export const HealthcareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalRecord>(initialMedicalRecord);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [careAnalysis, setCareAnalysis] = useState<CareAnalysis | null>(null);

  const addSymptom = (symptom: Symptom) => {
    setSymptoms((prev) => [...prev, symptom]);
  };

  const removeSymptom = (id: string) => {
    setSymptoms((prev) => prev.filter((symptom) => symptom.id !== id));
  };

  const updateMedicalHistory = (data: Partial<MedicalRecord>) => {
    setMedicalHistory((prev) => ({ ...prev, ...data }));
  };

  const analyzeCare = () => {
    // Mock analysis of patient care
    const mockAnalysis: CareAnalysis = {
      hereditaryRisks: [
        {
          condition: 'Hypertension',
          likelihood: 0.7,
          relatedSymptoms: ['Headache', 'Dizziness']
        }
      ],
      symptomPatterns: [
        {
          pattern: 'Seasonal Allergies',
          frequency: 4,
          lastOccurrence: '2024-03-15',
          associatedDiagnoses: ['Allergic Rhinitis']
        }
      ],
      treatmentHistory: [
        {
          treatment: 'Antihistamines',
          effectiveness: 0.85,
          adverseReactions: ['Drowsiness'],
          recommendedAlternatives: [
            {
              id: '1',
              name: 'Non-sedating Antihistamine',
              type: 'medication',
              description: 'Second-generation antihistamine with reduced drowsiness',
              contraindications: [],
              sideEffects: ['Dry mouth'],
              effectiveness: 0.8,
              priority: 'primary'
            }
          ]
        }
      ],
      currentHealthFactors: [
        {
          factor: 'Blood Pressure',
          impact: 'negative',
          considerations: ['Current medication may need adjustment']
        }
      ]
    };

    setCareAnalysis(mockAnalysis);
  };

  const generateDiagnosis = () => {
    analyzeCare(); // Perform care analysis alongside diagnosis

    const mockTreatments: Treatment[] = [
      {
        id: '1',
        name: 'Rest and Hydration',
        type: 'lifestyle',
        description: 'Get adequate rest and maintain proper hydration with clear fluids.',
        duration: '3-5 days',
        contraindications: [],
        sideEffects: [],
        effectiveness: 0.8,
        priority: 'primary',
        previousOutcomes: [
          {
            success: true,
            notes: 'Patient responded well to rest and hydration in previous episodes'
          }
        ]
      },
      {
        id: '2',
        name: 'Acetaminophen',
        type: 'medication',
        description: 'Take acetaminophen for fever and pain relief.',
        duration: 'As needed',
        contraindications: ['Liver disease', 'Alcohol consumption'],
        sideEffects: ['Nausea', 'Liver damage (with prolonged use)'],
        effectiveness: 0.75,
        priority: 'primary',
        previousOutcomes: [
          {
            success: true,
            notes: 'Effective for symptom management with no adverse reactions'
          }
        ]
      }
    ];

    const mockDiagnoses: Diagnosis[] = [
      {
        id: '1',
        condition: 'Common Cold',
        confidenceLevel: 0.85,
        description: 'A viral infection of the upper respiratory tract',
        symptoms: symptoms.map(s => s.name),
        riskFactors: ['Recent exposure to infected individuals', 'Seasonal changes'],
        treatments: mockTreatments,
        matchingEpisodes: [
          {
            id: '1',
            date: '2024-01-15',
            symptoms: symptoms,
            diagnosis: 'Common Cold',
            treatments: mockTreatments,
            effectiveness: 0.9
          }
        ],
        hereditaryFactors: []
      }
    ];

    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Rest and Hydration',
        description: 'Get plenty of rest and stay hydrated with water and clear fluids.',
        urgency: 'routine',
        type: 'lifestyle',
        reasoning: 'Based on successful previous treatment outcomes and current symptoms',
        alternativeOptions: []
      },
      {
        id: '2',
        title: 'Over-the-counter Medication',
        description: 'Consider acetaminophen for fever and pain relief.',
        urgency: 'routine',
        type: 'medication',
        reasoning: 'Previously effective with no adverse reactions reported',
        alternativeOptions: [
          {
            id: '3',
            name: 'Ibuprofen',
            type: 'medication',
            description: 'Alternative pain reliever and fever reducer',
            contraindications: ['Stomach ulcers', 'Bleeding disorders'],
            sideEffects: ['Stomach upset', 'Increased bleeding risk'],
            effectiveness: 0.75,
            priority: 'secondary'
          }
        ]
      }
    ];

    setDiagnoses(mockDiagnoses);
    setRecommendations(mockRecommendations);
  };

  const clearData = () => {
    setSymptoms([]);
    setMedicalHistory(initialMedicalRecord);
    setDiagnoses([]);
    setRecommendations([]);
    setCareAnalysis(null);
  };

  return (
    <HealthcareContext.Provider
      value={{
        symptoms,
        medicalHistory,
        diagnoses,
        recommendations,
        careAnalysis,
        addSymptom,
        removeSymptom,
        updateMedicalHistory,
        generateDiagnosis,
        analyzeCare,
        clearData,
      }}
    >
      {children}
    </HealthcareContext.Provider>
  );
};

export const useHealthcare = (): HealthcareContextType => {
  const context = useContext(HealthcareContext);
  if (context === undefined) {
    throw new Error('useHealthcare must be used within a HealthcareProvider');
  }
  return context;
};