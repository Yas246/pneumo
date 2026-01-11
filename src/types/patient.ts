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
  ipHosix?: string;
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
    | "pid"
    | "bpco"; // Type de pathologie principal

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
    showEpworth?: boolean;
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
  clinicalExam?: {
    weight?: number | null;
    height?: number | null;
    bmi?: number | null;
    neckCircumference?: number | null;
    abdominalPerimeter?: number | null;
    bloodPressure?: string;
    heartRate?: number | null;
    saturation?: number | null;
    pulmonaryAuscultation?: string;
  };
  orlExam: {
    facialMorphology: {
      retrognathism: boolean;
      prognathism: boolean;
      retromaxillia: boolean;
      other?: string;
    };
    hyoidBone?: string;
    dentalClass?: string;
    ogivalPalate: boolean;
    mallampati?: string;
    friedman?: string;
    nasofibroscopy: {
      nasalFossae?: string;
      retrovelarObstacle?: string;
      retrobasillingualObstacle?: string;
    };
    maneuvers: {
      tongueProtraction: boolean;
      simulatedSnoring: boolean;
      prognathism: boolean;
      otherExam?: string;
    };
    otherClinicalExams?: string;
  };

  // Examens Complémentaires
  complementaryExams?: {
    ventilationPolygraphy: boolean;
    psg: boolean;
    tensionalHolter: boolean;
    nightOximetry: boolean;
    imaging: {
      chestXray: boolean;
      orlScan: boolean;
    };
    polygraphyDate?: string;
    iah?: number;
    iahCentral?: number;
    oxygenDesaturation?: number;
    ct90?: number;
    gazometryDate?: string;
    ph?: number;
    pao2?: number;
    paco2?: number;
    hco3?: number;
    sao2?: number;
    efrDate?: string;
    cvf?: number;
    vems?: number;
    dlco?: number;
    cpt?: number;
    otherExams?: string;
    metabolicAssessment?: string;
    chestXray: {
      imageUrls?: string[];
      notes?: string;
    };
    scanner: {
      imageUrls?: string[];
      videoUrls?: string[];
      notes?: string;
    };
    otherComplementaryExams?: string;
  };

  // Diagnostic Principal
  diagnosis: {
    saos: boolean;
    sacs: boolean;
    soh: boolean;
    nocturalHypoventilation: boolean;
    simpleSnoring: boolean;
    pathologies: Array<{
      name: string;
      selected: boolean;
      treatments: Array<{
        name: string;
        selected: boolean;
      }>;
    }>;
    otherTreatments?: string;
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
      medications: string[];
      other?: string;
    };
    surgicalTreatments: {
      orlSurgery: boolean;
      bariatricSurgery: boolean;
      notes?: string;
    };
    equipment: {
      ppc: boolean;
      oam: boolean;
      oxygenotherapy: boolean;
      vni: boolean;
      other?: string;
    };
    exitPrescription: {
      content?: string;
      documentUrl?: string;
    };
    other?: string;
  };

  // PPC Follow-up
  ppcFollowUp: {
    ppcPrescribingDoctor?: string;
    ppcStartDate?: string;
    deviceModel?: string;
    deviceSupplier?: string;
    initialPressure?: number;
    ventilationMode?: "" | "CPAP" | "APAP" | "Bi-level";
    humidifier: boolean;
    maskType?: string;
    maskModel?: string;
    maskSize?: string;
    serialNumber?: number;
    provider?: string;
    otherAccessories?: string;
  };

  // Champs spécifiques BPCO
  bpcoConsultationReason?: {
    chronicCough?: boolean;
    chronicBronchitis?: boolean;
    chronicDyspnea?: boolean;
    acuteDyspneaAggravation?: boolean;
    frequentRespiratoryInfections?: boolean;
    other?: string;
  };

  bpcoMedicalHistory?: {
    asthma?: boolean;
    asthmaExacerbationsPerYear?: number;
    bpco?: boolean;
    bpcoExacerbationsPerYear?: number;
    tuberculosis?: boolean;
    pneumonia?: boolean;
    recurrentRespiratoryInfections?: boolean;
    professionalPollutants?: string;
    domesticPollutants?: string;
    urbanPollutants?: string;
    rgo?: boolean;
    hepatopathy?: string;
    nephropathy?: string;
    cardiopathy?: string;
    connectiveTissue?: string;
    neoplasia?: string;
    other?: string;
    surgicalHistory?: string;
    vaccinations?: string[];
    smokingStatus?: string;
    paquetsAnnees?: number;
    cannabis?: boolean;
    alcohol?: boolean;
  };

  bpcoClinicalExam?: {
    performanceScore?: string;
    generalState?: {
      goodConsciousness?: boolean;
      confusion?: boolean;
      asthenia?: boolean;
      generalStateAlteration?: boolean;
    };
    // Add other clinical exam fields as needed
  };

  bpcoDiseaseHistory?: {
    firstSymptomsDate?: string;
    evolution?: string;
    triggeringFactors?: {
      tobacco?: boolean;
      pollution?: boolean;
      professional?: boolean;
    };
    exacerbationsPerYear?: number;
    hospitalizationsForBpco?: boolean;
    hospitalizationsCount?: number;
    associatedSigns?: string;
  };

  bpcoDiagnosticTests?: {
    spirometry?: {
      vems?: number;
      vemsCv?: number;
      goldStage?: number;
    };
    plethysmography?: {
      cpt?: number;
      vr?: number;
      crf?: number;
    };
    biology?: {
      cbc?: {
        done?: boolean;
        hemoglobin?: number;
        mcv?: number;
        whiteBloodCells?: number;
      };
      biochemistry?: {
        done?: boolean;
        creatinine?: number;
        ast?: number;
        alt?: number;
        crp?: number;
      };
    };
    microbiology?: {
      bkSputum?: string;
      ecbc?: string;
      pcr?: string;
    };
    bronchoscopy?: {
      findings?: string;
      bal?: string;
    };
    functionalAssessment?: {
      walkTest?: string;
      ecg?: string;
      echocardiography?: string;
    };
  };

  bpcoImpactAssessment?: {
    bloodGas?: {
      ph?: number;
      paO2?: number;
      paCO2?: number;
    };
    exerciseTest?: {
      sixMinWalkTest?: number;
      vo2Max?: number;
    };
  };

  bpcoTreatment?: {
    maintenance?: string;
    prescribedTreatments?: string[];
    longTermOxygen?: boolean;
    therapeuticEducation?: boolean;
    smokingCessation?: boolean;
  };

  bpcoFollowUp?: {
    lastConsultation?: string;
    nextEvaluation?: string;
    pneumologyFollowUp?: boolean;
    vaccinationsUpToDate?: boolean;
  };

  bpcoComplementaryExams?: {
    vems?: number;
    vemsCvf?: number;
    goldStage?: string;
    cpt?: number;
    vr?: number;
    crf?: number;
    ph?: number;
    pao2?: number;
    paco2?: number;
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
