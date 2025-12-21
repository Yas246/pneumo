// Composants partagés
export { ImageGallery } from "./shared/ImageGallery";
export { PathologiesList } from "./shared/PathologiesList";
export { PatientActions } from "./shared/PatientActions";
export { PatientHeader } from "./shared/PatientHeader";
export { PersonalInfo } from "./shared/PersonalInfo";
export { SectionHeader } from "./shared/SectionHeader";

// Composants de pathologie
export {
  AsthmaPathology,
  BPCOPathology,
  getImplementedPathologies,
  isPathologyImplemented,
  LungCancerPathology,
  PathologyDebugHelper,
  PathologyRenderer,
  PathologySection,
  SleepPathology,
  TBKPathology,
} from "./pathologies";

// Types et interfaces
export type {
  PathologyConfig,
  PathologySectionProps,
  SectionProps,
} from "./types";

// Configuration et utilitaires
export {
  getPathologyConfig,
  isPathologyConfigured,
  pathologyConfigs,
} from "./pathologies";
