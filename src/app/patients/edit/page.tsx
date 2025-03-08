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
  firstName: "John",
  lastName: "Doe",
  birthDate: "1990-01-01",
  sex: "M" as const,
  address: "123 Main St",
  phone: "0123456789",
  profession: "Engineer",
  treatingDoctor: "Dr. Smith",
  socialSecurity: "CNSS" as const,
  consultationReason: "Regular checkup",
  diurnalSymptoms: {
    excessiveSleepiness: false,
    headaches: false,
    asthenia: false,
    epworthScore: 0,
  },
  nocturnalSymptoms: {
    snoring: false,
    sleepApnea: false,
    choking: false,
    agitation: false,
    insomnia: false,
    nocturia: false,
  },
  symptomsDuration: "N/A",
  personalHistory: {
    obesity: false,
    hta: false,
    orl: "",
    neuro: "",
    smoking: "",
    alcoholism: "",
    diabetes: "",
    cardiovascularDiseases: "",
    lifestyle: "",
    respiratoryPathology: "",
    currentMedications: "",
  },
  familyHistory: {
    saosHistory: false,
    respiratoryPathologies: false,
  },
  clinicalExam: {
    weight: 70,
    height: 175,
    bmi: 22.9,
    neckCircumference: 38,
    abdominalPerimeter: 85,
    bloodPressure: "120/80",
    heartRate: 75,
    pulmonaryAuscultation: "Normal",
  },
  orlExam: {
    vasAnatomy: "Normal",
    nasalObstruction: false,
    amygdalineHypertrophy: false,
    retrognathia: false,
    micromandible: false,
    macroglossia: false,
  },
  complementaryExams: {
    ventilationPolygraphy: false,
    psg: false,
    tensionalHolter: false,
    metabolicAssessment: {
      lipidProfile: {},
    },
    nightOximetry: false,
    morningBloodGas: {},
    spirometry: {},
    imaging: {
      chestXray: false,
      orlScan: false,
    },
  },
  diagnosis: {
    saos: false,
    sacs: false,
    soh: false,
    nocturalHypoventilation: false,
    simpleSnoring: false,
  },
  treatment: {
    hygieneDietetic: {
      weightLoss: false,
      alcoholAndSedativesStop: false,
      sleepHygieneImprovement: false,
    },
    medicalTreatments: {
      ppc: false,
      oam: false,
    },
    surgicalTreatments: {
      orlSurgery: false,
      bariatricSurgery: false,
    },
  },
  ppcFollowUp: {
    ppcPrescribingDoctor: "",
    ppcStartDate: "",
    deviceModel: "",
    deviceSupplier: "",
    initialPressure: 0,
    ventilationMode: "AutoPAP" as const,
    humidifier: false,
    maskType: "",
  },
  status: "active" as const,
  lastVisit: "2024-01-01",
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
