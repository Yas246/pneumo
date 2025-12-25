/**
 * Configuration PDF générée automatiquement
 * Généré le: 2025-12-24T11:42:32.323Z
 * Ne pas modifier manuellement - utiliser scripts/generate-pdf-config.js
 */

export interface PDFFieldConfig {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'enum';
  required: boolean;
}

export interface PDFSectionConfig {
  title: string;
  fields: string[];
  layout: 'list' | 'grid';
}

export interface PDFPathologyConfig {
  sections: Record<string, PDFSectionConfig>;
}

export const PDF_CONFIG: Record<string, PDFPathologyConfig> = {
  "sleep": {
    "sections": {
      "consultationReason": {
        "title": "Motif de consultation",
        "fields": [],
        "layout": "list"
      },
      "diurnalSymptoms": {
        "title": "Symptômes diurnes",
        "fields": [
          "diurnalSymptoms.excessiveSleepiness",
          "diurnalSymptoms.headaches",
          "diurnalSymptoms.asthenia",
          "diurnalSymptoms.epworthScore",
          "diurnalSymptoms.epworthDetails"
        ],
        "layout": "list"
      },
      "nocturnalSymptoms": {
        "title": "Symptômes nocturnes",
        "fields": [
          "nocturnalSymptoms.snoring",
          "nocturnalSymptoms.sleepApnea",
          "nocturnalSymptoms.choking",
          "nocturnalSymptoms.agitation",
          "nocturnalSymptoms.insomnia",
          "nocturnalSymptoms.nocturia",
          "nocturnalSymptoms.other"
        ],
        "layout": "list"
      },
      "symptomsDuration": {
        "title": "Durée des symptômes",
        "fields": [],
        "layout": "list"
      },
      "personalHistory": {
        "title": "Antécédents personnels",
        "fields": [
          "personalHistory.obesity",
          "personalHistory.hta",
          "personalHistory.orl",
          "personalHistory.neuro",
          "personalHistory.smoking",
          "personalHistory.alcoholism",
          "personalHistory.diabetes",
          "personalHistory.cardiovascularDiseases",
          "personalHistory.lifestyle",
          "personalHistory.respiratoryPathology",
          "personalHistory.currentMedications"
        ],
        "layout": "list"
      },
      "familyHistory": {
        "title": "Antécédents familiaux",
        "fields": [
          "familyHistory.saosHistory",
          "familyHistory.respiratoryPathologies"
        ],
        "layout": "list"
      },
      "clinicalExam": {
        "title": "Examen clinique",
        "fields": [
          "clinicalExam.weight",
          "clinicalExam.height",
          "clinicalExam.bmi",
          "clinicalExam.neckCircumference",
          "clinicalExam.abdominalPerimeter",
          "clinicalExam.bloodPressure",
          "clinicalExam.heartRate",
          "clinicalExam.saturation",
          "clinicalExam.pulmonaryAuscultation"
        ],
        "layout": "grid"
      },
      "orlExam": {
        "title": "Examen ORL",
        "fields": [
          "orlExam.vasAnatomy",
          "orlExam.nasalObstruction",
          "orlExam.amygdalineHypertrophy",
          "orlExam.retrognathia",
          "orlExam.micromandible",
          "orlExam.macroglossia"
        ],
        "layout": "grid"
      },
      "complementaryExams": {
        "title": "Examens complémentaires",
        "fields": [
          "complementaryExams.polygraphyDate",
          "complementaryExams.iah",
          "complementaryExams.iahCentral",
          "complementaryExams.oxygenDesaturation",
          "complementaryExams.ct90",
          "complementaryExams.gazometryDate",
          "complementaryExams.ph",
          "complementaryExams.pao2",
          "complementaryExams.paco2",
          "complementaryExams.hco3",
          "complementaryExams.sao2",
          "complementaryExams.efrDate",
          "complementaryExams.cvf",
          "complementaryExams.vems",
          "complementaryExams.dlco",
          "complementaryExams.cpt"
        ],
        "layout": "grid"
      },
      "diagnosis": {
        "title": "Diagnostic",
        "fields": [
          "diagnosis.saos",
          "diagnosis.sacs",
          "diagnosis.soh",
          "diagnosis.nocturalHypoventilation",
          "diagnosis.simpleSnoring"
        ],
        "layout": "list"
      },
      "treatment": {
        "title": "Traitement",
        "fields": [
          "treatment.weightLoss",
          "treatment.alcoholAndSedativesStop",
          "treatment.sleepHygieneImprovement",
          "treatment.notes"
        ],
        "layout": "list"
      },
      "ppcFollowUp": {
        "title": "Suivi PPC",
        "fields": [
          "ppcFollowUp.ppcPrescribingDoctor",
          "ppcFollowUp.ppcStartDate",
          "ppcFollowUp.deviceModel",
          "ppcFollowUp.deviceSupplier",
          "ppcFollowUp.initialPressure",
          "ppcFollowUp.ventilationMode",
          "ppcFollowUp.humidifier",
          "ppcFollowUp.maskType",
          "ppcFollowUp.maskModel",
          "ppcFollowUp.maskSize",
          "ppcFollowUp.serialNumber",
          "ppcFollowUp.provider",
          "ppcFollowUp.otherAccessories"
        ],
        "layout": "list"
      }
    }
  },
  "bpco": {
    "sections": {
      "bpcoConsultationReason": {
        "title": "Motif de consultation",
        "fields": [
          "bpcoConsultationReason.chronicCough",
          "bpcoConsultationReason.chronicBronchitis",
          "bpcoConsultationReason.chronicDyspnea",
          "bpcoConsultationReason.acuteDyspneaAggravation",
          "bpcoConsultationReason.frequentRespiratoryInfections",
          "bpcoConsultationReason.other"
        ],
        "layout": "list"
      },
      "bpcoMedicalHistory": {
        "title": "Antécédents médicaux",
        "fields": [
          "bpcoMedicalHistory.asthma",
          "bpcoMedicalHistory.asthmaExacerbationsPerYear",
          "bpcoMedicalHistory.bpco",
          "bpcoMedicalHistory.bpcoExacerbationsPerYear",
          "bpcoMedicalHistory.tuberculosis",
          "bpcoMedicalHistory.pneumonia",
          "bpcoMedicalHistory.recurrentRespiratoryInfections",
          "bpcoMedicalHistory.professionalPollutants",
          "bpcoMedicalHistory.domesticPollutants",
          "bpcoMedicalHistory.urbanPollutants",
          "bpcoMedicalHistory.rgo",
          "bpcoMedicalHistory.hepatopathy",
          "bpcoMedicalHistory.nephropathy",
          "bpcoMedicalHistory.cardiopathy",
          "bpcoMedicalHistory.connectiveTissue",
          "bpcoMedicalHistory.neoplasia",
          "bpcoMedicalHistory.other",
          "bpcoMedicalHistory.surgicalHistory",
          "bpcoMedicalHistory.vaccinations",
          "bpcoMedicalHistory.smokingStatus",
          "bpcoMedicalHistory.paquetsAnnees",
          "bpcoMedicalHistory.cannabis",
          "bpcoMedicalHistory.alcohol"
        ],
        "layout": "list"
      },
      "bpcoClinicalExam": {
        "title": "Examen clinique",
        "fields": [
          "bpcoClinicalExam.performanceScore",
          "bpcoClinicalExam.goodConsciousness",
          "bpcoClinicalExam.confusion",
          "bpcoClinicalExam.asthenia",
          "bpcoClinicalExam.generalStateAlteration"
        ],
        "layout": "grid"
      },
      "bpcoDiseaseHistory": {
        "title": "Histoire de la maladie",
        "fields": [
          "bpcoDiseaseHistory.firstSymptomsDate",
          "bpcoDiseaseHistory.evolution",
          "bpcoDiseaseHistory.tobacco",
          "bpcoDiseaseHistory.pollution",
          "bpcoDiseaseHistory.professional"
        ],
        "layout": "list"
      },
      "bpcoDiagnosticTests": {
        "title": "Bilan à visée diagnostique",
        "fields": [
          "bpcoDiagnosticTests.vems",
          "bpcoDiagnosticTests.vemsCv",
          "bpcoDiagnosticTests.goldStage"
        ],
        "layout": "grid"
      },
      "bpcoImpactAssessment": {
        "title": "Bilan de retentissement",
        "fields": [
          "bpcoImpactAssessment.ph",
          "bpcoImpactAssessment.paO2",
          "bpcoImpactAssessment.paCO2"
        ],
        "layout": "list"
      },
      "bpcoTreatment": {
        "title": "Traitement",
        "fields": [
          "bpcoTreatment.maintenance",
          "bpcoTreatment.prescribedTreatments",
          "bpcoTreatment.longTermOxygen",
          "bpcoTreatment.therapeuticEducation",
          "bpcoTreatment.smokingCessation"
        ],
        "layout": "list"
      },
      "bpcoFollowUp": {
        "title": "Suivi",
        "fields": [
          "bpcoFollowUp.lastConsultation",
          "bpcoFollowUp.nextEvaluation",
          "bpcoFollowUp.pneumologyFollowUp",
          "bpcoFollowUp.vaccinationsUpToDate"
        ],
        "layout": "list"
      },
      "bpcoComplementaryExams": {
        "title": "Examens complémentaires",
        "fields": [
          "bpcoComplementaryExams.vems",
          "bpcoComplementaryExams.vemsCvf",
          "bpcoComplementaryExams.goldStage",
          "bpcoComplementaryExams.cpt",
          "bpcoComplementaryExams.vr",
          "bpcoComplementaryExams.crf",
          "bpcoComplementaryExams.ph",
          "bpcoComplementaryExams.pao2",
          "bpcoComplementaryExams.paco2"
        ],
        "layout": "grid"
      }
    }
  },
  "asthma": {
    "sections": {
      "asthmaConsultationReason": {
        "title": "Motif de consultation",
        "fields": [],
        "layout": "list"
      },
      "asthmaMedicalHistory": {
        "title": "Antécédents médicaux",
        "fields": [],
        "layout": "list"
      },
      "asthmaDiseaseHistory": {
        "title": "Histoire de la maladie",
        "fields": [],
        "layout": "list"
      },
      "asthmaGeneralState": {
        "title": "État général",
        "fields": [],
        "layout": "list"
      },
      "asthmaRespiratorySystem": {
        "title": "Appareil respiratoire",
        "fields": [],
        "layout": "list"
      },
      "asthmaCardiovascularSystem": {
        "title": "Appareil cardiovasculaire",
        "fields": [],
        "layout": "list"
      },
      "asthmaDigestiveSystem": {
        "title": "Appareil digestif",
        "fields": [],
        "layout": "list"
      },
      "asthmaUrinarySystem": {
        "title": "Appareil urinaire",
        "fields": [],
        "layout": "list"
      },
      "asthmaMusculoskeletalSystem": {
        "title": "Appareil musculo-squelettique",
        "fields": [],
        "layout": "list"
      },
      "asthmaNervousSystem": {
        "title": "Système nerveux",
        "fields": [],
        "layout": "list"
      },
      "asthmaSkinMucous": {
        "title": "Peau et muqueuses",
        "fields": [],
        "layout": "list"
      },
      "asthmaOrlEyesMouth": {
        "title": "ORL, yeux, bouche",
        "fields": [],
        "layout": "list"
      },
      "asthmaComplementaryExams": {
        "title": "Examens complémentaires",
        "fields": [],
        "layout": "grid"
      },
      "asthmaSeverityClassification": {
        "title": "Classification de sévérité",
        "fields": [],
        "layout": "list"
      },
      "asthmaTreatment": {
        "title": "Traitement",
        "fields": [],
        "layout": "list"
      },
      "asthmaFollowUp": {
        "title": "Suivi",
        "fields": [],
        "layout": "list"
      }
    }
  },
  "ddb": {
    "sections": {
      "ddbConsultationReason": {
        "title": "Motif de consultation",
        "fields": [],
        "layout": "list"
      },
      "ddbMedicalHistory": {
        "title": "Antécédents médicaux",
        "fields": [],
        "layout": "list"
      },
      "ddbToxicHistory": {
        "title": "Antécédents toxiques",
        "fields": [],
        "layout": "list"
      },
      "ddbDiseaseHistory": {
        "title": "Histoire de la maladie",
        "fields": [],
        "layout": "list"
      },
      "ddbRespiratorySymptoms": {
        "title": "Symptômes respiratoires",
        "fields": [],
        "layout": "list"
      },
      "ddbExtraRespiratorySymptoms": {
        "title": "Symptômes extra-respiratoires",
        "fields": [],
        "layout": "list"
      },
      "ddbPhysicalSigns": {
        "title": "Signes physiques",
        "fields": [],
        "layout": "list"
      },
      "ddbComplementaryExams": {
        "title": "Examens complémentaires",
        "fields": [],
        "layout": "grid"
      },
      "ddbConclusion": {
        "title": "Conclusion",
        "fields": [],
        "layout": "list"
      },
      "ddbEtiology": {
        "title": "Étiologie",
        "fields": [],
        "layout": "list"
      },
      "ddbTreatment": {
        "title": "Traitements envisagés",
        "fields": [],
        "layout": "list"
      },
      "ddbFollowUp": {
        "title": "Suivi",
        "fields": [],
        "layout": "list"
      }
    }
  },
  "tbk": {
    "sections": {
      "tbkConsultationReason": {
        "title": "Motif d'hospitalisation",
        "fields": [],
        "layout": "list"
      },
      "tbkComorbidities": {
        "title": "Comorbidités",
        "fields": [],
        "layout": "list"
      },
      "tbkPersonalHistory": {
        "title": "ATCD personnels",
        "fields": [],
        "layout": "list"
      },
      "tbkRecentContagion": {
        "title": "Contage récent",
        "fields": [],
        "layout": "list"
      },
      "tbkToxicHabits": {
        "title": "Habitudes toxiques",
        "fields": [],
        "layout": "list"
      },
      "tbkDiseaseHistory": {
        "title": "Histoire de la maladie",
        "fields": [],
        "layout": "list"
      },
      "tbkGeneralSigns": {
        "title": "Signes généraux",
        "fields": [],
        "layout": "list"
      },
      "tbkFunctionalSigns": {
        "title": "Signes fonctionnels",
        "fields": [],
        "layout": "list"
      },
      "tbkClinicalExam": {
        "title": "Examen clinique",
        "fields": [],
        "layout": "grid"
      },
      "tbkChestXRay": {
        "title": "Rx thoracique",
        "fields": [],
        "layout": "list"
      },
      "tbkSputumBacteriology": {
        "title": "Bactériologie expectorations",
        "fields": [],
        "layout": "list"
      },
      "tbkBkGenetics": {
        "title": "Génétique BK",
        "fields": [],
        "layout": "list"
      },
      "tbkBiology": {
        "title": "Biologie",
        "fields": [],
        "layout": "list"
      },
      "tbkOtherAssessments": {
        "title": "Autres bilans",
        "fields": [],
        "layout": "list"
      },
      "tbkPrescribedTreatment": {
        "title": "Traitement prescrit",
        "fields": [],
        "layout": "list"
      },
      "tbkSerumDosage": {
        "title": "Dosage sérique AT",
        "fields": [],
        "layout": "list"
      },
      "tbkEvolution": {
        "title": "Évolution",
        "fields": [],
        "layout": "list"
      },
      "tbkDischargeConclusion": {
        "title": "Conclusion de sortie",
        "fields": [],
        "layout": "list"
      }
    }
  },
  "pleuralEffusion": {
    "sections": {
      "pleuralEffusionConsultationReason": {
        "title": "Motif de consultation",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionMedicalHistory": {
        "title": "Antécédents médicaux",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionBiology": {
        "title": "Biologie",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionChestXRay": {
        "title": "Radiographie thoracique",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionClinicalExam": {
        "title": "Examen clinique",
        "fields": [],
        "layout": "grid"
      },
      "pleuralEffusionDiagnosis": {
        "title": "Diagnostic",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionEvolution": {
        "title": "Évolution",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionImaging": {
        "title": "Imagerie",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionOtherAssessments": {
        "title": "Autres bilans",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionPleuralPuncture": {
        "title": "Ponction pleurale",
        "fields": [],
        "layout": "list"
      },
      "pleuralEffusionTreatment": {
        "title": "Traitement",
        "fields": [],
        "layout": "list"
      }
    }
  },
  "pid": {
    "sections": {
      "pidAdmissionReason": {
        "title": "Motif d'admission",
        "fields": [],
        "layout": "list"
      },
      "pidMedicalHistory": {
        "title": "Antécédents médicaux",
        "fields": [],
        "layout": "list"
      },
      "pidToxicHistory": {
        "title": "Antécédents toxiques",
        "fields": [],
        "layout": "list"
      },
      "pidFamilyHistory": {
        "title": "Antécédents familiaux",
        "fields": [],
        "layout": "list"
      },
      "pidLifestyle": {
        "title": "Mode de vie",
        "fields": [],
        "layout": "list"
      },
      "pidGynecoObstetricHistory": {
        "title": "Antécédents gynéco-obstétricaux",
        "fields": [],
        "layout": "list"
      },
      "pidGeneralSigns": {
        "title": "Signes généraux",
        "fields": [],
        "layout": "list"
      },
      "pidRespiratorySymptoms": {
        "title": "Symptômes respiratoires",
        "fields": [],
        "layout": "list"
      },
      "pidExtraRespiratorySymptoms": {
        "title": "Symptômes extra-respiratoires",
        "fields": [],
        "layout": "list"
      },
      "pidClinicalExam": {
        "title": "Examen clinique",
        "fields": [],
        "layout": "grid"
      },
      "pidComplementaryExams": {
        "title": "Examens complémentaires",
        "fields": [],
        "layout": "grid"
      },
      "pidFinalDiagnosis": {
        "title": "Diagnostic final",
        "fields": [],
        "layout": "list"
      }
    }
  },
  "pneumothorax": {
    "sections": {
      "pneumothoraxConsultationReason": {
        "title": "Motif de consultation",
        "fields": [],
        "layout": "list"
      },
      "pneumothoraxMedicalHistory": {
        "title": "Antécédents médicaux",
        "fields": [],
        "layout": "list"
      },
      "pneumothoraxDiseaseHistory": {
        "title": "Histoire de la maladie",
        "fields": [],
        "layout": "list"
      },
      "pneumothoraxClinicalExam": {
        "title": "Examen clinique",
        "fields": [],
        "layout": "grid"
      },
      "pneumothoraxComplementaryExams": {
        "title": "Examens complémentaires",
        "fields": [],
        "layout": "grid"
      },
      "pneumothoraxDiagnosis": {
        "title": "Diagnostic",
        "fields": [],
        "layout": "list"
      },
      "pneumothoraxTreatment": {
        "title": "Traitement",
        "fields": [],
        "layout": "list"
      },
      "pneumothoraxFollowUp": {
        "title": "Suivi",
        "fields": [],
        "layout": "list"
      },
      "pneumothoraxTreatmentDischarge": {
        "title": "Traitement et ordonnance / consignes de sortie",
        "fields": [],
        "layout": "list"
      }
    }
  },
  "lungCancer": {
    "sections": {
      "lungCancerConsultationReason": {
        "title": "Motif de consultation",
        "fields": [],
        "layout": "list"
      },
      "lungCancerMedicalHistory": {
        "title": "Antécédents médicaux et facteurs de risque",
        "fields": [],
        "layout": "list"
      },
      "lungCancerDiseaseHistory": {
        "title": "Histoire de la maladie",
        "fields": [],
        "layout": "list"
      },
      "lungCancerClinicalExam": {
        "title": "Examen clinique",
        "fields": [],
        "layout": "grid"
      },
      "lungCancerComplementaryExams": {
        "title": "Examens complémentaires",
        "fields": [],
        "layout": "grid"
      },
      "lungCancerDiagnosis": {
        "title": "Diagnostic",
        "fields": [],
        "layout": "list"
      },
      "lungCancerManagement": {
        "title": "Prise en charge",
        "fields": [],
        "layout": "list"
      },
      "lungCancerFollowUp": {
        "title": "Surveillance évolutive",
        "fields": [],
        "layout": "list"
      },
      "lungCancerTreatmentDischarge": {
        "title": "Traitement et ordonnance / consignes de sortie",
        "fields": [],
        "layout": "list"
      }
    }
  }
};

export type PDFConfig = typeof PDF_CONFIG;
