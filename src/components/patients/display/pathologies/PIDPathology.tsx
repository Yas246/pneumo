"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function PIDPathology({
  patient,
  pathologyId = "pid",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Motif d'admission */}
      <AdmissionReasonSection patient={patient} />

      {/* Section 2: Antécédents toxiques */}
      <ToxicHistorySection patient={patient} />

      {/* Section 3: Antécédents médicaux */}
      <MedicalHistorySection patient={patient} />

      {/* Section 4: Antécédents gynéco-obstétricaux */}
      <GynecoObstetricHistorySection patient={patient} />

      {/* Section 5: Mode de vie */}
      <LifestyleSection patient={patient} />

      {/* Section 6: Antécédents familiaux */}
      <FamilyHistorySection patient={patient} />

      {/* Section 7: Histoire de la maladie */}
      <DiseaseHistorySection patient={patient} />

      {/* Section 8: Signes respiratoires */}
      <RespiratorySymptomsSection patient={patient} />

      {/* Section 9: Signes extra-respiratoires */}
      <ExtraRespiratorySymptomsSection patient={patient} />

      {/* Section 10: Signes généraux */}
      <GeneralSignsSection patient={patient} />

      {/* Section 11: Examen clinique */}
      <ClinicalExamSection patient={patient} />

      {/* Section 12: Examens complémentaires */}
      <ComplementaryExamsSection patient={patient} />

      {/* Section 13: Diagnostic final */}
      <FinalDiagnosisSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
PIDPathology.config = {
  id: "pid",
  name: "PID",
  icon: "/icons/pid.svg",
  description: "Pneumopathie interstitielle diffuse",
  component: PIDPathology,
  sections: {
    admissionReason: true,
    toxicHistory: true,
    medicalHistory: true,
    gynecoObstetricHistory: true,
    lifestyle: true,
    familyHistory: true,
    diseaseHistory: true,
    respiratorySymptoms: true,
    extraRespiratorySymptoms: true,
    generalSigns: true,
    clinicalExam: true,
    complementaryExams: true,
    finalDiagnosis: true,
  },
} as PathologyConfig;

// Helper pour accéder aux champs du patient
function getPatientField<T = unknown>(
  patient: ExtendedPatient | undefined,
  fieldName: string
): T | undefined {
  if (!patient) return undefined;
  return patient[fieldName] as T | undefined;
}

// Section: Motif d'admission
function AdmissionReasonSection({ patient }: { patient: ExtendedPatient }) {
  const admissionReason = getPatientField<string>(
    patient,
    "pidAdmissionReason"
  );
  if (!admissionReason) return null;

  return (
    <PathologySection title="Motif d'admission" patient={patient}>
      <p className="text-sm text-gray-900 dark:text-white">{admissionReason}</p>
    </PathologySection>
  );
}

// Section: Antécédents toxiques
function ToxicHistorySection({ patient }: { patient: ExtendedPatient }) {
  const toxicHistory = getPatientField<{
    smoking?: {
      present?: boolean;
      type?: {
        active?: boolean;
        passive?: boolean;
      };
      packYears?: number;
      startAge?: number;
      stopped?: boolean;
    };
    alcoholism?: boolean;
    drugAddiction?: {
      present?: boolean;
      details?: string;
    };
    longTermMedication?: {
      present?: boolean;
      products?: string;
      duration?: string;
    };
    medicinalPlants?: {
      present?: boolean;
      details?: string;
    };
  }>(patient, "pidToxicHistory");

  if (!toxicHistory) return null;

  const hasAnyData =
    toxicHistory?.smoking?.present ||
    toxicHistory?.alcoholism ||
    toxicHistory?.drugAddiction?.present ||
    toxicHistory?.longTermMedication?.present ||
    toxicHistory?.medicinalPlants?.present;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Antécédents toxiques" patient={patient}>
      <div className="space-y-4">
        {/* Tabagisme */}
        {toxicHistory?.smoking?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tabagisme
            </p>
            <div className="mt-2 space-y-2">
              {toxicHistory.smoking.type?.active && (
                <p className="text-sm text-gray-900 dark:text-white">• Actif</p>
              )}
              {toxicHistory.smoking.type?.passive && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Passif
                </p>
              )}
              {toxicHistory.smoking.packYears && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • {toxicHistory.smoking.packYears} paquets-année
                </p>
              )}
              {toxicHistory.smoking.startAge && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Début à {toxicHistory.smoking.startAge} ans
                </p>
              )}
              {toxicHistory.smoking.stopped && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Arrêté
                </p>
              )}
            </div>
          </div>
        )}

        {/* Alcoolisme */}
        {toxicHistory?.alcoholism && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Alcoolisme
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Toxicomanie */}
        {toxicHistory?.drugAddiction?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Toxicomanie
            </p>
            {toxicHistory.drugAddiction.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {toxicHistory.drugAddiction.details}
              </p>
            )}
          </div>
        )}

        {/* Médicaments au long cours */}
        {toxicHistory?.longTermMedication?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Médicaments au long cours
            </p>
            <div className="mt-1 space-y-1">
              {toxicHistory.longTermMedication.products && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Produits: {toxicHistory.longTermMedication.products}
                </p>
              )}
              {toxicHistory.longTermMedication.duration && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Durée: {toxicHistory.longTermMedication.duration}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Plantes médicinales */}
        {toxicHistory?.medicinalPlants?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Plantes médicinales
            </p>
            {toxicHistory.medicinalPlants.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {toxicHistory.medicinalPlants.details}
              </p>
            )}
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Antécédents médicaux
function MedicalHistorySection({ patient }: { patient: ExtendedPatient }) {
  const medicalHistory = getPatientField<{
    tuberculosis?: {
      present?: boolean;
      form?: string;
      date?: string;
      treatment?: string;
      evolution?: string;
    };
    asthma?: {
      present?: boolean;
      since?: string;
    };
    hypersensitivity?: boolean;
    chronicBronchitis?: {
      present?: boolean;
      details?: string;
      duration?: string;
    };
    otherRespiratoryDiseases?: string;
    diabetes?: {
      present?: boolean;
      details?: string;
    };
    hypertension?: {
      present?: boolean;
      details?: string;
    };
    gerd?: {
      present?: boolean;
      details?: string;
    };
    heartDisease?: {
      present?: boolean;
      details?: string;
    };
    systemicDisease?: {
      present?: boolean;
      details?: string;
    };
    neoplasia?: {
      present?: boolean;
      details?: string;
    };
    gastroesophagealReflux?: boolean;
    otherAntecedents?: string;
  }>(patient, "pidMedicalHistory");

  if (!medicalHistory) return null;

  const hasAnyData =
    medicalHistory?.tuberculosis?.present ||
    medicalHistory?.asthma?.present ||
    medicalHistory?.hypersensitivity ||
    medicalHistory?.chronicBronchitis?.present ||
    medicalHistory?.otherRespiratoryDiseases ||
    medicalHistory?.diabetes?.present ||
    medicalHistory?.hypertension?.present ||
    medicalHistory?.gerd?.present ||
    medicalHistory?.heartDisease?.present ||
    medicalHistory?.systemicDisease?.present ||
    medicalHistory?.neoplasia?.present ||
    medicalHistory?.gastroesophagealReflux ||
    medicalHistory?.otherAntecedents;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Antécédents médicaux" patient={patient}>
      <div className="space-y-4">
        {/* Tuberculose */}
        {medicalHistory?.tuberculosis?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tuberculose
            </p>
            <div className="mt-1 space-y-1">
              {medicalHistory.tuberculosis.form && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Forme: {medicalHistory.tuberculosis.form}
                </p>
              )}
              {medicalHistory.tuberculosis.date && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Date: {medicalHistory.tuberculosis.date}
                </p>
              )}
              {medicalHistory.tuberculosis.treatment && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Traitement: {medicalHistory.tuberculosis.treatment}
                </p>
              )}
              {medicalHistory.tuberculosis.evolution && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Évolution: {medicalHistory.tuberculosis.evolution}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Asthme */}
        {medicalHistory?.asthma?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Asthme
            </p>
            {medicalHistory.asthma.since && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Depuis: {medicalHistory.asthma.since}
              </p>
            )}
          </div>
        )}

        {/* Hypersensibilité */}
        {medicalHistory?.hypersensitivity && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hypersensibilité
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Bronchite chronique */}
        {medicalHistory?.chronicBronchitis?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bronchite chronique
            </p>
            <div className="mt-1 space-y-1">
              {medicalHistory.chronicBronchitis.details && (
                <p className="text-sm text-gray-900 dark:text-white">
                  {medicalHistory.chronicBronchitis.details}
                </p>
              )}
              {medicalHistory.chronicBronchitis.duration && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Durée: {medicalHistory.chronicBronchitis.duration}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres maladies respiratoires */}
        {medicalHistory?.otherRespiratoryDiseases && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres maladies respiratoires
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {medicalHistory.otherRespiratoryDiseases}
            </p>
          </div>
        )}

        {/* Diabète */}
        {medicalHistory?.diabetes?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Diabète
            </p>
            {medicalHistory.diabetes.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {medicalHistory.diabetes.details}
              </p>
            )}
          </div>
        )}

        {/* Hypertension artérielle */}
        {medicalHistory?.hypertension?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hypertension artérielle
            </p>
            {medicalHistory.hypertension.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {medicalHistory.hypertension.details}
              </p>
            )}
          </div>
        )}

        {/* RGO */}
        {medicalHistory?.gerd?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              RGO
            </p>
            {medicalHistory.gerd.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {medicalHistory.gerd.details}
              </p>
            )}
          </div>
        )}

        {/* Maladie cardiaque */}
        {medicalHistory?.heartDisease?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Maladie cardiaque
            </p>
            {medicalHistory.heartDisease.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {medicalHistory.heartDisease.details}
              </p>
            )}
          </div>
        )}

        {/* Maladie systémique */}
        {medicalHistory?.systemicDisease?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Maladie systémique
            </p>
            {medicalHistory.systemicDisease.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {medicalHistory.systemicDisease.details}
              </p>
            )}
          </div>
        )}

        {/* Néoplasie */}
        {medicalHistory?.neoplasia?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Néoplasie
            </p>
            {medicalHistory.neoplasia.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {medicalHistory.neoplasia.details}
              </p>
            )}
          </div>
        )}

        {/* RGO gastro-œsophagien */}
        {medicalHistory?.gastroesophagealReflux && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              RGO gastro-œsophagien
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Autres antécédents */}
        {medicalHistory?.otherAntecedents && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres antécédents
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {medicalHistory.otherAntecedents}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Antécédents gynéco-obstétricaux
function GynecoObstetricHistorySection({
  patient,
}: {
  patient: ExtendedPatient;
}) {
  const gynecoHistory = getPatientField<{
    menarche?: string;
    cycle?: string;
    gestity?: number;
    parity?: number;
    contraceptives?: string;
  }>(patient, "pidGynecoObstetricHistory");

  if (!gynecoHistory) return null;

  const hasAnyData =
    gynecoHistory?.menarche ||
    gynecoHistory?.cycle ||
    gynecoHistory?.gestity ||
    gynecoHistory?.parity ||
    gynecoHistory?.contraceptives;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Antécédents gynéco-obstétricaux" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gynecoHistory.menarche && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ménarche
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {gynecoHistory.menarche}
            </p>
          </div>
        )}
        {gynecoHistory.cycle && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cycle
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {gynecoHistory.cycle}
            </p>
          </div>
        )}
        {gynecoHistory.gestity && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Gestité
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {gynecoHistory.gestity}
            </p>
          </div>
        )}
        {gynecoHistory.parity && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Parité
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {gynecoHistory.parity}
            </p>
          </div>
        )}
        {gynecoHistory.contraceptives && (
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contraceptifs
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {gynecoHistory.contraceptives}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Mode de vie
function LifestyleSection({ patient }: { patient: ExtendedPatient }) {
  const lifestyle = getPatientField<{
    professionalExposure?: {
      present?: boolean;
      details?: string;
    };
    avianContact?: {
      present?: boolean;
      description?: string;
    };
    moltyHayContact?: boolean;
    tropicalTravel?: {
      present?: boolean;
      location?: string;
    };
    otherExposures?: string;
  }>(patient, "pidLifestyle");

  if (!lifestyle) return null;

  const hasAnyData =
    lifestyle?.professionalExposure?.present ||
    lifestyle?.avianContact?.present ||
    lifestyle?.moltyHayContact ||
    lifestyle?.tropicalTravel?.present ||
    lifestyle?.otherExposures;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Mode de vie" patient={patient}>
      <div className="space-y-4">
        {/* Exposition professionnelle */}
        {lifestyle?.professionalExposure?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Exposition professionnelle
            </p>
            {lifestyle.professionalExposure.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {lifestyle.professionalExposure.details}
              </p>
            )}
          </div>
        )}

        {/* Contact aviaire */}
        {lifestyle?.avianContact?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contact aviaire
            </p>
            {lifestyle.avianContact.description && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {lifestyle.avianContact.description}
              </p>
            )}
          </div>
        )}

        {/* Contact foin moisi */}
        {lifestyle?.moltyHayContact && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Contact foin moisi
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Voyage tropical */}
        {lifestyle?.tropicalTravel?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Voyage tropical
            </p>
            {lifestyle.tropicalTravel.location && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {lifestyle.tropicalTravel.location}
              </p>
            )}
          </div>
        )}

        {/* Autres expositions */}
        {lifestyle?.otherExposures && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autres expositions
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {lifestyle.otherExposures}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Antécédents familiaux
function FamilyHistorySection({ patient }: { patient: ExtendedPatient }) {
  const familyHistory = getPatientField<{
    similarCaseInFamily?: boolean;
    autoImmuneDisease?: {
      present?: boolean;
      details?: string;
    };
  }>(patient, "pidFamilyHistory");

  if (!familyHistory) return null;

  const hasAnyData =
    familyHistory?.similarCaseInFamily ||
    familyHistory?.autoImmuneDisease?.present;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Antécédents familiaux" patient={patient}>
      <div className="space-y-4">
        {/* Cas similaire dans la famille */}
        {familyHistory?.similarCaseInFamily && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cas similaire dans la famille
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Maladie auto-immune */}
        {familyHistory?.autoImmuneDisease?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Maladie auto-immune
            </p>
            {familyHistory.autoImmuneDisease.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {familyHistory.autoImmuneDisease.details}
              </p>
            )}
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Histoire de la maladie
function DiseaseHistorySection({ patient }: { patient: ExtendedPatient }) {
  const diseaseHistory = getPatientField<{
    symptomsDuration?: string;
    installationMode?: string;
  }>(patient, "pidDiseaseHistory");

  if (!diseaseHistory) return null;

  const hasAnyData =
    diseaseHistory?.symptomsDuration || diseaseHistory?.installationMode;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Histoire de la maladie" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diseaseHistory.symptomsDuration && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Durée des symptômes
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diseaseHistory.symptomsDuration}
            </p>
          </div>
        )}
        {diseaseHistory.installationMode && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Mode d&apos;installation
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {diseaseHistory.installationMode}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Signes respiratoires
function RespiratorySymptomsSection({ patient }: { patient: ExtendedPatient }) {
  const respiratorySymptoms = getPatientField<{
    cough?: {
      present?: boolean;
      type?: string;
      intensity?: {
        insomnia?: boolean;
        emetic?: boolean;
        painful?: boolean;
        withUrinaryIncontinence?: boolean;
      };
      frequency?: string;
      timing?: string;
      triggers?: {
        noFactor?: boolean;
        tobacco?: boolean;
        postMeal?: boolean;
        duringMeal?: boolean;
        decubitus?: boolean;
        other?: string;
      };
    };
    dyspnea?: {
      present?: boolean;
      sadoulStage?: string;
      type?: string;
      circumstances?: {
        effort?: boolean;
        rest?: boolean;
        decubitus?: boolean;
        other?: string;
      };
    };
    chestPain?: {
      present?: boolean;
      location?: {
        right?: boolean;
        left?: boolean;
        bilateral?: boolean;
      };
      site?: {
        medioThoracic?: boolean;
        basiThoracic?: boolean;
        retrosternal?: boolean;
        diffuse?: boolean;
      };
      type?: {
        oppression?: boolean;
        constrictive?: boolean;
        burning?: boolean;
        other?: string;
      };
      triggers?: string;
    };
    hemoptysis?: {
      present?: boolean;
      abundance?: string;
    };
    expectoration?: {
      present?: boolean;
      frequency?: string;
      timing?: string;
      quality?: string;
      quantity?: string;
      odor?: string;
    };
  }>(patient, "pidRespiratorySymptoms");

  if (!respiratorySymptoms) return null;

  const hasAnyData =
    respiratorySymptoms?.cough?.present ||
    respiratorySymptoms?.dyspnea?.present ||
    respiratorySymptoms?.chestPain?.present ||
    respiratorySymptoms?.hemoptysis?.present ||
    respiratorySymptoms?.expectoration?.present;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Signes respiratoires" patient={patient}>
      <div className="space-y-4">
        {/* Toux */}
        {respiratorySymptoms?.cough?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Toux
            </p>
            <div className="mt-2 space-y-2">
              {respiratorySymptoms.cough.type && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Type: {respiratorySymptoms.cough.type}
                </p>
              )}
              {respiratorySymptoms.cough.frequency && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Fréquence: {respiratorySymptoms.cough.frequency}
                </p>
              )}
              {respiratorySymptoms.cough.timing && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Horaires: {respiratorySymptoms.cough.timing}
                </p>
              )}
              {respiratorySymptoms.cough.triggers && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Facteurs déclenchants:
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {respiratorySymptoms.cough.triggers.noFactor && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                        Sans facteur
                      </span>
                    )}
                    {respiratorySymptoms.cough.triggers.tobacco && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                        Tabac
                      </span>
                    )}
                    {respiratorySymptoms.cough.triggers.postMeal && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        Post-prandial
                      </span>
                    )}
                    {respiratorySymptoms.cough.triggers.duringMeal && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Per-prandial
                      </span>
                    )}
                    {respiratorySymptoms.cough.triggers.decubitus && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        Décubitus
                      </span>
                    )}
                  </div>
                  {respiratorySymptoms.cough.triggers.other && (
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      Autre: {respiratorySymptoms.cough.triggers.other}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dyspnée */}
        {respiratorySymptoms?.dyspnea?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dyspnée
            </p>
            <div className="mt-2 space-y-2">
              {respiratorySymptoms.dyspnea.sadoulStage && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Stade Sadoul: {respiratorySymptoms.dyspnea.sadoulStage}
                </p>
              )}
              {respiratorySymptoms.dyspnea.type && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Type: {respiratorySymptoms.dyspnea.type}
                </p>
              )}
              {respiratorySymptoms.dyspnea.circumstances && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Circonstances:
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {respiratorySymptoms.dyspnea.circumstances.effort && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        Effort
                      </span>
                    )}
                    {respiratorySymptoms.dyspnea.circumstances.rest && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Repos
                      </span>
                    )}
                    {respiratorySymptoms.dyspnea.circumstances.decubitus && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        Décubitus
                      </span>
                    )}
                  </div>
                  {respiratorySymptoms.dyspnea.circumstances.other && (
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      Autre: {respiratorySymptoms.dyspnea.circumstances.other}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Douleur thoracique */}
        {respiratorySymptoms?.chestPain?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Douleur thoracique
            </p>
            <div className="mt-2 space-y-2">
              {respiratorySymptoms.chestPain.location && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Localisation:
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {respiratorySymptoms.chestPain.location.right && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        Droite
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.location.left && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                        Gauche
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.location.bilateral && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        Bilatérale
                      </span>
                    )}
                  </div>
                </div>
              )}
              {respiratorySymptoms.chestPain.site && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Siège:
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {respiratorySymptoms.chestPain.site.medioThoracic && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                        Médiastinal
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.site.basiThoracic && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        Basithoracique
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.site.retrosternal && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                        Rétrosternal
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.site.diffuse && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        Diffuse
                      </span>
                    )}
                  </div>
                </div>
              )}
              {respiratorySymptoms.chestPain.type && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type:
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {respiratorySymptoms.chestPain.type.oppression && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                        Oppression
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.type.constrictive && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                        Constrictive
                      </span>
                    )}
                    {respiratorySymptoms.chestPain.type.burning && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                        Brûlure
                      </span>
                    )}
                  </div>
                  {respiratorySymptoms.chestPain.type.other && (
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      Autre: {respiratorySymptoms.chestPain.type.other}
                    </p>
                  )}
                </div>
              )}
              {respiratorySymptoms.chestPain.triggers && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Facteurs déclenchants:{" "}
                  {respiratorySymptoms.chestPain.triggers}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Hémoptysie */}
        {respiratorySymptoms?.hemoptysis?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hémoptysie
            </p>
            {respiratorySymptoms.hemoptysis.abundance && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Abondance: {respiratorySymptoms.hemoptysis.abundance}
              </p>
            )}
          </div>
        )}

        {/* Expectoration */}
        {respiratorySymptoms?.expectoration?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Expectoration
            </p>
            <div className="mt-2 space-y-2">
              {respiratorySymptoms.expectoration.frequency && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Fréquence: {respiratorySymptoms.expectoration.frequency}
                </p>
              )}
              {respiratorySymptoms.expectoration.timing && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Horaires: {respiratorySymptoms.expectoration.timing}
                </p>
              )}
              {respiratorySymptoms.expectoration.quality && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Qualité: {respiratorySymptoms.expectoration.quality}
                </p>
              )}
              {respiratorySymptoms.expectoration.quantity && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Quantité: {respiratorySymptoms.expectoration.quantity}
                </p>
              )}
              {respiratorySymptoms.expectoration.odor && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Odeur: {respiratorySymptoms.expectoration.odor}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Signes extra-respiratoires
function ExtraRespiratorySymptomsSection({
  patient,
}: {
  patient: ExtendedPatient;
}) {
  const extraSymptoms = getPatientField<{
    arthralgia?: {
      present?: boolean;
      type?: string;
    };
    xerophthalmia?: boolean;
    xerostomia?: boolean;
    cutaneousSigns?: {
      present?: boolean;
      details?: string;
    };
    neurologicalSigns?: {
      present?: boolean;
      details?: string;
    };
    digestiveSigns?: {
      present?: boolean;
      details?: string;
    };
  }>(patient, "pidExtraRespiratorySymptoms");

  if (!extraSymptoms) return null;

  const hasAnyData =
    extraSymptoms?.arthralgia?.present ||
    extraSymptoms?.xerophthalmia ||
    extraSymptoms?.xerostomia ||
    extraSymptoms?.cutaneousSigns?.present ||
    extraSymptoms?.neurologicalSigns?.present ||
    extraSymptoms?.digestiveSigns?.present;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Signes extra-respiratoires" patient={patient}>
      <div className="space-y-4">
        {/* Arthralgies */}
        {extraSymptoms?.arthralgia?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Arthralgies
            </p>
            {extraSymptoms.arthralgia.type && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                Type: {extraSymptoms.arthralgia.type}
              </p>
            )}
          </div>
        )}

        {/* Xérophtalmie */}
        {extraSymptoms?.xerophthalmia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Xérophtalmie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Xérostomie */}
        {extraSymptoms?.xerostomia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Xérostomie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Signes cutanés */}
        {extraSymptoms?.cutaneousSigns?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Signes cutanés
            </p>
            {extraSymptoms.cutaneousSigns.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {extraSymptoms.cutaneousSigns.details}
              </p>
            )}
          </div>
        )}

        {/* Signes neurologiques */}
        {extraSymptoms?.neurologicalSigns?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Signes neurologiques
            </p>
            {extraSymptoms.neurologicalSigns.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {extraSymptoms.neurologicalSigns.details}
              </p>
            )}
          </div>
        )}

        {/* Signes digestifs */}
        {extraSymptoms?.digestiveSigns?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Signes digestifs
            </p>
            {extraSymptoms.digestiveSigns.details && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {extraSymptoms.digestiveSigns.details}
              </p>
            )}
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Signes généraux
function GeneralSignsSection({ patient }: { patient: ExtendedPatient }) {
  const generalSigns = getPatientField<{
    asthenia?: boolean;
    anorexia?: boolean;
    weightLoss?: {
      present?: boolean;
      quantified?: {
        present?: boolean;
        value?: number;
      };
    };
    fever?: {
      present?: boolean;
      quantified?: {
        present?: boolean;
        value?: number;
      };
    };
    nightSweats?: boolean;
  }>(patient, "pidGeneralSigns");

  if (!generalSigns) return null;

  const hasAnyData =
    generalSigns?.asthenia ||
    generalSigns?.anorexia ||
    generalSigns?.weightLoss?.present ||
    generalSigns?.fever?.present ||
    generalSigns?.nightSweats;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Signes généraux" patient={patient}>
      <div className="space-y-4">
        {/* Asthénie */}
        {generalSigns?.asthenia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Asthénie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Anorexie */}
        {generalSigns?.anorexia && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Anorexie
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {/* Perte de poids */}
        {generalSigns?.weightLoss?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Perte de poids
            </p>
            {generalSigns.weightLoss.quantified?.present &&
              generalSigns.weightLoss.quantified.value && (
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {generalSigns.weightLoss.quantified.value} kg
                </p>
              )}
          </div>
        )}

        {/* Fièvre */}
        {generalSigns?.fever?.present && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fièvre
            </p>
            {generalSigns.fever.quantified?.present &&
              generalSigns.fever.quantified.value && (
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {generalSigns.fever.quantified.value}°C
                </p>
              )}
          </div>
        )}

        {/* Sueurs nocturnes */}
        {generalSigns?.nightSweats && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Sueurs nocturnes
            </p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Examen clinique
function ClinicalExamSection({ patient }: { patient: ExtendedPatient }) {
  const clinicalExam = getPatientField<{
    inspection?: string;
    palpation?: string;
    percussion?: string;
    auscultation?: string;
    extrapulmonaryExam?: {
      cardiovascular?: string;
      abdominal?: string;
      neurological?: string;
      osteoarticular?: string;
      cutaneous?: string;
      lymphNodes?: string;
      otherFindings?: string;
    };
    pleuroPulmonaryExam?: {
      normal?: boolean;
    };
    lymphNodes?: {
      normal?: boolean;
      details?: string;
    };
    cardiovascularExam?: {
      normal?: boolean;
      details?: string;
    };
    cutaneousExam?: {
      normal?: boolean;
      symptoms?: string[];
      location?: string;
      type?: string;
      details?: string;
    };
    ent?: {
      normal?: boolean;
      details?: string;
    };
    jointExam?: {
      normal?: boolean;
      details?: string;
    };
    neurologicalExam?: {
      normal?: boolean;
      details?: string;
    };
    abdominalExam?: {
      normal?: boolean;
      details?: string;
    };
    ophthalmologicExam?: {
      normal?: boolean;
      details?: string;
    };
    renalExam?: {
      normal?: boolean;
      details?: string;
    };
    generalExam?: {
      normal?: boolean;
      weight?: number;
      height?: number;
      bmi?: number;
      temperature?: number;
      bloodPressure?: string;
      heartRate?: number;
      respiratoryRate?: number;
      saturation?: number;
    };
  }>(patient, "pidClinicalExam");

  if (!clinicalExam) return null;

  const hasAnyData =
    clinicalExam?.inspection ||
    clinicalExam?.palpation ||
    clinicalExam?.percussion ||
    clinicalExam?.auscultation ||
    clinicalExam?.extrapulmonaryExam?.cardiovascular ||
    clinicalExam?.extrapulmonaryExam?.abdominal ||
    clinicalExam?.extrapulmonaryExam?.neurological ||
    clinicalExam?.extrapulmonaryExam?.osteoarticular ||
    clinicalExam?.extrapulmonaryExam?.cutaneous ||
    clinicalExam?.extrapulmonaryExam?.lymphNodes ||
    clinicalExam?.extrapulmonaryExam?.otherFindings ||
    clinicalExam?.generalExam?.weight ||
    clinicalExam?.generalExam?.height ||
    clinicalExam?.generalExam?.bmi ||
    clinicalExam?.generalExam?.temperature ||
    clinicalExam?.generalExam?.bloodPressure ||
    clinicalExam?.generalExam?.heartRate ||
    clinicalExam?.generalExam?.respiratoryRate ||
    clinicalExam?.generalExam?.saturation;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Examen clinique" patient={patient}>
      <div className="space-y-6">
        {/* Examen pleuro-pulmonaire */}
        {(clinicalExam?.inspection ||
          clinicalExam?.palpation ||
          clinicalExam?.percussion ||
          clinicalExam?.auscultation) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Examen pleuro-pulmonaire
            </p>
            <div className="mt-2 space-y-2">
              {clinicalExam.inspection && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Inspection
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.inspection}
                  </p>
                </div>
              )}
              {clinicalExam.palpation && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Palpation
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.palpation}
                  </p>
                </div>
              )}
              {clinicalExam.percussion && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Percussion
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.percussion}
                  </p>
                </div>
              )}
              {clinicalExam.auscultation && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auscultation
                  </p>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {clinicalExam.auscultation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Examen général */}
        {clinicalExam?.generalExam &&
          (clinicalExam.generalExam.weight ||
            clinicalExam.generalExam.height ||
            clinicalExam.generalExam.bmi ||
            clinicalExam.generalExam.temperature ||
            clinicalExam.generalExam.bloodPressure ||
            clinicalExam.generalExam.heartRate ||
            clinicalExam.generalExam.respiratoryRate ||
            clinicalExam.generalExam.saturation) && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Examen général
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                {clinicalExam.generalExam.weight && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Poids
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.weight} kg
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.height && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Taille
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.height} cm
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.bmi && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      IMC
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.bmi}
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.temperature && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Température
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.temperature}°C
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.bloodPressure && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tension artérielle
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.bloodPressure}
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.heartRate && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fréquence cardiaque
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.heartRate} bpm
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.respiratoryRate && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fréquence respiratoire
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.respiratoryRate} cpm
                    </p>
                  </div>
                )}
                {clinicalExam.generalExam.saturation && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Saturation
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.generalExam.saturation}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Examen extrapulmonaire */}
        {clinicalExam?.extrapulmonaryExam &&
          (clinicalExam.extrapulmonaryExam.cardiovascular ||
            clinicalExam.extrapulmonaryExam.abdominal ||
            clinicalExam.extrapulmonaryExam.neurological ||
            clinicalExam.extrapulmonaryExam.osteoarticular ||
            clinicalExam.extrapulmonaryExam.cutaneous ||
            clinicalExam.extrapulmonaryExam.lymphNodes ||
            clinicalExam.extrapulmonaryExam.otherFindings) && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Examen extrapulmonaire
              </p>
              <div className="mt-2 space-y-2">
                {clinicalExam.extrapulmonaryExam.cardiovascular && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cardiovasculaire
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.cardiovascular}
                    </p>
                  </div>
                )}
                {clinicalExam.extrapulmonaryExam.abdominal && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Abdominal
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.abdominal}
                    </p>
                  </div>
                )}
                {clinicalExam.extrapulmonaryExam.neurological && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Neurologique
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.neurological}
                    </p>
                  </div>
                )}
                {clinicalExam.extrapulmonaryExam.osteoarticular && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ostéo-articulaire
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.osteoarticular}
                    </p>
                  </div>
                )}
                {clinicalExam.extrapulmonaryExam.cutaneous && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Cutané
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.cutaneous}
                    </p>
                  </div>
                )}
                {clinicalExam.extrapulmonaryExam.lymphNodes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ganglionnaire
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.lymphNodes}
                    </p>
                  </div>
                )}
                {clinicalExam.extrapulmonaryExam.otherFindings && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Autres
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {clinicalExam.extrapulmonaryExam.otherFindings}
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

// Section: Examens complémentaires
function ComplementaryExamsSection({ patient }: { patient: ExtendedPatient }) {
  const exams = getPatientField<{
    chestXRay?: {
      done?: boolean;
      date?: string;
      normalFindings?: string;
      type?: string;
      location?: string;
      distribution?: string;
      imageFiles?: string[];
    };
    chestCT?: {
      done?: boolean;
      date?: string;
      findings?: string;
      location?: string;
      type?: string;
      distribution?: string;
      imageFiles?: string[];
    };
    handXRay?: {
      done?: boolean;
      findings?: string;
      imageFiles?: string[];
    };
    sinusCT?: {
      done?: boolean;
      findings?: string;
      imageFiles?: string[];
    };
    biology?: {
      cbc?: {
        done?: boolean;
        hemoglobin?: number;
        mcv?: number;
        whiteBloodCells?: number;
        neutrophils?: number;
        eosinophils?: number;
        lymphocytes?: number;
        platelets?: number;
      };
      biochemistry?: {
        done?: boolean;
        creatinine?: number;
        clearance?: number;
        ast?: number;
        alt?: number;
        crp?: number;
        vs?: number;
      };
      immunology?: {
        done?: boolean;
        anca?: string;
        ana?: string;
        rheumatoidFactor?: string;
        antiCcp?: string;
        otherDetails?: string;
      };
      viralSerology?: {
        done?: boolean;
        hiv?: string;
        hbv?: string;
        hcv?: string;
      };
    };
    microbiology?: {
      done?: boolean;
      bkSputum?: string;
      ecbc?: string;
      pcr?: string;
      tuberculosisTest?: string;
      otherTests?: string;
    };
    bronchoscopy?: {
      done?: boolean;
      findings?: string;
      bal?: string;
      bronchialEndoscopy?: string;
    };
    histology?: {
      done?: boolean;
      lymphNodeBiopsy?: string;
      pleuralBiopsy?: string;
      skinBiopsy?: string;
      otherBiopsy?: string;
    };
    phthisiology?: {
      done?: boolean;
      result?: string;
    };
    functionalAssessment?: {
      done?: boolean;
      pulmonaryFunctionTest?: string;
      ecg?: string;
      echocardiography?: string;
      walkTest?: string;
      bloodGas?: string;
      efr?: string;
    };
  }>(patient, "pidComplementaryExams");

  if (!exams) return null;

  const hasAnyExamData =
    exams.chestXRay?.done ||
    exams.chestCT?.done ||
    exams.handXRay?.done ||
    exams.sinusCT?.done ||
    exams.biology?.cbc?.done ||
    exams.biology?.biochemistry?.done ||
    exams.biology?.immunology?.done ||
    exams.biology?.viralSerology?.done ||
    exams.microbiology?.done ||
    exams.bronchoscopy?.done ||
    exams.histology?.done ||
    exams.phthisiology?.done ||
    exams.functionalAssessment?.done;

  if (!hasAnyExamData) return null;

  return (
    <PathologySection title="Examens complémentaires" patient={patient}>
      <div className="space-y-6">
        {/* Imagerie */}
        {(exams.chestXRay?.done ||
          exams.chestCT?.done ||
          exams.handXRay?.done ||
          exams.sinusCT?.done) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Imagerie
            </p>

            {/* Radiographie thoracique */}
            {exams.chestXRay?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Radiographie thoracique
                </h4>
                <div className="space-y-2">
                  {exams.chestXRay.date && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Date: {exams.chestXRay.date}
                    </p>
                  )}
                  {exams.chestXRay.normalFindings && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      {exams.chestXRay.normalFindings}
                    </p>
                  )}
                  {exams.chestXRay.type && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Type: {exams.chestXRay.type}
                    </p>
                  )}
                  {exams.chestXRay.location && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Localisation: {exams.chestXRay.location}
                    </p>
                  )}
                  {exams.chestXRay.distribution && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Distribution: {exams.chestXRay.distribution}
                    </p>
                  )}
                  {exams.chestXRay.imageFiles &&
                    Array.isArray(exams.chestXRay.imageFiles) &&
                    exams.chestXRay.imageFiles.length > 0 && (
                      <ImageGallery
                        images={exams.chestXRay.imageFiles}
                        title="Radiographie thoracique"
                        imageAlt="Radiographie thoracique PID"
                      />
                    )}
                </div>
              </div>
            )}

            {/* Scanner thoracique */}
            {exams.chestCT?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scanner thoracique
                </h4>
                <div className="space-y-2">
                  {exams.chestCT.date && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Date: {exams.chestCT.date}
                    </p>
                  )}
                  {exams.chestCT.findings && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      {exams.chestCT.findings}
                    </p>
                  )}
                  {exams.chestCT.location && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Localisation: {exams.chestCT.location}
                    </p>
                  )}
                  {exams.chestCT.type && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Type: {exams.chestCT.type}
                    </p>
                  )}
                  {exams.chestCT.distribution && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Distribution: {exams.chestCT.distribution}
                    </p>
                  )}
                  {exams.chestCT.imageFiles &&
                    Array.isArray(exams.chestCT.imageFiles) &&
                    exams.chestCT.imageFiles.length > 0 && (
                      <ImageGallery
                        images={exams.chestCT.imageFiles}
                        title="Scanner thoracique"
                        imageAlt="Scanner thoracique PID"
                      />
                    )}
                </div>
              </div>
            )}

            {/* Radiographie des mains */}
            {exams.handXRay?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Radiographie des mains
                </h4>
                <div className="space-y-2">
                  {exams.handXRay.findings && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      {exams.handXRay.findings}
                    </p>
                  )}
                  {exams.handXRay.imageFiles &&
                    Array.isArray(exams.handXRay.imageFiles) &&
                    exams.handXRay.imageFiles.length > 0 && (
                      <ImageGallery
                        images={exams.handXRay.imageFiles}
                        title="Radiographie des mains"
                        imageAlt="Radiographie des mains PID"
                      />
                    )}
                </div>
              </div>
            )}

            {/* Scanner des sinus */}
            {exams.sinusCT?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scanner des sinus
                </h4>
                <div className="space-y-2">
                  {exams.sinusCT.findings && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      {exams.sinusCT.findings}
                    </p>
                  )}
                  {exams.sinusCT.imageFiles &&
                    Array.isArray(exams.sinusCT.imageFiles) &&
                    exams.sinusCT.imageFiles.length > 0 && (
                      <ImageGallery
                        images={exams.sinusCT.imageFiles}
                        title="Scanner des sinus"
                        imageAlt="Scanner des sinus PID"
                      />
                    )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Biologie */}
        {(exams.biology?.cbc?.done ||
          exams.biology?.biochemistry?.done ||
          exams.biology?.immunology?.done ||
          exams.biology?.viralSerology?.done) && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Biologie
            </p>

            {/* NFS */}
            {exams.biology.cbc?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Numération Formule Sanguine
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exams.biology.cbc.hemoglobin && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Hémoglobine
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.hemoglobin} g/dL
                      </p>
                    </div>
                  )}
                  {exams.biology.cbc.mcv && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        VGM
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.mcv} fL
                      </p>
                    </div>
                  )}
                  {exams.biology.cbc.whiteBloodCells && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Globules blancs
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.whiteBloodCells} /mm³
                      </p>
                    </div>
                  )}
                  {exams.biology.cbc.neutrophils && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Neutrophiles
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.neutrophils} /mm³
                      </p>
                    </div>
                  )}
                  {exams.biology.cbc.eosinophils && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Éosinophiles
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.eosinophils} /mm³
                      </p>
                    </div>
                  )}
                  {exams.biology.cbc.lymphocytes && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lymphocytes
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.lymphocytes} /mm³
                      </p>
                    </div>
                  )}
                  {exams.biology.cbc.platelets && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Plaquettes
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.cbc.platelets} /mm³
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Biochimie */}
            {exams.biology.biochemistry?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Biochimie
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exams.biology.biochemistry.creatinine && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Créatinine
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.biochemistry.creatinine} µmol/L
                      </p>
                    </div>
                  )}
                  {exams.biology.biochemistry.clearance && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Clairance
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.biochemistry.clearance} ml/min
                      </p>
                    </div>
                  )}
                  {exams.biology.biochemistry.ast && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AST
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.biochemistry.ast} UI/L
                      </p>
                    </div>
                  )}
                  {exams.biology.biochemistry.alt && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ALT
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.biochemistry.alt} UI/L
                      </p>
                    </div>
                  )}
                  {exams.biology.biochemistry.crp && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        CRP
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.biochemistry.crp} mg/L
                      </p>
                    </div>
                  )}
                  {exams.biology.biochemistry.vs && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        VS
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {exams.biology.biochemistry.vs} mm/h
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Immunologie */}
            {exams.biology.immunology?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Immunologie
                </h4>
                <div className="space-y-2">
                  {exams.biology.immunology.anca && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      ANCA: {exams.biology.immunology.anca}
                    </p>
                  )}
                  {exams.biology.immunology.ana && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      ANA: {exams.biology.immunology.ana}
                    </p>
                  )}
                  {exams.biology.immunology.rheumatoidFactor && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Facteur rhumatoïde:{" "}
                      {exams.biology.immunology.rheumatoidFactor}
                    </p>
                  )}
                  {exams.biology.immunology.antiCcp && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      Anti-CCP: {exams.biology.immunology.antiCcp}
                    </p>
                  )}
                  {exams.biology.immunology.otherDetails && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      {exams.biology.immunology.otherDetails}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Sérologies virales */}
            {exams.biology.viralSerology?.done && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sérologies virales
                </h4>
                <div className="space-y-2">
                  {exams.biology.viralSerology.hiv && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      VIH: {exams.biology.viralSerology.hiv}
                    </p>
                  )}
                  {exams.biology.viralSerology.hbv && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      VHB: {exams.biology.viralSerology.hbv}
                    </p>
                  )}
                  {exams.biology.viralSerology.hcv && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      VHC: {exams.biology.viralSerology.hcv}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Microbiologie */}
        {exams.microbiology?.done && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Microbiologie
            </p>
            <div className="mt-2 space-y-2">
              {exams.microbiology.bkSputum && (
                <p className="text-sm text-gray-900 dark:text-white">
                  BK crachats: {exams.microbiology.bkSputum}
                </p>
              )}
              {exams.microbiology.ecbc && (
                <p className="text-sm text-gray-900 dark:text-white">
                  ECBU: {exams.microbiology.ecbc}
                </p>
              )}
              {exams.microbiology.pcr && (
                <p className="text-sm text-gray-900 dark:text-white">
                  PCR: {exams.microbiology.pcr}
                </p>
              )}
              {exams.microbiology.tuberculosisTest && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Test tuberculose: {exams.microbiology.tuberculosisTest}
                </p>
              )}
              {exams.microbiology.otherTests && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Autres: {exams.microbiology.otherTests}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bronchoscopie */}
        {exams.bronchoscopy?.done && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bronchoscopie
            </p>
            <div className="mt-2 space-y-2">
              {exams.bronchoscopy.findings && (
                <p className="text-sm text-gray-900 dark:text-white">
                  {exams.bronchoscopy.findings}
                </p>
              )}
              {exams.bronchoscopy.bal && (
                <p className="text-sm text-gray-900 dark:text-white">
                  LBA: {exams.bronchoscopy.bal}
                </p>
              )}
              {exams.bronchoscopy.bronchialEndoscopy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Endoscopie bronchique: {exams.bronchoscopy.bronchialEndoscopy}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Histologie */}
        {exams.histology?.done && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Histologie
            </p>
            <div className="mt-2 space-y-2">
              {exams.histology.lymphNodeBiopsy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Biopsie ganglionnaire: {exams.histology.lymphNodeBiopsy}
                </p>
              )}
              {exams.histology.pleuralBiopsy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Biopsie pleurale: {exams.histology.pleuralBiopsy}
                </p>
              )}
              {exams.histology.skinBiopsy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Biopsie cutanée: {exams.histology.skinBiopsy}
                </p>
              )}
              {exams.histology.otherBiopsy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Autre biopsie: {exams.histology.otherBiopsy}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Phthisiologie */}
        {exams.phthisiology?.done && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Phthisiologie
            </p>
            {exams.phthisiology.result && (
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {exams.phthisiology.result}
              </p>
            )}
          </div>
        )}

        {/* Bilan fonctionnel */}
        {exams.functionalAssessment?.done && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bilan fonctionnel
            </p>
            <div className="mt-2 space-y-2">
              {exams.functionalAssessment.pulmonaryFunctionTest && (
                <p className="text-sm text-gray-900 dark:text-white">
                  EFR: {exams.functionalAssessment.pulmonaryFunctionTest}
                </p>
              )}
              {exams.functionalAssessment.ecg && (
                <p className="text-sm text-gray-900 dark:text-white">
                  ECG: {exams.functionalAssessment.ecg}
                </p>
              )}
              {exams.functionalAssessment.echocardiography && (
                <p className="text-sm text-gray-900 dark:text-white">
                  ETT: {exams.functionalAssessment.echocardiography}
                </p>
              )}
              {exams.functionalAssessment.walkTest && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Test de marche: {exams.functionalAssessment.walkTest}
                </p>
              )}
              {exams.functionalAssessment.bloodGas && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Gaz du sang: {exams.functionalAssessment.bloodGas}
                </p>
              )}
              {exams.functionalAssessment.efr && (
                <p className="text-sm text-gray-900 dark:text-white">
                  EFR: {exams.functionalAssessment.efr}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Section: Diagnostic final
function FinalDiagnosisSection({ patient }: { patient: ExtendedPatient }) {
  const finalDiagnosis = getPatientField<{
    diagnosisType?: {
      idiopathicPulmonaryFibrosis?: boolean;
      sarcoidosis?: boolean;
      rheumatoidArthritis?: boolean;
      hypersensitivityPneumonitis?: boolean;
      scleroderma?: boolean;
      mixedConnectiveTissueDisease?: boolean;
      drugInducedIld?: boolean;
      indeterminateIld?: boolean;
      other?: {
        present?: boolean;
        details?: string;
      };
    };
  }>(patient, "pidFinalDiagnosis");

  if (!finalDiagnosis) return null;

  const hasAnyDiagnosis =
    finalDiagnosis.diagnosisType?.idiopathicPulmonaryFibrosis ||
    finalDiagnosis.diagnosisType?.sarcoidosis ||
    finalDiagnosis.diagnosisType?.rheumatoidArthritis ||
    finalDiagnosis.diagnosisType?.hypersensitivityPneumonitis ||
    finalDiagnosis.diagnosisType?.scleroderma ||
    finalDiagnosis.diagnosisType?.mixedConnectiveTissueDisease ||
    finalDiagnosis.diagnosisType?.drugInducedIld ||
    finalDiagnosis.diagnosisType?.indeterminateIld ||
    finalDiagnosis.diagnosisType?.other?.present;

  if (!hasAnyDiagnosis) return null;

  return (
    <PathologySection title="Diagnostic final" patient={patient}>
      <div className="flex flex-wrap gap-2">
        {finalDiagnosis.diagnosisType?.idiopathicPulmonaryFibrosis && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
            Fibrose pulmonaire idiopathique
          </span>
        )}
        {finalDiagnosis.diagnosisType?.sarcoidosis && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
            Sarcoïdose
          </span>
        )}
        {finalDiagnosis.diagnosisType?.rheumatoidArthritis && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
            Polyarthrite rhumatoïde
          </span>
        )}
        {finalDiagnosis.diagnosisType?.hypersensitivityPneumonitis && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            Pneumopathie d&apos;hypersensibilité
          </span>
        )}
        {finalDiagnosis.diagnosisType?.scleroderma && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
            Sclérodermie
          </span>
        )}
        {finalDiagnosis.diagnosisType?.mixedConnectiveTissueDisease && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
            Maladie mixte du tissu conjonctif
          </span>
        )}
        {finalDiagnosis.diagnosisType?.drugInducedIld && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300">
            PID médicamenteuse
          </span>
        )}
        {finalDiagnosis.diagnosisType?.indeterminateIld && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
            PID indéterminée
          </span>
        )}
        {finalDiagnosis.diagnosisType?.other?.present && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
            Autre: {finalDiagnosis.diagnosisType.other.details}
          </span>
        )}
      </div>
    </PathologySection>
  );
}
