"use client";

import { ExtendedPatient } from "../types";
import { AsthmaPathology } from "./AsthmaPathology";
import { BPCOPathology } from "./BPCOPathology";
import { SleepPathology } from "./SleepPathology";

// Import des autres composants de pathologie
import { DDBPathology } from "./DDBPathology";
import { LungCancerPathology } from "./LungCancerPathology";
import { PIDPathology } from "./PIDPathology";
import { PleuralEffusionPathology } from "./PleuralEffusionPathology";
import { PneumothoraxPathology } from "./PneumothoraxPathology";
import { TBKPathology } from "./TBKPathology";

// Configuration des composants de pathologie
const pathologyComponents: Record<
  string,
  React.ComponentType<{
    patient: ExtendedPatient;
    pathologyId?: string;
    className?: string;
  }>
> = {
  sleep: SleepPathology,
  bpco: BPCOPathology,
  asthma: AsthmaPathology,
  pleuralEffusion: PleuralEffusionPathology,
  pneumothorax: PneumothoraxPathology,
  pid: PIDPathology,
  ddb: DDBPathology,
  tbk: TBKPathology,
  lungCancer: LungCancerPathology,
};

interface PathologyRendererProps {
  patient: ExtendedPatient;
  className?: string;
}

export function PathologyRenderer({
  patient,
  className = "",
}: PathologyRendererProps) {
  // Log de diagnostic : vérifier les pathologies du patient
  console.log("PathologyRenderer - patient.pathologies:", patient?.pathologies);
  console.log(
    "PathologyRenderer - Available pathology components:",
    Object.keys(pathologyComponents)
  );

  if (!patient?.pathologies || patient.pathologies.length === 0) {
    console.log("PathologyRenderer - No pathologies found for patient");
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">
          Aucune pathologie enregistrée pour ce patient
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {patient.pathologies.map((pathologyId) => {
        console.log(`PathologyRenderer - Processing pathology: ${pathologyId}`);
        const PathologyComponent = pathologyComponents[pathologyId];

        if (!PathologyComponent) {
          console.log(
            `PathologyRenderer - No component found for pathology: ${pathologyId}`
          );
          // Composant par défaut pour les pathologies non implémentées
          return (
            <div
              key={pathologyId}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6"
            >
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Pathologie: {pathologyId}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cette pathologie n&apos;a pas encore été implémentée dans
                l&apos;interface.
              </p>
            </div>
          );
        }

        console.log(
          `PathologyRenderer - Rendering component for pathology: ${pathologyId}`
        );
        const pathologyContent = (
          <PathologyComponent patient={patient} pathologyId={pathologyId} />
        );

        return (
          <div
            key={pathologyId}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden"
          >
            {pathologyContent || (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {pathologyComponents[pathologyId]?.name || pathologyId}
                </h2>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Les données pour cette pathologie sont en cours de saisie.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Fonction utilitaire pour vérifier si une pathologie est implémentée
export function isPathologyImplemented(pathologyId: string): boolean {
  return pathologyId in pathologyComponents;
}

// Fonction utilitaire pour obtenir la liste des pathologies implémentées
export function getImplementedPathologies(): string[] {
  return Object.keys(pathologyComponents);
}
