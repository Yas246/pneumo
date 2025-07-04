export interface Pathology {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const pathologies: Pathology[] = [
  {
    id: "sleep",
    name: "Troubles respiratoires du sommeil",
    icon: "/icons/allergy.svg",
    description: "SAOS, SACS, SOH et autres troubles du sommeil",
  },
  {
    id: "tumor",
    name: "Pneumopathies tumorales",
    icon: "/icons/tumor.svg",
    description: "Cancer et tumeurs pulmonaires",
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
  {
    id: "pleuralEffusion",
    name: "Épanchement pleural",
    icon: "/icons/pleuralEffusion.svg",
    description: "Diagnostic et traitement des épanchements pleuraux",
  },
  {
    id: "pid",
    name: "Pneumopathie Interstitielle Diffuse",
    icon: "/icons/pid.svg",
    description:
      "Diagnostic et traitement des pneumopathies interstitielles diffuses",
  },
];
