/**
 * Composant principal du document PDF patient
 * Assemble tous les éléments pour créer un rapport complet
 */

import {
  calculateAge,
  ExtendedPatient,
  generatePathologySummary,
  getPathologySectionTitle,
} from "@/utils/pdfFieldExtractor";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { DynamicPDFRenderer } from "./DynamicPDFRenderer";
import { baseStyles } from "./styles";

interface PatientPDFDocumentProps {
  patient: ExtendedPatient;
}

/**
 * Document PDF principal pour un patient
 */
export function PatientPDFDocument({ patient }: PatientPDFDocumentProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const patientAge = calculateAge(patient.birthDate);
  const pathologiesSummary = generatePathologySummary(patient);

  return (
    <Document>
      <Page size="A4" style={{ ...baseStyles.page, paddingTop: 70 }}>
        {/* En-tête du document */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            borderBottom: "2pt solid #2563eb",
            backgroundColor: "#ffffff",
          }}
          fixed
        >
          <Image
            src={`${BASE_URL}/logochuo.png`}
            style={{ width: 60, height: 60 }}
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#2563eb",
                fontFamily: "Helvetica",
              }}
            >
              Service de pneumologie CHUO
            </Text>
          </View>
        </View>

        {/* Informations générales du patient */}
        <View style={baseStyles.section}>
          <Text style={baseStyles.sectionTitle}>Informations du Patient</Text>

          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Nom:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.lastName} {patient.firstName}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Date de naissance:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.birthDate
                  ? new Date(patient.birthDate).toLocaleDateString("fr-FR")
                  : "Non spécifiée"}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Âge:</Text>
              <Text style={baseStyles.fieldValue}>{patientAge} ans</Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Sexe:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.sex === "M"
                  ? "Masculin"
                  : patient.sex === "F"
                  ? "Féminin"
                  : "Non spécifié"}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Téléphone:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.phone || "Non spécifié"}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Adresse:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.address || "Non spécifiée"}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Profession:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.profession || "Non spécifiée"}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>Médecin traitant:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.treatingDoctor || "Non spécifié"}
              </Text>
            </View>

            <View style={baseStyles.gridItem}>
              <Text style={baseStyles.fieldLabel}>IP HOSIX:</Text>
              <Text style={baseStyles.fieldValue}>
                {patient.ipHosix || "Non spécifié"}
              </Text>
            </View>
          </View>
        </View>

        {/* Pathologies */}
        <View style={baseStyles.section}>
          <Text style={baseStyles.sectionTitle}>Pathologies</Text>
          <Text style={baseStyles.fieldValue}>{pathologiesSummary}</Text>
        </View>

        {/* Contenu dynamique par pathologie */}
        {patient.pathologies?.map((pathology) => (
          <View key={pathology} style={baseStyles.pageBreak}>
            <Text style={baseStyles.sectionTitle}>
              {getPathologySectionTitle(pathology)}
            </Text>
            <DynamicPDFRenderer patient={patient} />
          </View>
        ))}

        {/* Pied de page */}
        <View style={baseStyles.footer} fixed>
          <Text>
            Document généré automatiquement le{" "}
            {new Date().toLocaleDateString("fr-FR")} - {patient.firstName}{" "}
            {patient.lastName} - ID: {patient.id}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

/**
 * Version simplifiée pour les tests
 */
export function SimplePatientPDF({ patient }: PatientPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <View style={baseStyles.header}>
          <Text style={baseStyles.headerTitle}>
            Test PDF - {patient.firstName} {patient.lastName}
          </Text>
        </View>

        <View style={baseStyles.section}>
          <Text style={baseStyles.sectionTitle}>Données de test</Text>
          <Text style={baseStyles.fieldValue}>ID Patient: {patient.id}</Text>
          <Text style={baseStyles.fieldValue}>
            Pathologies: {patient.pathologies?.join(", ") || "Aucune"}
          </Text>
          <Text style={baseStyles.fieldValue}>
            Date de génération: {new Date().toLocaleString("fr-FR")}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
