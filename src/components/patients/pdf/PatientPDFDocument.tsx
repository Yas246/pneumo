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
      <Page size="A4" style={{ ...baseStyles.page, paddingTop: 85 }}>
        {/* En-tête du document - Design amélioré */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 75,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 30,
            backgroundColor: "#1e40af",
            borderBottom: "3pt solid #1e3a8a",
          }}
          fixed
        >
          {/* Logo */}
          <Image
            src={`${BASE_URL}/logochuo.png`}
            style={{ width: 90, height: 90, marginRight: 20, marginTop: 10 }}
          />

          {/* Informations du centre */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#ffffff",
                fontFamily: "Montserrat",
                marginBottom: 4,
              }}
            >
              CHU MOHAMMED VI OUJDA
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#dbeafe",
                fontFamily: "Montserrat",
                marginBottom: 3,
              }}
            >
              Service de Pneumologie
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: "#93c5fd",
                fontFamily: "Montserrat",
              }}
            >
              Soins de qualité • Excellence médicale
            </Text>
          </View>

          {/* Informations de contact alignées à droite */}
          <View style={{ alignItems: "flex-end", marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 9,
                color: "#dbeafe",
                fontFamily: "Montserrat",
                marginBottom: 2,
              }}
            >
              Maroc
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: "#93c5fd",
                fontFamily: "Montserrat",
              }}
            >
              {new Date().toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* Barre décorative sous l'en-tête */}
        <View
          style={{
            position: "absolute",
            top: 75,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: "#3b82f6",
          }}
          fixed
        />

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
