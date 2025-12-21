"use client";

import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { ImageGallery } from "../shared/ImageGallery";
import { PathologySection } from "./PathologySection";

export function PneumothoraxPathology({
  patient,
  pathologyId = "pneumothorax",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Examen clinique Pneumothorax */}
      <ClinicalExamSection patient={patient} />

      {/* Section 2: Examens complémentaires Pneumothorax */}
      <ComplementaryExamsSection patient={patient} />

      {/* Section 3: Diagnostic Pneumothorax */}
      <DiagnosticSection patient={patient} />

      {/* Section 4: Prise en charge Pneumothorax */}
      <ManagementSection patient={patient} />

      {/* Section 5: Surveillance Pneumothorax */}
      <MonitoringSection patient={patient} />

      {/* Section 6: Consignes de sortie Pneumothorax */}
      <DischargeInstructionsSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
PneumothoraxPathology.config = {
  id: "pneumothorax",
  name: "Pneumothorax",
  icon: "/icons/pneumothorax.svg",
  description: "Pneumothorax et prise en charge thérapeutique",
  component: PneumothoraxPathology,
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
  const clinicalExam = patient?.pneumothoraxClinicalExam;
  if (!clinicalExam) return null;

  const hasAnyClinicalData =
    clinicalExam.ta ||
    clinicalExam.fc ||
    clinicalExam.fr ||
    clinicalExam.spO2 ||
    clinicalExam.temp ||
    clinicalExam.painEva ||
    clinicalExam.respiratoryDistress ||
    clinicalExam.desaturation ||
    clinicalExam.hemodynamicInstability ||
    clinicalExam.consciousnessAlteration ||
    clinicalExam.compressivePneumothorax ||
    clinicalExam.thoracicAsymmetry ||
    clinicalExam.subcutaneousEmphysema ||
    clinicalExam.trachealDeviation ||
    clinicalExam.cyanosis ||
    clinicalExam.tympanism ||
    clinicalExam.diminishedVesicularMurmur ||
    clinicalExam.associatedRales ||
    clinicalExam.tachycardia ||
    clinicalExam.shockSigns ||
    clinicalExam.otherCardiovascular ||
    clinicalExam.otherExams;

  if (!hasAnyClinicalData) return null;

  return (
    <PathologySection title="Examen clinique Pneumothorax" patient={patient}>
      <div className="space-y-6">
        {/* Constantes vitales */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Constantes vitales
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {clinicalExam.ta && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tension artérielle
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.ta} mmHg
                </p>
              </div>
            )}

            {clinicalExam.fc && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fréquence cardiaque
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.fc} bpm
                </p>
              </div>
            )}

            {clinicalExam.fr && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fréquence respiratoire
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.fr} c/min
                </p>
              </div>
            )}

            {clinicalExam.spO2 && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">SpO2</p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.spO2}%
                </p>
              </div>
            )}

            {clinicalExam.temp && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Température
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.temp}°C
                </p>
              </div>
            )}

            {clinicalExam.painEva && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Douleur (EVA)
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.painEva}/10
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Signes de gravité */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Signes de gravité
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {clinicalExam.respiratoryDistress && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Détresse respiratoire
              </span>
            )}

            {clinicalExam.desaturation && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Désaturation
              </span>
            )}

            {clinicalExam.hemodynamicInstability && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Instabilité hémodynamique
              </span>
            )}

            {clinicalExam.consciousnessAlteration && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Altération de conscience
              </span>
            )}

            {clinicalExam.compressivePneumothorax && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Pneumothorax compressif
              </span>
            )}
          </div>
        </div>

        {/* Examen thoracique */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Examen thoracique
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {clinicalExam.thoracicAsymmetry && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Asymétrie thoracique
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.thoracicAsymmetrySide
                    ? `Côté ${clinicalExam.thoracicAsymmetrySide}`
                    : "Présente"}
                </p>
              </div>
            )}

            {clinicalExam.subcutaneousEmphysema && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Emphysème sous-cutané
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  Présent
                </p>
              </div>
            )}

            {clinicalExam.trachealDeviation && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Déviation trachéale
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  Présente
                </p>
              </div>
            )}

            {clinicalExam.cyanosis && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cyanose
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  Présente
                </p>
              </div>
            )}

            {clinicalExam.tympanism && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tympanisme
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.tympanismSide
                    ? `Côté ${clinicalExam.tympanismSide}`
                    : "Présent"}
                </p>
              </div>
            )}

            {clinicalExam.diminishedVesicularMurmur && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Murmure vésiculaire diminué
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {clinicalExam.diminishedVesicularMurmurSide
                    ? `Côté ${clinicalExam.diminishedVesicularMurmurSide}`
                    : "Présent"}
                </p>
              </div>
            )}

            {clinicalExam.associatedRales && (
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
          <div className="mt-2 flex flex-wrap gap-2">
            {clinicalExam.tachycardia && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Tachycardie
              </span>
            )}

            {clinicalExam.shockSigns && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Signes de choc
              </span>
            )}

            {clinicalExam.otherCardiovascular && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Autres: {clinicalExam.otherCardiovascularDetails}
              </span>
            )}
          </div>
        </div>

        {/* Autres examens */}
        {clinicalExam.otherExams && (
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
  const exams = patient?.pneumothoraxComplementaryExams;
  if (!exams) return null;

  const hasAnyExamData =
    exams.chestXrayImages ||
    exams.pleuralUltrasoundImages ||
    exams.thoracicCtdImages ||
    exams.chestXray ||
    exams.pleuralUltrasound ||
    exams.thoracicCtd ||
    exams.bloodGas ||
    exams.nfs ||
    exams.crp ||
    exams.ionogram ||
    exams.hemostasis ||
    exams.bloodGroup;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection
      title="Examens complémentaires Pneumothorax"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Imagerie */}
        {(exams.chestXrayImages ||
          exams.pleuralUltrasoundImages ||
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
                  {exams.chestXrayReport && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Compte-rendu: {exams.chestXrayReport}
                    </p>
                  )}
                </div>
              )}

            {/* Échographie pleurale */}
            {exams.pleuralUltrasoundImages &&
              Array.isArray(exams.pleuralUltrasoundImages) &&
              exams.pleuralUltrasoundImages.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    images={exams.pleuralUltrasoundImages}
                    title="Échographie pleurale"
                    imageAlt="Échographie pleurale"
                  />
                  {exams.pleuralUltrasoundReport && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Compte-rendu: {exams.pleuralUltrasoundReport}
                    </p>
                  )}
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
                  {exams.imagingResults && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Résultats: {exams.imagingResults}
                    </p>
                  )}
                </div>
              )}
          </div>
        )}

        {/* Bilan biologique */}
        {(exams.bloodGas ||
          exams.nfs ||
          exams.crp ||
          exams.ionogram ||
          exams.hemostasis ||
          exams.bloodGroup) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bilan biologique
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {exams.bloodGas && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Gaz du sang
                </span>
              )}

              {exams.nfs && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  NFS
                </span>
              )}

              {exams.crp && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  CRP
                </span>
              )}

              {exams.ionogram && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Ionogramme
                </span>
              )}

              {exams.hemostasis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Hémostase
                </span>
              )}

              {exams.bloodGroup && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Groupe sanguin
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
  const diagnosis = patient?.pneumothoraxDiagnosis;
  if (!diagnosis) return null;

  const hasAnyDiagnosticData =
    diagnosis.spontaneousPrimary ||
    diagnosis.spontaneousSecondary ||
    diagnosis.traumatic ||
    diagnosis.iatrogenic ||
    diagnosis.wellTolerated ||
    diagnosis.poorlyTolerated ||
    diagnosis.compressiveTension ||
    diagnosis.small ||
    diagnosis.medium ||
    diagnosis.large ||
    diagnosis.diagnosticConclusion;

  if (!hasAnyDiagnosticData) return null;

  return (
    <PathologySection title="Diagnostic Pneumothorax" patient={patient}>
      <div className="space-y-4">
        {/* Type de pneumothorax */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Type de pneumothorax
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {diagnosis.spontaneousPrimary && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Spontané primaire
              </span>
            )}

            {diagnosis.spontaneousSecondary && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Spontané secondaire
              </span>
            )}

            {diagnosis.traumatic && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Traumatique
              </span>
            )}

            {diagnosis.iatrogenic && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Iatrogène
              </span>
            )}
          </div>

          {diagnosis.spontaneousSecondaryTerrain && (
            <p className="mt-2 text-sm text-gray-900 dark:text-white">
              Terrain du spontané secondaire:{" "}
              {diagnosis.spontaneousSecondaryTerrain}
            </p>
          )}
        </div>

        {/* Tolérance clinique */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Tolérance clinique
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {diagnosis.wellTolerated && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Bien toléré
              </span>
            )}

            {diagnosis.poorlyTolerated && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Mal toléré
              </span>
            )}

            {diagnosis.compressiveTension && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Compressif (tension)
              </span>
            )}
          </div>
        </div>

        {/* Importance */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Importance
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {diagnosis.small && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Petit
              </span>
            )}

            {diagnosis.medium && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Moyen
              </span>
            )}

            {diagnosis.large && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Large
              </span>
            )}
          </div>
        </div>

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

// Sous-composant pour la section prise en charge
function ManagementSection({ patient }: { patient: ExtendedPatient }) {
  const management = patient?.pneumothoraxManagement;
  if (!management) return null;

  const hasAnyManagementData =
    management.oxygenTherapy ||
    management.analgesia ||
    management.peripheralIv ||
    management.monitoring ||
    management.bloodGasIndication ||
    management.simpleMonitoring ||
    management.needleAspiration ||
    management.pleuralDrainage ||
    management.compressiveDecompression ||
    management.persistentAirLeak ||
    management.highRiskTerrain;

  if (!hasAnyManagementData) return null;

  return (
    <PathologySection title="Prise en charge Pneumothorax" patient={patient}>
      <div className="space-y-6">
        {/* Traitement initial */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Traitement initial
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {management.oxygenTherapy && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Oxygénothérapie
              </span>
            )}

            {management.analgesia && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Analgésie
              </span>
            )}

            {management.peripheralIv && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Voie veineuse périphérique
              </span>
            )}

            {management.monitoring && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Monitoring
              </span>
            )}
          </div>

          {/* Détails oxygénothérapie */}
          {management.oxygenTherapy && (
            <div className="mt-4 space-y-2">
              {management.oxygenModality && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Modalité: {management.oxygenModality}
                </p>
              )}
              {management.oxygenFlow && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Débit: {management.oxygenFlow} L/min
                </p>
              )}
            </div>
          )}

          {/* Détails analgésie */}
          {management.analgesia && management.analgesiaDetails && (
            <p className="mt-2 text-sm text-gray-900 dark:text-white">
              • Analgésie: {management.analgesiaDetails}
            </p>
          )}

          {/* Indications gaz du sang */}
          {management.bloodGasIndication && (
            <p className="mt-2 text-sm text-gray-900 dark:text-white">
              • Indication gaz du sang: {management.bloodGasIndication}
            </p>
          )}

          {/* Avis spécialisés */}
          {management.specializedAdvice &&
            management.specializedAdvice.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-900 dark:text-white">
                  • Avis spécialisés:
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {management.specializedAdvice.map((advice, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                    >
                      {advice}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Traitement spécifique */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Traitement spécifique
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {management.simpleMonitoring && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Simple surveillance
              </span>
            )}

            {management.needleAspiration && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Ponction-à l&apos;aiguille
              </span>
            )}

            {management.pleuralDrainage && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Drainage pleural
              </span>
            )}

            {management.compressiveDecompression && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Décompression compressive
              </span>
            )}
          </div>

          {/* Détails drainage */}
          {management.pleuralDrainage && (
            <div className="mt-4 space-y-2">
              {management.drainageSide && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Côté: {management.drainageSide}
                </p>
              )}
              {management.drainageType && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Type: {management.drainageType}
                </p>
              )}
              {management.drainageSystem && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Système: {management.drainageSystem}
                </p>
              )}
              {management.drainageAspiration && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Aspiration: {management.drainageAspiration}
                </p>
              )}
              {management.drainageAspirationPressure && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Pression: {management.drainageAspirationPressure} cmH2O
                </p>
              )}
              {management.localAnesthesia && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Anesthésie locale: Oui
                </p>
              )}
              {management.postProcedureXray && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Radio post-procédure: Oui
                </p>
              )}
            </div>
          )}
        </div>

        {/* Particularités */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Particularités
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {management.persistentAirLeak && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                Fuite d&apos;air persistante
              </span>
            )}

            {management.highRiskTerrain && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Terrain à haut risque
              </span>
            )}
          </div>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section surveillance
function MonitoringSection({ patient }: { patient: ExtendedPatient }) {
  const monitoring = patient?.pneumothoraxMonitoring;
  if (!monitoring) return null;

  const hasAnyMonitoringData =
    monitoring.regularClinicalMonitoring ||
    monitoring.radiologicalControl ||
    monitoring.drainMonitoring ||
    monitoring.complications ||
    monitoring.evolutionRemarks;

  if (!hasAnyMonitoringData) return null;

  return (
    <PathologySection title="Surveillance Pneumothorax" patient={patient}>
      <div className="space-y-4">
        {/* Monitoring clinique */}
        {monitoring.regularClinicalMonitoring && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Monitoring clinique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.monitoringDetails ||
                "Surveillance clinique régulière"}
            </p>
          </div>
        )}

        {/* Contrôle radiologique */}
        {monitoring.radiologicalControl && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contrôle radiologique
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {monitoring.radiologicalControl}
            </p>
          </div>
        )}

        {/* Surveillance du drain */}
        {monitoring.drainMonitoring && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Surveillance du drain
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              Monitoring du drain en place
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
  const discharge = patient?.pneumothoraxTreatmentDischarge;
  if (!discharge) return null;

  const hasAnyDischargeData =
    discharge.analgesic ||
    discharge.otherTreatments ||
    discharge.smokingCessation ||
    discharge.hemodynamicStability ||
    discharge.satisfactorySpO2 ||
    discharge.clinicalImprovement ||
    discharge.satisfactoryImaging ||
    discharge.drainRemoved ||
    discharge.emergencyReturn ||
    discharge.avoidHeavyEfforts ||
    discharge.stopSmoking ||
    discharge.avoidFlying ||
    discharge.divingContraindicated ||
    discharge.pneumologyConsultation ||
    discharge.thoracicSurgeryConsultation ||
    discharge.controlXray ||
    discharge.otherInstructions;

  if (!hasAnyDischargeData) return null;

  return (
    <PathologySection
      title="Consignes de sortie Pneumothorax"
      patient={patient}
    >
      <div className="space-y-6">
        {/* Critères de sortie */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Critères de sortie
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {discharge.hemodynamicStability && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Stabilité hémodynamique
              </span>
            )}

            {discharge.satisfactorySpO2 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                SpO2 satisfaisante
              </span>
            )}

            {discharge.clinicalImprovement && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Amélioration clinique
              </span>
            )}

            {discharge.satisfactoryImaging && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Imagerie satisfaisante
              </span>
            )}

            {discharge.drainRemoved && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Drain retiré
              </span>
            )}
          </div>
        </div>

        {/* Traitement de sortie */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Traitement de sortie
          </p>
          <div className="mt-2 space-y-2">
            {discharge.analgesic && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Analgésique: {discharge.analgesicDetails || "Prescrit"}
              </p>
            )}

            {discharge.otherTreatments && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Autres traitements: {discharge.otherTreatmentsDetails}
              </p>
            )}
          </div>
        </div>

        {/* Recommandations */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Recommandations
          </p>
          <div className="mt-2 space-y-2">
            {discharge.emergencyReturn && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Retour aux urgences en cas de symptômes
              </p>
            )}

            {discharge.avoidHeavyEfforts && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Éviter les efforts importants pendant{" "}
                {discharge.avoidEffortsDays || "X"} jours
              </p>
            )}

            {discharge.stopSmoking && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Arrêt du tabac fortement recommandé
              </p>
            )}

            {discharge.avoidFlying && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Éviter les voyages en avion
              </p>
            )}

            {discharge.divingContraindicated && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Plongée sous-marine contre-indiquée
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
            {discharge.pneumologyConsultation && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Consultation en pneumologie
              </p>
            )}

            {discharge.thoracicSurgeryConsultation && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Consultation en chirurgie thoracique
              </p>
            )}

            {discharge.controlXray && (
              <p className="text-sm text-gray-900 dark:text-white">
                • Contrôle radiographique prévu le{" "}
                {discharge.controlXrayDate || "date à définir"}
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
