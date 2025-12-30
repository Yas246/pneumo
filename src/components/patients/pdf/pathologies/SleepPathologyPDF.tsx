/**
 * Composant PDF pour la pathologie Sleep (Troubles respiratoires du sommeil)
 * Affiche toutes les données du formulaire sleep de manière structurée
 *
 * @module SleepPathologyPDF
 * @description Composant de génération PDF pour les troubles respiratoires du sommeil
 * @accessibility Conforme WCAG AA pour les documents médicaux
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles, pathologyStyles } from "../styles";

interface SleepPathologyPDFProps {
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
 * Section Antécédents et Facteurs de Risque
 */
function AntecedentsSection({ patient }: SleepPathologyPDFProps) {
  const personalHistory = getNestedValue(patient, "sleepPersonalHistory") as
    | Record<string, unknown>
    | undefined;
  const familyHistory = getNestedValue(patient, "sleepFamilyHistory") as
    | Record<string, unknown>
    | undefined;

  const hasPersonalHistory =
    personalHistory && Object.values(personalHistory).some((v) => hasValue(v));
  const hasFamilyHistory =
    familyHistory && Object.values(familyHistory).some((v) => hasValue(v));

  if (!hasPersonalHistory && !hasFamilyHistory) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <View style={pathologyStyles.sleepSection}>
        <Text style={baseStyles.sectionTitle}>
          Antécédents et Facteurs de Risque
        </Text>
        {hasPersonalHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Antecedents Personnels
            </Text>

            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Obesite" value={personalHistory?.obesity} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="HTA" value={personalHistory?.hta} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antecedents ORL"
                  value={personalHistory?.orl}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antecedents Neurologiques"
                  value={personalHistory?.neuro}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Tabagisme" value={personalHistory?.smoking} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Alcoolisme"
                  value={personalHistory?.alcoholism}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Diabete" value={personalHistory?.diabetes} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Maladies Cardiovasculaires"
                  value={personalHistory?.cardiovascularDiseases}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Mode de vie"
                  value={personalHistory?.lifestyle}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Pathologie Respiratoire"
                  value={personalHistory?.respiratoryPathology}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Traitements en cours"
                  value={personalHistory?.currentMedications}
                />
              </View>
            </View>
          </>
        )}

        {hasFamilyHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Antecedents Familiaux
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antecedents de SAOS"
                  value={familyHistory?.saosHistory}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Pathologies Respiratoires"
                  value={familyHistory?.respiratoryPathologies}
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
function ClinicalExamSection({ patient }: SleepPathologyPDFProps) {
  const clinicalExam = getNestedValue(patient, "clinicalExam") as
    | Record<string, unknown>
    | undefined;

  if (!clinicalExam || !Object.values(clinicalExam).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examen Clinique</Text>
      <View style={pathologyStyles.sleepSection}>
        <View style={baseStyles.grid}>
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
              label="Tour de cou (cm)"
              value={clinicalExam?.neckCircumference}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Perimetre abdominal (cm)"
              value={clinicalExam?.abdominalPerimeter}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Pression arterielle"
              value={clinicalExam?.bloodPressure}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Frequence cardiaque (bpm)"
              value={clinicalExam?.heartRate}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Saturation (%)" value={clinicalExam?.saturation} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Auscultation pulmonaire"
              value={clinicalExam?.pulmonaryAuscultation}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section Examen ORL
 */
function ORLExamSection({ patient }: SleepPathologyPDFProps) {
  const orlExam = getNestedValue(patient, "sleepOrlExam") as
    | Record<string, unknown>
    | undefined;

  if (!orlExam || !Object.values(orlExam).some((v) => hasValue(v))) {
    return null;
  }

  const facialMorphology = orlExam?.facialMorphology as
    | Record<string, unknown>
    | undefined;
  const nasofibroscopy = orlExam?.nasofibroscopy as
    | Record<string, unknown>
    | undefined;
  const maneuvers = orlExam?.maneuvers as Record<string, unknown> | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examen ORL</Text>
      <View style={pathologyStyles.sleepSection}>
        {/* Morphologie faciale */}
        {facialMorphology &&
          Object.values(facialMorphology).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Morphologie Faciale
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Retrognathisme"
                    value={facialMorphology?.retrognathism}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Prognathisme"
                    value={facialMorphology?.prognathism}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Rétromaxillie"
                    value={facialMorphology?.retromaxillia}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Autre" value={facialMorphology?.other} />
                </View>
              </View>
            </>
          )}

        {/* Autres examens ORL */}
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Os hyoïde" value={orlExam?.hyoidBone} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Classe dentaire" value={orlExam?.dentalClass} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Voûte palatine ogivale"
              value={orlExam?.ogivalPalate}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Mallampati" value={orlExam?.mallampati} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Friedman" value={orlExam?.friedman} />
          </View>
        </View>

        {/* Nasofibroscopie */}
        {nasofibroscopy &&
          Object.values(nasofibroscopy).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>Nasofibroscopie</Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Fosses nasales"
                    value={nasofibroscopy?.nasalFossae}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Obstacle rétrovélaire"
                    value={nasofibroscopy?.retrovelarObstacle}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Obstacle rétrobasilingual"
                    value={nasofibroscopy?.retrobasillingualObstacle}
                  />
                </View>
              </View>
            </>
          )}

        {/* Manoeuvres */}
        {maneuvers && Object.values(maneuvers).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Manoeuvres</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Protraction linguale"
                  value={maneuvers?.tongueProtraction}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ronflement simulé"
                  value={maneuvers?.simulatedSnoring}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Prognathisme" value={maneuvers?.prognathism} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Autre examen" value={maneuvers?.otherExam} />
              </View>
            </View>
          </>
        )}

        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres examens cliniques"
            value={orlExam?.otherClinicalExams}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Examens Complementaires
 */
function ComplementaryExamsSection({ patient }: SleepPathologyPDFProps) {
  const complementaryExams = getNestedValue(
    patient,
    "sleepComplementaryExams"
  ) as Record<string, unknown> | undefined;

  if (
    !complementaryExams ||
    !Object.values(complementaryExams).some((v) => hasValue(v))
  ) {
    return null;
  }

  const imaging = complementaryExams?.imaging as
    | Record<string, unknown>
    | undefined;
  const chestXray = complementaryExams?.chestXray as
    | Record<string, unknown>
    | undefined;
  const scanner = complementaryExams?.scanner as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examens Complémentaires</Text>
      <View style={pathologyStyles.sleepSection}>
        {/* Types d'examens */}
        <Text style={baseStyles.subsectionTitle}>Examens Demandes</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Polygraphie ventilatoire"
              value={complementaryExams?.ventilationPolygraphy}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Polysomnographie"
              value={complementaryExams?.psg}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Holter tensionnel"
              value={complementaryExams?.tensionalHolter}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Oxymétrie nocturne"
              value={complementaryExams?.nightOximetry}
            />
          </View>
          {imaging && (
            <>
              <View style={baseStyles.gridItem}>
                <PDFField label="Radio thorax" value={imaging?.chestXray} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Scanner ORL" value={imaging?.orlScan} />
              </View>
            </>
          )}
        </View>

        {/* Resultats Polygraphie */}
        {hasValue(complementaryExams?.polygraphyDate) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Resultats Polygraphie
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Date"
                  value={complementaryExams?.polygraphyDate}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="IAH (events/h)"
                  value={complementaryExams?.iah}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="IAH Central (events/h)"
                  value={complementaryExams?.iahCentral}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Desaturation O2 (%)"
                  value={complementaryExams?.oxygenDesaturation}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="CT90 (%)" value={complementaryExams?.ct90} />
              </View>
            </View>
          </>
        )}

        {/* Gazometrie */}
        {hasValue(complementaryExams?.gazometryDate) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Gazometrie</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Date"
                  value={complementaryExams?.gazometryDate}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="pH" value={complementaryExams?.ph} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="PaO2 (mmHg)"
                  value={complementaryExams?.pao2}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="PaCO2 (mmHg)"
                  value={complementaryExams?.paco2}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="HCO3 (mmol/L)"
                  value={complementaryExams?.hco3}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="SaO2 (%)" value={complementaryExams?.sao2} />
              </View>
            </View>
          </>
        )}

        {/* EFR */}
        {hasValue(complementaryExams?.efrDate) && (
          <>
            <Text style={baseStyles.subsectionTitle}>EFR</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Date" value={complementaryExams?.efrDate} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="CVF (L)" value={complementaryExams?.cvf} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="VEMS (L)" value={complementaryExams?.vems} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="DLCO (mL/min/mmHg)"
                  value={complementaryExams?.dlco}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="CPT (L)" value={complementaryExams?.cpt} />
              </View>
            </View>
          </>
        )}

        {/* Autres examens */}
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres examens"
            value={complementaryExams?.otherExams}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Bilan metabolique"
            value={complementaryExams?.metabolicAssessment}
          />
        </View>

        {/* Images Radio Thorax */}
        {chestXray && hasValue(chestXray.imageUrls) && (
          <PDFImageGrid
            label="Radio Thorax"
            images={chestXray.imageUrls as string[]}
          />
        )}
        {chestXray && hasValue(chestXray.notes) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Notes Radio Thorax" value={chestXray.notes} />
          </View>
        )}

        {/* Images Scanner */}
        {scanner && hasValue(scanner.imageUrls) && (
          <PDFImageGrid
            label="Scanner ORL - Images"
            images={scanner.imageUrls as string[]}
          />
        )}
        {scanner && hasValue(scanner.videoUrls) && (
          <PDFImageGrid
            label="Scanner ORL - Videos"
            images={scanner.videoUrls as string[]}
          />
        )}
        {scanner && hasValue(scanner.notes) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Notes Scanner" value={scanner.notes} />
          </View>
        )}

        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres examens complementaires"
            value={complementaryExams?.otherComplementaryExams}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Diagnostic
 */
function DiagnosisSection({ patient }: SleepPathologyPDFProps) {
  const diagnosis = getNestedValue(patient, "sleepDiagnosis") as
    | Record<string, unknown>
    | undefined;

  if (!diagnosis || !Object.values(diagnosis).some((v) => hasValue(v))) {
    return null;
  }

  const pathologies = diagnosis?.pathologies as
    | Array<{
        name: string;
        selected: boolean;
        treatments: Array<{ name: string; selected: boolean }>;
      }>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Diagnostic</Text>
      <View style={pathologyStyles.sleepSection}>
        <Text style={baseStyles.subsectionTitle}>
          Pathologies Diagnostiquees
        </Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="SAOS" value={diagnosis?.saos} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="SACS" value={diagnosis?.sacs} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="SOH" value={diagnosis?.soh} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Hypoventilation nocturne"
              value={diagnosis?.nocturnalHypoventilation}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Ronflement simple"
              value={diagnosis?.simpleSnoring}
            />
          </View>
        </View>

        {/* Pathologies et traitements associés */}
        {pathologies && pathologies.length > 0 && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Pathologies Associees
            </Text>
            {pathologies.map((pathology, index) => {
              if (!pathology.selected) return null;

              const selectedTreatments = pathology.treatments.filter(
                (t) => t.selected
              );

              return (
                <View key={index} style={baseStyles.field}>
                  <Text style={baseStyles.fieldLabel}>{pathology.name}:</Text>
                  {selectedTreatments.length > 0 && (
                    <View style={{ marginLeft: 10 }}>
                      {selectedTreatments.map((treatment, tIndex) => (
                        <Text key={tIndex} style={baseStyles.fieldValue}>
                          - {treatment.name}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </>
        )}

        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres traitements"
            value={diagnosis?.otherTreatments}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Plan de Traitement
 */
function TreatmentSection({ patient }: SleepPathologyPDFProps) {
  const treatment = getNestedValue(patient, "sleepTreatment") as
    | Record<string, unknown>
    | undefined;

  if (!treatment || !Object.values(treatment).some((v) => hasValue(v))) {
    return null;
  }

  const hygieneDietetic = treatment?.hygieneDietetic as
    | Record<string, unknown>
    | undefined;
  const medicalTreatments = treatment?.medicalTreatments as
    | Record<string, unknown>
    | undefined;
  const surgicalTreatments = treatment?.surgicalTreatments as
    | Record<string, unknown>
    | undefined;
  const equipment = treatment?.equipment as Record<string, unknown> | undefined;
  const exitPrescription = treatment?.exitPrescription as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Plan de Traitement</Text>
      <View style={pathologyStyles.sleepSection}>
        {/* Mesures hygiéno-diététiques */}
        {hygieneDietetic &&
          Object.values(hygieneDietetic).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Mesures Hygieno-Dietetiques
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Perte de poids"
                    value={hygieneDietetic?.weightLoss}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Arret alcool/sedatifs"
                    value={hygieneDietetic?.alcoholAndSedativesStop}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Amelioration hygiene du sommeil"
                    value={hygieneDietetic?.sleepHygieneImprovement}
                  />
                </View>
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Notes" value={hygieneDietetic?.notes} />
              </View>
            </>
          )}

        {/* Traitements médicaux */}
        {medicalTreatments &&
          Object.values(medicalTreatments).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Traitements Medicaux
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField label="PPC" value={medicalTreatments?.ppc} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="OAM" value={medicalTreatments?.oam} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Oxygenotherapie"
                    value={medicalTreatments?.oxygenotherapy}
                  />
                </View>
              </View>
              {medicalTreatments?.medications &&
                Array.isArray(medicalTreatments.medications) &&
                medicalTreatments.medications.length > 0 && (
                  <View style={baseStyles.field}>
                    <Text style={baseStyles.fieldLabel}>Medicaments:</Text>
                    {(medicalTreatments.medications as string[]).map(
                      (med, index) => (
                        <Text key={index} style={baseStyles.fieldValue}>
                          - {med}
                        </Text>
                      )
                    )}
                  </View>
                )}
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Autre" value={medicalTreatments?.other} />
              </View>
            </>
          )}

        {/* Traitements chirurgicaux */}
        {surgicalTreatments &&
          Object.values(surgicalTreatments).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Traitements Chirurgicaux
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Chirurgie ORL"
                    value={surgicalTreatments?.orlSurgery}
                  />
                </View>
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Notes" value={surgicalTreatments?.notes} />
              </View>
            </>
          )}

        {/* Equipement */}
        {equipment && Object.values(equipment).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Equipement</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="PPC" value={equipment?.ppc} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="OAM" value={equipment?.oam} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Oxygenotherapie"
                  value={equipment?.oxygenotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="VNI" value={equipment?.vni} />
              </View>
            </View>
            <View style={baseStyles.gridItemFull}>
              <PDFField label="Autre" value={equipment?.other} />
            </View>
          </>
        )}

        {/* Ordonnance de sortie */}
        {exitPrescription &&
          Object.values(exitPrescription).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Ordonnance de Sortie
              </Text>
              <View style={baseStyles.gridItemFull}>
                <PDFField label="Contenu" value={exitPrescription?.content} />
              </View>
              {hasValue(exitPrescription?.documentUrl) && (
                <View style={baseStyles.field}>
                  <Text style={baseStyles.fieldLabel}>Document:</Text>
                  <Text style={baseStyles.fieldValue}>
                    {exitPrescription?.documentUrl as string}
                  </Text>
                </View>
              )}
            </>
          )}

        <View style={baseStyles.gridItemFull}>
          <PDFField label="Autre" value={treatment?.other} />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Suivi PPC
 */
function PPCFollowUpSection({ patient }: SleepPathologyPDFProps) {
  const ppcFollowUp = getNestedValue(patient, "sleepPpcFollowUp") as
    | Record<string, unknown>
    | undefined;

  if (!ppcFollowUp || !Object.values(ppcFollowUp).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Suivi PPC</Text>
      <View style={pathologyStyles.sleepSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Medecin prescripteur"
              value={ppcFollowUp?.ppcPrescribingDoctor}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Date de debut" value={ppcFollowUp?.ppcStartDate} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Modele d'appareil"
              value={ppcFollowUp?.deviceModel}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Fournisseur" value={ppcFollowUp?.deviceSupplier} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Pression initiale (cmH2O)"
              value={ppcFollowUp?.initialPressure}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Mode de ventilation"
              value={ppcFollowUp?.ventilationMode}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Humidificateur" value={ppcFollowUp?.humidifier} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Type de masque" value={ppcFollowUp?.maskType} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Modele de masque" value={ppcFollowUp?.maskModel} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Taille de masque" value={ppcFollowUp?.maskSize} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Numero de serie"
              value={ppcFollowUp?.serialNumber}
            />
          </View>
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres accessoires"
            value={ppcFollowUp?.otherAccessories}
          />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Motif de Consultation
 */
function ConsultationReasonSection({ patient }: SleepPathologyPDFProps) {
  const consultationReason = getNestedValue(patient, "consultationReason") as
    | string
    | undefined;
  const symptomsDuration = getNestedValue(patient, "symptomsDuration") as
    | string
    | undefined;
  const diurnalSymptoms = getNestedValue(patient, "diurnalSymptoms") as
    | Record<string, unknown>
    | undefined;
  const nocturnalSymptoms = getNestedValue(patient, "nocturnalSymptoms") as
    | Record<string, unknown>
    | undefined;

  const hasAnyConsultationData =
    hasValue(consultationReason) ||
    hasValue(symptomsDuration) ||
    hasValue(diurnalSymptoms?.excessiveSleepiness) ||
    hasValue(diurnalSymptoms?.headaches) ||
    hasValue(diurnalSymptoms?.asthenia) ||
    (hasValue(diurnalSymptoms?.showEpworth) &&
      hasValue(diurnalSymptoms?.epworthScore)) ||
    hasValue(nocturnalSymptoms?.snoring) ||
    hasValue(nocturnalSymptoms?.sleepApnea) ||
    hasValue(nocturnalSymptoms?.choking) ||
    hasValue(nocturnalSymptoms?.agitation) ||
    hasValue(nocturnalSymptoms?.insomnia) ||
    hasValue(nocturnalSymptoms?.nocturia) ||
    hasValue(nocturnalSymptoms?.other);

  if (!hasAnyConsultationData) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Motif de Consultation</Text>
      <View style={pathologyStyles.sleepSection}>
        {/* Motif principal */}
        {hasValue(consultationReason) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Motif principal" value={consultationReason} />
          </View>
        )}

        {/* Durée des symptômes */}
        {hasValue(symptomsDuration) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Duree des symptomes" value={symptomsDuration} />
          </View>
        )}

        {/* Symptômes diurnes */}
        {(hasValue(diurnalSymptoms?.excessiveSleepiness) ||
          hasValue(diurnalSymptoms?.headaches) ||
          hasValue(diurnalSymptoms?.asthenia) ||
          (hasValue(diurnalSymptoms?.showEpworth) &&
            hasValue(diurnalSymptoms?.epworthScore))) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Symptomes Diurnes</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Somnolence diurne excessive"
                  value={diurnalSymptoms?.excessiveSleepiness}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cephalées"
                  value={diurnalSymptoms?.headaches}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Asthénie" value={diurnalSymptoms?.asthenia} />
              </View>
              {hasValue(diurnalSymptoms?.showEpworth) &&
                hasValue(diurnalSymptoms?.epworthScore) && (
                  <View style={baseStyles.gridItem}>
                    <PDFField
                      label="Score d'Epworth"
                      value={`${diurnalSymptoms?.epworthScore}/24`}
                    />
                  </View>
                )}
            </View>
          </>
        )}

        {/* Symptômes nocturnes */}
        {(hasValue(nocturnalSymptoms?.snoring) ||
          hasValue(nocturnalSymptoms?.sleepApnea) ||
          hasValue(nocturnalSymptoms?.choking) ||
          hasValue(nocturnalSymptoms?.agitation) ||
          hasValue(nocturnalSymptoms?.insomnia) ||
          hasValue(nocturnalSymptoms?.nocturia) ||
          hasValue(nocturnalSymptoms?.other)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Symptomes Nocturnes</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ronflements"
                  value={nocturnalSymptoms?.snoring}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Apnees nocturnes"
                  value={nocturnalSymptoms?.sleepApnea}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Etouffement/Suffocation"
                  value={nocturnalSymptoms?.choking}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Agitation"
                  value={nocturnalSymptoms?.agitation}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Insomnie"
                  value={nocturnalSymptoms?.insomnia}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Nycturie"
                  value={nocturnalSymptoms?.nocturia}
                />
              </View>
              {hasValue(nocturnalSymptoms?.other) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Autres symptomes nocturnes"
                    value={nocturnalSymptoms?.other}
                  />
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

/**
 * Composant principal pour la pathologie Sleep
 */
export function SleepPathologyPDF({ patient }: SleepPathologyPDFProps) {
  return (
    <View>
      <ConsultationReasonSection patient={patient} />
      <AntecedentsSection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ORLExamSection patient={patient} />
      <ComplementaryExamsSection patient={patient} />
      <DiagnosisSection patient={patient} />
      <TreatmentSection patient={patient} />
      <PPCFollowUpSection patient={patient} />
    </View>
  );
}
