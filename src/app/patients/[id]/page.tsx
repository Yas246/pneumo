"use client";

import {
  PathologiesList,
  PathologyRenderer,
  PatientActions,
  PatientHeader,
  PersonalInfo,
} from "@/components/patients/display";
import { PatientConsultationReason } from "@/components/patients/PatientConsultationReason";
import { PatientMedicalHistory } from "@/components/patients/PatientMedicalHistory";
import { Navbar } from "@/components/shared/Navbar";
import { getPatient, updatePatientStatus } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import { usePatientPDF } from "@/hooks/usePatientPDF";
import { usePermissions } from "@/hooks/usePermissions";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ExtendedPatient } from "@/components/patients/display/types";

export default function PatientPage() {
  const params = useParams() as { id: string };
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const { canEdit, canArchive, canCreateAppointment } = usePermissions();
  const { downloadPatientPDF, isGenerating } = usePatientPDF();
  const [patient, setPatient] = useState<ExtendedPatient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isArchiving, setIsArchiving] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (typeof id === "string") {
          const patientData = await getPatient(id);
          if (patientData) {
            console.log("Patient pathologies:", patientData.pathologies);
            setPatient(patientData as ExtendedPatient);
          } else {
            console.log("Patient data is null");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du patient:", error);
        toast.error("Erreur lors de la récupération du patient");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleArchiveToggle = async () => {
    if (!patient || typeof id !== "string" || !user) return;

    setIsArchiving(true);
    try {
      const newStatus = patient?.status === "archived" ? "active" : "archived";
      await updatePatientStatus(id, newStatus, user.uid);

      // Mettre à jour l'état local
      setPatient({
        ...patient,
        status: newStatus,
      });

      toast.success(
        newStatus === "archived"
          ? "Patient archivé avec succès"
          : "Patient désarchivé avec succès"
      );

      // Ne pas rediriger vers le dashboard si on désarchive
      if (newStatus === "archived") {
        router.push("/dashboard");
      } else {
        setIsArchiving(false);
      }
    } catch (error) {
      console.error("Erreur lors de la modification du statut:", error);
      toast.error(
        patient?.status === "archived"
          ? "Erreur lors de la désarchivation du patient"
          : "Erreur lors de l'archivage du patient"
      );
      setIsArchiving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Patient non trouvé
          </h1>
          <Link
            href="/dashboard"
            className="text-primary-600 hover:text-primary-700"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {/* Header avec actions */}
            <PatientHeader
              patient={patient}
              patientId={id}
              canEdit={canEdit}
              canCreateAppointment={canCreateAppointment}
              onDownloadPDF={() => downloadPatientPDF(patient)}
              isGeneratingPDF={isGenerating}
            />

            {/* Contenu principal */}
            <div className="space-y-8">
              {/* Informations personnelles */}
              <PersonalInfo patient={patient} />

              {/* Pathologies */}
              <PathologiesList patient={patient} />

              {/* Motif de consultation */}
              <PatientConsultationReason patient={patient} />

              {/* Antécédents */}
              <PatientMedicalHistory patient={patient} />

              {/* Pathologies spécifiques */}
              <PathologyRenderer patient={patient} />

              {/* Traitement */}
            </div>

            {/* Actions d'archivage */}
            <PatientActions
              patient={patient}
              onArchiveToggle={handleArchiveToggle}
              isArchiving={isArchiving}
              canArchive={canArchive}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
