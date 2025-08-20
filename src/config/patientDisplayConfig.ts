export interface PathologyDisplayConfig {
  id: string;
  sections: {
    consultationReason?: {
      title: string;
      reasons: Array<{
        key: string;
        label: string;
        color: string;
        isOther?: boolean;
      }>;
    };
    medicalHistory?: {
      sections: Array<{
        title: string;
        items?: Array<{
          key: string;
          label: string;
          hasCount?: string;
          suffix?: string;
          prefix?: string;
          isArray?: boolean;
          color?: string;
        }>;
        key?: string;
        isTextArea?: boolean;
        placeholder?: string;
        isArray?: boolean;
      }>;
    };
    clinicalExam?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          type?: "text" | "number" | "boolean";
          prefix?: string;
        }>;
      }>;
    };
    complementaryExams?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          unit?: string;
          type?: "text" | "number";
        }>;
      }>;
    };
    diagnosis?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          color?: string;
        }>;
      }>;
    };
    treatment?: {
      sections: Array<{
        title: string;
        items?: Array<{
          key: string;
          label: string;
          color?: string;
          isArray?: boolean;
        }>;
        key?: string;
        isTextArea?: boolean;
      }>;
    };
    followUp?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          type?: "text" | "date";
        }>;
      }>;
    };
  };
}

// Configuration centralisée pour toutes les pathologies
export const pathologyDisplayConfigs: Record<string, PathologyDisplayConfig> = {
  bpco: {
    id: "bpco",
    sections: {
      consultationReason: {
        title: "Motifs de consultation BPCO",
        reasons: [
          {
            key: "chronicCough",
            label: "Toux chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "chronicBronchitis",
            label: "Bronchite chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "chronicDyspnea",
            label: "Dyspnée chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "acuteDyspneaAggravation",
            label: "Aggravation aigue d'une dyspnée chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "frequentRespiratoryInfections",
            label: "Infections respiratoires fréquentes",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "other",
            label: "Autre",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
            isOther: true,
          },
        ],
      },
      medicalHistory: {
        sections: [
          {
            title: "Antécédents respiratoires BPCO",
            items: [
              {
                key: "asthma",
                label: "Asthme",
                hasCount: "asthmaExacerbationsPerYear",
                suffix: "exacerbations/an",
              },
              {
                key: "bpco",
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
              {
                key: "professionalPollutants",
                label: "Polluants professionnels",
              },
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
    },
  },
};

// Utilitaires pour accéder aux configurations
export const getPathologyConfig = (
  pathologyId: string
): PathologyDisplayConfig | null => {
  return pathologyDisplayConfigs[pathologyId] || null;
};

export const getSectionConfig = (
  pathologyId: string,
  sectionName: keyof PathologyDisplayConfig["sections"]
) => {
  const config = getPathologyConfig(pathologyId);
  return config?.sections[sectionName] || null;
};
