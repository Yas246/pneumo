"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import {
  ArchiveBoxIcon,
  ArrowLeftIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Données temporaires pour la démonstration
const TEMP_PATIENT = {
  id: "1",
  firstName: "Hamza",
  lastName: "Farhi",
  age: 45,
  socialSecurity: "CNSS" as const,
  pathologies: ["tumor"],
  symptoms: ["Dyspnée", "Toux chronique"],
  medicalHistory: "Antécédents d'asthme dans l'enfance",
  consultationReason: "Dypnée",
  medicalBackground: "TBK traitée en 2017",
  clinicalExam: "Auscultation pulmonaire : présence de sibilants",
  diagnosis: "Asthme",
  treatment:
    "Corticoïde inhalé (CSI) :\n➤ Budesonide (Pulmicort®) 400 µg 2 fois/jour (ou selon sévérité)\n\nBronchodilatateur bêta-2 agoniste de longue durée d'action (LABA) (si asthme modéré à sévère) :\n➤ Formotérol (Symbicort®) 1-2 bouffées matin et soir",
  status: "active" as const,
  lastVisit: "2024-03-01",
};

export default function PatientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isArchiving, setIsArchiving] = useState(false);

  // Dans une vraie application, nous ferions un appel API ici pour récupérer les données du patient
  const patient = TEMP_PATIENT;

  const handleArchive = async () => {
    setIsArchiving(true);
    try {
      // TODO: Implémenter la logique d'archivage
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation d'une requête API
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setIsArchiving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour au tableau de bord
            </Link>

            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Patient ID: {id}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={{
                    pathname: "/appointments/new",
                    query: {
                      patientId: id,
                      patientName: `${patient.firstName} ${patient.lastName}`,
                      diagnosis: patient.diagnosis,
                    },
                  }}
                >
                  <Button variant="outline">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Nouveau rendez-vous
                  </Button>
                </Link>
                <Link
                  href={{
                    pathname: "/patients/edit",
                    query: { id },
                  }}
                >
                  <Button>
                    <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                    Modifier le dossier
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              {/* Informations personnelles */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Âge
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.age} ans
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Numéro de sécurité sociale
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.socialSecurity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Symptômes et diagnostic */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Symptômes et diagnostic
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Symptômes
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {patient.symptoms.map((symptom) => (
                        <span
                          key={symptom}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Diagnostic
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.diagnosis}
                    </p>
                  </div>
                </div>
              </div>

              {/* Antécédents et observations */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Antécédents et observations
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Antécédents médicaux
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                      {patient.medicalHistory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Motif de consultation
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                      {patient.consultationReason}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Contexte médical
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                      {patient.medicalBackground}
                    </p>
                  </div>
                </div>
              </div>

              {/* Examen et traitement */}
              <div className="px-6 py-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Examen et traitement
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Examen clinique
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                      {patient.clinicalExam}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Traitement prescrit
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                      {patient.treatment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" text-right mt-8 px-4 sm:px-0">
            <Button
              variant="outline"
              onClick={handleArchive}
              disabled={isArchiving}
              className="w-full sm:w-auto border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
            >
              {isArchiving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Archivage...
                </>
              ) : (
                <>
                  <ArchiveBoxIcon className="h-5 w-5 mr-2" />
                  Archiver le dossier
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
