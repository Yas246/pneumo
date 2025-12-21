import { z } from "zod";

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

export const pleuralEffusionSchema = z.object({
  // Motif de consultation
  consultationReason: z
    .object({
      basiThoracicPain: z.boolean().default(false),
      dyspnea: z.boolean().default(false),
      cough: z.boolean().default(false),
      other: z.string().optional(),
    })
    .default({}),

  // Antécédents
  tuberculosis: z
    .object({
      present: z.boolean().default(false),
      date: z.string().optional(),
      form: z.string().optional(),
      treatment: z.string().optional(),
      evolution: z.string().optional(),
    })
    .default({}),

  tbContact: z
    .object({
      present: z.boolean().default(false),
      who: z.string().optional(),
      form: z.string().optional(),
    })
    .default({}),

  pleurisyHistory: z
    .object({
      present: z.boolean().default(false),
      diagnosed: z.boolean().default(false),
      diagnosis: z.string().optional(),
      treatment: z.string().optional(),
      evolution: z.string().optional(),
    })
    .default({}),

  medicalHistory: z
    .object({
      hta: z.boolean().default(false),
      diabetes: z.boolean().default(false),
      hepatopathy: z.boolean().default(false),
      renalFailure: z.boolean().default(false),
      generalDisease: z.boolean().default(false),
      generalDiseaseType: z.string().optional(),

      knownCardiopathy: z.boolean().default(false),
      cardiopathyType: z.string().optional(),
      cardiopathyTreatment: z.string().optional(),
      cardiopathyEvolution: z.string().optional(),

      knownCancer: z.boolean().default(false),
      cancerTypeExtension: z.string().optional(),
      cancerTreatment: z.string().optional(),
      cancerEvolution: z
        .enum(["Guéri", "En rémission", "En progression", "Stade palliatif"])
        .optional(),

      chronicMedication: z.boolean().default(false),
      medicationMolecules: z.string().optional(),

      professionalExposure: z.boolean().default(false),
      exposureDescription: z.string().optional(),

      otherDiseases: z.boolean().default(false),
      otherDiseasesType: z.string().optional(),
    })
    .default({}),

  smoking: z
    .object({
      active: z.boolean().default(false),
      type: z
        .object({
          cigarette: z.boolean().default(false),
          chicha: z.boolean().default(false),
          chewingTobacco: z.boolean().default(false),
          sniffingTobacco: z.boolean().default(false),
        })
        .default({}),
      startAge: zNullableNumber.optional(),
      packYears: zNullableNumber.optional(),
      stopped: z.boolean().default(false),
      stoppedDuration: z.string().optional(),

      passive: z.boolean().default(false),
      passiveLocation: z
        .object({
          home: z.boolean().default(false),
          work: z.boolean().default(false),
          publicPlace: z.boolean().default(false),
        })
        .default({}),
    })
    .default({}),

  substanceUse: z
    .object({
      cannabis: z.boolean().default(false),
      cannabisFrequency: z.string().optional(),
      cannabisStopped: z.boolean().default(false),
      cannabisStoppedDuration: z.string().optional(),

      alcohol: z.boolean().default(false),
      alcoholStopped: z.boolean().default(false),
      alcoholStoppedDuration: z.string().optional(),
    })
    .default({}),

  otherHistory: z
    .object({
      gynecoObstetric: z.string().optional(),
      surgical: z.boolean().default(false),
      surgicalDetails: z.string().optional(),
      family: z.boolean().default(false),
      familyDetails: z.string().optional(),
    })
    .default({}),

  // Clinique
  clinicalExam: z
    .object({
      dyspnea: z.boolean().default(false),
      dyspneaSadoulStage: z.string().optional(),

      basiThoracicPain: z.boolean().default(false),
      painLocation: z.enum(["Droite", "Gauche", "Bilatérale"]).optional(),
      painType: z.string().optional(),

      cough: z.boolean().default(false),
      coughType: z.enum(["Sèche", "Productive"]).optional(),
      expectoration: z.string().optional(),

      hemoptysis: z.boolean().default(false),
      hemoptysisAbundance: z.enum(["Faible", "Moyenne", "Grande"]).optional(),

      otherSigns: z.boolean().default(false),
      otherSignsDescription: z.string().optional(),

      generalSigns: z
        .object({
          asthenia: z.boolean().default(false),
          amg: z.boolean().default(false),
          anorexia: z.boolean().default(false),
          fever: z.boolean().default(false),
        })
        .default({}),

      psOms: zNullableNumber.optional(),
      hemodynamicState: z.enum(["Stable", "Instable"]).optional(),
      sao2: z.enum([">95%", "<95%"]).optional(),
      respiratoryRate: z.enum(["<20", ">20"]).optional(),
      respiratoryStruggle: z.boolean().default(false),

      liquidEffusionSyndrome: z.boolean().default(false),
      liquidEffusionLocation: z
        .enum(["Droite", "Gauche", "Bilatérale"])
        .optional(),

      mixedEffusionSyndrome: z.boolean().default(false),
      mixedEffusionLocation: z
        .enum(["Droite", "Gauche", "Bilatérale"])
        .optional(),

      cardioExam: z.enum(["Normal", "Anormal"]).optional(),
      cardioExamDescription: z.string().optional(),

      abdominalExam: z.enum(["Normal", "Anormal"]).optional(),
      ascites: z.boolean().default(false),
      otherAbdominalFindings: z.string().optional(),

      lymphNodes: z.enum(["Libres", "ADP"]).optional(),
      lymphNodesLocation: z.string().optional(),

      otherExams: z.string().optional(),
    })
    .default({}),

  // Radiographie thoracique
  chestXRay: z
    .object({
      pleurisyLocation: z
        .enum(["Droite", "Gauche", "Bilatérale", "Autre"])
        .optional(),
      pleurisyLocationOther: z.string().optional(),
      abundance: z
        .enum(["Faible", "Moyenne", "Grande", "Thorax blanc"])
        .optional(),
      otherAnomalies: z.boolean().default(false),
      otherAnomaliesDescription: z.string().optional(),
    })
    .default({}),

  // Imagerie
  imaging: z
    .object({
      thoracicEcho: z.boolean().default(false),
      thoracicEchoResults: z.string().optional(),
      thoracicEchoImages: z.array(z.string()).optional(),

      thoracicCT: z.boolean().default(false),
      thoracicCTResults: z.string().optional(),
      thoracicCTImages: z.array(z.string()).optional(),

      abdominalEcho: z.boolean().default(false),
      abdominalEchoResults: z.string().optional(),
      abdominalEchoImages: z.array(z.string()).optional(),

      ett: z.boolean().default(false),
      ettResults: z.string().optional(),
      ettImages: z.array(z.string()).optional(),

      otherImaging: z.string().optional(),
      otherImagingImages: z.array(z.string()).optional(),
    })
    .default({}),

  // Ponction pleurale
  pleuralPuncture: z
    .object({
      date: z.string().optional(),
      state: z.string().optional(),
      aspect: z
        .object({
          clear: z.boolean().default(false),
          jc: z.boolean().default(false),
          yellow: z.boolean().default(false),
          seroHemorrhagic: z.boolean().default(false),
          hemorrhagic: z.boolean().default(false),
          troubled: z.boolean().default(false),
          chylous: z.boolean().default(false),
          purulent: z.boolean().default(false),
        })
        .default({}),

      biochemistry: z
        .object({
          proteins: zNullableNumber.optional(),
          ldh: zNullableNumber.optional(),
          glucose: zNullableNumber.optional(),
          others: z.string().optional(),
        })
        .default({}),

      cytology: z
        .object({
          redBloodCells: zNullableNumber.optional(),
          whiteBloodCells: zNullableNumber.optional(),
          lymphocytes: zNullableNumber.optional(),
          neutrophils: zNullableNumber.optional(),
          eosinophils: zNullableNumber.optional(),
        })
        .default({}),

      mycoBacteriology: z
        .object({
          bkED: z.boolean().default(false),
          bkEDResult: z.enum(["Positif", "Négatif"]).optional(),
          bkCulture: z.boolean().default(false),
          bkCultureResult: z.enum(["Positif", "Négatif"]).optional(),
          others: z.string().optional(),
        })
        .default({}),

      pleuralBiopsy: z.string().optional(),
      evacuatedAmount: zNullableNumber.optional(),
      anapathResults: z.string().optional(),
    })
    .default({}),

  // Biologie
  biology: z
    .object({
      idrt: z.boolean().default(false),
      idrtResult: zNullableNumber.optional(),

      quantiferon: z.boolean().default(false),
      quantiferonResult: z.enum(["Positif", "Négatif"]).optional(),

      bkEDSputum: z.boolean().default(false),
      bkEDSputumResult: z.string().optional(),

      bkCSputum: z.boolean().default(false),
      bkCSputumResult: z.string().optional(),

      geneXpert: z.boolean().default(false),
      geneXpertResult: z.string().optional(),

      cbc: z
        .object({
          hemoglobin: zNullableNumber.optional(),
          whiteBloodCells: zNullableNumber.optional(),
          neutrophils: zNullableNumber.optional(),
          lymphocytes: zNullableNumber.optional(),
          eosinophils: zNullableNumber.optional(),
          platelets: zNullableNumber.optional(),
        })
        .default({}),

      tp: zNullableNumber.optional(),
      dDimers: zNullableNumber.optional(),
      albuminemia: zNullableNumber.optional(),
      proteins: zNullableNumber.optional(),
      ldh: zNullableNumber.optional(),
      crp: zNullableNumber.optional(),
      esr: zNullableNumber.optional(),
      procalcitonin: zNullableNumber.optional(),
      hivSerology: z.enum(["Non demandée", "Positive", "Négative"]).optional(),
      urea: zNullableNumber.optional(),
      creatinine: zNullableNumber.optional(),
      bnp: z.boolean().default(false),
      bnpValue: zNullableNumber.optional(),
      glucose: zNullableNumber.optional(),
      proteinuria24h: z
        .enum(["Non demandée", "Positive", "Négative"])
        .optional(),

      liverFunction: z
        .object({
          alat: zNullableNumber.optional(),
          asat: zNullableNumber.optional(),
          ggt: zNullableNumber.optional(),
          alp: zNullableNumber.optional(),
          directBilirubin: zNullableNumber.optional(),
          indirectBilirubin: zNullableNumber.optional(),
        })
        .default({}),

      immunology: z.enum(["Non demandé", "Normal", "Anormal"]).optional(),
      immunologyDetails: z.string().optional(),

      otherBiology: z.string().optional(),
    })
    .default({}),

  // Autres bilans
  otherAssessments: z
    .object({
      bronchialFibroscopy: z
        .enum(["Non demandée", "Normale", "Anormale"])
        .optional(),
      bronchialFibroscopyDetails: z.string().optional(),
      postBronchoscopyAssessment: z.string().optional(),

      thoracoscopy: z.enum(["Non demandée", "Normale", "Anormale"]).optional(),
      thoracoscopyDetails: z.string().optional(),
      postThoracoscopyAssessment: z.string().optional(),

      otherAssessments: z.string().optional(),
    })
    .default({}),

  // Diagnostic retenu
  diagnosis: z
    .object({
      type: z
        .enum(["Tuberculose", "Métastase pleurale", "Autre", "Sans cause"])
        .optional(),
      primaryCancer: z.string().optional(),
      otherDiagnosis: z.string().optional(),
    })
    .default({}),

  // Traitement
  treatment: z
    .object({
      types: z
        .object({
          iterativePuncture: z.boolean().default(false),
          intraPleuralInfiltration: z.boolean().default(false),
          drainage: z.boolean().default(false),
          analgesics: z.boolean().default(false),
          antituberculosis: z.boolean().default(false),
          nonSpecificAntibiotherapy: z.boolean().default(false),
          guidedAntibiotherapy: z.boolean().default(false),
          pleuralPhysiotherapy: z.boolean().default(false),
          physiotherapySessions: zNullableNumber.optional(),
          surgery: z.boolean().default(false),
          surgeryType: z
            .object({
              talcage: z.boolean().default(false),
              refreshing: z.boolean().default(false),
              decortication: z.boolean().default(false),
            })
            .default({}),
          others: z.string().optional(),
        })
        .default({}),
      startDate: z.string().optional(),
      protocol: z.string().optional(),
    })
    .default({}),

  // Évolution
  evolution: z
    .object({
      outcome: z
        .object({
          iatrogenicComplication: z.boolean().default(false),
          parietalSuppuration: z.boolean().default(false),
          recovery: z.boolean().default(false),
          regression: z.boolean().default(false),
          encystment: z.boolean().default(false),
          pachypleuritis: z.boolean().default(false),
          recurrence: z.boolean().default(false),
          lostToFollowUp: z.boolean().default(false),
          death: z.boolean().default(false),
        })
        .default({}),
      otherDetails: z.string().optional(),
    })
    .default({}),
});
