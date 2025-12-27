/**
 * Composant PDF pour la pathologie Tuberculose (TBK)
 * Affiche toutes les données du formulaire TBK de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles, pathologyStyles } from "../styles";

interface TBKPathologyPDFProps {
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
 * Section Motif d'Hospitalisation
 */
function MotifHospitalisationSection({ patient }: TBKPathologyPDFProps) {
  const consultationReason = getNestedValue(
    patient,
    "tbkConsultationReason"
  ) as Record<string, unknown> | undefined;

  if (
    !consultationReason ||
    !Object.values(consultationReason).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Motif d&apos;Hospitalisation</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Motif de consultation"
            value={consultationReason?.consultationReason}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Section ATCD - Comorbidités
 */
function ComorbiditesSection({ patient }: TBKPathologyPDFProps) {
  const comorbidities = getNestedValue(patient, "tbkComorbidities") as
    | Record<string, unknown>
    | undefined;

  if (
    !comorbidities ||
    !Object.values(comorbidities).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Comorbidités</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Diabète" value={comorbidities?.diabetes} />
        </View>
        {!!comorbidities?.diabetes && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Type de diabète"
                value={comorbidities?.diabetesType}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Équilibre diabète"
                value={comorbidities?.diabetesBalance}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Traitement diabète"
                value={comorbidities?.diabetesTreatment}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Insuffisance rénale"
            value={comorbidities?.renalInsufficiency}
          />
        </View>
        {!!comorbidities?.renalInsufficiency && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Clairance créatinine"
                value={comorbidities?.creatinineClearance}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Dialyse" value={comorbidities?.dialysis} />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="VIH" value={comorbidities?.hiv} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Grossesse" value={comorbidities?.pregnancy} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres comorbidités"
            value={comorbidities?.otherComorbidities}
          />
        </View>
      </View>
      </View>
    </View>
  );
}

/**
 * Section ATCD - ATCD Personnel de Tuberculose
 */
function ATCDTuberculoseSection({ patient }: TBKPathologyPDFProps) {
  const personalHistory = getNestedValue(
    patient,
    "tbkPersonalTuberculosisHistory"
  ) as Record<string, unknown> | undefined;

  if (
    !personalHistory ||
    !Object.values(personalHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  const treatments = personalHistory?.treatments as
    | Array<{
        treatment: string;
        form: string;
        regimen: string;
        startDate: string | null;
        evolution: string;
      }>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>
        ATCD Personnel de Tuberculose
      </Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="ATCD tuberculose"
            value={personalHistory?.personalTuberculosisHistory}
          />
        </View>
      </View>
      {treatments &&
        treatments.length > 0 &&
        treatments.some((t) => hasValue(t)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Traitements antérieurs
            </Text>
            {treatments.map((treatment, index) => {
              if (
                !hasValue(treatment.treatment) &&
                !hasValue(treatment.form) &&
                !hasValue(treatment.regimen) &&
                !hasValue(treatment.startDate) &&
                !hasValue(treatment.evolution)
              ) {
                return null;
              }
              return (
                <View key={index} style={baseStyles.gridItemFull}>
                  <Text style={baseStyles.fieldLabel}>
                    Traitement {index + 1}:
                  </Text>
                  <View style={baseStyles.grid}>
                    <View style={baseStyles.gridItem}>
                      <PDFField
                        label="Traitement"
                        value={treatment.treatment}
                      />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField label="Forme" value={treatment.form} />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField label="Schéma" value={treatment.regimen} />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField
                        label="Date début"
                        value={treatment.startDate}
                      />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField label="Évolution" value={treatment.evolution} />
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
    </View>
    </View>
  );
}

/**
 * Section ATCD - Notion de Contage Tuberculeux Récent
 */
function ContageTuberculeuxSection({ patient }: TBKPathologyPDFProps) {
  const recentContagion = getNestedValue(
    patient,
    "tbkRecentTuberculosisContagion"
  ) as Record<string, unknown> | undefined;

  if (
    !recentContagion ||
    !Object.values(recentContagion).some((v) => hasValue(v))
  ) {
    return null;
  }

  const contactRegimen = recentContagion?.contactRegimen as
    | string[]
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>
        Notion de Contage Tuberculeux Récent
      </Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Contage récent"
            value={recentContagion?.recentContagion}
          />
        </View>
        {!!recentContagion?.recentContagion && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Type de contact"
                value={recentContagion?.contactType}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Forme de contact"
                value={recentContagion?.contactForm}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Schéma de contact"
                value={contactRegimen?.join(", ")}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Autre schéma"
                value={recentContagion?.contactRegimenOther}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Évolution"
                value={recentContagion?.contactEvolution}
              />
            </View>
          </>
        )}
      </View>
      </View>
    </View>
  );
}

/**
 * Section ATCD - Habitudes Toxiques
 */
function HabitudesToxiquesSection({ patient }: TBKPathologyPDFProps) {
  const toxicHabits = getNestedValue(patient, "tbkToxicHabits") as
    | Record<string, unknown>
    | undefined;

  if (!toxicHabits || !Object.values(toxicHabits).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Habitudes Toxiques</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Tabagisme" value={toxicHabits?.smoking} />
        </View>
        {!!toxicHabits?.smoking && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField label="Paquet-années" value={toxicHabits?.packYears} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Arrêt tabac"
                value={toxicHabits?.smokingStopped}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Cannabis" value={toxicHabits?.cannabis} />
        </View>
        {!!toxicHabits?.cannabis && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField label="Joints/jour" value={toxicHabits?.jointsPerDay} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Arrêt cannabis"
                value={toxicHabits?.cannabisStopped}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Alcool" value={toxicHabits?.alcohol} />
        </View>
        {!!toxicHabits?.alcohol && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Fréquence alcool"
                value={toxicHabits?.alcoholFrequency}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Arrêt alcool"
                value={toxicHabits?.alcoholStopped}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Toxicomanie" value={toxicHabits?.drugAddiction} />
        </View>
        {!!toxicHabits?.drugAddiction && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField label="Type de drogue" value={toxicHabits?.drugType} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Arrêt drogue" value={toxicHabits?.drugStopped} />
            </View>
          </>
        )}
      </View>
      </View>
    </View>
  );
}

/**
 * Section ATCD complète
 */
function ATCDSection({ patient }: TBKPathologyPDFProps) {
  const hasComorbidites = hasValue(getNestedValue(patient, "tbkComorbidities"));
  const hasATCDTuberculose = hasValue(
    getNestedValue(patient, "tbkPersonalTuberculosisHistory")
  );
  const hasContage = hasValue(
    getNestedValue(patient, "tbkRecentTuberculosisContagion")
  );
  const hasHabitudes = hasValue(getNestedValue(patient, "tbkToxicHabits"));

  if (!hasComorbidites && !hasATCDTuberculose && !hasContage && !hasHabitudes) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>ATCD</Text>
      <View style={pathologyStyles.tbkSection}>
        <ComorbiditesSection patient={patient} />
        <ATCDTuberculoseSection patient={patient} />
        <ContageTuberculeuxSection patient={patient} />
        <HabitudesToxiquesSection patient={patient} />
      </View>
    </View>
  );
}

/**
 * Section Clinique - Signes Généraux
 */
function SignesGenerauxSection({ patient }: TBKPathologyPDFProps) {
  const generalSigns = getNestedValue(patient, "tbkGeneralSigns") as
    | Record<string, unknown>
    | undefined;

  if (!generalSigns || !Object.values(generalSigns).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Signes Généraux</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Fièvre" value={generalSigns?.fever} />
        </View>
        {!!generalSigns?.fever && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField label="Type fièvre" value={generalSigns?.feverType} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Valeur fièvre"
                value={generalSigns?.feverValue}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Anorexie" value={generalSigns?.anorexia} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Perte de poids" value={generalSigns?.weightLoss} />
        </View>
        {!!generalSigns?.weightLoss && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Type perte de poids"
                value={generalSigns?.weightLossType}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Valeur perte de poids"
                value={generalSigns?.weightLossValue}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Asthénie" value={generalSigns?.asthenia} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="OMS PS" value={generalSigns?.omsPs} />
        </View>
      </View>
      </View>
    </View>
  );
}

/**
 * Section Clinique - Signes Fonctionnels
 */
function SignesFonctionnelsSection({ patient }: TBKPathologyPDFProps) {
  const functionalSigns = getNestedValue(patient, "tbkFunctionalSigns") as
    | Record<string, unknown>
    | undefined;

  if (
    !functionalSigns ||
    !Object.values(functionalSigns).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Signes Fonctionnels</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Toux" value={functionalSigns?.cough} />
        </View>
        {!!functionalSigns?.cough && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Aspect expectoration"
              value={functionalSigns?.sputumAspect}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Hémoptysie"
            value={functionalSigns?.hemoptysisAbundance}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Douleur thoracique"
            value={functionalSigns?.thoracicPain}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Dyspnée" value={functionalSigns?.dyspnea} />
        </View>
        {!!functionalSigns?.dyspnea && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Stade MMRC"
              value={functionalSigns?.dyspneaMmrcStage}
            />
          </View>
        )}
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres signes fonctionnels"
            value={functionalSigns?.otherFunctionalSigns}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Signes extrathoraciques"
            value={functionalSigns?.extrathoracicSigns}
          />
        </View>
        {!!functionalSigns?.extrathoracicSigns && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails signes extrathoraciques"
              value={functionalSigns?.extrathoracicSignsDetails}
            />
          </View>
        )}
      </View>
      </View>
    </View>
  );
}

/**
 * Section Clinique - Examen Clinique
 */
function ExamenCliniqueSection({ patient }: TBKPathologyPDFProps) {
  const clinicalExam = getNestedValue(patient, "tbkClinicalExam") as
    | Record<string, unknown>
    | undefined;

  if (!clinicalExam || !Object.values(clinicalExam).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Examen Clinique</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Température (°C)"
            value={clinicalExam?.temperature}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Pression artérielle"
            value={clinicalExam?.bloodPressure}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Pouls (bpm)" value={clinicalExam?.pulse} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Saturation O2 (%)"
            value={clinicalExam?.oxygenSaturation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Couleur conjonctives"
            value={clinicalExam?.conjunctivaColor}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Hygiène buccale" value={clinicalExam?.oralHygiene} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Poids (kg)" value={clinicalExam?.weight} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Taille (cm)" value={clinicalExam?.height} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="IMC" value={clinicalExam?.bmi} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Examen pleuro-pulmonaire"
            value={clinicalExam?.pleuroPulmonaryExam}
          />
        </View>
        {clinicalExam?.pleuroPulmonaryExam === "Anormal" && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails examen pleuro-pulmonaire"
              value={clinicalExam?.pleuroPulmonaryExamDetails}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Examen général" value={clinicalExam?.generalExam} />
        </View>
        {clinicalExam?.generalExam === "Anormal" && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails examen général"
              value={clinicalExam?.generalExamDetails}
            />
          </View>
        )}
      </View>
      </View>
    </View>
  );
}

/**
 * Section Clinique complète
 */
function CliniqueSection({ patient }: TBKPathologyPDFProps) {
  const hasSignesGeneraux = hasValue(
    getNestedValue(patient, "tbkGeneralSigns")
  );
  const hasSignesFonctionnels = hasValue(
    getNestedValue(patient, "tbkFunctionalSigns")
  );
  const hasExamenClinique = hasValue(
    getNestedValue(patient, "tbkClinicalExam")
  );

  if (!hasSignesGeneraux && !hasSignesFonctionnels && !hasExamenClinique) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Clinique</Text>
      <View style={pathologyStyles.tbkSection}>
        <SignesGenerauxSection patient={patient} />
        <SignesFonctionnelsSection patient={patient} />
        <ExamenCliniqueSection patient={patient} />
      </View>
    </View>
  );
}

/**
 * Section Paraclinique - Rx Thoracique
 */
function RxThoraciqueSection({ patient }: TBKPathologyPDFProps) {
  const chestXRay = getNestedValue(patient, "tbkChestXRay") as
    | Record<string, unknown>
    | undefined;

  if (!chestXRay || !Object.values(chestXRay).some((v) => hasValue(v))) {
    return null;
  }

  const lesionTypes = chestXRay?.lesionTypes as string[] | undefined;
  const extentLocation = chestXRay?.extentLocation as string[] | undefined;
  const imageFiles = chestXRay?.imageFiles as string[] | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Rx Thoracique</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Types de lésions" value={lesionTypes?.join(", ")} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Autres lésions" value={chestXRay?.otherLesions} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Extension et localisation"
            value={extentLocation?.join(", ")}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Épanchement pleural associé"
            value={chestXRay?.associatedPleuralEffusion}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Adénopathies associées"
            value={chestXRay?.associatedAdenopathies}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres lésions associées"
            value={chestXRay?.otherAssociatedLesions}
          />
        </View>
      </View>
      {imageFiles && imageFiles.length > 0 && (
        <PDFImageGrid label="Images Rx Thoracique" images={imageFiles} />
      )}
      </View>
    </View>
  );
}

/**
 * Section Paraclinique - Bactériologie des Expectorations
 */
function BacteriologieExpectorationsSection({ patient }: TBKPathologyPDFProps) {
  const sputumBacteriology = getNestedValue(
    patient,
    "tbkSputumBacteriology"
  ) as Record<string, unknown> | undefined;

  if (
    !sputumBacteriology ||
    !Object.values(sputumBacteriology).some((v) => hasValue(v))
  ) {
    return null;
  }

  const directExams = sputumBacteriology?.directExams as
    | Array<{
        date: string | null;
        result: string;
        bacterialLoad: string;
      }>
    | undefined;
  const bkCulture = sputumBacteriology?.bkCulture as
    | {
        date: string | null;
        medium: string;
        result: string;
        bacterialLoad: number | null;
      }
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>
        Bactériologie des Expectorations
      </Text>
      <View style={pathologyStyles.tbkSection}>
        {directExams &&
          directExams.length > 0 &&
          directExams.some((e) => hasValue(e)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Examens directs</Text>
              {directExams.map((exam, index) => {
                if (
                  !hasValue(exam.date) &&
                  !hasValue(exam.result) &&
                  !hasValue(exam.bacterialLoad)
                ) {
                  return null;
                }
                return (
                  <View key={index} style={baseStyles.grid}>
                    <View style={baseStyles.gridItem}>
                      <PDFField label="Date" value={exam.date} />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField label="Résultat" value={exam.result} />
                    </View>
                    <View style={baseStyles.gridItem}>
                      <PDFField
                        label="Charge bacillaire"
                        value={exam.bacterialLoad}
                      />
                    </View>
                  </View>
                );
              })}
            </>
          )}
        {bkCulture && hasValue(bkCulture) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Culture BK</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Date" value={bkCulture.date} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Milieu" value={bkCulture.medium} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Résultat" value={bkCulture.result} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Charge bacillaire"
                  value={bkCulture.bacterialLoad}
                />
              </View>
            </View>
          </>
        )}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Antibiogramme"
              value={sputumBacteriology?.antibiogram}
            />
          </View>
          {sputumBacteriology?.antibiogram === "Fait" && (
            <>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Type antibiogramme"
                  value={sputumBacteriology?.antibiogramType}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Résultat antibiogramme"
                  value={sputumBacteriology?.antibiogramResult}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails résistance"
                  value={sputumBacteriology?.resistanceDetails}
                />
              </View>
            </>
          )}
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autre bactériologie"
              value={sputumBacteriology?.otherBacteriology}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Paraclinique - Génétique BK
 */
function GenetiqueBKSection({ patient }: TBKPathologyPDFProps) {
  const bkGenetics = getNestedValue(patient, "tbkBkGenetics") as
    | Record<string, unknown>
    | undefined;

  if (!bkGenetics || !Object.values(bkGenetics).some((v) => hasValue(v))) {
    return null;
  }

  const hainSensitivity = bkGenetics?.hainSensitivity as string[] | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Génétique BK</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="GeneXpert" value={bkGenetics?.genexpert} />
        </View>
        {bkGenetics?.genexpert === "Fait" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Date GeneXpert"
                value={bkGenetics?.genexpertDate}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="ADN MTB" value={bkGenetics?.mtbDna} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Sensibilité Rifampicine"
                value={bkGenetics?.rifampicinSensitivity}
              />
            </View>
          </>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="HAIN" value={bkGenetics?.hain} />
        </View>
        {bkGenetics?.hain === "Fait" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField label="Date HAIN" value={bkGenetics?.hainDate} />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Sensibilité HAIN"
                value={hainSensitivity?.join(", ")}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Autres résistances"
                value={bkGenetics?.hainOtherResistances}
              />
            </View>
          </>
        )}
      </View>
      </View>
    </View>
  );
}

/**
 * Section Paraclinique - Biologie
 */
function BiologieSection({ patient }: TBKPathologyPDFProps) {
  const biology = getNestedValue(patient, "tbkBiology") as
    | Record<string, unknown>
    | undefined;

  if (!biology || !Object.values(biology).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>Biologie</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>NFS</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="Hb (g/dL)" value={biology?.nfsHb} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="GB (G/L)" value={biology?.nfsWbc} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Plaquettes (G/L)" value={biology?.nfsPlatelets} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Lymphocytes (G/L)" value={biology?.nfsLymphocytes} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="PNN (G/L)" value={biology?.nfsPmn} />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Inflammation</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="VS (mm)" value={biology?.esr} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="CRP (mg/L)" value={biology?.crp} />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Fonction rénale</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="Urée (mmol/L)" value={biology?.urea} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Créatinine (μmol/L)" value={biology?.creatinine} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Clairance calculée"
            value={biology?.calculatedCreatinineClearance}
          />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Fonction hépatique</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="ALT (UI/L)" value={biology?.alt} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="ALP (UI/L)" value={biology?.alp} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Rapport ALT/ALP" value={biology?.altAlpRatio} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="GGT (UI/L)" value={biology?.ggt} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Bilirubine totale" value={biology?.totalBilirubin} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="TP (%)" value={biology?.prothrombinTime} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Albumine (g/L)" value={biology?.albumin} />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Sérologies</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="Sérologie VHB" value={biology?.hbvSerology} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Sérologie VHC" value={biology?.hcvSerology} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Sérologie VIH" value={biology?.hivSerology} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="HbA1c admission"
            value={biology?.admissionGlycatedHemoglobin}
          />
        </View>
      </View>
      <View style={baseStyles.gridItemFull}>
        <PDFField
          label="Autres bilans biologiques"
          value={biology?.otherBiologicalAssessments}
        />
      </View>
      </View>
    </View>
  );
}

/**
 * Section Paraclinique - Autres Bilans Paracliniques
 */
function AutresBilansParacliniquesSection({ patient }: TBKPathologyPDFProps) {
  const otherAssessments = getNestedValue(patient, "tbkOtherAssessments") as
    | Record<string, unknown>
    | undefined;

  if (
    !otherAssessments ||
    !Object.values(otherAssessments).some((v) => hasValue(v))
  ) {
    return null;
  }

  const thoracicCtImages = otherAssessments?.thoracicCtImages as
    | string[]
    | undefined;
  const bronchoscopyImages = otherAssessments?.bronchoscopyImages as
    | string[]
    | undefined;
  const pleuralPunctureImages = otherAssessments?.pleuralPunctureImages as
    | string[]
    | undefined;
  const pleuralBiopsyImages = otherAssessments?.pleuralBiopsyImages as
    | string[]
    | undefined;
  const otherAssessmentsImages = otherAssessments?.otherAssessmentsImages as
    | string[]
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.subsectionTitle}>
        Autres Bilans Paracliniques
      </Text>
      <View style={pathologyStyles.tbkSection}>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="TDM thoracique"
            value={otherAssessments?.thoracicCt}
          />
        </View>
        {otherAssessments?.thoracicCt === "Fait" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Date TDM"
                value={otherAssessments?.thoracicCtDate}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Indication TDM"
                value={otherAssessments?.thoracicCtIndication}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Résultats TDM"
                value={otherAssessments?.thoracicCtResults}
              />
            </View>
          </>
        )}
      </View>
      {thoracicCtImages && thoracicCtImages.length > 0 && (
        <PDFImageGrid label="Images TDM Thoracique" images={thoracicCtImages} />
      )}
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Bronchoscopie"
            value={otherAssessments?.bronchoscopy}
          />
        </View>
        {otherAssessments?.bronchoscopy === "Faite" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Date bronchoscopie"
                value={otherAssessments?.bronchoscopyDate}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Indication bronchoscopie"
                value={otherAssessments?.bronchoscopyIndication}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Aspect macroscopique"
                value={otherAssessments?.macroscopicAspect}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Post-fibro BK examen direct"
                value={otherAssessments?.postFibroBkDirectExam}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Aspiration bronchique"
                value={otherAssessments?.bronchialAspiration}
              />
            </View>
            {otherAssessments?.bronchialAspiration === "Faite" && (
              <>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Aspiration BK direct"
                    value={otherAssessments?.bronchialAspirationBkDirect}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Aspiration BK charge"
                    value={otherAssessments?.bronchialAspirationBkLoad}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Aspiration BK culture"
                    value={otherAssessments?.bronchialAspirationBkCulture}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Aspiration nb colonies"
                    value={otherAssessments?.bronchialAspirationColonyCount}
                  />
                </View>
              </>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Biopsies bronchiques"
                value={otherAssessments?.bronchialBiopsies}
              />
            </View>
            {otherAssessments?.bronchialBiopsies === "Fait" && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Résultat biopsies"
                  value={otherAssessments?.bronchialBiopsiesResult}
                />
              </View>
            )}
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Autre bronchoscopie"
                value={otherAssessments?.otherBronchoscopy}
              />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Résultats bronchoscopie"
                value={otherAssessments?.bronchoscopyResults}
              />
            </View>
          </>
        )}
      </View>
      {bronchoscopyImages && bronchoscopyImages.length > 0 && (
        <PDFImageGrid
          label="Images Bronchoscopie"
          images={bronchoscopyImages}
        />
      )}
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Ponction pleurale"
            value={otherAssessments?.pleuralPuncture}
          />
        </View>
        {otherAssessments?.pleuralPuncture === "Faite" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Date ponction"
                value={otherAssessments?.pleuralPunctureDate}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Aspect liquide"
                value={otherAssessments?.pleuralFluidAspect}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Biochimie"
                value={otherAssessments?.pleuralBiochemistry}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Cytologie"
                value={otherAssessments?.pleuralCytology}
              />
            </View>
          </>
        )}
      </View>
      {pleuralPunctureImages && pleuralPunctureImages.length > 0 && (
        <PDFImageGrid
          label="Images Ponction Pleurale"
          images={pleuralPunctureImages}
        />
      )}
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Biopsie pleurale"
            value={otherAssessments?.pleuralBiopsy}
          />
        </View>
        {otherAssessments?.pleuralBiopsy === "Faite" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Date biopsie"
                value={otherAssessments?.pleuralBiopsyDate}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Histologie"
                value={otherAssessments?.pleuralHistology}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Culture BK fragment"
                value={otherAssessments?.pleuralFragmentBkCulture}
              />
            </View>
          </>
        )}
      </View>
      {pleuralBiopsyImages && pleuralBiopsyImages.length > 0 && (
        <PDFImageGrid
          label="Images Biopsie Pleurale"
          images={pleuralBiopsyImages}
        />
      )}
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Type autres examens histologiques"
            value={otherAssessments?.otherHistologicalExamsType}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Résultats autres examens histologiques"
            value={otherAssessments?.otherHistologicalExamsResults}
          />
        </View>
      </View>
      {otherAssessmentsImages && otherAssessmentsImages.length > 0 && (
        <PDFImageGrid label="Autres Images" images={otherAssessmentsImages} />
      )}
      </View>
    </View>
  );
}

/**
 * Section Paraclinique complète
 */
function ParacliniqueSection({ patient }: TBKPathologyPDFProps) {
  const hasRxThoracique = hasValue(getNestedValue(patient, "tbkChestXRay"));
  const hasBacteriologie = hasValue(
    getNestedValue(patient, "tbkSputumBacteriology")
  );
  const hasGenetique = hasValue(getNestedValue(patient, "tbkBkGenetics"));
  const hasBiologie = hasValue(getNestedValue(patient, "tbkBiology"));
  const hasAutresBilans = hasValue(
    getNestedValue(patient, "tbkOtherAssessments")
  );

  if (
    !hasRxThoracique &&
    !hasBacteriologie &&
    !hasGenetique &&
    !hasBiologie &&
    !hasAutresBilans
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Paraclinique</Text>
      <View style={pathologyStyles.tbkSection}>
        <RxThoraciqueSection patient={patient} />
        <BacteriologieExpectorationsSection patient={patient} />
        <GenetiqueBKSection patient={patient} />
        <BiologieSection patient={patient} />
        <AutresBilansParacliniquesSection patient={patient} />
      </View>
    </View>
  );
}

/**
 * Section Traitement Prescrit
 */
function TraitementPrescritSection({ patient }: TBKPathologyPDFProps) {
  const prescribedTreatment = getNestedValue(
    patient,
    "tbkPrescribedTreatment"
  ) as Record<string, unknown> | undefined;

  if (
    !prescribedTreatment ||
    !Object.values(prescribedTreatment).some((v) => hasValue(v))
  ) {
    return null;
  }

  const regimen = prescribedTreatment?.regimen as string[] | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Traitement Prescrit</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Date début" value={prescribedTreatment?.startDate} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Schéma" value={regimen?.join(", ")} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autre schéma"
            value={prescribedTreatment?.otherRegimen}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Dosage" value={prescribedTreatment?.dosage} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres thérapeutiques"
            value={prescribedTreatment?.otherTherapeutics}
          />
        </View>
      </View>
      </View>
    </View>
  );
}

/**
 * Section Dosage Sérique des AT
 */
function DosageSeriqueATSection({ patient }: TBKPathologyPDFProps) {
  const serumDosage = getNestedValue(patient, "tbkSerumDosage") as
    | Record<string, unknown>
    | undefined;

  if (!serumDosage || !Object.values(serumDosage).some((v) => hasValue(v))) {
    return null;
  }

  const hemie = serumDosage?.hemie as Record<string, unknown> | undefined;
  const remie = serumDosage?.remie as Record<string, unknown> | undefined;
  const zemie = serumDosage?.zemie as Record<string, unknown> | undefined;
  const emie = serumDosage?.emie as Record<string, unknown> | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Dosage Sérique des AT</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Statut" value={serumDosage?.status} />
        </View>
        {serumDosage?.status === "Faite" && (
          <>
            <View style={baseStyles.gridItem}>
              <PDFField label="Date" value={serumDosage?.date} />
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField label="Indication" value={serumDosage?.indication} />
            </View>
          </>
        )}
      </View>
      {!!hemie?.performed && (
        <View style={baseStyles.grid}>
          <Text style={baseStyles.subsectionTitle}>H/EMIE</Text>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date dosage" value={hemie?.dosageDate} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Pic sérique" value={hemie?.peakSerumLevel} />
          </View>
        </View>
      )}
      {!!remie?.performed && (
        <View style={baseStyles.grid}>
          <Text style={baseStyles.subsectionTitle}>R/EMIE</Text>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date dosage" value={remie?.dosageDate} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Pic sérique" value={remie?.peakSerumLevel} />
          </View>
        </View>
      )}
      {!!zemie?.performed && (
        <View style={baseStyles.grid}>
          <Text style={baseStyles.subsectionTitle}>Z/EMIE</Text>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date dosage" value={zemie?.dosageDate} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Pic sérique" value={zemie?.peakSerumLevel} />
          </View>
        </View>
      )}
      {!!emie?.performed && (
        <View style={baseStyles.grid}>
          <Text style={baseStyles.subsectionTitle}>E/EMIE</Text>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date dosage" value={emie?.dosageDate} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Pic sérique" value={emie?.peakSerumLevel} />
          </View>
        </View>
      )}
      </View>
    </View>
  );
}

/**
 * Section Évolution
 */
function EvolutionSection({ patient }: TBKPathologyPDFProps) {
  const evolution = getNestedValue(patient, "tbkEvolution") as
    | Record<string, unknown>
    | undefined;

  if (!evolution || !Object.values(evolution).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Évolution</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Évolution Clinique</Text>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Évolution clinique"
            value={evolution?.clinicalEvolution}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autre évolution"
            value={evolution?.otherClinicalEvolution}
          />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Bactério BK ED J15</Text>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Examen direct J15"
            value={evolution?.day15BkDirectExam}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Charge bacillaire J15"
            value={evolution?.day15BkLoad}
          />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Rx Thoracique</Text>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Évolution Rx"
            value={evolution?.chestXRayEvolution}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autre évolution Rx"
            value={evolution?.otherChestXRayEvolution}
          />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Tolérance du Traitement</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="Tolérance" value={evolution?.treatmentTolerance} />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails tolérance"
            value={evolution?.toleranceDetails}
          />
        </View>
      </View>
      <View style={baseStyles.grid}>
        <Text style={baseStyles.subsectionTitle}>Effets Secondaires</Text>
        <View style={baseStyles.gridItem}>
          <PDFField label="Effets secondaires" value={evolution?.sideEffects} />
        </View>
        {!!evolution?.sideEffects && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails effets secondaires"
              value={evolution?.sideEffectsDetails}
            />
          </View>
        )}
      </View>
      </View>
    </View>
  );
}

/**
 * Section Conclusion de Sortie
 */
function ConclusionSortieSection({ patient }: TBKPathologyPDFProps) {
  const dischargeConclusion = getNestedValue(
    patient,
    "tbkDischargeConclusion"
  ) as Record<string, unknown> | undefined;

  if (
    !dischargeConclusion ||
    !Object.values(dischargeConclusion).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Conclusion de Sortie</Text>
      <View style={pathologyStyles.tbkSection}>
        <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Date de sortie"
            value={dischargeConclusion?.dischargeDate}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Conclusion"
            value={dischargeConclusion?.dischargeConclusion}
          />
        </View>
      </View>
      </View>
    </View>
  );
}

/**
 * Composant principal pour la pathologie Tuberculose
 */
export function TBKPathologyPDF({ patient }: TBKPathologyPDFProps) {
  return (
    <View>
      <MotifHospitalisationSection patient={patient} />
      <ATCDSection patient={patient} />
      <CliniqueSection patient={patient} />
      <ParacliniqueSection patient={patient} />
      <TraitementPrescritSection patient={patient} />
      <DosageSeriqueATSection patient={patient} />
      <EvolutionSection patient={patient} />
      <ConclusionSortieSection patient={patient} />
    </View>
  );
}
