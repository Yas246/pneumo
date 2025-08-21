/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ExtendedPatient } from "@/app/patients/[id]/page";

// Configuration des antécédents médicaux par pathologie
const medicalHistoryConfig = {
  bpco: {
    sections: [
      {
        title: "Antécédents respiratoires BPCO",
        items: [
          {
            key: "asthma" as keyof ExtendedPatient["bpcoMedicalHistory"],
            label: "Asthme",
            hasCount: "asthmaExacerbationsPerYear",
            suffix: "exacerbations/an",
          },
          {
            key: "bpco" as keyof ExtendedPatient["bpcoMedicalHistory"],
            label: "BPCO",
            hasCount: "bpcoExacerbationsPerYear",
            suffix: "exacerbations/an",
          },
          { key: "tuberculosis", label: "Tuberculose" },
          { key: "pneumonia", label: "Pneumonies" },
          {
            key: "recurrentRespiratoryInfections",
            label: "Infections respiratoires à répétition",
          },
        ],
      },
      {
        title: "Exposition professionnelle BPCO",
        items: [
          { key: "professionalPollutants", label: "Polluants professionnels" },
          { key: "domesticPollutants", label: "Polluants domestiques" },
          { key: "urbanPollutants", label: "Polluants urbains" },
        ],
      },
      {
        title: "Autres antécédents BPCO",
        items: [
          { key: "rgo", label: "RGO" },
          { key: "hepatopathy", label: "Hépatopathie" },
          { key: "nephropathy", label: "Néphropathie" },
          { key: "cardiopathy", label: "Cardiopathie" },
          { key: "connectiveTissue", label: "Connectivite" },
          { key: "neoplasia", label: "Néooplasie" },
          { key: "other", label: "Autres" },
        ],
      },
      {
        title: "Antécédents chirurgicaux BPCO",
        key: "surgicalHistory",
        isTextArea: true,
        placeholder: "Aucun",
      },
      {
        title: "Vaccination BPCO",
        key: "vaccinations",
        isArray: true,
        items: [
          {
            key: "annualFlu",
            label: "Grippe annuelle",
            color:
              "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
          },
          {
            key: "pneumococcal",
            label: "Pneumocoque",
            color:
              "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
          },
          {
            key: "sarsCov2",
            label: "SARS-CoV-2",
            color:
              "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
          },
        ],
      },
      {
        title: "Toxiques BPCO",
        items: [
          { key: "smokingStatus", label: "Statut tabagique" },
          { key: "paquetsAnnees", label: "PA", prefix: "• " },
          { key: "cannabis", label: "Cannabis", prefix: "• " },
          { key: "alcohol", label: "Alcool", prefix: "• " },
        ],
      },
    ],
  },
  asthma: {
    sections: [
      {
        title: "Antécédents médicaux Asthme",
        items: [
          { key: "knownAsthma", label: "Asthme connu" },
          { key: "asthmaSince", label: "Asthme depuis", prefix: "• " },
          { key: "allergicRhinitis", label: "Rhinite allergique" },
          {
            key: "eczemaAtopicDermatitis",
            label: "Eczéma / Dermatite atopique",
          },
          { key: "gerd", label: "RGO" },
          { key: "other", label: "Autres", prefix: "• " },
        ],
      },
      {
        title: "Antécédents chirurgicaux Asthme",
        key: "surgicalHistory",
        isTextArea: true,
        placeholder: "Aucun",
      },
      {
        title: "Allergies connues",
        items: [
          {
            key: "respiratoryAllergens",
            label: "Allergènes respiratoires",
            isArray: true,
            color:
              "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
          },
          {
            key: "drugAllergies",
            label: "Allergies médicamenteuses",
            hasCount: "drugAllergiesDetails",
            suffix: "",
          },
          {
            key: "otherAllergies",
            label: "Autres allergies",
            hasCount: "otherAllergiesDetails",
            suffix: "",
          },
        ],
      },
      {
        title: "Antécédents familiaux",
        items: [
          { key: "parentAsthmatic", label: "Parent asthmatique" },
          { key: "familyAtopy", label: "Atopie familiale" },
          { key: "familyOther", label: "Autres", prefix: "• " },
        ],
      },
      {
        title: "Tabac",
        items: [
          { key: "smokingStatus", label: "Statut tabagique", prefix: "• " },
          {
            key: "tobaccoQuantity",
            label: "Quantité (Tabac)",
            prefix: "• ",
            suffix: " PA",
          },
          { key: "cannabis", label: "Cannabis", prefix: "• " },
          { key: "otherToxic", label: "Autres (Toxiques)", prefix: "• " },
        ],
      },
    ],
  },
};

interface PatientMedicalHistoryProps {
  patient: ExtendedPatient | null;
}

export function PatientMedicalHistory({ patient }: PatientMedicalHistoryProps) {
  if (!patient?.pathologies) return null;

  // Rendu des antécédents pour chaque pathologie active
  const renderedSections = patient.pathologies
    .map((pathologyId) => {
      const config =
        medicalHistoryConfig[pathologyId as keyof typeof medicalHistoryConfig];
      if (!config) return null;

      const historyData =
        patient[`${pathologyId}MedicalHistory` as keyof ExtendedPatient];
      if (!historyData) return null;

      return (
        <div key={pathologyId} className="space-y-6">
          {config.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {section.title}
              </p>

              {/* Section avec éléments individuels */}
              {section.items && (
                <div className="mt-2 space-y-2">
                  {section.items.map((item: any) => {
                    const value =
                      historyData[item.key as keyof typeof historyData];

                    if (!value && !item.isArray) return null;

                    // Gestion des éléments avec comptage
                    if (item.hasCount) {
                      const countValue =
                        historyData[item.hasCount as keyof typeof historyData];
                      return (
                        <p
                          key={item.key}
                          className="text-sm text-gray-900 dark:text-white"
                        >
                          • {item.label} ({countValue} {item.suffix})
                        </p>
                      );
                    }

                    // Gestion des éléments de type array (vaccinations)
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
              {section.isTextArea && section.key && (
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {historyData[section.key as keyof typeof historyData] ||
                    section.placeholder}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    })
    .filter(Boolean);

  if (renderedSections.length === 0) return null;

  return <>{renderedSections}</>;
}
