// Symptom types
export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: number; // in days
  description?: string;
  bodyLocation?: string;
}

// Medical record types
export interface VitalSigns {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

export interface MedicalRecord {
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  allergies: string[];
  medications: string[];
  chronicConditions: string[];
  familyHistory: string[];
  vitalSigns: VitalSigns;
  previousEpisodes?: Episode[];
}

export interface Episode {
  id: string;
  date: string;
  symptoms: Symptom[];
  diagnosis: string;
  treatments: Treatment[];
  effectiveness: number; // 0-1
  adverseReactions?: string[];
}

// Diagnosis types
export interface Diagnosis {
  id: string;
  condition: string;
  confidenceLevel: number; // between 0 and 1
  description: string;
  symptoms: string[];
  riskFactors: string[];
  treatments: Treatment[];
  matchingEpisodes?: Episode[];
  hereditaryFactors?: string[];
}

// Treatment types
export interface Treatment {
  id: string;
  name: string;
  type: 'medication' | 'lifestyle' | 'therapy' | 'procedure';
  description: string;
  duration?: string;
  contraindications: string[];
  sideEffects: string[];
  effectiveness: number; // between 0 and 1
  priority: 'primary' | 'secondary' | 'supportive';
  previousOutcomes?: {
    success: boolean;
    notes: string;
  }[];
}

// Recommendation types
export type RecommendationUrgency = 'immediate' | 'urgent' | 'soon' | 'routine';
export type RecommendationType = 'medical' | 'medication' | 'lifestyle' | 'test';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  urgency: RecommendationUrgency;
  type: RecommendationType;
  reasoning?: string;
  alternativeOptions?: Treatment[];
}

// User data and authentication
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
}

// System types
export interface SystemError {
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Analysis types
export interface CareAnalysis {
  hereditaryRisks: {
    condition: string;
    likelihood: number;
    relatedSymptoms: string[];
  }[];
  symptomPatterns: {
    pattern: string;
    frequency: number;
    lastOccurrence: string;
    associatedDiagnoses: string[];
  }[];
  treatmentHistory: {
    treatment: string;
    effectiveness: number;
    adverseReactions: string[];
    recommendedAlternatives?: Treatment[];
  }[];
  currentHealthFactors: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    considerations: string[];
  }[];
}