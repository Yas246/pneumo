import type { Patient } from "@/types/patient";

// Interface pour étendre le type Patient avec des champs dynamiques
export interface ExtendedPatient extends Patient {
  [key: string]: unknown;

  // Champs spécifiques Sleep (avec préfixe sleep)
  sleepPersonalHistory?: {
    obesity?: boolean;
    hta?: boolean;
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
  sleepFamilyHistory?: {
    saosHistory?: boolean;
    respiratoryPathologies?: boolean;
  };
  sleepOrlExam?: {
    facialMorphology?: {
      retrognathism?: boolean;
      prognathism?: boolean;
      retromaxillia?: boolean;
      other?: string;
    };
    hyoidBone?: string;
    dentalClass?: string;
    ogivalPalate?: boolean;
    mallampati?: string;
    friedman?: string;
    nasofibroscopy?: {
      nasalFossae?: string;
      retrovelarObstacle?: string;
      retrobasillingualObstacle?: string;
    };
    maneuvers?: {
      tongueProtraction?: boolean;
      simulatedSnoring?: boolean;
      prognathism?: boolean;
      otherExam?: string;
    };
    otherClinicalExams?: string;
  };
  sleepComplementaryExams?: {
    ventilationPolygraphy?: boolean;
    psg?: boolean;
    tensionalHolter?: boolean;
    nightOximetry?: boolean;
    imaging?: {
      chestXray?: boolean;
      orlScan?: boolean;
    };
    polygraphyDate?: string;
    iah?: number | null;
    iahCentral?: number | null;
    oxygenDesaturation?: number | null;
    ct90?: number | null;
    gazometryDate?: string;
    ph?: number | null;
    pao2?: number | null;
    paco2?: number | null;
    hco3?: number | null;
    sao2?: number | null;
    efrDate?: string;
    cvf?: number | null;
    vems?: number | null;
    dlco?: number | null;
    cpt?: number | null;
    otherExams?: string;
    metabolicAssessment?: string;
    chestXray?: {
      imageUrls?: string[];
      notes?: string;
    };
    scanner?: {
      imageUrls?: string[];
      videoUrls?: string[];
      notes?: string;
    };
    otherComplementaryExams?: string;
  };
  sleepDiagnosis?: {
    saos?: boolean;
    sacs?: boolean;
    soh?: boolean;
    nocturnalHypoventilation?: boolean;
    simpleSnoring?: boolean;
    pathologies?: Array<{
      name: string;
      selected: boolean;
      treatments: Array<{
        name: string;
        selected: boolean;
      }>;
    }>;
    otherTreatments?: string;
  };
  sleepTreatment?: {
    hygieneDietetic?: {
      weightLoss?: boolean;
      alcoholAndSedativesStop?: boolean;
      sleepHygieneImprovement?: boolean;
      notes?: string;
    };
    medicalTreatments?: {
      ppc?: boolean;
      oam?: boolean;
      oxygenotherapy?: boolean;
      medications?: string[];
      other?: string;
    };
    surgicalTreatments?: {
      orlSurgery?: boolean;
      maxillofacialSurgery?: boolean;
      notes?: string;
    };
    equipment?: {
      ppc?: boolean;
      oam?: boolean;
      oxygenotherapy?: boolean;
      vni?: boolean;
      other?: string;
    };
    exitPrescription?: {
      content?: string;
      documentUrl?: string;
    };
    other?: string;
  };
  sleepPpcFollowUp?: {
    ppcPrescribingDoctor?: string;
    ppcStartDate?: string;
    deviceSupplier?: string;
    deviceModel?: string;
    serialNumber?: number | null;
    initialPressure?: number | null;
    ventilationMode?: "" | "CPAP" | "APAP" | "Bi-level";
    humidifier?: boolean;
    maskType?: "" | "nasal" | "facial" | "narinaire";
    maskModel?: string;
    maskSize?: string;
    otherAccessories?: string;
  };
  pleuralEffusionDiagnosis?: {
    type?: string;
    etiology?: string;
  };
  pleuralEffusionTreatment?: {
    conservative?: string;
    drainage?: string;
    surgical?: string;
    specificTreatment?: string;
  };
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
  };
  bpcoDiagnosis?: {
    stage?: string;
    acuteExacerbation?: boolean;
    bronchialSuperinfection?: boolean;
    chronicRespiratoryFailure?: boolean;
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
  // Champs spécifiques Asthme
  asthmaConsultationReason?: {
    expiratoryDyspnea?: boolean;
    dryCough?: boolean;
    nocturnalCrisis?: boolean;
    thoracicOppression?: boolean;
    other?: boolean;
    otherDetails?: string;
  };
  asthmaMedicalHistory?: {
    knownAsthma?: boolean;
    asthmaSince?: string;
    allergicRhinitis?: boolean;
    eczemaAtopicDermatitis?: boolean;
    gerd?: boolean;
    other?: string;
    surgicalHistory?: string;
    respiratoryAllergens?: string[];
    drugAllergies?: boolean;
    drugAllergiesDetails?: string;
    otherAllergies?: boolean;
    otherAllergiesDetails?: string;
    familyHistory?: string[];
    parentAsthmatic?: boolean;
    familyAtopy?: boolean;
    familyOther?: string;
    smokingStatus?: string;
    tobaccoQuantity?: number;
    cannabis?: boolean;
    otherToxic?: string;
  };
  asthmaDiseaseHistory?: {
    firstSymptomOnset?: string;
    evolution?: string;
    previousHospitalizations?: boolean;
    hospitalizationsCount?: number;
    symptomOnset?: string;
    crisisFrequency?: string;
    crisisTiming?: string[];
    crisisDuration?: string;
    triggeringFactors?: string[];
    otherTriggeringFactor?: string;
    sabaResponse?: string;
    hospitalUrgency?: boolean;
    hospitalUrgencyCount?: number;
    intubationResuscitation?: boolean;
    intubationCount?: number;
    otherDiseaseHistory?: string;
  };
  asthmaGeneralState?: {
    consciousness?: string[];
    asthenia?: boolean;
    generalStateAlteration?: boolean;
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    spO2?: number;
    weight?: number;
    height?: number;
    bmi?: number;
  };
  asthmaRespiratorySystem?: {
    vesicularMurmur?: string;
    auscultationAnomalies?: string[];
    respiratoryDistressSigns?: string[];
    pleuropulmonarySyndromes?: string[];
    syndromeLocation?: string;
    otherRespiratory?: string;
  };
  asthmaCardiovascularSystem?: {
    regularBdc?: boolean;
    heartMurmur?: boolean;
    murmurTiming?: string;
    murmurLocation?: string[];
    murmurType?: string[];
    murmurIntensity?: number;
    murmurIrradiation?: string;
    muffledNoises?: boolean;
    pericardialFriction?: boolean;
    irregularRhythm?: boolean;
    lowerLimbEdema?: boolean;
    rhj?: boolean;
    tjPlus?: boolean;
    marbling?: boolean;
  };
  asthmaDigestiveSystem?: {
    abdomenInspection?: string[];
    abdomenPalpation?: string[];
    hepatomegaly?: boolean;
    hepatomegalySize?: number;
    splenomegaly?: boolean;
    splenomegalySize?: number;
    abdomenPercussion?: string[];
    abdomenAuscultation?: string[];
  };
  asthmaUrinarySystem?: {
    diuresis?: string;
    bladderGlobe?: boolean;
    urinaryFunctionalSigns?: string[];
    puBuPerformed?: boolean;
    puBuResult?: string;
  };
  asthmaMusculoskeletalSystem?: {
    symptoms?: string[];
    mobility?: string;
    affectedJoints?: string;
  };
  asthmaNervousSystem?: {
    consciousness?: string;
    neurologicalSigns?: string[];
    motorDeficit?: string;
    sensoryDeficit?: string;
    rot?: string;
    rotDescription?: string;
    balance?: string[];
  };
  asthmaSkinMucous?: {
    inspection?: string[];
    dermatologicalLesions?: string;
  };
  asthmaOrlEyesMouth?: {
    conjunctiva?: string;
    oralCavity?: string[];
    tonsils?: string;
    orlSymptoms?: string[];
  };
  asthmaOtherClinicalRemarks?: {
    otherClinicalRemarks?: string;
  };
  asthmaComplementaryExams?: {
    morningPef?: number;
    eveningPef?: number;
    efrReversibleObstruction?: boolean;
    efrVems?: number;
    efrVemsCv?: number;
    chestXray?: string;
    chestXrayOther?: string;
    chestXrayImages?: string[];
    blondScannerImages?: string[];
    thoracicCtdImages?: string[];
    nfsHyperEosinophilia?: boolean;
    hyperEosinophiliaValue?: number;
    totalIge?: number;
    reversibilityTest?: string;
    variationPercentage?: number;
    variationMl?: number;
    positivePrickTests?: string;
    otherComplementaryExams?: string;
  };
  asthmaSeverityClassification?: {
    classification?: string[];
    allergicAsthma?: boolean;
    nonAllergicAsthma?: boolean;
    intermittentAsthma?: boolean;
    persistentAsthmaSeverity?: string;
    exerciseInducedAsthma?: boolean;
    otherForms?: string;
  };
  asthmaTreatment?: {
    maintenanceTreatment?: {
      inhaledCorticosteroids?: string;
      csiDose?: number;
      csiFrequency?: number;
      laba?: string;
      antiLeukotrienes?: boolean;
      otherMaintenance?: string;
    };
    crisisTreatment?: {
      salbutamolInstruction?: string;
      otherCrisis?: string;
    };
    associatedMeasures?: string[];
  };
  asthmaFollowUp?: {
    nextConsultation?: string;
    spirometryDelay?: number;
    controlObjective?: string;
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
    chestXRay?: {
      imageFiles?: string[];
      image?: string;
    };
    chestCT?: {
      videoFiles?: string[];
      video?: string;
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
  // Champs spécifiques Pneumothorax
  pneumothoraxConsultationReason?: {
    thoracicPain?: boolean;
    dyspnea?: boolean;
    cough?: boolean;
    thoracicOppression?: boolean;
    malaiseSyncope?: boolean;
    radiologicalDiscovery?: boolean;
    other?: boolean;
    otherDetails?: string;
  };
  pneumothoraxMedicalHistory?: {
    previousPneumothorax?: boolean;
    previousPneumothoraxSide?: string;
    previousPneumothoraxCount?: number;
    previousPneumothoraxDate?: string;
    bpcoEmphysema?: boolean;
    severeAsthma?: boolean;
    tuberculosis?: boolean;
    pidFibrosis?: boolean;
    cancers?: boolean;
    cancersDetails?: string;
    cardiopathy?: boolean;
    hta?: boolean;
    diabetes?: boolean;
    irc?: boolean;
    thoracicSurgery?: boolean;
    otherPersonal?: boolean;
    otherPersonalDetails?: string;
    recentThoracicTrauma?: boolean;
    mechanicalVentilation?: boolean;
    cvcPleuralPuncture?: boolean;
    otherRecentProcedure?: boolean;
    otherRecentProcedureDetails?: string;
    smoking?: string;
    smokingQuantity?: number;
    cannabisDrugs?: string;
    longiligneMorphotype?: string;
    recentExposure?: string[];
    allergies?: string;
    allergiesDetails?: string;
    chronicTreatments?: boolean;
    chronicTreatmentsDetails?: string;
  };
  pneumothoraxDiseaseHistory?: {
    onset?: string;
    onsetDateTime?: string;
    circumstances?: string[];
    thoracicPain?: string;
    thoracicPainType?: string;
    thoracicPainSide?: string;
    dyspnea?: string;
    dyspneaIntensity?: string;
    cough?: string;
    hemoptysis?: string;
    fever?: string;
    associatedSigns?: string[];
    commentsChronology?: string;
  };
  pneumothoraxClinicalExam?: {
    ta?: number;
    fc?: number;
    fr?: number;
    spO2?: number;
    temp?: number;
    painEva?: number;
    respiratoryDistress?: boolean;
    desaturation?: boolean;
    hemodynamicInstability?: boolean;
    consciousnessAlteration?: boolean;
    compressivePneumothorax?: boolean;
    thoracicAsymmetry?: boolean;
    thoracicAsymmetrySide?: string;
    subcutaneousEmphysema?: boolean;
    trachealDeviation?: boolean;
    cyanosis?: boolean;
    tympanism?: boolean;
    tympanismSide?: string;
    diminishedVesicularMurmur?: boolean;
    diminishedVesicularMurmurSide?: string;
    associatedRales?: boolean;
    associatedRalesDetails?: string;
    tachycardia?: boolean;
    shockSigns?: boolean;
    otherCardiovascular?: boolean;
    otherCardiovascularDetails?: string;
    otherExams?: string;
  };
  pneumothoraxComplementaryExams?: {
    chestXrayImages?: string[];
    pleuralUltrasoundImages?: string[];
    thoracicCtdImages?: string[];
    chestXray?: boolean;
    chestXrayReport?: string;
    pleuralUltrasound?: boolean;
    pleuralUltrasoundReport?: string;
    thoracicCtd?: boolean;
    imagingResults?: string;
    bloodGas?: string;
    nfs?: boolean;
    crp?: boolean;
    ionogram?: boolean;
    hemostasis?: boolean;
    bloodGroup?: boolean;
  };
  pneumothoraxDiagnosis?: {
    spontaneousPrimary?: boolean;
    spontaneousSecondary?: boolean;
    spontaneousSecondaryTerrain?: string;
    traumatic?: boolean;
    iatrogenic?: boolean;
    wellTolerated?: boolean;
    poorlyTolerated?: boolean;
    compressiveTension?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    diagnosticConclusion?: string;
  };
  pneumothoraxManagement?: {
    oxygenTherapy?: boolean;
    oxygenModality?: string;
    oxygenFlow?: number;
    analgesia?: boolean;
    analgesiaDetails?: string;
    peripheralIv?: boolean;
    monitoring?: boolean;
    bloodGasIndication?: boolean;
    specializedAdvice?: string[];
    simpleMonitoring?: boolean;
    needleAspiration?: boolean;
    pleuralDrainage?: boolean;
    drainageSide?: string;
    drainageType?: string;
    drainageSystem?: string;
    drainageAspiration?: string;
    drainageAspirationPressure?: number;
    localAnesthesia?: boolean;
    postProcedureXray?: boolean;
    compressiveDecompression?: boolean;
    persistentAirLeak?: boolean;
    highRiskTerrain?: boolean;
  };
  pneumothoraxMonitoring?: {
    regularClinicalMonitoring?: boolean;
    monitoringDetails?: string;
    radiologicalControl?: string;
    drainMonitoring?: boolean;
    complications?: string[];
    evolutionRemarks?: string;
  };
  pneumothoraxTreatmentDischarge?: {
    analgesic?: boolean;
    analgesicDetails?: string;
    otherTreatments?: boolean;
    otherTreatmentsDetails?: string;
    smokingCessation?: boolean;
    hemodynamicStability?: boolean;
    satisfactorySpO2?: boolean;
    clinicalImprovement?: boolean;
    satisfactoryImaging?: boolean;
    drainRemoved?: boolean;
    emergencyReturn?: boolean;
    avoidHeavyEfforts?: boolean;
    avoidEffortsDays?: number;
    stopSmoking?: boolean;
    avoidFlying?: boolean;
    divingContraindicated?: boolean;
    pneumologyConsultation?: boolean;
    thoracicSurgeryConsultation?: boolean;
    controlXray?: boolean;
    controlXrayDate?: string;
    otherInstructions?: string;
  };
  // Champs spécifiques Épanchement Pleural
  pleuralEffusionImaging?: {
    thoracicEchoImages?: string[];
    thoracicCTImages?: string[];
    abdominalEchoImages?: string[];
    ettImages?: string[];
    otherImagingImages?: string[];
  };
  // Champs spécifiques PID
  pidComplementaryExams?: {
    chestXRay?: {
      imageFiles?: string[];
    };
    chestCT?: {
      imageFiles?: string[];
    };
    handXRay?: {
      imageFiles?: string[];
    };
    sinusCT?: {
      imageFiles?: string[];
    };
  };
  // Champs spécifiques DDB
  ddbConsultationReason?: {
    consultationReason?: string;
  };
  ddbMedicalHistory?: {
    childhoodRespiratoryInfections?: boolean;
    childhoodInfections?: string[];
    cysticFibrosis?: boolean;
    immuneDeficiency?: boolean;
    toxicInhalation?: boolean;
    tuberculosis?: boolean;
    tuberculosisContagion?: boolean;
    recurrentSinusitis?: boolean;
    crohnDisease?: boolean;
    infertility?: boolean;
    lymphoma?: boolean;
    asthma?: boolean;
    surgicalHistory?: string;
    gynecoObstetricHistory?: string;
    consanguinity?: boolean;
    familyInfertility?: boolean;
  };
  ddbToxicHistory?: {
    activeSmoking?: boolean;
    smokingType?: string[];
    smokingStartAge?: number | null;
    packYears?: number | null;
    smokingStopped?: boolean;
    smokingStoppedDuration?: string;
    passiveSmoking?: boolean;
    passiveSmokingLocation?: string[];
    cannabis?: boolean;
    cannabisConsumption?: string;
    cannabisStopped?: boolean;
    cannabisStoppedDuration?: string;
    alcohol?: boolean;
    alcoholStopped?: boolean;
    alcoholStoppedDuration?: string;
  };
  ddbDiseaseHistory?: {
    firstSymptoms?: string;
    evolution?: string;
  };
  ddbRespiratorySymptoms?: {
    bronchorrhea?: boolean;
    bronchorrheaVolume?: string;
    cough?: boolean;
    hemoptysis?: boolean;
    purulentSputum?: boolean;
    recurrentRespiratoryInfections?: boolean;
    penetrationSyndrome?: boolean;
    fever?: boolean;
    thoracicPain?: boolean;
  };
  ddbExtraRespiratorySymptoms?: {
    chronicDiarrhea?: boolean;
    malabsorptionSyndrome?: boolean;
    digestiveHemorrhage?: boolean;
    pyrosis?: boolean;
    generalStateAlteration?: boolean;
    sinusPain?: boolean;
    nasalObstruction?: boolean;
    ocularSigns?: boolean;
  };
  ddbPhysicalSigns?: {
    thoracicDeformation?: boolean;
    cyanosis?: boolean;
    hippocraticFingers?: boolean;
    bronchialRales?: boolean;
    crackles?: boolean;
  };
  ddbComplementaryExams?: {
    chestXRaySigns?: string[];
    chestXRayImages?: string[];
    ctAspect?: "" | "DDB localisée" | "DDB généralisée";
    ctSigns?: string[];
    ctImages?: string[];
    ctOtherAnomalies?: string;
    efrDisorder?: string[];
    bronchoscopyConclusion?: string;
    bronchoscopyImages?: string[];
    ecbcResult?: string;
    ecbcImages?: string[];
    bloodGasResult?: string;
    bloodGasImages?: string[];
    biologyNfs?: string[];
    biologyCrp?: "" | "Normale" | "Élevée";
    biologyProteinuria?: "" | "Positif (+)" | "Négatif (-)";
    biologySweatTest?: "" | "Positif (+)" | "Négatif (-)";
    biologyIgDosage?: "" | "Positif (+)" | "Négatif (-)";
  };
  ddbConclusion?: {
    conclusion?: string;
  };
  ddbEtiology?: {
    localizedEtiology?: string[];
    generalizedEtiology?: string[];
  };
  ddbTreatment?: {
    symptomaticTreatments?: string[];
    etiologicalTreatment?: "" | "Oui" | "Non";
    otherMeasures?: string[];
  };
  ddbFollowUp?: {
    nextAppointment?: string;
    observations?: string;
  };
  // Champs spécifiques TBK
  tbkConsultationReason?: {
    consultationReason?: string;
  };
  tbkComorbidities?: {
    diabetes?: boolean;
    diabetesType?: "" | "DID" | "DNID";
    diabetesBalance?: "" | "Équilibré" | "Non équilibré";
    diabetesTreatment?: string;
    renalInsufficiency?: boolean;
    creatinineClearance?: number | null;
    dialysis?: boolean;
    hiv?: boolean;
    pregnancy?: boolean;
    otherComorbidities?: string;
  };
  tbkPersonalTuberculosisHistory?: {
    personalTuberculosisHistory?: boolean;
    treatments?: Array<{
      treatment?: string;
      form?: string;
      regimen?: string;
      startDate?: string | null;
      evolution?: string;
    }>;
  };
  tbkRecentTuberculosisContagion?: {
    recentContagion?: boolean;
    contactType?: "" | "TPM+ Nv cas" | "TPM+ déjà traité" | "TB MDR";
    contactForm?: "" | "Pulmonaire" | "Extrapulmonaire" | "Disséminée";
    contactRegimen?: string[];
    contactRegimenOther?: string;
    contactEvolution?:
      | ""
      | "Guérison"
      | "Échec"
      | "Rechute"
      | "Abandon"
      | "TTT achevé";
  };
  tbkToxicHabits?: {
    smoking?: boolean;
    packYears?: number | null;
    smokingStopped?: boolean;
    cannabis?: boolean;
    jointsPerDay?: number | null;
    cannabisStopped?: boolean;
    alcohol?: boolean;
    alcoholFrequency?: "" | "Régulier" | "Occasionnel";
    alcoholStopped?: boolean;
    drugAddiction?: boolean;
    drugType?: string;
    drugStopped?: boolean;
  };
  tbkGeneralSigns?: {
    fever?: boolean;
    feverType?: "" | "Non chiffrée" | "Chiffrée";
    feverValue?: number | null;
    anorexia?: boolean;
    weightLoss?: boolean;
    weightLossType?: "" | "Non chiffré" | "Chiffré";
    weightLossValue?: number | null;
    asthenia?: boolean;
    omsPs?: number | null;
  };
  tbkFunctionalSigns?: {
    cough?: boolean;
    sputumAspect?: "" | "Muqueuses" | "Purulentes";
    hemoptysisAbundance?: "" | "Faible" | "Moyenne" | "Grande";
    thoracicPain?: boolean;
    dyspnea?: boolean;
    dyspneaMmrcStage?: number | null;
    otherFunctionalSigns?: string;
    extrathoracicSigns?: boolean;
    extrathoracicSignsDetails?: string;
  };
  tbkClinicalExam?: {
    temperature?: number | null;
    bloodPressure?: string;
    pulse?: number | null;
    oxygenSaturation?: number | null;
    conjunctivaColor?:
      | ""
      | "Normalement colorées"
      | "Légèrement décolorées"
      | "Décolorées";
    oralHygiene?: "" | "Bon" | "Mauvais";
    weight?: number | null;
    height?: number | null;
    bmi?: number | null;
    pleuroPulmonaryExam?: "" | "Normal" | "Anormal";
    pleuroPulmonaryExamDetails?: string;
    generalExam?: "" | "Normal" | "Anormal";
    generalExamDetails?: string;
    // Propriétés supplémentaires utilisées dans TBKPathology.tsx
    fr?: number;
    spO2?: number;
    temp?: number;
    painEva?: number;
    weightLoss?: boolean;
    nightSweats?: boolean;
    fever?: boolean;
    chronicCough?: boolean;
    hemoptysis?: boolean;
    respiratoryDistress?: boolean;
    hemodynamicInstability?: boolean;
    consciousnessAlteration?: boolean;
    thoracicPain?: boolean;
    dyspnea?: boolean;
    cyanosis?: boolean;
    wheezing?: boolean;
    diminishedVesicularMurmur?: boolean;
    associatedRales?: boolean;
    associatedRalesDetails?: string;
    tachycardia?: boolean;
    otherCardiovascular?: boolean;
    otherCardiovascularDetails?: string;
    otherExams?: string;
  };
  tbkChestXRay?: {
    lesionTypes?: string[];
    otherLesions?: string;
    extentLocation?: string[];
    associatedPleuralEffusion?: boolean;
    associatedAdenopathies?: boolean;
    otherAssociatedLesions?: string;
    imageFiles?: string[];
  };
  tbkSputumBacteriology?: {
    directExams?: Array<{
      date?: string | null;
      result?: "" | "Négatif" | "Positif";
      bacterialLoad?: string;
    }>;
    bkCulture?: {
      date?: string | null;
      medium?: "" | "Solide" | "Liquide";
      result?: "" | "Négative" | "Positive";
      bacterialLoad?: number | null;
    };
    antibiogram?: "" | "Non fait" | "Fait";
    antibiogramType?: "" | "Direct" | "Indirect";
    antibiogramResult?: "" | "Sensible" | "Résistance";
    resistanceDetails?: string;
    otherBacteriology?: string;
  };
  tbkBkGenetics?: {
    genexpert?: "" | "Non fait" | "Fait";
    genexpertDate?: string | null;
    mtbDna?: "" | "Absent" | "Présent";
    rifampicinSensitivity?: "" | "Sensible" | "Résistance à R";
    hain?: "" | "Non fait" | "Fait";
    hainDate?: string | null;
    hainSensitivity?: string[];
    hainOtherResistances?: string;
  };
  tbkBiology?: {
    nfsHb?: number | null;
    nfsWbc?: number | null;
    nfsPlatelets?: number | null;
    nfsLymphocytes?: number | null;
    nfsPmn?: number | null;
    esr?: number | null;
    crp?: number | null;
    urea?: number | null;
    creatinine?: number | null;
    calculatedCreatinineClearance?: number | null;
    alt?: number | null;
    alp?: number | null;
    altAlpRatio?: "" | "R<2" | "2<R<5" | "R>5";
    ggt?: number | null;
    totalBilirubin?: number | null;
    prothrombinTime?: number | null;
    albumin?: number | null;
    hbvSerology?: "" | "Négative" | "Positive";
    hcvSerology?: "" | "Négative" | "Positive";
    hivSerology?: "" | "Négative" | "Positive";
    admissionGlycatedHemoglobin?: number | null;
    otherBiologicalAssessments?: string;
  };
  tbkOtherAssessments?: {
    thoracicCt?: "" | "Non fait" | "Fait";
    thoracicCtDate?: string | null;
    thoracicCtIndication?: string;
    thoracicCtResults?: string;
    thoracicCtImages?: string[];
    bronchoscopy?: "" | "Non faite" | "Faite";
    bronchoscopyDate?: string | null;
    bronchoscopyIndication?: string;
    macroscopicAspect?: string;
    bronchoscopyImages?: string[];
    postFibroBkDirectExam?: "" | "Non faite" | "Faite";
    bronchialAspiration?: "" | "Non faite" | "Faite";
    bronchialAspirationBkDirect?: "" | "Négatif" | "Positif";
    bronchialAspirationBkLoad?: string;
    bronchialAspirationBkCulture?: "" | "Négatif" | "Positif";
    bronchialAspirationColonyCount?: number | null;
    bronchialBiopsies?: "" | "Non fait" | "Fait";
    bronchialBiopsiesResult?: string;
    otherBronchoscopy?: string;
    bronchoscopyResults?: string;
    pleuralPuncture?: "" | "Non faite" | "Faite";
    pleuralPunctureDate?: string | null;
    pleuralFluidAspect?: string;
    pleuralBiochemistry?: string;
    pleuralCytology?: string;
    pleuralPunctureImages?: string[];
    pleuralBiopsy?: "" | "Non faite" | "Faite";
    pleuralBiopsyDate?: string | null;
    pleuralHistology?: string;
    pleuralFragmentBkCulture?: string;
    pleuralBiopsyImages?: string[];
    otherHistologicalExamsType?: string;
    otherHistologicalExamsResults?: string;
    otherAssessmentsImages?: string[];
  };
  tbkPrescribedTreatment?: {
    startDate?: string | null;
    regimen?: string[];
    otherRegimen?: string;
    dosage?: string;
    otherTherapeutics?: string;
  };
  tbkSerumDosage?: {
    status?: "" | "Non faite" | "Faite";
    date?: string | null;
    indication?: string;
    hemie?: {
      performed?: boolean;
      dosageDate?: string | null;
      peakSerumLevel?: number | null;
    };
    remie?: {
      performed?: boolean;
      dosageDate?: string | null;
      peakSerumLevel?: number | null;
    };
    zemie?: {
      performed?: boolean;
      dosageDate?: string | null;
      peakSerumLevel?: number | null;
    };
    emie?: {
      performed?: boolean;
      dosageDate?: string | null;
      peakSerumLevel?: number | null;
    };
  };
  tbkEvolution?: {
    clinicalEvolution?: "" | "Amélioration" | "Aggravation" | "Stagnation";
    otherClinicalEvolution?: string;
    day15BkDirectExam?: "" | "Négatif" | "Positif";
    day15BkLoad?: number | null;
    chestXRayEvolution?: "" | "Amélioration" | "Aggravation" | "Stagnation";
    otherChestXRayEvolution?: string;
    treatmentTolerance?: "" | "Bonne" | "Mauvaise";
    toleranceDetails?: string;
    sideEffects?: boolean;
    sideEffectsDetails?: string;
  };
  tbkDischargeConclusion?: {
    dischargeDate?: string | null;
    dischargeConclusion?: string;
  };

  // Interfaces supplémentaires pour le composant TBKPathology
  tbkMedicalHistory?: {
    personalTuberculosisHistory?: boolean;
    treatments?: Array<{
      treatment?: string;
      form?: string;
      regimen?: string;
      startDate?: string | null;
      evolution?: string;
    }>;
  };
  tbkComplementaryExams?: {
    chestXrayReport?: string;
    ctReport?: string;
    bronchoscopyReport?: string;
    bloodGas?: boolean;
    nfs?: boolean;
    crp?: boolean;
    ionogram?: boolean;
    hemostasis?: boolean;
    bloodGroup?: boolean;
    bkSearch?: boolean;
    germCulture?: boolean;
    cytology?: boolean;
    histology?: boolean;
    molecularBiology?: boolean;
  };
  tbkDiagnosis?: {
    pulmonaryTuberculosis?: boolean;
    extraPulmonaryTuberculosis?: boolean;
    miliaryTuberculosis?: boolean;
    pleuralTuberculosis?: boolean;
    lymphNodeTuberculosis?: boolean;
    urogenitalTuberculosis?: boolean;
    boneTuberculosis?: boolean;
    meningealTuberculosis?: boolean;
    peritonealTuberculosis?: boolean;
    confirmationType?: string;
    diagnosticConclusion?: string;
  };
  tbkTreatment?: {
    quadritherapy?: boolean;
    regimen?: string;
    treatmentDuration?: string;
    directObservedTherapy?: boolean;
    supportiveCare?: boolean;
    corticosteroids?: boolean;
    sideEffects?: string;
    treatmentMonitoring?: boolean;
    treatmentDetails?: string;
  };
  tbkMonitoring?: {
    clinicalMonitoring?: boolean;
    clinicalMonitoringDetails?: string;
    biologicalMonitoring?: boolean;
    biologicalMonitoringDetails?: string;
    radiologicalMonitoring?: boolean;
    radiologicalMonitoringDetails?: string;
    treatmentCompliance?: boolean;
    treatmentComplianceDetails?: string;
    complications?: string[];
    evolutionRemarks?: string;
  };
  tbkDischargeInstructions?: {
    continuationTreatment?: boolean;
    treatmentDuration?: string;
    followUpConsultation?: boolean;
    followUpFrequency?: string;
    infectionControl?: boolean;
    nutritionalAdvice?: boolean;
    familyScreening?: boolean;
    emergencyReturn?: boolean;
    otherInstructions?: string;
  };

  // Champs spécifiques Pneumothorax
  // Champs spécifiques Cancer du Poumon
  lungCancerConsultationReason?: {
    chronicCough?: boolean;
    hemoptysis?: boolean;
    dyspnea?: boolean;
    chestPain?: boolean;
    generalStateAlteration?: boolean;
    prolongedFever?: boolean;
    dysphonia?: boolean;
    fortuitousRadiologicalDiscovery?: boolean;
    extensionAssessment?: boolean;
    other?: boolean;
    otherDetails?: string;
  };
  lungCancerMedicalHistory?: {
    personalHistory?: {
      bpco?: boolean;
      asthma?: boolean;
      tuberculosis?: boolean;
      pid?: boolean;
      bronchiectasis?: boolean;
      cardiovascularDisease?: boolean;
      hta?: boolean;
      htaDetails?: string;
      diabetes?: boolean;
      diabetesDetails?: string;
      chronicKidneyDisease?: boolean;
      liverDisease?: boolean;
      liverDiseaseDetails?: string;
      cancerHistory?: boolean;
      cancerHistoryDetails?: string;
      thoracicSurgery?: boolean;
      thoracicRadiotherapy?: boolean;
      other?: boolean;
      otherDetails?: string;
    };
    riskFactors?: {
      smoking?: "" | "Non" | "Oui";
      packYears?: number | null;
      smokingStatus?: "" | "Actuel" | "Sevré";
      passiveSmoking?: boolean;
      occupationalExposure?: string[];
      pollution?: boolean;
      familyHistory?: boolean;
      immunosuppression?: "" | "Non" | "Oui";
    };
    allergiesTreatments?: {
      allergies?: "" | "Non" | "Oui";
      allergiesDetails?: string;
      chronicTreatments?: string;
      anticoagulantsAntiplatelets?: "" | "Non" | "Oui";
    };
  };
  lungCancerDiseaseHistory?: {
    symptomOnsetDate?: string;
    evolution?: "" | "Progressive" | "Rapide" | "Intermittente";
    cough?: string[];
    expectoration?: "" | "Non" | "Oui";
    expectorationAspect?: string;
    hemoptysis?: "" | "Non" | "Oui";
    hemoptysisType?: string[];
    dyspnea?: "" | "Non" | "Oui";
    dyspneaMmrc?: number | null;
    chestPain?: "" | "Non" | "Oui";
    chestPainType?: "" | "Pleurale" | "Autre";
    feverSweats?: "" | "Non" | "Oui";
    generalState?: string[];
    recurrentInfections?: boolean;
    extensionSigns?: {
      superiorVenaCavaSyndrome?: boolean;
      superiorVenaCavaSyndromeSigns?: string[];
      dysphonia?: boolean;
      dysphagia?: boolean;
      bonePain?: boolean;
      headaches?: boolean;
      neurologicalDisorders?: boolean;
      convulsions?: boolean;
      jaundice?: boolean;
      abdominalPain?: boolean;
      pleuralEffusion?: boolean;
      massiveHemoptysis?: boolean;
      commentsChronology?: string;
    };
  };
  lungCancerClinicalExam?: {
    vitalSigns?: {
      bloodPressure?: string;
      heartRate?: number | null;
      respiratoryRate?: number | null;
      spO2?: number | null;
      temperature?: number | null;
      weight?: number | null;
      height?: number | null;
    };
    performanceStatus?: {
      ecogScore?: number | null;
      markedGeneralState?: boolean;
      lowBmi?: boolean;
      dehydration?: boolean;
    };
    respiratoryExam?: {
      pleuralFluidSyndrome?: boolean;
      condensationSyndrome?: boolean;
      wheezing?: boolean;
      crackles?: boolean;
      localizedDiminishedBreathSounds?: boolean;
      pleuralEffusionSigns?: boolean;
      atelectasisSigns?: boolean;
      other?: string;
    };
    cardiovascularExam?: {
      rhythm?: "" | "Tachycardie" | "Bradycardie";
      murmur?: boolean;
      murmurLocation?: string;
      heartFailureSigns?: string[];
      pericardialFriction?: boolean;
      abolishedHeartSounds?: boolean;
      other?: string;
    };
    lymphNodeExam?: {
      supraclavicularRight?: boolean;
      supraclavicularLeft?: boolean;
      cervical?: boolean;
      axillary?: boolean;
      other?: boolean;
      otherDetails?: string;
    };
    generalExam?: {
      hepatomegaly?: boolean;
      bonePain?: boolean;
      focalNeurologicalDeficit?: boolean;
      superiorVenaCavaSyndrome?: boolean;
      lowerLimbEdema?: boolean;
      skinSigns?: boolean;
      clinicalExamRemarks?: string;
      otherExams?: string;
    };
  };
  lungCancerComplementaryExams?: {
    thoracicImaging?: {
      chestXRay?: boolean;
      chestXRayReport?: string;
      chestXRayImages?: string[];
      tapCt?: boolean;
      tapCtReport?: string;
      tapCtImages?: string[];
      brainMri?: boolean;
      brainMriReport?: string;
      brainMriImages?: string[];
      petCt?: boolean;
      petCtReport?: string;
      petCtImages?: string[];
      pleuralUltrasound?: boolean;
      pleuralUltrasoundReport?: string;
      pleuralUltrasoundImages?: string[];
      other?: string;
      otherImages?: string[];
    };
    endoscopyBiopsies?: {
      bronchoscopy?: boolean;
      bronchoscopyReport?: string;
      bronchoscopyImages?: string[];
      bronchialBiopsies?: boolean;
      bronchialBiopsiesReport?: string;
      bronchialBiopsiesImages?: string[];
      balCytology?: boolean;
      balCytologyResults?: string;
      balCytologyImages?: string[];
      ebus?: boolean;
      ebusResults?: string;
      ebusImages?: string[];
      ctGuidedBiopsy?: boolean;
      ctGuidedBiopsyResults?: string;
      ctGuidedBiopsyImages?: string[];
      diagnosticPleuralPuncture?: boolean;
      diagnosticPleuralPunctureResults?: string;
      diagnosticPleuralPunctureImages?: string[];
      lymphNodeBiopsy?: boolean;
      lymphNodeBiopsyResults?: string;
      lymphNodeBiopsyImages?: string[];
    };
    pathology?: {
      histologicalType?: string[];
      nsclcSubtype?: string[];
      molecularBiology?: string[];
      otherMolecular?: string;
      pathologyImages?: string[];
    };
    initialBiology?: {
      cbc?: boolean;
      cbcResults?: string;
      crp?: boolean;
      crpResults?: string;
      ionogramUreaCreatinine?: boolean;
      ionogramUreaCreatinineResults?: string;
      liverFunction?: boolean;
      liverFunctionResults?: string;
      calcium?: string;
      albuminNutrition?: string;
      hemostasis?: boolean;
      hemostasisResults?: string;
      tumorMarkers?: boolean;
      tumorMarkersResults?: string;
    };
    preTherapeuticAssessment?: {
      pftSpirometry?: boolean;
      pftSpirometryResults?: string;
      dlco?: boolean;
      dlcoResults?: string;
      bloodGas?: boolean;
      bloodGasResults?: string;
      ecg?: boolean;
      ecgResults?: string;
      echocardiography?: boolean;
      echocardiographyResults?: string;
      anestheticEvaluation?: boolean;
      anestheticEvaluationResults?: string;
    };
  };
  lungCancerDiagnosis?: {
    diagnosis?: {
      suspected?: boolean;
      confirmed?: boolean;
      nsclc?: boolean;
      sclc?: boolean;
      other?: boolean;
      otherDetails?: string;
    };
    staging?: {
      t?: string;
      n?: string;
      m?: string;
      stage?: string;
      localizedOperable?: boolean;
      locallyAdvanced?: boolean;
      metastatic?: boolean;
      metastaticSites?: string[];
      otherSites?: boolean;
      otherSitesDetails?: string;
    };
  };
  lungCancerManagement?: {
    immediateMeasures?: {
      oxygenotherapy?: boolean;
      analgesia?: boolean;
      symptomaticTreatment?: boolean;
      oncologicalEmergency?: boolean;
      oncologicalEmergencyType?: string[];
    };
    multidisciplinaryMeeting?: {
      rcpRequested?: boolean;
      rcpAvailable?: boolean;
      rcpDate?: string;
      decision?: string;
    };
    therapeuticProject?: {
      surgery?: boolean;
      radiotherapy?: boolean;
      chemoradiotherapy?: boolean;
      chemotherapy?: boolean;
      immunotherapy?: boolean;
      targetedTherapies?: boolean;
      palliativeCare?: boolean;
      other?: boolean;
      otherDetails?: string;
    };
  };
  lungCancerFollowUp?: {
    clinicalMonitoring?: boolean;
    toxicityEvaluation?: boolean;
    followUpImaging?: boolean;
    pftFollowUp?: boolean;
    nutritionalManagement?: boolean;
    smokingCessation?: boolean;
    vaccination?: boolean;
    evolutionResponse?:
      | ""
      | "Stable"
      | "Réponse"
      | "Progression"
      | "Non évaluée";
    remarks?: string;
  };
  lungCancerTreatmentDischarge?: {
    prescribedTreatment?: {
      analgesic?: boolean;
      analgesicDetails?: string;
      antitussive?: boolean;
      antitussiveDetails?: string;
      corticosteroids?: boolean;
      corticosteroidsDetails?: string;
      anticoagulation?: boolean;
      anticoagulationDetails?: string;
      other?: boolean;
      otherDetails?: string;
    };
    supportiveCare?: {
      painManagement?: boolean;
      dyspneaManagement?: boolean;
      nutritionalManagement?: boolean;
      psychosocialSupport?: boolean;
      palliativeCare?: boolean;
    };
    instructionsFollowUp?: {
      emergencyReturn?: boolean;
      smokingStop?: boolean;
      pneumologyAppointment?: boolean;
      oncologyAppointment?: boolean;
      radiotherapy?: boolean;
      biologicalControl?: boolean;
      biologicalControlDate?: string;
      imagingControl?: boolean;
      imagingControlDate?: string;
      documentsDelivered?: string[];
    };
  };
}

// Types pour les composants de pathologies
export interface PathologyConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  component: React.ComponentType<{ patient: ExtendedPatient }>;
  sections?: Record<string, boolean>;
}

export interface PathologySectionProps {
  patient: ExtendedPatient;
  pathologyId?: string;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export interface SectionProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  patient?: ExtendedPatient;
}
