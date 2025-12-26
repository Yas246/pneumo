/**
 * Composant PDF pour la pathologie LungCancer (Cancer du Poumon)
 * Affiche toutes les données du formulaire lungCancer de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles } from "../styles";

interface LungCancerPathologyPDFProps {
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
function ConsultationReasonSection({ patient }: LungCancerPathologyPDFProps) {
  const consultationReason = getNestedValue(
    patient,
    "lungCancerConsultationReason"
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
          <PDFField label="Hémoptysie" value={consultationReason?.hemoptysis} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Dyspnée" value={consultationReason?.dyspnea} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Douleur thoracique"
            value={consultationReason?.chestPain}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Altération de l'état général"
            value={consultationReason?.generalStateAlteration}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Fièvre prolongée"
            value={consultationReason?.prolongedFever}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Dysphonie" value={consultationReason?.dysphonia} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Découverte radiologique fortuite"
            value={consultationReason?.fortuitousRadiologicalDiscovery}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Bilan d'extension"
            value={consultationReason?.extensionAssessment}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Autre" value={consultationReason?.other} />
        </View>
        {hasValue(consultationReason?.otherDetails) && (
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Détails autre"
              value={consultationReason?.otherDetails}
            />
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Section III. Antécédents et facteurs de risque
 */
function MedicalHistorySection({ patient }: LungCancerPathologyPDFProps) {
  const medicalHistory = getNestedValue(patient, "lungCancerMedicalHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !medicalHistory ||
    !Object.values(medicalHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  const personalHistory = medicalHistory?.personalHistory as
    | Record<string, unknown>
    | undefined;
  const riskFactors = medicalHistory?.riskFactors as
    | Record<string, unknown>
    | undefined;
  const allergiesTreatments = medicalHistory?.allergiesTreatments as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        III. Antécédents et facteurs de risque
      </Text>

      {/* Antécédents personnels */}
      {personalHistory &&
        Object.values(personalHistory).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Antécédents personnels
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="BPCO" value={personalHistory?.bpco} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Asthme" value={personalHistory?.asthma} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tuberculose"
                  value={personalHistory?.tuberculosis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="PID" value={personalHistory?.pid} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Bronchectasies"
                  value={personalHistory?.bronchiectasis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Maladie cardiovasculaire"
                  value={personalHistory?.cardiovascularDisease}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="HTA" value={personalHistory?.hta} />
              </View>
              {hasValue(personalHistory?.htaDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails HTA"
                    value={personalHistory?.htaDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField label="Diabète" value={personalHistory?.diabetes} />
              </View>
              {hasValue(personalHistory?.diabetesDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails Diabète"
                    value={personalHistory?.diabetesDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Insuffisance rénale chronique"
                  value={personalHistory?.chronicKidneyDisease}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Maladie hépatique"
                  value={personalHistory?.liverDisease}
                />
              </View>
              {hasValue(personalHistory?.liverDiseaseDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails maladie hépatique"
                    value={personalHistory?.liverDiseaseDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antécédents de cancer"
                  value={personalHistory?.cancerHistory}
                />
              </View>
              {hasValue(personalHistory?.cancerHistoryDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails antécédents cancer"
                    value={personalHistory?.cancerHistoryDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chirurgie thoracique"
                  value={personalHistory?.thoracicSurgery}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Radiothérapie thoracique"
                  value={personalHistory?.thoracicRadiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Autre" value={personalHistory?.other} />
              </View>
              {hasValue(personalHistory?.otherDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails autre"
                    value={personalHistory?.otherDetails}
                  />
                </View>
              )}
            </View>
          </>
        )}

      {/* Facteurs de risque et expositions */}
      {riskFactors && Object.values(riskFactors).some((v) => hasValue(v)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Facteurs de risque et expositions
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField label="Tabagisme" value={riskFactors?.smoking} />
            </View>
            {hasValue(riskFactors?.packYears) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Paquets-années"
                  value={riskFactors?.packYears}
                />
              </View>
            )}
            {hasValue(riskFactors?.smokingStatus) && (
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Statut tabagique"
                  value={riskFactors?.smokingStatus}
                />
              </View>
            )}
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Tabagisme passif"
                value={riskFactors?.passiveSmoking}
              />
            </View>
            {Array.isArray(riskFactors?.occupationalExposure) &&
              riskFactors.occupationalExposure.length > 0 && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Exposition professionnelle"
                    value={riskFactors?.occupationalExposure}
                  />
                </View>
              )}
            <View style={baseStyles.gridItem}>
              <PDFField label="Pollution" value={riskFactors?.pollution} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Antécédents familiaux"
                value={riskFactors?.familyHistory}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Immunosuppression"
                value={riskFactors?.immunosuppression}
              />
            </View>
          </View>
        </>
      )}

      {/* Allergies et traitements */}
      {allergiesTreatments &&
        Object.values(allergiesTreatments).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Allergies et traitements
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Allergies"
                  value={allergiesTreatments?.allergies}
                />
              </View>
              {hasValue(allergiesTreatments?.allergiesDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails allergies"
                    value={allergiesTreatments?.allergiesDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Traitements chroniques"
                  value={allergiesTreatments?.chronicTreatments}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Anticoagulants/Antiagrégants"
                  value={allergiesTreatments?.anticoagulantsAntiplatelets}
                />
              </View>
            </View>
          </>
        )}
    </View>
  );
}

/**
 * Section IV. Histoire de la maladie
 */
function DiseaseHistorySection({ patient }: LungCancerPathologyPDFProps) {
  const diseaseHistory = getNestedValue(patient, "lungCancerDiseaseHistory") as
    | Record<string, unknown>
    | undefined;

  if (
    !diseaseHistory ||
    !Object.values(diseaseHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  const extensionSigns = diseaseHistory?.extensionSigns as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>IV. Histoire de la maladie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Date d'apparition des symptômes"
            value={diseaseHistory?.symptomOnsetDate}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Évolution" value={diseaseHistory?.evolution} />
        </View>

        {/* Symptômes */}
        <Text style={baseStyles.subsectionTitle}>Symptômes</Text>
        {Array.isArray(diseaseHistory?.cough) &&
          diseaseHistory.cough.length > 0 && (
            <View style={baseStyles.gridItemFull}>
              <PDFField label="Toux" value={diseaseHistory?.cough} />
            </View>
          )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Expectoration"
            value={diseaseHistory?.expectoration}
          />
        </View>
        {hasValue(diseaseHistory?.expectorationAspect) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Aspect expectoration"
              value={diseaseHistory?.expectorationAspect}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Hémoptysie" value={diseaseHistory?.hemoptysis} />
        </View>
        {Array.isArray(diseaseHistory?.hemoptysisType) &&
          diseaseHistory.hemoptysisType.length > 0 && (
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="Type hémoptysie"
                value={diseaseHistory?.hemoptysisType}
              />
            </View>
          )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Dyspnée" value={diseaseHistory?.dyspnea} />
        </View>
        {hasValue(diseaseHistory?.dyspneaMmrc) && (
          <View style={baseStyles.gridItem}>
            <PDFField label="MMRC" value={diseaseHistory?.dyspneaMmrc} />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Douleur thoracique"
            value={diseaseHistory?.chestPain}
          />
        </View>
        {hasValue(diseaseHistory?.chestPainType) && (
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Type douleur"
              value={diseaseHistory?.chestPainType}
            />
          </View>
        )}
        <View style={baseStyles.gridItem}>
          <PDFField label="Fièvre/Sueurs" value={diseaseHistory?.feverSweats} />
        </View>
        {Array.isArray(diseaseHistory?.generalState) &&
          diseaseHistory.generalState.length > 0 && (
            <View style={baseStyles.gridItemFull}>
              <PDFField
                label="État général"
                value={diseaseHistory?.generalState}
              />
            </View>
          )}
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Infections récurrentes"
            value={diseaseHistory?.recurrentInfections}
          />
        </View>

        {/* Signes d'extension */}
        {extensionSigns &&
          Object.values(extensionSigns).some((v) => hasValue(v)) && (
            <>
              <Text style={baseStyles.subsectionTitle}>
                Signes d&apos;extension/complication
              </Text>
              <View style={baseStyles.grid}>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Syndrome cave supérieur"
                    value={extensionSigns?.superiorVenaCavaSyndrome}
                  />
                </View>
                {Array.isArray(extensionSigns?.superiorVenaCavaSyndromeSigns) &&
                  extensionSigns.superiorVenaCavaSyndromeSigns.length > 0 && (
                    <View style={baseStyles.gridItemFull}>
                      <PDFField
                        label="Signes syndrome cave supérieur"
                        value={extensionSigns?.superiorVenaCavaSyndromeSigns}
                      />
                    </View>
                  )}
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Dysphonie"
                    value={extensionSigns?.dysphonia}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Dysphagie"
                    value={extensionSigns?.dysphagia}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Douleurs osseuses"
                    value={extensionSigns?.bonePain}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Céphalées"
                    value={extensionSigns?.headaches}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Troubles neurologiques"
                    value={extensionSigns?.neurologicalDisorders}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Convulsions"
                    value={extensionSigns?.convulsions}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField label="Ictère" value={extensionSigns?.jaundice} />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Douleurs abdominales"
                    value={extensionSigns?.abdominalPain}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Épanchement pleural"
                    value={extensionSigns?.pleuralEffusion}
                  />
                </View>
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Hémoptysie massive"
                    value={extensionSigns?.massiveHemoptysis}
                  />
                </View>
                {hasValue(extensionSigns?.commentsChronology) && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Commentaires chronologiques"
                      value={extensionSigns?.commentsChronology}
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
 * Section V. Examen clinique
 */
function ClinicalExamSection({ patient }: LungCancerPathologyPDFProps) {
  const clinicalExam = getNestedValue(patient, "lungCancerClinicalExam") as
    | Record<string, unknown>
    | undefined;

  if (!clinicalExam || !Object.values(clinicalExam).some((v) => hasValue(v))) {
    return null;
  }

  const vitalSigns = clinicalExam?.vitalSigns as
    | Record<string, unknown>
    | undefined;
  const performanceStatus = clinicalExam?.performanceStatus as
    | Record<string, unknown>
    | undefined;
  const respiratoryExam = clinicalExam?.respiratoryExam as
    | Record<string, unknown>
    | undefined;
  const cardiovascularExam = clinicalExam?.cardiovascularExam as
    | Record<string, unknown>
    | undefined;
  const lymphNodeExam = clinicalExam?.lymphNodeExam as
    | Record<string, unknown>
    | undefined;
  const generalExam = clinicalExam?.generalExam as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>V. Examen clinique</Text>

      {/* Constantes */}
      {vitalSigns && Object.values(vitalSigns).some((v) => hasValue(v)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>Constantes</Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Tension artérielle"
                value={vitalSigns?.bloodPressure}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Fréquence cardiaque"
                value={vitalSigns?.heartRate}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Fréquence respiratoire"
                value={vitalSigns?.respiratoryRate}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="SpO2 (%)" value={vitalSigns?.spO2} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Température" value={vitalSigns?.temperature} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Poids (kg)" value={vitalSigns?.weight} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Taille (cm)" value={vitalSigns?.height} />
            </View>
          </View>
        </>
      )}

      {/* Performance status */}
      {performanceStatus &&
        Object.values(performanceStatus).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Performance status (ECOG) et état général
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Score ECOG"
                  value={performanceStatus?.ecogScore}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Altération marquée de l'état général"
                  value={performanceStatus?.markedGeneralState}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Faible IMC"
                  value={performanceStatus?.lowBmi}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Déshydratation"
                  value={performanceStatus?.dehydration}
                />
              </View>
            </View>
          </>
        )}

      {/* Examen respiratoire */}
      {respiratoryExam &&
        Object.values(respiratoryExam).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Examen respiratoire</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Syndrome d'épanchement pleural"
                  value={respiratoryExam?.pleuralFluidSyndrome}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Syndrome de condensation"
                  value={respiratoryExam?.condensationSyndrome}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Sibilances"
                  value={respiratoryExam?.wheezing}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Crépitants"
                  value={respiratoryExam?.crackles}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Murmure vésiculaire localisé diminué"
                  value={respiratoryExam?.localizedDiminishedBreathSounds}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Signes d'épanchement pleural"
                  value={respiratoryExam?.pleuralEffusionSigns}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Signes d'atélectasie"
                  value={respiratoryExam?.atelectasisSigns}
                />
              </View>
              {hasValue(respiratoryExam?.other) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Autres" value={respiratoryExam?.other} />
                </View>
              )}
            </View>
          </>
        )}

      {/* Examen cardio-vasculaire */}
      {cardiovascularExam &&
        Object.values(cardiovascularExam).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Examen cardio-vasculaire
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="Rythme" value={cardiovascularExam?.rhythm} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Souffle" value={cardiovascularExam?.murmur} />
              </View>
              {hasValue(cardiovascularExam?.murmurLocation) && (
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Localisation souffle"
                    value={cardiovascularExam?.murmurLocation}
                  />
                </View>
              )}
              {Array.isArray(cardiovascularExam?.heartFailureSigns) &&
                cardiovascularExam.heartFailureSigns.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Signes d'insuffisance cardiaque"
                      value={cardiovascularExam?.heartFailureSigns}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Frottement péricardique"
                  value={cardiovascularExam?.pericardialFriction}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Abolissement des bruits du cœur"
                  value={cardiovascularExam?.abolishedHeartSounds}
                />
              </View>
              {hasValue(cardiovascularExam?.other) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField label="Autres" value={cardiovascularExam?.other} />
                </View>
              )}
            </View>
          </>
        )}

      {/* Examen ganglionnaire */}
      {lymphNodeExam &&
        Object.values(lymphNodeExam).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Examen ganglionnaire</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ganglions sus-claviculaires droits"
                  value={lymphNodeExam?.supraclavicularRight}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ganglions sus-claviculaires gauches"
                  value={lymphNodeExam?.supraclavicularLeft}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ganglions cervicaux"
                  value={lymphNodeExam?.cervical}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ganglions axillaires"
                  value={lymphNodeExam?.axillary}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Autres" value={lymphNodeExam?.other} />
              </View>
              {hasValue(lymphNodeExam?.otherDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails autres"
                    value={lymphNodeExam?.otherDetails}
                  />
                </View>
              )}
            </View>
          </>
        )}

      {/* Examen général */}
      {generalExam && Object.values(generalExam).some((v) => hasValue(v)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Examen général (extension)
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Hépatomégalie"
                value={generalExam?.hepatomegaly}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Douleurs osseuses"
                value={generalExam?.bonePain}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Déficit neurologique focal"
                value={generalExam?.focalNeurologicalDeficit}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Syndrome cave supérieur"
                value={generalExam?.superiorVenaCavaSyndrome}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Œdèmes des membres inférieurs"
                value={generalExam?.lowerLimbEdema}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Signes cutanés" value={generalExam?.skinSigns} />
            </View>
            {hasValue(generalExam?.clinicalExamRemarks) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Remarques sur l'examen clinique"
                  value={generalExam?.clinicalExamRemarks}
                />
              </View>
            )}
            {hasValue(generalExam?.otherExams) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres examens"
                  value={generalExam?.otherExams}
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
 * Section VI. Examens paracliniques
 */
function ComplementaryExamsSection({ patient }: LungCancerPathologyPDFProps) {
  const complementaryExams = getNestedValue(
    patient,
    "lungCancerComplementaryExams"
  ) as Record<string, unknown> | undefined;

  if (
    !complementaryExams ||
    !Object.values(complementaryExams).some((v) => hasValue(v))
  ) {
    return null;
  }

  const thoracicImaging = complementaryExams?.thoracicImaging as
    | Record<string, unknown>
    | undefined;
  const endoscopyBiopsies = complementaryExams?.endoscopyBiopsies as
    | Record<string, unknown>
    | undefined;
  const pathology = complementaryExams?.pathology as
    | Record<string, unknown>
    | undefined;
  const initialBiology = complementaryExams?.initialBiology as
    | Record<string, unknown>
    | undefined;
  const preTherapeuticAssessment =
    complementaryExams?.preTherapeuticAssessment as
      | Record<string, unknown>
      | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VI. Examens paracliniques</Text>

      {/* Imagerie thoracique */}
      {thoracicImaging &&
        Object.values(thoracicImaging).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Imagerie thoracique</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Radiographie thoracique"
                  value={thoracicImaging?.chestXRay}
                />
              </View>
              {hasValue(thoracicImaging?.chestXRayReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu radio thorax"
                    value={thoracicImaging?.chestXRayReport}
                  />
                </View>
              )}
              {Array.isArray(thoracicImaging?.chestXRayImages) &&
                thoracicImaging.chestXRayImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Radiographie thoracique"
                      images={thoracicImaging.chestXRayImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField label="TDM TAP" value={thoracicImaging?.tapCt} />
              </View>
              {hasValue(thoracicImaging?.tapCtReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu TDM TAP"
                    value={thoracicImaging?.tapCtReport}
                  />
                </View>
              )}
              {Array.isArray(thoracicImaging?.tapCtImages) &&
                thoracicImaging.tapCtImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="TDM TAP"
                      images={thoracicImaging.tapCtImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="IRM cérébrale"
                  value={thoracicImaging?.brainMri}
                />
              </View>
              {hasValue(thoracicImaging?.brainMriReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu IRM cérébrale"
                    value={thoracicImaging?.brainMriReport}
                  />
                </View>
              )}
              {Array.isArray(thoracicImaging?.brainMriImages) &&
                thoracicImaging.brainMriImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="IRM cérébrale"
                      images={thoracicImaging.brainMriImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField label="TEP-TDM" value={thoracicImaging?.petCt} />
              </View>
              {hasValue(thoracicImaging?.petCtReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu TEP-TDM"
                    value={thoracicImaging?.petCtReport}
                  />
                </View>
              )}
              {Array.isArray(thoracicImaging?.petCtImages) &&
                thoracicImaging.petCtImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="TEP-TDM"
                      images={thoracicImaging.petCtImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Échographie pleurale"
                  value={thoracicImaging?.pleuralUltrasound}
                />
              </View>
              {hasValue(thoracicImaging?.pleuralUltrasoundReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu échographie pleurale"
                    value={thoracicImaging?.pleuralUltrasoundReport}
                  />
                </View>
              )}
              {Array.isArray(thoracicImaging?.pleuralUltrasoundImages) &&
                thoracicImaging.pleuralUltrasoundImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Échographie pleurale"
                      images={
                        thoracicImaging.pleuralUltrasoundImages as string[]
                      }
                    />
                  </View>
                )}
              {hasValue(thoracicImaging?.other) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Autre imagerie"
                    value={thoracicImaging?.other}
                  />
                </View>
              )}
              {Array.isArray(thoracicImaging?.otherImages) &&
                thoracicImaging.otherImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Autre imagerie"
                      images={thoracicImaging.otherImages as string[]}
                    />
                  </View>
                )}
            </View>
          </>
        )}

      {/* Endoscopie/prélèvements */}
      {endoscopyBiopsies &&
        Object.values(endoscopyBiopsies).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Endoscopie/prélèvements
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Bronchoscopie"
                  value={endoscopyBiopsies?.bronchoscopy}
                />
              </View>
              {hasValue(endoscopyBiopsies?.bronchoscopyReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu bronchoscopie"
                    value={endoscopyBiopsies?.bronchoscopyReport}
                  />
                </View>
              )}
              {Array.isArray(endoscopyBiopsies?.bronchoscopyImages) &&
                endoscopyBiopsies.bronchoscopyImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Bronchoscopie"
                      images={endoscopyBiopsies.bronchoscopyImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Biopsies bronchiques"
                  value={endoscopyBiopsies?.bronchialBiopsies}
                />
              </View>
              {hasValue(endoscopyBiopsies?.bronchialBiopsiesReport) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Compte-rendu biopsies bronchiques"
                    value={endoscopyBiopsies?.bronchialBiopsiesReport}
                  />
                </View>
              )}
              {Array.isArray(endoscopyBiopsies?.bronchialBiopsiesImages) &&
                endoscopyBiopsies.bronchialBiopsiesImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Biopsies bronchiques"
                      images={
                        endoscopyBiopsies.bronchialBiopsiesImages as string[]
                      }
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cytologie LBA"
                  value={endoscopyBiopsies?.balCytology}
                />
              </View>
              {hasValue(endoscopyBiopsies?.balCytologyResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats cytologie LBA"
                    value={endoscopyBiopsies?.balCytologyResults}
                  />
                </View>
              )}
              {Array.isArray(endoscopyBiopsies?.balCytologyImages) &&
                endoscopyBiopsies.balCytologyImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Cytologie LBA"
                      images={endoscopyBiopsies.balCytologyImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField label="EBUS" value={endoscopyBiopsies?.ebus} />
              </View>
              {hasValue(endoscopyBiopsies?.ebusResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats EBUS"
                    value={endoscopyBiopsies?.ebusResults}
                  />
                </View>
              )}
              {Array.isArray(endoscopyBiopsies?.ebusImages) &&
                endoscopyBiopsies.ebusImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="EBUS"
                      images={endoscopyBiopsies.ebusImages as string[]}
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Biopsie scanno-guidée"
                  value={endoscopyBiopsies?.ctGuidedBiopsy}
                />
              </View>
              {hasValue(endoscopyBiopsies?.ctGuidedBiopsyResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats biopsie scanno-guidée"
                    value={endoscopyBiopsies?.ctGuidedBiopsyResults}
                  />
                </View>
              )}
              {Array.isArray(endoscopyBiopsies?.ctGuidedBiopsyImages) &&
                endoscopyBiopsies.ctGuidedBiopsyImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Biopsie scanno-guidée"
                      images={
                        endoscopyBiopsies.ctGuidedBiopsyImages as string[]
                      }
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ponction pleurale diagnostique"
                  value={endoscopyBiopsies?.diagnosticPleuralPuncture}
                />
              </View>
              {hasValue(
                endoscopyBiopsies?.diagnosticPleuralPunctureResults
              ) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats ponction pleurale"
                    value={endoscopyBiopsies?.diagnosticPleuralPunctureResults}
                  />
                </View>
              )}
              {Array.isArray(
                endoscopyBiopsies?.diagnosticPleuralPunctureImages
              ) &&
                endoscopyBiopsies.diagnosticPleuralPunctureImages.length >
                  0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Ponction pleurale"
                      images={
                        endoscopyBiopsies.diagnosticPleuralPunctureImages as string[]
                      }
                    />
                  </View>
                )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Biopsie ganglionnaire"
                  value={endoscopyBiopsies?.lymphNodeBiopsy}
                />
              </View>
              {hasValue(endoscopyBiopsies?.lymphNodeBiopsyResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats biopsie ganglionnaire"
                    value={endoscopyBiopsies?.lymphNodeBiopsyResults}
                  />
                </View>
              )}
              {Array.isArray(endoscopyBiopsies?.lymphNodeBiopsyImages) &&
                endoscopyBiopsies.lymphNodeBiopsyImages.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFImageGrid
                      label="Biopsie ganglionnaire"
                      images={
                        endoscopyBiopsies.lymphNodeBiopsyImages as string[]
                      }
                    />
                  </View>
                )}
            </View>
          </>
        )}

      {/* Anatomo-pathologie */}
      {pathology && Object.values(pathology).some((v) => hasValue(v)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>Anatomo-pathologie</Text>
          <View style={baseStyles.grid}>
            {Array.isArray(pathology?.histologicalType) &&
              pathology.histologicalType.length > 0 && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Type histologique"
                    value={pathology?.histologicalType}
                  />
                </View>
              )}
            {Array.isArray(pathology?.nsclcSubtype) &&
              pathology.nsclcSubtype.length > 0 && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Sous-type NSCLC"
                    value={pathology?.nsclcSubtype}
                  />
                </View>
              )}
            {Array.isArray(pathology?.molecularBiology) &&
              pathology.molecularBiology.length > 0 && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Biologie moléculaire"
                    value={pathology?.molecularBiology}
                  />
                </View>
              )}
            {hasValue(pathology?.otherMolecular) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Autres marqueurs moléculaires"
                  value={pathology?.otherMolecular}
                />
              </View>
            )}
            {Array.isArray(pathology?.pathologyImages) &&
              pathology.pathologyImages.length > 0 && (
                <View style={baseStyles.gridItemFull}>
                  <PDFImageGrid
                    label="Anatomopathologie"
                    images={pathology.pathologyImages as string[]}
                  />
                </View>
              )}
          </View>
        </>
      )}

      {/* Biologie (bilan initial) */}
      {initialBiology &&
        Object.values(initialBiology).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Biologie (bilan initial)
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField label="NFS" value={initialBiology?.cbc} />
              </View>
              {hasValue(initialBiology?.cbcResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats NFS"
                    value={initialBiology?.cbcResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField label="CRP" value={initialBiology?.crp} />
              </View>
              {hasValue(initialBiology?.crpResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats CRP"
                    value={initialBiology?.crpResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Ionogramme, Urée, Créatinine"
                  value={initialBiology?.ionogramUreaCreatinine}
                />
              </View>
              {hasValue(initialBiology?.ionogramUreaCreatinineResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats ionogramme"
                    value={initialBiology?.ionogramUreaCreatinineResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Fonction hépatique"
                  value={initialBiology?.liverFunction}
                />
              </View>
              {hasValue(initialBiology?.liverFunctionResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats fonction hépatique"
                    value={initialBiology?.liverFunctionResults}
                  />
                </View>
              )}
              {hasValue(initialBiology?.calcium) && (
                <View style={baseStyles.gridItem}>
                  <PDFField label="Calcémie" value={initialBiology?.calcium} />
                </View>
              )}
              {hasValue(initialBiology?.albuminNutrition) && (
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Albumine/Nutrition"
                    value={initialBiology?.albuminNutrition}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Hémostase"
                  value={initialBiology?.hemostasis}
                />
              </View>
              {hasValue(initialBiology?.hemostasisResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats hémostase"
                    value={initialBiology?.hemostasisResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Marqueurs tumoraux"
                  value={initialBiology?.tumorMarkers}
                />
              </View>
              {hasValue(initialBiology?.tumorMarkersResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats marqueurs tumoraux"
                    value={initialBiology?.tumorMarkersResults}
                  />
                </View>
              )}
            </View>
          </>
        )}

      {/* Bilan pré-thérapeutique */}
      {preTherapeuticAssessment &&
        Object.values(preTherapeuticAssessment).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Bilan pré-thérapeutique
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="EFR - Spirométrie"
                  value={preTherapeuticAssessment?.pftSpirometry}
                />
              </View>
              {hasValue(preTherapeuticAssessment?.pftSpirometryResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats EFR"
                    value={preTherapeuticAssessment?.pftSpirometryResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField label="DLCO" value={preTherapeuticAssessment?.dlco} />
              </View>
              {hasValue(preTherapeuticAssessment?.dlcoResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats DLCO"
                    value={preTherapeuticAssessment?.dlcoResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Gaz du sang"
                  value={preTherapeuticAssessment?.bloodGas}
                />
              </View>
              {hasValue(preTherapeuticAssessment?.bloodGasResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats gaz du sang"
                    value={preTherapeuticAssessment?.bloodGasResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField label="ECG" value={preTherapeuticAssessment?.ecg} />
              </View>
              {hasValue(preTherapeuticAssessment?.ecgResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats ECG"
                    value={preTherapeuticAssessment?.ecgResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Échocardiographie"
                  value={preTherapeuticAssessment?.echocardiography}
                />
              </View>
              {hasValue(preTherapeuticAssessment?.echocardiographyResults) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats échocardiographie"
                    value={preTherapeuticAssessment?.echocardiographyResults}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Évaluation anesthésique"
                  value={preTherapeuticAssessment?.anestheticEvaluation}
                />
              </View>
              {hasValue(
                preTherapeuticAssessment?.anestheticEvaluationResults
              ) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Résultats évaluation anesthésique"
                    value={
                      preTherapeuticAssessment?.anestheticEvaluationResults
                    }
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
 * Section VII. Diagnostic
 */
function DiagnosisSection({ patient }: LungCancerPathologyPDFProps) {
  const diagnosis = getNestedValue(patient, "lungCancerDiagnosis") as
    | Record<string, unknown>
    | undefined;

  if (!diagnosis || !Object.values(diagnosis).some((v) => hasValue(v))) {
    return null;
  }

  const diagnosisData = diagnosis?.diagnosis as
    | Record<string, unknown>
    | undefined;
  const staging = diagnosis?.staging as Record<string, unknown> | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VII. Diagnostic</Text>

      {/* Diagnostic retenu */}
      {diagnosisData &&
        Object.values(diagnosisData).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Diagnostic retenu</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cancer suspecté"
                  value={diagnosisData?.suspected}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cancer confirmé"
                  value={diagnosisData?.confirmed}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="NSCLC" value={diagnosisData?.nsclc} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="SCLC" value={diagnosisData?.sclc} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Autre" value={diagnosisData?.other} />
              </View>
              {hasValue(diagnosisData?.otherDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails autre"
                    value={diagnosisData?.otherDetails}
                  />
                </View>
              )}
            </View>
          </>
        )}

      {/* Stadification/extension */}
      {staging && Object.values(staging).some((v) => hasValue(v)) && (
        <>
          <Text style={baseStyles.subsectionTitle}>
            Stadification/extension
          </Text>
          <View style={baseStyles.grid}>
            <View style={baseStyles.gridItem}>
              <PDFField label="T" value={staging?.t} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="N" value={staging?.n} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="M" value={staging?.m} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Stade" value={staging?.stage} />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Localisé - Opérable"
                value={staging?.localizedOperable}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField
                label="Localement avancé"
                value={staging?.locallyAdvanced}
              />
            </View>
            <View style={baseStyles.gridItem}>
              <PDFField label="Métastatique" value={staging?.metastatic} />
            </View>
            {Array.isArray(staging?.metastaticSites) &&
              staging.metastaticSites.length > 0 && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Sites métastatiques"
                    value={staging?.metastaticSites}
                  />
                </View>
              )}
            <View style={baseStyles.gridItem}>
              <PDFField label="Autres sites" value={staging?.otherSites} />
            </View>
            {hasValue(staging?.otherSitesDetails) && (
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Détails autres sites"
                  value={staging?.otherSitesDetails}
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
 * Section VIII. Prise en charge (PEC)
 */
function ManagementSection({ patient }: LungCancerPathologyPDFProps) {
  const management = getNestedValue(patient, "lungCancerManagement") as
    | Record<string, unknown>
    | undefined;

  if (!management || !Object.values(management).some((v) => hasValue(v))) {
    return null;
  }

  const immediateMeasures = management?.immediateMeasures as
    | Record<string, unknown>
    | undefined;
  const multidisciplinaryMeeting = management?.multidisciplinaryMeeting as
    | Record<string, unknown>
    | undefined;
  const therapeuticProject = management?.therapeuticProject as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VIII. Prise en charge (PEC)</Text>

      {/* Mesures immédiates/urgences oncologiques */}
      {immediateMeasures &&
        Object.values(immediateMeasures).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Mesures immédiates/urgences oncologiques
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Oxygénothérapie"
                  value={immediateMeasures?.oxygenotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Analgésie"
                  value={immediateMeasures?.analgesia}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Traitement symptomatique"
                  value={immediateMeasures?.symptomaticTreatment}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Urgence oncologique"
                  value={immediateMeasures?.oncologicalEmergency}
                />
              </View>
              {Array.isArray(immediateMeasures?.oncologicalEmergencyType) &&
                immediateMeasures.oncologicalEmergencyType.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Type urgence oncologique"
                      value={immediateMeasures?.oncologicalEmergencyType}
                    />
                  </View>
                )}
            </View>
          </>
        )}

      {/* Réunion de concertation pluridisciplinaire (RCP) */}
      {multidisciplinaryMeeting &&
        Object.values(multidisciplinaryMeeting).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Réunion de concertation pluridisciplinaire (RCP)
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="RCP demandée"
                  value={multidisciplinaryMeeting?.rcpRequested}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="RCP disponible"
                  value={multidisciplinaryMeeting?.rcpAvailable}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Date de RCP"
                  value={multidisciplinaryMeeting?.rcpDate}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Décision de RCP"
                  value={multidisciplinaryMeeting?.decision}
                />
              </View>
            </View>
          </>
        )}

      {/* Projet thérapeutique */}
      {therapeuticProject &&
        Object.values(therapeuticProject).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Projet thérapeutique</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chirurgie"
                  value={therapeuticProject?.surgery}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Radiothérapie"
                  value={therapeuticProject?.radiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chimioradiothérapie"
                  value={therapeuticProject?.chemoradiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Chimiothérapie"
                  value={therapeuticProject?.chemotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Immunothérapie"
                  value={therapeuticProject?.immunotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Thérapies ciblées"
                  value={therapeuticProject?.targetedTherapies}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Soins palliatifs"
                  value={therapeuticProject?.palliativeCare}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Autre" value={therapeuticProject?.other} />
              </View>
              {hasValue(therapeuticProject?.otherDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails autre"
                    value={therapeuticProject?.otherDetails}
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
 * Section IX. Surveillance évolutive
 */
function FollowUpSection({ patient }: LungCancerPathologyPDFProps) {
  const followUp = getNestedValue(patient, "lungCancerFollowUp") as
    | Record<string, unknown>
    | undefined;

  if (!followUp || !Object.values(followUp).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>IX. Surveillance évolutive</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Surveillance clinique"
            value={followUp?.clinicalMonitoring}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Évaluation de la toxicité"
            value={followUp?.toxicityEvaluation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Imagerie de suivi"
            value={followUp?.followUpImaging}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="EFR de suivi" value={followUp?.pftFollowUp} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Prise en charge nutritionnelle"
            value={followUp?.nutritionalManagement}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Sevrage tabagique"
            value={followUp?.smokingCessation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Vaccination" value={followUp?.vaccination} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Évolution réponse"
            value={followUp?.evolutionResponse}
          />
        </View>
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Remarques" value={followUp?.remarks} />
        </View>
      </View>
    </View>
  );
}

/**
 * Section X. Traitement et ordonnance/consignes de sortie
 */
function TreatmentDischargeSection({ patient }: LungCancerPathologyPDFProps) {
  const treatmentDischarge = getNestedValue(
    patient,
    "lungCancerTreatmentDischarge"
  ) as Record<string, unknown> | undefined;

  if (
    !treatmentDischarge ||
    !Object.values(treatmentDischarge).some((v) => hasValue(v))
  ) {
    return null;
  }

  const prescribedTreatment = treatmentDischarge?.prescribedTreatment as
    | Record<string, unknown>
    | undefined;
  const supportiveCare = treatmentDischarge?.supportiveCare as
    | Record<string, unknown>
    | undefined;
  const instructionsFollowUp = treatmentDischarge?.instructionsFollowUp as
    | Record<string, unknown>
    | undefined;

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        X. Traitement et ordonnance/consignes de sortie
      </Text>

      {/* Traitement prescrit */}
      {prescribedTreatment &&
        Object.values(prescribedTreatment).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Traitement prescrit</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Analgésique"
                  value={prescribedTreatment?.analgesic}
                />
              </View>
              {hasValue(prescribedTreatment?.analgesicDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails analgésique"
                    value={prescribedTreatment?.analgesicDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Antitussif"
                  value={prescribedTreatment?.antitussive}
                />
              </View>
              {hasValue(prescribedTreatment?.antitussiveDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails antitussif"
                    value={prescribedTreatment?.antitussiveDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Corticostéroïdes"
                  value={prescribedTreatment?.corticosteroids}
                />
              </View>
              {hasValue(prescribedTreatment?.corticosteroidsDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails corticostéroïdes"
                    value={prescribedTreatment?.corticosteroidsDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Anticoagulation"
                  value={prescribedTreatment?.anticoagulation}
                />
              </View>
              {hasValue(prescribedTreatment?.anticoagulationDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails anticoagulation"
                    value={prescribedTreatment?.anticoagulationDetails}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField label="Autre" value={prescribedTreatment?.other} />
              </View>
              {hasValue(prescribedTreatment?.otherDetails) && (
                <View style={baseStyles.gridItemFull}>
                  <PDFField
                    label="Détails autre"
                    value={prescribedTreatment?.otherDetails}
                  />
                </View>
              )}
            </View>
          </>
        )}

      {/* Soins de support */}
      {supportiveCare &&
        Object.values(supportiveCare).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Soins de support</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Prise en charge de la douleur"
                  value={supportiveCare?.painManagement}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Prise en charge de la dyspnée"
                  value={supportiveCare?.dyspneaManagement}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Prise en charge nutritionnelle"
                  value={supportiveCare?.nutritionalManagement}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Soutien psychosocial"
                  value={supportiveCare?.psychosocialSupport}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Soins palliatifs"
                  value={supportiveCare?.palliativeCare}
                />
              </View>
            </View>
          </>
        )}

      {/* Consignes et suivi */}
      {instructionsFollowUp &&
        Object.values(instructionsFollowUp).some((v) => hasValue(v)) && (
          <>
            <Text style={baseStyles.subsectionTitle}>Consignes et suivi</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Retour en urgence"
                  value={instructionsFollowUp?.emergencyReturn}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Arrêt du tabac"
                  value={instructionsFollowUp?.smokingStop}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Consultation pneumologie"
                  value={instructionsFollowUp?.pneumologyAppointment}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Consultation oncologie"
                  value={instructionsFollowUp?.oncologyAppointment}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Radiothérapie"
                  value={instructionsFollowUp?.radiotherapy}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Contrôle biologique"
                  value={instructionsFollowUp?.biologicalControl}
                />
              </View>
              {hasValue(instructionsFollowUp?.biologicalControlDate) && (
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Date contrôle biologique"
                    value={instructionsFollowUp?.biologicalControlDate}
                  />
                </View>
              )}
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Contrôle d'imagerie"
                  value={instructionsFollowUp?.imagingControl}
                />
              </View>
              {hasValue(instructionsFollowUp?.imagingControlDate) && (
                <View style={baseStyles.gridItem}>
                  <PDFField
                    label="Date contrôle imagerie"
                    value={instructionsFollowUp?.imagingControlDate}
                  />
                </View>
              )}
              {Array.isArray(instructionsFollowUp?.documentsDelivered) &&
                instructionsFollowUp.documentsDelivered.length > 0 && (
                  <View style={baseStyles.gridItemFull}>
                    <PDFField
                      label="Documents remis"
                      value={instructionsFollowUp?.documentsDelivered}
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
 * Composant principal pour la pathologie LungCancer
 */
export function LungCancerPathologyPDF({
  patient,
}: LungCancerPathologyPDFProps) {
  return (
    <View>
      <ConsultationReasonSection patient={patient} />
      <MedicalHistorySection patient={patient} />
      <DiseaseHistorySection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ComplementaryExamsSection patient={patient} />
      <DiagnosisSection patient={patient} />
      <ManagementSection patient={patient} />
      <FollowUpSection patient={patient} />
      <TreatmentDischargeSection patient={patient} />
    </View>
  );
}
