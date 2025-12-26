/**
 * Composant PDF pour la pathologie BPCO (Broncho-pneumopathie Chronique Obstructive)
 * Affiche toutes les données du formulaire BPCO de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles } from "../styles";

interface BPCOPathologyPDFProps {
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
function ConsultationReasonSection({ patient }: BPCOPathologyPDFProps) {
  const consultationReason = getNestedValue(
    patient,
    "bpcoConsultationReason"
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
            label="Toux chronique"
            value={consultationReason?.chronicCough}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Bronchite chronique"
            value={consultationReason?.chronicBronchitis}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Dyspnée chronique"
            value={consultationReason?.chronicDyspnea}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Aggravation dyspnée aiguë"
            value={consultationReason?.acuteDyspneaAggravation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Infections respiratoires fréquentes"
            value={consultationReason?.frequentRespiratoryInfections}
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
function MedicalHistorySection({ patient }: BPCOPathologyPDFProps) {
  const medicalHistory = getNestedValue(patient, "bpcoMedicalHistory") as
    | Record<string, unknown>
    | undefined;
  const exposure = getNestedValue(patient, "bpcoExposure") as
    | Record<string, unknown>
    | undefined;
  const otherMedicalHistory = getNestedValue(
    patient,
    "bpcoOtherMedicalHistory"
  ) as Record<string, unknown> | undefined;
  const surgicalHistory = getNestedValue(patient, "bpcoSurgicalHistory") as
    | Record<string, unknown>
    | undefined;
  const vaccination = getNestedValue(patient, "bpcoVaccination") as
    | Record<string, unknown>
    | undefined;
  const toxicHistory = getNestedValue(patient, "bpcoToxicHistory") as
    | Record<string, unknown>
    | undefined;
  const familyHistory = getNestedValue(patient, "bpcoFamilyHistory") as
    | Record<string, unknown>
    | undefined;

  const hasMedicalHistory =
    medicalHistory && Object.values(medicalHistory).some((v) => hasValue(v));
  const hasExposure =
    exposure && Object.values(exposure).some((v) => hasValue(v));
  const hasOtherMedicalHistory =
    otherMedicalHistory &&
    Object.values(otherMedicalHistory).some((v) => hasValue(v));
  const hasSurgicalHistory =
    surgicalHistory && Object.values(surgicalHistory).some((v) => hasValue(v));
  const hasVaccination =
    vaccination && Object.values(vaccination).some((v) => hasValue(v));
  const hasToxicHistory =
    toxicHistory && Object.values(toxicHistory).some((v) => hasValue(v));
  const hasFamilyHistory =
    familyHistory && Object.values(familyHistory).some((v) => hasValue(v));

  if (
    !hasMedicalHistory &&
    !hasExposure &&
    !hasOtherMedicalHistory &&
    !hasSurgicalHistory &&
    !hasVaccination &&
    !hasToxicHistory &&
    !hasFamilyHistory
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>III. Antécédents</Text>

      {/* Personnels médicaux - Antécédents respiratoires */}
      {hasMedicalHistory && (
        <>
          <Text style={baseStyles.subsectionTitle}>Personnels médicaux</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField label="Asthme" value={medicalHistory?.asthma} />
            </View>
            {hasValue(medicalHistory?.asthmaExacerbationsPerYear) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Exacerbations asthme/an"
                  value={medicalHistory?.asthmaExacerbationsPerYear}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField label="BPCO" value={medicalHistory?.bpco} />
            </View>
            {hasValue(medicalHistory?.bpcoExacerbationsPerYear) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Exacerbations BPCO/an"
                  value={medicalHistory?.bpcoExacerbationsPerYear}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Tuberculose"
                value={medicalHistory?.tuberculosis}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Pneumonies" value={medicalHistory?.pneumonias} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Infections respiratoires récidivantes"
                value={medicalHistory?.recurrentRespiratoryInfections}
              />
            </View>
          </View>
        </>
      )}

      {/* Exposition */}
      {hasExposure && (
        <>
          <Text style={baseStyles.subsectionTitle}>Exposition</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Polluants professionnels"
                value={exposure?.professionalPollutants}
              />
            </View>
            {hasValue(exposure?.professionalPollutantsDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails polluants professionnels"
                  value={exposure?.professionalPollutantsDetails}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Polluants domestiques"
                value={exposure?.domesticPollutants}
              />
            </View>
            {hasValue(exposure?.domesticPollutantsDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails polluants domestiques"
                  value={exposure?.domesticPollutantsDetails}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Polluants urbains"
                value={exposure?.urbanPollutants}
              />
            </View>
            {hasValue(exposure?.urbanPollutantsDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails polluants urbains"
                  value={exposure?.urbanPollutantsDetails}
                />
              </View>
            )}
          </View>
        </>
      )}

      {/* Autres antécédents médicaux */}
      {hasOtherMedicalHistory && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Autres antécédents médicaux
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField label="RGO" value={otherMedicalHistory?.gerd} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Hépatopathie"
                value={otherMedicalHistory?.hepatopathy}
              />
            </View>
            {hasValue(otherMedicalHistory?.hepatopathyDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails hépatopathie"
                  value={otherMedicalHistory?.hepatopathyDetails}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Néphropathie"
                value={otherMedicalHistory?.nephropathy}
              />
            </View>
            {hasValue(otherMedicalHistory?.nephropathyDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails néphropathie"
                  value={otherMedicalHistory?.nephropathyDetails}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Cardiopathie"
                value={otherMedicalHistory?.cardiopathy}
              />
            </View>
            {hasValue(otherMedicalHistory?.cardiopathyDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails cardiopathie"
                  value={otherMedicalHistory?.cardiopathyDetails}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Maladie du tissu conjonctif"
                value={otherMedicalHistory?.connectiveTissueDisease}
              />
            </View>
            {hasValue(otherMedicalHistory?.connectiveTissueDiseaseDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails maladie tissu conjonctif"
                  value={otherMedicalHistory?.connectiveTissueDiseaseDetails}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Néoplasie"
                value={otherMedicalHistory?.neoplasia}
              />
            </View>
            {hasValue(otherMedicalHistory?.neoplasiaDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails néoplasie"
                  value={otherMedicalHistory?.neoplasiaDetails}
                />
              </View>
            )}
            {hasValue(otherMedicalHistory?.other) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Autre" value={otherMedicalHistory?.other} />
              </View>
            )}
          </View>
        </>
      )}

      {/* Antécédents chirurgicaux */}
      {hasSurgicalHistory && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Antécédents chirurgicaux
          </Text>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Détails" value={surgicalHistory?.details} />
          </View>
        </>
      )}

      {/* Vaccination */}
      {hasVaccination && (
        <>
          <Text style={baseStyles.subsectionTitle}>Vaccination</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Grippe annuelle"
                value={vaccination?.annualFlu}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Pneumocoque" value={vaccination?.pneumococcus} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="SARS-CoV-2" value={vaccination?.sarsCov2} />
            </View>
          </View>
        </>
      )}

      {/* Toxique */}
      {hasToxicHistory && (
        <>
          <Text style={baseStyles.subsectionTitle}>Toxique</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Statut tabagique"
                value={toxicHistory?.smokingStatus}
              />
            </View>
            {hasValue(toxicHistory?.packYears) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Paquet-années"
                  value={toxicHistory?.packYears}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField label="Cannabis" value={toxicHistory?.cannabis} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Alcool" value={toxicHistory?.alcohol} />
            </View>
          </View>
        </>
      )}

      {/* Familiaux */}
      {hasFamilyHistory && (
        <>
          <Text style={baseStyles.subsectionTitle}>Familiaux</Text>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Détails" value={familyHistory?.details} />
          </View>
        </>
      )}
    </View>
  );
}

/**
 * Section IV. Histoire de la maladie
 */
function DiseaseHistorySection({ patient }: BPCOPathologyPDFProps) {
  const diseaseHistory = getNestedValue(patient, "bpcoDiseaseHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !diseaseHistory ||
    !Object.values(diseaseHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  const triggeringFactors = diseaseHistory?.triggeringFactors as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>IV. Histoire de la maladie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Date d'apparition des symptômes"
            value={diseaseHistory?.firstSymptomsDate}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Évolution" value={diseaseHistory?.evolution} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Exacerbations/an"
            value={diseaseHistory?.exacerbationsPerYear}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Hospitalisations pour BPCO"
            value={diseaseHistory?.hospitalizationsForBpco}
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
            label="Dyspnée mMRC (0-4)"
            value={diseaseHistory?.dyspneaMmrc}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Aspect expectoration"
            value={diseaseHistory?.expectorationAspect}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Abondance expectoration"
            value={diseaseHistory?.expectorationAbundance}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Hémoptysie" value={diseaseHistory?.hemoptysis} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Douleur thoracique"
            value={diseaseHistory?.chestPain}
          />
        </View>
        {hasValue(diseaseHistory?.associatedSigns) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Signes associés"
              value={diseaseHistory?.associatedSigns}
            />
          </View>
        )}
      </View>

      {/* Facteurs déclenchants */}
      {triggeringFactors &&
        Object.values(triggeringFactors).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Facteurs déclenchants
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Tabac" value={triggeringFactors?.tobacco} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Pollution"
                  value={triggeringFactors?.pollution}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Professionnel"
                  value={triggeringFactors?.professional}
                />
              </View>
            </View>
          </>
        )}
    </View>
  );
}

/**
 * Section V. Examen clinique
 */
function ClinicalExamSection({ patient }: BPCOPathologyPDFProps) {
  const generalState = getNestedValue(patient, "bpcoGeneralState") as
    | Record<string, unknown>
    | undefined;
  const respiratorySystem = getNestedValue(patient, "bpcoRespiratorySystem") as
    | Record<string, unknown>
    | undefined;
  const cardiovascularSystem = getNestedValue(
    patient,
    "bpcoCardiovascularSystem"
  ) as Record<string, unknown> | undefined;
  const digestiveSystem = getNestedValue(patient, "bpcoDigestiveSystem") as
    | Record<string, unknown>
    | undefined;
  const urinarySystem = getNestedValue(patient, "bpcoUrinarySystem") as
    | Record<string, unknown>
    | undefined;
  const musculoskeletalSystem = getNestedValue(
    patient,
    "bpcoMusculoskeletalSystem"
  ) as Record<string, unknown> | undefined;
  const nervousSystem = getNestedValue(patient, "bpcoNervousSystem") as
    | Record<string, unknown>
    | undefined;
  const skinMucous = getNestedValue(patient, "bpcoSkinMucous") as
    | Record<string, unknown>
    | undefined;
  const entEyesMouth = getNestedValue(patient, "bpcoEntEyesMouth") as
    | Record<string, unknown>
    | undefined;
  const otherRemarks = getNestedValue(patient, "bpcoOtherClinicalRemarks") as
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
  const hasEntEyesMouth =
    entEyesMouth && Object.values(entEyesMouth).some((v) => hasValue(v));
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
    !hasEntEyesMouth &&
    !hasOtherRemarks
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>V. Examen clinique</Text>

      {/* 1. État général */}
      {hasGeneralState && (
        <>
          <Text style={baseStyles.subsectionTitle}>1. État général</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Score de performance"
                value={generalState?.performanceScore}
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
            <View style={baseStyles.gridItem}>
              <PDFField label="Asthenie" value={generalState?.asthenia} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Altération état général"
                value={generalState?.generalStateAlteration}
              />
            </View>
          </View>

          {/* État de conscience */}
          {generalState?.consciousnessState &&
            Object.values(
              generalState.consciousnessState as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  État de conscience
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Bonne conscience"
                      value={
                        (
                          generalState.consciousnessState as Record<
                            string,
                            unknown
                          >
                        )?.goodConsciousness
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Confusion"
                      value={
                        (
                          generalState.consciousnessState as Record<
                            string,
                            unknown
                          >
                        )?.confusion
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 2. Appareil respiratoire */}
      {hasRespiratorySystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            2. Appareil respiratoire
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Thorax en tonneau"
                value={respiratorySystem?.barrelChest}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Signe de Campbell"
                value={respiratorySystem?.campbellSign}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Signe de Hoover"
                value={respiratorySystem?.hooverSign}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Murmure vésiculaire"
                value={respiratorySystem?.vesicularMurmur}
              />
            </View>
            {hasValue(respiratorySystem?.syndromesLocation) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Localisation syndromes"
                  value={respiratorySystem?.syndromesLocation}
                />
              </View>
            )}
          </View>

          {/* Anomalies auscultation */}
          {respiratorySystem?.auscultationAbnormalities &&
            Object.values(
              respiratorySystem.auscultationAbnormalities as Record<
                string,
                unknown
              >
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Anomalies auscultation
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Râles crépitants"
                      value={
                        (
                          respiratorySystem.auscultationAbnormalities as Record<
                            string,
                            unknown
                          >
                        )?.crepitantRales
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Râles sibilants"
                      value={
                        (
                          respiratorySystem.auscultationAbnormalities as Record<
                            string,
                            unknown
                          >
                        )?.rhonchi
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Sifflements"
                      value={
                        (
                          respiratorySystem.auscultationAbnormalities as Record<
                            string,
                            unknown
                          >
                        )?.wheezes
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Signes de détresse respiratoire */}
          {respiratorySystem?.respiratoryDistressSigns &&
            Object.values(
              respiratorySystem.respiratoryDistressSigns as Record<
                string,
                unknown
              >
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Signes de détresse respiratoire
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Dyspnée au repos"
                      value={
                        (
                          respiratorySystem.respiratoryDistressSigns as Record<
                            string,
                            unknown
                          >
                        )?.dyspneaAtRest
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Orthopnée"
                      value={
                        (
                          respiratorySystem.respiratoryDistressSigns as Record<
                            string,
                            unknown
                          >
                        )?.orthopnea
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Tirage"
                      value={
                        (
                          respiratorySystem.respiratoryDistressSigns as Record<
                            string,
                            unknown
                          >
                        )?.chestRetraction
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Cyanose"
                      value={
                        (
                          respiratorySystem.respiratoryDistressSigns as Record<
                            string,
                            unknown
                          >
                        )?.cyanosis
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Syndromes pleuro-pulmonaires */}
          {respiratorySystem?.pleuropulmonarySyndromes &&
            Object.values(
              respiratorySystem.pleuropulmonarySyndromes as Record<
                string,
                unknown
              >
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Syndromes pleuro-pulmonaires
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Syndrome de condensation"
                      value={
                        (
                          respiratorySystem.pleuropulmonarySyndromes as Record<
                            string,
                            unknown
                          >
                        )?.condensationSyndrome
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Syndrome pleural"
                      value={
                        (
                          respiratorySystem.pleuropulmonarySyndromes as Record<
                            string,
                            unknown
                          >
                        )?.pleuralSyndrome
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 3. Appareil cardiovasculaire */}
      {hasCardiovascularSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            3. Appareil cardiovasculaire
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Bruit du cœur régulier"
                value={cardiovascularSystem?.regularHeartSounds}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Souffle cardiaque"
                value={cardiovascularSystem?.heartMurmur}
              />
            </View>
            {hasValue(cardiovascularSystem?.heartMurmurTiming) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Timing souffle"
                  value={cardiovascularSystem?.heartMurmurTiming}
                />
              </View>
            )}
            {hasValue(cardiovascularSystem?.heartMurmurIntensity) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Intensité souffle"
                  value={cardiovascularSystem?.heartMurmurIntensity}
                />
              </View>
            )}
            {hasValue(cardiovascularSystem?.heartMurmurRadiation) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Rayonnement souffle"
                  value={cardiovascularSystem?.heartMurmurRadiation}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Bruits assourdis"
                value={cardiovascularSystem?.muffledSounds}
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
                label="Œdèmes membres inférieurs"
                value={cardiovascularSystem?.lowerLimbEdema}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Reflux hépato-jugulaire"
                value={cardiovascularSystem?.hepatojugularReflux}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Turgescence jugulaire"
                value={cardiovascularSystem?.jugularTurgescence}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Marbrures"
                value={cardiovascularSystem?.marbling}
              />
            </View>
          </View>

          {/* Localisation souffle */}
          {cardiovascularSystem?.heartMurmurLocation &&
            Object.values(
              cardiovascularSystem.heartMurmurLocation as Record<
                string,
                unknown
              >
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Localisation souffle
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Apex"
                      value={
                        (
                          cardiovascularSystem.heartMurmurLocation as Record<
                            string,
                            unknown
                          >
                        )?.apex
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Aortique"
                      value={
                        (
                          cardiovascularSystem.heartMurmurLocation as Record<
                            string,
                            unknown
                          >
                        )?.aortic
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Pulmonaire"
                      value={
                        (
                          cardiovascularSystem.heartMurmurLocation as Record<
                            string,
                            unknown
                          >
                        )?.pulmonary
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Tricuspide"
                      value={
                        (
                          cardiovascularSystem.heartMurmurLocation as Record<
                            string,
                            unknown
                          >
                        )?.tricuspid
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Type souffle */}
          {cardiovascularSystem?.heartMurmurType &&
            Object.values(
              cardiovascularSystem.heartMurmurType as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Type souffle</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Mitral"
                      value={
                        (
                          cardiovascularSystem.heartMurmurType as Record<
                            string,
                            unknown
                          >
                        )?.mitral
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Aortique"
                      value={
                        (
                          cardiovascularSystem.heartMurmurType as Record<
                            string,
                            unknown
                          >
                        )?.aortic
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Tricuspide"
                      value={
                        (
                          cardiovascularSystem.heartMurmurType as Record<
                            string,
                            unknown
                          >
                        )?.tricuspid
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Pulmonaire"
                      value={
                        (
                          cardiovascularSystem.heartMurmurType as Record<
                            string,
                            unknown
                          >
                        )?.pulmonary
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 4. Appareil digestif */}
      {hasDigestiveSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>4. Appareil digestif</Text>
          <View style={baseStyles.grid}>
            {hasValue(digestiveSystem?.hepatomegalySize) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Taille hépatomégalie (cm)"
                  value={digestiveSystem?.hepatomegalySize}
                />
              </View>
            )}
            {hasValue(digestiveSystem?.splenomegalySize) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Taille splénomégalie (cm)"
                  value={digestiveSystem?.splenomegalySize}
                />
              </View>
            )}
          </View>

          {/* Inspection abdomen */}
          {digestiveSystem?.abdomenInspection &&
            Object.values(
              digestiveSystem.abdomenInspection as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Inspection abdomen
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Plat"
                      value={
                        (
                          digestiveSystem.abdomenInspection as Record<
                            string,
                            unknown
                          >
                        )?.flat
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Distendu"
                      value={
                        (
                          digestiveSystem.abdomenInspection as Record<
                            string,
                            unknown
                          >
                        )?.distended
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Cicatrices"
                      value={
                        (
                          digestiveSystem.abdomenInspection as Record<
                            string,
                            unknown
                          >
                        )?.scars
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Hernie"
                      value={
                        (
                          digestiveSystem.abdomenInspection as Record<
                            string,
                            unknown
                          >
                        )?.hernia
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Palpation abdomen */}
          {digestiveSystem?.abdomenPalpation &&
            Object.values(
              digestiveSystem.abdomenPalpation as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Palpation abdomen
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Mou"
                      value={
                        (
                          digestiveSystem.abdomenPalpation as Record<
                            string,
                            unknown
                          >
                        )?.soft
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Défense"
                      value={
                        (
                          digestiveSystem.abdomenPalpation as Record<
                            string,
                            unknown
                          >
                        )?.defense
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Contracture"
                      value={
                        (
                          digestiveSystem.abdomenPalpation as Record<
                            string,
                            unknown
                          >
                        )?.contracture
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Masse"
                      value={
                        (
                          digestiveSystem.abdomenPalpation as Record<
                            string,
                            unknown
                          >
                        )?.mass
                      }
                    />
                  </View>
                </View>
              </>
            )}

          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Hépatomégalie"
                value={digestiveSystem?.hepatomegaly}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Splénomégalie"
                value={digestiveSystem?.splenomegaly}
              />
            </View>
          </View>

          {/* Percussion abdomen */}
          {digestiveSystem?.abdomenPercussion &&
            Object.values(
              digestiveSystem.abdomenPercussion as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Percussion abdomen
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Matité déclive"
                      value={
                        (
                          digestiveSystem.abdomenPercussion as Record<
                            string,
                            unknown
                          >
                        )?.shiftingDullness
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Tympanisme"
                      value={
                        (
                          digestiveSystem.abdomenPercussion as Record<
                            string,
                            unknown
                          >
                        )?.tympanism
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Auscultation abdomen */}
          {digestiveSystem?.abdomenAuscultation &&
            Object.values(
              digestiveSystem.abdomenAuscultation as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Auscultation abdomen
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Bruits normaux"
                      value={
                        (
                          digestiveSystem.abdomenAuscultation as Record<
                            string,
                            unknown
                          >
                        )?.normalSounds
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Silence"
                      value={
                        (
                          digestiveSystem.abdomenAuscultation as Record<
                            string,
                            unknown
                          >
                        )?.silence
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Hyperpéristaltisme"
                      value={
                        (
                          digestiveSystem.abdomenAuscultation as Record<
                            string,
                            unknown
                          >
                        )?.hyperperistalsis
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 5. Appareil urinaire */}
      {hasUrinarySystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>5. Appareil urinaire</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Diurèse conservée"
                value={urinarySystem?.diuresisConserved}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Rétention" value={urinarySystem?.retention} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Globe vésical"
                value={urinarySystem?.bladderGlobe}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Banderelette urinaire"
                value={urinarySystem?.urinalysisDone}
              />
            </View>
          </View>

          {/* Symptômes urinaires */}
          {urinarySystem?.urinarySymptoms &&
            Object.values(
              urinarySystem.urinarySymptoms as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Symptômes urinaires
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Pollakiurie"
                      value={
                        (
                          urinarySystem.urinarySymptoms as Record<
                            string,
                            unknown
                          >
                        )?.pollakiuria
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Dysurie"
                      value={
                        (
                          urinarySystem.urinarySymptoms as Record<
                            string,
                            unknown
                          >
                        )?.dysuria
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Hématurie"
                      value={
                        (
                          urinarySystem.urinarySymptoms as Record<
                            string,
                            unknown
                          >
                        )?.hematuria
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Douleur lombaire"
                      value={
                        (
                          urinarySystem.urinarySymptoms as Record<
                            string,
                            unknown
                          >
                        )?.lumbarPain
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {hasValue(urinarySystem?.urinalysisResult) && (
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Résultat analyse urinaire"
                value={urinarySystem?.urinalysisResult}
              />
            </View>
          )}
        </>
      )}

      {/* 6. Appareil locomoteur */}
      {hasMusculoskeletalSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>6. Appareil locomoteur</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Mobilité"
                value={musculoskeletalSystem?.mobility}
              />
            </View>
            {hasValue(musculoskeletalSystem?.affectedJoints) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Articulations atteintes"
                  value={musculoskeletalSystem?.affectedJoints}
                />
              </View>
            )}
          </View>

          {/* Symptômes */}
          {musculoskeletalSystem?.symptoms &&
            Object.values(
              musculoskeletalSystem.symptoms as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Symptômes</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Douleurs articulaires"
                      value={
                        (
                          musculoskeletalSystem.symptoms as Record<
                            string,
                            unknown
                          >
                        )?.jointPain
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Arthrite"
                      value={
                        (
                          musculoskeletalSystem.symptoms as Record<
                            string,
                            unknown
                          >
                        )?.arthritis
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Myalgie"
                      value={
                        (
                          musculoskeletalSystem.symptoms as Record<
                            string,
                            unknown
                          >
                        )?.myalgia
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Déformation"
                      value={
                        (
                          musculoskeletalSystem.symptoms as Record<
                            string,
                            unknown
                          >
                        )?.deformity
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 7. Système nerveux */}
      {hasNervousSystem && (
        <>
          <Text style={baseStyles.subsectionTitle}>7. Système nerveux</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Conscience"
                value={nervousSystem?.consciousness}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Réflexes ostéo-tendineux"
                value={nervousSystem?.reflexesOsteotendineux}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Équilibre" value={nervousSystem?.equilibrium} />
            </View>
            {hasValue(nervousSystem?.motorDeficit) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Déficit moteur"
                  value={nervousSystem?.motorDeficit}
                />
              </View>
            )}
            {hasValue(nervousSystem?.sensoryDeficit) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Déficit sensitif"
                  value={nervousSystem?.sensoryDeficit}
                />
              </View>
            )}
            {hasValue(nervousSystem?.tendonReflexesDescription) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Description ROT"
                  value={nervousSystem?.tendonReflexesDescription}
                />
              </View>
            )}
            {hasValue(nervousSystem?.rotDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails ROT"
                  value={nervousSystem?.rotDetails}
                />
              </View>
            )}
          </View>

          {/* Signes neurologiques */}
          {nervousSystem?.neurologicalSigns &&
            Object.values(
              nervousSystem.neurologicalSigns as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Signes neurologiques
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Céphalées"
                      value={
                        (
                          nervousSystem.neurologicalSigns as Record<
                            string,
                            unknown
                          >
                        )?.headaches
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Vomissements"
                      value={
                        (
                          nervousSystem.neurologicalSigns as Record<
                            string,
                            unknown
                          >
                        )?.vomiting
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Raideur méningée"
                      value={
                        (
                          nervousSystem.neurologicalSigns as Record<
                            string,
                            unknown
                          >
                        )?.meningealRigidity
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Équilibre */}
          {nervousSystem?.balance &&
            Object.values(
              nervousSystem.balance as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Équilibre</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Normal"
                      value={
                        (nervousSystem.balance as Record<string, unknown>)
                          ?.normal
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Romberg +"
                      value={
                        (nervousSystem.balance as Record<string, unknown>)
                          ?.romberg
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Ataxie"
                      value={
                        (nervousSystem.balance as Record<string, unknown>)
                          ?.ataxia
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 8. Peau et muqueuses */}
      {hasSkinMucous && (
        <>
          <Text style={baseStyles.subsectionTitle}>8. Peau et muqueuses</Text>
          <View style={baseStyles.grid}>
            {hasValue(skinMucous?.skinLesions) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Lésions cutanées"
                  value={skinMucous?.skinLesions}
                />
              </View>
            )}
          </View>

          {/* Inspection */}
          {skinMucous?.inspection &&
            Object.values(
              skinMucous.inspection as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Inspection</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Ictère"
                      value={
                        (skinMucous.inspection as Record<string, unknown>)
                          ?.jaundice
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Cyanose"
                      value={
                        (skinMucous.inspection as Record<string, unknown>)
                          ?.cyanosis
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Pétéchies"
                      value={
                        (skinMucous.inspection as Record<string, unknown>)
                          ?.petechiae
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Purpura"
                      value={
                        (skinMucous.inspection as Record<string, unknown>)
                          ?.purpura
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Déshydratation"
                      value={
                        (skinMucous.inspection as Record<string, unknown>)
                          ?.dehydration
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 9. ORL / Yeux / Bouche */}
      {hasEntEyesMouth && (
        <>
          <Text style={baseStyles.subsectionTitle}>9. ORL / Yeux / Bouche</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Conjonctives"
                value={entEyesMouth?.conjunctiva}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Amygdales" value={entEyesMouth?.tonsils} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Muqueuses buccales hydratées"
                value={entEyesMouth?.oralCavityHydratedMucous}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Muqueuses buccales sèches"
                value={entEyesMouth?.oralCavityDryMucous}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Lésions buccales"
                value={entEyesMouth?.oralCavityLesions}
              />
            </View>
          </View>

          {/* Cavité orale */}
          {entEyesMouth?.oralCavity &&
            Object.values(
              entEyesMouth.oralCavity as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Cavité orale</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Muqueuses hydratées"
                      value={
                        (entEyesMouth.oralCavity as Record<string, unknown>)
                          ?.hydratedMucous
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Sèches"
                      value={
                        (entEyesMouth.oralCavity as Record<string, unknown>)
                          ?.dry
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Lésions"
                      value={
                        (entEyesMouth.oralCavity as Record<string, unknown>)
                          ?.lesions
                      }
                    />
                  </View>
                </View>
              </>
            )}

          {/* Symptômes ORL */}
          {entEyesMouth?.entSymptoms &&
            Object.values(
              entEyesMouth.entSymptoms as Record<string, unknown>
            ).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Symptômes ORL</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Otalgie"
                      value={
                        (entEyesMouth.entSymptoms as Record<string, unknown>)
                          ?.earache
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Rhinorrhée"
                      value={
                        (entEyesMouth.entSymptoms as Record<string, unknown>)
                          ?.rhinorrhea
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Adénopathie cervicale"
                      value={
                        (entEyesMouth.entSymptoms as Record<string, unknown>)
                          ?.cervicalAdenopathy
                      }
                    />
                  </View>
                </View>
              </>
            )}
        </>
      )}

      {/* 10. Autres remarques */}
      {hasOtherRemarks && (
        <>
          <Text style={baseStyles.subsectionTitle}>10. Autres remarques</Text>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Détails" value={otherRemarks?.details} />
          </View>
        </>
      )}
    </View>
  );
}

/**
 * Section VI. Examens complémentaires
 */
function ComplementaryExamsSection({ patient }: BPCOPathologyPDFProps) {
  const diagnosticTests = getNestedValue(patient, "bpcoDiagnosticTests") as
    | Record<string, unknown>
    | undefined;
  const impactAssessment = getNestedValue(patient, "bpcoImpactAssessment") as
    | Record<string, unknown>
    | undefined;

  const hasDiagnosticTests =
    diagnosticTests && Object.values(diagnosticTests).some((v) => hasValue(v));
  const hasImpactAssessment =
    impactAssessment &&
    Object.values(impactAssessment).some((v) => hasValue(v));

  if (!hasDiagnosticTests && !hasImpactAssessment) {
    return null;
  }

  const spirometry = diagnosticTests?.spirometry as
    | Record<string, unknown>
    | undefined;
  const plethysmography = diagnosticTests?.plethysmography as
    | Record<string, unknown>
    | undefined;
  const chestXRay = diagnosticTests?.chestXRay as
    | Record<string, unknown>
    | undefined;
  const biology = diagnosticTests?.biology as
    | Record<string, unknown>
    | undefined;
  const chestCT = diagnosticTests?.chestCT as
    | Record<string, unknown>
    | undefined;
  const bloodGas = impactAssessment?.bloodGas as
    | Record<string, unknown>
    | undefined;
  const exerciseTest = impactAssessment?.exerciseTest as
    | Record<string, unknown>
    | undefined;
  const otherTests = impactAssessment?.otherTests as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VI. Examens complémentaires</Text>

      {/* Bilan à visée diagnostique */}
      {hasDiagnosticTests && (
        <>
          <Text style={baseStyles.subsectionTitle}>Bilan diagnostique</Text>

          {/* EFR / spirométrie */}
          {spirometry && Object.values(spirometry).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>EFR / Spirométrie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="VEMS (L)" value={spirometry?.vems} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="VEMS/CV (%)" value={spirometry?.vemsCv} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Stade GOLD" value={spirometry?.goldStage} />
                </View>
              </View>
            </>
          )}

          {/* Pléthysmographie */}
          {plethysmography &&
            Object.values(plethysmography).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Pléthysmographie</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField label="CPT (L)" value={plethysmography?.cpt} />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField label="VR (L)" value={plethysmography?.vr} />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField label="CRF (L)" value={plethysmography?.crf} />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField label="RVA (L)" value={plethysmography?.rva} />
                  </View>
                </View>
              </>
            )}

          {/* Imagerie - Rx thoracique */}
          {chestXRay &&
            (Object.values(chestXRay).some((v) => hasValue(v)) ||
              hasValue(chestXRay.imageFiles)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Radiographie thoracique
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField label="Résultat" value={chestXRay?.result} />
                  </View>
                </View>

                {/* Anomalies Rx */}
                {chestXRay?.abnormalDetails &&
                  Object.values(
                    chestXRay.abnormalDetails as Record<string, unknown>
                  ).some((v) => hasValue(v)) && (
                    <View style={baseStyles.grid}>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Signes de distension"
                          value={
                            (
                              chestXRay.abnormalDetails as Record<
                                string,
                                unknown
                              >
                            )?.distensionSigns
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Syndrome bronchique"
                          value={
                            (
                              chestXRay.abnormalDetails as Record<
                                string,
                                unknown
                              >
                            )?.bronchialSyndrome
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Emphysème"
                          value={
                            (
                              chestXRay.abnormalDetails as Record<
                                string,
                                unknown
                              >
                            )?.emphysema
                          }
                        />
                      </View>
                    </View>
                  )}

                {hasValue(chestXRay?.otherAbnormalities) && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Autres anomalies"
                      value={chestXRay?.otherAbnormalities}
                    />
                  </View>
                )}

                {/* Images Rx */}
                {hasValue(chestXRay?.imageFiles) &&
                  Array.isArray(chestXRay.imageFiles) &&
                  chestXRay.imageFiles.length > 0 && (
                    <PDFImageGrid
                      label="Radiographie thoracique"
                      images={chestXRay.imageFiles as string[]}
                    />
                  )}
              </>
            )}

          {/* Bilan biologique */}
          {biology && Object.values(biology).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Bilan biologique</Text>

              {/* NFS */}
              {biology?.cbc &&
                Object.values(biology.cbc as Record<string, unknown>).some(
                  (v) => hasValue(v)
                ) && (
                  <>
                    <Text style={baseStyles.subsectionTitle}>NFS</Text>
                    <View style={baseStyles.grid}>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Hémoglobine (g/dL)"
                          value={
                            (biology.cbc as Record<string, unknown>)?.hemoglobin
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="VGM (fL)"
                          value={(biology.cbc as Record<string, unknown>)?.mcv}
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="GB (10^9/L)"
                          value={
                            (biology.cbc as Record<string, unknown>)
                              ?.whiteBloodCells
                          }
                        />
                      </View>
                    </View>
                  </>
                )}

              {/* Biochimie */}
              {biology?.biochemistry &&
                Object.values(
                  biology.biochemistry as Record<string, unknown>
                ).some((v) => hasValue(v)) && (
                  <>
                    <Text style={baseStyles.subsectionTitle}>Biochimie</Text>
                    <View style={baseStyles.grid}>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Créatinine (µmol/L)"
                          value={
                            (biology.biochemistry as Record<string, unknown>)
                              ?.creatinine
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="AST (UI/L)"
                          value={
                            (biology.biochemistry as Record<string, unknown>)
                              ?.ast
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="ALT (UI/L)"
                          value={
                            (biology.biochemistry as Record<string, unknown>)
                              ?.alt
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="CRP (mg/L)"
                          value={
                            (biology.biochemistry as Record<string, unknown>)
                              ?.crp
                          }
                        />
                      </View>
                    </View>
                  </>
                )}

              <View style={baseStyles.grid}>
                {hasValue(biology?.nfs) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField label="NFS" value={biology?.nfs} />
                  </View>
                )}
                {hasValue(biology?.crp) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField label="CRP" value={biology?.crp} />
                  </View>
                )}
                {hasValue(biology?.alpha1At) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Alpha-1 antitrypsine"
                      value={biology?.alpha1At}
                    />
                  </View>
                )}
                {hasValue(biology?.dDimers) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField label="D-dimères" value={biology?.dDimers} />
                  </View>
                )}
                {hasValue(biology?.bnp) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField label="BNP" value={biology?.bnp} />
                  </View>
                )}
                {hasValue(biology?.vitaminD) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField label="Vitamine D" value={biology?.vitaminD} />
                  </View>
                )}
                {hasValue(biology?.otherBiology) && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Autre biologie"
                      value={biology?.otherBiology}
                    />
                  </View>
                )}
              </View>
            </>
          )}

          {/* Imagerie - TDM thoracique */}
          {chestCT &&
            (Object.values(chestCT).some((v) => hasValue(v)) ||
              hasValue(chestCT.videoFiles)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>TDM thoracique</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField label="Résultat" value={chestCT?.result} />
                  </View>
                </View>

                {/* Anomalies TDM */}
                {chestCT?.abnormalDetails &&
                  Object.values(
                    chestCT.abnormalDetails as Record<string, unknown>
                  ).some((v) => hasValue(v)) && (
                    <View style={baseStyles.grid}>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Épaississement bronchique"
                          value={
                            (chestCT.abnormalDetails as Record<string, unknown>)
                              ?.bronchialThickening
                          }
                        />
                      </View>
                      <View style={baseStyles.gridItem}>
                        <PDFField
                          label="Emphysème"
                          value={
                            (chestCT.abnormalDetails as Record<string, unknown>)
                              ?.emphysema
                          }
                        />
                      </View>
                    </View>
                  )}

                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Lésions associées"
                      value={chestCT?.associatedLesions}
                    />
                  </View>
                  {hasValue(chestCT?.associatedLesionsDetails) && (
                    <View style={baseStyles.gridItemFull}>
                      <PDFField
                        label="Détails lésions associées"
                        value={chestCT?.associatedLesionsDetails}
                      />
                    </View>
                  )}
                  {hasValue(chestCT?.otherAbnormalities) && (
                    <View style={baseStyles.gridItemFull}>
                      <PDFField
                        label="Autres anomalies"
                        value={chestCT?.otherAbnormalities}
                      />
                    </View>
                  )}
                </View>

                {/* Images TDM */}
                {hasValue(chestCT?.videoFiles) &&
                  Array.isArray(chestCT.videoFiles) &&
                  chestCT.videoFiles.length > 0 && (
                    <PDFImageGrid
                      label="TDM thoracique"
                      images={chestCT.videoFiles as string[]}
                    />
                  )}
              </>
            )}
        </>
      )}

      {/* Bilan de retentissement */}
      {hasImpactAssessment && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Bilan de retentissement
          </Text>

          {/* Gaz du sang */}
          {bloodGas && Object.values(bloodGas).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Gaz du sang</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="pH" value={bloodGas?.ph} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="PaO2 (mmHg)" value={bloodGas?.paO2} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="PaCO2 (mmHg)" value={bloodGas?.paCO2} />
                </View>
              </View>
            </>
          )}

          {/* Épreuve d'effort */}
          {exerciseTest &&
            Object.values(exerciseTest).some((v) => hasValue(v)) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Épreuve d&apos;effort
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Test de marche 6 min (m)"
                      value={exerciseTest?.sixMinWalkTest}
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="VO2 max (mL/kg/min)"
                      value={exerciseTest?.vo2Max}
                    />
                  </View>
                </View>
              </>
            )}

          {/* Autres examens */}
          {otherTests && Object.values(otherTests).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Autres examens</Text>
              <View style={baseStyles.grid}>
                {hasValue(otherTests?.sixMinWalkTest) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Test de marche 6 min"
                      value={otherTests?.sixMinWalkTest}
                    />
                  </View>
                )}
                {hasValue(otherTests?.vo2Max) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField label="VO2 max" value={otherTests?.vo2Max} />
                  </View>
                )}
                {hasValue(otherTests?.echoHeartConclusion) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Écho cœur"
                      value={otherTests?.echoHeartConclusion}
                    />
                  </View>
                )}
                {hasValue(otherTests?.sleepRecording) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Enregistrement sommeil"
                      value={otherTests?.sleepRecording}
                    />
                  </View>
                )}
                {hasValue(otherTests?.details) && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField label="Détails" value={otherTests?.details} />
                  </View>
                )}
                {hasValue(otherTests?.otherRetentissement) && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Autre retentissement"
                      value={otherTests?.otherRetentissement}
                    />
                  </View>
                )}
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}

/**
 * Section VII. Diagnostic
 */
function DiagnosisSection({ patient }: BPCOPathologyPDFProps) {
  const diagnosis = getNestedValue(patient, "bpcoDiagnosis") as
    | Record<string, unknown>
    | undefined;

  if (!diagnosis || !Object.values(diagnosis).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VII. Diagnostic</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Stade BPCO" value={diagnosis?.bpcoStage} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Exacerbation aiguë"
            value={diagnosis?.acuteExacerbation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Surinfection bronchique"
            value={diagnosis?.bronchialSuperinfection}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Insuffisance respiratoire chronique"
            value={diagnosis?.chronicRespiratoryFailure}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Section VIII. Traitement
 */
function TreatmentSection({ patient }: BPCOPathologyPDFProps) {
  const treatment = getNestedValue(patient, "bpcoTreatment") as
    | Record<string, unknown>
    | undefined;

  if (!treatment || !Object.values(treatment).some((v) => hasValue(v))) {
    return null;
  }

  const prescribedTreatments = treatment?.prescribedTreatments as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VIII. Traitement</Text>
      <View style={baseStyles.grid}>
        {hasValue(treatment?.maintenanceTreatment) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Traitement de fond"
              value={treatment?.maintenanceTreatment}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Oxygénothérapie à long terme"
            value={treatment?.longTermOxygenTherapy}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Éducation thérapeutique"
            value={treatment?.therapeuticEducation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Sevrage tabagique proposé"
            value={treatment?.smokingCessationOffered}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="VNI" value={treatment?.vni} />
        </View>
        {hasValue(treatment?.therapeuticEducationDone) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Éducation thérapeutique réalisée"
              value={treatment?.therapeuticEducationDone}
            />
          </View>
        )}
      </View>

      {/* Oxygénothérapie */}
      {(hasValue(treatment?.longTermOxygenTherapyStartDate) ||
        hasValue(treatment?.longTermOxygenTherapyDuration) ||
        hasValue(treatment?.longTermOxygenTherapyRestFlow) ||
        hasValue(treatment?.longTermOxygenTherapyEffortFlow)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>Oxygénothérapie</Text>
          <View style={baseStyles.grid}>
            {hasValue(treatment?.longTermOxygenTherapyStartDate) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Date de début"
                  value={treatment?.longTermOxygenTherapyStartDate}
                />
              </View>
            )}
            {hasValue(treatment?.longTermOxygenTherapyDuration) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée"
                  value={treatment?.longTermOxygenTherapyDuration}
                />
              </View>
            )}
            {hasValue(treatment?.longTermOxygenTherapyRestFlow) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Débit au repos (L/min)"
                  value={treatment?.longTermOxygenTherapyRestFlow}
                />
              </View>
            )}
            {hasValue(treatment?.longTermOxygenTherapyEffortFlow) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Débit à l'effort (L/min)"
                  value={treatment?.longTermOxygenTherapyEffortFlow}
                />
              </View>
            )}
          </View>
        </>
      )}

      {/* VNI */}
      {hasValue(treatment?.vniParameters) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Paramètres VNI" value={treatment?.vniParameters} />
        </View>
      )}

      {/* Traitements prescrits */}
      {prescribedTreatments &&
        Object.values(prescribedTreatments).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Traitements prescrits
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antibiothérapie"
                  value={prescribedTreatments?.antibioticTherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Corticoïdes oraux"
                  value={prescribedTreatments?.oralCorticosteroids}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Kinésithérapie respiratoire"
                  value={prescribedTreatments?.respiratoryPhysiotherapy}
                />
              </View>
            </View>
          </>
        )}

      {/* Vaccinations */}
      {(hasValue(treatment?.fluVaccination) ||
        hasValue(treatment?.fluVaccinationDate) ||
        hasValue(treatment?.pneumococcalVaccination) ||
        hasValue(treatment?.pneumococcalVaccinationDate)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>Vaccinations</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Vaccination grippe"
                value={treatment?.fluVaccination}
              />
            </View>
            {hasValue(treatment?.fluVaccinationDate) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Date vaccination grippe"
                  value={treatment?.fluVaccinationDate}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Vaccination pneumocoque"
                value={treatment?.pneumococcalVaccination}
              />
            </View>
            {hasValue(treatment?.pneumococcalVaccinationDate) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Date vaccination pneumocoque"
                  value={treatment?.pneumococcalVaccinationDate}
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
 * Section IX. Suivi
 */
function FollowUpSection({ patient }: BPCOPathologyPDFProps) {
  const followUp = getNestedValue(patient, "bpcoFollowUp") as
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
            label="Dernière consultation"
            value={followUp?.lastConsultation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Prochaine évaluation"
            value={followUp?.nextEvaluation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Suivi pneumologie"
            value={followUp?.pneumologyFollowUp}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Vaccinations à jour"
            value={followUp?.vaccinationsUpToDate}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Composant principal pour la pathologie BPCO
 */
export function BPCOPathologyPDF({ patient }: BPCOPathologyPDFProps) {
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
