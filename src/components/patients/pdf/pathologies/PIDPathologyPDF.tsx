/**
 * Composant PDF pour la pathologie Pneumopathies Interstitielles Diffuses
 * Affiche toutes les données du formulaire PID de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles, pathologyStyles } from "../styles";

interface PIDPathologyPDFProps {
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
 * Section Motif d'Admission
 */
function AdmissionReasonSection({ patient }: PIDPathologyPDFProps) {
  const admissionReason = getNestedValue(patient, "pidAdmissionReason");

  if (!hasValue(admissionReason)) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Motif d&apos;Admission</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Motif d'admission" value={admissionReason} />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Antécédents Toxiques
 */
function ToxicHistorySection({ patient }: PIDPathologyPDFProps) {
  const toxicHistory = getNestedValue(patient, "pidToxicHistory") as
    | Record<string, unknown>
    | undefined;

  if (!toxicHistory || !Object.values(toxicHistory).some((v) => hasValue(v))) {
    return null;
  }

  const smoking = toxicHistory?.smoking as Record<string, unknown> | undefined;
  const drugAddiction = toxicHistory?.drugAddiction as
    | Record<string, unknown>
    | undefined;
  const longTermMedication = toxicHistory?.longTermMedication as
    | Record<string, unknown>
    | undefined;
  const medicinalPlants = toxicHistory?.medicinalPlants as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Antécédents Toxiques</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Tabagisme */}
        {smoking && Object.values(smoking).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Tabagisme</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Actif"
                  value={(smoking?.type as Record<string, unknown>)?.active}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Passif"
                  value={(smoking?.type as Record<string, unknown>)?.passive}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="PA (paquet-années)"
                  value={smoking?.packYears}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Âge de début" value={smoking?.startAge} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Sevré" value={smoking?.stopped} />
              </View>
            </View>
          </>
        )}

        {/* Alcoolisme */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Alcoolisme" value={toxicHistory?.alcoholism} />
          </View>
        </View>

        {/* Toxicomanie */}
        {drugAddiction &&
          Object.values(drugAddiction).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Toxicomanie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présente" value={drugAddiction?.present} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={drugAddiction?.details} />
                </View>
              </View>
            </>
          )}

        {/* Médicaments au long cours */}
        {longTermMedication &&
          Object.values(longTermMedication).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Médicaments au long cours
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Présents"
                    value={longTermMedication?.present}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Produits"
                    value={longTermMedication?.products}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Durée"
                    value={longTermMedication?.duration}
                  />
                </View>
              </View>
            </>
          )}

        {/* Plantes médicinales */}
        {medicinalPlants &&
          Object.values(medicinalPlants).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Plantes médicinales
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Présentes"
                    value={medicinalPlants?.present}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={medicinalPlants?.details} />
                </View>
              </View>
            </>
          )}
      </View>
    </View>
  );
}

/**
 * Section Antécédents Médicaux
 */
function MedicalHistorySection({ patient }: PIDPathologyPDFProps) {
  const medicalHistory = getNestedValue(patient, "pidMedicalHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !medicalHistory ||
    !Object.values(medicalHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  const tuberculosis = medicalHistory?.tuberculosis as
    | Record<string, unknown>
    | undefined;
  const asthma = medicalHistory?.asthma as Record<string, unknown> | undefined;
  const chronicBronchitis = medicalHistory?.chronicBronchitis as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Antécédents Médicaux</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Tuberculose */}
        {tuberculosis &&
          Object.values(tuberculosis).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Tuberculose</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présente" value={tuberculosis?.present} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Forme" value={tuberculosis?.form} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Date" value={tuberculosis?.date} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Traitement"
                    value={tuberculosis?.treatment}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Évolution" value={tuberculosis?.evolution} />
                </View>
              </View>
            </>
          )}

        {/* Asthme */}
        {asthma && Object.values(asthma).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Asthme</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présent" value={asthma?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Depuis quand" value={asthma?.since} />
              </View>
            </View>
          </>
        )}

        {/* Hypersensibilité */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Hypersensibilité"
              value={medicalHistory?.hypersensitivity}
            />
          </View>
        </View>

        {/* Bronchite chronique */}
        {chronicBronchitis &&
          Object.values(chronicBronchitis).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Bronchite chronique
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Présente"
                    value={chronicBronchitis?.present}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Détails"
                    value={chronicBronchitis?.details}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Durée" value={chronicBronchitis?.duration} />
                </View>
              </View>
            </>
          )}

        {/* Autres pathologies respiratoires */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres pathologies respiratoires"
              value={medicalHistory?.otherRespiratoryDiseases}
            />
          </View>
        </View>

        {/* Autres conditions médicales */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Diabète"
              value={
                (medicalHistory?.diabetes as Record<string, unknown>)?.present
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Détails diabète"
              value={
                (medicalHistory?.diabetes as Record<string, unknown>)?.details
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="HTA"
              value={
                (medicalHistory?.hypertension as Record<string, unknown>)
                  ?.present
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Détails HTA"
              value={
                (medicalHistory?.hypertension as Record<string, unknown>)
                  ?.details
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Cardiopathie"
              value={
                (medicalHistory?.heartDisease as Record<string, unknown>)
                  ?.present
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Détails cardiopathie"
              value={
                (medicalHistory?.heartDisease as Record<string, unknown>)
                  ?.details
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Maladie de système"
              value={
                (medicalHistory?.systemicDisease as Record<string, unknown>)
                  ?.present
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Détails maladie de système"
              value={
                (medicalHistory?.systemicDisease as Record<string, unknown>)
                  ?.details
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Néoplasie"
              value={
                (medicalHistory?.neoplasia as Record<string, unknown>)?.present
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Détails néoplasie"
              value={
                (medicalHistory?.neoplasia as Record<string, unknown>)?.details
              }
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="RGO"
              value={(medicalHistory?.gerd as Record<string, unknown>)?.present}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Détails RGO"
              value={(medicalHistory?.gerd as Record<string, unknown>)?.details}
            />
          </View>
        </View>

        {/* Autres antécédents */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres antécédents"
              value={medicalHistory?.otherAntecedents}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Antécédents Gynéco-Obstétricaux
 */
function GynecoObstetricHistorySection({ patient }: PIDPathologyPDFProps) {
  const gynecoObstetricHistory = getNestedValue(
    patient,
    "pidGynecoObstetricHistory"
  ) as Record<string, unknown> | undefined;

  if (
    !gynecoObstetricHistory ||
    !Object.values(gynecoObstetricHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        Antécédents Gynéco-Obstétricaux
      </Text>
      <View style={pathologyStyles.pidSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Ménarche"
              value={gynecoObstetricHistory?.menarche}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Cycle" value={gynecoObstetricHistory?.cycle} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Gestité" value={gynecoObstetricHistory?.gestity} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Parité" value={gynecoObstetricHistory?.parity} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Contraceptifs"
              value={gynecoObstetricHistory?.contraceptives}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Mode de Vie
 */
function LifestyleSection({ patient }: PIDPathologyPDFProps) {
  const lifestyle = getNestedValue(patient, "pidLifestyle") as
    | Record<string, unknown>
    | undefined;

  if (!lifestyle || !Object.values(lifestyle).some((v) => hasValue(v))) {
    return null;
  }

  const professionalExposure = lifestyle?.professionalExposure as
    | Record<string, unknown>
    | undefined;
  const avianContact = lifestyle?.avianContact as
    | Record<string, unknown>
    | undefined;
  const tropicalTravel = lifestyle?.tropicalTravel as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Mode de Vie</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Exposition professionnelle */}
        {professionalExposure &&
          Object.values(professionalExposure).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Exposition professionnelle
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Présente"
                    value={professionalExposure?.present}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails"
                    value={professionalExposure?.details}
                  />
                </View>
              </View>
            </>
          )}

        {/* Contact aviaire */}
        {avianContact &&
          Object.values(avianContact).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Contact aviaire</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présent" value={avianContact?.present} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Description"
                    value={avianContact?.description}
                  />
                </View>
              </View>
            </>
          )}

        {/* Contact avec du foin moisi */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Contact avec du foin moisi"
              value={lifestyle?.moltyHayContact}
            />
          </View>
        </View>

        {/* Voyage en zone tropicale */}
        {tropicalTravel &&
          Object.values(tropicalTravel).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Voyage en zone tropicale
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présent" value={tropicalTravel?.present} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Lieu" value={tropicalTravel?.location} />
                </View>
              </View>
            </>
          )}

        {/* Autres expositions */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres expositions"
              value={lifestyle?.otherExposures}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Antécédents Familiaux
 */
function FamilyHistorySection({ patient }: PIDPathologyPDFProps) {
  const familyHistory = getNestedValue(patient, "pidFamilyHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !familyHistory ||
    !Object.values(familyHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  const autoImmuneDisease = familyHistory?.autoImmuneDisease as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Antécédents Familiaux</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Cas similaire dans la famille */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Cas similaire dans la famille"
              value={familyHistory?.similarCaseInFamily}
            />
          </View>
        </View>

        {/* Maladie auto-immune dans la famille */}
        {autoImmuneDisease &&
          Object.values(autoImmuneDisease).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Maladie auto-immune dans la famille
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Présente"
                    value={autoImmuneDisease?.present}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails"
                    value={autoImmuneDisease?.details}
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
 * Section Histoire de la Maladie
 */
function DiseaseHistorySection({ patient }: PIDPathologyPDFProps) {
  const diseaseHistory = getNestedValue(patient, "pidDiseaseHistory") as
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
      <Text style={baseStyles.sectionTitle}>Histoire de la Maladie</Text>
      <View style={pathologyStyles.pidSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Durée des symptômes"
              value={diseaseHistory?.symptomsDuration}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Mode d'installation"
              value={diseaseHistory?.installationMode}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Signes Fonctionnels Respiratoires
 */
function RespiratorySymptomsSection({ patient }: PIDPathologyPDFProps) {
  const respiratorySymptoms = getNestedValue(
    patient,
    "pidRespiratorySymptoms"
  ) as Record<string, unknown> | undefined;

  if (
    !respiratorySymptoms ||
    !Object.values(respiratorySymptoms).some((v) => hasValue(v))
  ) {
    return null;
  }

  const cough = respiratorySymptoms?.cough as
    | Record<string, unknown>
    | undefined;
  const dyspnea = respiratorySymptoms?.dyspnea as
    | Record<string, unknown>
    | undefined;
  const chestPain = respiratorySymptoms?.chestPain as
    | Record<string, unknown>
    | undefined;
  const hemoptysis = respiratorySymptoms?.hemoptysis as
    | Record<string, unknown>
    | undefined;
  const expectoration = respiratorySymptoms?.expectoration as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        Signes Fonctionnels Respiratoires
      </Text>
      <View style={pathologyStyles.pidSection}>
        {/* Toux */}
        {cough && Object.values(cough).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Toux</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={cough?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Type" value={cough?.type} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Fréquence" value={cough?.frequency} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Horaire" value={cough?.timing} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Insomniante"
                  value={
                    (cough?.intensity as Record<string, unknown>)?.insomnia
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Émétisante"
                  value={(cough?.intensity as Record<string, unknown>)?.emetic}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Douloureuse"
                  value={(cough?.intensity as Record<string, unknown>)?.painful}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Avec incontinence urinaire"
                  value={
                    (cough?.intensity as Record<string, unknown>)
                      ?.withUrinaryIncontinence
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Sans facteur"
                  value={(cough?.triggers as Record<string, unknown>)?.noFactor}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tabac"
                  value={(cough?.triggers as Record<string, unknown>)?.tobacco}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Après repas"
                  value={(cough?.triggers as Record<string, unknown>)?.postMeal}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Au moment des repas"
                  value={
                    (cough?.triggers as Record<string, unknown>)?.duringMeal
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Décubitus"
                  value={
                    (cough?.triggers as Record<string, unknown>)?.decubitus
                  }
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres déclencheurs"
                  value={(cough?.triggers as Record<string, unknown>)?.other}
                />
              </View>
            </View>
          </>
        )}

        {/* Dyspnée */}
        {dyspnea && Object.values(dyspnea).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Dyspnée</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={dyspnea?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Stade de Sadoul"
                  value={dyspnea?.sadoulStage}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Type" value={dyspnea?.type} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Effort"
                  value={
                    (dyspnea?.circumstances as Record<string, unknown>)?.effort
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Repos"
                  value={
                    (dyspnea?.circumstances as Record<string, unknown>)?.rest
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Décubitus"
                  value={
                    (dyspnea?.circumstances as Record<string, unknown>)
                      ?.decubitus
                  }
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres circonstances"
                  value={
                    (dyspnea?.circumstances as Record<string, unknown>)?.other
                  }
                />
              </View>
            </View>
          </>
        )}

        {/* Douleur thoracique */}
        {chestPain && Object.values(chestPain).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Douleur thoracique</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={chestPain?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Droit"
                  value={
                    (chestPain?.location as Record<string, unknown>)?.right
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Gauche"
                  value={(chestPain?.location as Record<string, unknown>)?.left}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Bilatéral"
                  value={
                    (chestPain?.location as Record<string, unknown>)?.bilateral
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Médio-thoracique"
                  value={
                    (chestPain?.site as Record<string, unknown>)?.medioThoracic
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Basithoracique"
                  value={
                    (chestPain?.site as Record<string, unknown>)?.basiThoracic
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Rétrosternal"
                  value={
                    (chestPain?.site as Record<string, unknown>)?.retrosternal
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Diffuse"
                  value={(chestPain?.site as Record<string, unknown>)?.diffuse}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Oppression"
                  value={
                    (chestPain?.type as Record<string, unknown>)?.oppression
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Constrictive"
                  value={
                    (chestPain?.type as Record<string, unknown>)?.constrictive
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Brûlure"
                  value={(chestPain?.type as Record<string, unknown>)?.burning}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autre type"
                  value={(chestPain?.type as Record<string, unknown>)?.other}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Déclencheurs" value={chestPain?.triggers} />
              </View>
            </View>
          </>
        )}

        {/* Hémoptysie */}
        {hemoptysis && Object.values(hemoptysis).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Hémoptysie</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={hemoptysis?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Abondance" value={hemoptysis?.abundance} />
              </View>
            </View>
          </>
        )}

        {/* Expectoration */}
        {expectoration &&
          Object.values(expectoration).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Expectoration</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présente" value={expectoration?.present} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Fréquence"
                    value={expectoration?.frequency}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Horaire" value={expectoration?.timing} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Qualité" value={expectoration?.quality} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Quantité" value={expectoration?.quantity} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Odeur" value={expectoration?.odor} />
                </View>
              </View>
            </>
          )}
      </View>
    </View>
  );
}

/**
 * Section Signes Extra-Respiratoires
 */
function ExtraRespiratorySymptomsSection({ patient }: PIDPathologyPDFProps) {
  const extraRespiratorySymptoms = getNestedValue(
    patient,
    "pidExtraRespiratorySymptoms"
  ) as Record<string, unknown> | undefined;

  if (
    !extraRespiratorySymptoms ||
    !Object.values(extraRespiratorySymptoms).some((v) => hasValue(v))
  ) {
    return null;
  }

  const arthralgia = extraRespiratorySymptoms?.arthralgia as
    | Record<string, unknown>
    | undefined;
  const cutaneousSigns = extraRespiratorySymptoms?.cutaneousSigns as
    | Record<string, unknown>
    | undefined;
  const neurologicalSigns = extraRespiratorySymptoms?.neurologicalSigns as
    | Record<string, unknown>
    | undefined;
  const digestiveSigns = extraRespiratorySymptoms?.digestiveSigns as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Signes Extra-Respiratoires</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Arthralgie */}
        {arthralgia && Object.values(arthralgia).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Arthralgie</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={arthralgia?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Type" value={arthralgia?.type} />
              </View>
            </View>
          </>
        )}

        {/* Xérophtalmie */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Xérophtalmie"
              value={extraRespiratorySymptoms?.xerophthalmia}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Xérostomie"
              value={extraRespiratorySymptoms?.xerostomia}
            />
          </View>
        </View>

        {/* Signes cutanés */}
        {cutaneousSigns &&
          Object.values(cutaneousSigns).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Signes cutanés</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présents" value={cutaneousSigns?.present} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={cutaneousSigns?.details} />
                </View>
              </View>
            </>
          )}

        {/* Signes neurologiques */}
        {neurologicalSigns &&
          Object.values(neurologicalSigns).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Signes neurologiques
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Présents"
                    value={neurologicalSigns?.present}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails"
                    value={neurologicalSigns?.details}
                  />
                </View>
              </View>
            </>
          )}

        {/* Signes digestifs */}
        {digestiveSigns &&
          Object.values(digestiveSigns).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Signes digestifs</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Présents" value={digestiveSigns?.present} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={digestiveSigns?.details} />
                </View>
              </View>
            </>
          )}
      </View>
    </View>
  );
}

/**
 * Section Signes Généraux
 */
function GeneralSignsSection({ patient }: PIDPathologyPDFProps) {
  const generalSigns = getNestedValue(patient, "pidGeneralSigns") as
    | Record<string, unknown>
    | undefined;

  if (!generalSigns || !Object.values(generalSigns).some((v) => hasValue(v))) {
    return null;
  }

  const weightLoss = generalSigns?.weightLoss as
    | Record<string, unknown>
    | undefined;
  const fever = generalSigns?.fever as Record<string, unknown> | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Signes Généraux</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Asthénie et Anorexie */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Asthénie" value={generalSigns?.asthenia} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Anorexie" value={generalSigns?.anorexia} />
          </View>
        </View>

        {/* Amaigrissement */}
        {weightLoss && Object.values(weightLoss).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Amaigrissement</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présent" value={weightLoss?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chiffré"
                  value={
                    (weightLoss?.quantified as Record<string, unknown>)?.present
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Valeur (kg)"
                  value={
                    (weightLoss?.quantified as Record<string, unknown>)?.value
                  }
                />
              </View>
            </View>
          </>
        )}

        {/* Fièvre */}
        {fever && Object.values(fever).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Fièvre</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Présente" value={fever?.present} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chiffrée"
                  value={
                    (fever?.quantified as Record<string, unknown>)?.present
                  }
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Valeur (°C)"
                  value={(fever?.quantified as Record<string, unknown>)?.value}
                />
              </View>
            </View>
          </>
        )}

        {/* Sueurs nocturnes */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Sueurs nocturnes"
              value={generalSigns?.nightSweats}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Examen Clinique
 */
function ClinicalExamSection({ patient }: PIDPathologyPDFProps) {
  const clinicalExam = getNestedValue(patient, "pidClinicalExam") as
    | Record<string, unknown>
    | undefined;

  if (!clinicalExam || !Object.values(clinicalExam).some((v) => hasValue(v))) {
    return null;
  }

  const generalExam = clinicalExam?.generalExam as
    | Record<string, unknown>
    | undefined;
  const pleuroPulmonaryExam = clinicalExam?.pleuroPulmonaryExam as
    | Record<string, unknown>
    | undefined;
  const lymphNodes = clinicalExam?.lymphNodes as
    | Record<string, unknown>
    | undefined;
  const cardiovascularExam = clinicalExam?.cardiovascularExam as
    | Record<string, unknown>
    | undefined;
  const cutaneousExam = clinicalExam?.cutaneousExam as
    | Record<string, unknown>
    | undefined;
  const ent = clinicalExam?.ent as Record<string, unknown> | undefined;
  const jointExam = clinicalExam?.jointExam as
    | Record<string, unknown>
    | undefined;
  const neurologicalExam = clinicalExam?.neurologicalExam as
    | Record<string, unknown>
    | undefined;
  const abdominalExam = clinicalExam?.abdominalExam as
    | Record<string, unknown>
    | undefined;
  const ophthalmologicExam = clinicalExam?.ophthalmologicExam as
    | Record<string, unknown>
    | undefined;
  const renalExam = clinicalExam?.renalExam as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examen Clinique</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Examen général */}
        {generalExam && Object.values(generalExam).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Examen général</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Normal" value={generalExam?.normal} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Poids (kg)" value={generalExam?.weight} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Taille (cm)" value={generalExam?.height} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="IMC" value={generalExam?.bmi} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Température (°C)"
                  value={generalExam?.temperature}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tension artérielle"
                  value={generalExam?.bloodPressure}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Fréquence cardiaque (bpm)"
                  value={generalExam?.heartRate}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Fréquence respiratoire (cpm)"
                  value={generalExam?.respiratoryRate}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Saturation (%)"
                  value={generalExam?.saturation}
                />
              </View>
            </View>
          </>
        )}

        {/* Examen pleuro-pulmonaire */}
        {pleuroPulmonaryExam &&
          Object.values(pleuroPulmonaryExam).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Examen pleuro-pulmonaire
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Normal"
                    value={pleuroPulmonaryExam?.normal}
                  />
                </View>
              </View>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Inspection"
                    value={clinicalExam?.inspection}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Palpation" value={clinicalExam?.palpation} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Percussion"
                    value={clinicalExam?.percussion}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Auscultation"
                    value={clinicalExam?.auscultation}
                  />
                </View>
              </View>
            </>
          )}

        {/* Aires ganglionnaires */}
        {lymphNodes && Object.values(lymphNodes).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Aires ganglionnaires</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Normal" value={lymphNodes?.normal} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Détails" value={lymphNodes?.details} />
              </View>
            </View>
          </>
        )}

        {/* Examen cardiovasculaire */}
        {cardiovascularExam &&
          Object.values(cardiovascularExam).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Examen cardiovasculaire
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Normal" value={cardiovascularExam?.normal} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails"
                    value={cardiovascularExam?.details}
                  />
                </View>
              </View>
            </>
          )}

        {/* Examen cutané */}
        {cutaneousExam &&
          Object.values(cutaneousExam).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Examen cutané</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Normal" value={cutaneousExam?.normal} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={cutaneousExam?.details} />
                </View>
              </View>
            </>
          )}

        {/* Examen ORL */}
        {ent && Object.values(ent).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Examen ORL</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Normal" value={ent?.normal} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Détails" value={ent?.details} />
              </View>
            </View>
          </>
        )}

        {/* Examen articulaire */}
        {jointExam && Object.values(jointExam).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Examen articulaire</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Normal" value={jointExam?.normal} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Détails" value={jointExam?.details} />
              </View>
            </View>
          </>
        )}

        {/* Examen neurologique */}
        {neurologicalExam &&
          Object.values(neurologicalExam).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Examen neurologique
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Normal" value={neurologicalExam?.normal} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={neurologicalExam?.details} />
                </View>
              </View>
            </>
          )}

        {/* Examen abdominal */}
        {abdominalExam &&
          Object.values(abdominalExam).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Examen abdominal</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Normal" value={abdominalExam?.normal} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={abdominalExam?.details} />
                </View>
              </View>
            </>
          )}

        {/* Examen ophtalmologique */}
        {ophthalmologicExam &&
          Object.values(ophthalmologicExam).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Examen ophtalmologique
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Normal" value={ophthalmologicExam?.normal} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails"
                    value={ophthalmologicExam?.details}
                  />
                </View>
              </View>
            </>
          )}

        {/* Examen rénal */}
        {renalExam && Object.values(renalExam).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Examen rénal</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Normal" value={renalExam?.normal} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Détails" value={renalExam?.details} />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

/**
 * Section Examens Complémentaires
 */
function ComplementaryExamsSection({ patient }: PIDPathologyPDFProps) {
  const complementaryExams = getNestedValue(
    patient,
    "pidComplementaryExams"
  ) as Record<string, unknown> | undefined;

  if (
    !complementaryExams ||
    !Object.values(complementaryExams).some((v) => hasValue(v))
  ) {
    return null;
  }

  const chestXRay = complementaryExams?.chestXRay as
    | Record<string, unknown>
    | undefined;
  const chestCT = complementaryExams?.chestCT as
    | Record<string, unknown>
    | undefined;
  const handXRay = complementaryExams?.handXRay as
    | Record<string, unknown>
    | undefined;
  const sinusCT = complementaryExams?.sinusCT as
    | Record<string, unknown>
    | undefined;
  const biology = complementaryExams?.biology as
    | Record<string, unknown>
    | undefined;
  const microbiology = complementaryExams?.microbiology as
    | Record<string, unknown>
    | undefined;
  const bronchoscopy = complementaryExams?.bronchoscopy as
    | Record<string, unknown>
    | undefined;
  const histology = complementaryExams?.histology as
    | Record<string, unknown>
    | undefined;
  const phthisiology = complementaryExams?.phthisiology as
    | Record<string, unknown>
    | undefined;
  const functionalAssessment = complementaryExams?.functionalAssessment as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examens Complémentaires</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Imagerie */}
        <Text style={baseStyles.subsectionTitle}>Imagerie</Text>

        {/* Radiographie thoracique */}
        {chestXRay && Object.values(chestXRay).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Radiographie thoracique
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Effectuée" value={chestXRay?.done} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Date" value={chestXRay?.date} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Résultats" value={chestXRay?.normalFindings} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Localisation" value={chestXRay?.location} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Type" value={chestXRay?.type} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Distribution"
                  value={chestXRay?.distribution}
                />
              </View>
            </View>
            {hasValue(chestXRay?.imageFiles) && (
              <PDFImageGrid
                label="Images radiographie thoracique"
                images={chestXRay.imageFiles as string[]}
              />
            )}
          </>
        )}

        {/* Scanner thoracique */}
        {chestCT && Object.values(chestCT).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Scanner thoracique</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Effectué" value={chestCT?.done} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Date" value={chestCT?.date} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Résultats" value={chestCT?.findings} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Localisation" value={chestCT?.location} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Type" value={chestCT?.type} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Distribution" value={chestCT?.distribution} />
              </View>
            </View>
            {hasValue(chestCT?.imageFiles) && (
              <PDFImageGrid
                label="Images scanner thoracique"
                images={chestCT.imageFiles as string[]}
              />
            )}
          </>
        )}

        {/* Radiographie des mains */}
        {handXRay && Object.values(handXRay).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Radiographie des mains
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Effectuée" value={handXRay?.done} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Résultats" value={handXRay?.findings} />
              </View>
            </View>
            {hasValue(handXRay?.imageFiles) && (
              <PDFImageGrid
                label="Images radiographie des mains"
                images={handXRay.imageFiles as string[]}
              />
            )}
          </>
        )}

        {/* Scanner des sinus */}
        {sinusCT && Object.values(sinusCT).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Scanner des sinus</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Effectué" value={sinusCT?.done} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Résultats" value={sinusCT?.findings} />
              </View>
            </View>
            {hasValue(sinusCT?.imageFiles) && (
              <PDFImageGrid
                label="Images scanner des sinus"
                images={sinusCT.imageFiles as string[]}
              />
            )}
          </>
        )}

        {/* Biologie */}
        {biology && Object.values(biology).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Biologie</Text>

            {/* NFS */}
            {hasValue((biology as Record<string, unknown>)?.cbc) && (
              <>
                <Text style={baseStyles.subsectionTitle}>NFS</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Effectuée"
                      value={(biology.cbc as Record<string, unknown>)?.done}
                    />
                  </View>
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
                      label="Globules blancs (/mm³)"
                      value={
                        (biology.cbc as Record<string, unknown>)
                          ?.whiteBloodCells
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Neutrophiles (/mm³)"
                      value={
                        (biology.cbc as Record<string, unknown>)?.neutrophils
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Lymphocytes (/mm³)"
                      value={
                        (biology.cbc as Record<string, unknown>)?.lymphocytes
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Éosinophiles (/mm³)"
                      value={
                        (biology.cbc as Record<string, unknown>)?.eosinophils
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Plaquettes (/mm³)"
                      value={
                        (biology.cbc as Record<string, unknown>)?.platelets
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {/* Biochimie */}
            {hasValue((biology as Record<string, unknown>)?.biochemistry) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Biochimie</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Effectuée"
                      value={
                        (biology.biochemistry as Record<string, unknown>)?.done
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Créatinine (μmol/L)"
                      value={
                        (biology.biochemistry as Record<string, unknown>)
                          ?.creatinine
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="CRP (mg/L)"
                      value={
                        (biology.biochemistry as Record<string, unknown>)?.crp
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="VS (mm)"
                      value={
                        (biology.biochemistry as Record<string, unknown>)?.vs
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {/* Immunologie */}
            {hasValue((biology as Record<string, unknown>)?.immunology) && (
              <>
                <Text style={baseStyles.subsectionTitle}>Immunologie</Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Effectuée"
                      value={
                        (biology.immunology as Record<string, unknown>)?.done
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="ANCA"
                      value={
                        (biology.immunology as Record<string, unknown>)?.anca
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="ANA"
                      value={
                        (biology.immunology as Record<string, unknown>)?.ana
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Facteur rhumatoïde"
                      value={
                        (biology.immunology as Record<string, unknown>)
                          ?.rheumatoidFactor
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Anti-CCP"
                      value={
                        (biology.immunology as Record<string, unknown>)?.antiCcp
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Autres détails"
                      value={
                        (biology.immunology as Record<string, unknown>)
                          ?.otherDetails
                      }
                    />
                  </View>
                </View>
              </>
            )}

            {/* Sérologies virales */}
            {hasValue((biology as Record<string, unknown>)?.viralSerology) && (
              <>
                <Text style={baseStyles.subsectionTitle}>
                  Sérologies virales
                </Text>
                <View style={baseStyles.grid}>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Effectuées"
                      value={
                        (biology.viralSerology as Record<string, unknown>)?.done
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="VIH"
                      value={
                        (biology.viralSerology as Record<string, unknown>)?.hiv
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="VHB"
                      value={
                        (biology.viralSerology as Record<string, unknown>)?.hbv
                      }
                    />
                  </View>
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="VHC"
                      value={
                        (biology.viralSerology as Record<string, unknown>)?.hcv
                      }
                    />
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {/* Microbiologie */}
        {microbiology &&
          Object.values(microbiology).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Microbiologie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Effectuée" value={microbiology?.done} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="BK crachat" value={microbiology?.bkSputum} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="ECBC" value={microbiology?.ecbc} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="PCR" value={microbiology?.pcr} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Autres tests"
                    value={microbiology?.otherTests}
                  />
                </View>
              </View>
            </>
          )}

        {/* Fibroscopie bronchique */}
        {bronchoscopy &&
          Object.values(bronchoscopy).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Fibroscopie bronchique
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Effectuée" value={bronchoscopy?.done} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Endoscopie bronchique"
                    value={bronchoscopy?.bronchialEndoscopy}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="LBA" value={bronchoscopy?.bal} />
                </View>
              </View>
            </>
          )}

        {/* Histologie */}
        {histology && Object.values(histology).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Histologie</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Effectuée" value={histology?.done} />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Biopsie ganglionnaire"
                  value={histology?.lymphNodeBiopsy}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Biopsie pleurale"
                  value={histology?.pleuralBiopsy}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Biopsie cutanée"
                  value={histology?.skinBiopsy}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autre biopsie"
                  value={histology?.otherBiopsy}
                />
              </View>
            </View>
          </>
        )}

        {/* Phtisiologie */}
        {phthisiology &&
          Object.values(phthisiology).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Phtisiologie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Effectuée" value={phthisiology?.done} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Détails" value={phthisiology?.result} />
                </View>
              </View>
            </>
          )}

        {/* Retentissement */}
        {functionalAssessment &&
          Object.values(functionalAssessment).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Retentissement</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Effectué"
                    value={functionalAssessment?.done}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="EFR"
                    value={functionalAssessment?.pulmonaryFunctionTest}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="ECG" value={functionalAssessment?.ecg} />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Échocardiographie"
                    value={functionalAssessment?.echocardiography}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Test de marche"
                    value={functionalAssessment?.walkTest}
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Gaz du sang"
                    value={functionalAssessment?.bloodGas}
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
 * Section Diagnostic Final
 */
function FinalDiagnosisSection({ patient }: PIDPathologyPDFProps) {
  const finalDiagnosis = getNestedValue(patient, "pidFinalDiagnosis") as
    | Record<string, unknown>
    | undefined;

  if (
    !finalDiagnosis ||
    !Object.values(finalDiagnosis).some((v) => hasValue(v))
  ) {
    return null;
  }

  const diagnosisType = finalDiagnosis?.diagnosisType as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Diagnostic Final</Text>
      <View style={pathologyStyles.pidSection}>
        {/* Type de diagnostic */}
        {diagnosisType &&
          Object.values(diagnosisType).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Type de diagnostic</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="FPI"
                    value={diagnosisType?.idiopathicPulmonaryFibrosis}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Sarcoïdose"
                    value={diagnosisType?.sarcoidosis}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="PR"
                    value={diagnosisType?.rheumatoidArthritis}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="PHS"
                    value={diagnosisType?.hypersensitivityPneumonitis}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Sclérodermie"
                    value={diagnosisType?.scleroderma}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Connectivite mixte"
                    value={diagnosisType?.mixedConnectiveTissueDisease}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="PID médicamenteuse"
                    value={diagnosisType?.drugInducedIld}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="PID indéterminée"
                    value={diagnosisType?.indeterminateIld}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Autre"
                    value={
                      (diagnosisType?.other as Record<string, unknown>)?.present
                    }
                  />
                </View>
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Préciser le diagnostic"
                    value={
                      (diagnosisType?.other as Record<string, unknown>)?.details
                    }
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
 * Composant principal pour la pathologie Pneumopathies Interstitielles Diffuses
 */
export function PIDPathologyPDF({ patient }: PIDPathologyPDFProps) {
  return (
    <View>
      <AdmissionReasonSection patient={patient} />
      <ToxicHistorySection patient={patient} />
      <MedicalHistorySection patient={patient} />
      <GynecoObstetricHistorySection patient={patient} />
      <LifestyleSection patient={patient} />
      <FamilyHistorySection patient={patient} />
      <DiseaseHistorySection patient={patient} />
      <RespiratorySymptomsSection patient={patient} />
      <ExtraRespiratorySymptomsSection patient={patient} />
      <GeneralSignsSection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ComplementaryExamsSection patient={patient} />
      <FinalDiagnosisSection patient={patient} />
    </View>
  );
}
