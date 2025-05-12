"use client";

import { PatientForm } from "@/components/patients/PatientForm";
import { patientSchema } from "@/components/patients/schema";
import { Navbar } from "@/components/shared/Navbar";
import { getPatient } from "@/firebase/patients";
import { usePermissions } from "@/hooks/usePermissions";
import { Patient } from "@/types/patient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

function EditPatientContent() {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const id = searchParams.get("id");
  const { canEdit, loading: permissionsLoading } = usePermissions();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        router.push("/dashboard");
        return;
      }

      try {
        const patientData = await getPatient(id);
        if (!patientData) {
          toast.error("Patient non trouvé");
          router.push("/dashboard");
          return;
        }
        setPatient(patientData);
      } catch (error) {
        console.error("Erreur lors de la récupération du patient:", error);
        toast.error("Erreur lors de la récupération du patient");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, router]);

  useEffect(() => {
    if (!permissionsLoading && !canEdit) {
      toast.error("Vous n'avez pas les permissions nécessaires");
      router.push("/dashboard");
    }
  }, [canEdit, permissionsLoading, router]);

  if (loading || permissionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!patient) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/patients/${id}`}
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour au dossier patient
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Modifier le dossier patient
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-8">
              <PatientForm
                isEditing={true}
                initialData={
                  {
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
                  } as unknown as z.infer<typeof patientSchema>
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EditPatientPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <EditPatientContent />
    </Suspense>
  );
}
