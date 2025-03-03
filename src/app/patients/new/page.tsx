/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PatientForm } from "@/components/patients/PatientForm";
import { Button } from "@/components/shared/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const pathologies = [
  {
    id: "tumor",
    name: "Pneumopathies tumorales",
    icon: "/icons/tumor.svg",
    description: "Cancer et tumeurs pulmonaires",
  },
  {
    id: "allergy",
    name: "Allergies",
    icon: "/icons/allergy.svg",
    description: "Asthme et allergies respiratoires",
  },
  {
    id: "bronchial",
    name: "Pneumopathies bronchiques",
    icon: "/icons/bronchial.svg",
    description: "BPCO et maladies bronchiques",
  },
  {
    id: "infection",
    name: "Infections pulmonaires",
    icon: "/icons/infection.svg",
    description: "Infections respiratoires",
  },
];

export default function NewPatientPage() {
  const router = useRouter();
  const [selectedPathologies, setSelectedPathologies] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const handlePathologyToggle = (pathologyId: string) => {
    setSelectedPathologies((current) =>
      current.includes(pathologyId)
        ? current.filter((id) => id !== pathologyId)
        : [...current, pathologyId]
    );
  };

  const handleNext = () => {
    if (selectedPathologies.length > 0) {
      setStep(2);
    }
  };

  const handleSubmit = async (data: any) => {
    // TODO: Implémenter la logique de sauvegarde
    console.log("Form data:", { ...data, pathologies: selectedPathologies });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 animate-fade-in">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour au tableau de bord
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Nouveau Dossier Patient
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl overflow-hidden transition-all">
            {step === 1 ? (
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Sélection des pathologies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pathologies.map((pathology) => (
                    <button
                      key={pathology.id}
                      onClick={() => handlePathologyToggle(pathology.id)}
                      className={`relative group rounded-xl overflow-hidden aspect-square transition-all ${
                        selectedPathologies.includes(pathology.id)
                          ? "ring-2 ring-primary-500 dark:ring-primary-400"
                          : "hover:shadow-soft dark:hover:shadow-gray-700"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative h-full w-full p-6 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 transition-colors">
                        <div className="w-16 h-16 mb-4">
                          <Image
                            src={pathology.icon}
                            alt={pathology.name}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-center font-medium text-gray-900 dark:text-white mb-2">
                          {pathology.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                          {pathology.description}
                        </p>
                        {selectedPathologies.includes(pathology.id) && (
                          <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={selectedPathologies.length === 0}
                    size="lg"
                    className="animate-fade-in"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8 animate-slide-up">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Informations du patient
                </h2>
                <PatientForm
                  selectedPathologies={selectedPathologies}
                  onSubmit={handleSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
