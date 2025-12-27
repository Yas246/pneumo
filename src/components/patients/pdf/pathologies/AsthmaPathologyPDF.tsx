/**
 * Composant PDF pour la pathologie Asthme
 * Affiche toutes les données du formulaire asthma de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles } from "../styles";

interface AsthmaPathologyPDFProps {
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
 * Composant pour afficher un champ avec tableau de valeurs
 */
function PDFFieldArray({ label, value }: { label: string; value: string[] }) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <View style={baseStyles.gridItemFull}>
      <PDFField label={label} value={value.join(", ")} />
    </View>
  );
}

/**
 * Composant pour afficher conditionnellement un champ avec tableau
 */
function ConditionalPDFFieldArray({
  label,
  value,
}: {
  label: string;
  value: unknown;
}) {
  if (Array.isArray(value) && value.length > 0) {
    return <PDFFieldArray label={label} value={value as string[]} />;
  }
  return null;
}

/**
 * Composant pour afficher une grille d'images
 * Les images prennent toute la largeur du document en respectant le ratio 16:9
 */
function PDFImageGrid({ label, images }: { label: string; images: string[] }) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  /**
   * Obtient l'URL complète de l'image
   * Convertit les URLs Firebase en URLs de proxy pour le PDF
   */
  const getImageUrl = (imgPath: string): string => {
    // Si l'URL est une URL Firebase Storage, la convertir en URL de proxy
    if (imgPath.includes("firebasestorage.googleapis.com")) {
      try {
        // Extraire le chemin du fichier depuis l'URL Firebase
        const url = new URL(imgPath);
        // Le chemin Firebase est dans le pathname, après /v0/b/bucket/o/
        const pathMatch = url.pathname.match(/\/v0\/b\/[^/]+\/o\/(.+)/);
        if (pathMatch) {
          const firebasePath = decodeURIComponent(pathMatch[1]);
          // Retourner l'URL de notre proxy
          return `${BASE_URL}/api/images/${firebasePath}`;
        }
      } catch (error) {
        console.warn("Erreur lors de la conversion de l'URL Firebase:", error);
      }
    }

    // Pour les autres URLs (locales), les utiliser directement
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }

    // Sinon, construire l'URL locale en ajoutant le slash si nécessaire
    return `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  return (
    <View style={baseStyles.field}>
      <Text style={baseStyles.fieldLabel}>{label}:</Text>
      <View style={imageStyles.imageGrid}>
        {images.map((imgPath, index) => (
          <View key={index} style={imageStyles.imageContainer} break>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
 * Section II. Motif de consultation
 */
function ConsultationReasonSection({ patient }: AsthmaPathologyPDFProps) {
  const consultationReason = getNestedValue(
    patient,
    "asthmaConsultationReason"
  ) as Record<string, unknown> | undefined;

  if (
    !consultationReason ||
    !Object.values(consultationReason).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>II. Motif de consultation</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Dyspnée expiratoire"
            value={consultationReason?.expiratoryDyspnea}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Toux sèche" value={consultationReason?.dryCough} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Crise nocturne"
            value={consultationReason?.nocturnalCrisis}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Oppression thoracique"
            value={consultationReason?.thoracicOppression}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Autre" value={consultationReason?.other} />
        </View>
        {hasValue(consultationReason?.otherDetails) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails autre motif"
              value={consultationReason?.otherDetails}
            />
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Section III. Antécédents
 */
function MedicalHistorySection({ patient }: AsthmaPathologyPDFProps) {
  const medicalHistory = getNestedValue(patient, "asthmaMedicalHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !medicalHistory ||
    !Object.values(medicalHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>III. Antécédents</Text>

      <Text style={baseStyles.subsectionTitle}>Médicaux</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Asthme connu" value={medicalHistory?.knownAsthma} />
        </View>
        {hasValue(medicalHistory?.asthmaSince) && (
          <View style={baseStyles.gridItem}>
            <PDFField label="Depuis" value={medicalHistory?.asthmaSince} />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Rhinite allergique"
            value={medicalHistory?.allergicRhinitis}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Eczéma / Dermatite atopique"
            value={medicalHistory?.eczemaAtopicDermatitis}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="RGO" value={medicalHistory?.gerd} />
        </View>
        {hasValue(medicalHistory?.other) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Autre" value={medicalHistory?.other} />
          </View>
        )}
      </View>

      {hasValue(medicalHistory?.surgicalHistory) && (
        <>
          <Text style={baseStyles.subsectionTitle}>Chirurgicaux</Text>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Antécédents chirurgicaux"
              value={medicalHistory?.surgicalHistory}
            />
          </View>
        </>
      )}

      <Text style={baseStyles.subsectionTitle}>Allergies connues</Text>
      <View style={baseStyles.grid}>
        <ConditionalPDFFieldArray
          label="Allergènes respiratoires"
          value={medicalHistory?.respiratoryAllergens}
        />
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Allergie à la poussière"
            value={medicalHistory?.dustAllergy}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Allergies médicamenteuses"
            value={medicalHistory?.drugAllergies}
          />
        </View>
        {hasValue(medicalHistory?.drugAllergiesDetails) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails allergies médicamenteuses"
              value={medicalHistory?.drugAllergiesDetails}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Autres allergies"
            value={medicalHistory?.otherAllergies}
          />
        </View>
        {hasValue(medicalHistory?.otherAllergiesDetails) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails autres allergies"
              value={medicalHistory?.otherAllergiesDetails}
            />
          </View>
        )}
      </View>

      <Text style={baseStyles.subsectionTitle}>Antécédents familiaux</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Parent asthmatique"
            value={medicalHistory?.parentAsthmatic}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Atopie familiale"
            value={medicalHistory?.familyAtopy}
          />
        </View>
        <ConditionalPDFFieldArray
          label="Autres antécédents familiaux"
          value={medicalHistory?.familyHistory}
        />
        {hasValue(medicalHistory?.familyOther) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Autre" value={medicalHistory?.familyOther} />
          </View>
        )}
      </View>

      <Text style={baseStyles.subsectionTitle}>Tabac</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Statut tabagique"
            value={medicalHistory?.smokingStatus}
          />
        </View>
        {hasValue(medicalHistory?.tobaccoQuantity) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Quantité (PA)"
              value={medicalHistory?.tobaccoQuantity}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Tabagisme passif"
            value={medicalHistory?.passiveSmoking}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Cannabis" value={medicalHistory?.cannabis} />
        </View>
        {hasValue(medicalHistory?.otherToxic) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres toxiques"
              value={medicalHistory?.otherToxic}
            />
          </View>
        )}
      </View>

      <ConditionalPDFFieldArray
        label="Affections ORL"
        value={medicalHistory?.orlAffection}
      />

      {hasValue(medicalHistory?.endocrineFactors) && (
        <>
          <Text style={baseStyles.subsectionTitle}>Facteurs endocriniens</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Facteurs endocriniens"
                value={medicalHistory?.endocrineFactors}
              />
            </View>
            <ConditionalPDFFieldArray
              label="Détails facteurs endocriniens"
              value={medicalHistory?.endocrineFactorsDetails}
            />
          </View>
        </>
      )}

      {hasValue(medicalHistory?.professionalExposure) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Exposition professionnelle
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Exposition professionnelle"
                value={medicalHistory?.professionalExposure}
              />
            </View>
            {hasValue(medicalHistory?.professionalExposureDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails exposition professionnelle"
                  value={medicalHistory?.professionalExposureDetails}
                />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

/**
 * Section IV. Histoire de la maladie
 */
function DiseaseHistorySection({ patient }: AsthmaPathologyPDFProps) {
  const diseaseHistory = getNestedValue(patient, "asthmaDiseaseHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !diseaseHistory ||
    !Object.values(diseaseHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>IV. Histoire de la maladie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Début d'apparition"
            value={diseaseHistory?.firstSymptomOnset}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Évolution" value={diseaseHistory?.evolution} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Hospitalisations antérieures"
            value={diseaseHistory?.previousHospitalizations}
          />
        </View>
        {hasValue(diseaseHistory?.hospitalizationsCount) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Nombre d'hospitalisations"
              value={diseaseHistory?.hospitalizationsCount}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Symptôme d'apparition"
            value={diseaseHistory?.symptomOnset}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Fréquence des crises"
            value={diseaseHistory?.crisisFrequency}
          />
        </View>
        <ConditionalPDFFieldArray
          label="Moment des crises"
          value={diseaseHistory?.crisisTiming}
        />
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Durée d'une crise"
            value={diseaseHistory?.crisisDuration}
          />
        </View>
        <ConditionalPDFFieldArray
          label="Facteurs déclenchants"
          value={diseaseHistory?.triggeringFactors}
        />
        {hasValue(diseaseHistory?.otherTriggeringFactor) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres facteurs déclenchants"
              value={diseaseHistory?.otherTriggeringFactor}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Réponse aux bronchodilatateurs"
            value={diseaseHistory?.sabaResponse}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Hospitalisations / Urgences"
            value={diseaseHistory?.hospitalUrgency}
          />
        </View>
        {hasValue(diseaseHistory?.hospitalUrgencyCount) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Nombre d'urgences"
              value={diseaseHistory?.hospitalUrgencyCount}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Intubation ou réanimation"
            value={diseaseHistory?.intubationResuscitation}
          />
        </View>
        {hasValue(diseaseHistory?.intubationCount) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Nombre d'intubations"
              value={diseaseHistory?.intubationCount}
            />
          </View>
        )}
        {hasValue(diseaseHistory?.otherDiseaseHistory) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autre (Histoire de la maladie)"
              value={diseaseHistory?.otherDiseaseHistory}
            />
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Section V. Examen clinique
 */
function ClinicalExamSection({ patient }: AsthmaPathologyPDFProps) {
  const generalState = getNestedValue(patient, "asthmaGeneralState") as
    | Record<string, unknown>
    | undefined;
  const respiratorySystem = getNestedValue(
    patient,
    "asthmaRespiratorySystem"
  ) as Record<string, unknown> | undefined;
  const cardiovascularSystem = getNestedValue(
    patient,
    "asthmaCardiovascularSystem"
  ) as Record<string, unknown> | undefined;
  const digestiveSystem = getNestedValue(patient, "asthmaDigestiveSystem") as
    | Record<string, unknown>
    | undefined;
  const urinarySystem = getNestedValue(patient, "asthmaUrinarySystem") as
    | Record<string, unknown>
    | undefined;
  const musculoskeletalSystem = getNestedValue(
    patient,
    "asthmaMusculoskeletalSystem"
  ) as Record<string, unknown> | undefined;
  const nervousSystem = getNestedValue(patient, "asthmaNervousSystem") as
    | Record<string, unknown>
    | undefined;
  const skinMucous = getNestedValue(patient, "asthmaSkinMucous") as
    | Record<string, unknown>
    | undefined;
  const orlEyesMouth = getNestedValue(patient, "asthmaOrlEyesMouth") as
    | Record<string, unknown>
    | undefined;
  const otherRemarks = getNestedValue(patient, "asthmaOtherClinicalRemarks") as
    | Record<string, unknown>
    | undefined;

  const hasGeneralState =
    generalState && Object.values(generalState).some((v) => hasValue(v));
  const hasRespiratorySystem =
    respiratorySystem &&
    Object.values(respiratorySystem).some((v) => hasValue(v));
  const hasCardiovascularSystem =
    cardiovascularSystem &&
    Object.values(cardiovascularSystem).some((v) => hasValue(v));
  const hasDigestiveSystem =
    digestiveSystem && Object.values(digestiveSystem).some((v) => hasValue(v));
  const hasUrinarySystem =
    urinarySystem && Object.values(urinarySystem).some((v) => hasValue(v));
  const hasMusculoskeletalSystem =
    musculoskeletalSystem &&
    Object.values(musculoskeletalSystem).some((v) => hasValue(v));
  const hasNervousSystem =
    nervousSystem && Object.values(nervousSystem).some((v) => hasValue(v));
  const hasSkinMucous =
    skinMucous && Object.values(skinMucous).some((v) => hasValue(v));
  const hasOrlEyesMouth =
    orlEyesMouth && Object.values(orlEyesMouth).some((v) => hasValue(v));
  const hasOtherRemarks =
    otherRemarks && Object.values(otherRemarks).some((v) => hasValue(v));

  if (
    !hasGeneralState &&
    !hasRespiratorySystem &&
    !hasCardiovascularSystem &&
    !hasDigestiveSystem &&
    !hasUrinarySystem &&
    !hasMusculoskeletalSystem &&
    !hasNervousSystem &&
    !hasSkinMucous &&
    !hasOrlEyesMouth &&
    !hasOtherRemarks
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>V. Examen clinique</Text>

      {hasGeneralState && (
        <>
          <Text style={baseStyles.subsectionTitle}>1. État général</Text>
          <View style={baseStyles.grid}>
            <ConditionalPDFFieldArray
              label="État de conscience"
              value={generalState?.consciousness}
            />
            <View style={baseStyles.gridItem}>
              <PDFField label="Asthénie" value={generalState?.asthenia} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Altération de l'état général"
                value={generalState?.generalStateAlteration}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Pression artérielle"
                value={generalState?.bloodPressure}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Fréquence cardiaque"
                value={generalState?.heartRate}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Température" value={generalState?.temperature} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="SpO2 (%)" value={generalState?.spO2} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Poids (kg)" value={generalState?.weight} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Taille (cm)" value={generalState?.height} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="IMC" value={generalState?.bmi} />
            </View>
          </View>
        </>
      )}

      {hasRespiratorySystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            2. Appareil respiratoire
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Murmure vésiculaire"
                value={respiratorySystem?.vesicularMurmur}
              />
            </View>
            <ConditionalPDFFieldArray
              label="Anomalies auscultatoires"
              value={respiratorySystem?.auscultationAnomalies}
            />
            <ConditionalPDFFieldArray
              label="Signes de détresse respiratoire"
              value={respiratorySystem?.respiratoryDistressSigns}
            />
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Syndrome de condensation"
                value={respiratorySystem?.syndromeCondensation}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Syndrome pleural"
                value={respiratorySystem?.syndromePleural}
              />
            </View>
            {hasValue(respiratorySystem?.syndromeLocation) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Localisation syndromes"
                  value={respiratorySystem?.syndromeLocation}
                />
              </View>
            )}
            {hasValue(respiratorySystem?.otherRespiratory) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autre (Appareil respiratoire)"
                  value={respiratorySystem?.otherRespiratory}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasCardiovascularSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            3. Appareil cardiovasculaire
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="BDC réguliers"
                value={cardiovascularSystem?.regularBdc}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Souffle cardiaque"
                value={cardiovascularSystem?.heartMurmur}
              />
            </View>
            {hasValue(cardiovascularSystem?.murmurTiming) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Moment du souffle"
                  value={cardiovascularSystem?.murmurTiming}
                />
              </View>
            )}
            <ConditionalPDFFieldArray
              label="Localisation du souffle"
              value={cardiovascularSystem?.murmurLocation}
            />
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Type de souffle"
                value={cardiovascularSystem?.murmurType}
              />
            </View>
            {hasValue(cardiovascularSystem?.murmurIntensity) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Intensité du souffle"
                  value={cardiovascularSystem?.murmurIntensity}
                />
              </View>
            )}
            {hasValue(cardiovascularSystem?.murmurIrradiation) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Irradiation du souffle"
                  value={cardiovascularSystem?.murmurIrradiation}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Bruits assourdis"
                value={cardiovascularSystem?.muffledNoises}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Frottement péricardique"
                value={cardiovascularSystem?.pericardialFriction}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Rythme irrégulier"
                value={cardiovascularSystem?.irregularRhythm}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Œdèmes des membres inférieurs"
                value={cardiovascularSystem?.lowerLimbEdema}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="RHJ" value={cardiovascularSystem?.rhj} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="TJ+" value={cardiovascularSystem?.tjPlus} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Marbrures"
                value={cardiovascularSystem?.marbling}
              />
            </View>
          </View>
        </>
      )}

      {hasDigestiveSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>4. Appareil digestif</Text>
          <View style={baseStyles.grid}>
            <ConditionalPDFFieldArray
              label="Inspection (Abdomen)"
              value={digestiveSystem?.abdomenInspection}
            />
            <ConditionalPDFFieldArray
              label="Palpation (Abdomen)"
              value={digestiveSystem?.abdomenPalpation}
            />
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Hépatomégalie"
                value={digestiveSystem?.hepatomegaly}
              />
            </View>
            {hasValue(digestiveSystem?.hepatomegalySize) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Taille hépatomégalie (cm)"
                  value={digestiveSystem?.hepatomegalySize}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Splénomégalie"
                value={digestiveSystem?.splenomegaly}
              />
            </View>
            {hasValue(digestiveSystem?.splenomegalySize) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Taille splénomégalie (cm)"
                  value={digestiveSystem?.splenomegalySize}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Matité déclive"
                value={digestiveSystem?.matiteDeclive}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Tympanisme"
                value={digestiveSystem?.tympanisme}
              />
            </View>
            <ConditionalPDFFieldArray
              label="Auscultation (Abdomen)"
              value={digestiveSystem?.abdomenAuscultation}
            />
          </View>
        </>
      )}

      {hasUrinarySystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>5. Appareil urinaire</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField label="Diurèse" value={urinarySystem?.diuresis} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Globe vésical"
                value={urinarySystem?.bladderGlobe}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="PU/BU réalisé"
                value={urinarySystem?.puBuPerformed}
              />
            </View>
            <ConditionalPDFFieldArray
              label="Signes fonctionnels urinaires"
              value={urinarySystem?.urinaryFunctionalSigns}
            />
            {hasValue(urinarySystem?.puBuResult) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Résultat (PU/BU)"
                  value={urinarySystem?.puBuResult}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasMusculoskeletalSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>6. Appareil locomoteur</Text>
          <View style={baseStyles.grid}>
            <ConditionalPDFFieldArray
              label="Symptômes"
              value={musculoskeletalSystem?.symptoms}
            />
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Mobilité"
                value={musculoskeletalSystem?.mobility}
              />
            </View>
            {hasValue(musculoskeletalSystem?.affectedJoints) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Articulations concernées"
                  value={musculoskeletalSystem?.affectedJoints}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasNervousSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>7. Système nerveux</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="État de conscience"
                value={nervousSystem?.consciousness}
              />
            </View>
            <ConditionalPDFFieldArray
              label="Signes neurologiques"
              value={nervousSystem?.neurologicalSigns}
            />
            {hasValue(nervousSystem?.motorDeficit) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Déficit moteur"
                  value={nervousSystem?.motorDeficit}
                />
              </View>
            )}
            {hasValue(nervousSystem?.sensoryDeficit) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Déficit sensitif"
                  value={nervousSystem?.sensoryDeficit}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField label="ROT" value={nervousSystem?.rot} />
            </View>
            {hasValue(nervousSystem?.rotDescription) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Description ROT"
                  value={nervousSystem?.rotDescription}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField label="Équilibre" value={nervousSystem?.balance} />
            </View>
          </View>
        </>
      )}

      {hasSkinMucous && (
        <>
          <Text style={baseStyles.subsectionTitle}>8. Peau et muqueuses</Text>
          <View style={baseStyles.grid}>
            <ConditionalPDFFieldArray
              label="Inspection"
              value={skinMucous?.inspection}
            />
            {hasValue(skinMucous?.dermatologicalLesions) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Lésions dermatologiques"
                  value={skinMucous?.dermatologicalLesions}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasOrlEyesMouth && (
        <>
          <Text style={baseStyles.subsectionTitle}>9. ORL / Yeux / Bouche</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Conjonctives"
                value={orlEyesMouth?.conjunctiva}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Amygdales" value={orlEyesMouth?.tonsils} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Muqueuses hydratées"
                value={orlEyesMouth?.muqueusesHydratees}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Sèches" value={orlEyesMouth?.seches} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Lésions" value={orlEyesMouth?.lesions} />
            </View>
            <ConditionalPDFFieldArray
              label="Symptômes ORL"
              value={orlEyesMouth?.orlSymptoms}
            />
          </View>
        </>
      )}

      {hasOtherRemarks && (
        <>
          <Text style={baseStyles.subsectionTitle}>10. Autres remarques</Text>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres remarques cliniques"
              value={otherRemarks?.otherClinicalRemarks}
            />
          </View>
        </>
      )}
    </View>
  );
}

/**
 * Section VI. Examens complémentaires
 */
function ComplementaryExamsSection({ patient }: AsthmaPathologyPDFProps) {
  const complementaryExams = getNestedValue(
    patient,
    "asthmaComplementaryExams"
  ) as Record<string, unknown> | undefined;

  if (
    !complementaryExams ||
    !Object.values(complementaryExams).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VI. Examens complémentaires</Text>

      <Text style={baseStyles.subsectionTitle}>Examens fonctionnels</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="DEP matin (L/min)"
            value={complementaryExams?.morningPef}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="DEP soir (L/min)"
            value={complementaryExams?.eveningPef}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="EFR - Obstruction réversible"
            value={complementaryExams?.efrReversibleObstruction}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="EFR - VEMS" value={complementaryExams?.efrVems} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="EFR - VEMS/CV (%)"
            value={complementaryExams?.efrVemsCv}
          />
        </View>
      </View>

      <Text style={baseStyles.subsectionTitle}>Imagerie - Rx thorax</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Résultat" value={complementaryExams?.chestXray} />
        </View>
        {hasValue(complementaryExams?.chestXrayOther) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autre (image)"
              value={complementaryExams?.chestXrayOther}
            />
          </View>
        )}
      </View>
      {hasValue(complementaryExams?.chestXrayImages) &&
        Array.isArray(complementaryExams.chestXrayImages) &&
        complementaryExams.chestXrayImages.length > 0 && (
          <PDFImageGrid
            label="Radiographie thoracique"
            images={complementaryExams.chestXrayImages as string[]}
          />
        )}

      <Text style={baseStyles.subsectionTitle}>Biologie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="NFS - Hyperéosinophilie"
            value={complementaryExams?.nfsHyperEosinophilia}
          />
        </View>
        {hasValue(complementaryExams?.hyperEosinophiliaValue) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Valeur (/mm³)"
              value={complementaryExams?.hyperEosinophiliaValue}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="IgE totales (UI/mL)"
            value={complementaryExams?.totalIge}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Test de réversibilité"
            value={complementaryExams?.reversibilityTest}
          />
        </View>
        {hasValue(complementaryExams?.variationPercentage) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Variation (%)"
              value={complementaryExams?.variationPercentage}
            />
          </View>
        )}
        {hasValue(complementaryExams?.variationMl) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Variation (ml)"
              value={complementaryExams?.variationMl}
            />
          </View>
        )}
      </View>
      {hasValue(complementaryExams?.positivePrickTests) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Prick-tests allergènes positifs"
            value={complementaryExams?.positivePrickTests}
          />
        </View>
      )}

      {hasValue(complementaryExams?.specificIgePerformed) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            IgE sériques spécifiques
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Réalisé"
                value={complementaryExams?.specificIgePerformed}
              />
            </View>
            {hasValue(complementaryExams?.specificIgeDust) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Poussière de maison"
                  value={complementaryExams?.specificIgeDust}
                />
              </View>
            )}
            {hasValue(complementaryExams?.specificIgeMitesDp) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Acariens (DP)"
                  value={complementaryExams?.specificIgeMitesDp}
                />
              </View>
            )}
            {hasValue(complementaryExams?.specificIgeMitesDf) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Acariens (DF)"
                  value={complementaryExams?.specificIgeMitesDf}
                />
              </View>
            )}
            {hasValue(complementaryExams?.specificIgePollen) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Pollens"
                  value={complementaryExams?.specificIgePollen}
                />
              </View>
            )}
            {hasValue(complementaryExams?.specificIgeOther) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres"
                  value={complementaryExams?.specificIgeOther}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasValue(complementaryExams?.idr) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            IDR (Intradermoréaction)
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField label="Résultat" value={complementaryExams?.idr} />
            </View>
            {hasValue(complementaryExams?.idrPositiveDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Si positif"
                  value={complementaryExams?.idrPositiveDetails}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasValue(complementaryExams?.blondScannerPerformed) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            BLONDO-SCANNER (ou Rx des sinus)
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Réalisé"
                value={complementaryExams?.blondScannerPerformed}
              />
            </View>
            {hasValue(complementaryExams?.blondScannerResult) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Résultat"
                  value={complementaryExams?.blondScannerResult}
                />
              </View>
            )}
          </View>
          {hasValue(complementaryExams?.blondScannerImages) &&
            Array.isArray(complementaryExams.blondScannerImages) &&
            complementaryExams.blondScannerImages.length > 0 && (
              <PDFImageGrid
                label="BLONDO-SCANNER"
                images={complementaryExams.blondScannerImages as string[]}
              />
            )}
        </>
      )}

      {hasValue(complementaryExams?.thoracicCtdPerformed) && (
        <>
          <Text style={baseStyles.subsectionTitle}>TDM thoracique</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Réalisé"
                value={complementaryExams?.thoracicCtdPerformed}
              />
            </View>
            {hasValue(complementaryExams?.thoracicCtdConclusion) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Conclusion"
                  value={complementaryExams?.thoracicCtdConclusion}
                />
              </View>
            )}
          </View>
          {hasValue(complementaryExams?.thoracicCtdImages) &&
            Array.isArray(complementaryExams.thoracicCtdImages) &&
            complementaryExams.thoracicCtdImages.length > 0 && (
              <PDFImageGrid
                label="TDM thoracique"
                images={complementaryExams.thoracicCtdImages as string[]}
              />
            )}
        </>
      )}

      {hasValue(complementaryExams?.otherComplementaryExams) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres (Examens complémentaires)"
            value={complementaryExams?.otherComplementaryExams}
          />
        </View>
      )}
    </View>
  );
}

/**
 * Section VII. Classification de la gravité
 */
function DiagnosisSection({ patient }: AsthmaPathologyPDFProps) {
  const severityClassification = getNestedValue(
    patient,
    "asthmaSeverityClassification"
  ) as Record<string, unknown> | undefined;

  if (
    !severityClassification ||
    !Object.values(severityClassification).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        VII. Classification de la gravité
      </Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asthme allergique"
            value={severityClassification?.allergicAsthma}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asthme non allergique"
            value={severityClassification?.nonAllergicAsthma}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asthme intermittent"
            value={severityClassification?.intermittentAsthma}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asthme persistant"
            value={severityClassification?.persistentAsthmaSeverity}
          />
        </View>
        {hasValue(severityClassification?.persistentAsthmaSeverity) &&
          typeof severityClassification.persistentAsthmaSeverity === "string" &&
          severityClassification.persistentAsthmaSeverity !== "oui" &&
          severityClassification.persistentAsthmaSeverity !== "non" && (
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Sévérité asthme persistant"
                value={severityClassification?.persistentAsthmaSeverity}
              />
            </View>
          )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asthme induit par l'effort"
            value={severityClassification?.exerciseInducedAsthma}
          />
        </View>
        {hasValue(severityClassification?.otherForms) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres formes"
              value={severityClassification?.otherForms}
            />
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Section VIII. Traitement
 */
function TreatmentSection({ patient }: AsthmaPathologyPDFProps) {
  const treatment = getNestedValue(patient, "asthmaTreatment") as
    | Record<string, unknown>
    | undefined;

  if (!treatment || !Object.values(treatment).some((v) => hasValue(v))) {
    return null;
  }

  const maintenanceTreatment = treatment?.maintenanceTreatment as
    | Record<string, unknown>
    | undefined;
  const crisisTreatment = treatment?.crisisTreatment as
    | Record<string, unknown>
    | undefined;
  const associatedMeasures = treatment?.associatedMeasures as
    | string[]
    | undefined;

  const hasMaintenanceTreatment =
    maintenanceTreatment &&
    Object.values(maintenanceTreatment).some((v) => hasValue(v));
  const hasCrisisTreatment =
    crisisTreatment && Object.values(crisisTreatment).some((v) => hasValue(v));
  const hasAssociatedMeasures =
    associatedMeasures && associatedMeasures.length > 0;

  if (
    !hasMaintenanceTreatment &&
    !hasCrisisTreatment &&
    !hasAssociatedMeasures
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VIII. Traitement</Text>

      {hasMaintenanceTreatment && (
        <>
          <Text style={baseStyles.subsectionTitle}>Traitement de fond</Text>
          <View style={baseStyles.grid}>
            {hasValue(maintenanceTreatment?.inhaledCorticosteroids) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Corticoïdes inhalés"
                  value={maintenanceTreatment?.inhaledCorticosteroids}
                />
              </View>
            )}
            {hasValue(maintenanceTreatment?.csiDose) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Dose (CSI) (µg)"
                  value={maintenanceTreatment?.csiDose}
                />
              </View>
            )}
            {hasValue(maintenanceTreatment?.csiFrequency) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Fréquence (CSI) (/j)"
                  value={maintenanceTreatment?.csiFrequency}
                />
              </View>
            )}
            {hasValue(maintenanceTreatment?.laba) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Bêta-2 longue durée (LABA)"
                  value={maintenanceTreatment?.laba}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Anti-leucotriènes"
                value={maintenanceTreatment?.antiLeukotrienes}
              />
            </View>
            {hasValue(maintenanceTreatment?.otherMaintenance) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres (Traitement de fond)"
                  value={maintenanceTreatment?.otherMaintenance}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasCrisisTreatment && (
        <>
          <Text style={baseStyles.subsectionTitle}>Traitement de crise</Text>
          <View style={baseStyles.grid}>
            {hasValue(crisisTreatment?.salbutamolInstruction) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Instruction Salbutamol 100 µg"
                  value={crisisTreatment?.salbutamolInstruction}
                />
              </View>
            )}
            {hasValue(crisisTreatment?.otherCrisis) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres (Traitement de crise)"
                  value={crisisTreatment?.otherCrisis}
                />
              </View>
            )}
          </View>
        </>
      )}

      {hasAssociatedMeasures && (
        <>
          <Text style={baseStyles.subsectionTitle}>Mesures associées</Text>
          <PDFFieldArray label="Mesures associées" value={associatedMeasures} />
        </>
      )}
    </View>
  );
}

/**
 * Section IX. Suivi
 */
function FollowUpSection({ patient }: AsthmaPathologyPDFProps) {
  const followUp = getNestedValue(patient, "asthmaFollowUp") as
    | Record<string, unknown>
    | undefined;

  if (!followUp || !Object.values(followUp).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>IX. Suivi</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Prochaine consultation"
            value={followUp?.nextConsultation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Délai prochaine spirométrie (semaines)"
            value={followUp?.spirometryDelay}
          />
        </View>
        {hasValue(followUp?.controlObjective) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Objectif de contrôle (ACT)"
              value={followUp?.controlObjective}
            />
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Composant principal pour la pathologie Asthme
 */
export function AsthmaPathologyPDF({ patient }: AsthmaPathologyPDFProps) {
  return (
    <View>
      <ConsultationReasonSection patient={patient} />
      <MedicalHistorySection patient={patient} />
      <DiseaseHistorySection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ComplementaryExamsSection patient={patient} />
      <DiagnosisSection patient={patient} />
      <TreatmentSection patient={patient} />
      <FollowUpSection patient={patient} />
    </View>
  );
}
