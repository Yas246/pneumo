// Composants de pathologie
export { AsthmaPathology } from "./AsthmaPathology";
export { BPCOPathology } from "./BPCOPathology";
export { DDBPathology } from "./DDBPathology";
export { LungCancerPathology } from "./LungCancerPathology";
export { PathologyDebugHelper } from "./PathologyDebugHelper";
export {
  getImplementedPathologies,
  isPathologyImplemented,
  PathologyRenderer,
} from "./PathologyRenderer";
export { PathologySection } from "./PathologySection";
export { PIDPathology } from "./PIDPathology";
export { PleuralEffusionPathology } from "./PleuralEffusionPathology";
export { PneumothoraxPathology } from "./PneumothoraxPathology";
export { SleepPathology } from "./SleepPathology";
export { TBKPathology } from "./TBKPathology";

// Types et interfaces
export type { PathologyConfig, PathologySectionProps } from "../types";

// Configuration des pathologies (à étendre au fur et à mesure de l'implémentation)
export const pathologyConfigs = {
  sleep: {
    id: "sleep",
    name: "Troubles respiratoires du sommeil",
    icon: "/icons/allergy.svg",
    description: "SAOS, SACS, SOH et autres troubles du sommeil",
    sections: {
      complementaryExams: true,
      diagnosis: true,
      treatment: true,
    },
  },
  // Autres configurations à ajouter lors de l'implémentation des autres pathologies
  bpco: {
    id: "bpco",
    name: "BPCO",
    icon: "/icons/bpco.svg",
    description: "Bronchopneumopathie chronique obstructive",
    sections: {
      clinicalExam: true,
      complementaryExams: true,
      diagnosis: true,
      treatment: true,
      followUp: true,
    },
  },
  asthma: {
    id: "asthma",
    name: "Asthme",
    icon: "/icons/asthma.svg",
    description: "Asthme et manifestations allergiques respiratoires",
    sections: {
      clinicalExam: true,
      complementaryExams: true,
      diagnosis: true,
      treatment: true,
      followUp: true,
    },
  },
  pleuralEffusion: {
    id: "pleuralEffusion",
    name: "Épanchement Pleural",
    icon: "/icons/pleuralEffusion.svg",
    description: "Épanchement pleural",
    sections: {
      imaging: true,
      diagnosis: true,
      treatment: true,
    },
  },
  pneumothorax: {
    id: "pneumothorax",
    name: "Pneumothorax",
    icon: "/icons/pneumothorax.svg",
    description: "Pneumothorax",
    sections: {
      clinicalExam: true,
      complementaryExams: true,
      diagnosis: true,
      management: true,
      monitoring: true,
      treatmentDischarge: true,
    },
  },
  pid: {
    id: "pid",
    name: "PID",
    icon: "/icons/pid.svg",
    description: "Pneumopathie interstitielle diffuse",
    sections: {
      complementaryExams: true,
    },
  },
  ddb: {
    id: "ddb",
    name: "DDB",
    icon: "/icons/ddb.svg",
    description: "Dilatation des bronches",
    sections: {
      complementaryExams: true,
    },
  },
  tbk: {
    id: "tbk",
    name: "TBK",
    icon: "/icons/infection.svg",
    description: "Tuberculose",
    sections: {
      clinicalExam: true,
      complementaryExams: true,
      diagnosis: true,
      treatment: true,
      followUp: true,
    },
  },
  lungCancer: {
    id: "lungCancer",
    name: "Cancer du Poumon",
    icon: "/icons/lungCancer.svg",
    description: "Cancer bronchopulmonaire",
    sections: {
      clinicalExam: true,
      complementaryExams: true,
      diagnosis: true,
      treatment: true,
      followUp: true,
    },
  },
} as const;

// Fonction utilitaire pour obtenir la configuration d'une pathologie
export function getPathologyConfig(pathologyId: string) {
  return pathologyConfigs[pathologyId as keyof typeof pathologyConfigs];
}

// Fonction utilitaire pour vérifier si une pathologie est configurée
export function isPathologyConfigured(pathologyId: string): boolean {
  return pathologyId in pathologyConfigs;
}
