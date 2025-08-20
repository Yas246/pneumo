/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ExtendedPatient } from "@/app/patients/[id]/page";
import {
  PathologyDisplayConfig,
  getPathologyConfig,
} from "@/config/patientDisplayConfig";

interface PatientSectionRendererProps {
  patient: ExtendedPatient | null;
  sectionName: keyof PathologyDisplayConfig["sections"];
  dataPrefix: string; // ex: "MedicalHistory", "ClinicalExam", etc.
}

export function PatientSectionRenderer({
  patient,
  sectionName,
  dataPrefix,
}: PatientSectionRendererProps) {
  if (!patient?.pathologies) return null;

  const renderedSections = patient.pathologies
    .map((pathologyId) => {
      const config = getPathologyConfig(pathologyId);
      if (!config) return null;

      const sectionConfig = config.sections[sectionName];
      if (!sectionConfig) return null;

      // Récupérer les données de la section
      const sectionData =
        patient[`${pathologyId}${dataPrefix}` as keyof ExtendedPatient];
      if (!sectionData) return null;

      // Rendu spécifique selon le type de section
      switch (sectionName) {
        case "consultationReason":
          return (
            <div key={pathologyId}>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {(sectionConfig as any).title}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(sectionConfig as any).reasons?.map((reason: any) => {
                  const value =
                    sectionData[reason.key as keyof typeof sectionData];
                  if (!value && !reason.isOther) return null;

                  return (
                    <span
                      key={reason.key}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reason.color}`}
                    >
                      {reason.isOther && value
                        ? `Autre: ${value}`
                        : reason.label}
                    </span>
                  );
                })}
              </div>
            </div>
          );

        case "medicalHistory":
          return (
            <div key={pathologyId} className="space-y-6">
              {(sectionConfig as any).sections?.map(
                (subSection: any, sectionIndex: any) => (
                  <div key={sectionIndex}>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {subSection.title}
                    </p>

                    {subSection.items && (
                      <div className="mt-2 space-y-2">
                        {subSection.items.map((item: any) => {
                          const value =
                            sectionData[item.key as keyof typeof sectionData];

                          if (!value && !item.isArray) return null;

                          // Gestion des éléments avec comptage
                          if (item.hasCount) {
                            const countValue =
                              sectionData[
                                item.hasCount as keyof typeof sectionData
                              ];
                            return (
                              <p
                                key={item.key}
                                className="text-sm text-gray-900 dark:text-white"
                              >
                                • {item.label} ({countValue} {item.suffix})
                              </p>
                            );
                          }

                          // Gestion des éléments de type array
                          if (item.isArray && Array.isArray(value)) {
                            return (
                              <div
                                key={item.key}
                                className="mt-2 flex flex-wrap gap-2"
                              >
                                {(value as string[]).includes(item.key) && (
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.color}`}
                                  >
                                    {item.label}
                                  </span>
                                )}
                              </div>
                            );
                          }

                          // Éléments simples
                          return (
                            <p
                              key={item.key}
                              className="text-sm text-gray-900 dark:text-white"
                            >
                              {item.prefix || "• "}
                              {item.label}: {value}
                            </p>
                          );
                        })}
                      </div>
                    )}

                    {/* Section textarea */}
                    {subSection.isTextArea && subSection.key && (
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {sectionData[
                          subSection.key as keyof typeof sectionData
                        ] || subSection.placeholder}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          );

        default:
          return null;
      }
    })
    .filter(Boolean);

  if (renderedSections.length === 0) return null;

  return <>{renderedSections}</>;
}
