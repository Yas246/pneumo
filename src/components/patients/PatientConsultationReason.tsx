"use client";

import { ExtendedPatient } from "@/components/patients/display/types";

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
  asthma: {
    title: "Motifs de consultation Asthme",
    reasons: [
      {
        key: "expiratoryDyspnea" as keyof ExtendedPatient["asthmaConsultationReason"],
        label: "Dyspnée expiratoire",
        color:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      },
      {
        key: "dryCough" as keyof ExtendedPatient["asthmaConsultationReason"],
        label: "Toux sèche",
        color:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      },
      {
        key: "nocturnalCrisis" as keyof ExtendedPatient["asthmaConsultationReason"],
        label: "Crise nocturne",
        color:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      },
      {
        key: "thoracicOppression" as keyof ExtendedPatient["asthmaConsultationReason"],
        label: "Oppression thoracique",
        color:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      },
      {
        key: "other" as keyof ExtendedPatient["asthmaConsultationReason"],
        label: "Autre",
        color:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
        isOther: true,
      },
    ],
  },
  pneumothorax: {
    title: "Motifs de consultation Pneumothorax",
    reasons: [
      {
        key: "thoracicPain" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Douleur thoracique",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      {
        key: "dyspnea" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Dyspnée",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      {
        key: "cough" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Toux",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      {
        key: "thoracicOppression" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Oppression thoracique",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      {
        key: "malaiseSyncope" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Malaise/Syncope",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      {
        key: "radiologicalDiscovery" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Découverte radiologique",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
      },
      {
        key: "other" as keyof ExtendedPatient["pneumothoraxConsultationReason"],
        label: "Autre",
        color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
        isOther: true,
      },
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
