"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function PleuralEffusionPathology({
  patient,
  pathologyId = "pleuralEffusion",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Imagerie Épanchement Pleural */}
      <ImagingSection patient={patient} />

      {/* Section 2: Diagnostic Épanchement Pleural */}
      <DiagnosticSection patient={patient} />

      {/* Section 3: Traitement Épanchement Pleural */}
      <TreatmentSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
PleuralEffusionPathology.config = {
  id: "pleuralEffusion",
  name: "Épanchement Pleural",
  icon: "/icons/pleuralEffusion.svg",
  description: "Épanchement pleural et étiologies associées",
  component: PleuralEffusionPathology,
  sections: {
    imaging: true,
    diagnosis: true,
    treatment: true,
  },
} as PathologyConfig;

// Sous-composant pour la section imagerie
function ImagingSection({ patient }: { patient: ExtendedPatient }) {
  const imaging = patient?.pleuralEffusionImaging;
  if (!imaging) return null;

  const hasAnyImagingData =
    imaging.thoracicEchoImages ||
    imaging.thoracicCTImages ||
    imaging.abdominalEchoImages ||
    imaging.ettImages ||
    imaging.otherImagingImages;

  if (!hasAnyImagingData) return null;

  return (
    <PathologySection title="Imagerie Épanchement Pleural" patient={patient}>
      <div className="space-y-6">
        {/* Échographie thoracique */}
        {imaging.thoracicEchoImages &&
          Array.isArray(imaging.thoracicEchoImages) &&
          imaging.thoracicEchoImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Échographie thoracique
              </h4>
              <ImageGallery
                images={imaging.thoracicEchoImages}
                title="Échographie thoracique"
                imageAlt="Échographie thoracique"
              />
            </div>
          )}

        {/* TDM thoracique */}
        {imaging.thoracicCTImages &&
          Array.isArray(imaging.thoracicCTImages) &&
          imaging.thoracicCTImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                TDM thoracique
              </h4>
              <ImageGallery
                images={imaging.thoracicCTImages}
                title="TDM thoracique"
                imageAlt="TDM thoracique"
              />
            </div>
          )}

        {/* Échographie abdominale */}
        {imaging.abdominalEchoImages &&
          Array.isArray(imaging.abdominalEchoImages) &&
          imaging.abdominalEchoImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Échographie abdominale
              </h4>
              <ImageGallery
                images={imaging.abdominalEchoImages}
                title="Échographie abdominale"
                imageAlt="Échographie abdominale"
              />
            </div>
          )}

        {/* ETT (Échographie TransThoracique) */}
        {imaging.ettImages &&
          Array.isArray(imaging.ettImages) &&
          imaging.ettImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Échographie TransThoracique (ETT)
              </h4>
              <ImageGallery
                images={imaging.ettImages}
                title="Échographie TransThoracique"
                imageAlt="Échographie TransThoracique"
              />
            </div>
          )}

        {/* Autres imageries */}
        {imaging.otherImagingImages &&
          Array.isArray(imaging.otherImagingImages) &&
          imaging.otherImagingImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Autres imageries
              </h4>
              <ImageGallery
                images={imaging.otherImagingImages}
                title="Autres imageries"
                imageAlt="Autres imageries"
              />
            </div>
          )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section diagnostic
function DiagnosticSection({ patient }: { patient: ExtendedPatient }) {
  const diagnosis = patient?.pleuralEffusionDiagnosis;
  if (!diagnosis) return null;
  const hasAnyDiagnosticData = diagnosis.type || diagnosis.etiology;
  if (!hasAnyDiagnosticData) return null;

  return (
    <PathologySection title="Diagnostic Épanchement Pleural" patient={patient}>
      <div className="space-y-4">
        {/* Type d'épanchement */}
        {diagnosis.type && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Type d&apos;épanchement
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diagnosis.type || "Non spécifié"}
            </p>
          </div>
        )}

        {/* Étiologie */}
        {diagnosis.etiology && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Étiologie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diagnosis.etiology || "Non spécifié"}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = patient?.pleuralEffusionTreatment;
  if (!treatment) return null;

  const hasAnyTreatmentData =
    treatment.conservative ||
    treatment.drainage ||
    treatment.surgical ||
    treatment.specificTreatment;

  if (!hasAnyTreatmentData) return null;

  return (
    <PathologySection title="Traitement Épanchement Pleural" patient={patient}>
      <div className="space-y-6">
        {/* Traitement conservateur */}
        {treatment.conservative && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement conservateur
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {treatment.conservative}
            </p>
          </div>
        )}

        {/* Traitement par drainage */}
        {treatment.drainage && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement par drainage
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {treatment.drainage}
            </p>
          </div>
        )}

        {/* Traitement chirurgical */}
        {treatment.surgical && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement chirurgical
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {treatment.surgical}
            </p>
          </div>
        )}

        {/* Traitement spécifique */}
        {treatment.specificTreatment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement spécifique
            </p>
            <div className="mt-2 space-y-2">
              {treatment.specificTreatment && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Ciblé selon l&apos;étiologie:{" "}
                  {treatment.specificTreatment}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
