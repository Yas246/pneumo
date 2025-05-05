import { z } from "zod";

export const sleepPathologySchema = z.object({
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
      saturation: z.number().optional(),
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
