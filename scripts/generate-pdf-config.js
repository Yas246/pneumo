#!/usr/bin/env node

/**
 * Script de génération automatique de la configuration PDF
 * Analyse tous les schémas Zod des pathologies et génère PatientPDFConfig.ts
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des libellés français pour les champs
const FIELD_LABELS = {
  // Informations personnelles
  firstName: "Prénom",
  lastName: "Nom",
  birthDate: "Date de naissance",
  sex: "Sexe",
  address: "Adresse",
  phone: "Téléphone",
  email: "Email",
  profession: "Profession",
  socialSecurity: "Couverture sociale",
  treatingDoctor: "Médecin traitant",

  // Consultation
  consultationReason: "Motif de consultation",
  symptomsDuration: "Durée des symptômes",

  // Symptômes
  excessiveSleepiness: "Somnolence excessive",
  headaches: "Céphalées",
  asthenia: "Asthénie",
  epworthScore: "Score d'Epworth",
  snoring: "Ronflement",
  sleepApnea: "Apnées du sommeil",
  choking: "Étouffements",
  agitation: "Agitation",
  insomnia: "Insomnie",
  nocturia: "Nycturie",

  // Examens cliniques
  weight: "Poids",
  height: "Taille",
  bmi: "IMC",
  bloodPressure: "Tension artérielle",
  heartRate: "Fréquence cardiaque",
  pulmonaryAuscultation: "Auscultation pulmonaire",
  saturation: "Saturation",

  // Examens complémentaires
  polygraphyDate: "Date de polygraphie",
  iah: "IAH",
  iahCentral: "IAH Central",
  oxygenDesaturation: "Désaturation O2",
  ct90: "CT90",
  gazometryDate: "Date de gazométrie",
  ph: "pH",
  pao2: "PaO2",
  paco2: "PaCO2",
  hco3: "HCO3",
  sao2: "SaO2",
  efrDate: "Date d'EFR",
  cvf: "CVF",
  vems: "VEMS",
  dlco: "DLCO",
  cpt: "CPT",
};

// Configuration des sections par pathologie
const PATHOLOGY_SECTIONS = {
  asthma: [
    {
      key: "consultation",
      title: "Motif de consultation",
      keywords: ["consultationReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux",
      keywords: ["medicalHistory"],
    },
    {
      key: "diseaseHistory",
      title: "Histoire de la maladie",
      keywords: ["diseaseHistory"],
    },
    { key: "generalState", title: "État général", keywords: ["generalState"] },
    {
      key: "respiratorySystem",
      title: "Appareil respiratoire",
      keywords: ["respiratorySystem"],
    },
    {
      key: "cardiovascularSystem",
      title: "Appareil cardiovasculaire",
      keywords: ["cardiovascularSystem"],
    },
    {
      key: "digestiveSystem",
      title: "Appareil digestif",
      keywords: ["digestiveSystem"],
    },
    {
      key: "urinarySystem",
      title: "Appareil urinaire",
      keywords: ["urinarySystem"],
    },
    {
      key: "musculoskeletalSystem",
      title: "Appareil musculo-squelettique",
      keywords: ["musculoskeletalSystem"],
    },
    {
      key: "nervousSystem",
      title: "Système nerveux",
      keywords: ["nervousSystem"],
    },
    { key: "skinMucous", title: "Peau et muqueuses", keywords: ["skinMucous"] },
    {
      key: "orlEyesMouth",
      title: "ORL, yeux, bouche",
      keywords: ["orlEyesMouth"],
    },
    {
      key: "complementaryExams",
      title: "Examens complémentaires",
      keywords: ["complementaryExams"],
    },
    {
      key: "severityClassification",
      title: "Classification de sévérité",
      keywords: ["severityClassification"],
    },
    { key: "treatment", title: "Traitement", keywords: ["treatment"] },
    { key: "followUp", title: "Suivi", keywords: ["followUp"] },
  ],
  bpco: [
    {
      key: "consultation",
      title: "Motif de consultation",
      keywords: ["consultationReason"],
    },
    {
      key: "comorbidities",
      title: "Comorbidités",
      keywords: ["comorbidities"],
    },
    {
      key: "personalHistory",
      title: "Antécédents personnels",
      keywords: ["personalTuberculosisHistory"],
    },
    {
      key: "recentContagion",
      title: "Contage récent",
      keywords: ["recentTuberculosisContagion"],
    },
    {
      key: "toxicHabits",
      title: "Habitudes toxiques",
      keywords: ["toxicHabits"],
    },
    {
      key: "generalSigns",
      title: "Signes généraux",
      keywords: ["generalSigns"],
    },
    {
      key: "functionalSigns",
      title: "Signes fonctionnels",
      keywords: ["functionalSigns"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["clinicalExam"],
    },
    {
      key: "chestXRay",
      title: "Radiographie thoracique",
      keywords: ["chestXRay"],
    },
    {
      key: "sputumBacteriology",
      title: "Bactériologie des expectorations",
      keywords: ["sputumBacteriology"],
    },
    { key: "genetics", title: "Génétique BK", keywords: ["bkGenetics"] },
    { key: "biology", title: "Biologie", keywords: ["biology"] },
    {
      key: "otherAssessments",
      title: "Autres bilans",
      keywords: ["otherAssessments"],
    },
    {
      key: "prescribedTreatment",
      title: "Traitement prescrit",
      keywords: ["prescribedTreatment"],
    },
    { key: "serumDosage", title: "Dosage sérique", keywords: ["serumDosage"] },
    { key: "evolution", title: "Évolution", keywords: ["evolution"] },
    {
      key: "dischargeConclusion",
      title: "Conclusion de sortie",
      keywords: ["dischargeConclusion"],
    },
  ],
  ddb: [
    {
      key: "consultation",
      title: "Motif de consultation",
      keywords: ["consultationReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux",
      keywords: ["medicalHistory"],
    },
    {
      key: "toxicHistory",
      title: "Antécédents toxiques",
      keywords: ["toxicHistory"],
    },
    {
      key: "diseaseHistory",
      title: "Histoire de la maladie",
      keywords: ["diseaseHistory"],
    },
    {
      key: "respiratorySymptoms",
      title: "Symptômes respiratoires",
      keywords: ["respiratorySymptoms"],
    },
    {
      key: "extraRespiratorySymptoms",
      title: "Symptômes extra-respiratoires",
      keywords: ["extraRespiratorySymptoms"],
    },
    {
      key: "physicalSigns",
      title: "Signes physiques",
      keywords: ["physicalSigns"],
    },
    {
      key: "complementaryExams",
      title: "Examens complémentaires",
      keywords: ["complementaryExams"],
    },
    { key: "conclusion", title: "Conclusion", keywords: ["conclusion"] },
    { key: "etiology", title: "Étiologie", keywords: ["etiology"] },
    {
      key: "treatment",
      title: "Traitements envisagés",
      keywords: ["treatment"],
    },
    { key: "followUp", title: "Suivi", keywords: ["followUp"] },
  ],
  tbk: [
    {
      key: "consultation",
      title: "Motif d'hospitalisation",
      keywords: ["consultationReason"],
    },
    {
      key: "comorbidities",
      title: "Comorbidités",
      keywords: ["comorbidities"],
    },
    {
      key: "personalHistory",
      title: "ATCD personnels",
      keywords: ["personalTuberculosisHistory"],
    },
    {
      key: "recentContagion",
      title: "Contage récent",
      keywords: ["recentTuberculosisContagion"],
    },
    {
      key: "toxicHabits",
      title: "Habitudes toxiques",
      keywords: ["toxicHabits"],
    },
    {
      key: "generalSigns",
      title: "Signes généraux",
      keywords: ["generalSigns"],
    },
    {
      key: "functionalSigns",
      title: "Signes fonctionnels",
      keywords: ["functionalSigns"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["clinicalExam"],
    },
    { key: "chestXRay", title: "Rx thoracique", keywords: ["chestXRay"] },
    {
      key: "sputumBacteriology",
      title: "Bactériologie expectorations",
      keywords: ["sputumBacteriology"],
    },
    { key: "bkGenetics", title: "Génétique BK", keywords: ["bkGenetics"] },
    { key: "biology", title: "Biologie", keywords: ["biology"] },
    {
      key: "otherAssessments",
      title: "Autres bilans",
      keywords: ["otherAssessments"],
    },
    {
      key: "prescribedTreatment",
      title: "Traitement prescrit",
      keywords: ["prescribedTreatment"],
    },
    {
      key: "serumDosage",
      title: "Dosage sérique AT",
      keywords: ["serumDosage"],
    },
    { key: "evolution", title: "Évolution", keywords: ["evolution"] },
    {
      key: "dischargeConclusion",
      title: "Conclusion de sortie",
      keywords: ["dischargeConclusion"],
    },
  ],
  sleep: [
    {
      key: "consultation",
      title: "Motif de consultation",
      keywords: ["consultationReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux",
      keywords: ["medicalHistory"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["clinicalExam"],
    },
    { key: "orlExam", title: "Examen ORL", keywords: ["orlExam"] },
    {
      key: "complementaryExams",
      title: "Examens complémentaires",
      keywords: ["complementaryExams"],
    },
    { key: "diagnosis", title: "Diagnostic", keywords: ["diagnosis"] },
    { key: "treatment", title: "Traitement", keywords: ["treatment"] },
    { key: "followUp", title: "Suivi", keywords: ["followUp"] },
  ],
  pleuralEffusion: [
    {
      key: "consultation",
      title: "Motif de consultation",
      keywords: ["consultationReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux",
      keywords: ["medicalHistory"],
    },
    { key: "biology", title: "Biologie", keywords: ["biology"] },
    {
      key: "chestXRay",
      title: "Radiographie thoracique",
      keywords: ["chestXRay"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["clinicalExam"],
    },
    { key: "diagnosis", title: "Diagnostic", keywords: ["diagnosis"] },
    { key: "evolution", title: "Évolution", keywords: ["evolution"] },
    { key: "imaging", title: "Imagerie", keywords: ["imaging"] },
    {
      key: "otherAssessments",
      title: "Autres bilans",
      keywords: ["otherAssessments"],
    },
    {
      key: "pleuralPuncture",
      title: "Ponction pleurale",
      keywords: ["pleuralPuncture"],
    },
    { key: "treatment", title: "Traitement", keywords: ["treatment"] },
  ],
  pid: [
    {
      key: "admissionReason",
      title: "Motif d'admission",
      keywords: ["admissionReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux",
      keywords: ["medicalHistory"],
    },
    {
      key: "toxicHistory",
      title: "Antécédents toxiques",
      keywords: ["toxicHistory"],
    },
    {
      key: "familyHistory",
      title: "Antécédents familiaux",
      keywords: ["familyHistory"],
    },
    { key: "lifestyle", title: "Mode de vie", keywords: ["lifestyle"] },
    {
      key: "gynecoObstetricHistory",
      title: "Antécédents gynéco-obstétricaux",
      keywords: ["gynecoObstetricHistory"],
    },
    {
      key: "generalSigns",
      title: "Signes généraux",
      keywords: ["generalSigns"],
    },
    {
      key: "respiratorySymptoms",
      title: "Symptômes respiratoires",
      keywords: ["respiratorySymptoms"],
    },
    {
      key: "extraRespiratorySymptoms",
      title: "Symptômes extra-respiratoires",
      keywords: ["extraRespiratorySymptoms"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["clinicalExam"],
    },
    {
      key: "complementaryExams",
      title: "Examens complémentaires",
      keywords: ["complementaryExams"],
    },
    {
      key: "finalDiagnosis",
      title: "Diagnostic final",
      keywords: ["finalDiagnosis"],
    },
  ],
  pneumothorax: [
    {
      key: "consultationReason",
      title: "Motif de consultation",
      keywords: ["ConsultationReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux",
      keywords: ["MedicalHistory"],
    },
    {
      key: "diseaseHistory",
      title: "Histoire de la maladie",
      keywords: ["DiseaseHistory"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["ClinicalExam"],
    },
    {
      key: "complementaryExams",
      title: "Examens complémentaires",
      keywords: ["ComplementaryExams"],
    },
    {
      key: "diagnosis",
      title: "Diagnostic",
      keywords: ["Diagnosis"],
    },
    {
      key: "treatment",
      title: "Traitement",
      keywords: ["Management"],
    },
    {
      key: "followUp",
      title: "Suivi",
      keywords: ["Monitoring"],
    },
    {
      key: "treatmentDischarge",
      title: "Traitement et ordonnance / consignes de sortie",
      keywords: ["TreatmentDischarge"],
    },
  ],
  lungCancer: [
    {
      key: "consultationReason",
      title: "Motif de consultation",
      keywords: ["lungCancerConsultationReason"],
    },
    {
      key: "medicalHistory",
      title: "Antécédents médicaux et facteurs de risque",
      keywords: ["lungCancerMedicalHistory"],
    },
    {
      key: "diseaseHistory",
      title: "Histoire de la maladie",
      keywords: ["lungCancerDiseaseHistory"],
    },
    {
      key: "clinicalExam",
      title: "Examen clinique",
      keywords: ["lungCancerClinicalExam"],
    },
    {
      key: "complementaryExams",
      title: "Examens complémentaires",
      keywords: ["lungCancerComplementaryExams"],
    },
    {
      key: "diagnosis",
      title: "Diagnostic",
      keywords: ["lungCancerDiagnosis"],
    },
    {
      key: "treatment",
      title: "Prise en charge",
      keywords: ["lungCancerManagement"],
    },
    {
      key: "followUp",
      title: "Surveillance évolutive",
      keywords: ["lungCancerFollowUp"],
    },
    {
      key: "treatmentDischarge",
      title: "Traitement et ordonnance / consignes de sortie",
      keywords: ["lungCancerTreatmentDischarge"],
    },
  ],
};

/**
 * Extrait récursivement tous les champs d'un schéma Zod
 */
function extractSchemaFields(schema, path = "", fields = []) {
  if (!schema || !schema._def) return fields;

  const shape = schema._def.shape || {};

  Object.entries(shape).forEach(([key, fieldSchema]) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (fieldSchema._def && fieldSchema._def.typeName === "ZodObject") {
      // Champ objet imbriqué - continuer la récursion
      extractSchemaFields(fieldSchema, currentPath, fields);
    } else {
      // Champ simple
      fields.push({
        key: currentPath,
        label: FIELD_LABELS[key] || generateLabelFromKey(key),
        type: getFieldType(fieldSchema),
        required: !fieldSchema._def || fieldSchema._def.optional !== true,
      });
    }
  });

  return fields;
}

/**
 * Génère un libellé à partir d'une clé camelCase
 */
function generateLabelFromKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Détermine le type de champ
 */
function getFieldType(fieldSchema) {
  if (!fieldSchema || !fieldSchema._def) return "string";

  const typeName = fieldSchema._def.typeName;

  switch (typeName) {
    case "ZodString":
      return "string";
    case "ZodNumber":
      return "number";
    case "ZodBoolean":
      return "boolean";
    case "ZodDate":
      return "date";
    case "ZodArray":
      return "array";
    case "ZodEnum":
      return "enum";
    default:
      return "string";
  }
}

/**
 * Groupe les champs par sections selon la pathologie
 */
function groupFieldsBySections(fields, pathology) {
  const sections = PATHOLOGY_SECTIONS[pathology] || [];
  const grouped = {};

  sections.forEach((section) => {
    grouped[section.key] = {
      title: section.title,
      fields: fields
        .filter((field) =>
          section.keywords.some((keyword) =>
            field.key.toLowerCase().includes(keyword.toLowerCase())
          )
        )
        .map((field) => field.key),
      layout: getOptimalLayout(section.key),
    };
  });

  return grouped;
}

/**
 * Détermine le layout optimal pour une section
 */
function getOptimalLayout(sectionKey) {
  const gridSections = ["complementaryExams", "clinicalExam", "biology"];
  return gridSections.includes(sectionKey) ? "grid" : "list";
}

/**
 * Génère la configuration PDF complète
 */
function generatePDFConfig() {
  console.log("🔍 Analyse des schémas de pathologies...");

  const config = {};

  Object.keys(PATHOLOGY_SECTIONS).forEach((pathology) => {
    console.log(`📋 Traitement de la pathologie: ${pathology}`);

    try {
      // Importer dynamiquement le schéma de la pathologie
      const schemaPath = path.join(
        __dirname,
        "..",
        "src",
        "components",
        "patients",
        "forms",
        "pathologies",
        `${pathology}`,
        "schema.ts"
      );

      // Pour les modules ES, on ne peut pas utiliser require
      // On va analyser le fichier directement
      const schemaContent = fs.readFileSync(schemaPath, "utf8");

      // Extraire tous les champs du schéma en analysant le contenu
      const fields = extractFieldsFromSchemaContent(schemaContent, pathology);

      config[pathology] = {
        sections: groupFieldsBySections(fields, pathology),
      };
    } catch (error) {
      console.warn(
        `⚠️ Impossible d'analyser le schéma ${pathology}:`,
        error.message
      );
      // Fallback vers des champs mockés
      const mockFields = [
        {
          key: `${pathology}ConsultationReason.consultationReason`,
          label: "Motif de consultation",
          type: "string",
          required: false,
        },
      ];

      config[pathology] = {
        sections: groupFieldsBySections(mockFields, pathology),
      };
    }
  });

  return config;
}

/**
 * Extrait les champs d'un schéma en analysant le contenu du fichier
 */
function extractFieldsFromSchemaContent(content, pathology) {
  const fields = [];

  // Chercher les objets de schéma dans le contenu
  const schemaObjects = content.match(/(\w+)\s*=\s*z\.object\(\{[\s\S]*?\}\)/g);

  if (!schemaObjects) return fields;

  schemaObjects.forEach((schemaMatch) => {
    const objectName = schemaMatch.match(/^(\w+)\s*=/)?.[1];
    if (!objectName) return;

    // Extraire les champs de cet objet
    const fieldsMatch = schemaMatch.match(/\{([\s\S]*?)\}/);
    if (!fieldsMatch) return;

    const fieldsContent = fieldsMatch[1];

    // Analyser chaque champ
    const fieldMatches = fieldsContent.match(/(\w+):\s*z\.\w+\([^)]*\)/g);
    if (fieldMatches) {
      fieldMatches.forEach((fieldMatch) => {
        const fieldName = fieldMatch.match(/^(\w+):/)?.[1];
        const fieldType = fieldMatch.match(/z\.(\w+)/)?.[1];

        if (fieldName && fieldType) {
          const fullKey = `${pathology}${
            objectName.charAt(0).toUpperCase() + objectName.slice(1)
          }.${fieldName}`;

          fields.push({
            key: fullKey,
            label: FIELD_LABELS[fieldName] || generateLabelFromKey(fieldName),
            type: getFieldTypeFromString(fieldType),
            required: !fieldMatch.includes(".optional()"),
          });
        }
      });
    }
  });

  return fields;
}

/**
 * Détermine le type de champ à partir d'une chaîne
 */
function getFieldTypeFromString(typeString) {
  switch (typeString) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "date":
      return "date";
    case "array":
      return "array";
    case "enum":
      return "enum";
    default:
      return "string";
  }
}

/**
 * Génère le fichier de configuration TypeScript
 */
function generateConfigFile(config) {
  const content = `/**
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

  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "components",
    "patients",
    "PatientPDFConfig.ts"
  );
  fs.writeFileSync(outputPath, content, "utf8");
  console.log(`✅ Configuration PDF générée: ${outputPath}`);
}

// Exécution du script
console.log("🚀 Démarrage du script de génération PDF...");
try {
  const config = generatePDFConfig();
  console.log("📊 Configuration générée:", Object.keys(config));
  generateConfigFile(config);
  console.log("🎉 Génération terminée avec succès!");
} catch (error) {
  console.error("❌ Erreur lors de la génération:", error);
  console.error("Stack:", error.stack);
  process.exit(1);
}

export { extractSchemaFields, generatePDFConfig, groupFieldsBySections };
