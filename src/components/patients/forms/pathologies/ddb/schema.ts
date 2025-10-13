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

export const ddbSchema = z.object({
  // II. MOTIF DE CONSULTATION
  ddbConsultationReason: z
    .object({
      consultationReason: z.string().optional(),
    })
    .default({}),

  // III. ANTÉCÉDENTS
  // Médicaux
  ddbMedicalHistory: z
    .object({
      childhoodRespiratoryInfections: z.boolean().default(false),
      childhoodInfections: booleanOrArray(),
      cysticFibrosis: z.boolean().default(false),
      immuneDeficiency: z.boolean().default(false),
      toxicInhalation: z.boolean().default(false),
      tuberculosis: z.boolean().default(false),
      tuberculosisContagion: z.boolean().default(false),
      recurrentSinusitis: z.boolean().default(false),
      crohnDisease: z.boolean().default(false),
      infertility: z.boolean().default(false),
      lymphoma: z.boolean().default(false),
      asthma: z.boolean().default(false),
      surgicalHistory: z.string().optional(),
      gynecoObstetricHistory: z.string().optional(),
      consanguinity: z.boolean().default(false),
      familyInfertility: z.boolean().default(false),
    })
    .default({}),

  // Toxiques
  ddbToxicHistory: z
    .object({
      activeSmoking: z.boolean().default(false),
      smokingType: booleanOrArray(),
      smokingStartAge: zNullableNumber,
      packYears: zNullableNumber,
      smokingStopped: z.boolean().default(false),
      smokingStoppedDuration: z.string().optional(),
      passiveSmoking: z.boolean().default(false),
      passiveSmokingLocation: booleanOrArray(),
      cannabis: z.boolean().default(false),
      cannabisConsumption: z.string().optional(),
      cannabisStopped: z.boolean().default(false),
      cannabisStoppedDuration: z.string().optional(),
      alcohol: z.boolean().default(false),
      alcoholStopped: z.boolean().default(false),
      alcoholStoppedDuration: z.string().optional(),
    })
    .default({}),

  // IV. HISTOIRE DE LA MALADIE
  ddbDiseaseHistory: z
    .object({
      firstSymptoms: z.string().optional(),
      evolution: z.string().optional(),
    })
    .default({}),

  // V. CLINIQUE
  // Signes fonctionnels respiratoires
  ddbRespiratorySymptoms: z
    .object({
      bronchorrhea: z.boolean().default(false),
      bronchorrheaVolume: z.string().optional(),
      cough: z.boolean().default(false),
      hemoptysis: z.boolean().default(false),
      purulentSputum: z.boolean().default(false),
      recurrentRespiratoryInfections: z.boolean().default(false),
      penetrationSyndrome: z.boolean().default(false),
      fever: z.boolean().default(false),
      thoracicPain: z.boolean().default(false),
    })
    .default({}),

  // Signes fonctionnels extra-respiratoires
  ddbExtraRespiratorySymptoms: z
    .object({
      chronicDiarrhea: z.boolean().default(false),
      malabsorptionSyndrome: z.boolean().default(false),
      digestiveHemorrhage: z.boolean().default(false),
      pyrosis: z.boolean().default(false),
      generalStateAlteration: z.boolean().default(false),
      sinusPain: z.boolean().default(false),
      nasalObstruction: z.boolean().default(false),
      ocularSigns: z.boolean().default(false),
    })
    .default({}),

  // Signes physiques
  ddbPhysicalSigns: z
    .object({
      thoracicDeformation: z.boolean().default(false),
      cyanosis: z.boolean().default(false),
      hippocraticFingers: z.boolean().default(false),
      bronchialRales: z.boolean().default(false),
      crackles: z.boolean().default(false),
    })
    .default({}),

  // VI. EXAMENS COMPLÉMENTAIRES
  ddbComplementaryExams: z
    .object({
      chestXRaySigns: booleanOrArray(),
      ctAspect: z.enum(["", "DDB localisée", "DDB généralisée"]).optional(),
      ctSigns: booleanOrArray(),
      ctOtherAnomalies: z.string().optional(),
      efrDisorder: booleanOrArray(),
      bronchoscopyConclusion: z.string().optional(),
      ecbcResult: z.string().optional(),
      bloodGasResult: z.string().optional(),
      biologyNfs: booleanOrArray(),
      biologyCrp: z.enum(["", "Normale", "Élevée"]).optional(),
      biologyProteinuria: z.enum(["", "Positif (+)", "Négatif (-)"]).optional(),
      biologySweatTest: z.enum(["", "Positif (+)", "Négatif (-)"]).optional(),
      biologyIgDosage: z.enum(["", "Positif (+)", "Négatif (-)"]).optional(),
    })
    .default({}),

  // VII. CONCLUSION
  ddbConclusion: z
    .object({
      conclusion: z.string().optional(),
    })
    .default({}),

  // VIII. ÉTIOLOGIE RETROUVÉE
  ddbEtiology: z
    .object({
      localizedEtiology: booleanOrArray(),
      generalizedEtiology: booleanOrArray(),
    })
    .default({}),

  // IX. TRAITEMENTS ENVISAGÉS
  ddbTreatment: z
    .object({
      symptomaticTreatments: booleanOrArray(),
      etiologicalTreatment: z.enum(["", "Oui", "Non"]).optional(),
      otherMeasures: booleanOrArray(),
    })
    .default({}),

  // X. SUIVI
  ddbFollowUp: z
    .object({
      nextAppointment: z.string().optional(),
      observations: z.string().optional(),
    })
    .default({}),
});

export type DDBFormData = z.infer<typeof ddbSchema>;
