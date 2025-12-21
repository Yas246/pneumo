"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function LungCancerPathology({
  patient,
  pathologyId = "lungCancer",
  className = "",
}: PathologySectionProps) {
  // Log de diagnostic
  console.log(
    "LungCancerPathology - patient.pathologies:",
    patient?.pathologies
  );
  console.log("LungCancerPathology - pathologyId:", pathologyId);
  console.log(
    "LungCancerPathology - Includes pathology:",
    patient?.pathologies?.includes(pathologyId)
  );
  console.log(
    "LungCancerPathology - Available LungCancer data (types structure):",
    {
      lungCancerConsultationReason: !!patient?.lungCancerConsultationReason,
      lungCancerMedicalHistory: !!patient?.lungCancerMedicalHistory,
      lungCancerDiseaseHistory: !!patient?.lungCancerDiseaseHistory,
      lungCancerClinicalExam: !!patient?.lungCancerClinicalExam,
      lungCancerComplementaryExams: !!patient?.lungCancerComplementaryExams,
      lungCancerDiagnosis: !!patient?.lungCancerDiagnosis,
      lungCancerManagement: !!patient?.lungCancerManagement,
      lungCancerFollowUp: !!patient?.lungCancerFollowUp,
      lungCancerTreatmentDischarge: !!patient?.lungCancerTreatmentDischarge,
    }
  );

  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    console.log("LungCancerPathology - Pathology not found, returning null");
    return null;
  }

  return (
    <div className={className}>
      {/* Composant de diagnostic pour le développement */}

      {/* Section 1: Motif de consultation Cancer du Poumon */}
      <ConsultationReasonSection patient={patient} />

      {/* Section 2: Antécédents et facteurs de risque Cancer du Poumon */}
      <MedicalHistorySection patient={patient} />

      {/* Section 3: Histoire de la maladie Cancer du Poumon */}
      <DiseaseHistorySection patient={patient} />

      {/* Section 4: Examen clinique Cancer du Poumon */}
      <ClinicalExamSection patient={patient} />

      {/* Section 5: Examens complémentaires Cancer du Poumon */}
      <ComplementaryExamsSection patient={patient} />

      {/* Section 6: Diagnostic Cancer du Poumon */}
      <DiagnosticSection patient={patient} />

      {/* Section 7: Prise en charge Cancer du Poumon */}
      <ManagementSection patient={patient} />

      {/* Section 8: Surveillance évolutive Cancer du Poumon */}
      <FollowUpSection patient={patient} />

      {/* Section 9: Traitement et consignes de sortie Cancer du Poumon */}
      <TreatmentDischargeSection patient={patient} />

      {/* Message si aucune donnée n'est disponible */}
      {!patient?.lungCancerConsultationReason &&
        !patient?.lungCancerMedicalHistory &&
        !patient?.lungCancerDiseaseHistory &&
        !patient?.lungCancerClinicalExam &&
        !patient?.lungCancerComplementaryExams &&
        !patient?.lungCancerDiagnosis &&
        !patient?.lungCancerManagement &&
        !patient?.lungCancerFollowUp &&
        !patient?.lungCancerTreatmentDischarge && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Aucune donnée spécifique au cancer du poumon n&apos;a été
              enregistrée pour ce patient.
            </p>
          </div>
        )}
    </div>
  );
}

// Configuration de la pathologie
LungCancerPathology.config = {
  id: "lungCancer",
  name: "Cancer du Poumon",
  icon: "/icons/lungCancer.svg",
  description: "Cancer bronchopulmonaire et prise en charge thérapeutique",
  component: LungCancerPathology,
  sections: {
    consultationReason: true,
    medicalHistory: true,
    diseaseHistory: true,
    clinicalExam: true,
    complementaryExams: true,
    diagnosis: true,
    management: true,
    followUp: true,
    treatmentDischarge: true,
  },
} as PathologyConfig;

// Sous-composant pour la section motif de consultation
function ConsultationReasonSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer ConsultationReasonSection - patient.lungCancerConsultationReason:",
    patient?.lungCancerConsultationReason
  );

  const consultationReason = patient?.lungCancerConsultationReason;
  if (!consultationReason) {
    console.log(
      "LungCancer ConsultationReasonSection - No consultation reason data found"
    );
    return null;
  }

  const hasAnyConsultationReasonData =
    consultationReason?.chronicCough ||
    consultationReason?.hemoptysis ||
    consultationReason?.dyspnea ||
    consultationReason?.chestPain ||
    consultationReason?.generalStateAlteration ||
    consultationReason?.prolongedFever ||
    consultationReason?.dysphonia ||
    consultationReason?.fortuitousRadiologicalDiscovery ||
    consultationReason?.extensionAssessment ||
    consultationReason?.other;

  if (!hasAnyConsultationReasonData) return null;

  return (
    <PathologySection
      title="Motif de consultation Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-4">
        {consultationReason?.chronicCough && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Toux chronique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.hemoptysis && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hémoptysie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.dyspnea && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dyspnée
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.chestPain && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Douleur thoracique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.generalStateAlteration && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Altération de l&apos;état général
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.prolongedFever && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fièvre prolongée
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.dysphonia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dysphonie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.fortuitousRadiologicalDiscovery && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Découverte radiologique fortuite
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présente
            </p>
          </div>
        )}

        {consultationReason?.extensionAssessment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bilan d&apos;extension
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présent
            </p>
          </div>
        )}

        {consultationReason?.other && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autre motif
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {consultationReason.otherDetails || "Autre"}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section antécédents médicaux
function MedicalHistorySection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer MedicalHistorySection - patient.lungCancerMedicalHistory:",
    patient?.lungCancerMedicalHistory
  );

  const medicalHistory = patient?.lungCancerMedicalHistory;
  if (!medicalHistory) {
    console.log(
      "LungCancer MedicalHistorySection - No medical history data found"
    );
    return null;
  }

  const hasAnyMedicalHistoryData =
    medicalHistory?.personalHistory ||
    medicalHistory?.riskFactors ||
    medicalHistory?.allergiesTreatments;

  if (!hasAnyMedicalHistoryData) return null;

  return (
    <PathologySection
      title="Antécédents et facteurs de risque Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Antécédents personnels */}
        {medicalHistory?.personalHistory && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Antécédents personnels
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalHistory.personalHistory.bpco && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    BPCO
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.asthma && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Asthme
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.tuberculosis && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tuberculose
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.pid && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PID
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.bronchiectasis && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bronchectasies
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.cardiovascularDisease && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Maladie cardiovasculaire
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.hta && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    HTA
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {medicalHistory.personalHistory.htaDetails && (
                      <span>
                        {" "}
                        ({medicalHistory.personalHistory.htaDetails})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.diabetes && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Diabète
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {medicalHistory.personalHistory.diabetesDetails && (
                      <span>
                        {" "}
                        ({medicalHistory.personalHistory.diabetesDetails})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.chronicKidneyDisease && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Insuffisance rénale chronique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.liverDisease && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Maladie hépatique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {medicalHistory.personalHistory.liverDiseaseDetails && (
                      <span>
                        {" "}
                        ({medicalHistory.personalHistory.liverDiseaseDetails})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.cancerHistory && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Antécédents de cancer
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {medicalHistory.personalHistory.cancerHistoryDetails && (
                      <span>
                        {" "}
                        ({medicalHistory.personalHistory.cancerHistoryDetails})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.thoracicSurgery && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Chirurgie thoracique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.thoracicRadiotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Radiothérapie thoracique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.personalHistory.other && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autre
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {medicalHistory.personalHistory.otherDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Facteurs de risque */}
        {medicalHistory?.riskFactors && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Facteurs de risque
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalHistory.riskFactors.smoking &&
                medicalHistory.riskFactors.smoking !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tabagisme
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {medicalHistory.riskFactors.smoking}
                      {medicalHistory.riskFactors.packYears && (
                        <span>
                          {" "}
                          ({medicalHistory.riskFactors.packYears}{" "}
                          paquets-années)
                        </span>
                      )}
                      {medicalHistory.riskFactors.smokingStatus && (
                        <span>
                          {" "}
                          - {medicalHistory.riskFactors.smokingStatus}
                        </span>
                      )}
                    </p>
                  </div>
                )}

              {medicalHistory.riskFactors.passiveSmoking && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tabagisme passif
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.riskFactors.occupationalExposure &&
                medicalHistory.riskFactors.occupationalExposure.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Exposition professionnelle
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {medicalHistory.riskFactors.occupationalExposure.map(
                        (exposure, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                          >
                            {exposure}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {medicalHistory.riskFactors.pollution && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pollution
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.riskFactors.familyHistory && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Antécédents familiaux
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {medicalHistory.riskFactors.immunosuppression &&
                medicalHistory.riskFactors.immunosuppression !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Immunosuppression
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {medicalHistory.riskFactors.immunosuppression}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Allergies et traitements */}
        {medicalHistory?.allergiesTreatments && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Allergies et traitements
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalHistory.allergiesTreatments.allergies &&
                medicalHistory.allergiesTreatments.allergies !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allergies
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {medicalHistory.allergiesTreatments.allergies}
                      {medicalHistory.allergiesTreatments.allergiesDetails && (
                        <span>
                          {" "}
                          ({medicalHistory.allergiesTreatments.allergiesDetails}
                          )
                        </span>
                      )}
                    </p>
                  </div>
                )}

              {medicalHistory.allergiesTreatments.chronicTreatments && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Traitements chroniques
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {medicalHistory.allergiesTreatments.chronicTreatments}
                  </p>
                </div>
              )}

              {medicalHistory.allergiesTreatments.anticoagulantsAntiplatelets &&
                medicalHistory.allergiesTreatments
                  .anticoagulantsAntiplatelets !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Anticoagulants/Antiagrégants
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {
                        medicalHistory.allergiesTreatments
                          .anticoagulantsAntiplatelets
                      }
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section histoire de la maladie
function DiseaseHistorySection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer DiseaseHistorySection - patient.lungCancerDiseaseHistory:",
    patient?.lungCancerDiseaseHistory
  );

  const diseaseHistory = patient?.lungCancerDiseaseHistory;
  if (!diseaseHistory) {
    console.log(
      "LungCancer DiseaseHistorySection - No disease history data found"
    );
    return null;
  }

  const hasAnyDiseaseHistoryData =
    diseaseHistory?.symptomOnsetDate ||
    diseaseHistory?.evolution ||
    diseaseHistory?.cough ||
    diseaseHistory?.expectoration ||
    diseaseHistory?.hemoptysis ||
    diseaseHistory?.dyspnea ||
    diseaseHistory?.chestPain ||
    diseaseHistory?.feverSweats ||
    diseaseHistory?.generalState ||
    diseaseHistory?.recurrentInfections ||
    diseaseHistory?.extensionSigns;

  if (!hasAnyDiseaseHistoryData) return null;

  return (
    <PathologySection
      title="Histoire de la maladie Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Date de début des symptômes */}
        {diseaseHistory?.symptomOnsetDate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date de début des symptômes
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diseaseHistory.symptomOnsetDate}
            </p>
          </div>
        )}

        {/* Évolution */}
        {diseaseHistory?.evolution && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Évolution
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diseaseHistory.evolution}
            </p>
          </div>
        )}

        {/* Symptômes fonctionnels */}
        {(diseaseHistory?.cough ||
          diseaseHistory?.expectoration ||
          diseaseHistory?.hemoptysis ||
          diseaseHistory?.dyspnea ||
          diseaseHistory?.chestPain ||
          diseaseHistory?.feverSweats) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Symptômes fonctionnels
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {diseaseHistory?.cough && diseaseHistory.cough.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Toux
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {diseaseHistory.cough.map((type, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {diseaseHistory?.expectoration &&
                diseaseHistory.expectoration !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Expectoration
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {diseaseHistory.expectoration}
                      {diseaseHistory.expectorationAspect && (
                        <span> ({diseaseHistory.expectorationAspect})</span>
                      )}
                    </p>
                  </div>
                )}

              {diseaseHistory?.hemoptysis &&
                diseaseHistory.hemoptysis !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hémoptysie
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {diseaseHistory.hemoptysis}
                      {diseaseHistory.hemoptysisType &&
                        diseaseHistory.hemoptysisType.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {diseaseHistory.hemoptysisType.map(
                              (type, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                >
                                  {type}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </p>
                  </div>
                )}

              {diseaseHistory?.dyspnea && diseaseHistory.dyspnea !== "Non" && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dyspnée
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diseaseHistory.dyspnea}
                    {diseaseHistory.dyspneaMmrc && (
                      <span> (MMRC: {diseaseHistory.dyspneaMmrc})</span>
                    )}
                  </p>
                </div>
              )}

              {diseaseHistory?.chestPain &&
                diseaseHistory.chestPain !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Douleur thoracique
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {diseaseHistory.chestPain}
                      {diseaseHistory.chestPainType && (
                        <span> ({diseaseHistory.chestPainType})</span>
                      )}
                    </p>
                  </div>
                )}

              {diseaseHistory?.feverSweats &&
                diseaseHistory.feverSweats !== "Non" && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fièvre/Sueurs
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {diseaseHistory.feverSweats}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* État général */}
        {diseaseHistory?.generalState &&
          diseaseHistory.generalState.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                État général
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {diseaseHistory.generalState.map((symptom, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Infections récurrentes */}
        {diseaseHistory?.recurrentInfections && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Infections récurrentes
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Présentes
            </p>
          </div>
        )}

        {/* Signes d'extension */}
        {diseaseHistory?.extensionSigns && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Signes d&apos;extension
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {diseaseHistory.extensionSigns.superiorVenaCavaSyndrome && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Syndrome cave supérieur
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                    {diseaseHistory.extensionSigns
                      .superiorVenaCavaSyndromeSigns &&
                      diseaseHistory.extensionSigns
                        .superiorVenaCavaSyndromeSigns.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {diseaseHistory.extensionSigns.superiorVenaCavaSyndromeSigns.map(
                            (sign, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                              >
                                {sign}
                              </span>
                            )
                          )}
                        </div>
                      )}
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.dysphonia && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dysphonie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.dysphagia && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dysphagie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.bonePain && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Douleurs osseuses
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.headaches && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Céphalées
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.neurologicalDisorders && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Troubles neurologiques
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.convulsions && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Convulsions
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.jaundice && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ictère
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.abdominalPain && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Douleurs abdominales
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.pleuralEffusion && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Épanchement pleural
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.massiveHemoptysis && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hémoptysie massive
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {diseaseHistory.extensionSigns.commentsChronology && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Commentaires chronologiques
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diseaseHistory.extensionSigns.commentsChronology}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section examen clinique
function ClinicalExamSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer ClinicalExamSection - patient.lungCancerClinicalExam:",
    patient?.lungCancerClinicalExam
  );

  const clinicalExam = patient?.lungCancerClinicalExam;
  if (!clinicalExam) {
    console.log("LungCancer ClinicalExamSection - No clinical exam data found");
    return null;
  }

  const hasAnyClinicalData =
    clinicalExam?.vitalSigns ||
    clinicalExam?.performanceStatus ||
    clinicalExam?.respiratoryExam ||
    clinicalExam?.cardiovascularExam ||
    clinicalExam?.lymphNodeExam ||
    clinicalExam?.generalExam;

  if (!hasAnyClinicalData) return null;

  return (
    <PathologySection
      title="Examen clinique Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Constantes vitales */}
        {clinicalExam?.vitalSigns && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Constantes vitales
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam.vitalSigns.bloodPressure && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tension artérielle
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.bloodPressure}
                  </p>
                </div>
              )}

              {clinicalExam.vitalSigns.heartRate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fréquence cardiaque
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.heartRate} bpm
                  </p>
                </div>
              )}

              {clinicalExam.vitalSigns.respiratoryRate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fréquence respiratoire
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.respiratoryRate} c/min
                  </p>
                </div>
              )}

              {clinicalExam.vitalSigns.spO2 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SpO2
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.spO2}%
                  </p>
                </div>
              )}

              {clinicalExam.vitalSigns.temperature && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Température
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.temperature}°C
                  </p>
                </div>
              )}

              {clinicalExam.vitalSigns.weight && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Poids
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.weight} kg
                  </p>
                </div>
              )}

              {clinicalExam.vitalSigns.height && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Taille
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.vitalSigns.height} cm
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Performance status */}
        {clinicalExam?.performanceStatus && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Performance status
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam.performanceStatus.ecogScore && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Score ECOG
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.performanceStatus.ecogScore}
                  </p>
                </div>
              )}

              {clinicalExam.performanceStatus.markedGeneralState && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Altération marquée de l&apos;état général
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {clinicalExam.performanceStatus.lowBmi && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Faible IMC
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.performanceStatus.dehydration && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Déshydratation
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examen respiratoire */}
        {clinicalExam?.respiratoryExam && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Examen respiratoire
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam.respiratoryExam.pleuralFluidSyndrome && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Syndrome d&apos;épanchement pleural
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.condensationSyndrome && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Syndrome de condensation
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.wheezing && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sibilances
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.crackles && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Crépitants
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.localizedDiminishedBreathSounds && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Murmure vésiculaire localisé diminué
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.pleuralEffusionSigns && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Signes d&apos;épanchement pleural
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.atelectasisSigns && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Signes d&apos;atélectasie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.respiratoryExam.other && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.respiratoryExam.other}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examen cardiovasculaire */}
        {clinicalExam?.cardiovascularExam && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Examen cardiovasculaire
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam.cardiovascularExam.rhythm && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rythme
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.cardiovascularExam.rhythm}
                  </p>
                </div>
              )}

              {clinicalExam.cardiovascularExam.murmur && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Souffle
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                    {clinicalExam.cardiovascularExam.murmurLocation && (
                      <span>
                        {" "}
                        ({clinicalExam.cardiovascularExam.murmurLocation})
                      </span>
                    )}
                  </p>
                </div>
              )}

              {clinicalExam.cardiovascularExam.heartFailureSigns &&
                clinicalExam.cardiovascularExam.heartFailureSigns.length >
                  0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Signes d&apos;insuffisance cardiaque
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {clinicalExam.cardiovascularExam.heartFailureSigns.map(
                        (sign, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                          >
                            {sign}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {clinicalExam.cardiovascularExam.pericardialFriction && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Frottement péricardique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.cardiovascularExam.abolishedHeartSounds && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Abolissement des bruits du cœur
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.cardiovascularExam.other && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.cardiovascularExam.other}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examen des ganglions */}
        {clinicalExam?.lymphNodeExam && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Examen des ganglions
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam.lymphNodeExam.supraclavicularRight && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ganglions sus-claviculaires droits
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.lymphNodeExam.supraclavicularLeft && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ganglions sus-claviculaires gauches
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.lymphNodeExam.cervical && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ganglions cervicaux
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.lymphNodeExam.axillary && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ganglions axillaires
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.lymphNodeExam.other && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.lymphNodeExam.otherDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examen général */}
        {clinicalExam?.generalExam && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Examen général
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam.generalExam.hepatomegaly && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hépatomégalie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.bonePain && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Douleurs osseuses
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.focalNeurologicalDeficit && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Déficit neurologique focal
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.superiorVenaCavaSyndrome && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Syndrome cave supérieur
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.lowerLimbEdema && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Œdèmes des membres inférieurs
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.skinSigns && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Signes cutanés
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.clinicalExamRemarks && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Remarques sur l&apos;examen clinique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.generalExam.clinicalExamRemarks}
                  </p>
                </div>
              )}

              {clinicalExam.generalExam.otherExams && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres examens
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.generalExam.otherExams}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer ComplementaryExamsSection - patient.lungCancerComplementaryExams:",
    patient?.lungCancerComplementaryExams
  );

  const complementaryExams = patient?.lungCancerComplementaryExams;
  if (!complementaryExams) {
    console.log(
      "LungCancer ComplementaryExamsSection - No complementary exams data found"
    );
    return null;
  }

  const hasAnyExamData =
    complementaryExams?.thoracicImaging ||
    complementaryExams?.endoscopyBiopsies ||
    complementaryExams?.pathology ||
    complementaryExams?.initialBiology ||
    complementaryExams?.preTherapeuticAssessment;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection
      title="Examens complémentaires Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Imagerie thoracique */}
        {complementaryExams?.thoracicImaging && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Imagerie thoracique
            </p>

            {/* Radiographie thoracique */}
            {complementaryExams.thoracicImaging.chestXRay && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Radiographie thoracique
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.thoracicImaging.chestXRayReport}
                </p>
                {complementaryExams.thoracicImaging.chestXRayImages && (
                  <ImageGallery
                    images={complementaryExams.thoracicImaging.chestXRayImages}
                    title="Radiographie thoracique"
                  />
                )}
              </div>
            )}

            {/* TDM TAP */}
            {complementaryExams.thoracicImaging.tapCt && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">TDM TAP</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.thoracicImaging.tapCtReport}
                </p>
                {complementaryExams.thoracicImaging.tapCtImages && (
                  <ImageGallery
                    images={complementaryExams.thoracicImaging.tapCtImages}
                    title="TDM TAP"
                  />
                )}
              </div>
            )}

            {/* IRM cérébrale */}
            {complementaryExams.thoracicImaging.brainMri && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  IRM cérébrale
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.thoracicImaging.brainMriReport}
                </p>
                {complementaryExams.thoracicImaging.brainMriImages && (
                  <ImageGallery
                    images={complementaryExams.thoracicImaging.brainMriImages}
                    title="IRM cérébrale"
                  />
                )}
              </div>
            )}

            {/* TEP-TDM */}
            {complementaryExams.thoracicImaging.petCt && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">TEP-TDM</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.thoracicImaging.petCtReport}
                </p>
                {complementaryExams.thoracicImaging.petCtImages && (
                  <ImageGallery
                    images={complementaryExams.thoracicImaging.petCtImages}
                    title="TEP-TDM"
                  />
                )}
              </div>
            )}

            {/* Échographie pleurale */}
            {complementaryExams.thoracicImaging.pleuralUltrasound && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Échographie pleurale
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.thoracicImaging.pleuralUltrasoundReport}
                </p>
                {complementaryExams.thoracicImaging.pleuralUltrasoundImages && (
                  <ImageGallery
                    images={
                      complementaryExams.thoracicImaging.pleuralUltrasoundImages
                    }
                    title="Échographie pleurale"
                  />
                )}
              </div>
            )}

            {complementaryExams.thoracicImaging.other && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Autre imagerie
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.thoracicImaging.other}
                </p>
                {complementaryExams.thoracicImaging.otherImages && (
                  <ImageGallery
                    images={complementaryExams.thoracicImaging.otherImages}
                    title="Autre imagerie"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Endoscopie et biopsies */}
        {complementaryExams?.endoscopyBiopsies && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Endoscopie et biopsies
            </p>

            {/* Bronchoscopie */}
            {complementaryExams.endoscopyBiopsies.bronchoscopy && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Bronchoscopie
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.endoscopyBiopsies.bronchoscopyReport}
                </p>
                {complementaryExams.endoscopyBiopsies.bronchoscopyImages && (
                  <ImageGallery
                    images={
                      complementaryExams.endoscopyBiopsies.bronchoscopyImages
                    }
                    title="Bronchoscopie"
                  />
                )}
              </div>
            )}

            {/* Biopsies bronchiques */}
            {complementaryExams.endoscopyBiopsies.bronchialBiopsies && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Biopsies bronchiques
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.endoscopyBiopsies.bronchialBiopsiesReport}
                </p>
                {complementaryExams.endoscopyBiopsies
                  .bronchialBiopsiesImages && (
                  <ImageGallery
                    images={
                      complementaryExams.endoscopyBiopsies
                        .bronchialBiopsiesImages
                    }
                    title="Biopsies bronchiques"
                  />
                )}
              </div>
            )}

            {/* Cytologie LBA */}
            {complementaryExams.endoscopyBiopsies.balCytology && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Cytologie LBA
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.endoscopyBiopsies.balCytologyResults}
                </p>
                {complementaryExams.endoscopyBiopsies.balCytologyImages && (
                  <ImageGallery
                    images={
                      complementaryExams.endoscopyBiopsies.balCytologyImages
                    }
                    title="Cytologie LBA"
                  />
                )}
              </div>
            )}

            {/* EBUS */}
            {complementaryExams.endoscopyBiopsies.ebus && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">EBUS</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.endoscopyBiopsies.ebusResults}
                </p>
                {complementaryExams.endoscopyBiopsies.ebusImages && (
                  <ImageGallery
                    images={complementaryExams.endoscopyBiopsies.ebusImages}
                    title="EBUS"
                  />
                )}
              </div>
            )}

            {/* Biopsie scanno-guidée */}
            {complementaryExams.endoscopyBiopsies.ctGuidedBiopsy && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Biopsie scanno-guidée
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.endoscopyBiopsies.ctGuidedBiopsyResults}
                </p>
                {complementaryExams.endoscopyBiopsies.ctGuidedBiopsyImages && (
                  <ImageGallery
                    images={
                      complementaryExams.endoscopyBiopsies.ctGuidedBiopsyImages
                    }
                    title="Biopsie scanno-guidée"
                  />
                )}
              </div>
            )}

            {/* Ponction pleurale diagnostique */}
            {complementaryExams.endoscopyBiopsies.diagnosticPleuralPuncture && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Ponction pleurale diagnostique
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {
                    complementaryExams.endoscopyBiopsies
                      .diagnosticPleuralPunctureResults
                  }
                </p>
                {complementaryExams.endoscopyBiopsies
                  .diagnosticPleuralPunctureImages && (
                  <ImageGallery
                    images={
                      complementaryExams.endoscopyBiopsies
                        .diagnosticPleuralPunctureImages
                    }
                    title="Ponction pleurale diagnostique"
                  />
                )}
              </div>
            )}

            {/* Biopsie ganglionnaire */}
            {complementaryExams.endoscopyBiopsies.lymphNodeBiopsy && (
              <div className="mt-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  Biopsie ganglionnaire
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {complementaryExams.endoscopyBiopsies.lymphNodeBiopsyResults}
                </p>
                {complementaryExams.endoscopyBiopsies.lymphNodeBiopsyImages && (
                  <ImageGallery
                    images={
                      complementaryExams.endoscopyBiopsies.lymphNodeBiopsyImages
                    }
                    title="Biopsie ganglionnaire"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Anatomopathologie */}
        {complementaryExams?.pathology && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Anatomopathologie
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {complementaryExams.pathology.histologicalType &&
                complementaryExams.pathology.histologicalType.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Type histologique
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {complementaryExams.pathology.histologicalType.map(
                        (type, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                          >
                            {type}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {complementaryExams.pathology.nsclcSubtype &&
                complementaryExams.pathology.nsclcSubtype.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sous-type NSCLC
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {complementaryExams.pathology.nsclcSubtype.map(
                        (subtype, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                          >
                            {subtype}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {complementaryExams.pathology.molecularBiology &&
                complementaryExams.pathology.molecularBiology.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Biologie moléculaire
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {complementaryExams.pathology.molecularBiology.map(
                        (marker, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"
                          >
                            {marker}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {complementaryExams.pathology.otherMolecular && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres marqueurs moléculaires
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {complementaryExams.pathology.otherMolecular}
                  </p>
                </div>
              )}
            </div>
            {complementaryExams.pathology.pathologyImages && (
              <ImageGallery
                images={complementaryExams.pathology.pathologyImages}
                title="Anatomopathologie"
              />
            )}
          </div>
        )}

        {/* Bilan biologique initial */}
        {complementaryExams?.initialBiology && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bilan biologique initial
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {complementaryExams.initialBiology.cbc && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    NFS
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.initialBiology.cbcResults}
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.crp && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CRP
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.initialBiology.crpResults}
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.ionogramUreaCreatinine && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ionogramme, Urée, Créatinine
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {
                      complementaryExams.initialBiology
                        .ionogramUreaCreatinineResults
                    }
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.liverFunction && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fonction hépatique
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.initialBiology.liverFunctionResults}
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.calcium && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Calcémie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {complementaryExams.initialBiology.calcium}
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.albuminNutrition && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Albumine/Nutrition
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {complementaryExams.initialBiology.albuminNutrition}
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.hemostasis && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hémostase
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.initialBiology.hemostasisResults}
                  </p>
                </div>
              )}

              {complementaryExams.initialBiology.tumorMarkers && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Marqueurs tumoraux
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.initialBiology.tumorMarkersResults}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bilan pré-thérapeutique */}
        {complementaryExams?.preTherapeuticAssessment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bilan pré-thérapeutique
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {complementaryExams.preTherapeuticAssessment.pftSpirometry && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    EFR - Spirométrie
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {
                      complementaryExams.preTherapeuticAssessment
                        .pftSpirometryResults
                    }
                  </p>
                </div>
              )}

              {complementaryExams.preTherapeuticAssessment.dlco && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    DLCO
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.preTherapeuticAssessment.dlcoResults}
                  </p>
                </div>
              )}

              {complementaryExams.preTherapeuticAssessment.bloodGas && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gaz du sang
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {
                      complementaryExams.preTherapeuticAssessment
                        .bloodGasResults
                    }
                  </p>
                </div>
              )}

              {complementaryExams.preTherapeuticAssessment.ecg && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ECG
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {complementaryExams.preTherapeuticAssessment.ecgResults}
                  </p>
                </div>
              )}

              {complementaryExams.preTherapeuticAssessment.echocardiography && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Échocardiographie
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {
                      complementaryExams.preTherapeuticAssessment
                        .echocardiographyResults
                    }
                  </p>
                </div>
              )}

              {complementaryExams.preTherapeuticAssessment
                .anestheticEvaluation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Évaluation anesthésique
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {
                      complementaryExams.preTherapeuticAssessment
                        .anestheticEvaluationResults
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section diagnostic
function DiagnosticSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer DiagnosticSection - patient.lungCancerDiagnosis:",
    patient?.lungCancerDiagnosis
  );

  const diagnosis = patient?.lungCancerDiagnosis;
  if (!diagnosis) {
    console.log("LungCancer DiagnosticSection - No diagnosis data found");
    return null;
  }

  const hasAnyDiagnosticData = diagnosis?.diagnosis || diagnosis?.staging;

  if (!hasAnyDiagnosticData) return null;

  return (
    <PathologySection title="Diagnostic Cancer du Poumon" patient={patient}>
      <div className="space-y-6">
        {/* Diagnostic */}
        {diagnosis?.diagnosis && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Diagnostic
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnosis.diagnosis.suspected && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cancer suspecté
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.diagnosis.confirmed && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cancer confirmé
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.diagnosis.nsclc && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    NSCLC (Non Small Cell Lung Cancer)
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.diagnosis.sclc && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SCLC (Small Cell Lung Cancer)
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.diagnosis.other && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autre type
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diagnosis.diagnosis.otherDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Staging */}
        {diagnosis?.staging && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Staging TNM
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagnosis.staging.t && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">T</p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diagnosis.staging.t}
                  </p>
                </div>
              )}

              {diagnosis.staging.n && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">N</p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diagnosis.staging.n}
                  </p>
                </div>
              )}

              {diagnosis.staging.m && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">M</p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diagnosis.staging.m}
                  </p>
                </div>
              )}

              {diagnosis.staging.stage && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Stade
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diagnosis.staging.stage}
                  </p>
                </div>
              )}

              {diagnosis.staging.localizedOperable && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Localisé - Opérable
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.staging.locallyAdvanced && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Localement avancé
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.staging.metastatic && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Métastatique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {diagnosis.staging.metastaticSites &&
                diagnosis.staging.metastaticSites.length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sites métastatiques
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {diagnosis.staging.metastaticSites.map((site, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                        >
                          {site}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {diagnosis.staging.otherSites && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres sites
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {diagnosis.staging.otherSitesDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section prise en charge
function ManagementSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer ManagementSection - patient.lungCancerManagement:",
    patient?.lungCancerManagement
  );

  const management = patient?.lungCancerManagement;
  if (!management) {
    console.log("LungCancer ManagementSection - No management data found");
    return null;
  }

  const hasAnyManagementData =
    management?.immediateMeasures ||
    management?.multidisciplinaryMeeting ||
    management?.therapeuticProject;

  if (!hasAnyManagementData) return null;

  return (
    <PathologySection
      title="Prise en charge Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Mesures immédiates */}
        {management?.immediateMeasures && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Mesures immédiates
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {management.immediateMeasures.oxygenotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Oxygénothérapie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.immediateMeasures.analgesia && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analgésie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.immediateMeasures.symptomaticTreatment && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Traitement symptomatique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.immediateMeasures.oncologicalEmergency && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Urgence oncologique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {management.immediateMeasures.oncologicalEmergencyType &&
                      management.immediateMeasures.oncologicalEmergencyType
                        .length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {management.immediateMeasures.oncologicalEmergencyType.map(
                            (type, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                              >
                                {type}
                              </span>
                            )
                          )}
                        </div>
                      )}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Réunion de concertation pluridisciplinaire */}
        {management?.multidisciplinaryMeeting && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Réunion de concertation pluridisciplinaire (RCP)
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {management.multidisciplinaryMeeting.rcpRequested && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    RCP demandée
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.multidisciplinaryMeeting.rcpAvailable && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    RCP disponible
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.multidisciplinaryMeeting.rcpDate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date de RCP
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {management.multidisciplinaryMeeting.rcpDate}
                  </p>
                </div>
              )}

              {management.multidisciplinaryMeeting.decision && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Décision de RCP
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {management.multidisciplinaryMeeting.decision}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Projet thérapeutique */}
        {management?.therapeuticProject && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Projet thérapeutique
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {management.therapeuticProject.surgery && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Chirurgie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.radiotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Radiothérapie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.chemoradiotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Chimioradiothérapie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.chemotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Chimiothérapie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.immunotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Immunothérapie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.targetedTherapies && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thérapies ciblées
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.palliativeCare && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Soins palliatifs
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {management.therapeuticProject.other && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autre
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {management.therapeuticProject.otherDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section surveillance évolutive
function FollowUpSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer FollowUpSection - patient.lungCancerFollowUp:",
    patient?.lungCancerFollowUp
  );

  const followUp = patient?.lungCancerFollowUp;
  if (!followUp) {
    console.log("LungCancer FollowUpSection - No follow up data found");
    return null;
  }

  const hasAnyFollowUpData =
    followUp?.clinicalMonitoring ||
    followUp?.toxicityEvaluation ||
    followUp?.followUpImaging ||
    followUp?.pftFollowUp ||
    followUp?.nutritionalManagement ||
    followUp?.smokingCessation ||
    followUp?.vaccination ||
    followUp?.evolutionResponse ||
    followUp?.remarks;

  if (!hasAnyFollowUpData) return null;

  return (
    <PathologySection
      title="Surveillance évolutive Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-4">
        {/* Monitoring clinique */}
        {followUp?.clinicalMonitoring && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Monitoring clinique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Surveillance clinique régulière
            </p>
          </div>
        )}

        {/* Évaluation de la toxicité */}
        {followUp?.toxicityEvaluation && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Évaluation de la toxicité
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Évaluation régulière de la toxicité
            </p>
          </div>
        )}

        {/* Imagerie de suivi */}
        {followUp?.followUpImaging && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Imagerie de suivi
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Contrôles d&apos;imagerie réguliers
            </p>
          </div>
        )}

        {/* EFR de suivi */}
        {followUp?.pftFollowUp && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              EFR de suivi
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Explorations fonctionnelles respiratoires de suivi
            </p>
          </div>
        )}

        {/* Prise en charge nutritionnelle */}
        {followUp?.nutritionalManagement && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Prise en charge nutritionnelle
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Suivi nutritionnel régulier
            </p>
          </div>
        )}

        {/* Sevrage tabagique */}
        {followUp?.smokingCessation && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sevrage tabagique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Aide au sevrage tabagique
            </p>
          </div>
        )}

        {/* Vaccination */}
        {followUp?.vaccination && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Vaccination
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Vaccinations recommandées
            </p>
          </div>
        )}

        {/* Réponse au traitement */}
        {followUp?.evolutionResponse && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Réponse au traitement
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {followUp.evolutionResponse}
            </p>
          </div>
        )}

        {/* Remarques */}
        {followUp?.remarks && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Remarques
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {followUp.remarks}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement et consignes de sortie
function TreatmentDischargeSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "LungCancer TreatmentDischargeSection - patient.lungCancerTreatmentDischarge:",
    patient?.lungCancerTreatmentDischarge
  );

  const treatmentDischarge = patient?.lungCancerTreatmentDischarge;
  if (!treatmentDischarge) {
    console.log(
      "LungCancer TreatmentDischargeSection - No treatment discharge data found"
    );
    return null;
  }

  const hasAnyTreatmentDischargeData =
    treatmentDischarge?.prescribedTreatment ||
    treatmentDischarge?.supportiveCare ||
    treatmentDischarge?.instructionsFollowUp;

  if (!hasAnyTreatmentDischargeData) return null;

  return (
    <PathologySection
      title="Traitement et consignes de sortie Cancer du Poumon"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Traitement prescrit */}
        {treatmentDischarge?.prescribedTreatment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement prescrit
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatmentDischarge.prescribedTreatment.analgesic && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analgésique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {treatmentDischarge.prescribedTreatment
                      .analgesicDetails && (
                      <span>
                        {" "}
                        (
                        {
                          treatmentDischarge.prescribedTreatment
                            .analgesicDetails
                        }
                        )
                      </span>
                    )}
                  </p>
                </div>
              )}

              {treatmentDischarge.prescribedTreatment.antitussive && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Antitussif
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {treatmentDischarge.prescribedTreatment
                      .antitussiveDetails && (
                      <span>
                        {" "}
                        (
                        {
                          treatmentDischarge.prescribedTreatment
                            .antitussiveDetails
                        }
                        )
                      </span>
                    )}
                  </p>
                </div>
              )}

              {treatmentDischarge.prescribedTreatment.corticosteroids && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Corticostéroïdes
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {treatmentDischarge.prescribedTreatment
                      .corticosteroidsDetails && (
                      <span>
                        {" "}
                        (
                        {
                          treatmentDischarge.prescribedTreatment
                            .corticosteroidsDetails
                        }
                        )
                      </span>
                    )}
                  </p>
                </div>
              )}

              {treatmentDischarge.prescribedTreatment.anticoagulation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Anticoagulation
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                    {treatmentDischarge.prescribedTreatment
                      .anticoagulationDetails && (
                      <span>
                        {" "}
                        (
                        {
                          treatmentDischarge.prescribedTreatment
                            .anticoagulationDetails
                        }
                        )
                      </span>
                    )}
                  </p>
                </div>
              )}

              {treatmentDischarge.prescribedTreatment.other && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autre traitement
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatmentDischarge.prescribedTreatment.otherDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Soins de support */}
        {treatmentDischarge?.supportiveCare && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Soins de support
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {treatmentDischarge.supportiveCare.painManagement && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                  Prise en charge de la douleur
                </span>
              )}

              {treatmentDischarge.supportiveCare.dyspneaManagement && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Prise en charge de la dyspnée
                </span>
              )}

              {treatmentDischarge.supportiveCare.nutritionalManagement && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Prise en charge nutritionnelle
                </span>
              )}

              {treatmentDischarge.supportiveCare.psychosocialSupport && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Soutien psychosocial
                </span>
              )}

              {treatmentDischarge.supportiveCare.palliativeCare && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                  Soins palliatifs
                </span>
              )}
            </div>
          </div>
        )}

        {/* Instructions et suivi */}
        {treatmentDischarge?.instructionsFollowUp && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Instructions et suivi
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatmentDischarge.instructionsFollowUp.emergencyReturn && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Retour en urgence
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Consulter en urgence en cas de symptômes inquiétants
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp.smokingStop && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Arrêt du tabac
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Arrêt du tabac recommandé
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp
                .pneumologyAppointment && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Consultation pneumologie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Consultation de pneumologie prévue
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp.oncologyAppointment && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Consultation oncologie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Consultation d&apos;oncologie prévue
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp.radiotherapy && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Radiothérapie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Séances de radiothérapie prévues
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp.biologicalControl && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Contrôle biologique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Contrôle biologique prévu
                    {treatmentDischarge.instructionsFollowUp
                      .biologicalControlDate && (
                      <span>
                        {" "}
                        le{" "}
                        {
                          treatmentDischarge.instructionsFollowUp
                            .biologicalControlDate
                        }
                      </span>
                    )}
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp.imagingControl && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Contrôle d&apos;imagerie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Contrôle d&apos;imagerie prévu
                    {treatmentDischarge.instructionsFollowUp
                      .imagingControlDate && (
                      <span>
                        {" "}
                        le{" "}
                        {
                          treatmentDischarge.instructionsFollowUp
                            .imagingControlDate
                        }
                      </span>
                    )}
                  </p>
                </div>
              )}

              {treatmentDischarge.instructionsFollowUp.documentsDelivered &&
                treatmentDischarge.instructionsFollowUp.documentsDelivered
                  .length > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Documents remis
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {treatmentDischarge.instructionsFollowUp.documentsDelivered.map(
                        (doc, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300"
                          >
                            {doc}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
