/**
 * Utilitaires d'extraction et de formatage des champs pour le PDF
 */

import type { Patient } from "@/types/patient";

// Type étendu pour les patients avec champs dynamiques par pathologie
export interface ExtendedPatient extends Patient {
  pleuralEffusionDiagnosis?: {
    type?: string;
    etiology?: string;
  };
  pleuralEffusionTreatment?: {
    conservative?: string;
    drainage?: string;
    surgical?: string;
    specificTreatment?: string;
  };
  bpcoConsultationReason?: {
    chronicCough?: boolean;
    chronicBronchitis?: boolean;
    chronicDyspnea?: boolean;
    acuteDyspneaAggravation?: boolean;
    frequentRespiratoryInfections?: boolean;
    other?: string;
  };
  // Autres champs étendus peuvent être ajoutés selon les besoins
  [key: string]: unknown;
}

/**
 * Récupère une valeur imbriquée dans un objet en utilisant un chemin en pointillés
 */
export function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((current, key) => {
    return current &&
      typeof current === "object" &&
      current !== null &&
      key in current
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj);
}

/**
 * Vérifie si une valeur est définie et non vide
 */
export function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

/**
 * Formate une valeur selon son type pour l'affichage PDF
 */
export function formatFieldValue(value: unknown, type: string): string {
  if (!hasValue(value)) return "Non renseigné";

  switch (type) {
    case "date":
      try {
        return new Date(value as string | number | Date).toLocaleDateString(
          "fr-FR"
        );
      } catch {
        return String(value);
      }

    case "number":
      const num = Number(value);
      return isNaN(num) ? String(value) : num.toString();

    case "boolean":
      return value ? "Oui" : "Non";

    case "array":
      if (Array.isArray(value)) {
        return value.filter((item) => hasValue(item)).join(", ");
      }
      return String(value);

    case "enum":
      // Pour les enums, on peut avoir des mappings spécifiques
      return formatEnumValue(value);

    default:
      return String(value);
  }
}

/**
 * Formate les valeurs d'enum de manière plus lisible
 */
function formatEnumValue(value: unknown): string {
  // Mappings spécifiques pour certains enums médicaux
  const enumMappings: Record<string, string> = {
    M: "Masculin",
    F: "Féminin",
    active: "Actif",
    archived: "Archivé",
    Aucun: "Aucun",
    // Grades GOLD pour BPCO
    "1": "GOLD 1 - Léger",
    "2": "GOLD 2 - Modéré",
    "3": "GOLD 3 - Sévère",
    "4": "GOLD 4 - Très sévère",
    // Types de sévérité asthme
    intermittent: "Asthme intermittent",
    persistent: "Asthme persistant",
    // ... autres mappings selon besoin
  };

  return enumMappings[String(value)] || String(value);
}

/**
 * Calcule l'âge à partir de la date de naissance
 */
export function calculateAge(birthDate: string): number {
  if (!birthDate) return 0;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Calcule l'IMC si poids et taille sont disponibles
 */
export function calculateBMI(weight: number, height: number): number | null {
  if (!weight || !height || height <= 0) return null;

  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
}

/**
 * Extrait tous les champs pertinents pour une pathologie donnée
 */
export function extractPathologyFields(
  patient: ExtendedPatient,
  pathology: string
): Record<string, unknown> {
  const pathologyData: Record<string, unknown> = {};

  // Extraction basée sur les patterns de nommage des champs
  Object.keys(patient).forEach((key) => {
    if (key.startsWith(pathology)) {
      pathologyData[key] = patient[key];
    }
  });

  return pathologyData;
}

/**
 * Vérifie si une section doit être affichée (au moins un champ avec valeur)
 */
export function shouldDisplaySection(
  patient: ExtendedPatient,
  fieldKeys: string[]
): boolean {
  return fieldKeys.some((fieldKey) => {
    const value = getNestedValue(patient, fieldKey);
    return hasValue(value);
  });
}

/**
 * Trie les champs d'une section selon un ordre logique
 */
export function sortSectionFields(fields: string[]): string[] {
  // Ordre de priorité pour l'affichage
  const priorityOrder = [
    "consultationReason",
    "reason",
    "diagnosis",
    "treatment",
    "followUp",
    "weight",
    "height",
    "bmi",
    "date",
    "result",
    "value",
  ];

  return fields.sort((a, b) => {
    const aPriority = priorityOrder.findIndex((term) =>
      a.toLowerCase().includes(term)
    );
    const bPriority = priorityOrder.findIndex((term) =>
      b.toLowerCase().includes(term)
    );

    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority;
    }
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    return a.localeCompare(b);
  });
}

/**
 * Normalise les données du patient pour l'affichage PDF
 */
export function normalizePatientData(
  patient: ExtendedPatient
): ExtendedPatient {
  const normalized = { ...patient };

  // Calcul automatique de l'IMC si possible
  if (
    patient.clinicalExam?.weight &&
    patient.clinicalExam?.height &&
    !patient.clinicalExam.bmi
  ) {
    const bmi = calculateBMI(
      patient.clinicalExam.weight,
      patient.clinicalExam.height
    );
    if (bmi) {
      normalized.clinicalExam = {
        ...normalized.clinicalExam,
        bmi,
      };
    }
  }

  // Normalisation des dates
  if (patient.birthDate) {
    try {
      normalized.birthDate = new Date(patient.birthDate)
        .toISOString()
        .split("T")[0];
    } catch {
      // Garder la valeur originale si parsing échoue
    }
  }

  return normalized;
}

/**
 * Génère un résumé textuel des pathologies du patient
 */
export function generatePathologySummary(patient: ExtendedPatient): string {
  if (!patient.pathologies || patient.pathologies.length === 0) {
    return "Aucune pathologie spécifiée";
  }

  const pathologyNames: Record<string, string> = {
    asthma: "Asthme",
    bpco: "BPCO",
    ddb: "Dilatation des Bronches",
    tbk: "Tuberculose",
    sleep: "Troubles respiratoires du sommeil",
    pleuralEffusion: "Épanchement Pleural",
    pid: "Pneumopathie Interstitielle Diffuse",
  };

  const names = patient.pathologies
    .map((code) => pathologyNames[code] || code)
    .filter((name) => name);

  if (names.length === 0) return "Aucune pathologie spécifiée";
  if (names.length === 1) return names[0];

  const last = names.pop();
  return `${names.join(", ")} et ${last}`;
}
