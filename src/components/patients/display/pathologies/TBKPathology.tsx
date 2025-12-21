"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function TBKPathology({
  patient,
  pathologyId = "tbk",
  className = "",
}: PathologySectionProps) {
  // Log de diagnostic
  console.log("TBKPathology - patient.pathologies:", patient?.pathologies);
  console.log("TBKPathology - pathologyId:", pathologyId);
  console.log(
    "TBKPathology - Includes pathology:",
    patient?.pathologies?.includes(pathologyId)
  );
  console.log("TBKPathology - Available TBK data (types structure):", {
    tbkConsultationReason: !!patient?.tbkConsultationReason,
    tbkComorbidities: !!patient?.tbkComorbidities,
    tbkPersonalTuberculosisHistory: !!patient?.tbkPersonalTuberculosisHistory,
    tbkRecentTuberculosisContagion: !!patient?.tbkRecentTuberculosisContagion,
    tbkToxicHabits: !!patient?.tbkToxicHabits,
    tbkGeneralSigns: !!patient?.tbkGeneralSigns,
    tbkFunctionalSigns: !!patient?.tbkFunctionalSigns,
    tbkClinicalExam: !!patient?.tbkClinicalExam,
    tbkChestXRay: !!patient?.tbkChestXRay,
    tbkSputumBacteriology: !!patient?.tbkSputumBacteriology,
    tbkBkGenetics: !!patient?.tbkBkGenetics,
    tbkBiology: !!patient?.tbkBiology,
    tbkOtherAssessments: !!patient?.tbkOtherAssessments,
    tbkDiagnosis: !!patient?.tbkDiagnosis,
    tbkPrescribedTreatment: !!patient?.tbkPrescribedTreatment,
    tbkTreatment: !!patient?.tbkTreatment,
    tbkSerumDosage: !!patient?.tbkSerumDosage,
    tbkEvolution: !!patient?.tbkEvolution,
    tbkMonitoring: !!patient?.tbkMonitoring,
    tbkDischargeInstructions: !!patient?.tbkDischargeInstructions,
    tbkDischargeConclusion: !!patient?.tbkDischargeConclusion,
  });

  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    console.log("TBKPathology - Pathology not found, returning null");
    return null;
  }

  return (
    <div className={className}>
      {/* Composant de diagnostic pour le développement */}

      {/* Section 1: Motif d'hospitalisation */}
      <ConsultationReasonSection patient={patient} />

      {/* Section 2: Antécédents */}
      <MedicalHistorySection patient={patient} />

      {/* Section 3: Signes généraux */}
      <GeneralSignsSection patient={patient} />

      {/* Section 4: Signes fonctionnels */}
      <FunctionalSignsSection patient={patient} />

      {/* Section 5: Examen clinique Tuberculose */}
      <ClinicalExamSection patient={patient} />

      {/* Section 6: Examens complémentaires Tuberculose */}
      <ComplementaryExamsSection patient={patient} />

      {/* Section 7: Bactériologie des expectorations */}
      <SputumBacteriologySection patient={patient} />

      {/* Section 8: Génétique BK */}
      <BkGeneticsSection patient={patient} />

      {/* Section 9: Biologie */}
      <BiologySection patient={patient} />

      {/* Section 10: Diagnostic Tuberculose */}
      <DiagnosticSection patient={patient} />

      {/* Section 11: Traitement prescrit */}
      <PrescribedTreatmentSection patient={patient} />

      {/* Section 12: Traitement Tuberculose */}
      <TreatmentSection patient={patient} />

      {/* Section 13: Dosage sérique des AT */}
      <SerumDosageSection patient={patient} />

      {/* Section 14: Évolution */}
      <EvolutionSection patient={patient} />

      {/* Section 15: Surveillance Tuberculose */}
      <MonitoringSection patient={patient} />

      {/* Section 16: Consignes de sortie Tuberculose */}
      <DischargeInstructionsSection patient={patient} />

      {/* Section 17: Conclusion de sortie */}
      <DischargeConclusionSection patient={patient} />

      {/* Message si aucune donnée n'est disponible */}
      {!patient?.tbkConsultationReason &&
        !patient?.tbkComorbidities &&
        !patient?.tbkPersonalTuberculosisHistory &&
        !patient?.tbkRecentTuberculosisContagion &&
        !patient?.tbkToxicHabits &&
        !patient?.tbkGeneralSigns &&
        !patient?.tbkFunctionalSigns &&
        !patient?.tbkClinicalExam &&
        !patient?.tbkComplementaryExams &&
        !patient?.tbkSputumBacteriology &&
        !patient?.tbkBkGenetics &&
        !patient?.tbkBiology &&
        !patient?.tbkDiagnosis &&
        !patient?.tbkPrescribedTreatment &&
        !patient?.tbkTreatment &&
        !patient?.tbkSerumDosage &&
        !patient?.tbkEvolution &&
        !patient?.tbkMonitoring &&
        !patient?.tbkDischargeInstructions &&
        !patient?.tbkDischargeConclusion && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Aucune donnée spécifique à la tuberculose n&apos;a été enregistrée
              pour ce patient.
            </p>
          </div>
        )}
    </div>
  );
}

// Configuration de la pathologie
TBKPathology.config = {
  id: "tbk",
  name: "Tuberculose",
  icon: "/icons/infection.svg",
  description: "Tuberculose et prise en charge thérapeutique",
  component: TBKPathology,
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
  console.log(
    "TBK ClinicalExamSection - patient.tbkClinicalExam:",
    patient?.tbkClinicalExam
  );

  // Utiliser la structure définie dans types.ts
  const clinicalExam = patient?.tbkClinicalExam;

  if (!clinicalExam) {
    console.log("TBK ClinicalExamSection - No clinical exam data found");
    return null;
  }

  const hasAnyClinicalData =
    clinicalExam?.temperature ||
    clinicalExam?.bloodPressure ||
    clinicalExam?.fr ||
    clinicalExam?.spO2 ||
    clinicalExam?.temp ||
    clinicalExam?.painEva ||
    clinicalExam?.weightLoss ||
    clinicalExam?.nightSweats ||
    clinicalExam?.fever ||
    clinicalExam?.chronicCough ||
    clinicalExam?.hemoptysis ||
    clinicalExam?.respiratoryDistress ||
    clinicalExam?.hemodynamicInstability ||
    clinicalExam?.consciousnessAlteration ||
    clinicalExam?.thoracicPain ||
    clinicalExam?.dyspnea ||
    clinicalExam?.cyanosis ||
    clinicalExam?.wheezing ||
    clinicalExam?.diminishedVesicularMurmur ||
    clinicalExam?.associatedRales ||
    clinicalExam?.tachycardia ||
    clinicalExam?.otherCardiovascular ||
    clinicalExam?.otherExams;

  if (!hasAnyClinicalData) return null;

  return (
    <PathologySection title="Examen clinique Tuberculose" patient={patient}>
      <div className="space-y-6">
        {/* Constantes vitales */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Constantes vitales
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {clinicalExam?.temperature && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tension artérielle
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.temperature} mmHg
                </p>
              </div>
            )}

            {clinicalExam?.bloodPressure && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fréquence cardiaque
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.bloodPressure} bpm
                </p>
              </div>
            )}

            {clinicalExam?.spO2 && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">SpO2</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.spO2}%
                </p>
              </div>
            )}

            {clinicalExam?.temp && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Température
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.temp}°C
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Symptômes généraux */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Symptômes généraux
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {clinicalExam?.weightLoss && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Perte de poids
              </span>
            )}

            {clinicalExam?.fever && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Fièvre
              </span>
            )}

            {clinicalExam?.nightSweats && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Sueurs nocturnes
              </span>
            )}
          </div>
        </div>

        {/* Symptômes respiratoires */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Symptômes respiratoires
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {clinicalExam?.chronicCough && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Toux chronique
              </span>
            )}

            {clinicalExam?.hemoptysis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Hémoptysie
              </span>
            )}

            {clinicalExam?.thoracicPain && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Douleur thoracique
              </span>
            )}

            {clinicalExam?.dyspnea && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Dyspnée
              </span>
            )}
          </div>
        </div>

        {/* Examen pleuro-pulmonaire */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Examen pleuro-pulmonaire
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinicalExam?.diminishedVesicularMurmur && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Murmure vésiculaire diminué
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  Présent
                </p>
              </div>
            )}

            {clinicalExam?.associatedRales && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Râles associés
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.associatedRalesDetails || "Présents"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Examen cardiovasculaire */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Examen cardiovasculaire
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinicalExam?.tachycardia && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tachycardie
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  Présente
                </p>
              </div>
            )}

            {clinicalExam?.otherCardiovascular && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Autres signes cardiovasculaires
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.otherCardiovascularDetails}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Autres examens */}
        {clinicalExam?.otherExams && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres examens
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {clinicalExam.otherExams}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK ComplementaryExamsSection - patient.tbkComplementaryExams:",
    patient?.tbkComplementaryExams
  );
  console.log(
    "TBK ComplementaryExamsSection - patient.tbkChestXRay:",
    patient?.tbkChestXRay
  );
  console.log(
    "TBK ComplementaryExamsSection - patient.tbkOtherAssessments:",
    patient?.tbkOtherAssessments
  );

  const complementaryExams = patient?.tbkComplementaryExams;
  const chestXRay = patient?.tbkChestXRay;
  const otherAssessments = patient?.tbkOtherAssessments;

  if (!complementaryExams && !chestXRay && !otherAssessments) {
    console.log(
      "TBK ComplementaryExamsSection - No complementary exams data found"
    );
    return null;
  }

  const hasAnyExamData =
    complementaryExams?.chestXrayReport ||
    complementaryExams?.ctReport ||
    complementaryExams?.bronchoscopyReport ||
    complementaryExams?.bloodGas ||
    complementaryExams?.nfs ||
    complementaryExams?.crp ||
    complementaryExams?.ionogram ||
    complementaryExams?.hemostasis ||
    complementaryExams?.bloodGroup ||
    complementaryExams?.bkSearch ||
    complementaryExams?.germCulture ||
    complementaryExams?.cytology ||
    complementaryExams?.histology ||
    complementaryExams?.molecularBiology ||
    chestXRay?.imageFiles ||
    otherAssessments?.thoracicCtImages ||
    otherAssessments?.bronchoscopyImages ||
    otherAssessments?.pleuralPunctureImages ||
    otherAssessments?.pleuralBiopsyImages ||
    otherAssessments?.otherAssessmentsImages;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection
      title="Examens complémentaires Tuberculose"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Imagerie */}
        {(chestXRay?.imageFiles ||
          otherAssessments?.thoracicCtImages ||
          otherAssessments?.bronchoscopyImages ||
          otherAssessments?.pleuralPunctureImages ||
          otherAssessments?.pleuralBiopsyImages ||
          otherAssessments?.otherAssessmentsImages) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Imagerie
            </p>

            {/* Radiographie thoracique */}
            {chestXRay?.imageFiles &&
              Array.isArray(chestXRay.imageFiles) &&
              chestXRay.imageFiles.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={chestXRay.imageFiles}
                    title="Radiographie thoracique"
                    imageAlt="Radiographie thoracique - Tuberculose"
                  />
                </div>
              )}

            {/* TDM thoracique */}
            {otherAssessments?.thoracicCtImages &&
              Array.isArray(otherAssessments.thoracicCtImages) &&
              otherAssessments.thoracicCtImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={otherAssessments.thoracicCtImages}
                    title="TDM thoracique"
                    imageAlt="TDM thoracique - Tuberculose"
                  />
                </div>
              )}

            {/* Bronchoscopie */}
            {otherAssessments?.bronchoscopyImages &&
              Array.isArray(otherAssessments.bronchoscopyImages) &&
              otherAssessments.bronchoscopyImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={otherAssessments.bronchoscopyImages}
                    title="Bronchoscopie"
                    imageAlt="Bronchoscopie - Tuberculose"
                  />
                </div>
              )}

            {/* Ponction pleurale */}
            {otherAssessments?.pleuralPunctureImages &&
              Array.isArray(otherAssessments.pleuralPunctureImages) &&
              otherAssessments.pleuralPunctureImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={otherAssessments.pleuralPunctureImages}
                    title="Ponction pleurale"
                    imageAlt="Ponction pleurale - Tuberculose"
                  />
                </div>
              )}

            {/* Biopsie pleurale */}
            {otherAssessments?.pleuralBiopsyImages &&
              Array.isArray(otherAssessments.pleuralBiopsyImages) &&
              otherAssessments.pleuralBiopsyImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={otherAssessments.pleuralBiopsyImages}
                    title="Biopsie pleurale"
                    imageAlt="Biopsie pleurale - Tuberculose"
                  />
                </div>
              )}

            {/* Autres bilans */}
            {otherAssessments?.otherAssessmentsImages &&
              Array.isArray(otherAssessments.otherAssessmentsImages) &&
              otherAssessments.otherAssessmentsImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={otherAssessments.otherAssessmentsImages}
                    title="Autres examens"
                    imageAlt="Autres examens - Tuberculose"
                  />
                </div>
              )}
          </div>
        )}

        {/* Bilan biologique */}
        {(complementaryExams?.bloodGas ||
          complementaryExams?.nfs ||
          complementaryExams?.crp ||
          complementaryExams?.ionogram ||
          complementaryExams?.hemostasis ||
          complementaryExams?.bloodGroup) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bilan biologique
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {complementaryExams?.bloodGas && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Gaz du sang
                </span>
              )}

              {complementaryExams?.nfs && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  NFS
                </span>
              )}

              {complementaryExams?.crp && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  CRP
                </span>
              )}

              {complementaryExams?.ionogram && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Ionogramme
                </span>
              )}

              {complementaryExams?.hemostasis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Hémostase
                </span>
              )}

              {complementaryExams?.bloodGroup && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Groupe sanguin
                </span>
              )}
            </div>
          </div>
        )}

        {/* Recherche BK et bactériologie */}
        {(complementaryExams?.bkSearch ||
          complementaryExams?.germCulture ||
          complementaryExams?.cytology ||
          complementaryExams?.histology ||
          complementaryExams?.molecularBiology) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Recherche BK et bactériologie
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {complementaryExams?.bkSearch && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Recherche BK
                </span>
              )}

              {complementaryExams?.germCulture && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Culture germe
                </span>
              )}

              {complementaryExams?.cytology && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Cytologie
                </span>
              )}

              {complementaryExams?.histology && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Histologie
                </span>
              )}

              {complementaryExams?.molecularBiology && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Biologie moléculaire (PCR)
                </span>
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
  const diagnosis = patient?.tbkDiagnosis;
  if (!diagnosis) return null;

  const hasAnyDiagnosticData =
    diagnosis.pulmonaryTuberculosis ||
    diagnosis.extraPulmonaryTuberculosis ||
    diagnosis.miliaryTuberculosis ||
    diagnosis.pleuralTuberculosis ||
    diagnosis.lymphNodeTuberculosis ||
    diagnosis.urogenitalTuberculosis ||
    diagnosis.boneTuberculosis ||
    diagnosis.meningealTuberculosis ||
    diagnosis.peritonealTuberculosis ||
    diagnosis.confirmationType ||
    diagnosis.diagnosticConclusion;

  if (!hasAnyDiagnosticData) return null;

  return (
    <PathologySection title="Diagnostic Tuberculose" patient={patient}>
      <div className="space-y-4">
        {/* Type de tuberculose */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Type de tuberculose
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {diagnosis.pulmonaryTuberculosis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Tuberculose pulmonaire
              </span>
            )}

            {diagnosis.extraPulmonaryTuberculosis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Tuberculose extra-pulmonaire
              </span>
            )}

            {diagnosis.miliaryTuberculosis && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Miliaire tuberculeuse
              </span>
            )}
          </div>
        </div>

        {/* Localisations extra-pulmonaires */}
        {(diagnosis.pleuralTuberculosis ||
          diagnosis.lymphNodeTuberculosis ||
          diagnosis.urogenitalTuberculosis ||
          diagnosis.boneTuberculosis ||
          diagnosis.meningealTuberculosis ||
          diagnosis.peritonealTuberculosis) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Localisations extra-pulmonaires
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {diagnosis.pleuralTuberculosis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Pleurale
                </span>
              )}

              {diagnosis.lymphNodeTuberculosis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Ganglionnaire
                </span>
              )}

              {diagnosis.urogenitalTuberculosis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Uro-génitale
                </span>
              )}

              {diagnosis.boneTuberculosis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Osseuse
                </span>
              )}

              {diagnosis.meningealTuberculosis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Méningée
                </span>
              )}

              {diagnosis.peritonealTuberculosis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  Péritonéale
                </span>
              )}
            </div>
          </div>
        )}

        {/* Confirmation diagnostique */}
        {diagnosis.confirmationType && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Confirmation diagnostique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diagnosis.confirmationType}
            </p>
          </div>
        )}

        {/* Conclusion diagnostique */}
        {diagnosis.diagnosticConclusion && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Conclusion diagnostique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diagnosis.diagnosticConclusion}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = patient?.tbkTreatment;
  if (!treatment) return null;

  const hasAnyTreatmentData =
    treatment.quadritherapy ||
    treatment.regimen ||
    treatment.treatmentDuration ||
    treatment.directObservedTherapy ||
    treatment.supportiveCare ||
    treatment.corticosteroids ||
    treatment.sideEffects ||
    treatment.treatmentMonitoring ||
    treatment.treatmentDetails;

  if (!hasAnyTreatmentData) return null;

  return (
    <PathologySection title="Traitement Tuberculose" patient={patient}>
      <div className="space-y-6">
        {/* Traitement antituberculeux */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Traitement antituberculeux
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {treatment.quadritherapy && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Quadrithérapie initiale
              </span>
            )}

            {treatment.directObservedTherapy && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Traitement directement observé (TDO)
              </span>
            )}

            {treatment.supportiveCare && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Soins de support
              </span>
            )}

            {treatment.corticosteroids && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Corticothérapie
              </span>
            )}
          </div>

          {/* Détails du traitement */}
          <div className="mt-4 space-y-2">
            {treatment.regimen && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Schéma thérapeutique: {treatment.regimen}
              </p>
            )}

            {treatment.treatmentDuration && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Durée du traitement: {treatment.treatmentDuration}
              </p>
            )}

            {treatment.treatmentDetails && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Détails: {treatment.treatmentDetails}
              </p>
            )}
          </div>
        </div>

        {/* Surveillance du traitement */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Surveillance du traitement
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {treatment.treatmentMonitoring && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                Surveillance régulière
              </span>
            )}
          </div>
        </div>

        {/* Effets secondaires */}
        {treatment.sideEffects && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Effets secondaires
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {treatment.sideEffects}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section surveillance
function MonitoringSection({ patient }: { patient: ExtendedPatient }) {
  const monitoring = patient?.tbkMonitoring;
  if (!monitoring) return null;

  const hasAnyMonitoringData =
    monitoring.clinicalMonitoring ||
    monitoring.biologicalMonitoring ||
    monitoring.radiologicalMonitoring ||
    monitoring.treatmentCompliance ||
    monitoring.complications ||
    monitoring.evolutionRemarks;

  if (!hasAnyMonitoringData) return null;

  return (
    <PathologySection title="Surveillance Tuberculose" patient={patient}>
      <div className="space-y-4">
        {/* Monitoring clinique */}
        {monitoring.clinicalMonitoring && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Monitoring clinique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.clinicalMonitoringDetails ||
                "Surveillance clinique régulière"}
            </p>
          </div>
        )}

        {/* Monitoring biologique */}
        {monitoring.biologicalMonitoring && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Monitoring biologique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.biologicalMonitoringDetails ||
                "Surveillance biologique régulière"}
            </p>
          </div>
        )}

        {/* Contrôle radiologique */}
        {monitoring.radiologicalMonitoring && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contrôle radiologique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.radiologicalMonitoringDetails}
            </p>
          </div>
        )}

        {/* Observance thérapeutique */}
        {monitoring.treatmentCompliance && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Observance thérapeutique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.treatmentComplianceDetails}
            </p>
          </div>
        )}

        {/* Complications */}
        {monitoring.complications && monitoring.complications.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Complications
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {monitoring.complications.map((complication, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                >
                  {complication}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Remarques évolutives */}
        {monitoring.evolutionRemarks && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Remarques évolutives
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.evolutionRemarks}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section consignes de sortie
function DischargeInstructionsSection({
  patient,
}: {
  patient: ExtendedPatient;
}) {
  const discharge = patient?.tbkDischargeInstructions;
  if (!discharge) return null;

  const hasAnyDischargeData =
    discharge.continuationTreatment ||
    discharge.treatmentDuration ||
    discharge.followUpConsultation ||
    discharge.infectionControl ||
    discharge.nutritionalAdvice ||
    discharge.familyScreening ||
    discharge.emergencyReturn ||
    discharge.otherInstructions;

  if (!hasAnyDischargeData) return null;

  return (
    <PathologySection title="Consignes de sortie Tuberculose" patient={patient}>
      <div className="space-y-6">
        {/* Traitement de sortie */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Traitement de sortie
          </p>
          <div className="mt-2 space-y-2">
            {discharge.continuationTreatment && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Poursuite du traitement antituberculeux
              </p>
            )}

            {discharge.treatmentDuration && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Durée totale prévue: {discharge.treatmentDuration}
              </p>
            )}
          </div>
        </div>

        {/* Suivi recommandé */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Suivi recommandé
          </p>
          <div className="mt-2 space-y-2">
            {discharge.followUpConsultation && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Consultation de suivi prévue
              </p>
            )}

            {discharge.followUpFrequency && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Fréquence: {discharge.followUpFrequency}
              </p>
            )}
          </div>
        </div>

        {/* Mesures d'hygiène */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Mesures d&apos;hygiène et prévention
          </p>
          <div className="mt-2 space-y-2">
            {discharge.infectionControl && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Mesures de contrôle de l&apos;infection
              </p>
            )}

            {discharge.familyScreening && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Dépistage de l&apos;entourage familial
              </p>
            )}
          </div>
        </div>

        {/* Recommandations générales */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Recommandations générales
          </p>
          <div className="mt-2 space-y-2">
            {discharge.nutritionalAdvice && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Conseils nutritionnels
              </p>
            )}

            {discharge.emergencyReturn && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Retour aux urgences en cas de symptômes inquiétants
              </p>
            )}
          </div>
        </div>

        {/* Autres instructions */}
        {discharge.otherInstructions && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres instructions
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {discharge.otherInstructions}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section motif d'hospitalisation
function ConsultationReasonSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK ConsultationReasonSection - patient.tbkConsultationReason:",
    patient?.tbkConsultationReason
  );

  const consultationReason = patient?.tbkConsultationReason;

  if (!consultationReason || !consultationReason.consultationReason) {
    console.log(
      "TBK ConsultationReasonSection - No consultation reason data found"
    );
    return null;
  }

  return (
    <PathologySection title="Motif d'hospitalisation" patient={patient}>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Motif de consultation
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {consultationReason.consultationReason}
          </p>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section antécédents
function MedicalHistorySection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK MedicalHistorySection - patient.tbkComorbidities:",
    patient?.tbkComorbidities
  );
  console.log(
    "TBK MedicalHistorySection - patient.tbkPersonalTuberculosisHistory:",
    patient?.tbkPersonalTuberculosisHistory
  );
  console.log(
    "TBK MedicalHistorySection - patient.tbkRecentTuberculosisContagion:",
    patient?.tbkRecentTuberculosisContagion
  );
  console.log(
    "TBK MedicalHistorySection - patient.tbkToxicHabits:",
    patient?.tbkToxicHabits
  );

  const comorbidities = patient?.tbkComorbidities;
  const personalHistory = patient?.tbkPersonalTuberculosisHistory;
  const recentContagion = patient?.tbkRecentTuberculosisContagion;
  const toxicHabits = patient?.tbkToxicHabits;

  const hasAnyMedicalHistoryData =
    comorbidities?.diabetes ||
    comorbidities?.renalInsufficiency ||
    comorbidities?.hiv ||
    comorbidities?.pregnancy ||
    comorbidities?.otherComorbidities ||
    personalHistory?.personalTuberculosisHistory ||
    recentContagion?.recentContagion ||
    toxicHabits?.smoking ||
    toxicHabits?.cannabis ||
    toxicHabits?.alcohol ||
    toxicHabits?.drugAddiction;

  if (!hasAnyMedicalHistoryData) {
    console.log("TBK MedicalHistorySection - No medical history data found");
    return null;
  }

  return (
    <PathologySection title="Antécédents" patient={patient}>
      <div className="space-y-6">
        {/* Comorbidités */}
        {(comorbidities?.diabetes ||
          comorbidities?.renalInsufficiency ||
          comorbidities?.hiv ||
          comorbidities?.pregnancy ||
          comorbidities?.otherComorbidities) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Comorbidités
            </p>
            <div className="mt-2 space-y-2">
              {comorbidities?.diabetes && (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    Diabète
                  </span>
                  {comorbidities?.diabetesType && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({comorbidities.diabetesType})
                    </span>
                  )}
                  {comorbidities?.diabetesBalance && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - {comorbidities.diabetesBalance}
                    </span>
                  )}
                </div>
              )}

              {comorbidities?.renalInsufficiency && (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    Insuffisance rénale
                  </span>
                  {comorbidities?.creatinineClearance && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - Clairance: {comorbidities.creatinineClearance} ml/min
                    </span>
                  )}
                  {comorbidities?.dialysis && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - Dialyse
                    </span>
                  )}
                </div>
              )}

              {comorbidities?.hiv && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                  VIH
                </span>
              )}

              {comorbidities?.pregnancy && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300">
                  Grossesse
                </span>
              )}

              {comorbidities?.otherComorbidities && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Autres: {comorbidities.otherComorbidities}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ATCD Personnel de Tuberculose */}
        {personalHistory?.personalTuberculosisHistory && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Antécédents personnels de tuberculose
            </p>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-900 dark:text-white">
                Antécédents de tuberculose: Oui
              </p>

              {personalHistory?.treatments &&
                personalHistory.treatments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Traitements antérieurs:
                    </p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      {personalHistory.treatments.map((treatment, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-900 dark:text-white"
                        >
                          {treatment.treatment &&
                            `Traitement: ${treatment.treatment}`}
                          {treatment.form && ` - Forme: ${treatment.form}`}
                          {treatment.regimen &&
                            ` - Schéma: ${treatment.regimen}`}
                          {treatment.startDate &&
                            ` - Début: ${treatment.startDate}`}
                          {treatment.evolution &&
                            ` - Évolution: ${treatment.evolution}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Notion de Contage Tuberculeux Récent */}
        {recentContagion?.recentContagion && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contage tuberculeux récent
            </p>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-900 dark:text-white">
                Contage récent: Oui
              </p>

              {recentContagion?.contactType && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Type de contact: {recentContagion.contactType}
                </p>
              )}

              {recentContagion?.contactForm && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Forme: {recentContagion.contactForm}
                </p>
              )}

              {recentContagion?.contactRegimen &&
                recentContagion.contactRegimen.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Schéma thérapeutique:{" "}
                      {recentContagion.contactRegimen.join(", ")}
                    </p>
                  </div>
                )}

              {recentContagion?.contactEvolution && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Évolution: {recentContagion.contactEvolution}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Habitudes Toxiques */}
        {(toxicHabits?.smoking ||
          toxicHabits?.cannabis ||
          toxicHabits?.alcohol ||
          toxicHabits?.drugAddiction) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Habitudes toxiques
            </p>
            <div className="mt-2 space-y-2">
              {toxicHabits?.smoking && (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                    Tabac
                  </span>
                  {toxicHabits?.packYears && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - {toxicHabits.packYears} paquets-année
                    </span>
                  )}
                  {toxicHabits?.smokingStopped && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - Arrêté
                    </span>
                  )}
                </div>
              )}

              {toxicHabits?.cannabis && (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Cannabis
                  </span>
                  {toxicHabits?.jointsPerDay && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - {toxicHabits.jointsPerDay} joints/jour
                    </span>
                  )}
                  {toxicHabits?.cannabisStopped && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - Arrêté
                    </span>
                  )}
                </div>
              )}

              {toxicHabits?.alcohol && (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Alcool
                  </span>
                  {toxicHabits?.alcoholFrequency && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - {toxicHabits.alcoholFrequency}
                    </span>
                  )}
                  {toxicHabits?.alcoholStopped && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - Arrêté
                    </span>
                  )}
                </div>
              )}

              {toxicHabits?.drugAddiction && (
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    Toxicomanie
                  </span>
                  {toxicHabits?.drugType && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - {toxicHabits.drugType}
                    </span>
                  )}
                  {toxicHabits?.drugStopped && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      - Arrêté
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section signes généraux
function GeneralSignsSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK GeneralSignsSection - patient.tbkGeneralSigns:",
    patient?.tbkGeneralSigns
  );

  const generalSigns = patient?.tbkGeneralSigns;

  const hasAnyGeneralSignsData =
    generalSigns?.fever ||
    generalSigns?.anorexia ||
    generalSigns?.weightLoss ||
    generalSigns?.asthenia ||
    generalSigns?.omsPs;

  if (!hasAnyGeneralSignsData) {
    console.log("TBK GeneralSignsSection - No general signs data found");
    return null;
  }

  return (
    <PathologySection title="Signes généraux" patient={patient}>
      <div className="space-y-4">
        {/* Fièvre */}
        {generalSigns?.fever && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fièvre
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Présente
              </span>
              {generalSigns?.feverType && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({generalSigns.feverType})
                </span>
              )}
              {generalSigns?.feverValue && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  - {generalSigns.feverValue}°C
                </span>
              )}
            </div>
          </div>
        )}

        {/* Anorexie */}
        {generalSigns?.anorexia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Anorexie
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Présente
              </span>
            </div>
          </div>
        )}

        {/* Perte de poids */}
        {generalSigns?.weightLoss && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Perte de poids
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Présente
              </span>
              {generalSigns?.weightLossType && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({generalSigns.weightLossType})
                </span>
              )}
              {generalSigns?.weightLossValue && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  - {generalSigns.weightLossValue} kg
                </span>
              )}
            </div>
          </div>
        )}

        {/* Asthénie */}
        {generalSigns?.asthenia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Asthénie
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                Présente
              </span>
            </div>
          </div>
        )}

        {/* Performance Status OMS */}
        {generalSigns?.omsPs && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Performance Status OMS
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {generalSigns.omsPs}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section signes fonctionnels
function FunctionalSignsSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK FunctionalSignsSection - patient.tbkFunctionalSigns:",
    patient?.tbkFunctionalSigns
  );

  const functionalSigns = patient?.tbkFunctionalSigns;

  const hasAnyFunctionalSignsData =
    functionalSigns?.cough ||
    functionalSigns?.sputumAspect ||
    functionalSigns?.hemoptysisAbundance ||
    functionalSigns?.thoracicPain ||
    functionalSigns?.dyspnea ||
    functionalSigns?.otherFunctionalSigns ||
    functionalSigns?.extrathoracicSigns;

  if (!hasAnyFunctionalSignsData) {
    console.log("TBK FunctionalSignsSection - No functional signs data found");
    return null;
  }

  return (
    <PathologySection title="Signes fonctionnels" patient={patient}>
      <div className="space-y-4">
        {/* Toux */}
        {functionalSigns?.cough && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Toux
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Présente
              </span>
            </div>
          </div>
        )}

        {/* Expectoration */}
        {functionalSigns?.cough && functionalSigns?.sputumAspect && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Aspect des expectorations
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {functionalSigns.sputumAspect}
            </p>
          </div>
        )}

        {/* Hémoptysie */}
        {functionalSigns?.hemoptysisAbundance && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hémoptysie
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                {functionalSigns.hemoptysisAbundance}
              </span>
            </div>
          </div>
        )}

        {/* Douleur thoracique */}
        {functionalSigns?.thoracicPain && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Douleur thoracique
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Présente
              </span>
            </div>
          </div>
        )}

        {/* Dyspnée */}
        {functionalSigns?.dyspnea && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dyspnée
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                Présente
              </span>
              {functionalSigns?.dyspneaMmrcStage && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  - Stade MMRC: {functionalSigns.dyspneaMmrcStage}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Autres signes fonctionnels */}
        {functionalSigns?.otherFunctionalSigns && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres signes fonctionnels
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {functionalSigns.otherFunctionalSigns}
            </p>
          </div>
        )}

        {/* Signes extrathoraciques */}
        {functionalSigns?.extrathoracicSigns && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Signes extrathoraciques
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                Présents
              </span>
              {functionalSigns?.extrathoracicSignsDetails && (
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {functionalSigns.extrathoracicSignsDetails}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section bactériologie des expectorations
function SputumBacteriologySection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK SputumBacteriologySection - patient.tbkSputumBacteriology:",
    patient?.tbkSputumBacteriology
  );

  const sputumBacteriology = patient?.tbkSputumBacteriology;

  const hasAnySputumBacteriologyData =
    sputumBacteriology?.directExams ||
    sputumBacteriology?.bkCulture ||
    sputumBacteriology?.antibiogram ||
    sputumBacteriology?.otherBacteriology;

  if (!hasAnySputumBacteriologyData) {
    console.log(
      "TBK SputumBacteriologySection - No sputum bacteriology data found"
    );
    return null;
  }

  return (
    <PathologySection
      title="Bactériologie des expectorations"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Examens directs */}
        {sputumBacteriology?.directExams &&
          sputumBacteriology.directExams.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Examens directs
              </p>
              <div className="mt-2 space-y-2">
                {sputumBacteriology.directExams.map((exam, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-900 dark:text-white"
                  >
                    {exam.date && <span>Date: {exam.date} - </span>}
                    {exam.result && <span>Résultat: {exam.result}</span>}
                    {exam.bacterialLoad && (
                      <span> - Charge: {exam.bacterialLoad}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Culture BK */}
        {sputumBacteriology?.bkCulture && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Culture BK
            </p>
            <div className="mt-2 space-y-2">
              {sputumBacteriology.bkCulture.date && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {sputumBacteriology.bkCulture.date}
                </p>
              )}
              {sputumBacteriology.bkCulture.medium && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Milieu: {sputumBacteriology.bkCulture.medium}
                </p>
              )}
              {sputumBacteriology.bkCulture.result && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Résultat: {sputumBacteriology.bkCulture.result}
                </p>
              )}
              {sputumBacteriology.bkCulture.bacterialLoad && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Charge bactérienne:{" "}
                  {sputumBacteriology.bkCulture.bacterialLoad}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Antibiogramme */}
        {sputumBacteriology?.antibiogram && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Antibiogramme
            </p>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-900 dark:text-white">
                Statut: {sputumBacteriology.antibiogram}
              </p>
              {sputumBacteriology?.antibiogramType && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Type: {sputumBacteriology.antibiogramType}
                </p>
              )}
              {sputumBacteriology?.antibiogramResult && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Résultat: {sputumBacteriology.antibiogramResult}
                </p>
              )}
              {sputumBacteriology?.resistanceDetails && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Détails de résistance: {sputumBacteriology.resistanceDetails}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres bactériologies */}
        {sputumBacteriology?.otherBacteriology && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres bactériologies
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {sputumBacteriology.otherBacteriology}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section génétique BK
function BkGeneticsSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK BkGeneticsSection - patient.tbkBkGenetics:",
    patient?.tbkBkGenetics
  );

  const bkGenetics = patient?.tbkBkGenetics;

  const hasAnyBkGeneticsData = bkGenetics?.genexpert || bkGenetics?.hain;

  if (!hasAnyBkGeneticsData) {
    console.log("TBK BkGeneticsSection - No BK genetics data found");
    return null;
  }

  return (
    <PathologySection title="Génétique BK" patient={patient}>
      <div className="space-y-6">
        {/* GeneXpert */}
        {bkGenetics?.genexpert && bkGenetics.genexpert === "Fait" && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              GeneXpert
            </p>
            <div className="mt-2 space-y-2">
              {bkGenetics?.genexpertDate && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {bkGenetics.genexpertDate}
                </p>
              )}
              {bkGenetics?.mtbDna && (
                <p className="text-sm text-gray-900 dark:text-white">
                  ADN MTB: {bkGenetics.mtbDna}
                </p>
              )}
              {bkGenetics?.rifampicinSensitivity && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Sensibilité à la rifampicine:{" "}
                  {bkGenetics.rifampicinSensitivity}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Test HAIN */}
        {bkGenetics?.hain && bkGenetics.hain === "Fait" && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Test HAIN
            </p>
            <div className="mt-2 space-y-2">
              {bkGenetics?.hainDate && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {bkGenetics.hainDate}
                </p>
              )}
              {bkGenetics?.hainSensitivity &&
                bkGenetics.hainSensitivity.length > 0 && (
                  <p className="text-sm text-gray-900 dark:text-white">
                    Sensibilités: {bkGenetics.hainSensitivity.join(", ")}
                  </p>
                )}
              {bkGenetics?.hainOtherResistances && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Autres résistances: {bkGenetics.hainOtherResistances}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section biologie
function BiologySection({ patient }: { patient: ExtendedPatient }) {
  console.log("TBK BiologySection - patient.tbkBiology:", patient?.tbkBiology);

  const biology = patient?.tbkBiology;

  const hasAnyBiologyData =
    biology?.nfsHb ||
    biology?.nfsWbc ||
    biology?.nfsPlatelets ||
    biology?.nfsLymphocytes ||
    biology?.nfsPmn ||
    biology?.esr ||
    biology?.crp ||
    biology?.urea ||
    biology?.creatinine ||
    biology?.calculatedCreatinineClearance ||
    biology?.alt ||
    biology?.alp ||
    biology?.ggt ||
    biology?.totalBilirubin ||
    biology?.prothrombinTime ||
    biology?.albumin ||
    biology?.hbvSerology ||
    biology?.hcvSerology ||
    biology?.hivSerology ||
    biology?.admissionGlycatedHemoglobin ||
    biology?.otherBiologicalAssessments;

  if (!hasAnyBiologyData) {
    console.log("TBK BiologySection - No biology data found");
    return null;
  }

  return (
    <PathologySection title="Biologie" patient={patient}>
      <div className="space-y-6">
        {/* Numération Formule Sanguine */}
        {(biology?.nfsHb ||
          biology?.nfsWbc ||
          biology?.nfsPlatelets ||
          biology?.nfsLymphocytes ||
          biology?.nfsPmn) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Numération Formule Sanguine
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.nfsHb && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hémoglobine
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.nfsHb} g/dL
                  </p>
                </div>
              )}
              {biology?.nfsWbc && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Globules blancs
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.nfsWbc} /mm³
                  </p>
                </div>
              )}
              {biology?.nfsPlatelets && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Plaquettes
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.nfsPlatelets} /mm³
                  </p>
                </div>
              )}
              {biology?.nfsLymphocytes && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lymphocytes
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.nfsLymphocytes} /mm³
                  </p>
                </div>
              )}
              {biology?.nfsPmn && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Polynucléaires neutrophiles
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.nfsPmn} /mm³
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Marqueurs inflammatoires */}
        {(biology?.esr || biology?.crp) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Marqueurs inflammatoires
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.esr && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">VS</p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.esr} mm/h
                  </p>
                </div>
              )}
              {biology?.crp && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CRP
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.crp} mg/L
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fonction rénale */}
        {(biology?.urea ||
          biology?.creatinine ||
          biology?.calculatedCreatinineClearance) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fonction rénale
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.urea && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Urée
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.urea} mmol/L
                  </p>
                </div>
              )}
              {biology?.creatinine && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Créatinine
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.creatinine} µmol/L
                  </p>
                </div>
              )}
              {biology?.calculatedCreatinineClearance && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Clairance calculée
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.calculatedCreatinineClearance} ml/min
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fonction hépatique */}
        {(biology?.alt ||
          biology?.alp ||
          biology?.altAlpRatio ||
          biology?.ggt ||
          biology?.totalBilirubin ||
          biology?.prothrombinTime ||
          biology?.albumin) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fonction hépatique
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.alt && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ALT
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.alt} UI/L
                  </p>
                </div>
              )}
              {biology?.alp && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ALP
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.alp} UI/L
                  </p>
                </div>
              )}
              {biology?.altAlpRatio && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ratio ALT/ALP
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.altAlpRatio}
                  </p>
                </div>
              )}
              {biology?.ggt && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    GGT
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.ggt} UI/L
                  </p>
                </div>
              )}
              {biology?.totalBilirubin && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bilirubine totale
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.totalBilirubin} µmol/L
                  </p>
                </div>
              )}
              {biology?.prothrombinTime && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Temps de prothrombine
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.prothrombinTime} %
                  </p>
                </div>
              )}
              {biology?.albumin && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Albumine
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.albumin} g/L
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sérologies */}
        {(biology?.hbvSerology ||
          biology?.hcvSerology ||
          biology?.hivSerology) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sérologies
            </p>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.hbvSerology && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sérologie VHB
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.hbvSerology}
                  </p>
                </div>
              )}
              {biology?.hcvSerology && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sérologie VHC
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.hcvSerology}
                  </p>
                </div>
              )}
              {biology?.hivSerology && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sérologie VIH
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {biology.hivSerology}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Autres bilans biologiques */}
        {biology?.admissionGlycatedHemoglobin && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hémoglobine glyquée à l&apos;admission
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {biology.admissionGlycatedHemoglobin} %
            </p>
          </div>
        )}

        {biology?.otherBiologicalAssessments && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres bilans biologiques
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {biology.otherBiologicalAssessments}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement prescrit
function PrescribedTreatmentSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK PrescribedTreatmentSection - patient.tbkPrescribedTreatment:",
    patient?.tbkPrescribedTreatment
  );

  const prescribedTreatment = patient?.tbkPrescribedTreatment;

  const hasAnyPrescribedTreatmentData =
    prescribedTreatment?.startDate ||
    prescribedTreatment?.regimen ||
    prescribedTreatment?.otherRegimen ||
    prescribedTreatment?.dosage ||
    prescribedTreatment?.otherTherapeutics;

  if (!hasAnyPrescribedTreatmentData) {
    console.log(
      "TBK PrescribedTreatmentSection - No prescribed treatment data found"
    );
    return null;
  }

  return (
    <PathologySection title="Traitement prescrit" patient={patient}>
      <div className="space-y-4">
        {prescribedTreatment?.startDate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date de début
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {prescribedTreatment.startDate}
            </p>
          </div>
        )}

        {prescribedTreatment?.regimen &&
          prescribedTreatment.regimen.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Schéma thérapeutique
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {prescribedTreatment.regimen.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

        {prescribedTreatment?.otherRegimen && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autre schéma
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {prescribedTreatment.otherRegimen}
            </p>
          </div>
        )}

        {prescribedTreatment?.dosage && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Posologie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {prescribedTreatment.dosage}
            </p>
          </div>
        )}

        {prescribedTreatment?.otherTherapeutics && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres thérapeutiques
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {prescribedTreatment.otherTherapeutics}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section dosage sérique des AT
function SerumDosageSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK SerumDosageSection - patient.tbkSerumDosage:",
    patient?.tbkSerumDosage
  );

  const serumDosage = patient?.tbkSerumDosage;

  const hasAnySerumDosageData =
    serumDosage?.status === "Faite" ||
    serumDosage?.hemie?.performed ||
    serumDosage?.remie?.performed ||
    serumDosage?.zemie?.performed ||
    serumDosage?.emie?.performed;

  if (!hasAnySerumDosageData) {
    console.log("TBK SerumDosageSection - No serum dosage data found");
    return null;
  }

  return (
    <PathologySection title="Dosage sérique des AT" patient={patient}>
      <div className="space-y-6">
        {serumDosage?.status && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Statut
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {serumDosage.status}
            </p>
          </div>
        )}

        {serumDosage?.date && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {serumDosage.date}
            </p>
          </div>
        )}

        {serumDosage?.indication && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Indication
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {serumDosage.indication}
            </p>
          </div>
        )}

        {/* Dosage Hémié */}
        {serumDosage?.hemie?.performed && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dosage Hémié (H)
            </p>
            <div className="mt-2 space-y-2">
              {serumDosage.hemie.dosageDate && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {serumDosage.hemie.dosageDate}
                </p>
              )}
              {serumDosage.hemie.peakSerumLevel && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Pic sérique: {serumDosage.hemie.peakSerumLevel} µg/mL
                </p>
              )}
            </div>
          </div>
        )}

        {/* Dosage Rémié */}
        {serumDosage?.remie?.performed && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dosage Rémié (R)
            </p>
            <div className="mt-2 space-y-2">
              {serumDosage.remie.dosageDate && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {serumDosage.remie.dosageDate}
                </p>
              )}
              {serumDosage.remie.peakSerumLevel && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Pic sérique: {serumDosage.remie.peakSerumLevel} µg/mL
                </p>
              )}
            </div>
          </div>
        )}

        {/* Dosage Zémié */}
        {serumDosage?.zemie?.performed && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dosage Zémié (Z)
            </p>
            <div className="mt-2 space-y-2">
              {serumDosage.zemie.dosageDate && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {serumDosage.zemie.dosageDate}
                </p>
              )}
              {serumDosage.zemie.peakSerumLevel && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Pic sérique: {serumDosage.zemie.peakSerumLevel} µg/mL
                </p>
              )}
            </div>
          </div>
        )}

        {/* Dosage Émié */}
        {serumDosage?.emie?.performed && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dosage Émié (E)
            </p>
            <div className="mt-2 space-y-2">
              {serumDosage.emie.dosageDate && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {serumDosage.emie.dosageDate}
                </p>
              )}
              {serumDosage.emie.peakSerumLevel && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Pic sérique: {serumDosage.emie.peakSerumLevel} µg/mL
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section évolution
function EvolutionSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK EvolutionSection - patient.tbkEvolution:",
    patient?.tbkEvolution
  );

  const evolution = patient?.tbkEvolution;

  const hasAnyEvolutionData =
    evolution?.clinicalEvolution ||
    evolution?.day15BkDirectExam ||
    evolution?.chestXRayEvolution ||
    evolution?.treatmentTolerance ||
    evolution?.sideEffects;

  if (!hasAnyEvolutionData) {
    console.log("TBK EvolutionSection - No evolution data found");
    return null;
  }

  return (
    <PathologySection title="Évolution" patient={patient}>
      <div className="space-y-6">
        {/* Évolution clinique */}
        {evolution?.clinicalEvolution && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Évolution clinique
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                {evolution.clinicalEvolution}
              </span>
            </div>
            {evolution?.otherClinicalEvolution && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {evolution.otherClinicalEvolution}
              </p>
            )}
          </div>
        )}

        {/* Examen direct BK à J15 */}
        {evolution?.day15BkDirectExam && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Examen direct BK à J15
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                {evolution.day15BkDirectExam}
              </span>
              {evolution?.day15BkLoad && (
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Charge: {evolution.day15BkLoad}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Évolution radio */}
        {evolution?.chestXRayEvolution && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Évolution radio
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                {evolution.chestXRayEvolution}
              </span>
            </div>
            {evolution?.otherChestXRayEvolution && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {evolution.otherChestXRayEvolution}
              </p>
            )}
          </div>
        )}

        {/* Tolérance du traitement */}
        {evolution?.treatmentTolerance && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tolérance du traitement
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                {evolution.treatmentTolerance}
              </span>
            </div>
            {evolution?.toleranceDetails && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {evolution.toleranceDetails}
              </p>
            )}
          </div>
        )}

        {/* Effets secondaires */}
        {evolution?.sideEffects && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Effets secondaires
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Présents
              </span>
            </div>
            {evolution?.sideEffectsDetails && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {evolution.sideEffectsDetails}
              </p>
            )}
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section conclusion de sortie
function DischargeConclusionSection({ patient }: { patient: ExtendedPatient }) {
  console.log(
    "TBK DischargeConclusionSection - patient.tbkDischargeConclusion:",
    patient?.tbkDischargeConclusion
  );

  const dischargeConclusion = patient?.tbkDischargeConclusion;

  const hasAnyDischargeConclusionData =
    dischargeConclusion?.dischargeDate ||
    dischargeConclusion?.dischargeConclusion;

  if (!hasAnyDischargeConclusionData) {
    console.log(
      "TBK DischargeConclusionSection - No discharge conclusion data found"
    );
    return null;
  }

  return (
    <PathologySection title="Conclusion de sortie" patient={patient}>
      <div className="space-y-4">
        {dischargeConclusion?.dischargeDate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date de sortie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {dischargeConclusion.dischargeDate}
            </p>
          </div>
        )}

        {dischargeConclusion?.dischargeConclusion && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Conclusion de sortie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {dischargeConclusion.dischargeConclusion}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
