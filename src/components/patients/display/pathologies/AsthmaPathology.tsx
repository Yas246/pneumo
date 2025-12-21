"use client";

import { ExtendedPatient, PathologyConfig, PathologySectionProps } from "../types";
import { ImageGallery } from "../shared/ImageGallery";
import { PathologySection } from "./PathologySection";

export function AsthmaPathology({
  patient,
  pathologyId = "asthma",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Examen clinique détaillé par système */}
      <ClinicalExamSection patient={patient} />

      {/* Section 2: Examens complémentaires Asthme */}
      <ComplementaryExamsSection patient={patient} />

      {/* Section 3: Classification de sévérité */}
      <SeverityClassificationSection patient={patient} />

      {/* Section 4: Traitement Asthme */}
      <TreatmentSection patient={patient} />

      {/* Section 5: Suivi Asthme */}
      <FollowUpSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
AsthmaPathology.config = {
  id: "asthma",
  name: "Asthme",
  icon: "/icons/asthma.svg",
  description: "Asthme et manifestations allergiques respiratoires",
  component: AsthmaPathology,
  sections: {
    clinicalExam: true,
    complementaryExams: true,
    diagnosis: true,
    treatment: true,
    followUp: true,
  },
} as PathologyConfig;

// Sous-composant pour la section examen clinique
function ClinicalExamSection({ patient }: { patient: ExtendedPatient }) {
  const hasAnyClinicalData =
    patient?.asthmaGeneralState ||
    patient?.asthmaRespiratorySystem ||
    patient?.asthmaCardiovascularSystem ||
    patient?.asthmaDigestiveSystem ||
    patient?.asthmaUrinarySystem ||
    patient?.asthmaMusculoskeletalSystem ||
    patient?.asthmaNervousSystem ||
    patient?.asthmaSkinMucous ||
    patient?.asthmaOrlEyesMouth ||
    patient?.asthmaOtherClinicalRemarks;

  if (!hasAnyClinicalData) return null;

  return (
    <PathologySection title="Examen clinique Asthme" patient={patient}>
      <div className="space-y-6">
        {/* État général */}
        {patient?.asthmaGeneralState && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              État général
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {patient.asthmaGeneralState.consciousness && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Conscience
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaGeneralState.consciousness.map(
                      (state, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          {state}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaGeneralState.asthenia && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Asthénie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.generalStateAlteration && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Altération état général
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présente
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.bloodPressure && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tension artérielle
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.bloodPressure}
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.heartRate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fréquence cardiaque
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.heartRate} bpm
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.temperature && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Température
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.temperature}°C
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.spO2 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SpO2
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.spO2}%
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.weight && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Poids
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.weight} kg
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.height && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Taille
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.height} cm
                  </p>
                </div>
              )}

              {patient.asthmaGeneralState.bmi && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    IMC
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaGeneralState.bmi} kg/m²
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Système respiratoire */}
        {patient?.asthmaRespiratorySystem && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Système respiratoire
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaRespiratorySystem.vesicularMurmur && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Murmure vésiculaire
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaRespiratorySystem.vesicularMurmur}
                  </p>
                </div>
              )}

              {patient.asthmaRespiratorySystem.auscultationAnomalies && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Anomalies auscultation
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaRespiratorySystem.auscultationAnomalies.map(
                      (anomaly, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        >
                          {anomaly}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaRespiratorySystem.respiratoryDistressSigns && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Signes détresse respiratoire
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaRespiratorySystem.respiratoryDistressSigns.map(
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

              {patient.asthmaRespiratorySystem.pleuropulmonarySyndromes && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Syndromes pleuropulmonaires
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaRespiratorySystem.pleuropulmonarySyndromes.map(
                      (syndrome, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                        >
                          {syndrome}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaRespiratorySystem.syndromeLocation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Localisation syndrome
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaRespiratorySystem.syndromeLocation}
                  </p>
                </div>
              )}

              {patient.asthmaRespiratorySystem.otherRespiratory && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autres
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaRespiratorySystem.otherRespiratory}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Système cardiovasculaire */}
        {patient?.asthmaCardiovascularSystem && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Système cardiovasculaire
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaCardiovascularSystem.regularBdc !== undefined && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rythme BDC
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaCardiovascularSystem.regularBdc
                      ? "Régulier"
                      : "Irrégulier"}
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.heartMurmur && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Souffle cardiaque
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.murmurTiming && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Timing souffle
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaCardiovascularSystem.murmurTiming}
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.murmurLocation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Localisation souffle
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaCardiovascularSystem.murmurLocation.map(
                      (location, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                        >
                          {location}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.murmurType && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Type souffle
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaCardiovascularSystem.murmurType.map(
                      (type, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                        >
                          {type}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.murmurIntensity && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Intensité souffle
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaCardiovascularSystem.murmurIntensity}/6
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.murmurIrradiation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Irradiation souffle
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaCardiovascularSystem.murmurIrradiation}
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.muffledNoises && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bruits assourdis
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.pericardialFriction && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Frottement péricardique
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.irregularRhythm && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rythme irrégulier
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.lowerLimbEdema && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Œdèmes membres inférieurs
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présents
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.rhj && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    RHJ
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.tjPlus && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    TJ+
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {patient.asthmaCardiovascularSystem.marbling && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Marbrures
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présentes
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Système digestif */}
        {patient?.asthmaDigestiveSystem && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Système digestif
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaDigestiveSystem.abdomenInspection && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Inspection abdomen
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaDigestiveSystem.abdomenInspection.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaDigestiveSystem.abdomenPalpation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Palpation abdomen
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaDigestiveSystem.abdomenPalpation.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaDigestiveSystem.hepatomegaly && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hépatomégalie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaDigestiveSystem.hepatomegalySize
                      ? `Présente (${patient.asthmaDigestiveSystem.hepatomegalySize} cm)`
                      : "Présente"}
                  </p>
                </div>
              )}

              {patient.asthmaDigestiveSystem.splenomegaly && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Splénomégalie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaDigestiveSystem.splenomegalySize
                      ? `Présente (${patient.asthmaDigestiveSystem.splenomegalySize} cm)`
                      : "Présente"}
                  </p>
                </div>
              )}

              {patient.asthmaDigestiveSystem.abdomenPercussion && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Percussion abdomen
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaDigestiveSystem.abdomenPercussion.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaDigestiveSystem.abdomenAuscultation && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Auscultation abdomen
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaDigestiveSystem.abdomenAuscultation.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Système urinaire */}
        {patient?.asthmaUrinarySystem && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Système urinaire
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaUrinarySystem.diuresis && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Diurèse
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaUrinarySystem.diuresis}
                  </p>
                </div>
              )}

              {patient.asthmaUrinarySystem.bladderGlobe && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Globe vésical
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {patient.asthmaUrinarySystem.urinaryFunctionalSigns && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Signes fonctionnels urinaires
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaUrinarySystem.urinaryFunctionalSigns.map(
                      (sign, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                        >
                          {sign}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaUrinarySystem.puBuPerformed && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    BU réalisée
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Oui
                  </p>
                </div>
              )}

              {patient.asthmaUrinarySystem.puBuResult && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Résultat BU
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaUrinarySystem.puBuResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Système musculo-squelettique */}
        {patient?.asthmaMusculoskeletalSystem && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Système musculo-squelettique
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaMusculoskeletalSystem.symptoms && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Symptômes
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaMusculoskeletalSystem.symptoms.map(
                      (symptom, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-100 dark:bg-lime-900/30 text-lime-800 dark:text-lime-300"
                        >
                          {symptom}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaMusculoskeletalSystem.mobility && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mobilité
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaMusculoskeletalSystem.mobility}
                  </p>
                </div>
              )}

              {patient.asthmaMusculoskeletalSystem.affectedJoints && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Articulations atteintes
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaMusculoskeletalSystem.affectedJoints}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Système nerveux */}
        {patient?.asthmaNervousSystem && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Système nerveux
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaNervousSystem.consciousness && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Conscience
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaNervousSystem.consciousness}
                  </p>
                </div>
              )}

              {patient.asthmaNervousSystem.neurologicalSigns && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Signes neurologiques
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaNervousSystem.neurologicalSigns.map(
                      (sign, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300"
                        >
                          {sign}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaNervousSystem.motorDeficit && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Déficit moteur
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaNervousSystem.motorDeficit}
                  </p>
                </div>
              )}

              {patient.asthmaNervousSystem.sensoryDeficit && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Déficit sensitif
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaNervousSystem.sensoryDeficit}
                  </p>
                </div>
              )}

              {patient.asthmaNervousSystem.rot && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ROT
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaNervousSystem.rot}
                  </p>
                </div>
              )}

              {patient.asthmaNervousSystem.rotDescription && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Description ROT
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaNervousSystem.rotDescription}
                  </p>
                </div>
              )}

              {patient.asthmaNervousSystem.balance && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Équilibre
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaNervousSystem.balance.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Peau et muqueuses */}
        {patient?.asthmaSkinMucous && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Peau et muqueuses
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaSkinMucous.inspection && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Inspection
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaSkinMucous.inspection.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaSkinMucous.dermatologicalLesions && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lésions dermatologiques
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaSkinMucous.dermatologicalLesions}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ORL-yeux-bouche */}
        {patient?.asthmaOrlEyesMouth && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ORL - Yeux - Bouche
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.asthmaOrlEyesMouth.conjunctiva && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Conjonctive
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaOrlEyesMouth.conjunctiva}
                  </p>
                </div>
              )}

              {patient.asthmaOrlEyesMouth.oralCavity && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cavité buccale
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaOrlEyesMouth.oralCavity.map(
                      (finding, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300"
                        >
                          {finding}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {patient.asthmaOrlEyesMouth.tonsils && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Amygdales
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {patient.asthmaOrlEyesMouth.tonsils}
                  </p>
                </div>
              )}

              {patient.asthmaOrlEyesMouth.orlSymptoms && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Symptômes ORL
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.asthmaOrlEyesMouth.orlSymptoms.map(
                      (symptom, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                        >
                          {symptom}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Autres remarques cliniques */}
        {patient?.asthmaOtherClinicalRemarks?.otherClinicalRemarks && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres remarques cliniques
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {patient.asthmaOtherClinicalRemarks.otherClinicalRemarks}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.asthmaComplementaryExams;
  if (!exams) return null;

  const hasAnyExamData =
    exams.morningPef ||
    exams.eveningPef ||
    exams.efrReversibleObstruction ||
    exams.efrVems ||
    exams.efrVemsCv ||
    exams.chestXrayImages ||
    exams.blondScannerImages ||
    exams.thoracicCtdImages ||
    exams.nfsHyperEosinophilia ||
    exams.totalIge ||
    exams.positivePrickTests;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection title="Examens complémentaires Asthme" patient={patient}>
      <div className="space-y-6">
        {/* DEP (Débit Expiratoire de Pointe) */}
        {(exams.morningPef || exams.eveningPef) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              DEP (Débit Expiratoire de Pointe)
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {exams.morningPef && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    DEP matin
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.morningPef} L/min
                  </p>
                </div>
              )}

              {exams.eveningPef && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    DEP soir
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.eveningPef} L/min
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Test de réversibilité EFR */}
        {exams.efrReversibleObstruction !== undefined && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Test de réversibilité EFR
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Obstruction réversible
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {exams.efrReversibleObstruction ? "Oui" : "Non"}
                </p>
              </div>

              {exams.reversibilityTest && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Test de réversibilité
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.reversibilityTest}
                  </p>
                </div>
              )}

              {exams.variationPercentage && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Variation (%)
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.variationPercentage}%
                  </p>
                </div>
              )}

              {exams.variationMl && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Variation (ml)
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.variationMl} ml
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EFR (Exploration Fonctionnelle Respiratoire) */}
        {(exams.efrVems || exams.efrVemsCv) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              EFR (Exploration Fonctionnelle Respiratoire)
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {exams.efrVems && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    VEMS
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.efrVems} L
                  </p>
                </div>
              )}

              {exams.efrVemsCv && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    VEMS/CV
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.efrVemsCv}%
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Imagerie */}
        {(exams.chestXrayImages ||
          exams.blondScannerImages ||
          exams.thoracicCtdImages) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Imagerie
            </p>

            {/* Radiographie thoracique */}
            {exams.chestXrayImages &&
              Array.isArray(exams.chestXrayImages) &&
              exams.chestXrayImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={exams.chestXrayImages}
                    title="Radiographie thoracique"
                    imageAlt="Radiographie thoracique"
                  />
                </div>
              )}

            {/* BLONDO-SCANNER */}
            {exams.blondScannerImages &&
              Array.isArray(exams.blondScannerImages) &&
              exams.blondScannerImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={exams.blondScannerImages}
                    title="BLONDO-SCANNER"
                    imageAlt="BLONDO-SCANNER"
                  />
                </div>
              )}

            {/* TDM thoracique */}
            {exams.thoracicCtdImages &&
              Array.isArray(exams.thoracicCtdImages) &&
              exams.thoracicCtdImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={exams.thoracicCtdImages}
                    title="TDM thoracique"
                    imageAlt="TDM thoracique"
                  />
                </div>
              )}
          </div>
        )}

        {/* Biologie */}
        {(exams.nfsHyperEosinophilia ||
          exams.totalIge ||
          exams.positivePrickTests) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Biologie
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {exams.nfsHyperEosinophilia && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hyperéosinophilie
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.hyperEosinophiliaValue
                      ? `${exams.hyperEosinophiliaValue}/mm³`
                      : "Présente"}
                  </p>
                </div>
              )}

              {exams.totalIge && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    IgE totales
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.totalIge} UI/mL
                  </p>
                </div>
              )}

              {exams.positivePrickTests && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tests prick positifs
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {exams.positivePrickTests}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Autres examens complémentaires */}
        {exams.otherComplementaryExams && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres examens complémentaires
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {exams.otherComplementaryExams}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section classification de sévérité
function SeverityClassificationSection({
  patient,
}: {
  patient: ExtendedPatient;
}) {
  const classification = patient?.asthmaSeverityClassification;
  if (!classification) return null;

  const hasAnyClassificationData =
    classification.classification ||
    classification.allergicAsthma !== undefined ||
    classification.nonAllergicAsthma !== undefined ||
    classification.intermittentAsthma !== undefined ||
    classification.persistentAsthmaSeverity ||
    classification.exerciseInducedAsthma !== undefined ||
    classification.otherForms;

  if (!hasAnyClassificationData) return null;

  return (
    <PathologySection title="Classification de sévérité" patient={patient}>
      <div className="space-y-4">
        {classification.classification && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Classification
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {classification.classification.map((type, index) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classification.allergicAsthma && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Asthme allergique
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Présent
              </p>
            </div>
          )}

          {classification.nonAllergicAsthma && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Asthme non allergique
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Présent
              </p>
            </div>
          )}

          {classification.intermittentAsthma && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Asthme intermittent
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Présent
              </p>
            </div>
          )}

          {classification.persistentAsthmaSeverity && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sévérité asthme persistant
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {classification.persistentAsthmaSeverity}
              </p>
            </div>
          )}

          {classification.exerciseInducedAsthma && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Asthme d&apos;effort
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Présent
              </p>
            </div>
          )}

          {classification.otherForms && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Autres formes
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {classification.otherForms}
              </p>
            </div>
          )}
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = patient?.asthmaTreatment;
  if (!treatment) return null;

  const hasAnyTreatmentData =
    treatment.maintenanceTreatment ||
    treatment.crisisTreatment ||
    (treatment.associatedMeasures && treatment.associatedMeasures.length > 0);

  if (!hasAnyTreatmentData) return null;

  return (
    <PathologySection title="Traitement Asthme" patient={patient}>
      <div className="space-y-6">
        {/* Traitement de fond */}
        {treatment.maintenanceTreatment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement de fond
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatment.maintenanceTreatment.inhaledCorticosteroids && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Corticoïdes inhalés
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.maintenanceTreatment.inhaledCorticosteroids}
                  </p>
                </div>
              )}

              {treatment.maintenanceTreatment.csiDose && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dose CSI
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.maintenanceTreatment.csiDose} μg/jour
                  </p>
                </div>
              )}

              {treatment.maintenanceTreatment.csiFrequency && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fréquence CSI
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.maintenanceTreatment.csiFrequency} fois/jour
                  </p>
                </div>
              )}

              {treatment.maintenanceTreatment.laba && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    LABA
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.maintenanceTreatment.laba}
                  </p>
                </div>
              )}

              {treatment.maintenanceTreatment.antiLeukotrienes && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Anti-leukotriènes
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    Présent
                  </p>
                </div>
              )}

              {treatment.maintenanceTreatment.otherMaintenance && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autre traitement de fond
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.maintenanceTreatment.otherMaintenance}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Traitement de crise */}
        {treatment.crisisTreatment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement de crise
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatment.crisisTreatment.salbutamolInstruction && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Salbutamol
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.crisisTreatment.salbutamolInstruction}
                  </p>
                </div>
              )}

              {treatment.crisisTreatment.otherCrisis && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Autre traitement de crise
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {treatment.crisisTreatment.otherCrisis}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mesures associées */}
        {treatment.associatedMeasures &&
          treatment.associatedMeasures.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Mesures associées
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {treatment.associatedMeasures.map((measure, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  >
                    {measure}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section suivi
function FollowUpSection({ patient }: { patient: ExtendedPatient }) {
  const followUp = patient?.asthmaFollowUp;
  if (!followUp) return null;

  const hasAnyFollowUpData =
    followUp.nextConsultation ||
    followUp.spirometryDelay ||
    followUp.controlObjective;

  if (!hasAnyFollowUpData) return null;

  return (
    <PathologySection title="Suivi Asthme" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {followUp.nextConsultation && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Prochaine consultation
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {followUp.nextConsultation}
            </p>
          </div>
        )}

        {followUp.spirometryDelay && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Délai spirométrie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {followUp.spirometryDelay} mois
            </p>
          </div>
        )}

        {followUp.controlObjective && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Objectif de contrôle
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {followUp.controlObjective}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
