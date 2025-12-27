/**
 * Composant PDF pour la pathologie DDB (Dilatation Bronchique Diffuse)
 * Affiche toutes les données du formulaire ddb de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles, pathologyStyles } from "../styles";

interface DDBPathologyPDFProps {
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
function ConsultationReasonSection({ patient }: DDBPathologyPDFProps) {
  const consultationReason = getNestedValue(
    patient,
    "ddbConsultationReason"
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
      <View style={pathologyStyles.ddbSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Motif de consultation"
              value={consultationReason?.consultationReason}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section III. Antécédents
 */
function MedicalHistorySection({ patient }: DDBPathologyPDFProps) {
  const medicalHistory = getNestedValue(patient, "ddbMedicalHistory") as
    | Record<string, unknown>
    | undefined;
  const toxicHistory = getNestedValue(patient, "ddbToxicHistory") as
    | Record<string, unknown>
    | undefined;

  const hasMedicalHistory =
    medicalHistory && Object.values(medicalHistory).some((v) => hasValue(v));
  const hasToxicHistory =
    toxicHistory && Object.values(toxicHistory).some((v) => hasValue(v));

  if (!hasMedicalHistory && !hasToxicHistory) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>III. Antécédents</Text>
      <View style={pathologyStyles.ddbSection}>
        {/* Antécédents Médicaux */}
        {hasMedicalHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>Antécédents Médicaux</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Infections respiratoires de l'enfance"
                  value={medicalHistory?.childhoodRespiratoryInfections}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Infections de l'enfance"
                  value={medicalHistory?.childhoodInfections}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Mucoviscidose"
                  value={medicalHistory?.cysticFibrosis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Déficit immunitaire"
                  value={medicalHistory?.immuneDeficiency}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Inhalation toxique"
                  value={medicalHistory?.toxicInhalation}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tuberculose"
                  value={medicalHistory?.tuberculosis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Contage tuberculeux"
                  value={medicalHistory?.tuberculosisContagion}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Sinusites récidivantes"
                  value={medicalHistory?.recurrentSinusitis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Maladie de Crohn"
                  value={medicalHistory?.crohnDisease}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Infertilité"
                  value={medicalHistory?.infertility}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Lymphome" value={medicalHistory?.lymphoma} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Asthme" value={medicalHistory?.asthma} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Consanguinité"
                  value={medicalHistory?.consanguinity}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Infertilité familiale"
                  value={medicalHistory?.familyInfertility}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Antécédents chirurgicaux"
                  value={medicalHistory?.surgicalHistory}
                />
              </View>
              <View style={baseStyles.gridItemFull}>
                <PDFField
                  label="Antécédents gynéco-obstétricaux"
                  value={medicalHistory?.gynecoObstetricHistory}
                />
              </View>
            </View>
          </>
        )}

        {/* Antécédents Toxiques */}
        {hasToxicHistory && (
          <>
            <Text style={baseStyles.subsectionTitle}>Antécédents Toxiques</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tabagisme actif"
                  value={toxicHistory?.activeSmoking}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Type de tabac"
                  value={toxicHistory?.smokingType}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Âge de début (ans)"
                  value={toxicHistory?.smokingStartAge}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Paquet-années"
                  value={toxicHistory?.packYears}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tabagisme arrêté"
                  value={toxicHistory?.smokingStopped}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée d'arrêt"
                  value={toxicHistory?.smokingStoppedDuration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Tabagisme passif"
                  value={toxicHistory?.passiveSmoking}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Lieu tabagisme passif"
                  value={toxicHistory?.passiveSmokingLocation}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Cannabis" value={toxicHistory?.cannabis} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Consommation cannabis"
                  value={toxicHistory?.cannabisConsumption}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Cannabis arrêté"
                  value={toxicHistory?.cannabisStopped}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée d'arrêt cannabis"
                  value={toxicHistory?.cannabisStoppedDuration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Alcool" value={toxicHistory?.alcohol} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Alcool arrêté"
                  value={toxicHistory?.alcoholStopped}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Durée d'arrêt alcool"
                  value={toxicHistory?.alcoholStoppedDuration}
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
 * Section IV. Histoire de la maladie
 */
function DiseaseHistorySection({ patient }: DDBPathologyPDFProps) {
  const diseaseHistory = getNestedValue(patient, "ddbDiseaseHistory") as
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
      <View style={pathologyStyles.ddbSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Premiers symptômes"
              value={diseaseHistory?.firstSymptoms}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Évolution" value={diseaseHistory?.evolution} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section V. Clinique
 */
function ClinicalExamSection({ patient }: DDBPathologyPDFProps) {
  const respiratorySymptoms = getNestedValue(
    patient,
    "ddbRespiratorySymptoms"
  ) as Record<string, unknown> | undefined;
  const extraRespiratorySymptoms = getNestedValue(
    patient,
    "ddbExtraRespiratorySymptoms"
  ) as Record<string, unknown> | undefined;
  const physicalSigns = getNestedValue(patient, "ddbPhysicalSigns") as
    | Record<string, unknown>
    | undefined;

  const hasRespiratorySymptoms =
    respiratorySymptoms &&
    Object.values(respiratorySymptoms).some((v) => hasValue(v));
  const hasExtraRespiratorySymptoms =
    extraRespiratorySymptoms &&
    Object.values(extraRespiratorySymptoms).some((v) => hasValue(v));
  const hasPhysicalSigns =
    physicalSigns && Object.values(physicalSigns).some((v) => hasValue(v));

  if (
    !hasRespiratorySymptoms &&
    !hasExtraRespiratorySymptoms &&
    !hasPhysicalSigns
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>V. Clinique</Text>
      <View style={pathologyStyles.ddbSection}>
        {/* Signes fonctionnels respiratoires */}
        {hasRespiratorySymptoms && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Signes fonctionnels respiratoires
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Bronchorrhée"
                  value={respiratorySymptoms?.bronchorrhea}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Volume bronchorrhée"
                  value={respiratorySymptoms?.bronchorrheaVolume}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Toux" value={respiratorySymptoms?.cough} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Hémoptysie"
                  value={respiratorySymptoms?.hemoptysis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Expectoration purulente"
                  value={respiratorySymptoms?.purulentSputum}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Infections respiratoires récidivantes"
                  value={respiratorySymptoms?.recurrentRespiratoryInfections}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Syndrome de pénétration"
                  value={respiratorySymptoms?.penetrationSyndrome}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Fièvre" value={respiratorySymptoms?.fever} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Douleur thoracique"
                  value={respiratorySymptoms?.thoracicPain}
                />
              </View>
            </View>
          </>
        )}

        {/* Signes fonctionnels extra-respiratoires */}
        {hasExtraRespiratorySymptoms && (
          <>
            <Text style={baseStyles.subsectionTitle}>
              Signes fonctionnels extra-respiratoires
            </Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Diarrhée chronique"
                  value={extraRespiratorySymptoms?.chronicDiarrhea}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Syndrome de malabsorption"
                  value={extraRespiratorySymptoms?.malabsorptionSyndrome}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Hémorragie digestive"
                  value={extraRespiratorySymptoms?.digestiveHemorrhage}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Pyrosis"
                  value={extraRespiratorySymptoms?.pyrosis}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Altération de l'état général"
                  value={extraRespiratorySymptoms?.generalStateAlteration}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Douleurs sinusiennes"
                  value={extraRespiratorySymptoms?.sinusPain}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Obstruction nasale"
                  value={extraRespiratorySymptoms?.nasalObstruction}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Signes oculaires"
                  value={extraRespiratorySymptoms?.ocularSigns}
                />
              </View>
            </View>
          </>
        )}

        {/* Signes physiques */}
        {hasPhysicalSigns && (
          <>
            <Text style={baseStyles.subsectionTitle}>Signes physiques</Text>
            <View style={baseStyles.grid}>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Déformation thoracique"
                  value={physicalSigns?.thoracicDeformation}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField label="Cyanose" value={physicalSigns?.cyanosis} />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Doigts en baguette de tambour"
                  value={physicalSigns?.hippocraticFingers}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Râles bronchiques"
                  value={physicalSigns?.bronchialRales}
                />
              </View>
              <View style={baseStyles.gridItem}>
                <PDFField
                  label="Crépitations"
                  value={physicalSigns?.crackles}
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
 * Section VI. Examens complémentaires
 */
function ComplementaryExamsSection({ patient }: DDBPathologyPDFProps) {
  const complementaryExams = getNestedValue(
    patient,
    "ddbComplementaryExams"
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
      <View style={pathologyStyles.ddbSection}>
        {/* Radiographie thoracique */}
        <Text style={baseStyles.subsectionTitle}>Radiographie thoracique</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Signes radiographiques"
              value={complementaryExams?.chestXRaySigns}
            />
          </View>
        </View>
        {hasValue(complementaryExams?.chestXRayImages) && (
          <PDFImageGrid
            label="Images radiographie thoracique"
            images={complementaryExams?.chestXRayImages as string[]}
          />
        )}

        {/* TDM */}
        <Text style={baseStyles.subsectionTitle}>TDM</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="Aspect TDM" value={complementaryExams?.ctAspect} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="Signes TDM" value={complementaryExams?.ctSigns} />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Autres anomalies TDM"
              value={complementaryExams?.ctOtherAnomalies}
            />
          </View>
        </View>
        {hasValue(complementaryExams?.ctImages) && (
          <PDFImageGrid
            label="Images TDM"
            images={complementaryExams?.ctImages as string[]}
          />
        )}

        {/* EFR */}
        <Text style={baseStyles.subsectionTitle}>EFR</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Troubles EFR"
              value={complementaryExams?.efrDisorder}
            />
          </View>
        </View>

        {/* Endoscopie bronchique */}
        <Text style={baseStyles.subsectionTitle}>Endoscopie bronchique</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Conclusion endoscopie"
              value={complementaryExams?.bronchoscopyConclusion}
            />
          </View>
        </View>
        {hasValue(complementaryExams?.bronchoscopyImages) && (
          <PDFImageGrid
            label="Images endoscopie bronchique"
            images={complementaryExams?.bronchoscopyImages as string[]}
          />
        )}

        {/* ECBC */}
        <Text style={baseStyles.subsectionTitle}>ECBC</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Résultat ECBC"
              value={complementaryExams?.ecbcResult}
            />
          </View>
        </View>
        {hasValue(complementaryExams?.ecbcImages) && (
          <PDFImageGrid
            label="Images ECBC"
            images={complementaryExams?.ecbcImages as string[]}
          />
        )}

        {/* Gazométrie sanguine */}
        <Text style={baseStyles.subsectionTitle}>Gazométrie sanguine</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Résultat gazométrie"
              value={complementaryExams?.bloodGasResult}
            />
          </View>
        </View>
        {hasValue(complementaryExams?.bloodGasImages) && (
          <PDFImageGrid
            label="Images gazométrie sanguine"
            images={complementaryExams?.bloodGasImages as string[]}
          />
        )}

        {/* Biologie */}
        <Text style={baseStyles.subsectionTitle}>Biologie</Text>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField label="NFS" value={complementaryExams?.biologyNfs} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField label="CRP" value={complementaryExams?.biologyCrp} />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Protéinurie"
              value={complementaryExams?.biologyProteinuria}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Test de la sueur"
              value={complementaryExams?.biologySweatTest}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Dosage des Ig"
              value={complementaryExams?.biologyIgDosage}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section VII. Conclusion
 */
function ConclusionSection({ patient }: DDBPathologyPDFProps) {
  const conclusion = getNestedValue(patient, "ddbConclusion") as
    | Record<string, unknown>
    | undefined;

  if (!conclusion || !Object.values(conclusion).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VII. Conclusion</Text>
      <View style={pathologyStyles.ddbSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Conclusion" value={conclusion?.conclusion} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section VIII. Étiologie retrouvée
 */
function EtiologySection({ patient }: DDBPathologyPDFProps) {
  const etiology = getNestedValue(patient, "ddbEtiology") as
    | Record<string, unknown>
    | undefined;

  if (!etiology || !Object.values(etiology).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>VIII. Étiologie retrouvée</Text>
      <View style={pathologyStyles.ddbSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="DDB localisée"
              value={etiology?.localizedEtiology}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="DDB généralisée"
              value={etiology?.generalizedEtiology}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section IX. Traitements envisagés
 */
function TreatmentSection({ patient }: DDBPathologyPDFProps) {
  const treatment = getNestedValue(patient, "ddbTreatment") as
    | Record<string, unknown>
    | undefined;

  if (!treatment || !Object.values(treatment).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>IX. Traitements envisagés</Text>
      <View style={pathologyStyles.ddbSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItemFull}>
            <PDFField
              label="Traitements symptomatiques"
              value={treatment?.symptomaticTreatments}
            />
          </View>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Traitement étiologique"
              value={treatment?.etiologicalTreatment}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Autres mesures" value={treatment?.otherMeasures} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Section X. Suivi
 */
function FollowUpSection({ patient }: DDBPathologyPDFProps) {
  const followUp = getNestedValue(patient, "ddbFollowUp") as
    | Record<string, unknown>
    | undefined;

  if (!followUp || !Object.values(followUp).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>X. Suivi</Text>
      <View style={pathologyStyles.ddbSection}>
        <View style={baseStyles.grid}>
          <View style={baseStyles.gridItem}>
            <PDFField
              label="Prochain rendez-vous"
              value={followUp?.nextAppointment}
            />
          </View>
          <View style={baseStyles.gridItemFull}>
            <PDFField label="Observations" value={followUp?.observations} />
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Composant principal pour la pathologie DDB
 */
export function DDBPathologyPDF({ patient }: DDBPathologyPDFProps) {
  return (
    <View>
      <ConsultationReasonSection patient={patient} />
      <MedicalHistorySection patient={patient} />
      <DiseaseHistorySection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ComplementaryExamsSection patient={patient} />
      <ConclusionSection patient={patient} />
      <EtiologySection patient={patient} />
      <TreatmentSection patient={patient} />
      <FollowUpSection patient={patient} />
    </View>
  );
}
