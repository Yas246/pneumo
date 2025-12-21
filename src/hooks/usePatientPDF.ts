/**
 * Hook personnalisé pour la génération et le téléchargement de PDF patient
 */

import {
  PatientPDFDocument,
  SimplePatientPDF,
} from "@/components/patients/pdf/PatientPDFDocument";
import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Type temporaire pour éviter les conflits de types
type PDFPatient = Record<string, unknown>;

export function usePatientPDF() {
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * Génère et télécharge le PDF complet du patient
   */
  const downloadPatientPDF = async (
    patient: PDFPatient,
    options: {
      simple?: boolean;
      fileName?: string;
    } = {}
  ) => {
    if (!patient) {
      toast.error("Aucune donnée patient disponible");
      return;
    }

    setIsGenerating(true);

    try {
      // Générer le document PDF

      const document = options.simple
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          SimplePatientPDF({ patient: patient as any })
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          PatientPDFDocument({ patient: patient as any });

      // Générer le blob PDF
      const blob = await pdf(document).toBlob();

      // Créer l'URL de téléchargement
      const url = URL.createObjectURL(blob);

      // Créer le lien de téléchargement
      const link = globalThis.document.createElement("a");
      link.href = url;

      // Générer le nom du fichier
      const fileName =
        options.fileName ||
        `Dossier-${patient.lastName}-${patient.firstName}-${
          new Date().toISOString().split("T")[0]
        }.pdf`;

      link.download = fileName;
      link.click();

      // Nettoyer l'URL
      URL.revokeObjectURL(url);

      toast.success("PDF généré avec succès");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast.error("Erreur lors de la génération du PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Génère un aperçu du PDF (pour les tests)
   */
  const generatePDFPreview = async (patient: PDFPatient) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const document = SimplePatientPDF({ patient: patient as any });
      const blob = await pdf(document).toBlob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Erreur lors de la génération de l'aperçu:", error);
      return null;
    }
  };

  return {
    downloadPatientPDF,
    generatePDFPreview,
    isGenerating,
  };
}
