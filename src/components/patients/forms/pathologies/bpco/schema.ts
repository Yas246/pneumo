import { z } from "zod";

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

export const bpcoSchema = z.object({
  // II. MOTIF DE CONSULTATION
  bpcoConsultationReason: z
    .object({
      chronicCough: z.boolean().default(false),
      chronicBronchitis: z.boolean().default(false),
      chronicDyspnea: z.boolean().default(false),
      acuteDyspneaAggravation: z.boolean().default(false),
      frequentRespiratoryInfections: z.boolean().default(false),
      other: z.boolean().default(false),
      otherDetails: z.string().optional(),
    })
    .default({}),

  // III. ANTÉCÉDENTS
  // Personnels médicaux - Antécédents respiratoires
  bpcoMedicalHistory: z
    .object({
      asthma: z.boolean().default(false),
      asthmaExacerbationsPerYear: zNullableNumber,
      bpco: z.boolean().default(false),
      bpcoExacerbationsPerYear: zNullableNumber,
      tuberculosis: z.boolean().default(false),
      pneumonias: z.boolean().default(false),
      recurrentRespiratoryInfections: z.boolean().default(false),
    })
    .default({}),

  // Exposition
  bpcoExposure: z
    .object({
      professionalPollutants: z.boolean().default(false),
      professionalPollutantsDetails: z.string().optional(),
      domesticPollutants: z.boolean().default(false),
      domesticPollutantsDetails: z.string().optional(),
      urbanPollutants: z.boolean().default(false),
      urbanPollutantsDetails: z.string().optional(),
    })
    .default({}),

  // Autres antécédents médicaux
  bpcoOtherMedicalHistory: z
    .object({
      gerd: z.boolean().default(false),
      hepatopathy: z.boolean().default(false),
      hepatopathyDetails: z.string().optional(),
      nephropathy: z.boolean().default(false),
      nephropathyDetails: z.string().optional(),
      cardiopathy: z.boolean().default(false),
      cardiopathyDetails: z.string().optional(),
      connectiveTissueDisease: z.boolean().default(false),
      connectiveTissueDiseaseDetails: z.string().optional(),
      neoplasia: z.boolean().default(false),
      neoplasiaDetails: z.string().optional(),
      other: z.string().optional(),
    })
    .default({}),

  // Antécédents chirurgicaux
  bpcoSurgicalHistory: z
    .object({
      details: z.string().optional(),
    })
    .default({}),

  // Vaccination
  bpcoVaccination: z
    .object({
      annualFlu: z.boolean().default(false),
      pneumococcus: z.boolean().default(false),
      sarsCov2: z.boolean().default(false),
    })
    .default({}),

  // Toxique
  bpcoToxicHistory: z
    .object({
      smokingStatus: z
        .enum(["", "Fumeur", "Ex-fumeur", "Non-fumeur"])
        .optional(),
      packYears: zNullableNumber,
      cannabis: z.boolean().default(false),
      alcohol: z.boolean().default(false),
    })
    .default({}),

  // Familiaux
  bpcoFamilyHistory: z
    .object({
      details: z.string().optional(),
    })
    .default({}),

  // IV. HISTOIRE DE LA MALADIE
  bpcoDiseaseHistory: z
    .object({
      firstSymptomsDate: z.string().optional(),
      evolution: z
        .enum(["", "Par poussées", "Continue", "Aggravation récente"])
        .optional(),
      triggeringFactors: z
        .object({
          tobacco: z.boolean().default(false),
          pollution: z.boolean().default(false),
          professional: z.boolean().default(false),
        })
        .default({}),
      exacerbationsPerYear: zNullableNumber,
      hospitalizationsForBpco: z.boolean().default(false),
      hospitalizationsCount: zNullableNumber,
      associatedSigns: z.string().optional(),
    })
    .default({}),

  // V. EXAMEN CLINIQUE
  // 1. État général
  bpcoGeneralState: z
    .object({
      performanceScore: z.string().optional(),
      consciousnessState: z
        .object({
          goodConsciousness: z.boolean().default(false),
          confusion: z.boolean().default(false),
        })
        .default({}),
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

  // 2. Appareil respiratoire
  bpcoRespiratorySystem: z
    .object({
      barrelChest: z.boolean().default(false),
      campbellSign: z.boolean().default(false),
      hooverSign: z.boolean().default(false),
      vesicularMurmur: z.enum(["", "conservé", "diminué"]).optional(),
      auscultationAbnormalities: z
        .object({
          crepitantRales: z.boolean().default(false),
          rhonchi: z.boolean().default(false),
          wheezes: z.boolean().default(false),
        })
        .default({}),
      respiratoryDistressSigns: z
        .object({
          dyspneaAtRest: z.boolean().default(false),
          orthopnea: z.boolean().default(false),
          chestRetraction: z.boolean().default(false),
          cyanosis: z.boolean().default(false),
        })
        .default({}),
      pleuropulmonarySyndromes: z
        .object({
          condensationSyndrome: z.boolean().default(false),
          pleuralSyndrome: z.boolean().default(false),
        })
        .default({}),
      syndromesLocation: z.string().optional(),
    })
    .default({}),

  // 3. Appareil cardiovasculaire
  bpcoCardiovascularSystem: z
    .object({
      regularHeartSounds: z.boolean().default(false),
      heartMurmur: z.boolean().default(false),
      heartMurmurTiming: z.enum(["", "Systolique", "Diastolique"]).optional(),
      heartMurmurLocation: z
        .object({
          apex: z.boolean().default(false),
          aortic: z.boolean().default(false),
          pulmonary: z.boolean().default(false),
          tricuspid: z.boolean().default(false),
        })
        .default({}),
      heartMurmurType: z
        .object({
          mitral: z.boolean().default(false),
          aortic: z.boolean().default(false),
          tricuspid: z.boolean().default(false),
          pulmonary: z.boolean().default(false),
        })
        .default({}),
      heartMurmurIntensity: zNullableNumber,
      heartMurmurRadiation: z.string().optional(),
      muffledSounds: z.boolean().default(false),
      pericardialFriction: z.boolean().default(false),
      irregularRhythm: z.boolean().default(false),
      lowerLimbEdema: z.boolean().default(false),
      hepatojugularReflux: z.boolean().default(false),
      jugularTurgescence: z.boolean().default(false),
      marbling: z.boolean().default(false),
    })
    .default({}),

  // 4. Appareil digestif
  bpcoDigestiveSystem: z
    .object({
      abdomenInspection: z
        .object({
          flat: z.boolean().default(false),
          distended: z.boolean().default(false),
          scars: z.boolean().default(false),
          hernia: z.boolean().default(false),
        })
        .default({}),
      abdomenPalpation: z
        .object({
          soft: z.boolean().default(false),
          defense: z.boolean().default(false),
          contracture: z.boolean().default(false),
          mass: z.boolean().default(false),
        })
        .default({}),
      hepatomegaly: z.boolean().default(false),
      hepatomegalySize: zNullableNumber,
      splenomegaly: z.boolean().default(false),
      splenomegalySize: zNullableNumber,
      abdomenPercussion: z
        .object({
          shiftingDullness: z.boolean().default(false),
          tympanism: z.boolean().default(false),
        })
        .default({}),
      abdomenAuscultation: z
        .object({
          normalSounds: z.boolean().default(false),
          silence: z.boolean().default(false),
          hyperperistalsis: z.boolean().default(false),
        })
        .default({}),
    })
    .default({}),

  // 5. Appareil urinaire
  bpcoUrinarySystem: z
    .object({
      diuresis: z.enum(["", "conservée", "Rétention"]).optional(),
      bladderGlobe: z.boolean().default(false),
      urinarySymptoms: z
        .object({
          pollakiuria: z.boolean().default(false),
          dysuria: z.boolean().default(false),
          hematuria: z.boolean().default(false),
          lumbarPain: z.boolean().default(false),
        })
        .default({}),
      urinalysisDone: z.boolean().default(false),
      urinalysisResult: z.string().optional(),
    })
    .default({}),

  // 6. Appareil locomoteur
  bpcoMusculoskeletalSystem: z
    .object({
      symptoms: z
        .object({
          jointPain: z.boolean().default(false),
          arthritis: z.boolean().default(false),
          myalgia: z.boolean().default(false),
          deformity: z.boolean().default(false),
        })
        .default({}),
      mobility: z.enum(["", "conservée", "Limitation"]).optional(),
      affectedJoints: z.string().optional(),
    })
    .default({}),

  // 7. Système nerveux
  bpcoNervousSystem: z
    .object({
      consciousness: z
        .enum(["", "Conscience claire", "Somnolence", "Coma"])
        .optional(),
      neurologicalSigns: z
        .object({
          headaches: z.boolean().default(false),
          vomiting: z.boolean().default(false),
          meningealRigidity: z.boolean().default(false),
        })
        .default({}),
      motorDeficit: z.string().optional(),
      sensoryDeficit: z.string().optional(),
      tendonReflexes: z.enum(["", "Normaux", "Abolis", "Exagérés"]).optional(),
      tendonReflexesDescription: z.string().optional(),
      balance: z
        .object({
          normal: z.boolean().default(false),
          romberg: z.boolean().default(false),
          ataxia: z.boolean().default(false),
        })
        .default({}),
    })
    .default({}),

  // 8. Peau et muqueuses
  bpcoSkinMucous: z
    .object({
      inspection: z
        .object({
          jaundice: z.boolean().default(false),
          cyanosis: z.boolean().default(false),
          petechiae: z.boolean().default(false),
          purpura: z.boolean().default(false),
          dehydration: z.boolean().default(false),
        })
        .default({}),
      skinLesions: z.string().optional(),
    })
    .default({}),

  // 9. ORL / Yeux / Bouche
  bpcoEntEyesMouth: z
    .object({
      conjunctiva: z.enum(["", "Normales", "Pâles", "Ictériques"]).optional(),
      oralCavity: z
        .object({
          hydratedMucous: z.boolean().default(false),
          dry: z.boolean().default(false),
          lesions: z.boolean().default(false),
        })
        .default({}),
      tonsils: z
        .enum(["", "Hypertrophiées", "Pultacées", "Normales"])
        .optional(),
      entSymptoms: z
        .object({
          earache: z.boolean().default(false),
          rhinorrhea: z.boolean().default(false),
          cervicalAdenopathy: z.boolean().default(false),
        })
        .default({}),
    })
    .default({}),

  // 10. Autres remarques
  bpcoOtherClinicalRemarks: z
    .object({
      details: z.string().optional(),
    })
    .default({}),

  // VI. EXAMENS COMPLÉMENTAIRES
  // Bilan à visée diagnostique
  bpcoDiagnosticTests: z
    .object({
      // EFR / spirométrie
      spirometry: z
        .object({
          vems: zNullableNumber,
          vemsCv: zNullableNumber,
          goldStage: zNullableNumber,
        })
        .default({}),
      // Pléthysmographie
      plethysmography: z
        .object({
          cpt: zNullableNumber,
          vr: zNullableNumber,
          crf: zNullableNumber,
          rva: zNullableNumber,
        })
        .default({}),
      // Imagerie - Rx thoracique
      chestXRay: z
        .object({
          image: z.string().optional(),
          result: z.enum(["", "Normal", "anormal"]).optional(),
          abnormalDetails: z
            .object({
              distensionSigns: z.boolean().default(false),
              bronchialSyndrome: z.boolean().default(false),
              emphysema: z.boolean().default(false),
            })
            .default({}),
          otherAbnormalities: z.string().optional(),
        })
        .default({}),
      // Biologie
      biology: z
        .object({
          cbc: z
            .object({
              hemoglobin: zNullableNumber,
              mcv: zNullableNumber,
              whiteBloodCells: zNullableNumber,
            })
            .default({}),
          biochemistry: z
            .object({
              creatinine: zNullableNumber,
              ast: zNullableNumber,
              alt: zNullableNumber,
              crp: zNullableNumber,
            })
            .default({}),
        })
        .default({}),
      // Imagerie - TDM thoracique
      chestCT: z
        .object({
          video: z.string().optional(),
          result: z.enum(["", "normal", "anormal"]).optional(),
          abnormalDetails: z
            .object({
              bronchialThickening: z.boolean().default(false),
              emphysema: z.boolean().default(false),
            })
            .default({}),
          associatedLesions: z.boolean().default(false),
          associatedLesionsDetails: z.string().optional(),
          otherAbnormalities: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // Bilan de retentissement
  bpcoImpactAssessment: z
    .object({
      // Gaz du sang
      bloodGas: z
        .object({
          ph: zNullableNumber,
          paO2: zNullableNumber,
          paCO2: zNullableNumber,
        })
        .default({}),
      // Épreuve d'effort
      exerciseTest: z
        .object({
          sixMinWalkTest: zNullableNumber,
          vo2Max: zNullableNumber,
        })
        .default({}),
      // Autres examens
      otherTests: z
        .object({
          details: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // VII. DIAGNOSTIC
  bpcoDiagnosis: z
    .object({
      bpcoStage: z
        .enum(["", "léger", "Modéré", "Sévère", "Très sévère"])
        .optional(),
      acuteExacerbation: z.boolean().default(false),
      bronchialSuperinfection: z.boolean().default(false),
      chronicRespiratoryFailure: z.boolean().default(false),
    })
    .default({}),

  // VIII. TRAITEMENT
  bpcoTreatment: z
    .object({
      maintenanceTreatment: z.string().optional(),
      prescribedTreatments: z
        .object({
          antibioticTherapy: z.boolean().default(false),
          oralCorticosteroids: z.boolean().default(false),
          respiratoryPhysiotherapy: z.boolean().default(false),
        })
        .default({}),
      longTermOxygenTherapy: z.boolean().default(false),
      therapeuticEducation: z.boolean().default(false),
      smokingCessationOffered: z.boolean().default(false),
    })
    .default({}),

  // IX. SUIVI
  bpcoFollowUp: z
    .object({
      lastConsultation: z.string().optional(),
      nextEvaluation: z.string().optional(),
      pneumologyFollowUp: z.boolean().default(false),
      vaccinationsUpToDate: z.boolean().default(false),
    })
    .default({}),
});

export type BPCOFormData = z.infer<typeof bpcoSchema>;
