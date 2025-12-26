/**
 * Composants de rendu PDF dynamiques
 * Génère automatiquement le contenu PDF basé sur les données du patient
 */

import {
  ExtendedPatient,
  formatFieldValue,
  getNestedValue,
  getPathologySectionTitle,
  hasValue,
} from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { BPCOPathologyPDF } from "./pathologies/BPCOPathologyPDF";
import { DDBPathologyPDF } from "./pathologies/DDBPathologyPDF";
import { LungCancerPathologyPDF } from "./pathologies/LungCancerPathologyPDF";
import { PIDPathologyPDF } from "./pathologies/PIDPathologyPDF";
import { PleuralEffusionPathologyPDF } from "./pathologies/PleuralEffusionPathologyPDF";
import { PneumothoraxPathologyPDF } from "./pathologies/PneumothoraxPathologyPDF";
import { SleepPathologyPDF } from "./pathologies/SleepPathologyPDF";
import { TBKPathologyPDF } from "./pathologies/TBKPathologyPDF";
import { baseStyles, conditionalStyles, imageStyles } from "./styles";

interface DynamicPDFRendererProps {
  patient: ExtendedPatient;
  pathology: string;
}

/**
 * Extrait tous les champs remplis d'un objet de manière récursive
 */
function extractFilledFields(
  obj: Record<string, unknown>,
  prefix: string = ""
): string[] {
  const fields: string[] = [];

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    // Ignorer les champs système
    if (
      [
        "id",
        "createdAt",
        "updatedAt",
        "creatorId",
        "creatorRole",
        "creatorName",
        "status",
        "statusHistory",
        "statusChangedAt",
      ].includes(key)
    ) {
      continue;
    }

    // Ignorer les champs vides, null, undefined
    if (value === null || value === undefined || value === "") {
      continue;
    }

    // Ignorer les booléens false
    if (typeof value === "boolean" && value === false) {
      continue;
    }

    // Ignorer les tableaux vides
    if (Array.isArray(value) && value.length === 0) {
      continue;
    }

    // Si c'est un objet, extraire ses champs récursivement
    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedFields = extractFilledFields(
        value as Record<string, unknown>,
        fullKey
      );
      fields.push(...nestedFields);
    } else {
      // C'est une valeur primitive, l'ajouter
      fields.push(fullKey);
    }
  }

  return fields;
}

/**
 * Regroupe les champs par section basée sur leur préfixe
 */
function groupFieldsBySection(fields: string[]): Record<string, string[]> {
  const sections: Record<string, string[]> = {};

  for (const field of fields) {
    // Extraire le préfixe (première partie avant le point)
    const parts = field.split(".");
    const sectionKey = parts[0];

    if (!sections[sectionKey]) {
      sections[sectionKey] = [];
    }

    sections[sectionKey].push(field);
  }

  return sections;
}

/**
 * Détermine si une section doit être affichée en grille ou en liste
 */
function getSectionLayout(sectionKey: string): "list" | "grid" {
  const lowerKey = sectionKey.toLowerCase();
  if (
    lowerKey.includes("exam") ||
    lowerKey.includes("clinical") ||
    lowerKey.includes("complementary") ||
    lowerKey.includes("diagnostic")
  ) {
    return "grid";
  }
  return "list";
}

/**
 * Composant principal pour rendre une section PDF
 */
export function PDFSection({
  patient,
  sectionKey,
  fields,
}: {
  patient: ExtendedPatient;
  sectionKey: string;
  fields: string[];
}) {
  // Vérifier si la section a des champs avec des valeurs
  const hasFilledFields = fields.some((fieldKey) => {
    const value = getNestedValue(patient, fieldKey);
    return hasValue(value);
  });

  if (!hasFilledFields) {
    return null;
  }

  // Obtenir le titre de la section en français
  const title = getPathologySectionTitle(sectionKey);
  const layout = getSectionLayout(sectionKey);

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>{title}</Text>

      {layout === "grid" ? (
        <PDFGridSection patient={patient} fields={fields} />
      ) : (
        <PDFListSection patient={patient} fields={fields} />
      )}
    </View>
  );
}

/**
 * Section en mode grille (2 colonnes)
 */
function PDFGridSection({
  patient,
  fields,
}: {
  patient: ExtendedPatient;
  fields: string[];
}) {
  const fieldPairs: string[][] = [];
  for (let i = 0; i < fields.length; i += 2) {
    fieldPairs.push(fields.slice(i, i + 2));
  }

  return (
    <View style={baseStyles.grid}>
      {fieldPairs.map((pair, index) => (
        <View key={index} style={baseStyles.tableRow}>
          {pair.map((fieldKey) => (
            <View key={fieldKey} style={baseStyles.gridItem}>
              <PDFField patient={patient} fieldKey={fieldKey} />
            </View>
          ))}
          {pair.length === 1 && <View style={baseStyles.gridItem} />}
        </View>
      ))}
    </View>
  );
}

/**
 * Section en mode liste (une colonne)
 */
function PDFListSection({
  patient,
  fields,
}: {
  patient: ExtendedPatient;
  fields: string[];
}) {
  return (
    <View>
      {fields.map((fieldKey) => (
        <PDFField key={fieldKey} patient={patient} fieldKey={fieldKey} />
      ))}
    </View>
  );
}

/**
 * Composant pour rendre un champ individuel
 */
function PDFField({
  patient,
  fieldKey,
}: {
  patient: ExtendedPatient;
  fieldKey: string;
}) {
  const value = getNestedValue(patient, fieldKey);
  const hasVal = hasValue(value);

  // Ne pas afficher les champs booléens à false
  if (typeof value === "boolean" && value === false) {
    return null;
  }

  // Vérifier si c'est un champ d'images (tableau de chaînes)
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "string" &&
    (fieldKey.includes("Images") || fieldKey.includes("images"))
  ) {
    return <PDFImagesField value={value} fieldKey={fieldKey} />;
  }

  // Générer le libellé à partir de la clé
  const label = generateFieldLabel(fieldKey);

  // Déterminer le type de champ pour le formatage
  const fieldType = getFieldTypeFromValue(value);

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{label}:</Text>
      <Text style={conditionalStyles.fieldValue(hasVal)}>
        {hasVal ? formatFieldValue(value, fieldType) : "Non renseigné"}
      </Text>
    </View>
  );
}

/**
 * Détermine le type de champ à partir de sa valeur
 */
function getFieldTypeFromValue(value: unknown): string {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (value instanceof Date) return "date";
  if (Array.isArray(value)) return "array";
  return "string";
}

/**
 * Génère un libellé lisible à partir d'une clé de champ
 */
function generateFieldLabel(fieldKey: string): string {
  // Extraire la dernière partie de la clé
  const parts = fieldKey.split(".");
  const lastPart = parts[parts.length - 1];

  // Convertir camelCase en titre lisible
  return lastPart
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Composant principal pour rendre tout le PDF d'un patient
 */
export function DynamicPDFRenderer({
  patient,
}: Omit<DynamicPDFRendererProps, "pathology">) {
  // Vérifier si le patient a la pathologie lungCancer
  const hasLungCancerPathology = patient.pathologies?.includes("lungCancer");

  // Vérifier si le patient a la pathologie ddb
  const hasDDBPathology = patient.pathologies?.includes("ddb");

  // Vérifier si le patient a la pathologie pid
  const hasPIDPathology = patient.pathologies?.includes("pid");

  // Vérifier si le patient a la pathologie sleep
  const hasSleepPathology = patient.pathologies?.includes("sleep");

  // Vérifier si le patient a la pathologie pneumothorax
  const hasPneumothoraxPathology =
    patient.pathologies?.includes("pneumothorax");

  // Vérifier si le patient a la pathologie tbk
  const hasTBKPathology = patient.pathologies?.includes("tbk");

  // Vérifier si le patient a la pathologie pleuralEffusion
  const hasPleuralEffusionPathology =
    patient.pathologies?.includes("pleuralEffusion");

  // Vérifier si le patient a la pathologie bpco
  const hasBPCOPathology = patient.pathologies?.includes("bpco");

  // Si le patient a la pathologie lungCancer, utiliser le composant spécifique
  if (hasLungCancerPathology) {
    return <LungCancerPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie ddb, utiliser le composant spécifique
  if (hasDDBPathology) {
    return <DDBPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie pid, utiliser le composant spécifique
  if (hasPIDPathology) {
    return <PIDPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie sleep, utiliser le composant spécifique
  if (hasSleepPathology) {
    return <SleepPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie pneumothorax, utiliser le composant spécifique
  if (hasPneumothoraxPathology) {
    return <PneumothoraxPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie tbk, utiliser le composant spécifique
  if (hasTBKPathology) {
    return <TBKPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie pleuralEffusion, utiliser le composant spécifique
  if (hasPleuralEffusionPathology) {
    return <PleuralEffusionPathologyPDF patient={patient} />;
  }

  // Si le patient a la pathologie bpco, utiliser le composant spécifique
  if (hasBPCOPathology) {
    return <BPCOPathologyPDF patient={patient} />;
  }

  // Sinon, utiliser le rendu dynamique générique pour les autres pathologies
  // Extraire tous les champs remplis du patient
  const allFields = extractFilledFields(patient as Record<string, unknown>);

  // Regrouper les champs par section
  const sections = groupFieldsBySection(allFields);

  // Filtrer les sections vides
  const filledSections = Object.entries(sections).filter(
    ([, fields]) => fields.length > 0
  );

  return (
    <View>
      {filledSections.map(([sectionKey, fields]) => (
        <PDFSection
          key={sectionKey}
          patient={patient}
          sectionKey={sectionKey}
          fields={fields}
        />
      ))}
    </View>
  );
}

/**
 * Composant spécialisé pour les champs d'images
 * Les images prennent toute la largeur du document en respectant le ratio 16:9
 */
function PDFImagesField({
  value,
  fieldKey,
}: {
  value: string[];
  fieldKey: string;
}) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  /**
   * Obtient l'URL complète de l'image
   * Convertit les URLs Firebase en URLs de proxy pour le PDF
   */
  const getImageUrl = (imgPath: string): string => {
    // Si l'URL est une URL Firebase Storage, la convertir en URL de proxy
    if (imgPath.includes("firebasestorage.googleapis.com")) {
      try {
        // Extraire le chemin du fichier depuis l'URL Firebase
        const url = new URL(imgPath);
        // Le chemin Firebase est dans le pathname, après /v0/b/bucket/o/
        const pathMatch = url.pathname.match(/\/v0\/b\/[^/]+\/o\/(.+)/);
        if (pathMatch) {
          const firebasePath = decodeURIComponent(pathMatch[1]);
          // Retourner l'URL de notre proxy
          return `${BASE_URL}/api/images/${firebasePath}`;
        }
      } catch (error) {
        console.warn("Erreur lors de la conversion de l'URL Firebase:", error);
      }
    }

    // Pour les autres URLs (locales), les utiliser directement
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }

    // Sinon, construire l'URL locale en ajoutant le slash si nécessaire
    return `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{generateFieldLabel(fieldKey)}:</Text>
      <View style={imageStyles.imageGrid}>
        {value.map((imgPath, index) => (
          <View key={index} style={imageStyles.imageContainer} break>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              src={getImageUrl(imgPath)}
              style={imageStyles.image}
              cache={false}
            />
            <Text style={imageStyles.imageLabel}>
              {generateFieldLabel(fieldKey)} {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
