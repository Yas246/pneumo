/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ExtendedPatient } from "@/components/patients/display/types";
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

      // Récupérer les données de la section selon la pathologie
      let sectionData: any = null;

      if (pathologyId === "asthma") {
        // Pour asthma, les données sont organisées différemment
        switch (sectionName as string) {
          case "clinicalExam":
            sectionData = {
              asthmaGeneralState: patient.asthmaGeneralState,
              asthmaRespiratorySystem: patient.asthmaRespiratorySystem,
              asthmaCardiovascularSystem: patient.asthmaCardiovascularSystem,
              asthmaDigestiveSystem: patient.asthmaDigestiveSystem,
              asthmaUrinarySystem: patient.asthmaUrinarySystem,
              asthmaMusculoskeletalSystem: patient.asthmaMusculoskeletalSystem,
              asthmaNervousSystem: patient.asthmaNervousSystem,
              asthmaSkinMucous: patient.asthmaSkinMucous,
              asthmaOrlEyesMouth: patient.asthmaOrlEyesMouth,
              asthmaOtherClinicalRemarks: patient.asthmaOtherClinicalRemarks,
            };
            break;
          case "complementaryExams":
            sectionData = patient.asthmaComplementaryExams;
            break;
          case "diagnosis":
            sectionData = patient.asthmaSeverityClassification;
            break;
          case "treatment":
            sectionData = patient.asthmaTreatment;
            break;
          case "followUp":
            sectionData = patient.asthmaFollowUp;
            break;
        }
      } else if (pathologyId === "pneumothorax") {
        // Pour pneumothorax, les données sont organisées différemment
        switch (sectionName as string) {
          case "treatment":
            sectionData = {
              pneumothoraxManagement: patient.pneumothoraxManagement,
              pneumothoraxTreatmentDischarge:
                patient.pneumothoraxTreatmentDischarge,
            };
            break;
          default:
            sectionData =
              patient[`${pathologyId}${dataPrefix}` as keyof ExtendedPatient];
            break;
        }
      } else if (pathologyId === "sleep") {
        // Pour sleep, les données sont directement sur l'objet patient (pas de préfixe)
        switch (sectionName as string) {
          case "clinicalExam":
            sectionData = patient?.clinicalExam;
            break;
          case "complementaryExams":
            sectionData = patient?.complementaryExams;
            break;
          case "diagnosis":
            sectionData = patient?.diagnosis;
            break;
          case "treatment":
            sectionData = patient?.treatment;
            break;
          default:
            sectionData = null;
        }
      } else {
        // Pour les autres pathologies
        sectionData =
          patient[`${pathologyId}${dataPrefix}` as keyof ExtendedPatient];
      }

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
                          // Pour asthma, on doit d'abord trouver le bon sous-objet
                          let value: any = null;
                          if (
                            pathologyId === "asthma" &&
                            (sectionName as string) === "clinicalExam"
                          ) {
                            for (const subObjKey of Object.keys(sectionData)) {
                              const subObj = sectionData[subObjKey];
                              if (
                                subObj &&
                                typeof subObj === "object" &&
                                item.key in subObj
                              ) {
                                value = subObj[item.key as keyof typeof subObj];
                                break;
                              }
                            }
                          } else {
                            value =
                              sectionData[item.key as keyof typeof sectionData];
                          }

                          if (!value && !item.isArray) return null;

                          // Gestion des éléments avec comptage
                          if (item.hasCount) {
                            // Pour asthma, chercher la valeur de comptage dans les sous-objets
                            let countValue: any = null;
                            if (
                              pathologyId === "asthma" &&
                              (sectionName as string) === "clinicalExam"
                            ) {
                              for (const subObjKey of Object.keys(
                                sectionData
                              )) {
                                const subObj = sectionData[subObjKey];
                                if (
                                  subObj &&
                                  typeof subObj === "object" &&
                                  item.hasCount in subObj
                                ) {
                                  countValue =
                                    subObj[
                                      item.hasCount as keyof typeof subObj
                                    ];
                                  break;
                                }
                              }
                            } else {
                              countValue =
                                sectionData[
                                  item.hasCount as keyof typeof sectionData
                                ];
                            }
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

        case "clinicalExam":
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
                          // Pour asthma, on doit d'abord trouver le bon sous-objet
                          let value: any = null;
                          if (
                            pathologyId === "asthma" &&
                            (sectionName as string) === "clinicalExam"
                          ) {
                            for (const subObjKey of Object.keys(sectionData)) {
                              const subObj = sectionData[subObjKey];
                              if (
                                subObj &&
                                typeof subObj === "object" &&
                                item.key in subObj
                              ) {
                                value = subObj[item.key as keyof typeof subObj];
                                break;
                              }
                            }
                          } else {
                            value =
                              sectionData[item.key as keyof typeof sectionData];
                          }

                          if (!value && !item.isArray && !item.condition)
                            return null;

                          // Gestion des éléments avec condition
                          if (item.condition) {
                            // Pour asthma, chercher la condition dans les sous-objets
                            let conditionValue: any = null;
                            if (
                              pathologyId === "asthma" &&
                              (sectionName as string) === "clinicalExam"
                            ) {
                              for (const subObjKey of Object.keys(
                                sectionData
                              )) {
                                const subObj = sectionData[subObjKey];
                                if (
                                  subObj &&
                                  typeof subObj === "object" &&
                                  item.condition in subObj
                                ) {
                                  conditionValue =
                                    subObj[
                                      item.condition as keyof typeof subObj
                                    ];
                                  break;
                                }
                              }
                            } else {
                              conditionValue =
                                sectionData[
                                  item.condition as keyof typeof sectionData
                                ];
                            }
                            if (!conditionValue) return null;
                          }

                          // Gestion des éléments avec comptage
                          if (item.hasCount) {
                            // Pour asthma, chercher la valeur de comptage dans les sous-objets
                            let countValue: any = null;
                            if (
                              pathologyId === "asthma" &&
                              (sectionName as string) === "clinicalExam"
                            ) {
                              for (const subObjKey of Object.keys(
                                sectionData
                              )) {
                                const subObj = sectionData[subObjKey];
                                if (
                                  subObj &&
                                  typeof subObj === "object" &&
                                  item.hasCount in subObj
                                ) {
                                  countValue =
                                    subObj[
                                      item.hasCount as keyof typeof subObj
                                    ];
                                  break;
                                }
                              }
                            } else {
                              countValue =
                                sectionData[
                                  item.hasCount as keyof typeof sectionData
                                ];
                            }
                            return (
                              <p
                                key={item.key}
                                className="text-sm text-gray-900 dark:text-white"
                              >
                                {item.prefix || "• "}
                                {item.label}: {value} ({countValue}{" "}
                                {item.suffix})
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
                                {(value as string[]).map(
                                  (arrayItem: string) => (
                                    <span
                                      key={arrayItem}
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.color}`}
                                    >
                                      {arrayItem}
                                    </span>
                                  )
                                )}
                              </div>
                            );
                          }

                          // Éléments simples avec suffix/prefix
                          return (
                            <p
                              key={item.key}
                              className="text-sm text-gray-900 dark:text-white"
                            >
                              {item.prefix || "• "}
                              {item.label}: {value} {item.suffix}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          );

        case "complementaryExams":
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
                          // Pour asthma, on doit d'abord trouver le bon sous-objet
                          let value: any = null;
                          if (
                            pathologyId === "asthma" &&
                            (sectionName as string) === "clinicalExam"
                          ) {
                            for (const subObjKey of Object.keys(sectionData)) {
                              const subObj = sectionData[subObjKey];
                              if (
                                subObj &&
                                typeof subObj === "object" &&
                                item.key in subObj
                              ) {
                                value = subObj[item.key as keyof typeof subObj];
                                break;
                              }
                            }
                          } else {
                            value =
                              sectionData[item.key as keyof typeof sectionData];
                          }

                          if (!value && !item.condition) return null;

                          // Gestion des éléments avec condition
                          if (item.condition) {
                            // Pour asthma, chercher la condition dans les sous-objets
                            let conditionValue: any = null;
                            if (
                              pathologyId === "asthma" &&
                              (sectionName as string) === "clinicalExam"
                            ) {
                              for (const subObjKey of Object.keys(
                                sectionData
                              )) {
                                const subObj = sectionData[subObjKey];
                                if (
                                  subObj &&
                                  typeof subObj === "object" &&
                                  item.condition in subObj
                                ) {
                                  conditionValue =
                                    subObj[
                                      item.condition as keyof typeof subObj
                                    ];
                                  break;
                                }
                              }
                            } else {
                              conditionValue =
                                sectionData[
                                  item.condition as keyof typeof sectionData
                                ];
                            }
                            if (!conditionValue) return null;
                          }

                          // Éléments avec suffix/prefix
                          return (
                            <p
                              key={item.key}
                              className="text-sm text-gray-900 dark:text-white"
                            >
                              {item.prefix || "• "}
                              {item.label}: {value} {item.suffix}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          );

        case "diagnosis":
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
                          // Pour asthma, on doit d'abord trouver le bon sous-objet
                          let value: any = null;
                          if (
                            pathologyId === "asthma" &&
                            (sectionName as string) === "clinicalExam"
                          ) {
                            for (const subObjKey of Object.keys(sectionData)) {
                              const subObj = sectionData[subObjKey];
                              if (
                                subObj &&
                                typeof subObj === "object" &&
                                item.key in subObj
                              ) {
                                value = subObj[item.key as keyof typeof subObj];
                                break;
                              }
                            }
                          } else {
                            value =
                              sectionData[item.key as keyof typeof sectionData];
                          }

                          if (!value) return null;

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
                  </div>
                )
              )}
            </div>
          );

        case "treatment":
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
                          // Pour asthma, on doit d'abord trouver le bon sous-objet
                          let value: any = null;
                          if (
                            pathologyId === "asthma" &&
                            (sectionName as string) === "clinicalExam"
                          ) {
                            for (const subObjKey of Object.keys(sectionData)) {
                              const subObj = sectionData[subObjKey];
                              if (
                                subObj &&
                                typeof subObj === "object" &&
                                item.key in subObj
                              ) {
                                value = subObj[item.key as keyof typeof subObj];
                                break;
                              }
                            }
                          } else {
                            value =
                              sectionData[item.key as keyof typeof sectionData];
                          }

                          if (!value && !item.isArray) return null;

                          // Gestion des éléments de type array
                          if (item.isArray && Array.isArray(value)) {
                            return (
                              <div
                                key={item.key}
                                className="mt-2 flex flex-wrap gap-2"
                              >
                                {(value as string[]).map(
                                  (arrayItem: string) => (
                                    <span
                                      key={arrayItem}
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.color}`}
                                    >
                                      {arrayItem}
                                    </span>
                                  )
                                )}
                              </div>
                            );
                          }

                          // Éléments simples avec suffix
                          return (
                            <p
                              key={item.key}
                              className="text-sm text-gray-900 dark:text-white"
                            >
                              {item.prefix || "• "}
                              {item.label}: {value} {item.suffix}
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

        case "followUp":
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
                          // Pour asthma, on doit d'abord trouver le bon sous-objet
                          let value: any = null;
                          if (
                            pathologyId === "asthma" &&
                            (sectionName as string) === "clinicalExam"
                          ) {
                            for (const subObjKey of Object.keys(sectionData)) {
                              const subObj = sectionData[subObjKey];
                              if (
                                subObj &&
                                typeof subObj === "object" &&
                                item.key in subObj
                              ) {
                                value = subObj[item.key as keyof typeof subObj];
                                break;
                              }
                            }
                          } else {
                            value =
                              sectionData[item.key as keyof typeof sectionData];
                          }

                          if (!value) return null;

                          return (
                            <p
                              key={item.key}
                              className="text-sm text-gray-900 dark:text-white"
                            >
                              {item.prefix || "• "}
                              {item.label}: {value} {item.suffix}
                            </p>
                          );
                        })}
                      </div>
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
