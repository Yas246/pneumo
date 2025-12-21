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

const zNullableDate = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  return val;
}, z.string().nullable());

export const tbkSchema = z.object({
  // I. MOTIF D’HOSPITALISATION
  tbkConsultationReason: z
    .object({
      consultationReason: z.string().optional(),
    })
    .default({}),

  // II. ATCD
  // Comorbidités
  tbkComorbidities: z
    .object({
      diabetes: z.boolean().default(false),
      diabetesType: z.enum(["", "DID", "DNID"]).optional(),
      diabetesBalance: z.enum(["", "Équilibré", "Non équilibré"]).optional(),
      diabetesTreatment: z.string().optional(),
      renalInsufficiency: z.boolean().default(false),
      creatinineClearance: zNullableNumber,
      dialysis: z.boolean().default(false),
      hiv: z.boolean().default(false),
      pregnancy: z.boolean().default(false),
      otherComorbidities: z.string().optional(),
    })
    .default({}),

  // ATCD Personnel de Tuberculose
  tbkPersonalTuberculosisHistory: z
    .object({
      personalTuberculosisHistory: z.boolean().default(false),
      treatments: z
        .array(
          z.object({
            treatment: z.string().optional(),
            form: z.string().optional(),
            regimen: z.string().optional(),
            startDate: zNullableDate,
            evolution: z.string().optional(),
          })
        )
        .default([]),
    })
    .default({}),

  // Notion de Contage Tuberculeux Récent
  tbkRecentTuberculosisContagion: z
    .object({
      recentContagion: z.boolean().default(false),
      contactType: z
        .enum(["", "TPM+ Nv cas", "TPM+ déjà traité", "TB MDR"])
        .optional(),
      contactForm: z
        .enum(["", "Pulmonaire", "Extrapulmonaire", "Disséminée"])
        .optional(),
      contactRegimen: booleanOrArray(),
      contactRegimenOther: z.string().optional(),
      contactEvolution: z
        .enum(["", "Guérison", "Échec", "Rechute", "Abandon", "TTT achevé"])
        .optional(),
    })
    .default({}),

  // Habitudes Toxiques
  tbkToxicHabits: z
    .object({
      smoking: z.boolean().default(false),
      packYears: zNullableNumber,
      smokingStopped: z.boolean().default(false),
      cannabis: z.boolean().default(false),
      jointsPerDay: zNullableNumber,
      cannabisStopped: z.boolean().default(false),
      alcohol: z.boolean().default(false),
      alcoholFrequency: z.enum(["", "Régulier", "Occasionnel"]).optional(),
      alcoholStopped: z.boolean().default(false),
      drugAddiction: z.boolean().default(false),
      drugType: z.string().optional(),
      drugStopped: z.boolean().default(false),
    })
    .default({}),

  // III. CLINIQUE
  // Signes Généraux
  tbkGeneralSigns: z
    .object({
      fever: z.boolean().default(false),
      feverType: z.enum(["", "Non chiffrée", "Chiffrée"]).optional(),
      feverValue: zNullableNumber,
      anorexia: z.boolean().default(false),
      weightLoss: z.boolean().default(false),
      weightLossType: z.enum(["", "Non chiffré", "Chiffré"]).optional(),
      weightLossValue: zNullableNumber,
      asthenia: z.boolean().default(false),
      omsPs: zNullableNumber,
    })
    .default({}),

  // Signes Fonctionnels
  tbkFunctionalSigns: z
    .object({
      cough: z.boolean().default(false),
      sputumAspect: z.enum(["", "Muqueuses", "Purulentes"]).optional(),
      hemoptysisAbundance: z
        .enum(["", "Faible", "Moyenne", "Grande"])
        .optional(),
      thoracicPain: z.boolean().default(false),
      dyspnea: z.boolean().default(false),
      dyspneaMmrcStage: zNullableNumber,
      otherFunctionalSigns: z.string().optional(),
      extrathoracicSigns: z.boolean().default(false),
      extrathoracicSignsDetails: z.string().optional(),
    })
    .default({}),

  // Examen Clinique
  tbkClinicalExam: z
    .object({
      temperature: zNullableNumber,
      bloodPressure: z.string().optional(),
      pulse: zNullableNumber,
      oxygenSaturation: zNullableNumber,
      conjunctivaColor: z
        .enum([
          "",
          "Normalement colorées",
          "Légèrement décolorées",
          "Décolorées",
        ])
        .optional(),
      oralHygiene: z.enum(["", "Bon", "Mauvais"]).optional(),
      weight: zNullableNumber,
      height: zNullableNumber,
      bmi: zNullableNumber,
      pleuroPulmonaryExam: z.enum(["", "Normal", "Anormal"]).optional(),
      pleuroPulmonaryExamDetails: z.string().optional(),
      generalExam: z.enum(["", "Normal", "Anormal"]).optional(),
      generalExamDetails: z.string().optional(),
    })
    .default({}),

  // IV. PARACLINIQUE
  // Rx Thoracique
  tbkChestXRay: z
    .object({
      lesionTypes: booleanOrArray(),
      otherLesions: z.string().optional(),
      extentLocation: booleanOrArray(),
      associatedPleuralEffusion: z.boolean().default(false),
      associatedAdenopathies: z.boolean().default(false),
      otherAssociatedLesions: z.string().optional(),
      imageFiles: z.array(z.string()).default([]),
    })
    .default({}),

  // Bactériologie des Expectorations
  tbkSputumBacteriology: z
    .object({
      directExams: z
        .array(
          z.object({
            date: zNullableDate,
            result: z.enum(["", "Négatif", "Positif"]).optional(),
            bacterialLoad: z.string().optional(),
          })
        )
        .default([]),
      bkCulture: z
        .object({
          date: zNullableDate,
          medium: z.enum(["", "Solide", "Liquide"]).optional(),
          result: z.enum(["", "Négative", "Positive"]).optional(),
          bacterialLoad: zNullableNumber,
        })
        .default({}),
      antibiogram: z.enum(["", "Non fait", "Fait"]).optional(),
      antibiogramType: z.enum(["", "Direct", "Indirect"]).optional(),
      antibiogramResult: z.enum(["", "Sensible", "Résistance"]).optional(),
      resistanceDetails: z.string().optional(),
      otherBacteriology: z.string().optional(),
    })
    .default({}),

  // Génétique BK
  tbkBkGenetics: z
    .object({
      genexpert: z.enum(["", "Non fait", "Fait"]).optional(),
      genexpertDate: zNullableDate,
      mtbDna: z.enum(["", "Absent", "Présent"]).optional(),
      rifampicinSensitivity: z
        .enum(["", "Sensible", "Résistance à R"])
        .optional(),
      hain: z.enum(["", "Non fait", "Fait"]).optional(),
      hainDate: zNullableDate,
      hainSensitivity: booleanOrArray(),
      hainOtherResistances: z.string().optional(),
    })
    .default({}),

  // Biologie
  tbkBiology: z
    .object({
      nfsHb: zNullableNumber,
      nfsWbc: zNullableNumber,
      nfsPlatelets: zNullableNumber,
      nfsLymphocytes: zNullableNumber,
      nfsPmn: zNullableNumber,
      esr: zNullableNumber,
      crp: zNullableNumber,
      urea: zNullableNumber,
      creatinine: zNullableNumber,
      calculatedCreatinineClearance: zNullableNumber,
      alt: zNullableNumber,
      alp: zNullableNumber,
      altAlpRatio: z.enum(["", "R<2", "2<R<5", "R>5"]).optional(),
      ggt: zNullableNumber,
      totalBilirubin: zNullableNumber,
      prothrombinTime: zNullableNumber,
      albumin: zNullableNumber,
      hbvSerology: z.enum(["", "Négative", "Positive"]).optional(),
      hcvSerology: z.enum(["", "Négative", "Positive"]).optional(),
      hivSerology: z.enum(["", "Négative", "Positive"]).optional(),
      admissionGlycatedHemoglobin: zNullableNumber,
      otherBiologicalAssessments: z.string().optional(),
    })
    .default({}),

  // V. AUTRES BILANS PARACLINIQUES
  tbkOtherAssessments: z
    .object({
      thoracicCt: z.enum(["", "Non fait", "Fait"]).optional(),
      thoracicCtDate: zNullableDate,
      thoracicCtIndication: z.string().optional(),
      thoracicCtResults: z.string().optional(),
      thoracicCtImages: z.array(z.string()).default([]),
      bronchoscopy: z.enum(["", "Non faite", "Faite"]).optional(),
      bronchoscopyDate: zNullableDate,
      bronchoscopyIndication: z.string().optional(),
      macroscopicAspect: z.string().optional(),
      bronchoscopyImages: z.array(z.string()).default([]),
      postFibroBkDirectExam: z.enum(["", "Non faite", "Faite"]).optional(),
      bronchialAspiration: z.enum(["", "Non faite", "Faite"]).optional(),
      bronchialAspirationBkDirect: z
        .enum(["", "Négatif", "Positif"])
        .optional(),
      bronchialAspirationBkLoad: z.string().optional(),
      bronchialAspirationBkCulture: z
        .enum(["", "Négatif", "Positif"])
        .optional(),
      bronchialAspirationColonyCount: zNullableNumber,
      bronchialBiopsies: z.enum(["", "Non fait", "Fait"]).optional(),
      bronchialBiopsiesResult: z.string().optional(),
      otherBronchoscopy: z.string().optional(),
      bronchoscopyResults: z.string().optional(),
      pleuralPuncture: z.enum(["", "Non faite", "Faite"]).optional(),
      pleuralPunctureDate: zNullableDate,
      pleuralFluidAspect: z.string().optional(),
      pleuralBiochemistry: z.string().optional(),
      pleuralCytology: z.string().optional(),
      pleuralPunctureImages: z.array(z.string()).default([]),
      pleuralBiopsy: z.enum(["", "Non faite", "Faite"]).optional(),
      pleuralBiopsyDate: zNullableDate,
      pleuralHistology: z.string().optional(),
      pleuralFragmentBkCulture: z.string().optional(),
      pleuralBiopsyImages: z.array(z.string()).default([]),
      otherHistologicalExamsType: z.string().optional(),
      otherHistologicalExamsResults: z.string().optional(),
      otherAssessmentsImages: z.array(z.string()).default([]),
    })
    .default({}),

  // VI. TRAITEMENT PRESCRIT
  tbkPrescribedTreatment: z
    .object({
      startDate: zNullableDate,
      regimen: booleanOrArray(),
      otherRegimen: z.string().optional(),
      dosage: z.string().optional(),
      otherTherapeutics: z.string().optional(),
    })
    .default({}),

  // VII. DOSAGE SÉRIQUE DES AT
  tbkSerumDosage: z
    .object({
      status: z.enum(["", "Non faite", "Faite"]).optional(),
      date: zNullableDate,
      indication: z.string().optional(),
      hemie: z
        .object({
          performed: z.boolean().default(false),
          dosageDate: zNullableDate,
          peakSerumLevel: zNullableNumber,
        })
        .default({}),
      remie: z
        .object({
          performed: z.boolean().default(false),
          dosageDate: zNullableDate,
          peakSerumLevel: zNullableNumber,
        })
        .default({}),
      zemie: z
        .object({
          performed: z.boolean().default(false),
          dosageDate: zNullableDate,
          peakSerumLevel: zNullableNumber,
        })
        .default({}),
      emie: z
        .object({
          performed: z.boolean().default(false),
          dosageDate: zNullableDate,
          peakSerumLevel: zNullableNumber,
        })
        .default({}),
    })
    .default({}),

  // VIII. ÉVOLUTION
  tbkEvolution: z
    .object({
      clinicalEvolution: z
        .enum(["", "Amélioration", "Aggravation", "Stagnation"])
        .optional(),
      otherClinicalEvolution: z.string().optional(),
      day15BkDirectExam: z.enum(["", "Négatif", "Positif"]).optional(),
      day15BkLoad: zNullableNumber,
      chestXRayEvolution: z
        .enum(["", "Amélioration", "Aggravation", "Stagnation"])
        .optional(),
      otherChestXRayEvolution: z.string().optional(),
      treatmentTolerance: z.enum(["", "Bonne", "Mauvaise"]).optional(),
      toleranceDetails: z.string().optional(),
      sideEffects: z.boolean().default(false),
      sideEffectsDetails: z.string().optional(),
    })
    .default({}),

  // IX. CONCLUSION DE SORTIE
  tbkDischargeConclusion: z
    .object({
      dischargeDate: zNullableDate,
      dischargeConclusion: z.string().optional(),
    })
    .default({}),
});

export type TBKFormData = z.infer<typeof tbkSchema>;
