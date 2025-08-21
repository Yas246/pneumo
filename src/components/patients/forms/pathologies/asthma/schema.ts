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

export const asthmaSchema = z.object({
  // II. MOTIF DE CONSULTATION
  asthmaConsultationReason: z
    .object({
      expiratoryDyspnea: z.boolean().default(false),
      dryCough: z.boolean().default(false),
      nocturnalCrisis: z.boolean().default(false),
      thoracicOppression: z.boolean().default(false),
      other: z.boolean().default(false),
      otherDetails: z.string().optional(),
    })
    .default({}),

  // III. ANTÉCÉDENTS
  asthmaMedicalHistory: z
    .object({
      knownAsthma: z.boolean().default(false),
      asthmaSince: z.string().optional(),
      allergicRhinitis: z.boolean().default(false),
      eczemaAtopicDermatitis: z.boolean().default(false),
      gerd: z.boolean().default(false),
      other: z.string().optional(),
      surgicalHistory: z.string().optional(),
      respiratoryAllergens: booleanOrArray(),
      drugAllergies: z.boolean().default(false),
      drugAllergiesDetails: z.string().optional(),
      otherAllergies: z.boolean().default(false),
      otherAllergiesDetails: z.string().optional(),
      familyHistory: booleanOrArray(),
      parentAsthmatic: z.boolean().default(false),
      familyAtopy: z.boolean().default(false),
      familyOther: z.string().optional(),
      smokingStatus: z.string().optional(),
      tobaccoQuantity: zNullableNumber,
      cannabis: z.boolean().default(false),
      otherToxic: z.string().optional(),
    })
    .default({}),

  // IV. HISTOIRE DE LA MALADIE
  asthmaDiseaseHistory: z
    .object({
      firstSymptomOnset: z.string().optional(),
      evolution: z.string().optional(),
      previousHospitalizations: z.boolean().default(false),
      hospitalizationsCount: zNullableNumber,
      symptomOnset: z.string().optional(),
      crisisFrequency: z.string().optional(),
      crisisTiming: booleanOrArray(),
      crisisDuration: z.string().optional(),
      triggeringFactors: booleanOrArray(),
      otherTriggeringFactor: z.string().optional(),
      sabaResponse: z.string().optional(),
      hospitalUrgency: z.boolean().default(false),
      hospitalUrgencyCount: zNullableNumber,
      intubationResuscitation: z.boolean().default(false),
      intubationCount: zNullableNumber,
      otherDiseaseHistory: z.string().optional(),
    })
    .default({}),

  // V. EXAMEN CLINIQUE
  asthmaGeneralState: z
    .object({
      consciousness: booleanOrArray(),
      asthenia: z.boolean().default(false),
      generalStateAlteration: z.boolean().default(false),
      bloodPressure: z.string().optional(),
      heartRate: zNullableNumber,
      temperature: zNullableNumber,
      spO2: zNullableNumber,
      weight: zNullableNumber,
      height: zNullableNumber,
      bmi: zNullableNumber,
    })
    .default({}),

  asthmaRespiratorySystem: z
    .object({
      vesicularMurmur: z.string().optional(),
      auscultationAnomalies: booleanOrArray(),
      respiratoryDistressSigns: booleanOrArray(),
      syndromeCondensation: z.boolean().default(false),
      syndromePleural: z.boolean().default(false),
      syndromeLocation: z.string().optional(),
      otherRespiratory: z.string().optional(),
    })
    .default({}),

  asthmaCardiovascularSystem: z
    .object({
      regularBdc: z.boolean().default(false),
      heartMurmur: z.boolean().default(false),
      murmurTiming: z.string().optional(),
      murmurLocation: booleanOrArray(),
      murmurType: z.string().optional(),
      murmurIntensity: zNullableNumber,
      murmurIrradiation: z.string().optional(),
      muffledNoises: z.boolean().default(false),
      pericardialFriction: z.boolean().default(false),
      irregularRhythm: z.boolean().default(false),
      lowerLimbEdema: z.boolean().default(false),
      rhj: z.boolean().default(false),
      tjPlus: z.boolean().default(false),
      marbling: z.boolean().default(false),
    })
    .default({}),

  asthmaDigestiveSystem: z
    .object({
      abdomenInspection: z.array(z.string()).default([]),
      abdomenPalpation: z.array(z.string()).default([]),
      hepatomegaly: z.boolean().default(false),
      hepatomegalySize: zNullableNumber,
      splenomegaly: z.boolean().default(false),
      splenomegalySize: zNullableNumber,
      matiteDeclive: z.boolean().default(false),
      tympanisme: z.boolean().default(false),
      abdomenAuscultation: z.array(z.string()).default([]),
    })
    .default({}),

  asthmaUrinarySystem: z
    .object({
      diuresis: z.string().optional(),
      bladderGlobe: z.boolean().default(false),
      urinaryFunctionalSigns: z.array(z.string()).default([]),
      puBuPerformed: z.boolean().default(false),
      puBuResult: z.string().optional(),
    })
    .default({}),

  asthmaMusculoskeletalSystem: z
    .object({
      symptoms: z.array(z.string()).default([]),
      mobility: z.string().optional(),
      affectedJoints: z.string().optional(),
    })
    .default({}),

  asthmaNervousSystem: z
    .object({
      consciousness: z.string().optional(),
      neurologicalSigns: z.array(z.string()).default([]),
      motorDeficit: z.string().optional(),
      sensoryDeficit: z.string().optional(),
      rot: z.string().optional(),
      rotDescription: z.string().optional(),
      balance: z.string().optional(),
    })
    .default({}),

  asthmaSkinMucous: z
    .object({
      inspection: z.array(z.string()).default([]),
      dermatologicalLesions: z.string().optional(),
    })
    .default({}),

  asthmaOrlEyesMouth: z
    .object({
      conjunctiva: z.string().optional(),
      muqueusesHydratees: z.boolean().default(false),
      seches: z.boolean().default(false),
      lesions: z.boolean().default(false),
      tonsils: z.string().optional(),
      orlSymptoms: z.array(z.string()).default([]),
    })
    .default({}),

  asthmaOtherClinicalRemarks: z
    .object({
      otherClinicalRemarks: z.string().optional(),
    })
    .default({}),

  // VI. EXAMENS COMPLÉMENTAIRES
  asthmaComplementaryExams: z
    .object({
      morningPef: zNullableNumber,
      eveningPef: zNullableNumber,
      efrReversibleObstruction: z.boolean().default(false),
      efrVems: zNullableNumber,
      efrVemsCv: zNullableNumber,
      chestXray: z.string().optional(),
      chestXrayOther: z.string().optional(),
      nfsHyperEosinophilia: z.boolean().default(false),
      hyperEosinophiliaValue: zNullableNumber,
      totalIge: zNullableNumber,
      reversibilityTest: z.string().optional(),
      variationPercentage: zNullableNumber,
      variationMl: zNullableNumber,
      positivePrickTests: z.string().optional(),
      otherComplementaryExams: z.string().optional(),
    })
    .default({}),

  // VII. CLASSIFICATION DE LA GRAVITÉ
  asthmaSeverityClassification: z
    .object({
      classification: z.array(z.string()).default([]),
      allergicAsthma: z.boolean().default(false),
      nonAllergicAsthma: z.boolean().default(false),
      intermittentAsthma: z.boolean().default(false),
      persistentAsthmaSeverity: z.string().optional(),
      exerciseInducedAsthma: z.boolean().default(false),
      otherForms: z.string().optional(),
    })
    .default({}),

  // VIII. TRAITEMENT
  asthmaTreatment: z
    .object({
      maintenanceTreatment: z
        .object({
          inhaledCorticosteroids: z.string().optional(),
          csiDose: zNullableNumber,
          csiFrequency: zNullableNumber,
          laba: z.string().optional(),
          antiLeukotrienes: z.boolean().default(false),
          otherMaintenance: z.string().optional(),
        })
        .default({}),
      crisisTreatment: z
        .object({
          salbutamolInstruction: z.string().optional(),
          otherCrisis: z.string().optional(),
        })
        .default({}),
      associatedMeasures: z.array(z.string()).default([]),
    })
    .default({}),

  // IX. SUIVI
  asthmaFollowUp: z
    .object({
      nextConsultation: z.string().optional(),
      spirometryDelay: zNullableNumber,
      controlObjective: z.string().optional(),
    })
    .default({}),
});

export type AsthmaFormData = z.infer<typeof asthmaSchema>;
