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
      {/* Section 1: Motif de consultation */}
      <ConsultationReasonSection patient={patient} />

      {/* Section 2: Antécédents médicaux */}
      <MedicalHistorySection patient={patient} />

      {/* Section 3: Antécédents toxiques */}
      <ToxicHistorySection patient={patient} />

      {/* Section 4: Histoire de la maladie */}
      <DiseaseHistorySection patient={patient} />

      {/* Section 5: Clinique - Signes fonctionnels respiratoires */}
      <RespiratorySymptomsSection patient={patient} />

      {/* Section 6: Clinique - Signes fonctionnels extra-respiratoires */}
      <ExtraRespiratorySymptomsSection patient={patient} />

      {/* Section 7: Clinique - Signes physiques */}
      <PhysicalSignsSection patient={patient} />

      {/* Section 8: Examens complémentaires */}
      <ComplementaryExamsSection patient={patient} />

      {/* Section 9: Conclusion */}
      <ConclusionSection patient={patient} />

      {/* Section 10: Étiologie retrouvée */}
      <EtiologySection patient={patient} />

      {/* Section 11: Traitements envisagés */}
      <TreatmentSection patient={patient} />

      {/* Section 12: Suivi */}
      <FollowUpSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
DDBPathology.config = {
  id: "ddb",
  name: "Dilatation Bronchique Diffuse",
  icon: "/icons/ddb.svg",
  description: "Dilatation des bronches",
  component: DDBPathology,
  sections: {
    consultationReason: true,
    medicalHistory: true,
    toxicHistory: true,
    diseaseHistory: true,
    clinicalExam: true,
    complementaryExams: true,
    conclusion: true,
    etiology: true,
    treatment: true,
    followUp: true,
  },
} as PathologyConfig;

// Sous-composant pour la section motif de consultation
function ConsultationReasonSection({ patient }: { patient: ExtendedPatient }) {
  const consultationReason = patient?.ddbConsultationReason;
  if (!consultationReason?.consultationReason) return null;

  return (
    <PathologySection title="Motif de consultation" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Motif de consultation
          </p>
          <p className="text-sm text-gray-900 dark:text-white">
            {consultationReason.consultationReason}
          </p>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section antécédents médicaux
function MedicalHistorySection({ patient }: { patient: ExtendedPatient }) {
  const medicalHistory = patient?.ddbMedicalHistory;
  if (!medicalHistory) return null;

  const hasAnyMedicalData =
    medicalHistory.childhoodRespiratoryInfections ||
    medicalHistory.childhoodInfections ||
    medicalHistory.cysticFibrosis ||
    medicalHistory.immuneDeficiency ||
    medicalHistory.toxicInhalation ||
    medicalHistory.tuberculosis ||
    medicalHistory.tuberculosisContagion ||
    medicalHistory.recurrentSinusitis ||
    medicalHistory.crohnDisease ||
    medicalHistory.infertility ||
    medicalHistory.lymphoma ||
    medicalHistory.asthma ||
    medicalHistory.surgicalHistory ||
    medicalHistory.gynecoObstetricHistory ||
    medicalHistory.consanguinity ||
    medicalHistory.familyInfertility;

  if (!hasAnyMedicalData) return null;

  return (
    <PathologySection title="Antécédents Médicaux" patient={patient}>
      <div className="space-y-4">
        {/* Antécédents médicaux en badges */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Antécédents
          </p>
          <div className="flex flex-wrap gap-2">
            {medicalHistory.childhoodRespiratoryInfections && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Infections respiratoires de l&apos;enfance
              </span>
            )}
            {medicalHistory.cysticFibrosis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Mucoviscidose
              </span>
            )}
            {medicalHistory.immuneDeficiency && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Déficit immunitaire
              </span>
            )}
            {medicalHistory.toxicInhalation && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Inhalation toxique
              </span>
            )}
            {medicalHistory.tuberculosis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Tuberculose
              </span>
            )}
            {medicalHistory.tuberculosisContagion && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Contage tuberculeux
              </span>
            )}
            {medicalHistory.recurrentSinusitis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Sinusites récidivantes
              </span>
            )}
            {medicalHistory.crohnDisease && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Maladie de Crohn
              </span>
            )}
            {medicalHistory.infertility && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Infertilité
              </span>
            )}
            {medicalHistory.lymphoma && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Lymphome
              </span>
            )}
            {medicalHistory.asthma && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Asthme
              </span>
            )}
            {medicalHistory.consanguinity && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Consanguinité
              </span>
            )}
            {medicalHistory.familyInfertility && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Infertilité familiale
              </span>
            )}
          </div>
        </div>

        {/* Infections de l'enfance (array) */}
        {medicalHistory.childhoodInfections &&
          Array.isArray(medicalHistory.childhoodInfections) &&
          medicalHistory.childhoodInfections.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Infections de l&apos;enfance
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {medicalHistory.childhoodInfections.map((infection, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                  >
                    {infection}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Antécédents chirurgicaux */}
        {medicalHistory.surgicalHistory && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Antécédents chirurgicaux
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {medicalHistory.surgicalHistory}
            </p>
          </div>
        )}

        {/* Antécédents gynéco-obstétricaux */}
        {medicalHistory.gynecoObstetricHistory && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Antécédents gynéco-obstétricaux
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {medicalHistory.gynecoObstetricHistory}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section antécédents toxiques
function ToxicHistorySection({ patient }: { patient: ExtendedPatient }) {
  const toxicHistory = patient?.ddbToxicHistory;
  if (!toxicHistory) return null;

  const hasAnyToxicData =
    toxicHistory.activeSmoking ||
    toxicHistory.smokingType ||
    toxicHistory.smokingStartAge ||
    toxicHistory.packYears ||
    toxicHistory.passiveSmoking ||
    toxicHistory.passiveSmokingLocation ||
    toxicHistory.cannabis ||
    toxicHistory.cannabisConsumption ||
    toxicHistory.alcohol;

  if (!hasAnyToxicData) return null;

  return (
    <PathologySection title="Antécédents Toxiques" patient={patient}>
      <div className="space-y-4">
        {/* Tabagisme */}
        {(toxicHistory.activeSmoking ||
          toxicHistory.smokingType ||
          toxicHistory.smokingStartAge ||
          toxicHistory.packYears ||
          toxicHistory.smokingStopped ||
          toxicHistory.smokingStoppedDuration) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tabagisme
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {toxicHistory.activeSmoking && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Tabagisme actif
                </span>
              )}
              {toxicHistory.smokingStopped && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Tabagisme arrêté
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {toxicHistory.smokingType &&
                Array.isArray(toxicHistory.smokingType) &&
                toxicHistory.smokingType.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Type de tabac
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {toxicHistory.smokingType.map((type, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {toxicHistory.smokingStartAge && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Âge de début
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {toxicHistory.smokingStartAge} ans
                  </p>
                </div>
              )}
              {toxicHistory.packYears && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Paquet-années
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {toxicHistory.packYears}
                  </p>
                </div>
              )}
              {toxicHistory.smokingStoppedDuration && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Durée d&apos;arrêt
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {toxicHistory.smokingStoppedDuration}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabagisme passif */}
        {(toxicHistory.passiveSmoking ||
          (toxicHistory.passiveSmokingLocation &&
            Array.isArray(toxicHistory.passiveSmokingLocation) &&
            toxicHistory.passiveSmokingLocation.length > 0)) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tabagisme passif
            </p>
            {toxicHistory.passiveSmoking && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Tabagisme passif
              </span>
            )}
            {toxicHistory.passiveSmokingLocation &&
              Array.isArray(toxicHistory.passiveSmokingLocation) &&
              toxicHistory.passiveSmokingLocation.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {toxicHistory.passiveSmokingLocation.map(
                    (location, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                      >
                        {location}
                      </span>
                    )
                  )}
                </div>
              )}
          </div>
        )}

        {/* Cannabis */}
        {(toxicHistory.cannabis ||
          toxicHistory.cannabisConsumption ||
          toxicHistory.cannabisStopped ||
          toxicHistory.cannabisStoppedDuration) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Cannabis
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {toxicHistory.cannabis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Cannabis
                </span>
              )}
              {toxicHistory.cannabisStopped && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Arrêté
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {toxicHistory.cannabisConsumption && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Consommation
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {toxicHistory.cannabisConsumption}
                  </p>
                </div>
              )}
              {toxicHistory.cannabisStoppedDuration && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Durée d&apos;arrêt
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {toxicHistory.cannabisStoppedDuration}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alcool */}
        {(toxicHistory.alcohol ||
          toxicHistory.alcoholStopped ||
          toxicHistory.alcoholStoppedDuration) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Alcool
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {toxicHistory.alcohol && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Alcool
                </span>
              )}
              {toxicHistory.alcoholStopped && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Arrêté
                </span>
              )}
            </div>
            {toxicHistory.alcoholStoppedDuration && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Durée d&apos;arrêt
                </p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {toxicHistory.alcoholStoppedDuration}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section histoire de la maladie
function DiseaseHistorySection({ patient }: { patient: ExtendedPatient }) {
  const diseaseHistory = patient?.ddbDiseaseHistory;
  if (!diseaseHistory) return null;

  const hasAnyDiseaseData =
    diseaseHistory.firstSymptoms || diseaseHistory.evolution;

  if (!hasAnyDiseaseData) return null;

  return (
    <PathologySection title="Histoire de la maladie" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {diseaseHistory.firstSymptoms && (
          <div className="md:col-span-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Premiers symptômes
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {diseaseHistory.firstSymptoms}
            </p>
          </div>
        )}
        {diseaseHistory.evolution && (
          <div className="md:col-span-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Évolution
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {diseaseHistory.evolution}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section signes fonctionnels respiratoires
function RespiratorySymptomsSection({ patient }: { patient: ExtendedPatient }) {
  const symptoms = patient?.ddbRespiratorySymptoms;
  if (!symptoms) return null;

  const hasAnySymptoms =
    symptoms.bronchorrhea ||
    symptoms.bronchorrheaVolume ||
    symptoms.cough ||
    symptoms.hemoptysis ||
    symptoms.purulentSputum ||
    symptoms.recurrentRespiratoryInfections ||
    symptoms.penetrationSyndrome ||
    symptoms.fever ||
    symptoms.thoracicPain;

  if (!hasAnySymptoms) return null;

  return (
    <PathologySection
      title="Signes fonctionnels respiratoires"
      patient={patient}
    >
      <div className="space-y-4">
        {/* Signes en badges */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Signes
          </p>
          <div className="flex flex-wrap gap-2">
            {symptoms.bronchorrhea && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Bronchorrhée
              </span>
            )}
            {symptoms.cough && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Toux
              </span>
            )}
            {symptoms.hemoptysis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Hémoptysie
              </span>
            )}
            {symptoms.purulentSputum && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Expectoration purulente
              </span>
            )}
            {symptoms.recurrentRespiratoryInfections && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Infections respiratoires récidivantes
              </span>
            )}
            {symptoms.penetrationSyndrome && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Syndrome de pénétration
              </span>
            )}
            {symptoms.fever && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Fièvre
              </span>
            )}
            {symptoms.thoracicPain && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Douleur thoracique
              </span>
            )}
          </div>
        </div>

        {/* Volume bronchorrhée */}
        {symptoms.bronchorrheaVolume && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Volume bronchorrhée
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {symptoms.bronchorrheaVolume}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section signes fonctionnels extra-respiratoires
function ExtraRespiratorySymptomsSection({
  patient,
}: {
  patient: ExtendedPatient;
}) {
  const symptoms = patient?.ddbExtraRespiratorySymptoms;
  if (!symptoms) return null;

  const hasAnySymptoms =
    symptoms.chronicDiarrhea ||
    symptoms.malabsorptionSyndrome ||
    symptoms.digestiveHemorrhage ||
    symptoms.pyrosis ||
    symptoms.generalStateAlteration ||
    symptoms.sinusPain ||
    symptoms.nasalObstruction ||
    symptoms.ocularSigns;

  if (!hasAnySymptoms) return null;

  return (
    <PathologySection
      title="Signes fonctionnels extra-respiratoires"
      patient={patient}
    >
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Signes
        </p>
        <div className="flex flex-wrap gap-2">
          {symptoms.chronicDiarrhea && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Diarrhée chronique
            </span>
          )}
          {symptoms.malabsorptionSyndrome && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Syndrome de malabsorption
            </span>
          )}
          {symptoms.digestiveHemorrhage && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
              Hémorragie digestive
            </span>
          )}
          {symptoms.pyrosis && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Pyrosis
            </span>
          )}
          {symptoms.generalStateAlteration && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Altération de l&apos;état général
            </span>
          )}
          {symptoms.sinusPain && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Douleurs sinusiennes
            </span>
          )}
          {symptoms.nasalObstruction && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Obstruction nasale
            </span>
          )}
          {symptoms.ocularSigns && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Signes oculaires
            </span>
          )}
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section signes physiques
function PhysicalSignsSection({ patient }: { patient: ExtendedPatient }) {
  const signs = patient?.ddbPhysicalSigns;
  if (!signs) return null;

  const hasAnySigns =
    signs.thoracicDeformation ||
    signs.cyanosis ||
    signs.hippocraticFingers ||
    signs.bronchialRales ||
    signs.crackles;

  if (!hasAnySigns) return null;

  return (
    <PathologySection title="Signes physiques" patient={patient}>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Signes
        </p>
        <div className="flex flex-wrap gap-2">
          {signs.thoracicDeformation && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Déformation thoracique
            </span>
          )}
          {signs.cyanosis && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              Cyanose
            </span>
          )}
          {signs.hippocraticFingers && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Doigts en baguette de tambour
            </span>
          )}
          {signs.bronchialRales && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Râles bronchiques
            </span>
          )}
          {signs.crackles && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              Crépitations
            </span>
          )}
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.ddbComplementaryExams;
  if (!exams) return null;

  const hasAnyExamData =
    exams.chestXRaySigns ||
    exams.chestXRayImages ||
    exams.ctAspect ||
    exams.ctSigns ||
    exams.ctImages ||
    exams.ctOtherAnomalies ||
    exams.efrDisorder ||
    exams.bronchoscopyConclusion ||
    exams.bronchoscopyImages ||
    exams.ecbcResult ||
    exams.ecbcImages ||
    exams.bloodGasResult ||
    exams.bloodGasImages ||
    exams.biologyNfs ||
    exams.biologyCrp ||
    exams.biologyProteinuria ||
    exams.biologySweatTest ||
    exams.biologyIgDosage;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection title="Examens complémentaires" patient={patient}>
      <div className="space-y-6">
        {/* Radiographie thoracique */}
        {(exams.chestXRaySigns ||
          (exams.chestXRayImages &&
            Array.isArray(exams.chestXRayImages) &&
            exams.chestXRayImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Radiographie thoracique
            </h4>
            {exams.chestXRaySigns &&
              Array.isArray(exams.chestXRaySigns) &&
              exams.chestXRaySigns.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {exams.chestXRaySigns.map((sign, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                    >
                      {sign}
                    </span>
                  ))}
                </div>
              )}
            {exams.chestXRayImages &&
              Array.isArray(exams.chestXRayImages) &&
              exams.chestXRayImages.length > 0 && (
                <ImageGallery
                  images={exams.chestXRayImages}
                  title="Radiographie thoracique"
                  imageAlt="Radiographie thoracique DDB"
                />
              )}
          </div>
        )}

        {/* TDM */}
        {(exams.ctAspect ||
          exams.ctSigns ||
          exams.ctOtherAnomalies ||
          (exams.ctImages &&
            Array.isArray(exams.ctImages) &&
            exams.ctImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              TDM
            </h4>
            <div className="space-y-2">
              {exams.ctAspect && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Aspect TDM
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exams.ctAspect}
                  </p>
                </div>
              )}
              {exams.ctSigns &&
                Array.isArray(exams.ctSigns) &&
                exams.ctSigns.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Signes TDM
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exams.ctSigns.map((sign, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                        >
                          {sign}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {exams.ctOtherAnomalies && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Autres anomalies
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exams.ctOtherAnomalies}
                  </p>
                </div>
              )}
              {exams.ctImages &&
                Array.isArray(exams.ctImages) &&
                exams.ctImages.length > 0 && (
                  <ImageGallery
                    images={exams.ctImages}
                    title="TDM"
                    imageAlt="TDM DDB"
                  />
                )}
            </div>
          </div>
        )}

        {/* EFR */}
        {exams.efrDisorder &&
          Array.isArray(exams.efrDisorder) &&
          exams.efrDisorder.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                EFR
              </h4>
              <div className="flex flex-wrap gap-2">
                {exams.efrDisorder.map((disorder, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                  >
                    {disorder}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Endoscopie bronchique */}
        {(exams.bronchoscopyConclusion ||
          (exams.bronchoscopyImages &&
            Array.isArray(exams.bronchoscopyImages) &&
            exams.bronchoscopyImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Endoscopie bronchique
            </h4>
            {exams.bronchoscopyConclusion && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {exams.bronchoscopyConclusion}
              </p>
            )}
            {exams.bronchoscopyImages &&
              Array.isArray(exams.bronchoscopyImages) &&
              exams.bronchoscopyImages.length > 0 && (
                <ImageGallery
                  images={exams.bronchoscopyImages}
                  title="Endoscopie bronchique"
                  imageAlt="Endoscopie bronchique DDB"
                />
              )}
          </div>
        )}

        {/* ECBC */}
        {(exams.ecbcResult ||
          (exams.ecbcImages &&
            Array.isArray(exams.ecbcImages) &&
            exams.ecbcImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              ECBC
            </h4>
            {exams.ecbcResult && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {exams.ecbcResult}
              </p>
            )}
            {exams.ecbcImages &&
              Array.isArray(exams.ecbcImages) &&
              exams.ecbcImages.length > 0 && (
                <ImageGallery
                  images={exams.ecbcImages}
                  title="ECBC"
                  imageAlt="ECBC DDB"
                />
              )}
          </div>
        )}

        {/* Gazométrie sanguine */}
        {(exams.bloodGasResult ||
          (exams.bloodGasImages &&
            Array.isArray(exams.bloodGasImages) &&
            exams.bloodGasImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Gazométrie sanguine
            </h4>
            {exams.bloodGasResult && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {exams.bloodGasResult}
              </p>
            )}
            {exams.bloodGasImages &&
              Array.isArray(exams.bloodGasImages) &&
              exams.bloodGasImages.length > 0 && (
                <ImageGallery
                  images={exams.bloodGasImages}
                  title="Gazométrie sanguine"
                  imageAlt="Gazométrie sanguine DDB"
                />
              )}
          </div>
        )}

        {/* Biologie */}
        {(exams.biologyNfs ||
          exams.biologyCrp ||
          exams.biologyProteinuria ||
          exams.biologySweatTest ||
          exams.biologyIgDosage) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Biologie
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exams.biologyNfs &&
                Array.isArray(exams.biologyNfs) &&
                exams.biologyNfs.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      NFS
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {exams.biologyNfs.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {exams.biologyCrp && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    CRP
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exams.biologyCrp}
                  </p>
                </div>
              )}
              {exams.biologyProteinuria && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Protéinurie
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exams.biologyProteinuria}
                  </p>
                </div>
              )}
              {exams.biologySweatTest && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Test de la sueur
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exams.biologySweatTest}
                  </p>
                </div>
              )}
              {exams.biologyIgDosage && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Dosage des Ig
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exams.biologyIgDosage}
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

// Sous-composant pour la section conclusion
function ConclusionSection({ patient }: { patient: ExtendedPatient }) {
  const conclusion = patient?.ddbConclusion;
  if (!conclusion?.conclusion) return null;

  return (
    <PathologySection title="Conclusion" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Conclusion
          </p>
          <p className="text-sm text-gray-900 dark:text-white">
            {conclusion.conclusion}
          </p>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section étiologie
function EtiologySection({ patient }: { patient: ExtendedPatient }) {
  const etiology = patient?.ddbEtiology;
  if (!etiology) return null;

  const hasAnyEtiology =
    (etiology.localizedEtiology &&
      Array.isArray(etiology.localizedEtiology) &&
      etiology.localizedEtiology.length > 0) ||
    (etiology.generalizedEtiology &&
      Array.isArray(etiology.generalizedEtiology) &&
      etiology.generalizedEtiology.length > 0);

  if (!hasAnyEtiology) return null;

  return (
    <PathologySection title="Étiologie retrouvée" patient={patient}>
      <div className="space-y-4">
        {etiology.localizedEtiology &&
          Array.isArray(etiology.localizedEtiology) &&
          etiology.localizedEtiology.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                DDB localisée
              </p>
              <div className="flex flex-wrap gap-2">
                {etiology.localizedEtiology.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        {etiology.generalizedEtiology &&
          Array.isArray(etiology.generalizedEtiology) &&
          etiology.generalizedEtiology.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                DDB généralisée
              </p>
              <div className="flex flex-wrap gap-2">
                {etiology.generalizedEtiology.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = patient?.ddbTreatment;
  if (!treatment) return null;

  const hasAnyTreatment =
    (treatment.symptomaticTreatments &&
      Array.isArray(treatment.symptomaticTreatments) &&
      treatment.symptomaticTreatments.length > 0) ||
    treatment.etiologicalTreatment ||
    (treatment.otherMeasures &&
      Array.isArray(treatment.otherMeasures) &&
      treatment.otherMeasures.length > 0);

  if (!hasAnyTreatment) return null;

  return (
    <PathologySection title="Traitements envisagés" patient={patient}>
      <div className="space-y-4">
        {treatment.symptomaticTreatments &&
          Array.isArray(treatment.symptomaticTreatments) &&
          treatment.symptomaticTreatments.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Traitements symptomatiques
              </p>
              <div className="flex flex-wrap gap-2">
                {treatment.symptomaticTreatments.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        {treatment.etiologicalTreatment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement étiologique
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {treatment.etiologicalTreatment}
            </p>
          </div>
        )}
        {treatment.otherMeasures &&
          Array.isArray(treatment.otherMeasures) &&
          treatment.otherMeasures.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Autres mesures
              </p>
              <div className="flex flex-wrap gap-2">
                {treatment.otherMeasures.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                  >
                    {item}
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
  const followUp = patient?.ddbFollowUp;
  if (!followUp) return null;

  const hasAnyFollowUp = followUp.nextAppointment || followUp.observations;

  if (!hasAnyFollowUp) return null;

  return (
    <PathologySection title="Suivi" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {followUp.nextAppointment && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Prochain rendez-vous
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {followUp.nextAppointment}
            </p>
          </div>
        )}
        {followUp.observations && (
          <div className="md:col-span-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Observations
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {followUp.observations}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
