/**
 * Composants de rendu PDF dynamiques
 * Génère automatiquement le contenu PDF basé sur la configuration
 */

import {
  ExtendedPatient,
  formatFieldValue,
  getNestedValue,
  hasValue,
  shouldDisplaySection,
  sortSectionFields,
} from "@/utils/pdfFieldExtractor";
import { Text, View } from "@react-pdf/renderer";
import { PDF_CONFIG } from "../PatientPDFConfig";
import { baseStyles, conditionalStyles } from "./styles";

interface DynamicPDFRendererProps {
  patient: ExtendedPatient;
  pathology: string;
}

/**
 * Composant principal pour rendre une section PDF
 */
export function PDFSection({
  patient,
  sectionConfig,
}: {
  patient: ExtendedPatient;
  sectionConfig: {
    title: string;
    fields: string[];
    layout: "list" | "grid";
  };
}) {
  // Vérifier si la section doit être affichée
  if (!shouldDisplaySection(patient, sectionConfig.fields)) {
    return null;
  }

  const sortedFields = sortSectionFields(sectionConfig.fields);

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>{sectionConfig.title}</Text>

      {sectionConfig.layout === "grid" ? (
        <PDFGridSection patient={patient} fields={sortedFields} />
      ) : (
        <PDFListSection patient={patient} fields={sortedFields} />
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
  const fieldPairs = [];
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

  // Générer le libellé à partir de la clé
  const label = generateFieldLabel(fieldKey);

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{label}:</Text>
      <Text style={conditionalStyles.fieldValue(hasVal)}>
        {hasVal ? formatFieldValue(value, "string") : "Non renseigné"}
      </Text>
    </View>
  );
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
  pathology,
}: DynamicPDFRendererProps) {
  const pathologyConfig = PDF_CONFIG[pathology];

  if (!pathologyConfig) {
    return (
      <View style={baseStyles.section}>
        <Text style={baseStyles.sectionTitle}>
          Configuration non trouvée pour la pathologie: {pathology}
        </Text>
      </View>
    );
  }

  const sections = Object.entries(pathologyConfig.sections);

  return (
    <View>
      {sections.map(([sectionKey, sectionConfig]) => (
        <PDFSection
          key={sectionKey}
          patient={patient}
          sectionConfig={sectionConfig}
        />
      ))}
    </View>
  );
}

/**
 * Composant spécialisé pour les champs médicaux complexes
 */
export function PDFMedicalField({
  patient,
  fieldKey,
  type = "auto",
}: {
  patient: ExtendedPatient;
  fieldKey: string;
  type?: "auto" | "symptoms" | "medications" | "exams";
}) {
  const value = getNestedValue(patient, fieldKey);
  const hasVal = hasValue(value);

  if (!hasVal) {
    return (
      <View style={baseStyles.field}>
        <Text style={baseStyles.fieldLabel}>
          {generateFieldLabel(fieldKey)}:
        </Text>
        <Text style={baseStyles.fieldEmpty}>Non renseigné</Text>
      </View>
    );
  }

  // Traitement spécial selon le type
  switch (type) {
    case "symptoms":
      return <PDFSymptomsField value={value} fieldKey={fieldKey} />;
    case "medications":
      return <PDFMedicationsField value={value} fieldKey={fieldKey} />;
    case "exams":
      return <PDFExamsField value={value} fieldKey={fieldKey} />;
    default:
      return <PDFField patient={patient} fieldKey={fieldKey} />;
  }
}

/**
 * Champ spécialisé pour les symptômes
 */
function PDFSymptomsField({
  value,
  fieldKey,
}: {
  value: unknown;
  fieldKey: string;
}) {
  if (!Array.isArray(value)) {
    return (
      <View style={baseStyles.field}>
        <Text style={baseStyles.fieldLabel}>
          {generateFieldLabel(fieldKey)}:
        </Text>
        <Text style={baseStyles.fieldValue}>
          {formatFieldValue(value, "string")}
        </Text>
      </View>
    );
  }

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{generateFieldLabel(fieldKey)}:</Text>
      <View style={baseStyles.list}>
        {value.map((symptom, index) => (
          <View key={index} style={baseStyles.listItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.fieldValue}>{String(symptom)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * Champ spécialisé pour les médicaments
 */
function PDFMedicationsField({
  value,
  fieldKey,
}: {
  value: unknown;
  fieldKey: string;
}) {
  if (!Array.isArray(value)) {
    return (
      <View style={baseStyles.field}>
        <Text style={baseStyles.fieldLabel}>
          {generateFieldLabel(fieldKey)}:
        </Text>
        <Text style={baseStyles.fieldValue}>
          {formatFieldValue(value, "string")}
        </Text>
      </View>
    );
  }

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{generateFieldLabel(fieldKey)}:</Text>
      <View style={baseStyles.list}>
        {value.map((medication, index) => (
          <View key={index} style={baseStyles.listItem}>
            <Text style={baseStyles.bullet}>•</Text>
            <Text style={baseStyles.fieldValue}>
              {typeof medication === "object" && medication !== null
                ? `${
                    medication.name || medication.medication || "Médicament"
                  } - ${
                    medication.dosage || medication.dose || "Dose non spécifiée"
                  }`
                : String(medication)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * Champ spécialisé pour les examens
 */
function PDFExamsField({
  value,
  fieldKey,
}: {
  value: unknown;
  fieldKey: string;
}) {
  if (typeof value !== "object" || value === null) {
    return (
      <View style={baseStyles.field}>
        <Text style={baseStyles.fieldLabel}>
          {generateFieldLabel(fieldKey)}:
        </Text>
        <Text style={baseStyles.fieldValue}>
          {formatFieldValue(value, "string")}
        </Text>
      </View>
    );
  }

  const examData = value as Record<string, unknown>;
  const examEntries = Object.entries(examData).filter(([, val]) =>
    hasValue(val)
  );

  if (examEntries.length === 0) {
    return (
      <View style={baseStyles.field}>
        <Text style={baseStyles.fieldLabel}>
          {generateFieldLabel(fieldKey)}:
        </Text>
        <Text style={baseStyles.fieldEmpty}>Non renseigné</Text>
      </View>
    );
  }

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{generateFieldLabel(fieldKey)}:</Text>
      <View style={baseStyles.grid}>
        {examEntries.map(([key, val]) => (
          <View key={key} style={baseStyles.gridItem}>
            <Text style={baseStyles.fieldLabel}>
              {generateFieldLabel(key)}:
            </Text>
            <Text style={baseStyles.fieldValue}>
              {formatFieldValue(val, "string")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
