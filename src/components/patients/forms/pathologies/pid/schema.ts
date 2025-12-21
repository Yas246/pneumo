import { z } from "zod";

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

export const pidSchema = z.object({
  // Motif d'admission
  pidAdmissionReason: z.string().optional(),

  // Antécédents toxiques
  pidToxicHistory: z
    .object({
      smoking: z
        .object({
          present: z.boolean().default(false),
          type: z
            .object({
              active: z.boolean().default(false),
              passive: z.boolean().default(false),
            })
            .default({}),
          packYears: zNullableNumber.optional(),
          startAge: zNullableNumber.optional(),
          stopped: z.boolean().default(false),
        })
        .default({}),
      alcoholism: z.boolean().default(false),
      drugAddiction: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      longTermMedication: z
        .object({
          present: z.boolean().default(false),
          products: z.string().optional(),
          duration: z.string().optional(),
        })
        .default({}),
      medicinalPlants: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // Antécédents médicaux
  pidMedicalHistory: z
    .object({
      tuberculosis: z
        .object({
          present: z.boolean().default(false),
          form: z.string().optional(),
          date: z.string().optional(),
          treatment: z.string().optional(),
          evolution: z.string().optional(),
        })
        .default({}),
      asthma: z
        .object({
          present: z.boolean().default(false),
          since: z.string().optional(),
        })
        .default({}),
      hypersensitivity: z.boolean().default(false),
      chronicBronchitis: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
          duration: z.string().optional(),
        })
        .default({}),
      otherRespiratoryDiseases: z.string().optional(),
      diabetes: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      hypertension: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      gerd: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      heartDisease: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      systemicDisease: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      neoplasia: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      gastroesophagealReflux: z.boolean().default(false),
      otherAntecedents: z.string().optional(),
    })
    .default({}),

  // Antécédents gynéco-obstétricaux (uniquement pour les femmes)
  pidGynecoObstetricHistory: z
    .object({
      menarche: z.string().optional(),
      cycle: z.enum(["", "Régulier", "Irrégulier"]).optional(),
      gestity: zNullableNumber.optional(),
      parity: zNullableNumber.optional(),
      contraceptives: z.string().optional(),
    })
    .default({}),

  // Mode de vie
  pidLifestyle: z
    .object({
      professionalExposure: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      avianContact: z
        .object({
          present: z.boolean().default(false),
          description: z.string().optional(),
        })
        .default({}),
      moltyHayContact: z.boolean().default(false),
      tropicalTravel: z
        .object({
          present: z.boolean().default(false),
          location: z.string().optional(),
        })
        .default({}),
      otherExposures: z.string().optional(),
    })
    .default({}),

  // Antécédents familiaux
  pidFamilyHistory: z
    .object({
      similarCaseInFamily: z.boolean().default(false),
      autoImmuneDisease: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // Histoire de la maladie
  pidDiseaseHistory: z
    .object({
      symptomsDuration: z.enum(["", "<3 semaines", ">3 semaines"]).optional(),
      installationMode: z.enum(["", "Brutal", "Progressif"]).optional(),
    })
    .default({}),

  // Signes respiratoires
  pidRespiratorySymptoms: z
    .object({
      cough: z
        .object({
          present: z.boolean().default(false),
          type: z.enum(["", "Sèche", "Productive"]).optional(),
          intensity: z
            .object({
              insomnia: z.boolean().default(false),
              emetic: z.boolean().default(false),
              painful: z.boolean().default(false),
              withUrinaryIncontinence: z.boolean().default(false),
            })
            .default({}),
          frequency: z.enum(["", "Permanente", "Saisonnière"]).optional(),
          timing: z.enum(["", "Nocturne", "Diurne"]).optional(),
          triggers: z
            .object({
              noFactor: z.boolean().default(false),
              tobacco: z.boolean().default(false),
              postMeal: z.boolean().default(false),
              duringMeal: z.boolean().default(false),
              decubitus: z.boolean().default(false),
              other: z.string().optional(),
            })
            .default({}),
        })
        .default({}),
      dyspnea: z
        .object({
          present: z.boolean().default(false),
          sadoulStage: z.enum(["", "I", "II", "III", "IV"]).optional(),
          type: z.enum(["", "Permanente", "Paroxystique"]).optional(),
          circumstances: z
            .object({
              effort: z.boolean().default(false),
              rest: z.boolean().default(false),
              decubitus: z.boolean().default(false),
              other: z.string().optional(),
            })
            .default({}),
        })
        .default({}),
      chestPain: z
        .object({
          present: z.boolean().default(false),
          location: z
            .object({
              right: z.boolean().default(false),
              left: z.boolean().default(false),
              bilateral: z.boolean().default(false),
            })
            .default({}),
          site: z
            .object({
              medioThoracic: z.boolean().default(false),
              basiThoracic: z.boolean().default(false),
              retrosternal: z.boolean().default(false),
              diffuse: z.boolean().default(false),
            })
            .default({}),
          type: z
            .object({
              oppression: z.boolean().default(false),
              constrictive: z.boolean().default(false),
              burning: z.boolean().default(false),
              other: z.string().optional(),
            })
            .default({}),
          triggers: z.string().optional(),
        })
        .default({}),
      hemoptysis: z
        .object({
          present: z.boolean().default(false),
          abundance: z.enum(["", "Faible", "Moyenne", "Grande"]).optional(),
        })
        .default({}),
      expectoration: z
        .object({
          present: z.boolean().default(false),
          frequency: z.enum(["", "Permanente", "Intermittente"]).optional(),
          timing: z.enum(["", "Matinal", "Non matinal"]).optional(),
          quality: z
            .enum(["", "Muqueuse", "Muco-purulente", "Purulente"])
            .optional(),
          quantity: z.enum(["", "Grande", "Faible"]).optional(),
          odor: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // Signes extra-respiratoires
  pidExtraRespiratorySymptoms: z
    .object({
      arthralgia: z
        .object({
          present: z.boolean().default(false),
          type: z.enum(["", "Inflammatoire", "Mécanique"]).optional(),
        })
        .default({}),
      xerophthalmia: z.boolean().default(false),
      xerostomia: z.boolean().default(false),
      cutaneousSigns: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      neurologicalSigns: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      digestiveSigns: z
        .object({
          present: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // Signes généraux
  pidGeneralSigns: z
    .object({
      asthenia: z.boolean().default(false),
      anorexia: z.boolean().default(false),
      weightLoss: z
        .object({
          present: z.boolean().default(false),
          quantified: z
            .object({
              present: z.boolean().default(false),
              value: zNullableNumber.optional(),
            })
            .default({}),
        })
        .default({}),
      fever: z
        .object({
          present: z.boolean().default(false),
          quantified: z
            .object({
              present: z.boolean().default(false),
              value: zNullableNumber.optional(),
            })
            .default({}),
        })
        .default({}),
      nightSweats: z.boolean().default(false),
    })
    .default({}),

  // Examen clinique
  pidClinicalExam: z
    .object({
      inspection: z.string().optional(),
      palpation: z.string().optional(),
      percussion: z.string().optional(),
      auscultation: z.string().optional(),
      extrapulmonaryExam: z
        .object({
          cardiovascular: z.string().optional(),
          abdominal: z.string().optional(),
          neurological: z.string().optional(),
          osteoarticular: z.string().optional(),
          cutaneous: z.string().optional(),
          lymphNodes: z.string().optional(),
          otherFindings: z.string().optional(),
        })
        .default({}),
      pleuroPulmonaryExam: z
        .object({
          normal: z.boolean().default(false),
        })
        .default({}),
      lymphNodes: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      cardiovascularExam: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      cutaneousExam: z
        .object({
          normal: z.boolean().default(false),
          symptoms: z.array(z.string()).optional(),
          location: z.string().optional(),
          type: z.string().optional(),
          details: z.string().optional(),
        })
        .default({}),
      ent: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      jointExam: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      neurologicalExam: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      abdominalExam: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      ophthalmologicExam: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      renalExam: z
        .object({
          normal: z.boolean().default(false),
          details: z.string().optional(),
        })
        .default({}),
      generalExam: z
        .object({
          normal: z.boolean().default(false),
          weight: zNullableNumber.optional(),
          height: zNullableNumber.optional(),
          bmi: zNullableNumber.optional(),
          temperature: zNullableNumber.optional(),
          bloodPressure: z.string().optional(),
          heartRate: zNullableNumber.optional(),
          respiratoryRate: zNullableNumber.optional(),
          saturation: zNullableNumber.optional(),
        })
        .default({}),
    })
    .default({}),

  // Examens complémentaires
  pidComplementaryExams: z
    .object({
      chestXRay: z
        .object({
          done: z.boolean().default(false),
          date: z.string().optional(),
          normalFindings: z.string().optional(),
          type: z.string().optional(),
          location: z.string().optional(),
          distribution: z.string().optional(),
          imageFiles: z.array(z.string()).optional(),
        })
        .default({}),
      chestCT: z
        .object({
          done: z.boolean().default(false),
          date: z.string().optional(),
          findings: z.string().optional(),
          location: z.string().optional(),
          type: z.string().optional(),
          distribution: z.string().optional(),
          imageFiles: z.array(z.string()).optional(),
        })
        .default({}),
      handXRay: z
        .object({
          done: z.boolean().default(false),
          findings: z.string().optional(),
          imageFiles: z.array(z.string()).optional(),
        })
        .default({}),
      sinusCT: z
        .object({
          done: z.boolean().default(false),
          findings: z.string().optional(),
          imageFiles: z.array(z.string()).optional(),
        })
        .default({}),
      biology: z
        .object({
          cbc: z
            .object({
              done: z.boolean().default(false),
              hemoglobin: zNullableNumber.optional(),
              mcv: zNullableNumber.optional(),
              whiteBloodCells: zNullableNumber.optional(),
              neutrophils: zNullableNumber.optional(),
              eosinophils: zNullableNumber.optional(),
              lymphocytes: zNullableNumber.optional(),
              platelets: zNullableNumber.optional(),
            })
            .default({}),
          biochemistry: z
            .object({
              done: z.boolean().default(false),
              creatinine: zNullableNumber.optional(),
              clearance: zNullableNumber.optional(),
              ast: zNullableNumber.optional(),
              alt: zNullableNumber.optional(),
              crp: zNullableNumber.optional(),
              vs: zNullableNumber.optional(),
            })
            .default({}),
          immunology: z
            .object({
              done: z.boolean().default(false),
              anca: z.string().optional(),
              ana: z.string().optional(),
              rheumatoidFactor: z.string().optional(),
              antiCcp: z.string().optional(),
              otherDetails: z.string().optional(),
            })
            .default({}),
          viralSerology: z
            .object({
              done: z.boolean().default(false),
              hiv: z.string().optional(),
              hbv: z.string().optional(),
              hcv: z.string().optional(),
            })
            .default({}),
        })
        .default({}),
      microbiology: z
        .object({
          done: z.boolean().default(false),
          bkSputum: z.string().optional(),
          ecbc: z.string().optional(),
          pcr: z.string().optional(),
          tuberculosisTest: z.string().optional(),
          otherTests: z.string().optional(),
        })
        .default({}),
      bronchoscopy: z
        .object({
          done: z.boolean().default(false),
          findings: z.string().optional(),
          bal: z.string().optional(),
          bronchialEndoscopy: z.string().optional(),
        })
        .default({}),
      histology: z
        .object({
          done: z.boolean().default(false),
          lymphNodeBiopsy: z.string().optional(),
          pleuralBiopsy: z.string().optional(),
          skinBiopsy: z.string().optional(),
          otherBiopsy: z.string().optional(),
        })
        .default({}),
      phthisiology: z
        .object({
          done: z.boolean().default(false),
          result: z.string().optional(),
        })
        .default({}),
      functionalAssessment: z
        .object({
          done: z.boolean().default(false),
          pulmonaryFunctionTest: z.string().optional(),
          ecg: z.string().optional(),
          echocardiography: z.string().optional(),
          walkTest: z.string().optional(),
          bloodGas: z.string().optional(),
          efr: z.string().optional(),
        })
        .default({}),
    })
    .default({}),

  // Diagnostic final
  pidFinalDiagnosis: z
    .object({
      diagnosisType: z
        .object({
          idiopathicPulmonaryFibrosis: z.boolean().default(false),
          sarcoidosis: z.boolean().default(false),
          rheumatoidArthritis: z.boolean().default(false),
          hypersensitivityPneumonitis: z.boolean().default(false),
          scleroderma: z.boolean().default(false),
          mixedConnectiveTissueDisease: z.boolean().default(false),
          drugInducedIld: z.boolean().default(false),
          indeterminateIld: z.boolean().default(false),
          other: z
            .object({
              present: z.boolean().default(false),
              details: z.string().optional(),
            })
            .default({}),
        })
        .default({}),
    })
    .default({}),
});

export type PIDFormData = z.infer<typeof pidSchema>;
