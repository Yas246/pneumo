/**
 * Script de génération de configuration PDF pour toutes les pathologies
 * Analyse les types TypeScript pour extraire tous les champs et générer la configuration
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping des sections françaises par pathologie
const SECTION_TITLES = {
  sleep: {
    consultationReason: "Motif de consultation",
    diurnalSymptoms: "Symptômes diurnes",
    nocturnalSymptoms: "Symptômes nocturnes",
    symptomsDuration: "Durée des symptômes",
    personalHistory: "Antécédents personnels",
    familyHistory: "Antécédents familiaux",
    clinicalExam: "Examen clinique",
    orlExam: "Examen ORL",
    complementaryExams: "Examens complémentaires",
    diagnosis: "Diagnostic",
    treatment: "Traitement",
    ppcFollowUp: "Suivi PPC",
  },
  bpco: {
    bpcoConsultationReason: "Motif de consultation",
    bpcoMedicalHistory: "Antécédents médicaux",
    bpcoClinicalExam: "Examen clinique",
    bpcoDiseaseHistory: "Histoire de la maladie",
    bpcoDiagnosticTests: "Bilan à visée diagnostique",
    bpcoImpactAssessment: "Bilan de retentissement",
    bpcoTreatment: "Traitement",
    bpcoFollowUp: "Suivi",
    bpcoComplementaryExams: "Examens complémentaires",
  },
  asthma: {
    asthmaConsultationReason: "Motif de consultation",
    asthmaMedicalHistory: "Antécédents médicaux",
    asthmaDiseaseHistory: "Histoire de la maladie",
    asthmaGeneralState: "État général",
    asthmaRespiratorySystem: "Appareil respiratoire",
    asthmaCardiovascularSystem: "Appareil cardiovasculaire",
    asthmaDigestiveSystem: "Appareil digestif",
    asthmaUrinarySystem: "Appareil urinaire",
    asthmaMusculoskeletalSystem: "Appareil musculo-squelettique",
    asthmaNervousSystem: "Système nerveux",
    asthmaSkinMucous: "Peau et muqueuses",
    asthmaOrlEyesMouth: "ORL, yeux, bouche",
    asthmaComplementaryExams: "Examens complémentaires",
    asthmaSeverityClassification: "Classification de sévérité",
    asthmaTreatment: "Traitement",
    asthmaFollowUp: "Suivi",
  },
  ddb: {
    ddbConsultationReason: "Motif de consultation",
    ddbMedicalHistory: "Antécédents médicaux",
    ddbToxicHistory: "Antécédents toxiques",
    ddbDiseaseHistory: "Histoire de la maladie",
    ddbRespiratorySymptoms: "Symptômes respiratoires",
    ddbExtraRespiratorySymptoms: "Symptômes extra-respiratoires",
    ddbPhysicalSigns: "Signes physiques",
    ddbComplementaryExams: "Examens complémentaires",
    ddbConclusion: "Conclusion",
    ddbEtiology: "Étiologie",
    ddbTreatment: "Traitements envisagés",
    ddbFollowUp: "Suivi",
  },
  tbk: {
    tbkConsultationReason: "Motif d'hospitalisation",
    tbkComorbidities: "Comorbidités",
    tbkPersonalHistory: "ATCD personnels",
    tbkRecentContagion: "Contage récent",
    tbkToxicHabits: "Habitudes toxiques",
    tbkDiseaseHistory: "Histoire de la maladie",
    tbkGeneralSigns: "Signes généraux",
    tbkFunctionalSigns: "Signes fonctionnels",
    tbkClinicalExam: "Examen clinique",
    tbkChestXRay: "Rx thoracique",
    tbkSputumBacteriology: "Bactériologie expectorations",
    tbkBkGenetics: "Génétique BK",
    tbkBiology: "Biologie",
    tbkOtherAssessments: "Autres bilans",
    tbkPrescribedTreatment: "Traitement prescrit",
    tbkSerumDosage: "Dosage sérique AT",
    tbkEvolution: "Évolution",
    tbkDischargeConclusion: "Conclusion de sortie",
  },
  pleuralEffusion: {
    pleuralEffusionConsultationReason: "Motif de consultation",
    pleuralEffusionMedicalHistory: "Antécédents médicaux",
    pleuralEffusionBiology: "Biologie",
    pleuralEffusionChestXRay: "Radiographie thoracique",
    pleuralEffusionClinicalExam: "Examen clinique",
    pleuralEffusionDiagnosis: "Diagnostic",
    pleuralEffusionEvolution: "Évolution",
    pleuralEffusionImaging: "Imagerie",
    pleuralEffusionOtherAssessments: "Autres bilans",
    pleuralEffusionPleuralPuncture: "Ponction pleurale",
    pleuralEffusionTreatment: "Traitement",
  },
  pid: {
    pidAdmissionReason: "Motif d'admission",
    pidMedicalHistory: "Antécédents médicaux",
    pidToxicHistory: "Antécédents toxiques",
    pidFamilyHistory: "Antécédents familiaux",
    pidLifestyle: "Mode de vie",
    pidGynecoObstetricHistory: "Antécédents gynéco-obstétricaux",
    pidGeneralSigns: "Signes généraux",
    pidRespiratorySymptoms: "Symptômes respiratoires",
    pidExtraRespiratorySymptoms: "Symptômes extra-respiratoires",
    pidClinicalExam: "Examen clinique",
    pidComplementaryExams: "Examens complémentaires",
    pidFinalDiagnosis: "Diagnostic final",
  },
  pneumothorax: {
    pneumothoraxConsultationReason: "Motif de consultation",
    pneumothoraxMedicalHistory: "Antécédents médicaux",
    pneumothoraxDiseaseHistory: "Histoire de la maladie",
    pneumothoraxClinicalExam: "Examen clinique",
    pneumothoraxComplementaryExams: "Examens complémentaires",
    pneumothoraxDiagnosis: "Diagnostic",
    pneumothoraxTreatment: "Traitement",
    pneumothoraxFollowUp: "Suivi",
    pneumothoraxTreatmentDischarge:
      "Traitement et ordonnance / consignes de sortie",
  },
  lungCancer: {
    lungCancerConsultationReason: "Motif de consultation",
    lungCancerMedicalHistory: "Antécédents médicaux et facteurs de risque",
    lungCancerDiseaseHistory: "Histoire de la maladie",
    lungCancerClinicalExam: "Examen clinique",
    lungCancerComplementaryExams: "Examens complémentaires",
    lungCancerDiagnosis: "Diagnostic",
    lungCancerManagement: "Prise en charge",
    lungCancerFollowUp: "Surveillance évolutive",
    lungCancerTreatmentDischarge:
      "Traitement et ordonnance / consignes de sortie",
  },
};

// Préfixes des champs par pathologie
const PATHOLOGY_PREFIXES = {
  sleep: [
    "consultationReason",
    "diurnalSymptoms",
    "nocturnalSymptoms",
    "symptomsDuration",
    "personalHistory",
    "familyHistory",
    "clinicalExam",
    "orlExam",
    "complementaryExams",
    "diagnosis",
    "treatment",
    "ppcFollowUp",
  ],
  bpco: [
    "bpcoConsultationReason",
    "bpcoMedicalHistory",
    "bpcoClinicalExam",
    "bpcoDiseaseHistory",
    "bpcoDiagnosticTests",
    "bpcoImpactAssessment",
    "bpcoTreatment",
    "bpcoFollowUp",
    "bpcoComplementaryExams",
  ],
  asthma: [
    "asthmaConsultationReason",
    "asthmaMedicalHistory",
    "asthmaDiseaseHistory",
    "asthmaGeneralState",
    "asthmaRespiratorySystem",
    "asthmaCardiovascularSystem",
    "asthmaDigestiveSystem",
    "asthmaUrinarySystem",
    "asthmaMusculoskeletalSystem",
    "asthmaNervousSystem",
    "asthmaSkinMucous",
    "asthmaOrlEyesMouth",
    "asthmaComplementaryExams",
    "asthmaSeverityClassification",
    "asthmaTreatment",
    "asthmaFollowUp",
  ],
  ddb: [
    "ddbConsultationReason",
    "ddbMedicalHistory",
    "ddbToxicHistory",
    "ddbDiseaseHistory",
    "ddbRespiratorySymptoms",
    "ddbExtraRespiratorySymptoms",
    "ddbPhysicalSigns",
    "ddbComplementaryExams",
    "ddbConclusion",
    "ddbEtiology",
    "ddbTreatment",
    "ddbFollowUp",
  ],
  tbk: [
    "tbkConsultationReason",
    "tbkComorbidities",
    "tbkPersonalHistory",
    "tbkRecentContagion",
    "tbkToxicHabits",
    "tbkDiseaseHistory",
    "tbkGeneralSigns",
    "tbkFunctionalSigns",
    "tbkClinicalExam",
    "tbkChestXRay",
    "tbkSputumBacteriology",
    "tbkBkGenetics",
    "tbkBiology",
    "tbkOtherAssessments",
    "tbkPrescribedTreatment",
    "tbkSerumDosage",
    "tbkEvolution",
    "tbkDischargeConclusion",
  ],
  pleuralEffusion: [
    "pleuralEffusionConsultationReason",
    "pleuralEffusionMedicalHistory",
    "pleuralEffusionBiology",
    "pleuralEffusionChestXRay",
    "pleuralEffusionClinicalExam",
    "pleuralEffusionDiagnosis",
    "pleuralEffusionEvolution",
    "pleuralEffusionImaging",
    "pleuralEffusionOtherAssessments",
    "pleuralEffusionPleuralPuncture",
    "pleuralEffusionTreatment",
  ],
  pid: [
    "pidAdmissionReason",
    "pidMedicalHistory",
    "pidToxicHistory",
    "pidFamilyHistory",
    "pidLifestyle",
    "pidGynecoObstetricHistory",
    "pidGeneralSigns",
    "pidRespiratorySymptoms",
    "pidExtraRespiratorySymptoms",
    "pidClinicalExam",
    "pidComplementaryExams",
    "pidFinalDiagnosis",
  ],
  pneumothorax: [
    "pneumothoraxConsultationReason",
    "pneumothoraxMedicalHistory",
    "pneumothoraxDiseaseHistory",
    "pneumothoraxClinicalExam",
    "pneumothoraxComplementaryExams",
    "pneumothoraxDiagnosis",
    "pneumothoraxTreatment",
    "pneumothoraxFollowUp",
    "pneumothoraxTreatmentDischarge",
  ],
  lungCancer: [
    "lungCancerConsultationReason",
    "lungCancerMedicalHistory",
    "lungCancerDiseaseHistory",
    "lungCancerClinicalExam",
    "lungCancerComplementaryExams",
    "lungCancerDiagnosis",
    "lungCancerManagement",
    "lungCancerFollowUp",
    "lungCancerTreatmentDischarge",
  ],
};

// Fonction pour lire le fichier de types
function readPatientTypes() {
  const typesPath = path.join(__dirname, "..", "src", "types", "patient.ts");

  if (!fs.existsSync(typesPath)) {
    console.log(`⚠️  Fichier de types non trouvé: ${typesPath}`);
    return null;
  }

  const typesContent = fs.readFileSync(typesPath, "utf-8");
  return typesContent;
}

// Fonction pour extraire les champs imbriqués d'une propriété d'objet TypeScript
function extractNestedFields(typesContent, propertyPrefix) {
  const fields = [];

  // Chercher la définition de la propriété dans l'interface Patient
  // Pattern: propertyName?: { ... }
  const propertyPattern = new RegExp(
    `${propertyPrefix}\\??:\\s*\\{([\\s\\S]*?)\\n\\s*\\};`,
    "g"
  );
  const match = propertyPattern.exec(typesContent);

  if (match) {
    const propertyContent = match[1];

    // Extraire tous les champs imbriqués
    // Pattern: fieldName: type;
    const fieldPattern = /(\w+)\??:\s*[^;]+;/g;
    let fieldMatch;

    while ((fieldMatch = fieldPattern.exec(propertyContent)) !== null) {
      const fieldName = fieldMatch[1];
      const fullKey = `${propertyPrefix}.${fieldName}`;

      // Ignorer les commentaires
      if (!fieldName.startsWith("//")) {
        fields.push(fullKey);
      }
    }
  }

  return fields;
}

// Fonction pour extraire les champs imbriqués profonds (3 niveaux)
function extractDeepNestedFields(typesContent, propertyPrefix) {
  const fields = [];

  // Chercher la définition de la propriété
  const propertyPattern = new RegExp(
    `${propertyPrefix}\\??:\\s*\\{([\\s\\S]*?)\\n\\s*\\};`,
    "g"
  );
  const match = propertyPattern.exec(typesContent);

  if (match) {
    const propertyContent = match[1];

    // Extraire les champs de premier niveau
    const fieldPattern = /(\w+)\??:\s*\{([\s\S]*?)\n\s*\}/g;
    let fieldMatch;

    while ((fieldMatch = fieldPattern.exec(propertyContent)) !== null) {
      const fieldName = fieldMatch[1];
      const nestedContent = fieldMatch[2];

      // Extraire les champs de deuxième niveau
      const nestedFieldPattern = /(\w+)\??:\s*[^;]+;/g;
      let nestedFieldMatch;

      while (
        (nestedFieldMatch = nestedFieldPattern.exec(nestedContent)) !== null
      ) {
        const nestedFieldName = nestedFieldMatch[1];
        const fullKey = `${propertyPrefix}.${fieldName}.${nestedFieldName}`;

        if (!nestedFieldName.startsWith("//")) {
          fields.push(fullKey);
        }
      }
    }

    // Extraire les champs simples de premier niveau (non imbriqués)
    const simpleFieldPattern = /(\w+)\??:\s*[^{;]+;/g;
    let simpleFieldMatch;

    while (
      (simpleFieldMatch = simpleFieldPattern.exec(propertyContent)) !== null
    ) {
      const fieldName = simpleFieldMatch[1];
      const fullKey = `${propertyPrefix}.${fieldName}`;

      if (!fieldName.startsWith("//")) {
        fields.push(fullKey);
      }
    }
  }

  return fields;
}

// Fonction principale de génération
function generatePDFConfig() {
  console.log("🚀 Démarrage du script de génération PDF...");

  const typesContent = readPatientTypes();

  if (!typesContent) {
    console.log("❌ Impossible de lire le fichier de types");
    return;
  }

  const config = {};

  for (const [pathology, prefixes] of Object.entries(PATHOLOGY_PREFIXES)) {
    console.log(`📝 Génération de la configuration pour ${pathology}...`);

    const sectionConfig = {};
    const sectionTitles = SECTION_TITLES[pathology] || {};

    for (const prefix of prefixes) {
      const title = sectionTitles[prefix] || prefix;

      // Extraire les champs imbriqués
      const fields = extractDeepNestedFields(typesContent, prefix);

      sectionConfig[prefix] = {
        title: title,
        fields: fields,
        layout:
          prefix.toLowerCase().includes("exam") ||
          prefix.toLowerCase().includes("clinical") ||
          prefix.toLowerCase().includes("complementary") ||
          prefix.toLowerCase().includes("diagnostic")
            ? "grid"
            : "list",
      };

      console.log(`   ✓ ${prefix}: ${fields.length} champs trouvés`);
    }

    config[pathology] = { sections: sectionConfig };
  }

  // Générer le fichier TypeScript
  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "components",
    "patients",
    "PatientPDFConfig.ts"
  );

  const tsContent = `/**
 * Configuration PDF générée automatiquement
 * Généré le: ${new Date().toISOString()}
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

export const PDF_CONFIG: Record<string, PDFPathologyConfig> = ${JSON.stringify(
    config,
    null,
    2
  )};

export type PDFConfig = typeof PDF_CONFIG;
`;

  fs.writeFileSync(outputPath, tsContent, "utf-8");
  console.log(`✅ Configuration PDF générée: ${outputPath}`);
  console.log(`🎉 Génération terminée avec succès!`);
}

// Exécuter la génération
generatePDFConfig();
