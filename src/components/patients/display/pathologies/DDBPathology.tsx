"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function DDBPathology({
  patient,
  pathologyId = "ddb",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Examens complémentaires DDB */}
      <ComplementaryExamsSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
DDBPathology.config = {
  id: "ddb",
  name: "DDB",
  icon: "/icons/ddb.svg",
  description: "Dilatation des bronches",
  component: DDBPathology,
  sections: {
    complementaryExams: true,
  },
} as PathologyConfig;

// Sous-composant pour la section examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.ddbComplementaryExams;
  if (!exams) return null;

  const hasAnyExamData =
    exams.chestXRayImages ||
    exams.ctImages ||
    exams.bronchoscopyImages ||
    exams.ecbcImages ||
    exams.bloodGasImages;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection title="Examens complémentaires DDB" patient={patient}>
      <div className="space-y-6">
        {/* Radiographie thoracique */}
        {exams.chestXRayImages &&
          Array.isArray(exams.chestXRayImages) &&
          exams.chestXRayImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Radiographie thoracique
              </h4>
              <ImageGallery
                images={exams.chestXRayImages}
                title="Radiographie thoracique"
                imageAlt="Radiographie thoracique DDB"
              />
            </div>
          )}

        {/* TDM */}
        {exams.ctImages &&
          Array.isArray(exams.ctImages) &&
          exams.ctImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                TDM
              </h4>
              <ImageGallery
                images={exams.ctImages}
                title="TDM"
                imageAlt="TDM DDB"
              />
            </div>
          )}

        {/* Endoscopie bronchique */}
        {exams.bronchoscopyImages &&
          Array.isArray(exams.bronchoscopyImages) &&
          exams.bronchoscopyImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Endoscopie bronchique
              </h4>
              <ImageGallery
                images={exams.bronchoscopyImages}
                title="Endoscopie bronchique"
                imageAlt="Endoscopie bronchique DDB"
              />
            </div>
          )}

        {/* ECBC */}
        {exams.ecbcImages &&
          Array.isArray(exams.ecbcImages) &&
          exams.ecbcImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                ECBC
              </h4>
              <ImageGallery
                images={exams.ecbcImages}
                title="ECBC"
                imageAlt="ECBC DDB"
              />
            </div>
          )}

        {/* Gazométrie sanguine */}
        {exams.bloodGasImages &&
          Array.isArray(exams.bloodGasImages) &&
          exams.bloodGasImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Gazométrie sanguine
              </h4>
              <ImageGallery
                images={exams.bloodGasImages}
                title="Gazométrie sanguine"
                imageAlt="Gazométrie sanguine DDB"
              />
            </div>
          )}
      </div>
    </PathologySection>
  );
}
