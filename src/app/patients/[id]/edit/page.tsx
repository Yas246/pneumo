"use client";

import { PatientForm } from "@/components/patients/PatientForm";
import { Navbar } from "@/components/shared/Navbar";
import { getPatient } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import type { Patient } from "@/types/patient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function EditPatientPage() {
  const params = useParams() as { id: string };
  const { id } = params;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { canEdit, loading: permissionsLoading } = usePermissions();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermissionsAndFetchPatient = async () => {
      try {
        // Attendre que l'authentification soit terminée
        if (authLoading || permissionsLoading) {
          return;
        }

        console.log("Current user role:", user?.role);
        console.log("Can edit:", canEdit);

        // Vérifier les permissions
        if (!canEdit) {
          console.log("Permission denied - redirecting");
          router.push(`/patients/${id}`);
          toast.error(
            "Vous n'avez pas les permissions nécessaires pour modifier ce dossier"
          );
          return;
        }

        // Récupérer les données du patient
        if (typeof id === "string") {
          console.log("Fetching patient data for ID:", id);
          const patientData = await getPatient(id);
          console.log("Retrieved patient data:", patientData);
          setPatient(patientData);
        }
      } catch (error) {
        console.error("Error in checkPermissionsAndFetchPatient:", error);
        toast.error("Erreur lors de la récupération du patient");
      } finally {
        setLoading(false);
      }
    };

    checkPermissionsAndFetchPatient();
  }, [id, canEdit, router, authLoading, permissionsLoading, user?.role]);

  if (loading || authLoading || permissionsLoading) {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href={`/patients/${id}`}
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour au dossier
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Modifier le dossier patient
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {patient.firstName} {patient.lastName}
            </p>
          </div>

          <PatientForm
            initialData={{
              ...patient,
              complementaryExams: {
                ventilationPolygraphy:
                  !!patient.complementaryExams?.polygraphyDate,
                psg: false,
                tensionalHolter: false,
                nightOximetry: false,
                imaging: { chestXray: false, orlScan: false },
                ...patient.complementaryExams,
              },
            }}
            isEditing={true}
            pathologies={patient.pathologies}
          />
        </div>
      </main>
    </div>
  );
}
