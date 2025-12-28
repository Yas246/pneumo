import { z } from "zod";

// Helper function to handle boolean to array conversion
const booleanOrArray = () =>
  z.preprocess((val) => {
    if (typeof val === "boolean") return [];
    if (Array.isArray(val)) return val;
    return [];
  }, z.array(z.string()).default([]));

// Helper function to handle array to boolean conversion
// const arrayToBoolean = () =>
//   z.preprocess((val) => {
//     if (Array.isArray(val)) return val.length > 0;
//     if (typeof val === "boolean") return val;
//     return false;
//   }, z.boolean().default(false));

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

export const pneumothoraxSchema = z.object({
  // Motif de consultation
  pneumothoraxConsultationReason: z
    .object({
      thoracicPain: z.boolean().default(false),
      dyspnea: z.boolean().default(false),
      cough: z.boolean().default(false),
      thoracicOppression: z.boolean().default(false),
      malaiseSyncope: z.boolean().default(false),
      radiologicalDiscovery: z.boolean().default(false),
      other: z.boolean().default(false),
      otherDetails: z.string().optional(),
    })
    .default({}),

  // Antécédents et facteurs de risque
  pneumothoraxMedicalHistory: z
    .object({
      // Antécédents personnels
      previousPneumothorax: z.boolean().default(false),
      previousPneumothoraxSide: z.string().optional(),
      previousPneumothoraxCount: zNullableNumber,
      previousPneumothoraxDate: z.string().optional(),
      bpcoEmphysema: z.boolean().default(false),
      severeAsthma: z.boolean().default(false),
      tuberculosis: z.boolean().default(false),
      pidFibrosis: z.boolean().default(false),
      cancers: z.boolean().default(false),
      cancersDetails: z.string().optional(),
      cardiopathy: z.boolean().default(false),
      hta: z.boolean().default(false),
      diabetes: z.boolean().default(false),
      irc: z.boolean().default(false),
      thoracicSurgery: z.boolean().default(false),
      otherPersonal: z.boolean().default(false),
      otherPersonalDetails: z.string().optional(),
      // Antécédents iatrogènes / traumatiques
      recentThoracicTrauma: z.boolean().default(false),
      mechanicalVentilation: z.boolean().default(false),
      cvcPleuralPuncture: z.boolean().default(false),
      otherRecentProcedure: z.boolean().default(false),
      otherRecentProcedureDetails: z.string().optional(),
      // Habitus et facteurs de risque
      smoking: z.string().optional(),
      smokingQuantity: zNullableNumber.optional(),
      cannabisDrugs: z.string().optional(),
      longiligneMorphotype: z.string().optional(),
      recentExposure: booleanOrArray(),
      // Allergies et traitements
      allergies: z.string().optional(),
      allergiesDetails: z.string().optional(),
      chronicTreatments: z.boolean().default(false),
      chronicTreatmentsDetails: z.string().optional(),
    })
    .default({}),

  // Histoire de la maladie
  pneumothoraxDiseaseHistory: z
    .object({
      onset: z.string().optional(),
      onsetDateTime: z.string().optional(),
      circumstances: booleanOrArray(),
      thoracicPain: z.string().optional(),
      thoracicPainType: z.string().optional(),
      thoracicPainSide: z.string().optional(),
      dyspnea: z.string().optional(),
      dyspneaIntensity: z.string().optional(),
      cough: z.string().optional(),
      hemoptysis: z.string().optional(),
      fever: z.string().optional(),
      associatedSigns: booleanOrArray(),
      commentsChronology: z.string().optional(),
    })
    .default({}),

  // Examen clinique
  pneumothoraxClinicalExam: z
    .object({
      // Constantes
      ta: zNullableNumber.optional(),
      fc: zNullableNumber.optional(),
      fr: zNullableNumber.optional(),
      spO2: zNullableNumber.optional(),
      temp: zNullableNumber.optional(),
      painEva: zNullableNumber.optional(),
      // État général et signes de gravité
      respiratoryDistress: z.boolean().default(false),
      desaturation: z.boolean().default(false),
      hemodynamicInstability: z.boolean().default(false),
      consciousnessAlteration: z.boolean().default(false),
      compressivePneumothorax: z.boolean().default(false),
      // Inspection - Palpation
      thoracicAsymmetry: z.boolean().default(false),
      thoracicAsymmetrySide: z.string().optional(),
      subcutaneousEmphysema: z.boolean().default(false),
      trachealDeviation: z.boolean().default(false),
      cyanosis: z.boolean().default(false),
      // Percussion - Auscultation
      tympanism: z.boolean().default(false),
      tympanismSide: z.string().optional(),
      diminishedVesicularMurmur: z.boolean().default(false),
      diminishedVesicularMurmurSide: z.string().optional(),
      associatedRales: z.boolean().default(false),
      associatedRalesDetails: z.string().optional(),
      // Examen cardio-vasculaire
      tachycardia: z.boolean().default(false),
      shockSigns: z.boolean().default(false),
      otherCardiovascular: z.boolean().default(false),
      otherCardiovascularDetails: z.string().optional(),
      // Autres examens
      otherExams: z.string().optional(),
    })
    .default({}),

  // Examens paracliniques
  pneumothoraxComplementaryExams: z
    .object({
      // Imagerie
      chestXray: z.boolean().default(false),
      chestXrayReport: z.string().optional(),
      chestXrayImages: z.array(z.string()).default([]),
      pleuralUltrasound: z.boolean().default(false),
      pleuralUltrasoundReport: z.string().optional(),
      pleuralUltrasoundImages: z.array(z.string()).default([]),
      thoracicCtd: z.boolean().default(false),
      thoracicCtdImages: z.array(z.string()).default([]),
      imagingResults: z.string().optional(),
      // Biologie
      bloodGas: z.string().optional(),
      nfs: z.boolean().default(false),
      nfsResults: z.string().optional(),
      crp: z.boolean().default(false),
      crpResults: z.string().optional(),
      ionogram: z.boolean().default(false),
      ionogramResults: z.string().optional(),
      hemostasis: z.boolean().default(false),
      hemostasisResults: z.string().optional(),
      bloodGroup: z.boolean().default(false),
      bloodGroupResults: z.string().optional(),
    })
    .default({}),

  // Diagnostic
  pneumothoraxDiagnosis: z
    .object({
      // Type de pneumothorax
      spontaneousPrimary: z.boolean().default(false),
      spontaneousSecondary: z.boolean().default(false),
      spontaneousSecondaryTerrain: z.string().optional(),
      traumatic: z.boolean().default(false),
      iatrogenic: z.boolean().default(false),
      // Évaluation de la tolérance et de la taille
      wellTolerated: z.boolean().default(false),
      poorlyTolerated: z.boolean().default(false),
      compressiveTension: z.boolean().default(false),
      small: z.boolean().default(false),
      medium: z.boolean().default(false),
      large: z.boolean().default(false),
      diagnosticConclusion: z.string().optional(),
    })
    .default({}),

  // Prise en charge (PEC)
  pneumothoraxManagement: z
    .object({
      // Mesures immédiates
      oxygenTherapy: z.boolean().default(false),
      oxygenModality: z.string().optional(),
      oxygenFlow: zNullableNumber,
      analgesia: z.boolean().default(false),
      analgesiaDetails: z.string().optional(),
      peripheralIv: z.boolean().default(false),
      monitoring: z.boolean().default(false),
      bloodGasIndication: z.boolean().default(false),
      specializedAdvice: booleanOrArray(),
      // Traitement spécifique
      simpleMonitoring: z.boolean().default(false),
      needleAspiration: z.boolean().default(false),
      pleuralDrainage: z.boolean().default(false),
      drainageSide: z.string().optional(),
      drainageType: z.string().optional(),
      drainageSystem: z.string().optional(),
      drainageAspiration: z.string().optional(),
      drainageAspirationPressure: zNullableNumber,
      localAnesthesia: z.boolean().default(false),
      postProcedureXray: z.boolean().default(false),
      // Situations particulières
      compressiveDecompression: z.boolean().default(false),
      persistentAirLeak: z.boolean().default(false),
      highRiskTerrain: z.boolean().default(false),
      conduiteATenir: z.string().optional(),
    })
    .default({}),

  // Surveillance évolutive
  pneumothoraxMonitoring: z
    .object({
      regularClinicalMonitoring: z.boolean().default(false),
      monitoringDetails: z.string().optional(),
      radiologicalControl: z.string().optional(),
      radiologicalControlOther: z.string().optional(),
      drainMonitoring: z.boolean().default(false),
      complications: booleanOrArray(),
      evolutionRemarks: z.string().optional(),
    })
    .default({}),

  // Traitement et ordonnance / consignes de sortie
  pneumothoraxTreatmentDischarge: z
    .object({
      // Traitement prescrit
      analgesic: z.boolean().default(false),
      analgesicDetails: z.string().optional(),
      otherTreatments: z.boolean().default(false),
      otherTreatmentsDetails: z.string().optional(),
      smokingCessation: z.boolean().default(false),
      // Critères de sortie
      hemodynamicStability: z.boolean().default(false),
      satisfactorySpO2: z.boolean().default(false),
      clinicalImprovement: z.boolean().default(false),
      satisfactoryImaging: z.boolean().default(false),
      drainRemoved: z.boolean().default(false),
      // Consignes au patient
      emergencyReturn: z.boolean().default(false),
      avoidHeavyEfforts: z.boolean().default(false),
      avoidEffortsDays: zNullableNumber.optional(),
      stopSmoking: z.boolean().default(false),
      avoidFlying: z.boolean().default(false),
      divingContraindicated: z.boolean().default(false),
      pneumologyConsultation: z.boolean().default(false),
      thoracicSurgeryConsultation: z.boolean().default(false),
      controlXray: z.boolean().default(false),
      controlXrayDate: z.string().optional(),
      otherInstructions: z.string().optional(),
    })
    .default({}),
});

export type PneumothoraxFormData = z.infer<typeof pneumothoraxSchema>;
