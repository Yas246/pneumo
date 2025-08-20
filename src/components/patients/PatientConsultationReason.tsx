"use client";

import { ExtendedPatient } from "@/app/patients/[id]/page";

// Configuration des motifs de consultation par pathologie
const consultationReasonsConfig = {
  bpco: {
    title: "Motifs de consultation BPCO",
    reasons: [
      {
        key: "chronicCough" as keyof ExtendedPatient["bpcoConsultationReason"],
        label: "Toux chronique",
        color:
          "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
      },
      {
        key: "chronicBronchitis" as keyof ExtendedPatient["bpcoConsultationReason"],
        label: "Bronchite chronique",
        color:
          "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
      },
      {
        key: "chronicDyspnea" as keyof ExtendedPatient["bpcoConsultationReason"],
        label: "Dyspnée chronique",
        color:
          "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
      },
      {
        key: "acuteDyspneaAggravation" as keyof ExtendedPatient["bpcoConsultationReason"],
        label: "Aggravation aigue d'une dyspnée chronique",
        color:
          "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
      },
      {
        key: "frequentRespiratoryInfections" as keyof ExtendedPatient["bpcoConsultationReason"],
        label: "Infections respiratoires fréquentes",
        color:
          "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
      },
      {
        key: "other" as keyof ExtendedPatient["bpcoConsultationReason"],
        label: "Autre",
        color:
          "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
        isOther: true,
      },
    ],
  },
  sleep: {
    title: "Symptômes du sommeil",
    reasons: [
      // Configuration pour la pathologie du sommeil
    ],
  },
};

interface PatientConsultationReasonProps {
  patient: ExtendedPatient | null;
}

export function PatientConsultationReason({
  patient,
}: PatientConsultationReasonProps) {
  if (!patient?.pathologies) return null;

  // Rendu des motifs pour chaque pathologie active
  const renderedSections = patient.pathologies
    .map((pathologyId) => {
      const config =
        consultationReasonsConfig[
          pathologyId as keyof typeof consultationReasonsConfig
        ];
      if (!config) return null;

      const consultationData =
        patient[`${pathologyId}ConsultationReason` as keyof ExtendedPatient];
      if (!consultationData) return null;

      return (
        <div key={pathologyId}>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {config.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {config.reasons.map((reason) => {
              const value =
                consultationData[reason.key as keyof typeof consultationData];

              if (!value && !reason.isOther) return null;

              return (
                <span
                  key={reason.key}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reason.color}`}
                >
                  {reason.isOther && value ? `Autre: ${value}` : reason.label}
                </span>
              );
            })}
          </div>
        </div>
      );
    })
    .filter(Boolean);

  if (renderedSections.length === 0) return null;

  return <>{renderedSections}</>;
}
