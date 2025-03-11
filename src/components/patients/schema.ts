import { z } from "zod";

export const patientSchema = z.object({
  // Informations personnelles
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  sex: z.enum(["M", "F"]),
  address: z.string().min(1, "L'adresse est requise"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  profession: z.string().min(1, "La profession est requise"),
  treatingDoctor: z.string().min(1, "Le médecin traitant est requis"),
  socialSecurity: z.enum(["Aucun", "CNSS", "AMO", "Mutuelle", "Autre"]),
  status: z.enum(["active", "archived"]).default("active"),
  lastVisit: z.string().optional().default(""),
  pathologies: z
    .union([z.array(z.string()), z.record(z.string()), z.null(), z.undefined()])
    .transform((val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === "object") {
        // Handle both array-like objects and key-value objects
        return Object.values(val).filter((v) => typeof v === "string");
      }
      return [];
    })
    .default([]),

  // Motif de consultation
  consultationReason: z.string().default(""),
  diurnalSymptoms: z
    .object({
      excessiveSleepiness: z.boolean().default(false),
      headaches: z.boolean().default(false),
      asthenia: z.boolean().default(false),
      epworthScore: z.number().min(0).max(24).default(0),
      epworthDetails: z
        .union([
          z.array(z.number().min(0).max(3)),
          z.record(z.number().min(0).max(3)),
          z.null(),
          z.undefined(),
        ])
        .transform((val) => {
          if (!val) return Array(8).fill(0);
          if (Array.isArray(val)) return val.map((v) => Number(v) || 0);
          if (typeof val === "object") {
            return Array(8)
              .fill(0)
              .map((_, i) => Number(val[i]) || 0);
          }
          return Array(8).fill(0);
        })
        .default([0, 0, 0, 0, 0, 0, 0, 0]),
    })
    .default({
      excessiveSleepiness: false,
      headaches: false,
      asthenia: false,
      epworthScore: 0,
      epworthDetails: [0, 0, 0, 0, 0, 0, 0, 0],
    }),
  nocturnalSymptoms: z
    .object({
      snoring: z.boolean().default(false),
      sleepApnea: z.boolean().default(false),
      choking: z.boolean().default(false),
      agitation: z.boolean().default(false),
      insomnia: z.boolean().default(false),
      nocturia: z.boolean().default(false),
      other: z.string().optional(),
    })
    .default({}),
  symptomsDuration: z.string().default(""),

  // Antécédents
  personalHistory: z
    .object({
      obesity: z.boolean().default(false),
      hta: z.boolean().default(false),
      orl: z.string().optional(),
      neuro: z.string().optional(),
      smoking: z.string().optional(),
      alcoholism: z.string().optional(),
      diabetes: z.string().optional(),
      cardiovascularDiseases: z.string().optional(),
      lifestyle: z.string().optional(),
      respiratoryPathology: z.string().optional(),
      currentMedications: z.string().optional(),
    })
    .default({}),
  familyHistory: z
    .object({
      saosHistory: z.boolean().default(false),
      respiratoryPathologies: z.boolean().default(false),
    })
    .default({}),

  // Examen clinique
  clinicalExam: z
    .object({
      weight: z.number().optional(),
      height: z.number().optional(),
      bmi: z.number().optional(),
      neckCircumference: z.number().optional(),
      abdominalPerimeter: z.number().optional(),
      bloodPressure: z.string().optional(),
      heartRate: z.number().optional(),
      pulmonaryAuscultation: z.string().optional(),
    })
    .default({}),
  orlExam: z
    .object({
      vasAnatomy: z.string().optional(),
      nasalObstruction: z.boolean().default(false),
      amygdalineHypertrophy: z.boolean().default(false),
      retrognathia: z.boolean().default(false),
      micromandible: z.boolean().default(false),
      macroglossia: z.boolean().default(false),
    })
    .default({}),

  // Examens complémentaires
  complementaryExams: z
    .object({
      ventilationPolygraphy: z.boolean().default(false),
      psg: z.boolean().default(false),
      tensionalHolter: z.boolean().default(false),
      nightOximetry: z.boolean().default(false),
      imaging: z
        .object({
          chestXray: z.boolean().default(false),
          orlScan: z.boolean().default(false),
        })
        .default({}),
      // Polygraphie
      polygraphyDate: z.string().optional(),
      iah: z.number().optional(),
      iahCentral: z.number().optional(),
      oxygenDesaturation: z.number().optional(),
      ct90: z.number().optional(),
      // Gazométrie
      gazometryDate: z.string().optional(),
      ph: z.number().optional(),
      pao2: z.number().optional(),
      paco2: z.number().optional(),
      hco3: z.number().optional(),
      sao2: z.number().optional(),
      // EFR
      efrDate: z.string().optional(),
      cvf: z.number().optional(),
      vems: z.number().optional(),
      dlco: z.number().optional(),
      cpt: z.number().optional(),
      // Autres
      otherExams: z.string().optional(),
    })
    .default({}),

  // Diagnostic
  diagnosis: z
    .object({
      saos: z.boolean().default(false),
      sacs: z.boolean().default(false),
      soh: z.boolean().default(false),
      nocturalHypoventilation: z.boolean().default(false),
      simpleSnoring: z.boolean().default(false),
    })
    .default({}),

  // Plan de Traitement
  treatment: z
    .object({
      hygieneDietetic: z
        .object({
          weightLoss: z.boolean().default(false),
          alcoholAndSedativesStop: z.boolean().default(false),
          sleepHygieneImprovement: z.boolean().default(false),
          notes: z.string().optional(),
        })
        .default({}),
      medicalTreatments: z
        .object({
          ppc: z.boolean().default(false),
          oam: z.boolean().default(false),
          oxygenotherapy: z.boolean().default(false),
          medications: z.string().optional(),
        })
        .default({}),
      surgicalTreatments: z
        .object({
          orlSurgery: z.boolean().default(false),
          bariatricSurgery: z.boolean().default(false),
          notes: z.string().optional(),
        })
        .default({}),
      comments: z.string().optional(),
    })
    .default({}),

  // PPC Follow-up
  ppcFollowUp: z
    .object({
      ppcPrescribingDoctor: z.string().optional(),
      ppcStartDate: z.string().optional(),
      deviceModel: z.string().optional(),
      deviceSupplier: z.string().optional(),
      initialPressure: z.number().optional(),
      ventilationMode: z.enum(["CPAP", "APAP", "Bi-level"]).optional(),
      humidifier: z.boolean().default(false),
      maskType: z.string().optional(),
      maskModel: z.string().optional(),
      maskSize: z.string().optional(),
      serialNumber: z.string().optional(),
      provider: z.string().optional(),
      otherAccessories: z.string().optional(),
    })
    .default({}),
});
