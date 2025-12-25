import { z } from "zod";

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

export const sleepPathologySchema = z.object({
  // Antécédents
  sleepPersonalHistory: z
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
  sleepFamilyHistory: z
    .object({
      saosHistory: z.boolean().default(false),
      respiratoryPathologies: z.boolean().default(false),
    })
    .default({}),

  // Note: clinicalExam est maintenant dans le schéma patient commun (patientSchema)
  sleepOrlExam: z
    .object({
      facialMorphology: z
        .object({
          retrognathism: z.boolean().default(false),
          prognathism: z.boolean().default(false),
          retromaxillia: z.boolean().default(false),
          other: z.string().optional(),
        })
        .default({}),
      hyoidBone: z.preprocess(
        (val) => (val === null ? undefined : val),
        z.string().optional()
      ),
      dentalClass: z.string().optional(),
      ogivalPalate: z.boolean().default(false),
      mallampati: z.string().optional(),
      friedman: z.string().optional(),
      nasofibroscopy: z
        .object({
          nasalFossae: z.string().optional(),
          retrovelarObstacle: z.string().optional(),
          retrobasillingualObstacle: z.string().optional(),
        })
        .default({}),
      maneuvers: z
        .object({
          tongueProtraction: z.boolean().default(false),
          simulatedSnoring: z.boolean().default(false),
          prognathism: z.boolean().default(false),
          otherExam: z.string().optional(),
        })
        .default({}),
      otherClinicalExams: z.string().optional(),
    })
    .default({}),

  // Examens complémentaires
  sleepComplementaryExams: z
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
      iah: zNullableNumber.optional(),
      iahCentral: zNullableNumber.optional(),
      oxygenDesaturation: zNullableNumber.optional(),
      ct90: zNullableNumber.optional(),
      // Gazométrie
      gazometryDate: z.string().optional(),
      ph: zNullableNumber.optional(),
      pao2: zNullableNumber.optional(),
      paco2: zNullableNumber.optional(),
      hco3: zNullableNumber.optional(),
      sao2: zNullableNumber.optional(),
      // EFR
      efrDate: z.string().optional(),
      cvf: zNullableNumber.optional(),
      vems: zNullableNumber.optional(),
      dlco: zNullableNumber.optional(),
      cpt: zNullableNumber.optional(),
      // Autres
      otherExams: z.string().optional(),
      metabolicAssessment: z.string().optional(),
      chestXray: z
        .object({
          imageUrls: z.array(z.string()).optional(),
          notes: z.string().optional(),
        })
        .default({}),
      scanner: z
        .object({
          imageUrls: z.array(z.string()).optional(),
          videoUrls: z.array(z.string()).optional(),
          notes: z.string().optional(),
        })
        .default({}),
      otherComplementaryExams: z.string().optional(),
    })
    .default({}),

  // Diagnostic
  sleepDiagnosis: z
    .object({
      saos: z.boolean().default(false),
      sacs: z.boolean().default(false),
      soh: z.boolean().default(false),
      nocturalHypoventilation: z.boolean().default(false),
      simpleSnoring: z.boolean().default(false),
      pathologies: z
        .array(
          z.object({
            name: z.string(),
            selected: z.boolean().default(false),
            treatments: z
              .array(
                z.object({
                  name: z.string(),
                  selected: z.boolean().default(false),
                })
              )
              .default([]),
          })
        )
        .default([]),
      otherTreatments: z.string().optional(),
    })
    .default({}),

  // Plan de Traitement
  sleepTreatment: z
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
          other: z.string().optional(),
        })
        .default({}),
      surgicalTreatments: z
        .object({
          orlSurgery: z.boolean().default(false),
          bariatricSurgery: z.boolean().default(false),
          notes: z.string().optional(),
        })
        .default({}),
      equipment: z
        .object({
          ppc: z.boolean().default(false),
          oam: z.boolean().default(false),
          oxygenotherapy: z.boolean().default(false),
          vni: z.boolean().default(false),
          other: z.string().optional(),
        })
        .default({}),
      exitPrescription: z
        .object({
          content: z.string().optional(),
          documentUrl: z.string().optional(),
        })
        .default({}),
      other: z.string().optional(),
    })
    .default({}),

  // PPC Follow-up
  sleepPpcFollowUp: z
    .object({
      ppcPrescribingDoctor: z.string().optional(),
      ppcStartDate: z.string().optional(),
      deviceModel: z.string().optional(),
      deviceSupplier: z.string().optional(),
      initialPressure: zNullableNumber.optional(),
      ventilationMode: z.enum(["", "CPAP", "APAP", "Bi-level"]).optional(),
      humidifier: z.boolean().default(false),
      maskType: z.string().optional(),
      maskModel: z.string().optional(),
      maskSize: z.string().optional(),
      serialNumber: zNullableNumber.optional(),
      provider: z.string().optional(),
      otherAccessories: z.string().optional(),
    })
    .default({}),
});
