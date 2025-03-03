/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PatientForm } from "@/components/patients/PatientForm";
import { Navbar } from "@/components/shared/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Données temporaires pour la démonstration
const TEMP_PATIENT = {
  id: "1",
  firstName: "Jean",
  lastName: "Dupont",
  age: 45,
  socialSecurity: "1234567890123",
  pathologies: ["tumor"],
  symptoms: ["Dyspnée", "Toux chronique"],
  medicalHistory: "Antécédents d'asthme dans l'enfance",
  consultationReason: "Dypnée",
  medicalBackground: "TBK traitée en 2017",
  clinicalExam: "Auscultation pulmonaire : présence de sibilants",
  diagnosis: "Asthme",
  treatment:
    "Corticoïde inhalé (CSI) :\n➤ Budesonide (Pulmicort®) 400 µg 2 fois/jour (ou selon sévérité)\n\nBronchodilatateur bêta-2 agoniste de longue durée d'action (LABA) (si asthme modéré à sévère) :\n➤ Formotérol (Symbicort®) 1-2 bouffées matin et soir",
};

function EditPatientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Dans une vraie application, nous ferions un appel API ici pour récupérer les données du patient
  const patient = TEMP_PATIENT;

  const handleSubmit = async (data: any) => {
    try {
      // TODO: Implémenter la logique de mise à jour
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation d'une requête API
      router.push(`/patients/${id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                mode="edit"
                initialData={patient}
                selectedPathologies={patient.pathologies}
                onSubmit={handleSubmit}
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
