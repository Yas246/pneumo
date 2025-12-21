"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function PIDPathology({
  patient,
  pathologyId = "pid",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Examens complémentaires PID */}
      <ComplementaryExamsSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
PIDPathology.config = {
  id: "pid",
  name: "PID",
  icon: "/icons/pid.svg",
  description: "Pneumopathie interstitielle diffuse",
  component: PIDPathology,
  sections: {
    complementaryExams: true,
  },
} as PathologyConfig;

// Sous-composant pour la section examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.pidComplementaryExams;
  if (!exams) return null;

  const hasAnyExamData =
    exams.chestXRay?.imageFiles ||
    exams.chestCT?.imageFiles ||
    exams.handXRay?.imageFiles ||
    exams.sinusCT?.imageFiles;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection title="Examens complémentaires PID" patient={patient}>
      <div className="space-y-6">
        {/* Radiographie thoracique */}
        {exams.chestXRay?.imageFiles &&
          Array.isArray(exams.chestXRay.imageFiles) &&
          exams.chestXRay.imageFiles.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Radiographie thoracique
              </h4>
              <ImageGallery
                images={exams.chestXRay.imageFiles}
                title="Radiographie thoracique"
                imageAlt="Radiographie thoracique PID"
              />
            </div>
          )}

        {/* Scanner thoracique */}
        {exams.chestCT?.imageFiles &&
          Array.isArray(exams.chestCT.imageFiles) &&
          exams.chestCT.imageFiles.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Scanner thoracique
              </h4>
              <ImageGallery
                images={exams.chestCT.imageFiles}
                title="Scanner thoracique"
                imageAlt="Scanner thoracique PID"
              />
            </div>
          )}

        {/* Radiographie des mains */}
        {exams.handXRay?.imageFiles &&
          Array.isArray(exams.handXRay.imageFiles) &&
          exams.handXRay.imageFiles.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Radiographie des mains
              </h4>
              <ImageGallery
                images={exams.handXRay.imageFiles}
                title="Radiographie des mains"
                imageAlt="Radiographie des mains PID"
              />
            </div>
          )}

        {/* Scanner des sinus */}
        {exams.sinusCT?.imageFiles &&
          Array.isArray(exams.sinusCT.imageFiles) &&
          exams.sinusCT.imageFiles.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Scanner des sinus
              </h4>
              <ImageGallery
                images={exams.sinusCT.imageFiles}
                title="Scanner des sinus"
                imageAlt="Scanner des sinus PID"
              />
            </div>
          )}
      </div>
    </PathologySection>
  );
}
