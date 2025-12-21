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
  {
    id: "bpco",
    name: "Bronchopneumopathie Chronique Obstructive",
    icon: "/icons/bpco.svg",
    description: "Diagnostic et traitement de la BPCO",
  },
  {
    id: "asthma",
    name: "Asthme",
    icon: "/icons/asthma.svg",
    description: "Diagnostic et traitement de l'asthme",
  },
  {
    id: "ddb",
    name: "Dilatation des Bronches",
    icon: "/icons/ddb.svg",
    description: "Diagnostic et traitement de la dilatation des bronches",
  },
  {
    id: "tbk",
    name: "Tuberculose",
    icon: "/icons/infection.svg",
    description: "Diagnostic et traitement de la tuberculose",
  },
  {
    id: "pneumothorax",
    name: "Pneumothorax",
    icon: "/icons/pneumothorax.svg",
    description: "Diagnostic et traitement du pneumothorax",
  },
  {
    id: "lungCancer",
    name: "Cancer broncho-pulmonaire",
    icon: "/icons/lungCancer.svg",
    description: "Diagnostic et traitement du cancer du poumon",
  },
];
