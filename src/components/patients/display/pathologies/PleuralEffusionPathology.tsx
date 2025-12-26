"use client";

import { ImageGallery } from "../shared/ImageGallery";
import {
  ExtendedPatient,
  PathologyConfig,
  PathologySectionProps,
} from "../types";
import { PathologySection } from "./PathologySection";

export function PleuralEffusionPathology({
  patient,
  pathologyId = "pleuralEffusion",
  className = "",
}: PathologySectionProps) {
  // Vérifier si le patient a cette pathologie
  if (!patient?.pathologies?.includes(pathologyId)) {
    return null;
  }

  return (
    <div className={className}>
      {/* Section 1: Motif de Consultation */}
      <ConsultationReasonSection patient={patient} />

      {/* Section 2: Antécédents */}
      <AntecedentsSection patient={patient} />

      {/* Section 3: Examen Clinique */}
      <ClinicalExamSection patient={patient} />

      {/* Section 4: Radiographie Thoracique */}
      <ChestXRaySection patient={patient} />

      {/* Section 5: Imagerie */}
      <ImagingSection patient={patient} />

      {/* Section 6: Ponction Pleurale */}
      <PleuralPunctureSection patient={patient} />

      {/* Section 7: Biologie */}
      <BiologySection patient={patient} />

      {/* Section 8: Autres Explorations */}
      <OtherAssessmentsSection patient={patient} />

      {/* Section 9: Diagnostic */}
      <DiagnosticSection patient={patient} />

      {/* Section 10: Traitement */}
      <TreatmentSection patient={patient} />

      {/* Section 11: Évolution */}
      <EvolutionSection patient={patient} />
    </div>
  );
}

// Configuration de la pathologie
PleuralEffusionPathology.config = {
  id: "pleuralEffusion",
  name: "Épanchement Pleural",
  icon: "/icons/pleuralEffusion.svg",
  description: "Épanchement pleural et étiologies associées",
  component: PleuralEffusionPathology,
  sections: {
    consultationReason: true,
    antecedents: true,
    clinicalExam: true,
    chestXRay: true,
    imaging: true,
    pleuralPuncture: true,
    biology: true,
    otherAssessments: true,
    diagnosis: true,
    treatment: true,
    evolution: true,
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

// Sous-composant pour la section motif de consultation
function ConsultationReasonSection({ patient }: { patient: ExtendedPatient }) {
  const consultationReason = getPatientField<{
    basiThoracicPain?: boolean;
    dyspnea?: boolean;
    cough?: boolean;
    other?: string;
  }>(patient, "consultationReason");

  if (!consultationReason) return null;

  const hasAnyData =
    consultationReason.basiThoracicPain ||
    consultationReason.dyspnea ||
    consultationReason.cough ||
    consultationReason.other;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Motif de Consultation" patient={patient}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consultationReason.basiThoracicPain && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Douleur basithoracique
            </p>
            <p className="text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {consultationReason.dyspnea && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dyspnée
            </p>
            <p className="text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {consultationReason.cough && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Toux
            </p>
            <p className="text-sm text-gray-900 dark:text-white">Oui</p>
          </div>
        )}

        {consultationReason.other && (
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autre
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {consultationReason.other}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section antécédents
function AntecedentsSection({ patient }: { patient: ExtendedPatient }) {
  const tuberculosis = getPatientField<{
    present?: boolean;
    date?: string;
    form?: string;
    treatment?: string;
    evolution?: string;
  }>(patient, "tuberculosis");

  const tbContact = getPatientField<{
    present?: boolean;
    who?: string;
    form?: string;
  }>(patient, "tbContact");

  const pleurisyHistory = getPatientField<{
    present?: boolean;
    diagnosis?: string;
    treatment?: string;
    evolution?: string;
  }>(patient, "pleurisyHistory");

  const medicalHistory = getPatientField<{
    hta?: boolean;
    diabetes?: boolean;
    hepatopathy?: boolean;
    renalFailure?: boolean;
    generalDisease?: boolean;
    generalDiseaseType?: string;
    knownCardiopathy?: boolean;
    cardiopathyType?: string;
    knownCancer?: boolean;
    cancerTypeExtension?: string;
    cancerEvolution?: string;
    chronicMedication?: boolean;
    medicationMolecules?: string;
    professionalExposure?: boolean;
    exposureDescription?: string;
    otherDiseases?: boolean;
    otherDiseasesType?: string;
  }>(patient, "medicalHistory");

  const smoking = getPatientField<{
    active?: boolean;
    type?: {
      cigarette?: boolean;
      chicha?: boolean;
      chewingTobacco?: boolean;
      sniffingTobacco?: boolean;
    };
    startAge?: number;
    packYears?: number;
    passive?: boolean;
    passiveLocation?: {
      home?: boolean;
      work?: boolean;
      publicPlace?: boolean;
    };
  }>(patient, "smoking");

  const substanceUse = getPatientField<{
    cannabis?: boolean;
    cannabisFrequency?: string;
    alcohol?: boolean;
  }>(patient, "substanceUse");

  const otherHistory = getPatientField<{
    gynecoObstetric?: string;
    surgical?: boolean;
    surgicalDetails?: string;
    family?: boolean;
    familyDetails?: string;
  }>(patient, "otherHistory");

  const hasAnyData =
    tuberculosis?.present ||
    tbContact?.present ||
    pleurisyHistory?.present ||
    medicalHistory?.hta ||
    medicalHistory?.diabetes ||
    medicalHistory?.hepatopathy ||
    medicalHistory?.renalFailure ||
    medicalHistory?.generalDisease ||
    medicalHistory?.knownCardiopathy ||
    medicalHistory?.knownCancer ||
    medicalHistory?.chronicMedication ||
    medicalHistory?.professionalExposure ||
    medicalHistory?.otherDiseases ||
    smoking?.active ||
    smoking?.passive ||
    substanceUse?.cannabis ||
    substanceUse?.alcohol ||
    otherHistory?.surgical ||
    otherHistory?.family;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Antécédents" patient={patient}>
      <div className="space-y-6">
        {/* Tuberculose */}
        {tuberculosis?.present && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tuberculose
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tuberculosis.date && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Date: {tuberculosis.date}
                  </p>
                </div>
              )}
              {tuberculosis.form && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Forme: {tuberculosis.form}
                  </p>
                </div>
              )}
              {tuberculosis.treatment && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Traitement: {tuberculosis.treatment}
                  </p>
                </div>
              )}
              {tuberculosis.evolution && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Évolution: {tuberculosis.evolution}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contage TB */}
        {tbContact?.present && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Contage TB
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tbContact.who && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Qui: {tbContact.who}
                  </p>
                </div>
              )}
              {tbContact.form && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Forme: {tbContact.form}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Antécédent de Pleurésie */}
        {pleurisyHistory?.present && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Antécédent de Pleurésie
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pleurisyHistory.diagnosis && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Diagnostic: {pleurisyHistory.diagnosis}
                  </p>
                </div>
              )}
              {pleurisyHistory.treatment && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Traitement: {pleurisyHistory.treatment}
                  </p>
                </div>
              )}
              {pleurisyHistory.evolution && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Évolution: {pleurisyHistory.evolution}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Antécédents Médicaux */}
        {(medicalHistory?.hta ||
          medicalHistory?.diabetes ||
          medicalHistory?.hepatopathy ||
          medicalHistory?.renalFailure ||
          medicalHistory?.generalDisease ||
          medicalHistory?.knownCardiopathy ||
          medicalHistory?.knownCancer ||
          medicalHistory?.chronicMedication ||
          medicalHistory?.professionalExposure ||
          medicalHistory?.otherDiseases) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Antécédents Médicaux
            </h4>
            <div className="space-y-2">
              {medicalHistory?.hta && (
                <p className="text-sm text-gray-900 dark:text-white">• HTA</p>
              )}
              {medicalHistory?.diabetes && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Diabète
                </p>
              )}
              {medicalHistory?.hepatopathy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Hépatopathie
                </p>
              )}
              {medicalHistory?.renalFailure && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Insuffisance rénale
                </p>
              )}
              {medicalHistory?.generalDisease && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Maladie générale: {medicalHistory.generalDiseaseType}
                </p>
              )}
              {medicalHistory?.knownCardiopathy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Cardiopathie: {medicalHistory.cardiopathyType}
                </p>
              )}
              {medicalHistory?.knownCancer && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Cancer: {medicalHistory.cancerTypeExtension} (
                  {medicalHistory.cancerEvolution})
                </p>
              )}
              {medicalHistory?.chronicMedication && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Médication chronique: {medicalHistory.medicationMolecules}
                </p>
              )}
              {medicalHistory?.professionalExposure && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Exposition professionnelle:{" "}
                  {medicalHistory.exposureDescription}
                </p>
              )}
              {medicalHistory?.otherDiseases && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Autres maladies: {medicalHistory.otherDiseasesType}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tabagisme */}
        {(smoking?.active || smoking?.passive) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tabagisme
            </h4>
            <div className="space-y-2">
              {smoking?.active && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Actif: {smoking.startAge} ans, {smoking.packYears} PA
                </p>
              )}
              {smoking?.passive && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Passif
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres substances */}
        {(substanceUse?.cannabis || substanceUse?.alcohol) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autres Substances
            </h4>
            <div className="space-y-2">
              {substanceUse?.cannabis && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Cannabis ({substanceUse.cannabisFrequency})
                </p>
              )}
              {substanceUse?.alcohol && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Alcool
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres antécédents */}
        {(otherHistory?.surgical ||
          otherHistory?.family ||
          otherHistory?.gynecoObstetric) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autres Antécédents
            </h4>
            <div className="space-y-2">
              {otherHistory?.gynecoObstetric && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Gynéco-obstétrique: {otherHistory.gynecoObstetric}
                </p>
              )}
              {otherHistory?.surgical && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Chirurgical: {otherHistory.surgicalDetails}
                </p>
              )}
              {otherHistory?.family && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Familial: {otherHistory.familyDetails}
                </p>
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
  const clinicalExam = getPatientField<{
    dyspnea?: boolean;
    dyspneaSadoulStage?: string;
    basiThoracicPain?: boolean;
    painLocation?: string;
    painType?: string;
    cough?: boolean;
    coughType?: string;
    expectoration?: string;
    hemoptysis?: boolean;
    hemoptysisAbundance?: string;
    otherSigns?: boolean;
    otherSignsDescription?: string;
    generalSigns?: {
      asthenia?: boolean;
      amg?: boolean;
      anorexia?: boolean;
      fever?: boolean;
    };
    psOms?: number;
    hemodynamicState?: string;
    sao2?: string;
    respiratoryRate?: string;
    respiratoryStruggle?: boolean;
    liquidEffusionSyndrome?: boolean;
    liquidEffusionLocation?: string;
    mixedEffusionSyndrome?: boolean;
    mixedEffusionLocation?: string;
    cardioExam?: string;
    cardioExamDescription?: string;
    abdominalExam?: string;
    ascites?: boolean;
    otherAbdominalFindings?: string;
    lymphNodes?: string;
    lymphNodesLocation?: string;
    otherExams?: string;
  }>(patient, "pleuralClinicalExam");

  if (!clinicalExam) return null;

  const hasAnyData =
    clinicalExam?.dyspnea ||
    clinicalExam?.basiThoracicPain ||
    clinicalExam?.cough ||
    clinicalExam?.hemoptysis ||
    clinicalExam?.psOms ||
    clinicalExam?.hemodynamicState ||
    clinicalExam?.liquidEffusionSyndrome ||
    clinicalExam?.mixedEffusionSyndrome ||
    clinicalExam?.cardioExam ||
    clinicalExam?.abdominalExam ||
    clinicalExam?.lymphNodes ||
    clinicalExam?.otherExams;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Examen Clinique" patient={patient}>
      <div className="space-y-6">
        {/* Signes Fonctionnels */}
        {(clinicalExam?.dyspnea ||
          clinicalExam?.basiThoracicPain ||
          clinicalExam?.cough ||
          clinicalExam?.hemoptysis) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Signes Fonctionnels
            </h4>
            <div className="space-y-2">
              {clinicalExam?.dyspnea && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Dyspnée (Stade Sadoul: {clinicalExam.dyspneaSadoulStage})
                </p>
              )}
              {clinicalExam?.basiThoracicPain && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Douleur basithoracique ({clinicalExam.painLocation} -{" "}
                  {clinicalExam.painType})
                </p>
              )}
              {clinicalExam?.cough && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Toux ({clinicalExam.coughType}) -{" "}
                  {clinicalExam.expectoration}
                </p>
              )}
              {clinicalExam?.hemoptysis && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Hémoptysie ({clinicalExam.hemoptysisAbundance})
                </p>
              )}
              {clinicalExam?.otherSigns && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Autres signes: {clinicalExam.otherSignsDescription}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Signes Généraux */}
        {clinicalExam?.generalSigns && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Signes Généraux
            </h4>
            <div className="space-y-2">
              {clinicalExam.generalSigns?.asthenia && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Asthénie
                </p>
              )}
              {clinicalExam.generalSigns?.amg && (
                <p className="text-sm text-gray-900 dark:text-white">• AMG</p>
              )}
              {clinicalExam.generalSigns?.anorexia && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Anorexie
                </p>
              )}
              {clinicalExam.generalSigns?.fever && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Fièvre
                </p>
              )}
            </div>
          </div>
        )}

        {/* État Clinique */}
        {(clinicalExam?.psOms ||
          clinicalExam?.hemodynamicState ||
          clinicalExam?.sao2 ||
          clinicalExam?.respiratoryRate ||
          clinicalExam?.respiratoryStruggle) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              État Clinique
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicalExam?.psOms && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    PS OMS: {clinicalExam.psOms}
                  </p>
                </div>
              )}
              {clinicalExam?.hemodynamicState && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    État hémodynamique: {clinicalExam.hemodynamicState}
                  </p>
                </div>
              )}
              {clinicalExam?.sao2 && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    SaO2: {clinicalExam.sao2}
                  </p>
                </div>
              )}
              {clinicalExam?.respiratoryRate && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    FR: {clinicalExam.respiratoryRate}
                  </p>
                </div>
              )}
              {clinicalExam?.respiratoryStruggle && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Lutte respiratoire: Oui
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* État Respiratoire */}
        {(clinicalExam?.liquidEffusionSyndrome ||
          clinicalExam?.mixedEffusionSyndrome) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              État Respiratoire
            </h4>
            <div className="space-y-2">
              {clinicalExam?.liquidEffusionSyndrome && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Syndrome d&apos;épanchement liquidien (
                  {clinicalExam.liquidEffusionLocation})
                </p>
              )}
              {clinicalExam?.mixedEffusionSyndrome && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Syndrome d&apos;épanchement mixte (
                  {clinicalExam.mixedEffusionLocation})
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres Examens */}
        {(clinicalExam?.cardioExam ||
          clinicalExam?.abdominalExam ||
          clinicalExam?.lymphNodes ||
          clinicalExam?.otherExams) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autres Examens
            </h4>
            <div className="space-y-2">
              {clinicalExam?.cardioExam && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Cardio: {clinicalExam.cardioExam} -{" "}
                  {clinicalExam.cardioExamDescription}
                </p>
              )}
              {clinicalExam?.abdominalExam && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Abdominal: {clinicalExam.abdominalExam}{" "}
                  {clinicalExam.ascites && "(Ascite)"} -{" "}
                  {clinicalExam.otherAbdominalFindings}
                </p>
              )}
              {clinicalExam?.lymphNodes && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Ganglions: {clinicalExam.lymphNodes} (
                  {clinicalExam.lymphNodesLocation})
                </p>
              )}
              {clinicalExam?.otherExams && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Autres: {clinicalExam.otherExams}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section radiographie thoracique
function ChestXRaySection({ patient }: { patient: ExtendedPatient }) {
  const chestXRay = getPatientField<{
    pleurisyLocation?: string;
    abundance?: string;
    otherAnomalies?: boolean;
    otherAnomaliesDescription?: string;
  }>(patient, "chestXRay");

  if (!chestXRay) return null;

  const hasAnyData =
    chestXRay?.pleurisyLocation ||
    chestXRay?.abundance ||
    chestXRay?.otherAnomalies;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Radiographie Thoracique" patient={patient}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chestXRay.pleurisyLocation && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Localisation pleurésie
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {chestXRay.pleurisyLocation}
              </p>
            </div>
          )}
          {chestXRay.abundance && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Abondance
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {chestXRay.abundance}
              </p>
            </div>
          )}
          {chestXRay.otherAnomalies && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Autres anomalies
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {chestXRay.otherAnomaliesDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section imagerie
function ImagingSection({ patient }: { patient: ExtendedPatient }) {
  const imaging = getPatientField<{
    thoracicEcho?: boolean;
    thoracicEchoResults?: string;
    thoracicEchoImages?: string[];
    thoracicCT?: boolean;
    thoracicCTResults?: string;
    thoracicCTImages?: string[];
    abdominalEcho?: boolean;
    abdominalEchoResults?: string;
    abdominalEchoImages?: string[];
    ett?: boolean;
    ettResults?: string;
    ettImages?: string[];
    otherImaging?: string;
    otherImagingImages?: string[];
  }>(patient, "imaging");

  if (!imaging) return null;

  const hasImages =
    (imaging?.thoracicEchoImages && imaging.thoracicEchoImages.length > 0) ||
    (imaging?.thoracicCTImages && imaging.thoracicCTImages.length > 0) ||
    (imaging?.abdominalEchoImages && imaging.abdominalEchoImages.length > 0) ||
    (imaging?.ettImages && imaging.ettImages.length > 0) ||
    (imaging?.otherImagingImages && imaging.otherImagingImages.length > 0);

  if (
    !hasImages &&
    !imaging?.thoracicEcho &&
    !imaging?.thoracicCT &&
    !imaging?.abdominalEcho &&
    !imaging?.ett
  )
    return null;

  return (
    <PathologySection title="Imagerie" patient={patient}>
      <div className="space-y-6">
        {/* Échographie thoracique */}
        {(imaging?.thoracicEcho ||
          (imaging?.thoracicEchoImages &&
            imaging.thoracicEchoImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Échographie thoracique
            </h4>
            {imaging.thoracicEchoResults && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {imaging.thoracicEchoResults}
              </p>
            )}
            {imaging?.thoracicEchoImages &&
              imaging.thoracicEchoImages.length > 0 && (
                <ImageGallery
                  images={imaging.thoracicEchoImages}
                  title="Échographie thoracique"
                  imageAlt="Échographie thoracique"
                />
              )}
          </div>
        )}

        {/* Scanner thoracique */}
        {(imaging?.thoracicCT ||
          (imaging?.thoracicCTImages &&
            imaging.thoracicCTImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Scanner thoracique
            </h4>
            {imaging.thoracicCTResults && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {imaging.thoracicCTResults}
              </p>
            )}
            {imaging?.thoracicCTImages &&
              imaging.thoracicCTImages.length > 0 && (
                <ImageGallery
                  images={imaging.thoracicCTImages}
                  title="Scanner thoracique"
                  imageAlt="Scanner thoracique"
                />
              )}
          </div>
        )}

        {/* Échographie abdominale */}
        {(imaging?.abdominalEcho ||
          (imaging?.abdominalEchoImages &&
            imaging.abdominalEchoImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Échographie abdominale
            </h4>
            {imaging.abdominalEchoResults && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {imaging.abdominalEchoResults}
              </p>
            )}
            {imaging?.abdominalEchoImages &&
              imaging.abdominalEchoImages.length > 0 && (
                <ImageGallery
                  images={imaging.abdominalEchoImages}
                  title="Échographie abdominale"
                  imageAlt="Échographie abdominale"
                />
              )}
          </div>
        )}

        {/* ETT */}
        {(imaging?.ett ||
          (imaging?.ettImages && imaging.ettImages.length > 0)) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              ETT
            </h4>
            {imaging.ettResults && (
              <p className="text-sm text-gray-900 dark:text-white mb-2">
                {imaging.ettResults}
              </p>
            )}
            {imaging?.ettImages && imaging.ettImages.length > 0 && (
              <ImageGallery
                images={imaging.ettImages}
                title="ETT"
                imageAlt="ETT"
              />
            )}
          </div>
        )}

        {/* Autre imagerie */}
        {imaging?.otherImaging && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autre imagerie
            </h4>
            <p className="text-sm text-gray-900 dark:text-white mb-2">
              {imaging.otherImaging}
            </p>
            {imaging?.otherImagingImages &&
              imaging.otherImagingImages.length > 0 && (
                <ImageGallery
                  images={imaging.otherImagingImages}
                  title="Autre imagerie"
                  imageAlt="Autre imagerie"
                />
              )}
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section ponction pleurale
function PleuralPunctureSection({ patient }: { patient: ExtendedPatient }) {
  const pleuralPuncture = getPatientField<{
    date?: string;
    state?: string;
    evacuatedAmount?: number;
    pleuralBiopsy?: string;
    anapathResults?: string;
    aspect?: {
      clear?: boolean;
      jc?: boolean;
      yellow?: boolean;
      seroHemorrhagic?: boolean;
      hemorrhagic?: boolean;
      troubled?: boolean;
      chylous?: boolean;
      purulent?: boolean;
    };
    biochemistry?: {
      proteins?: number;
      ldh?: number;
      glucose?: number;
      others?: string;
    };
    cytology?: {
      redBloodCells?: number;
      whiteBloodCells?: number;
      lymphocytes?: number;
      neutrophils?: number;
      eosinophils?: number;
    };
    mycoBacteriology?: {
      bkED?: boolean;
      bkEDResult?: string;
      bkCulture?: boolean;
      bkCultureResult?: string;
      others?: string;
    };
  }>(patient, "pleuralPuncture");

  if (!pleuralPuncture) return null;

  const hasAnyData =
    pleuralPuncture?.date ||
    pleuralPuncture?.state ||
    pleuralPuncture?.evacuatedAmount ||
    pleuralPuncture?.pleuralBiopsy ||
    pleuralPuncture?.anapathResults ||
    Object.values(pleuralPuncture.aspect || {}).some((v) => v === true) ||
    Object.values(pleuralPuncture.biochemistry || {}).some(
      (v) => v !== null && v !== undefined
    ) ||
    Object.values(pleuralPuncture.cytology || {}).some(
      (v) => v !== null && v !== undefined
    ) ||
    Object.values(pleuralPuncture.mycoBacteriology || {}).some(
      (v) => v === true
    );

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Ponction Pleurale" patient={patient}>
      <div className="space-y-6">
        {/* Informations générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pleuralPuncture.date && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Date
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {pleuralPuncture.date}
              </p>
            </div>
          )}
          {pleuralPuncture.state && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                État
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {pleuralPuncture.state}
              </p>
            </div>
          )}
          {pleuralPuncture.evacuatedAmount && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Quantité évacuée
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {pleuralPuncture.evacuatedAmount} ml
              </p>
            </div>
          )}
          {pleuralPuncture.pleuralBiopsy && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Biopsie pleurale
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {pleuralPuncture.pleuralBiopsy}
              </p>
            </div>
          )}
          {pleuralPuncture.anapathResults && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Résultats anapath
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {pleuralPuncture.anapathResults}
              </p>
            </div>
          )}
        </div>

        {/* Aspect */}
        {pleuralPuncture.aspect &&
          Object.values(pleuralPuncture.aspect).some((v) => v === true) && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Aspect
              </h4>
              <div className="flex flex-wrap gap-2">
                {pleuralPuncture.aspect.clear && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Clair
                  </span>
                )}
                {pleuralPuncture.aspect.jc && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    Jaune citron
                  </span>
                )}
                {pleuralPuncture.aspect.yellow && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    Jaune
                  </span>
                )}
                {pleuralPuncture.aspect.seroHemorrhagic && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    Séro-hémorragique
                  </span>
                )}
                {pleuralPuncture.aspect.hemorrhagic && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                    Hémorragique
                  </span>
                )}
                {pleuralPuncture.aspect.troubled && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                    Trouble
                  </span>
                )}
                {pleuralPuncture.aspect.chylous && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                    Chyleux
                  </span>
                )}
                {pleuralPuncture.aspect.purulent && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                    Purulent
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Biochimie */}
        {pleuralPuncture.biochemistry &&
          Object.values(pleuralPuncture.biochemistry).some(
            (v) => v !== null && v !== undefined
          ) && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Biochimie
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pleuralPuncture.biochemistry.proteins && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Protéines: {pleuralPuncture.biochemistry.proteins} g/L
                    </p>
                  </div>
                )}
                {pleuralPuncture.biochemistry.ldh && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      LDH: {pleuralPuncture.biochemistry.ldh} UI/L
                    </p>
                  </div>
                )}
                {pleuralPuncture.biochemistry.glucose && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Glucose: {pleuralPuncture.biochemistry.glucose} g/L
                    </p>
                  </div>
                )}
                {pleuralPuncture.biochemistry.others && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-900 dark:text-white">
                      Autres: {pleuralPuncture.biochemistry.others}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Cytologie */}
        {pleuralPuncture.cytology &&
          Object.values(pleuralPuncture.cytology).some(
            (v) => v !== null && v !== undefined
          ) && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Cytologie
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pleuralPuncture.cytology.redBloodCells && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Hématies: {pleuralPuncture.cytology.redBloodCells} /mm³
                    </p>
                  </div>
                )}
                {pleuralPuncture.cytology.whiteBloodCells && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Leucocytes: {pleuralPuncture.cytology.whiteBloodCells}{" "}
                      /mm³
                    </p>
                  </div>
                )}
                {pleuralPuncture.cytology.lymphocytes && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Lymphocytes: {pleuralPuncture.cytology.lymphocytes}%
                    </p>
                  </div>
                )}
                {pleuralPuncture.cytology.neutrophils && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      PN: {pleuralPuncture.cytology.neutrophils}%
                    </p>
                  </div>
                )}
                {pleuralPuncture.cytology.eosinophils && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Éosinophiles: {pleuralPuncture.cytology.eosinophils}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Mycobactériologie */}
        {pleuralPuncture.mycoBacteriology &&
          Object.values(pleuralPuncture.mycoBacteriology).some(
            (v) => v === true
          ) && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Mycobactériologie
              </h4>
              <div className="space-y-2">
                {pleuralPuncture.mycoBacteriology.bkED && (
                  <p className="text-sm text-gray-900 dark:text-white">
                    • BK ED: {pleuralPuncture.mycoBacteriology.bkEDResult}
                  </p>
                )}
                {pleuralPuncture.mycoBacteriology.bkCulture && (
                  <p className="text-sm text-gray-900 dark:text-white">
                    • BK Culture:{" "}
                    {pleuralPuncture.mycoBacteriology.bkCultureResult}
                  </p>
                )}
                {pleuralPuncture.mycoBacteriology.others && (
                  <p className="text-sm text-gray-900 dark:text-white">
                    • Autres: {pleuralPuncture.mycoBacteriology.others}
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
  const biology = getPatientField<{
    idrt?: boolean;
    idrtResult?: number;
    quantiferon?: boolean;
    quantiferonResult?: string;
    bkEDSputum?: boolean;
    bkEDSputumResult?: string;
    bkCSputum?: boolean;
    bkCSputumResult?: string;
    geneXpert?: boolean;
    geneXpertResult?: string;
    cbc?: {
      hemoglobin?: number;
      whiteBloodCells?: number;
      neutrophils?: number;
      lymphocytes?: number;
      eosinophils?: number;
      platelets?: number;
    };
    tp?: number;
    dDimers?: number;
    albuminemia?: number;
    proteins?: number;
    ldh?: number;
    crp?: number;
    esr?: number;
    procalcitonin?: number;
    hivSerology?: string;
    urea?: number;
    creatinine?: number;
    bnp?: boolean;
    bnpValue?: number;
    glucose?: number;
    proteinuria24h?: string;
    liverFunction?: {
      alat?: number;
      asat?: number;
      ggt?: number;
      alp?: number;
      directBilirubin?: number;
      indirectBilirubin?: number;
    };
    immunology?: string;
    immunologyDetails?: string;
    otherBiology?: string;
  }>(patient, "biology");

  if (!biology) return null;

  const hasAnyData =
    biology?.idrt ||
    biology?.quantiferon ||
    biology?.bkEDSputum ||
    biology?.bkCSputum ||
    biology?.geneXpert ||
    Object.values(biology.cbc || {}).some(
      (v) => v !== null && v !== undefined
    ) ||
    biology?.tp ||
    biology?.dDimers ||
    biology?.albuminemia ||
    biology?.proteins ||
    biology?.ldh ||
    biology?.crp ||
    biology?.esr ||
    biology?.procalcitonin ||
    biology?.hivSerology ||
    biology?.urea ||
    biology?.creatinine ||
    biology?.bnp ||
    biology?.glucose ||
    biology?.proteinuria24h ||
    Object.values(biology.liverFunction || {}).some(
      (v) => v !== null && v !== undefined
    ) ||
    biology?.immunology ||
    biology?.otherBiology;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Biologie" patient={patient}>
      <div className="space-y-6">
        {/* Tests Tuberculose */}
        {(biology?.idrt ||
          biology?.quantiferon ||
          biology?.bkEDSputum ||
          biology?.bkCSputum ||
          biology?.geneXpert) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Tests Tuberculose
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.idrt && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    IDRT: {biology.idrtResult} mm
                  </p>
                </div>
              )}
              {biology?.quantiferon && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Quantiferon: {biology.quantiferonResult}
                  </p>
                </div>
              )}
              {biology?.bkEDSputum && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    BK ED Crachats: {biology.bkEDSputumResult}
                  </p>
                </div>
              )}
              {biology?.bkCSputum && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    BK C Crachats: {biology.bkCSputumResult}
                  </p>
                </div>
              )}
              {biology?.geneXpert && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    GeneXpert: {biology.geneXpertResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* NFS */}
        {biology?.cbc &&
          Object.values(biology.cbc).some(
            (v) => v !== null && v !== undefined
          ) && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                NFS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {biology.cbc.hemoglobin && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Hémoglobine: {biology.cbc.hemoglobin} g/dL
                    </p>
                  </div>
                )}
                {biology.cbc.whiteBloodCells && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      GB: {biology.cbc.whiteBloodCells} /mm³
                    </p>
                  </div>
                )}
                {biology.cbc.neutrophils && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      PN: {biology.cbc.neutrophils}%
                    </p>
                  </div>
                )}
                {biology.cbc.lymphocytes && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Lymphocytes: {biology.cbc.lymphocytes}%
                    </p>
                  </div>
                )}
                {biology.cbc.eosinophils && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Éosinophiles: {biology.cbc.eosinophils}%
                    </p>
                  </div>
                )}
                {biology.cbc.platelets && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Plaquettes: {biology.cbc.platelets} /mm³
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Hémostase et Biochimie */}
        {(biology?.tp ||
          biology?.dDimers ||
          biology?.albuminemia ||
          biology?.proteins ||
          biology?.ldh ||
          biology?.crp ||
          biology?.esr ||
          biology?.procalcitonin ||
          biology?.hivSerology ||
          biology?.urea ||
          biology?.creatinine ||
          biology?.bnp ||
          biology?.glucose ||
          biology?.proteinuria24h) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Hémostase et Biochimie
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {biology?.tp && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    TP: {biology.tp}%
                  </p>
                </div>
              )}
              {biology?.dDimers && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    D-Dimères: {biology.dDimers} ng/mL
                  </p>
                </div>
              )}
              {biology?.albuminemia && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Albuminémie: {biology.albuminemia} g/L
                  </p>
                </div>
              )}
              {biology?.proteins && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Protéines: {biology.proteins} g/L
                  </p>
                </div>
              )}
              {biology?.ldh && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    LDH: {biology.ldh} UI/L
                  </p>
                </div>
              )}
              {biology?.crp && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    CRP: {biology.crp} mg/L
                  </p>
                </div>
              )}
              {biology?.esr && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    VS: {biology.esr} mm
                  </p>
                </div>
              )}
              {biology?.procalcitonin && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Procalcitonine: {biology.procalcitonin} ng/mL
                  </p>
                </div>
              )}
              {biology?.hivSerology && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Sérologie VIH: {biology.hivSerology}
                  </p>
                </div>
              )}
              {biology?.urea && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Urée: {biology.urea} mmol/L
                  </p>
                </div>
              )}
              {biology?.creatinine && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Créatininémie: {biology.creatinine} µmol/L
                  </p>
                </div>
              )}
              {biology?.bnp && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    BNP: {biology.bnpValue} pg/mL
                  </p>
                </div>
              )}
              {biology?.glucose && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Glycémie: {biology.glucose} g/L
                  </p>
                </div>
              )}
              {biology?.proteinuria24h && (
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Protéinurie 24h: {biology.proteinuria24h}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fonction hépatique */}
        {biology?.liverFunction &&
          Object.values(biology.liverFunction).some(
            (v) => v !== null && v !== undefined
          ) && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Fonction Hépatique
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {biology.liverFunction.alat && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      ALAT: {biology.liverFunction.alat} UI/L
                    </p>
                  </div>
                )}
                {biology.liverFunction.asat && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      ASAT: {biology.liverFunction.asat} UI/L
                    </p>
                  </div>
                )}
                {biology.liverFunction.ggt && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      GGT: {biology.liverFunction.ggt} UI/L
                    </p>
                  </div>
                )}
                {biology.liverFunction.alp && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      PAL: {biology.liverFunction.alp} UI/L
                    </p>
                  </div>
                )}
                {biology.liverFunction.directBilirubin && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Bilirubine directe:{" "}
                      {biology.liverFunction.directBilirubin} µmol/L
                    </p>
                  </div>
                )}
                {biology.liverFunction.indirectBilirubin && (
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      Bilirubine indirecte:{" "}
                      {biology.liverFunction.indirectBilirubin} µmol/L
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Immunologie */}
        {(biology?.immunology || biology?.immunologyDetails) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Immunologie
            </h4>
            <div className="space-y-2">
              {biology?.immunology && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • {biology.immunology}
                </p>
              )}
              {biology?.immunologyDetails && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • {biology.immunologyDetails}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres */}
        {biology?.otherBiology && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autres
            </h4>
            <p className="text-sm text-gray-900 dark:text-white">
              {biology.otherBiology}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section autres explorations
function OtherAssessmentsSection({ patient }: { patient: ExtendedPatient }) {
  const otherAssessments = getPatientField<{
    bronchialFibroscopy?: string;
    bronchialFibroscopyDetails?: string;
    postBronchoscopyAssessment?: string;
    thoracoscopy?: string;
    thoracoscopyDetails?: string;
    postThoracoscopyAssessment?: string;
    otherAssessments?: string;
  }>(patient, "otherAssessments");

  if (!otherAssessments) return null;

  const hasAnyData =
    otherAssessments?.bronchialFibroscopy ||
    otherAssessments?.thoracoscopy ||
    otherAssessments?.otherAssessments;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Autres Explorations" patient={patient}>
      <div className="space-y-6">
        {/* Fibroscopie bronchique */}
        {otherAssessments?.bronchialFibroscopy && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Fibroscopie bronchique
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-900 dark:text-white">
                {otherAssessments.bronchialFibroscopy}
              </p>
              {otherAssessments.bronchialFibroscopyDetails && (
                <p className="text-sm text-gray-900 dark:text-white">
                  {otherAssessments.bronchialFibroscopyDetails}
                </p>
              )}
              {otherAssessments.postBronchoscopyAssessment && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Bilan post-fibroscopie:{" "}
                  {otherAssessments.postBronchoscopyAssessment}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Thoracoscopie */}
        {otherAssessments?.thoracoscopy && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Thoracoscopie
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-900 dark:text-white">
                {otherAssessments.thoracoscopy}
              </p>
              {otherAssessments.thoracoscopyDetails && (
                <p className="text-sm text-gray-900 dark:text-white">
                  {otherAssessments.thoracoscopyDetails}
                </p>
              )}
              {otherAssessments.postThoracoscopyAssessment && (
                <p className="text-sm text-gray-900 dark:text-white">
                  Bilan post-thoracoscopie:{" "}
                  {otherAssessments.postThoracoscopyAssessment}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Autres bilans */}
        {otherAssessments?.otherAssessments && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autres bilans
            </h4>
            <p className="text-sm text-gray-900 dark:text-white">
              {otherAssessments.otherAssessments}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section diagnostic
function DiagnosticSection({ patient }: { patient: ExtendedPatient }) {
  const diagnosis = getPatientField<{
    type?: string;
    primaryCancer?: string;
    otherDiagnosis?: string;
  }>(patient, "diagnosis");

  if (!diagnosis) return null;

  const hasAnyData =
    diagnosis?.type || diagnosis?.primaryCancer || diagnosis?.otherDiagnosis;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Diagnostic" patient={patient}>
      <div className="space-y-4">
        {diagnosis?.type && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Type
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {diagnosis.type}
            </p>
          </div>
        )}
        {diagnosis?.primaryCancer && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cancer primitif
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {diagnosis.primaryCancer}
            </p>
          </div>
        )}
        {diagnosis?.otherDiagnosis && (
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Autre diagnostic
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {diagnosis.otherDiagnosis}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}

// Sous-composant pour la section traitement
function TreatmentSection({ patient }: { patient: ExtendedPatient }) {
  const treatment = getPatientField<{
    types?: {
      iterativePuncture?: boolean;
      intraPleuralInfiltration?: boolean;
      drainage?: boolean;
      analgesics?: boolean;
      antituberculosis?: boolean;
      nonSpecificAntibiotherapy?: boolean;
      guidedAntibiotherapy?: boolean;
      pleuralPhysiotherapy?: boolean;
      physiotherapySessions?: number;
      surgery?: boolean;
      surgeryType?: {
        talcage?: boolean;
        refreshing?: boolean;
        decortication?: boolean;
      };
      others?: string;
    };
    startDate?: string;
    protocol?: string;
  }>(patient, "treatment");

  if (!treatment) return null;

  const hasAnyData =
    treatment?.types?.iterativePuncture ||
    treatment?.types?.intraPleuralInfiltration ||
    treatment?.types?.drainage ||
    treatment?.types?.analgesics ||
    treatment?.types?.antituberculosis ||
    treatment?.types?.nonSpecificAntibiotherapy ||
    treatment?.types?.guidedAntibiotherapy ||
    treatment?.types?.pleuralPhysiotherapy ||
    treatment?.types?.surgery ||
    treatment?.startDate ||
    treatment?.protocol;

  if (!hasAnyData) return null;

  const types = treatment?.types;
  const surgeryType = types?.surgeryType;

  return (
    <PathologySection title="Traitement" patient={patient}>
      <div className="space-y-6">
        {/* Types de traitement */}
        {types && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Types de Traitement
            </h4>
            <div className="space-y-2">
              {types?.iterativePuncture && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Ponctions itératives
                </p>
              )}
              {types?.intraPleuralInfiltration && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Infiltration intrapleurale
                </p>
              )}
              {types?.drainage && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Drainage
                </p>
              )}
              {types?.analgesics && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Antalgiques
                </p>
              )}
              {types?.antituberculosis && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Antituberculeux
                </p>
              )}
              {types?.nonSpecificAntibiotherapy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Antibiothérapie non spécifique
                </p>
              )}
              {types?.guidedAntibiotherapy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Antibiothérapie guidée
                </p>
              )}
              {types?.pleuralPhysiotherapy && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Kinésithérapie pleurale ({types.physiotherapySessions}{" "}
                  séances)
                </p>
              )}
              {types?.surgery && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Chirurgie
                </p>
              )}
              {types?.others && (
                <p className="text-sm text-gray-900 dark:text-white">
                  • Autres: {types.others}
                </p>
              )}
            </div>

            {/* Types de chirurgie */}
            {surgeryType &&
              Object.values(surgeryType).some((v) => v === true) && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Types de Chirurgie
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {surgeryType?.talcage && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                        Talcage
                      </span>
                    )}
                    {surgeryType?.refreshing && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                        Rafraîchissement
                      </span>
                    )}
                    {surgeryType?.decortication && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                        Décortication
                      </span>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Date et protocole */}
        {(treatment?.startDate || treatment?.protocol) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Détails du Traitement
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatment?.startDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date de début
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {treatment.startDate}
                  </p>
                </div>
              )}
              {treatment?.protocol && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Protocole
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {treatment.protocol}
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

// Sous-composant pour la section évolution
function EvolutionSection({ patient }: { patient: ExtendedPatient }) {
  const evolution = getPatientField<{
    outcome?: {
      iatrogenicComplication?: boolean;
      parietalSuppuration?: boolean;
      recovery?: boolean;
      regression?: boolean;
      encystment?: boolean;
      pachypleuritis?: boolean;
      recurrence?: boolean;
      lostToFollowUp?: boolean;
      death?: boolean;
    };
    otherDetails?: string;
  }>(patient, "evolution");

  if (!evolution) return null;

  const outcome = evolution?.outcome;
  const hasAnyData =
    outcome?.iatrogenicComplication ||
    outcome?.parietalSuppuration ||
    outcome?.recovery ||
    outcome?.regression ||
    outcome?.encystment ||
    outcome?.pachypleuritis ||
    outcome?.recurrence ||
    outcome?.lostToFollowUp ||
    outcome?.death ||
    evolution?.otherDetails;

  if (!hasAnyData) return null;

  return (
    <PathologySection title="Évolution" patient={patient}>
      <div className="space-y-6">
        {/* Issue */}
        {outcome && Object.values(outcome).some((v) => v === true) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Issue
            </h4>
            <div className="flex flex-wrap gap-2">
              {outcome?.iatrogenicComplication && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                  Complication iatrogène
                </span>
              )}
              {outcome?.parietalSuppuration && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                  Suppuration pariétale
                </span>
              )}
              {outcome?.recovery && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Guérison
                </span>
              )}
              {outcome?.regression && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Régression
                </span>
              )}
              {outcome?.encystment && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                  Enkystement
                </span>
              )}
              {outcome?.pachypleuritis && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                  Pachypleurite
                </span>
              )}
              {outcome?.recurrence && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">
                  Récidive
                </span>
              )}
              {outcome?.lostToFollowUp && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                  Perdu de vue
                </span>
              )}
              {outcome?.death && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black dark:bg-gray-700 text-white">
                  Décès
                </span>
              )}
            </div>
          </div>
        )}

        {/* Autres détails */}
        {evolution?.otherDetails && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Autres détails
            </h4>
            <p className="text-sm text-gray-900 dark:text-white">
              {evolution.otherDetails}
            </p>
          </div>
        )}
      </div>
    </PathologySection>
  );
}
