"use client";

import { ExtendedPatient, PathologyConfig, PathologySectionProps } from "../types";
import { ImageGallery } from "../shared/ImageGallery";
import { PathologySection } from "./PathologySection";

export function BPCOPathology({
  patient,
  pathologyId = "bpco",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Examen clinique spécifique BPCO */}
      <ClinicalExamSection patient={patient} />

      {/* Section 2: Examens complémentaires BPCO - Images et vidéos */}
      <ImagingSection patient={patient} />

      {/* Section 3: Examens complémentaires BPCO - EFR/Spirométrie */}
      <EFRSection patient={patient} />

      {/* Section 4: Examens complémentaires BPCO - Pléthysmographie */}
      <PlethysmographySection patient={patient} />

      {/* Section 5: Examens complémentaires BPCO - Gaz du sang */}
      <BloodGasSection patient={patient} />

      {/* Section 6: Diagnostic BPCO */}
      <DiagnosticSection patient={patient} />

      {/* Section 7: Traitement BPCO */}
      <TreatmentSection patient={patient} />

      {/* Section 8: Suivi BPCO */}
      <FollowUpSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
BPCOPathology.config = {
  id: "bpco",
  name: "BPCO",
  icon: "/icons/bpco.svg",
  description: "Bronchopneumopathie chronique obstructive",
  component: BPCOPathology,
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
  const clinicalExam = patient?.bpcoClinicalExam;
  if (!clinicalExam) return null;

  return (
    <PathologySection title="Examen clinique BPCO" patient={patient}>
      <div className="space-y-4">
        {/* Score de performance */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Score de performance
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {clinicalExam.performanceScore || "Non spécifié"}
          </p>
        </div>

        {/* État de conscience */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            État de conscience
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {clinicalExam.generalState?.goodConsciousness && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Bonne conscience
              </span>
            )}
            {clinicalExam.generalState?.confusion && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                Confusion
              </span>
            )}
          </div>
        </div>

        {/* Signes généraux */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Signes généraux
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {clinicalExam.generalState?.asthenia && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Asthénie
              </span>
            )}
            {clinicalExam.generalState?.generalStateAlteration && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                Altération de l&apos;état général
              </span>
            )}
          </div>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section imagerie
function ImagingSection({ patient }: { patient: ExtendedPatient }) {
  const chestXRayImages =
    patient?.bpcoDiagnosticTests?.chestXRay?.imageFiles || [];
  const chestCTVideos = patient?.bpcoDiagnosticTests?.chestCT?.videoFiles || [];

  const hasImages = chestXRayImages.length > 0 || chestCTVideos.length > 0;

  if (!hasImages) return null;

  return (
    <PathologySection
      title="Examens complémentaires BPCO - Imagerie"
      patient={patient}
    >
      {/* Radiographie thoracique */}
      {chestXRayImages.length > 0 && (
        <ImageGallery
          images={chestXRayImages}
          title="Radiographie thoracique"
          imageAlt="Radiographie thoracique BPCO"
        />
      )}

      {/* Scanner thoracique */}
      {chestCTVideos.length > 0 && (
        <div className="mt-6">
          <ImageGallery
            images={[]}
            videos={chestCTVideos}
            title="Scanner thoracique"
            imageAlt="Scanner thoracique BPCO"
          />
          {patient?.bpcoDiagnosticTests?.chestCT?.video && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Notes: {patient.bpcoDiagnosticTests.chestCT.video}
            </p>
          )}
        </div>
      )}
    </PathologySection>
  );
}

// Sous-composant pour la section EFR/Spirométrie
function EFRSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.bpcoComplementaryExams;
  if (!exams || (!exams.vems && !exams.vemsCvf && !exams.goldStage)) {
    return null;
  }

  return (
    <PathologySection
      title="Examens complémentaires BPCO - EFR/Spirométrie"
      patient={patient}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.vems && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              VEMS
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.vems} L
            </p>
          </div>
        )}

        {exams.vemsCvf && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              VEMS/CV
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.vemsCvf} %
            </p>
          </div>
        )}

        {exams.goldStage && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Stade GOLD
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.goldStage}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section Pléthysmographie
function PlethysmographySection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.bpcoComplementaryExams;
  if (!exams || (!exams.cpt && !exams.vr && !exams.crf)) {
    return null;
  }

  return (
    <PathologySection
      title="Examens complémentaires BPCO - Pléthysmographie"
      patient={patient}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.cpt && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              CPT
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{exams.cpt}</p>
          </div>
        )}

        {exams.vr && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              VR
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{exams.vr}</p>
          </div>
        )}

        {exams.crf && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              CRF
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{exams.crf}</p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section Gaz du sang
function BloodGasSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.bpcoComplementaryExams;
  if (!exams || (!exams.ph && !exams.pao2 && !exams.paco2)) {
    return null;
  }

  return (
    <PathologySection
      title="Examens complémentaires BPCO - Gaz du sang"
      patient={patient}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.ph && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              pH
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{exams.ph}</p>
          </div>
        )}

        {exams.pao2 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              PaO2
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.pao2} mmHg
            </p>
          </div>
        )}

        {exams.paco2 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              PaCO2
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.paco2} mmHg
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section diagnostic
function DiagnosticSection({ patient }: { patient: ExtendedPatient }) {
  const diagnosis = patient?.bpcoDiagnosis;
  if (!diagnosis) return null;

  return (
    <PathologySection title="Diagnostic BPCO" patient={patient}>
      <div className="space-y-4">
        {/* Stade BPCO */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Stade BPCO
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {diagnosis.stage || "Non spécifié"}
          </p>
        </div>

        {/* Complications */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Complications
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {diagnosis.acuteExacerbation && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Exacerbation aiguë
              </span>
            )}
            {diagnosis.bronchialSuperinfection && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Surinfection bronchique
              </span>
            )}
            {diagnosis.chronicRespiratoryFailure && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Insuffisance respiratoire chronique
              </span>
            )}
          </div>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = patient?.bpcoTreatment;
  if (!treatment) return null;

  return (
    <PathologySection title="Traitement BPCO" patient={patient}>
      <div className="space-y-4">
        {/* Traitement de fond */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Traitement de fond
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {treatment.maintenance || "Non spécifié"}
          </p>
        </div>

        {/* Traitements prescrits */}
        {Array.isArray(treatment.prescribedTreatments) &&
          treatment.prescribedTreatments.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Traitements prescrits
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {treatment.prescribedTreatments.includes("antibiotherapy") && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Antibiotothérapie
                  </span>
                )}
                {treatment.prescribedTreatments.includes(
                  "corticosteroidsOral"
                ) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Corticoïdes oraux
                  </span>
                )}
                {treatment.prescribedTreatments.includes(
                  "respiratoryPhysiotherapy"
                ) && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Kinésithérapie respiratoire
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Autres traitements */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Autres traitements
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {treatment.longTermOxygen && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Oxygénothérapie de longue durée
              </span>
            )}
            {treatment.therapeuticEducation && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Éducation thérapeutique
              </span>
            )}
            {treatment.smokingCessation && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Sevrage tabagique
              </span>
            )}
          </div>
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section suivi
function FollowUpSection({ patient }: { patient: ExtendedPatient }) {
  const followUp = patient?.bpcoFollowUp;
  if (!followUp) return null;

  return (
    <PathologySection title="Suivi BPCO" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Dernière consultation
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {followUp.lastConsultation || "Non spécifié"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Prochaine évaluation
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {followUp.nextEvaluation || "Non spécifié"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Suivi en pneumologie
          </p>
          <div className="mt-2">
            {followUp.pneumologyFollowUp ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Oui
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                Non
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Vaccinations à jour
          </p>
          <div className="mt-2">
            {followUp.vaccinationsUpToDate ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                À jour
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                À mettre à jour
              </span>
            )}
          </div>
        </div>
      </div>
    </PathologySection>
  );
}
