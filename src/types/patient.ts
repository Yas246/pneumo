export interface StatusChange {
  status: "active" | "archived";
  date: Date;
}

export interface Patient {
  id?: string;
  // Informations Générales du Patient
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: "M" | "F";
  address: string;
  phone: string;
  email: string;
  profession: string;
  treatingDoctor: string;
  socialSecurity: "CNSS" | "AMO" | "Mutuelle" | "Aucun" | "Autre";
  status: "active" | "archived";
  statusHistory: StatusChange[];
  statusChangedAt: Date;
  lastVisit: string;
  pathologies: string[]; // Liste des IDs des pathologies
  pathologyType?:
    | "sleep"
    | "tumor"
    | "bronchial"
    | "infection"
    | "pleuralEffusion"
    | "pid"; // Type de pathologie principal

  // Informations sur le créateur
  creatorId: string;
  creatorRole: string;
  creatorName: string;

  // Motif de Consultation
  consultationReason: string;
  diurnalSymptoms: {
    excessiveSleepiness: boolean;
    headaches: boolean;
    asthenia: boolean;
    epworthScore: number;
    epworthDetails: number[];
  };
  nocturnalSymptoms: {
    snoring: boolean;
    sleepApnea: boolean;
    choking: boolean;
    agitation: boolean;
    insomnia: boolean;
    nocturia: boolean;
    other?: string;
  };
  symptomsDuration: string;

  // ATCD + FDR
  personalHistory: {
    obesity: boolean;
    hta: boolean;
    orl?: string;
    neuro?: string;
    smoking?: string;
    alcoholism?: string;
    diabetes?: string;
    cardiovascularDiseases?: string;
    lifestyle?: string;
    respiratoryPathology?: string;
    currentMedications?: string;
  };
  familyHistory: {
    saosHistory: boolean;
    respiratoryPathologies: boolean;
  };

  // Examen Clinique
  clinicalExam: {
    weight: number;
    height: number;
    bmi: number;
    neckCircumference: number;
    abdominalPerimeter: number;
    bloodPressure: string;
    heartRate: number;
    saturation: number;
    pulmonaryAuscultation: string;
  };
  orlExam: {
    vasAnatomy: string;
    nasalObstruction: boolean;
    amygdalineHypertrophy: boolean;
    retrognathia: boolean;
    micromandible: boolean;
    macroglossia: boolean;
  };

  // Examens Complémentaires
  complementaryExams?: {
    polygraphyDate: string;
    iah: number;
    iahCentral: number;
    oxygenDesaturation: number;
    ct90: number;
    gazometryDate: string;
    ph: number;
    pao2: number;
    paco2: number;
    hco3: number;
    sao2: number;
    efrDate: string;
    cvf: number;
    vems: number;
    dlco: number;
    cpt: number;
  };

  // Diagnostic Principal
  diagnosis: {
    saos: boolean;
    sacs: boolean;
    soh: boolean;
    nocturalHypoventilation: boolean;
    simpleSnoring: boolean;
  };

  // Plan de Traitement
  treatment: {
    hygieneDietetic: {
      weightLoss: boolean;
      alcoholAndSedativesStop: boolean;
      sleepHygieneImprovement: boolean;
      notes?: string;
    };
    medicalTreatments: {
      ppc: boolean;
      oam: boolean;
      oxygenotherapy: boolean;
      medications?: string;
    };
    surgicalTreatments: {
      orlSurgery: boolean;
      bariatricSurgery: boolean;
      notes?: string;
    };
    comments?: string;
  };

  // PPC Follow-up
  ppcFollowUp: {
    ppcPrescribingDoctor?: string;
    ppcStartDate?: string;
    deviceModel?: string;
    deviceSupplier?: string;
    initialPressure?: number;
    ventilationMode?: "CPAP" | "APAP" | "Bi-level";
    humidifier: boolean;
    maskType?: string;
    maskModel?: string;
    maskSize?: string;
    serialNumber?: string;
    provider?: string;
    otherAccessories?: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

// Type pour la création d'un patient (sans les champs générés automatiquement)
export type CreatePatientData = Omit<Patient, "id" | "createdAt" | "updatedAt">;

// Type simplifié pour les rendez-vous
export interface AppointmentPatient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: string;
  phone?: string;
}
