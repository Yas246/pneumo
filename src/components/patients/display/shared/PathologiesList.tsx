"use client";

import { ExtendedPatient } from "@/components/patients/display/types";
import { pathologies } from "@/config/pathologies";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

interface PathologiesListProps {
  patient: ExtendedPatient;
  className?: string;
}

export function PathologiesList({
  patient,
  className = "",
}: PathologiesListProps) {
  return (
    <div
      className={`px-6 py-5 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <SectionHeader title="Pathologies" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(patient?.pathologies) &&
          patient.pathologies.map((pathologyId) => {
            const pathology = pathologies.find((p) => p.id === pathologyId);
            if (!pathology) return null;

            return (
              <div
                key={pathologyId}
                className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
              >
                <div className="flex-shrink-0 w-10 h-10 relative">
                  <Image
                    src={pathology.icon}
                    alt={pathology.name}
                    fill
                    className="object-contain dark:invert"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {pathology.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pathology.description}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
