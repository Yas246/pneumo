/**
 * Composant PDF pour la pathologie Épanchement Pleural
 * Affiche toutes les données du formulaire pleuralEffusion de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles, pathologyStyles } from "../styles";

interface PleuralEffusionPathologyPDFProps {
  patient: ExtendedPatient;
}

/**
 * Vérifie si une valeur est définie et non vide
 */
function hasValue(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "boolean") return value === true;
  return true;
}

/**
 * Formate une valeur pour l'affichage
 * Convertit les booléens true en "Oui"
 */
function formatValue(value: unknown): string {
  if (typeof value === "boolean") {
    return value ? "Oui" : "";
  }
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return value.toString();
  return String(value);
}

/**
 * Composant pour afficher un champ individuel
 */
function PDFField({ label, value }: { label: string; value: unknown }) {
  const hasVal = hasValue(value);

  // Ne pas afficher les booléens false
  if (typeof value === "boolean" && value === false) {
    return null;
  }

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{label}:</Text>
      <Text style={baseStyles.fieldValue}>
        {hasVal ? formatValue(value) : ""}
      </Text>
    </View>
  );
}

/**
 * Composant pour afficher une grille d'images
 */
function PDFImageGrid({ label, images }: { label: string; images: string[] }) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const getImageUrl = (imgPath: string): string => {
    if (imgPath.includes("firebasestorage.googleapis.com")) {
      try {
        const url = new URL(imgPath);
        const pathMatch = url.pathname.match(/\/v0\/b\/[^/]+\/o\/(.+)/);
        if (pathMatch) {
          const firebasePath = decodeURIComponent(pathMatch[1]);
          return `${BASE_URL}/api/images/${firebasePath}`;
        }
      } catch (error) {
        console.warn("Erreur lors de la conversion de l'URL Firebase:", error);
      }
    }

    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }

    return `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{label}:</Text>
      <View style={imageStyles.imageGrid}>
        {images.map((imgPath, index) => (
          <View key={index} style={imageStyles.imageContainer} break>
            <Image
              src={getImageUrl(imgPath)}
              style={imageStyles.image}
              cache={false}
            />
            <Text style={imageStyles.imageLabel}>
              {label} {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * Section Motif de Consultation
 */
function ConsultationReasonSection({
  patient,
}: PleuralEffusionPathologyPDFProps) {
  const consultationReason = getNestedValue(patient, "consultationReason") as
    | Record<string, unknown>
    | undefined;

  if (
    !consultationReason ||
    !Object.values(consultationReason).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Motif de Consultation</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Douleur basithoracique"
              value={consultationReason?.basiThoracicPain}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Dyspnée" value={consultationReason?.dyspnea} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Toux" value={consultationReason?.cough} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Autre" value={consultationReason?.other} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Antécédents
 */
function AntecedentsSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const tuberculosis = getNestedValue(patient, "tuberculosis") as
    | Record<string, unknown>
    | undefined;
  const tbContact = getNestedValue(patient, "tbContact") as
    | Record<string, unknown>
    | undefined;
  const pleurisyHistory = getNestedValue(patient, "pleurisyHistory") as
    | Record<string, unknown>
    | undefined;
  const medicalHistory = getNestedValue(patient, "medicalHistory") as
    | Record<string, unknown>
    | undefined;
  const smoking = getNestedValue(patient, "smoking") as
    | Record<string, unknown>
    | undefined;
  const substanceUse = getNestedValue(patient, "substanceUse") as
    | Record<string, unknown>
    | undefined;
  const otherHistory = getNestedValue(patient, "otherHistory") as
    | Record<string, unknown>
    | undefined;

  const hasTuberculosis =
    tuberculosis && Object.values(tuberculosis).some((v) => hasValue(v));
  const hasTbContact =
    tbContact && Object.values(tbContact).some((v) => hasValue(v));
  const hasPleurisyHistory =
    pleurisyHistory && Object.values(pleurisyHistory).some((v) => hasValue(v));
  const hasMedicalHistory =
    medicalHistory && Object.values(medicalHistory).some((v) => hasValue(v));
  const hasSmoking = smoking && Object.values(smoking).some((v) => hasValue(v));
  const hasSubstanceUse =
    substanceUse && Object.values(substanceUse).some((v) => hasValue(v));
  const hasOtherHistory =
    otherHistory && Object.values(otherHistory).some((v) => hasValue(v));

  if (
    !hasTuberculosis &&
    !hasTbContact &&
    !hasPleurisyHistory &&
    !hasMedicalHistory &&
    !hasSmoking &&
    !hasSubstanceUse &&
    !hasOtherHistory
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Antécédents</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        {/* Tuberculose */}
        {hasTuberculosis && (
          <>
            <Text style={baseStyles.subsectionTitle}>Tuberculose</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={tuberculosis?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Date" value={tuberculosis?.date} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Forme" value={tuberculosis?.form} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Traitement" value={tuberculosis?.treatment} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Évolution" value={tuberculosis?.evolution} />
              </View>
            </View>
          </>
        )}

        {/* Contage TB */}
        {hasTbContact && (
          <>
            <Text style={baseStyles.subsectionTitle}>Contage TB</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présent" value={tbContact?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Qui" value={tbContact?.who} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Forme" value={tbContact?.form} />
              </View>
            </View>
          </>
        )}

        {/* Antécédent de Pleurésie */}
        {hasPleurisyHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Antécédent de Pleurésie
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présent" value={pleurisyHistory?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Diagnostiqué"
                  value={pleurisyHistory?.diagnosed}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Diagnostic"
                  value={pleurisyHistory?.diagnosis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Traitement"
                  value={pleurisyHistory?.treatment}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Évolution"
                  value={pleurisyHistory?.evolution}
                />
              </View>
            </View>
          </>
        )}

        {/* Antécédents Médicaux */}
        {hasMedicalHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>Antécédents Médicaux</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="HTA" value={medicalHistory?.hta} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Diabète" value={medicalHistory?.diabetes} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Hépatopathie"
                  value={medicalHistory?.hepatopathy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Insuffisance rénale"
                  value={medicalHistory?.renalFailure}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Maladie générale"
                  value={medicalHistory?.generalDisease}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Type de maladie"
                  value={medicalHistory?.generalDiseaseType}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cardiopathie connue"
                  value={medicalHistory?.knownCardiopathy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Type de cardiopathie"
                  value={medicalHistory?.cardiopathyType}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Traitement cardiopathie"
                  value={medicalHistory?.cardiopathyTreatment}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Évolution cardiopathie"
                  value={medicalHistory?.cardiopathyEvolution}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cancer connu"
                  value={medicalHistory?.knownCancer}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Type et extension cancer"
                  value={medicalHistory?.cancerTypeExtension}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Traitement cancer"
                  value={medicalHistory?.cancerTreatment}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Évolution cancer"
                  value={medicalHistory?.cancerEvolution}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Médication chronique"
                  value={medicalHistory?.chronicMedication}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Molécules"
                  value={medicalHistory?.medicationMolecules}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Exposition professionnelle"
                  value={medicalHistory?.professionalExposure}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Description exposition"
                  value={medicalHistory?.exposureDescription}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Autres maladies"
                  value={medicalHistory?.otherDiseases}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Type autres maladies"
                  value={medicalHistory?.otherDiseasesType}
                />
              </View>
            </View>
          </>
        )}

        {/* Tabagisme */}
        {hasSmoking && (
          <>
            <Text style={baseStyles.subsectionTitle}>Tabagisme</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Actif" value={smoking?.active} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cigarette"
                  value={(smoking?.type as Record<string, unknown>)?.cigarette}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chicha"
                  value={(smoking?.type as Record<string, unknown>)?.chicha}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tabac à chiquer"
                  value={
                    (smoking?.type as Record<string, unknown>)?.chewingTobacco
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tabac à priser"
                  value={
                    (smoking?.type as Record<string, unknown>)?.sniffingTobacco
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Âge de début" value={smoking?.startAge} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Paquet-années" value={smoking?.packYears} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Arrêté" value={smoking?.stopped} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée d'arrêt"
                  value={smoking?.stoppedDuration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Passif" value={smoking?.passive} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Passif - Domicile"
                  value={
                    (smoking?.passiveLocation as Record<string, unknown>)?.home
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Passif - Travail"
                  value={
                    (smoking?.passiveLocation as Record<string, unknown>)?.work
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Passif - Lieu public"
                  value={
                    (smoking?.passiveLocation as Record<string, unknown>)
                      ?.publicPlace
                  }
                />
              </View>
            </View>
          </>
        )}

        {/* Autres substances */}
        {hasSubstanceUse && (
          <>
            <Text style={baseStyles.subsectionTitle}>Autres Substances</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Cannabis" value={substanceUse?.cannabis} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Fréquence cannabis"
                  value={substanceUse?.cannabisFrequency}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cannabis arrêté"
                  value={substanceUse?.cannabisStopped}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée arrêt cannabis"
                  value={substanceUse?.cannabisStoppedDuration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Alcool" value={substanceUse?.alcohol} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Alcool arrêté"
                  value={substanceUse?.alcoholStopped}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée arrêt alcool"
                  value={substanceUse?.alcoholStoppedDuration}
                />
              </View>
            </View>
          </>
        )}

        {/* Autres antécédents */}
        {hasOtherHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>Autres Antécédents</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Gynéco-obstétrique"
                  value={otherHistory?.gynecoObstetric}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Chirurgical" value={otherHistory?.surgical} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Détails chirurgicaux"
                  value={otherHistory?.surgicalDetails}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Familial" value={otherHistory?.family} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Détails familiaux"
                  value={otherHistory?.familyDetails}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

/**
 * Section Examen Clinique
 */
function ClinicalExamSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const pleuralClinicalExam = getNestedValue(patient, "pleuralClinicalExam") as
    | Record<string, unknown>
    | undefined;

  if (
    !pleuralClinicalExam ||
    !Object.values(pleuralClinicalExam).some((v) => hasValue(v))
  ) {
    return null;
  }

  const generalSigns = pleuralClinicalExam?.generalSigns as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examen Clinique</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        {/* Signes Fonctionnels */}
        <Text style={baseStyles.subsectionTitle}>Signes Fonctionnels</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Dyspnée" value={pleuralClinicalExam?.dyspnea} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Stade Sadoul"
              value={pleuralClinicalExam?.dyspneaSadoulStage}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Douleur basithoracique"
              value={pleuralClinicalExam?.basiThoracicPain}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Localisation douleur"
              value={pleuralClinicalExam?.painLocation}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Type douleur"
              value={pleuralClinicalExam?.painType}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Toux" value={pleuralClinicalExam?.cough} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Type toux"
              value={pleuralClinicalExam?.coughType}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Expectoration"
              value={pleuralClinicalExam?.expectoration}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Hémoptysie"
              value={pleuralClinicalExam?.hemoptysis}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Abondance hémoptysie"
              value={pleuralClinicalExam?.hemoptysisAbundance}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Autres signes"
              value={pleuralClinicalExam?.otherSigns}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Description autres signes"
              value={pleuralClinicalExam?.otherSignsDescription}
            />
          </View>
        </View>

        {/* Signes Généraux */}
        {generalSigns &&
          Object.values(generalSigns).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Signes Généraux</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Asthénie" value={generalSigns?.asthenia} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="AMG" value={generalSigns?.amg} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Anorexie" value={generalSigns?.anorexia} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Fièvre" value={generalSigns?.fever} />
                </View>
              </View>
            </>
          )}

        {/* État Clinique */}
        <Text style={baseStyles.subsectionTitle}>État Clinique</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="PS OMS" value={pleuralClinicalExam?.psOms} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="État hémodynamique"
              value={pleuralClinicalExam?.hemodynamicState}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="SaO2" value={pleuralClinicalExam?.sao2} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Fréquence respiratoire"
              value={pleuralClinicalExam?.respiratoryRate}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Lutte respiratoire"
              value={pleuralClinicalExam?.respiratoryStruggle}
            />
          </View>
        </View>

        {/* État Respiratoire */}
        <Text style={baseStyles.subsectionTitle}>État Respiratoire</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Syndrome d'épanchement liquidien"
              value={pleuralClinicalExam?.liquidEffusionSyndrome}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Localisation épanchement"
              value={pleuralClinicalExam?.liquidEffusionLocation}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Syndrome d'épanchement mixte"
              value={pleuralClinicalExam?.mixedEffusionSyndrome}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Localisation mixte"
              value={pleuralClinicalExam?.mixedEffusionLocation}
            />
          </View>
        </View>

        {/* Autres examens */}
        <Text style={baseStyles.subsectionTitle}>Autres Examens</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Examen cardio"
              value={pleuralClinicalExam?.cardioExam}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Description cardio"
              value={pleuralClinicalExam?.cardioExamDescription}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Examen abdominal"
              value={pleuralClinicalExam?.abdominalExam}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Ascite" value={pleuralClinicalExam?.ascites} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Autres findings abdominaux"
              value={pleuralClinicalExam?.otherAbdominalFindings}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Ganglions"
              value={pleuralClinicalExam?.lymphNodes}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Localisation ganglions"
              value={pleuralClinicalExam?.lymphNodesLocation}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres examens"
              value={pleuralClinicalExam?.otherExams}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Radiographie Thoracique
 */
function ChestXRaySection({ patient }: PleuralEffusionPathologyPDFProps) {
  const chestXRay = getNestedValue(patient, "chestXRay") as
    | Record<string, unknown>
    | undefined;

  if (!chestXRay || !Object.values(chestXRay).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Radiographie Thoracique</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Localisation pleurésie"
              value={chestXRay?.pleurisyLocation}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Autre localisation"
              value={chestXRay?.pleurisyLocationOther}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Abondance" value={chestXRay?.abundance} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Autres anomalies"
              value={chestXRay?.otherAnomalies}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Description autres anomalies"
              value={chestXRay?.otherAnomaliesDescription}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Imagerie
 */
function ImagingSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const imaging = getNestedValue(patient, "imaging") as
    | Record<string, unknown>
    | undefined;

  if (!imaging || !Object.values(imaging).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Imagerie</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Écho thoracique" value={imaging?.thoracicEcho} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultats écho thoracique"
              value={imaging?.thoracicEchoResults}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Scanner thoracique" value={imaging?.thoracicCT} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultats scanner"
              value={imaging?.thoracicCTResults}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Écho abdominal" value={imaging?.abdominalEcho} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultats écho abdominal"
              value={imaging?.abdominalEchoResults}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="ETT" value={imaging?.ett} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Résultats ETT" value={imaging?.ettResults} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Autre imagerie" value={imaging?.otherImaging} />
          </View>
        </View>

        {/* Images Écho Thoracique */}
        {hasValue(imaging?.thoracicEchoImages) && (
          <PDFImageGrid
            label="Écho Thoracique - Images"
            images={imaging.thoracicEchoImages as string[]}
          />
        )}

        {/* Images Scanner */}
        {hasValue(imaging?.thoracicCTImages) && (
          <PDFImageGrid
            label="Scanner Thoracique - Images"
            images={imaging.thoracicCTImages as string[]}
          />
        )}

        {/* Images Écho Abdominal */}
        {hasValue(imaging?.abdominalEchoImages) && (
          <PDFImageGrid
            label="Écho Abdominal - Images"
            images={imaging.abdominalEchoImages as string[]}
          />
        )}

        {/* Images ETT */}
        {hasValue(imaging?.ettImages) && (
          <PDFImageGrid
            label="ETT - Images"
            images={imaging.ettImages as string[]}
          />
        )}

        {/* Images Autre Imagerie */}
        {hasValue(imaging?.otherImagingImages) && (
          <PDFImageGrid
            label="Autre Imagerie - Images"
            images={imaging.otherImagingImages as string[]}
          />
        )}
      </View>
    </View>
  );
}

/**
 * Section Ponction Pleurale
 */
function PleuralPunctureSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const pleuralPuncture = getNestedValue(patient, "pleuralPuncture") as
    | Record<string, unknown>
    | undefined;

  if (
    !pleuralPuncture ||
    !Object.values(pleuralPuncture).some((v) => hasValue(v))
  ) {
    return null;
  }

  const aspect = pleuralPuncture?.aspect as Record<string, unknown> | undefined;
  const biochemistry = pleuralPuncture?.biochemistry as
    | Record<string, unknown>
    | undefined;
  const cytology = pleuralPuncture?.cytology as
    | Record<string, unknown>
    | undefined;
  const mycoBacteriology = pleuralPuncture?.mycoBacteriology as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Ponction Pleurale</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date" value={pleuralPuncture?.date} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="État" value={pleuralPuncture?.state} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Quantité évacuée (ml)"
              value={pleuralPuncture?.evacuatedAmount}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Biopsie pleurale"
              value={pleuralPuncture?.pleuralBiopsy}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Résultats anapath"
              value={pleuralPuncture?.anapathResults}
            />
          </View>
        </View>

        {/* Aspect */}
        {aspect && Object.values(aspect).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Aspect</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Clair" value={aspect?.clear} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Jaune citron" value={aspect?.jc} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Jaune" value={aspect?.yellow} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Séro-hémorragique"
                  value={aspect?.seroHemorrhagic}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Hémorragique" value={aspect?.hemorrhagic} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Trouble" value={aspect?.troubled} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Chyleux" value={aspect?.chylous} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Purulent" value={aspect?.purulent} />
              </View>
            </View>
          </>
        )}

        {/* Biochimie */}
        {biochemistry &&
          Object.values(biochemistry).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Biochimie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Protéines (g/L)"
                    value={biochemistry?.proteins}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="LDH (UI/L)" value={biochemistry?.ldh} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Glucose (g/L)"
                    value={biochemistry?.glucose}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Autres" value={biochemistry?.others} />
                </View>
              </View>
            </>
          )}

        {/* Cytologie */}
        {cytology && Object.values(cytology).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Cytologie</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Hématies (/mm³)"
                  value={cytology?.redBloodCells}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Leucocytes (/mm³)"
                  value={cytology?.whiteBloodCells}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Lymphocytes (%)"
                  value={cytology?.lymphocytes}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Polynucléaires neutrophiles (%)"
                  value={cytology?.neutrophils}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Éosinophiles (%)"
                  value={cytology?.eosinophils}
                />
              </View>
            </View>
          </>
        )}

        {/* Mycobactériologie */}
        {mycoBacteriology &&
          Object.values(mycoBacteriology).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Mycobactériologie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="BK ED" value={mycoBacteriology?.bkED} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Résultat BK ED"
                    value={mycoBacteriology?.bkEDResult}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="BK Culture"
                    value={mycoBacteriology?.bkCulture}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Résultat BK Culture"
                    value={mycoBacteriology?.bkCultureResult}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Autres" value={mycoBacteriology?.others} />
                </View>
              </View>
            </>
          )}
      </View>
    </View>
  );
}

/**
 * Section Biologie
 */
function BiologySection({ patient }: PleuralEffusionPathologyPDFProps) {
  const biology = getNestedValue(patient, "biology") as
    | Record<string, unknown>
    | undefined;

  if (!biology || !Object.values(biology).some((v) => hasValue(v))) {
    return null;
  }

  const cbc = biology?.cbc as Record<string, unknown> | undefined;
  const liverFunction = biology?.liverFunction as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Biologie</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        {/* Tests TB */}
        <Text style={baseStyles.subsectionTitle}>Tests Tuberculose</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="IDRT" value={biology?.idrt} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Résultat IDRT (mm)" value={biology?.idrtResult} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Quantiferon" value={biology?.quantiferon} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultat Quantiferon"
              value={biology?.quantiferonResult}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="BK ED Crachats" value={biology?.bkEDSputum} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultat BK ED Crachats"
              value={biology?.bkEDSputumResult}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="BK C Crachats" value={biology?.bkCSputum} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultat BK C Crachats"
              value={biology?.bkCSputumResult}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="GeneXpert" value={biology?.geneXpert} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Résultat GeneXpert"
              value={biology?.geneXpertResult}
            />
          </View>
        </View>

        {/* NFS */}
        {cbc && Object.values(cbc).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>NFS</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Hémoglobine (g/dL)" value={cbc?.hemoglobin} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="GB (/mm³)" value={cbc?.whiteBloodCells} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="PN (%) (Neutrophiles)"
                  value={cbc?.neutrophils}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Lymphocytes (%)" value={cbc?.lymphocytes} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Éosinophiles (%)" value={cbc?.eosinophils} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Plaquettes (/mm³)" value={cbc?.platelets} />
              </View>
            </View>
          </>
        )}

        {/* Hémostase et Biochimie */}
        <Text style={baseStyles.subsectionTitle}>Hémostase et Biochimie</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="TP (%)" value={biology?.tp} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="D-Dimères (ng/mL)" value={biology?.dDimers} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Albuminémie (g/L)" value={biology?.albuminemia} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Protéines (g/L)" value={biology?.proteins} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="LDH (UI/L)" value={biology?.ldh} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="CRP (mg/L)" value={biology?.crp} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="VS (mm)" value={biology?.esr} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Procalcitonine (ng/mL)"
              value={biology?.procalcitonin}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Sérologie VIH" value={biology?.hivSerology} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Urée (mmol/L)" value={biology?.urea} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Créatininémie (µmol/L)"
              value={biology?.creatinine}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="BNP" value={biology?.bnp} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Valeur BNP (pg/mL)" value={biology?.bnpValue} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Glycémie (g/L)" value={biology?.glucose} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Protéinurie 24h" value={biology?.proteinuria24h} />
          </View>
        </View>

        {/* Fonction hépatique */}
        {liverFunction &&
          Object.values(liverFunction).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Fonction Hépatique</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="ALAT (UI/L)" value={liverFunction?.alat} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="ASAT (UI/L)" value={liverFunction?.asat} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="GGT (UI/L)" value={liverFunction?.ggt} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="PAL (UI/L)" value={liverFunction?.alp} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Bilirubine directe (µmol/L)"
                    value={liverFunction?.directBilirubin}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Bilirubine indirecte (µmol/L)"
                    value={liverFunction?.indirectBilirubin}
                  />
                </View>
              </View>
            </>
          )}

        {/* Immunologie */}
        <Text style={baseStyles.subsectionTitle}>Immunologie</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Immunologie" value={biology?.immunology} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails immunologie"
              value={biology?.immunologyDetails}
            />
          </View>
        </View>

        {/* Autres */}
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Autres biologies" value={biology?.otherBiology} />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Autres Explorations
 */
function OtherAssessmentsSection({
  patient,
}: PleuralEffusionPathologyPDFProps) {
  const otherAssessments = getNestedValue(patient, "otherAssessments") as
    | Record<string, unknown>
    | undefined;

  if (
    !otherAssessments ||
    !Object.values(otherAssessments).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Autres Explorations</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Fibroscopie bronchique"
              value={otherAssessments?.bronchialFibroscopy}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails fibroscopie"
              value={otherAssessments?.bronchialFibroscopyDetails}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Bilan post-fibroscopie"
              value={otherAssessments?.postBronchoscopyAssessment}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Thoracoscopie"
              value={otherAssessments?.thoracoscopy}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails thoracoscopie"
              value={otherAssessments?.thoracoscopyDetails}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Bilan post-thoracoscopie"
              value={otherAssessments?.postThoracoscopyAssessment}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres bilans"
              value={otherAssessments?.otherAssessments}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Diagnostic
 */
function DiagnosisSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const diagnosis = getNestedValue(patient, "diagnosis") as
    | Record<string, unknown>
    | undefined;

  if (!diagnosis || !Object.values(diagnosis).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Diagnostic</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Type" value={diagnosis?.type} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Cancer primitif"
              value={diagnosis?.primaryCancer}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autre diagnostic"
              value={diagnosis?.otherDiagnosis}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Traitement
 */
function TreatmentSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const treatment = getNestedValue(patient, "treatment") as
    | Record<string, unknown>
    | undefined;

  if (!treatment || !Object.values(treatment).some((v) => hasValue(v))) {
    return null;
  }

  const types = treatment?.types as Record<string, unknown> | undefined;
  const surgeryType = types?.surgeryType as Record<string, unknown> | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Traitement</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        {/* Types de traitement */}
        {types && (
          <>
            <Text style={baseStyles.subsectionTitle}>Types de Traitement</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ponctions itératives"
                  value={types?.iterativePuncture}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Infiltration intrapleurale"
                  value={types?.intraPleuralInfiltration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Drainage" value={types?.drainage} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Antalgiques" value={types?.analgesics} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antituberculeux"
                  value={types?.antituberculosis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antibiothérapie non spécifique"
                  value={types?.nonSpecificAntibiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antibiothérapie guidée"
                  value={types?.guidedAntibiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Kinésithérapie pleurale"
                  value={types?.pleuralPhysiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Nombre de séances"
                  value={types?.physiotherapySessions}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Chirurgie" value={types?.surgery} />
              </View>
            </View>

            {/* Types de chirurgie */}
            {surgeryType &&
              Object.values(surgeryType).some((v) => hasValue(v)) && (
                <>
                  <Text style={baseStyles.subsectionTitle}>
                    Types de Chirurgie
                  </Text>
                  <View style={baseStyles.grid}>
                    <View style={baseStyles.gridItem}>
                      <PDFField label="Talcage" value={surgeryType?.talpage} />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField
                        label="Rafraîchissement"
                        value={surgeryType?.refreshing}
                      />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField
                        label="Décortication"
                        value={surgeryType?.decortication}
                      />
                    </View>
                  </View>
                </>
              )}

            <View style={baseStyles.gridItemFull}>
              <PDFField label="Autres" value={types?.others} />
            </View>
          </>
        )}

        {/* Date et protocole */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date de début" value={treatment?.startDate} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Protocole" value={treatment?.protocol} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Évolution
 */
function EvolutionSection({ patient }: PleuralEffusionPathologyPDFProps) {
  const evolution = getNestedValue(patient, "evolution") as
    | Record<string, unknown>
    | undefined;

  if (!evolution || !Object.values(evolution).some((v) => hasValue(v))) {
    return null;
  }

  const outcome = evolution?.outcome as Record<string, unknown> | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Évolution</Text>
      <View style={pathologyStyles.pleuralEffusionSection}>
        {/* Issue */}
        {outcome && Object.values(outcome).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Issue</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Complication iatrogène"
                  value={outcome?.iatrogenicComplication}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Suppuration pariétale"
                  value={outcome?.parietalSuppuration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Guérison" value={outcome?.recovery} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Régression" value={outcome?.regression} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Enkystement" value={outcome?.encystment} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Pachypleurite"
                  value={outcome?.pachypleuritis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Récidive" value={outcome?.recurrence} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Perdu de vue"
                  value={outcome?.lostToFollowUp}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Décès" value={outcome?.death} />
              </View>
            </View>
          </>
        )}

        {/* Autres détails */}
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Autres détails" value={evolution?.otherDetails} />
        </View>
      </View>
    </View>
  );
}

/**
 * Composant principal pour la pathologie Épanchement Pleural
 */
export function PleuralEffusionPathologyPDF({
  patient,
}: PleuralEffusionPathologyPDFProps) {
  return (
    <View>
      <ConsultationReasonSection patient={patient} />
      <AntecedentsSection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ChestXRaySection patient={patient} />
      <ImagingSection patient={patient} />
      <PleuralPunctureSection patient={patient} />
      <BiologySection patient={patient} />
      <OtherAssessmentsSection patient={patient} />
      <DiagnosisSection patient={patient} />
      <TreatmentSection patient={patient} />
      <EvolutionSection patient={patient} />
    </View>
  );
}
