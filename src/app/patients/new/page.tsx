"use client";

import { PatientForm } from "@/components/patients/PatientForm";
import { Button } from "@/components/shared/Button";
import { pathologies, pathologyGroups } from "@/config/pathologies";
import { usePermissions } from "@/hooks/usePermissions";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function NewPatientPage() {
  const router = useRouter();
  const { canCreate, loading } = usePermissions();
  const [selectedPathologies, setSelectedPathologies] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !canCreate) {
      router.push("/dashboard");
      toast.error(
        "Vous n'avez pas les permissions nécessaires pour créer un patient"
      );
    }
  }, [canCreate, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!canCreate) {
    return null;
  }

  const handlePathologyToggle = (pathologyId: string) => {
    setSelectedPathologies((current) =>
      current.includes(pathologyId)
        ? current.filter((id) => id !== pathologyId)
        : [...current, pathologyId]
    );
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId]
    );
  };

  const handleNext = () => {
    if (selectedPathologies.length > 0) {
      setStep(2);
    }
  };

  const getPathologyById = (id: string) => {
    return pathologies.find((p) => p.id === id);
  };

  const isPathologySelected = (pathologyId: string) => {
    return selectedPathologies.includes(pathologyId);
  };

  const getGroupSelectedCount = (group: (typeof pathologyGroups)[0]) => {
    return group.pathologies.filter((id) => selectedPathologies.includes(id))
      .length;
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
                <div className="space-y-4">
                  {pathologyGroups.map((group) => {
                    const selectedCount = getGroupSelectedCount(group);
                    const isExpanded = expandedGroups.includes(group.id);

                    return (
                      <div
                        key={group.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <ChevronRightIcon
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            />
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {group.name}
                            </h3>
                            {selectedCount > 0 && (
                              <span className="text-sm text-primary-600 dark:text-primary-400">
                                ({selectedCount})
                              </span>
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-gray-200 dark:border-gray-700 p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {group.pathologies.map((pathologyId) => {
                              const pathology = getPathologyById(pathologyId);
                              if (!pathology) return null;

                              return (
                                <button
                                  key={pathology.id}
                                  onClick={() =>
                                    handlePathologyToggle(pathology.id)
                                  }
                                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                                    isPathologySelected(pathology.id)
                                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400"
                                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 flex-shrink-0">
                                      <Image
                                        src={pathology.icon}
                                        alt={pathology.name}
                                        width={40}
                                        height={40}
                                        className="object-contain dark:invert"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4
                                        className={`font-medium ${
                                          isPathologySelected(pathology.id)
                                            ? "text-primary-700 dark:text-primary-300"
                                            : "text-gray-900 dark:text-white"
                                        }`}
                                      >
                                        {pathology.name}
                                      </h4>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {pathology.description}
                                      </p>
                                    </div>
                                    {isPathologySelected(pathology.id) && (
                                      <div className="flex-shrink-0">
                                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                          <svg
                                            className="w-4 h-4 text-white"
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
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                  isEditing={false}
                  pathologies={selectedPathologies}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
