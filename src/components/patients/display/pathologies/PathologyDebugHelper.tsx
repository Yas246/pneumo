"use client";

import { ExtendedPatient } from "../types";

interface PathologyDebugHelperProps {
  patient: ExtendedPatient;
  pathologyId: string;
}

export function PathologyDebugHelper({
  patient,
  pathologyId,
}: PathologyDebugHelperProps) {
  // Vérifier si la pathologie est dans la liste
  const hasPathology = patient?.pathologies?.includes(pathologyId);

  // Vérifier les données spécifiques à chaque pathologie
  const pathologyData: Record<string, unknown> = {};

  if (pathologyId === "tbk") {
    pathologyData.clinicalExam = patient?.tbkClinicalExam;
    pathologyData.complementaryExams = patient?.tbkComplementaryExams;
    pathologyData.diagnosis = patient?.tbkDiagnosis;
    pathologyData.treatment = patient?.tbkTreatment;
    pathologyData.monitoring = patient?.tbkMonitoring;
    pathologyData.dischargeInstructions = patient?.tbkDischargeInstructions;
  } else if (pathologyId === "lungCancer") {
    pathologyData.clinicalExam = patient?.lungCancerClinicalExam;
    pathologyData.complementaryExams = patient?.lungCancerComplementaryExams;
    pathologyData.diagnosis = patient?.lungCancerDiagnosis;
    pathologyData.treatment = patient?.lungCancerTreatment;
    pathologyData.monitoring = patient?.lungCancerMonitoring;
    pathologyData.dischargeInstructions =
      patient?.lungCancerDischargeInstructions;
  } else if (pathologyId === "pneumothorax") {
    pathologyData.clinicalExam = patient?.pneumothoraxClinicalExam;
    pathologyData.complementaryExams = patient?.pneumothoraxComplementaryExams;
    pathologyData.diagnosis = patient?.pneumothoraxDiagnosis;
    pathologyData.management = patient?.pneumothoraxManagement;
    pathologyData.monitoring = patient?.pneumothoraxMonitoring;
    pathologyData.treatmentDischarge = patient?.pneumothoraxTreatmentDischarge;
  }

  const hasAnyData = Object.values(pathologyData).some(
    (value) => value !== undefined
  );

  // Afficher uniquement en mode développement
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
        Debug Info - {pathologyId}
      </h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">
            Pathologie dans patient.pathologies:
          </span>{" "}
          <span className={hasPathology ? "text-green-600" : "text-red-600"}>
            {hasPathology ? "Oui" : "Non"}
          </span>
        </div>
        <div>
          <span className="font-medium">Données disponibles:</span>{" "}
          <span className={hasAnyData ? "text-green-600" : "text-red-600"}>
            {hasAnyData ? "Oui" : "Non"}
          </span>
        </div>
        <div>
          <span className="font-medium">Liste des pathologies:</span>{" "}
          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
            {JSON.stringify(patient?.pathologies, null, 2)}
          </pre>
        </div>
        <div>
          <span className="font-medium">Détails des données:</span>
          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
            {JSON.stringify(pathologyData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
