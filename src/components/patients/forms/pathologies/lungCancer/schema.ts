import { z } from "zod";

// Helper function to handle boolean to array conversion
const booleanOrArray = () =>
  z.preprocess((val) => {
    if (typeof val === "boolean") return [];
    if (Array.isArray(val)) return val;
    return [];
  }, z.array(z.string()).default([]));

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

export const lungCancerSchema = z.object({
  // 2. Motif de consultation
  lungCancerConsultationReason: z
    .object({
      chronicCough: z.boolean().default(false),
      hemoptysis: z.boolean().default(false),
      dyspnea: z.boolean().default(false),
      chestPain: z.boolean().default(false),
      generalStateAlteration: z.boolean().default(false),
      prolongedFever: z.boolean().default(false),
      dysphonia: z.boolean().default(false),
      fortuitousRadiologicalDiscovery: z.boolean().default(false),
      extensionAssessment: z.boolean().default(false),
      other: z.boolean().default(false),
      otherDetails: z.string().optional(),
    })
    .default({}),

  // 3. Antécédents et facteurs de risque
  lungCancerMedicalHistory: z
    .object({
      // 3.1 Antécédents personnels
      personalHistory: z
        .object({
          bpco: z.boolean().default(false),
          asthma: z.boolean().default(false),
          tuberculosis: z.boolean().default(false),
          pid: z.boolean().default(false),
          bronchiectasis: z.boolean().default(false),
          cardiovascularDisease: z.boolean().default(false),
          hta: z.boolean().default(false),
          htaDetails: z.string().optional(),
          diabetes: z.boolean().default(false),
          diabetesDetails: z.string().optional(),
          chronicKidneyDisease: z.boolean().default(false),
          liverDisease: z.boolean().default(false),
          liverDiseaseDetails: z.string().optional(),
          cancerHistory: z.boolean().default(false),
          cancerHistoryDetails: z.string().optional(),
          thoracicSurgery: z.boolean().default(false),
          thoracicRadiotherapy: z.boolean().default(false),
          other: z.boolean().default(false),
          otherDetails: z.string().optional(),
        })
        .default({}),
      // 3.2 Facteurs de risque et expositions
      riskFactors: z
        .object({
          smoking: z.enum(["", "Non", "Oui"]).optional(),
          packYears: zNullableNumber,
          smokingStatus: z.enum(["", "Actuel", "Sevré"]).optional(),
          passiveSmoking: z.boolean().default(false),
          occupationalExposure: booleanOrArray(),
          pollution: z.boolean().default(false),
          familyHistory: z.boolean().default(false),
          immunosuppression: z.enum(["", "Non", "Oui"]).optional(),
        })
        .default({}),
      // 3.3 Allergies et traitements
      allergiesTreatments: z
        .object({
          allergies: z.enum(["", "Non", "Oui"]).optional(),
          allergiesDetails: z.string().optional(),
          chronicTreatments: z.string().optional(),
          anticoagulantsAntiplatelets: z.enum(["", "Non", "Oui"]).optional(),
        })
        .default({}),
    })
    .default({}),

  // 4. Histoire de la maladie
  lungCancerDiseaseHistory: z
    .object({
      symptomOnsetDate: z.string().optional(),
      evolution: z
        .enum(["", "Progressive", "Rapide", "Intermittente"])
        .optional(),
      cough: booleanOrArray(),
      expectoration: z.enum(["", "Non", "Oui"]).optional(),
      expectorationAspect: z.string().optional(),
      hemoptysis: z.enum(["", "Non", "Oui"]).optional(),
      hemoptysisType: booleanOrArray(),
      dyspnea: z.enum(["", "Non", "Oui"]).optional(),
      dyspneaMmrc: zNullableNumber,
      chestPain: z.enum(["", "Non", "Oui"]).optional(),
      chestPainType: z.enum(["", "Pleurale", "Autre"]).optional(),
      feverSweats: z.enum(["", "Non", "Oui"]).optional(),
      generalState: booleanOrArray(),
      recurrentInfections: z.boolean().default(false),
      // Signes d'extension / complication
      extensionSigns: z
        .object({
          superiorVenaCavaSyndrome: z.boolean().default(false),
          superiorVenaCavaSyndromeSigns: booleanOrArray(),
          dysphonia: z.boolean().default(false),
          dysphagia: z.boolean().default(false),
          bonePain: z.boolean().default(false),
          headaches: z.boolean().default(false),
          neurologicalDisorders: z.boolean().default(false),
          convulsions: z.boolean().default(false),
          jaundice: z.boolean().default(false),
          abdominalPain: z.boolean().default(false),
          pleuralEffusion: z.boolean().default(false),
          massiveHemoptysis: z.boolean().default(false),
          commentsChronology: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // 5. Examen clinique
  lungCancerClinicalExam: z
    .object({
      // 5.1 Constantes
      vitalSigns: z
        .object({
          bloodPressure: z.string().optional(),
          heartRate: zNullableNumber,
          respiratoryRate: zNullableNumber,
          spO2: zNullableNumber,
          temperature: zNullableNumber,
          weight: zNullableNumber,
          height: zNullableNumber,
        })
        .default({}),
      // 5.2 Performance status (ECOG) et état général
      performanceStatus: z
        .object({
          ecogScore: zNullableNumber,
          markedGeneralState: z.boolean().default(false),
          lowBmi: z.boolean().default(false),
          dehydration: z.boolean().default(false),
        })
        .default({}),
      // 5.3 Examen respiratoire
      respiratoryExam: z
        .object({
          pleuralFluidSyndrome: z.boolean().default(false),
          condensationSyndrome: z.boolean().default(false),
          wheezing: z.boolean().default(false),
          crackles: z.boolean().default(false),
          localizedDiminishedBreathSounds: z.boolean().default(false),
          pleuralEffusionSigns: z.boolean().default(false),
          atelectasisSigns: z.boolean().default(false),
          other: z.string().optional(),
        })
        .default({}),
      // 5.4 Examen cardio-vasculaire
      cardiovascularExam: z
        .object({
          rhythm: z.enum(["", "Tachycardie", "Bradycardie"]).optional(),
          murmur: z.boolean().default(false),
          murmurLocation: z.string().optional(),
          heartFailureSigns: booleanOrArray(),
          pericardialFriction: z.boolean().default(false),
          abolishedHeartSounds: z.boolean().default(false),
          other: z.string().optional(),
        })
        .default({}),
      // 5.5 Examen ganglionnaire
      lymphNodeExam: z
        .object({
          supraclavicularRight: z.boolean().default(false),
          supraclavicularLeft: z.boolean().default(false),
          cervical: z.boolean().default(false),
          axillary: z.boolean().default(false),
          other: z.boolean().default(false),
          otherDetails: z.string().optional(),
        })
        .default({}),
      // 5.6 Examen général (extension)
      generalExam: z
        .object({
          hepatomegaly: z.boolean().default(false),
          bonePain: z.boolean().default(false),
          focalNeurologicalDeficit: z.boolean().default(false),
          superiorVenaCavaSyndrome: z.boolean().default(false),
          lowerLimbEdema: z.boolean().default(false),
          skinSigns: z.boolean().default(false),
          clinicalExamRemarks: z.string().optional(),
          otherExams: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // 6. Examens paracliniques
  lungCancerComplementaryExams: z
    .object({
      // 6.1 Imagerie thoracique
      thoracicImaging: z
        .object({
          chestXRay: z.boolean().default(false),
          chestXRayReport: z.string().optional(),
          chestXRayImages: z.array(z.string()).default([]),
          tapCt: z.boolean().default(false),
          tapCtReport: z.string().optional(),
          tapCtImages: z.array(z.string()).default([]),
          brainMri: z.boolean().default(false),
          brainMriReport: z.string().optional(),
          brainMriImages: z.array(z.string()).default([]),
          petCt: z.boolean().default(false),
          petCtReport: z.string().optional(),
          petCtImages: z.array(z.string()).default([]),
          pleuralUltrasound: z.boolean().default(false),
          pleuralUltrasoundReport: z.string().optional(),
          pleuralUltrasoundImages: z.array(z.string()).default([]),
          other: z.string().optional(),
          otherImages: z.array(z.string()).default([]),
        })
        .default({}),
      // 6.2 Endoscopie / prélèvements
      endoscopyBiopsies: z
        .object({
          bronchoscopy: z.boolean().default(false),
          bronchoscopyReport: z.string().optional(),
          bronchoscopyImages: z.array(z.string()).default([]),
          bronchialBiopsies: z.boolean().default(false),
          bronchialBiopsiesReport: z.string().optional(),
          bronchialBiopsiesImages: z.array(z.string()).default([]),
          balCytology: z.boolean().default(false),
          balCytologyResults: z.string().optional(),
          balCytologyImages: z.array(z.string()).default([]),
          ebus: z.boolean().default(false),
          ebusResults: z.string().optional(),
          ebusImages: z.array(z.string()).default([]),
          ctGuidedBiopsy: z.boolean().default(false),
          ctGuidedBiopsyResults: z.string().optional(),
          ctGuidedBiopsyImages: z.array(z.string()).default([]),
          diagnosticPleuralPuncture: z.boolean().default(false),
          diagnosticPleuralPunctureResults: z.string().optional(),
          diagnosticPleuralPunctureImages: z.array(z.string()).default([]),
          lymphNodeBiopsy: z.boolean().default(false),
          lymphNodeBiopsyResults: z.string().optional(),
          lymphNodeBiopsyImages: z.array(z.string()).default([]),
        })
        .default({}),
      // Anatomo-pathologie
      pathology: z
        .object({
          histologicalType: booleanOrArray(),
          nsclcSubtype: booleanOrArray(),
          molecularBiology: booleanOrArray(),
          otherMolecular: z.string().optional(),
          pathologyImages: z.array(z.string()).default([]),
        })
        .default({}),
      // 6.3 Biologie (bilan initial)
      initialBiology: z
        .object({
          cbc: z.boolean().default(false),
          cbcResults: z.string().optional(),
          crp: z.boolean().default(false),
          crpResults: z.string().optional(),
          ionogramUreaCreatinine: z.boolean().default(false),
          ionogramUreaCreatinineResults: z.string().optional(),
          liverFunction: z.boolean().default(false),
          liverFunctionResults: z.string().optional(),
          calcium: z.string().optional(),
          albuminNutrition: z.string().optional(),
          hemostasis: z.boolean().default(false),
          hemostasisResults: z.string().optional(),
          tumorMarkers: z.boolean().default(false),
          tumorMarkersResults: z.string().optional(),
        })
        .default({}),
      // 6.4 Bilan pré-thérapeutique
      preTherapeuticAssessment: z
        .object({
          pftSpirometry: z.boolean().default(false),
          pftSpirometryResults: z.string().optional(),
          dlco: z.boolean().default(false),
          dlcoResults: z.string().optional(),
          bloodGas: z.boolean().default(false),
          bloodGasResults: z.string().optional(),
          ecg: z.boolean().default(false),
          ecgResults: z.string().optional(),
          echocardiography: z.boolean().default(false),
          echocardiographyResults: z.string().optional(),
          anestheticEvaluation: z.boolean().default(false),
          anestheticEvaluationResults: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // 7. Diagnostic
  lungCancerDiagnosis: z
    .object({
      // 7.1 Diagnostic retenu
      diagnosis: z
        .object({
          suspected: z.boolean().default(false),
          confirmed: z.boolean().default(false),
          nsclc: z.boolean().default(false),
          sclc: z.boolean().default(false),
          other: z.boolean().default(false),
          otherDetails: z.string().optional(),
        })
        .default({}),
      // 7.2 Stadification / extension
      staging: z
        .object({
          t: z.string().optional(),
          n: z.string().optional(),
          m: z.string().optional(),
          stage: z.string().optional(),
          localizedOperable: z.boolean().default(false),
          locallyAdvanced: z.boolean().default(false),
          metastatic: z.boolean().default(false),
          metastaticSites: booleanOrArray(),
          otherSites: z.boolean().default(false),
          otherSitesDetails: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // 8. Prise en charge (PEC)
  lungCancerManagement: z
    .object({
      // 8.1 Mesures immédiates / urgences oncologiques
      immediateMeasures: z
        .object({
          oxygenotherapy: z.boolean().default(false),
          analgesia: z.boolean().default(false),
          symptomaticTreatment: z.boolean().default(false),
          oncologicalEmergency: z.boolean().default(false),
          oncologicalEmergencyType: booleanOrArray(),
        })
        .default({}),
      // 8.2 Réunion de concertation pluridisciplinaire (RCP)
      multidisciplinaryMeeting: z
        .object({
          rcpRequested: z.boolean().default(false),
          rcpAvailable: z.boolean().default(false),
          rcpDate: z.string().optional(),
          decision: z.string().optional(),
        })
        .default({}),
      // 8.3 Projet thérapeutique
      therapeuticProject: z
        .object({
          surgery: z.boolean().default(false),
          radiotherapy: z.boolean().default(false),
          chemoradiotherapy: z.boolean().default(false),
          chemotherapy: z.boolean().default(false),
          immunotherapy: z.boolean().default(false),
          targetedTherapies: z.boolean().default(false),
          palliativeCare: z.boolean().default(false),
          other: z.boolean().default(false),
          otherDetails: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // 9. Surveillance évolutive
  lungCancerFollowUp: z
    .object({
      clinicalMonitoring: z.boolean().default(false),
      toxicityEvaluation: z.boolean().default(false),
      followUpImaging: z.boolean().default(false),
      pftFollowUp: z.boolean().default(false),
      nutritionalManagement: z.boolean().default(false),
      smokingCessation: z.boolean().default(false),
      vaccination: z.boolean().default(false),
      evolutionResponse: z
        .enum(["", "Stable", "Réponse", "Progression", "Non évaluée"])
        .optional(),
      remarks: z.string().optional(),
    })
    .default({}),

  // 10. Traitement et ordonnance / consignes de sortie
  lungCancerTreatmentDischarge: z
    .object({
      // 10.1 Traitement prescrit
      prescribedTreatment: z
        .object({
          analgesic: z.boolean().default(false),
          analgesicDetails: z.string().optional(),
          antitussive: z.boolean().default(false),
          antitussiveDetails: z.string().optional(),
          corticosteroids: z.boolean().default(false),
          corticosteroidsDetails: z.string().optional(),
          anticoagulation: z.boolean().default(false),
          anticoagulationDetails: z.string().optional(),
          other: z.boolean().default(false),
          otherDetails: z.string().optional(),
        })
        .default({}),
      // 10.2 Soins de support
      supportiveCare: z
        .object({
          painManagement: z.boolean().default(false),
          dyspneaManagement: z.boolean().default(false),
          nutritionalManagement: z.boolean().default(false),
          psychosocialSupport: z.boolean().default(false),
          palliativeCare: z.boolean().default(false),
        })
        .default({}),
      // 10.3 Consignes et suivi
      instructionsFollowUp: z
        .object({
          emergencyReturn: z.boolean().default(false),
          smokingStop: z.boolean().default(false),
          pneumologyAppointment: z.boolean().default(false),
          oncologyAppointment: z.boolean().default(false),
          radiotherapy: z.boolean().default(false),
          biologicalControl: z.boolean().default(false),
          biologicalControlDate: z.string().optional(),
          imagingControl: z.boolean().default(false),
          imagingControlDate: z.string().optional(),
          documentsDelivered: booleanOrArray(),
        })
        .default({}),
    })
    .default({}),
});

export type LungCancerFormData = z.infer<typeof lungCancerSchema>;
