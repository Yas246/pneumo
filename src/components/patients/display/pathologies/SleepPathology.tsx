"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function SleepPathology({
  patient,
  pathologyId = "sleep",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Examen Clinique */}
      <ClinicalExamSection patient={patient} />

      {/* Section 2: Examens complémentaires - Polygraphie */}
      <PolygraphySection patient={patient} />

      {/* Section 3: Examens complémentaires - Gazométrie */}
      <GazometrySection patient={patient} />

      {/* Section 4: Examens complémentaires - EFR */}
      <EFRSection patient={patient} />

      {/* Section 5: Examens complémentaires - Imagerie */}
      <ImagingSection patient={patient} />

      {/* Section 6: Diagnostic */}
      <DiagnosticSection patient={patient} />

      {/* Section 7: Traitement */}
      <TreatmentSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
SleepPathology.config = {
  id: "sleep",
  name: "Troubles respiratoires du sommeil",
  icon: "/icons/allergy.svg",
  description: "SAOS, SACS, SOH et autres troubles du sommeil",
  component: SleepPathology,
  sections: {
    clinicalExam: true,
    complementaryExams: true,
    diagnosis: true,
    treatment: true,
  },
} as PathologyConfig;

// Sous-composant pour la section examen clinique
function ClinicalExamSection({ patient }: { patient: ExtendedPatient }) {
  const clinicalExam = patient?.clinicalExam;
  if (!clinicalExam) return null;

  const hasAnyClinicalData =
    clinicalExam?.weight ||
    clinicalExam?.height ||
    clinicalExam?.bmi ||
    clinicalExam?.neckCircumference ||
    clinicalExam?.abdominalPerimeter ||
    clinicalExam?.bloodPressure ||
    clinicalExam?.heartRate ||
    clinicalExam?.saturation ||
    clinicalExam?.pulmonaryAuscultation;

  if (!hasAnyClinicalData) return null;

  return (
    <PathologySection title="Examen Clinique" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clinicalExam.weight && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Poids
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.weight} kg
            </p>
          </div>
        )}

        {clinicalExam.height && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Taille
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.height} cm
            </p>
          </div>
        )}

        {clinicalExam.bmi && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              IMC
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.bmi}
            </p>
          </div>
        )}

        {clinicalExam.neckCircumference && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tour de cou
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.neckCircumference} cm
            </p>
          </div>
        )}

        {clinicalExam.abdominalPerimeter && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Périmètre abdominal
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.abdominalPerimeter} cm
            </p>
          </div>
        )}

        {clinicalExam.bloodPressure && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tension artérielle
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.bloodPressure}
            </p>
          </div>
        )}

        {clinicalExam.heartRate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fréquence cardiaque
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.heartRate} bpm
            </p>
          </div>
        )}

        {clinicalExam.saturation && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Saturation
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.saturation}%
            </p>
          </div>
        )}

        {clinicalExam.pulmonaryAuscultation && (
          <div className="md:col-span-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Auscultation pulmonaire
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {clinicalExam.pulmonaryAuscultation}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section polygraphie
function PolygraphySection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.sleepComplementaryExams;
  if (
    !exams ||
    (!exams.polygraphyDate && exams.iah === 0 && exams.iahCentral === 0)
  ) {
    return null;
  }

  return (
    <PathologySection title="Polygraphie" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.polygraphyDate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.polygraphyDate}
            </p>
          </div>
        )}

        {exams.iah && exams.iah > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              IAH
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{exams.iah}</p>
          </div>
        )}

        {exams.iahCentral && exams.iahCentral > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              IAH Central
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.iahCentral}
            </p>
          </div>
        )}

        {exams.oxygenDesaturation && exams.oxygenDesaturation > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Désaturation en O2
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.oxygenDesaturation}%
            </p>
          </div>
        )}

        {exams.ct90 && exams.ct90 > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              CT90
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.ct90}%
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section gazométrie
function GazometrySection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.sleepComplementaryExams;
  if (!exams || (!exams.gazometryDate && exams.ph === 0 && exams.pao2 === 0)) {
    return null;
  }

  return (
    <PathologySection title="Gazométrie" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.gazometryDate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.gazometryDate}
            </p>
          </div>
        )}

        {exams.ph && exams.ph > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              pH
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{exams.ph}</p>
          </div>
        )}

        {exams.pao2 && exams.pao2 > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              PaO2
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.pao2} mmHg
            </p>
          </div>
        )}

        {exams.paco2 && exams.paco2 > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              PaCO2
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.paco2} mmHg
            </p>
          </div>
        )}

        {exams.hco3 && exams.hco3 > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              HCO3-
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.hco3} mmol/L
            </p>
          </div>
        )}

        {exams.sao2 && exams.sao2 > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              SaO2
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.sao2}%
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section EFR
function EFRSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.sleepComplementaryExams;
  if (!exams || (!exams.efrDate && exams.cvf === 0 && exams.vems === 0)) {
    return null;
  }

  return (
    <PathologySection title="EFR" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.efrDate && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.efrDate}
            </p>
          </div>
        )}

        {exams.cvf && exams.cvf > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              CVF
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.cvf}%
            </p>
          </div>
        )}

        {exams.vems && exams.vems > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              VEMS
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.vems}%
            </p>
          </div>
        )}

        {exams.dlco && exams.dlco > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              DLCO
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.dlco}%
            </p>
          </div>
        )}

        {exams.cpt && exams.cpt > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              CPT
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {exams.cpt}%
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section imagerie
function ImagingSection({ patient }: { patient: ExtendedPatient }) {
  const exams = patient?.sleepComplementaryExams;
  const hasImages =
    (exams?.chestXray?.imageUrls && exams.chestXray.imageUrls.length > 0) ||
    (exams?.scanner?.imageUrls && exams.scanner.imageUrls.length > 0) ||
    (exams?.scanner?.videoUrls && exams.scanner.videoUrls.length > 0);

  if (!hasImages) return null;

  return (
    <PathologySection title="Imagerie" patient={patient}>
      {/* Radiographie thoracique */}
      {exams?.chestXray?.imageUrls && exams.chestXray.imageUrls.length > 0 && (
        <ImageGallery
          images={exams.chestXray.imageUrls}
          title="Radiographie thoracique"
          imageAlt="Radiographie thoracique"
        />
      )}

      {/* Scanner/TDM */}
      {((exams?.scanner?.imageUrls && exams.scanner.imageUrls.length > 0) ||
        (exams?.scanner?.videoUrls && exams.scanner.videoUrls.length > 0)) && (
        <div className="mt-6">
          <ImageGallery
            images={exams.scanner.imageUrls || []}
            videos={exams.scanner.videoUrls || []}
            title="Scanner/TDM"
            imageAlt="Scanner TDM"
          />
          {exams.scanner.notes && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Notes: {exams.scanner.notes}
            </p>
          )}
        </div>
      )}
    </PathologySection>
  );
}

// Sous-composant pour la section diagnostic
function DiagnosticSection({ patient }: { patient: ExtendedPatient }) {
  const diagnosis = patient?.sleepDiagnosis;
  if (!diagnosis) return null;

  const hasAnyDiagnosis =
    diagnosis.saos ||
    diagnosis.sacs ||
    diagnosis.soh ||
    diagnosis.nocturnalHypoventilation ||
    diagnosis.simpleSnoring;

  if (!hasAnyDiagnosis) return null;

  return (
    <PathologySection title="Diagnostic" patient={patient}>
      <div className="flex flex-wrap gap-2">
        {diagnosis.saos && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            SAOS
          </span>
        )}

        {diagnosis.sacs && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            SACS
          </span>
        )}

        {diagnosis.soh && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            SOH
          </span>
        )}

        {diagnosis.nocturnalHypoventilation && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Hypoventilation nocturne
          </span>
        )}

        {diagnosis.simpleSnoring && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Ronflement simple
          </span>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = patient?.sleepTreatment;
  if (!treatment) return null;

  const hasAnyTreatment =
    treatment.hygieneDietetic?.weightLoss ||
    treatment.hygieneDietetic?.alcoholAndSedativesStop ||
    treatment.hygieneDietetic?.sleepHygieneImprovement ||
    treatment.medicalTreatments?.ppc ||
    treatment.medicalTreatments?.oam ||
    treatment.medicalTreatments?.medications;

  if (!hasAnyTreatment) return null;

  return (
    <PathologySection title="Traitement" patient={patient}>
      <div className="space-y-4">
        {/* Mesures hygiéno-diététiques */}
        {(treatment.hygieneDietetic?.weightLoss ||
          treatment.hygieneDietetic?.alcoholAndSedativesStop ||
          treatment.hygieneDietetic?.sleepHygieneImprovement) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Mesures hygiéno-diététiques
            </p>
            <div className="mt-2 space-y-2">
              {treatment.hygieneDietetic?.weightLoss && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Perte de poids
                </p>
              )}
              {treatment.hygieneDietetic?.alcoholAndSedativesStop && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Arrêt alcool et sédatifs
                </p>
              )}
              {treatment.hygieneDietetic?.sleepHygieneImprovement && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Amélioration de l&apos;hygiène du sommeil
                </p>
              )}
            </div>
          </div>
        )}

        {/* Appareillage */}
        {(treatment.medicalTreatments?.ppc ||
          treatment.medicalTreatments?.oam) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Appareillage
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {treatment.medicalTreatments?.ppc && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                  PPC
                </span>
              )}
              {treatment.medicalTreatments?.oam && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                  OAM
                </span>
              )}
            </div>
          </div>
        )}

        {/* Traitement médical */}
        {treatment.medicalTreatments?.medications && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Traitement médical
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {treatment.medicalTreatments.medications}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
