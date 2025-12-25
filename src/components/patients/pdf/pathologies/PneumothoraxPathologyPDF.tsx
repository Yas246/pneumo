/**
 * Composant PDF pour la pathologie Pneumothorax
 * Affiche toutes les données du formulaire pneumothorax de manière structurée
 */

import { ExtendedPatient, getNestedValue } from "@/utils/pdfFieldExtractor";
import { Image, Text, View } from "@react-pdf/renderer";
import { baseStyles, imageStyles } from "../styles";

interface PneumothoraxPathologyPDFProps {
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
 * Section Motif de Consultation
 */
function ConsultationReasonSection({ patient }: PneumothoraxPathologyPDFProps) {
  const consultationReason = getNestedValue(
    patient,
    "pneumothoraxConsultationReason"
  ) as Record<string, unknown> | undefined;

  if (
    !consultationReason ||
    !Object.values(consultationReason).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Motif de Consultation</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Douleur thoracique"
            value={consultationReason?.thoracicPain}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Dyspnée" value={consultationReason?.dyspnea} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Toux" value={consultationReason?.cough} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Oppression thoracique"
            value={consultationReason?.thoracicOppression}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Malaise/Syncope"
            value={consultationReason?.malaiseSyncope}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Découverte radiologique"
            value={consultationReason?.radiologicalDiscovery}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Autre" value={consultationReason?.other} />
        </View>
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
  );
}

/**
 * Section Antécédents et Facteurs de Risque
 */
function MedicalHistorySection({ patient }: PneumothoraxPathologyPDFProps) {
  const medicalHistory = getNestedValue(
    patient,
    "pneumothoraxMedicalHistory"
  ) as Record<string, unknown> | undefined;

  if (!medicalHistory || !Object.values(medicalHistory).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        Antécédents et Facteurs de Risque
      </Text>

      {/* Antécédents personnels */}
      <Text style={baseStyles.subsectionTitle}>Antécédents Personnels</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Pneumothorax antérieur"
            value={medicalHistory?.previousPneumothorax}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Côté pneumothorax antérieur"
            value={medicalHistory?.previousPneumothoraxSide}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Nombre d'épisodes"
            value={medicalHistory?.previousPneumothoraxCount}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Date dernier épisode"
            value={medicalHistory?.previousPneumothoraxDate}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="BPCO/Emphysème"
            value={medicalHistory?.bpcoEmphysema}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asthme sévère"
            value={medicalHistory?.severeAsthma}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Tuberculose" value={medicalHistory?.tuberculosis} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="PID/Fibrose"
            value={medicalHistory?.pidFibrosis}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Cancers" value={medicalHistory?.cancers} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Cardiopathie" value={medicalHistory?.cardiopathy} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="HTA" value={medicalHistory?.hta} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Diabète" value={medicalHistory?.diabetes} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="IRC" value={medicalHistory?.irc} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Chirurgie thoracique"
            value={medicalHistory?.thoracicSurgery}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Autre" value={medicalHistory?.otherPersonal} />
        </View>
      </View>
      {hasValue(medicalHistory?.cancersDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails cancers"
            value={medicalHistory?.cancersDetails}
          />
        </View>
      )}
      {hasValue(medicalHistory?.otherPersonalDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails autre antécédent"
            value={medicalHistory?.otherPersonalDetails}
          />
        </View>
      )}

      {/* Antécédents iatrogènes / traumatiques */}
      <Text style={baseStyles.subsectionTitle}>
        Antécédents Iatrogènes / Traumatiques
      </Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Traumatisme thoracique récent"
            value={medicalHistory?.recentThoracicTrauma}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Ventilation mécanique"
            value={medicalHistory?.mechanicalVentilation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="CVC/Ponction pleurale"
            value={medicalHistory?.cvcPleuralPuncture}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Autre geste récent"
            value={medicalHistory?.otherRecentProcedure}
          />
        </View>
      </View>
      {hasValue(medicalHistory?.otherRecentProcedureDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails autre geste"
            value={medicalHistory?.otherRecentProcedureDetails}
          />
        </View>
      )}

      {/* Habitus et facteurs de risque */}
      <Text style={baseStyles.subsectionTitle}>Habitus et Facteurs de Risque</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Tabagisme" value={medicalHistory?.smoking} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Quantité tabagisme (PA)"
            value={medicalHistory?.smokingQuantity}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Cannabis/Drogues"
            value={medicalHistory?.cannabisDrugs}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Morphotype longiligne"
            value={medicalHistory?.longiligneMorphotype}
          />
        </View>
      </View>

      {/* Allergies et traitements */}
      <Text style={baseStyles.subsectionTitle}>Allergies et Traitements</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Allergies" value={medicalHistory?.allergies} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Traitements chroniques"
            value={medicalHistory?.chronicTreatments}
          />
        </View>
      </View>
      {hasValue(medicalHistory?.allergiesDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails allergies"
            value={medicalHistory?.allergiesDetails}
          />
        </View>
      )}
      {hasValue(medicalHistory?.chronicTreatmentsDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails traitements chroniques"
            value={medicalHistory?.chronicTreatmentsDetails}
          />
        </View>
      )}
    </View>
  );
}

/**
 * Section Histoire de la Maladie
 */
function DiseaseHistorySection({ patient }: PneumothoraxPathologyPDFProps) {
  const diseaseHistory = getNestedValue(
    patient,
    "pneumothoraxDiseaseHistory"
  ) as Record<string, unknown> | undefined;

  if (
    !diseaseHistory ||
    !Object.values(diseaseHistory).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Histoire de la Maladie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Début" value={diseaseHistory?.onset} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Date/Heure début" value={diseaseHistory?.onsetDateTime} />
        </View>
      </View>

      {/* Symptômes */}
      <Text style={baseStyles.subsectionTitle}>Symptômes</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Douleur thoracique"
            value={diseaseHistory?.thoracicPain}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Type douleur thoracique"
            value={diseaseHistory?.thoracicPainType}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Côté douleur thoracique"
            value={diseaseHistory?.thoracicPainSide}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Dyspnée" value={diseaseHistory?.dyspnea} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Intensité dyspnée"
            value={diseaseHistory?.dyspneaIntensity}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Toux" value={diseaseHistory?.cough} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Hémoptysie" value={diseaseHistory?.hemoptysis} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Fièvre" value={diseaseHistory?.fever} />
        </View>
      </View>

      {hasValue(diseaseHistory?.commentsChronology) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Commentaires chronologie"
            value={diseaseHistory?.commentsChronology}
          />
        </View>
      )}
    </View>
  );
}

/**
 * Section Examen Clinique
 */
function ClinicalExamSection({ patient }: PneumothoraxPathologyPDFProps) {
  const clinicalExam = getNestedValue(
    patient,
    "pneumothoraxClinicalExam"
  ) as Record<string, unknown> | undefined;

  if (!clinicalExam || !Object.values(clinicalExam).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examen Clinique</Text>

      {/* Constantes */}
      <Text style={baseStyles.subsectionTitle}>Constantes</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="TA (mmHg)" value={clinicalExam?.ta} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="FC (bpm)" value={clinicalExam?.fc} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="FR (cpm)" value={clinicalExam?.fr} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="SpO2 (%)" value={clinicalExam?.spO2} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Température (°C)" value={clinicalExam?.temp} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="EVA douleur" value={clinicalExam?.painEva} />
        </View>
      </View>

      {/* État général et signes de gravité */}
      <Text style={baseStyles.subsectionTitle}>
        État Général et Signes de Gravité
      </Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Détresse respiratoire"
            value={clinicalExam?.respiratoryDistress}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Désaturation" value={clinicalExam?.desaturation} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Instabilité hémodynamique"
            value={clinicalExam?.hemodynamicInstability}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Altération conscience"
            value={clinicalExam?.consciousnessAlteration}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Pneumothorax compressif"
            value={clinicalExam?.compressivePneumothorax}
          />
        </View>
      </View>

      {/* Inspection - Palpation */}
      <Text style={baseStyles.subsectionTitle}>Inspection - Palpation</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Asymétrie thoracique"
            value={clinicalExam?.thoracicAsymmetry}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Côté asymétrie thoracique"
            value={clinicalExam?.thoracicAsymmetrySide}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Emphysème sous-cutané"
            value={clinicalExam?.subcutaneousEmphysema}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Déviation trachéale"
            value={clinicalExam?.trachealDeviation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Cyanose" value={clinicalExam?.cyanosis} />
        </View>
      </View>

      {/* Percussion - Auscultation */}
      <Text style={baseStyles.subsectionTitle}>Percussion - Auscultation</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Tympanisme" value={clinicalExam?.tympanism} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Côté tympanisme" value={clinicalExam?.tympanismSide} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Murmure vésiculaire diminué"
            value={clinicalExam?.diminishedVesicularMurmur}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Côté murmure vésiculaire diminué"
            value={clinicalExam?.diminishedVesicularMurmurSide}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Râles associés" value={clinicalExam?.associatedRales} />
        </View>
      </View>
      {hasValue(clinicalExam?.associatedRalesDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails râles associés"
            value={clinicalExam?.associatedRalesDetails}
          />
        </View>
      )}

      {/* Examen cardio-vasculaire */}
      <Text style={baseStyles.subsectionTitle}>Examen Cardio-Vasculaire</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Tachycardie" value={clinicalExam?.tachycardia} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Signes de choc" value={clinicalExam?.shockSigns} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Autre anomalie cardio-vasculaire"
            value={clinicalExam?.otherCardiovascular}
          />
        </View>
      </View>
      {hasValue(clinicalExam?.otherCardiovascularDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails autre anomalie cardio-vasculaire"
            value={clinicalExam?.otherCardiovascularDetails}
          />
        </View>
      )}

      {/* Autres examens */}
      {hasValue(clinicalExam?.otherExams) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField label="Autres examens" value={clinicalExam?.otherExams} />
        </View>
      )}
    </View>
  );
}

/**
 * Section Examens Paracliniques
 */
function ComplementaryExamsSection({ patient }: PneumothoraxPathologyPDFProps) {
  const complementaryExams = getNestedValue(
    patient,
    "pneumothoraxComplementaryExams"
  ) as Record<string, unknown> | undefined;

  if (
    !complementaryExams ||
    !Object.values(complementaryExams).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Examens Paracliniques</Text>

      {/* Imagerie */}
      <Text style={baseStyles.subsectionTitle}>Imagerie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Radio thorax" value={complementaryExams?.chestXray} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Échographie pleurale"
            value={complementaryExams?.pleuralUltrasound}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="TDM thoracique" value={complementaryExams?.thoracicCtd} />
        </View>
      </View>

      {/* Radio thorax */}
      {hasValue(complementaryExams?.chestXrayReport) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Compte-rendu radio thorax"
            value={complementaryExams?.chestXrayReport}
          />
        </View>
      )}
      {hasValue(complementaryExams?.chestXrayImages) && (
        <PDFImageGrid
          label="Images Radio Thorax"
          images={complementaryExams?.chestXrayImages as string[]}
        />
      )}

      {/* Échographie pleurale */}
      {hasValue(complementaryExams?.pleuralUltrasoundReport) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Compte-rendu échographie pleurale"
            value={complementaryExams?.pleuralUltrasoundReport}
          />
        </View>
      )}
      {hasValue(complementaryExams?.pleuralUltrasoundImages) && (
        <PDFImageGrid
          label="Images Échographie Pleurale"
          images={complementaryExams?.pleuralUltrasoundImages as string[]}
        />
      )}

      {/* TDM thoracique */}
      {hasValue(complementaryExams?.thoracicCtdImages) && (
        <PDFImageGrid
          label="Images TDM Thoracique"
          images={complementaryExams?.thoracicCtdImages as string[]}
        />
      )}

      {hasValue(complementaryExams?.imagingResults) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Résultats imagerie"
            value={complementaryExams?.imagingResults}
          />
        </View>
      )}

      {/* Biologie */}
      <Text style={baseStyles.subsectionTitle}>Biologie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Gaz du sang" value={complementaryExams?.bloodGas} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="NFS" value={complementaryExams?.nfs} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="CRP" value={complementaryExams?.crp} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Ionogramme" value={complementaryExams?.ionogram} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Hémostase" value={complementaryExams?.hemostasis} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Groupe sanguin" value={complementaryExams?.bloodGroup} />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Diagnostic
 */
function DiagnosisSection({ patient }: PneumothoraxPathologyPDFProps) {
  const diagnosis = getNestedValue(
    patient,
    "pneumothoraxDiagnosis"
  ) as Record<string, unknown> | undefined;

  if (!diagnosis || !Object.values(diagnosis).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Diagnostic</Text>

      {/* Type de pneumothorax */}
      <Text style={baseStyles.subsectionTitle}>Type de Pneumothorax</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Spontané primitif"
            value={diagnosis?.spontaneousPrimary}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Spontané secondaire"
            value={diagnosis?.spontaneousSecondary}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Traumatique" value={diagnosis?.traumatic} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Iatrogène" value={diagnosis?.iatrogenic} />
        </View>
      </View>
      {hasValue(diagnosis?.spontaneousSecondaryTerrain) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Terrain spontané secondaire"
            value={diagnosis?.spontaneousSecondaryTerrain}
          />
        </View>
      )}

      {/* Évaluation de la tolérance et de la taille */}
      <Text style={baseStyles.subsectionTitle}>
        Évaluation de la Tolérance et de la Taille
      </Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Bien toléré" value={diagnosis?.wellTolerated} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Mal toléré" value={diagnosis?.poorlyTolerated} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Compressif/Tension"
            value={diagnosis?.compressiveTension}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Petit" value={diagnosis?.small} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Moyen" value={diagnosis?.medium} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Grand" value={diagnosis?.large} />
        </View>
      </View>

      {hasValue(diagnosis?.diagnosticConclusion) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Conclusion diagnostique"
            value={diagnosis?.diagnosticConclusion}
          />
        </View>
      )}
    </View>
  );
}

/**
 * Section Prise en Charge (PEC)
 */
function ManagementSection({ patient }: PneumothoraxPathologyPDFProps) {
  const management = getNestedValue(
    patient,
    "pneumothoraxManagement"
  ) as Record<string, unknown> | undefined;

  if (!management || !Object.values(management).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Prise en Charge (PEC)</Text>

      {/* Mesures immédiates */}
      <Text style={baseStyles.subsectionTitle}>Mesures Immédiates</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Oxygénothérapie" value={management?.oxygenTherapy} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Modalité oxygénothérapie"
            value={management?.oxygenModality}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Débit (L/min)" value={management?.oxygenFlow} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Analgésie" value={management?.analgesia} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Voie périphérique" value={management?.peripheralIv} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Monitoring" value={management?.monitoring} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Indication gaz du sang"
            value={management?.bloodGasIndication}
          />
        </View>
      </View>
      {hasValue(management?.analgesiaDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails analgésie"
            value={management?.analgesiaDetails}
          />
        </View>
      )}

      {/* Traitement spécifique */}
      <Text style={baseStyles.subsectionTitle}>Traitement Spécifique</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Surveillance simple"
            value={management?.simpleMonitoring}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Ponction à l'aiguille"
            value={management?.needleAspiration}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Drainage pleural" value={management?.pleuralDrainage} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Côté drainage" value={management?.drainageSide} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Type drainage" value={management?.drainageType} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Système drainage" value={management?.drainageSystem} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Aspiration drainage"
            value={management?.drainageAspiration}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Pression aspiration (cmH2O)"
            value={management?.drainageAspirationPressure}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Anesthésie locale" value={management?.localAnesthesia} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Radio post-procédure"
            value={management?.postProcedureXray}
          />
        </View>
      </View>

      {/* Situations particulières */}
      <Text style={baseStyles.subsectionTitle}>Situations Particulières</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Décompression compressif"
            value={management?.compressiveDecompression}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Fuite d'air persistante"
            value={management?.persistentAirLeak}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Terrain à haut risque" value={management?.highRiskTerrain} />
        </View>
      </View>
    </View>
  );
}

/**
 * Section Surveillance Évolutive
 */
function MonitoringSection({ patient }: PneumothoraxPathologyPDFProps) {
  const monitoring = getNestedValue(
    patient,
    "pneumothoraxMonitoring"
  ) as Record<string, unknown> | undefined;

  if (!monitoring || !Object.values(monitoring).some((v) => hasValue(v))) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>Surveillance Évolutive</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Surveillance clinique régulière"
            value={monitoring?.regularClinicalMonitoring}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Contrôle radiologique"
            value={monitoring?.radiologicalControl}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Surveillance drain" value={monitoring?.drainMonitoring} />
        </View>
      </View>
      {hasValue(monitoring?.monitoringDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails surveillance"
            value={monitoring?.monitoringDetails}
          />
        </View>
      )}
      {hasValue(monitoring?.evolutionRemarks) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Remarques évolution"
            value={monitoring?.evolutionRemarks}
          />
        </View>
      )}
    </View>
  );
}

/**
 * Section Traitement et Ordonnance / Consignes de Sortie
 */
function TreatmentDischargeSection({ patient }: PneumothoraxPathologyPDFProps) {
  const treatmentDischarge = getNestedValue(
    patient,
    "pneumothoraxTreatmentDischarge"
  ) as Record<string, unknown> | undefined;

  if (
    !treatmentDischarge ||
    !Object.values(treatmentDischarge).some((v) => hasValue(v))
  ) {
    return null;
  }

  return (
    <View style={baseStyles.section}>
      <Text style={baseStyles.sectionTitle}>
        Traitement et Ordonnance / Consignes de Sortie
      </Text>

      {/* Traitement prescrit */}
      <Text style={baseStyles.subsectionTitle}>Traitement Prescrit</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField label="Antalgique" value={treatmentDischarge?.analgesic} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Autres traitements"
            value={treatmentDischarge?.otherTreatments}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Sevrage tabagique"
            value={treatmentDischarge?.smokingCessation}
          />
        </View>
      </View>
      {hasValue(treatmentDischarge?.analgesicDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails antalgique"
            value={treatmentDischarge?.analgesicDetails}
          />
        </View>
      )}
      {hasValue(treatmentDischarge?.otherTreatmentsDetails) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Détails autres traitements"
            value={treatmentDischarge?.otherTreatmentsDetails}
          />
        </View>
      )}

      {/* Critères de sortie */}
      <Text style={baseStyles.subsectionTitle}>Critères de Sortie</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Stabilité hémodynamique"
            value={treatmentDischarge?.hemodynamicStability}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="SpO2 satisfaisante" value={treatmentDischarge?.satisfactorySpO2} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Amélioration clinique"
            value={treatmentDischarge?.clinicalImprovement}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Imagerie satisfaisante"
            value={treatmentDischarge?.satisfactoryImaging}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Drain retiré" value={treatmentDischarge?.drainRemoved} />
        </View>
      </View>

      {/* Consignes au patient */}
      <Text style={baseStyles.subsectionTitle}>Consignes au Patient</Text>
      <View style={baseStyles.grid}>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Retour en urgence si"
            value={treatmentDischarge?.emergencyReturn}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Éviter efforts importants"
            value={treatmentDischarge?.avoidHeavyEfforts}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Durée évitement efforts (jours)"
            value={treatmentDischarge?.avoidEffortsDays}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Arrêter tabac" value={treatmentDischarge?.stopSmoking} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Éviter avion" value={treatmentDischarge?.avoidFlying} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Plongée contre-indiquée"
            value={treatmentDischarge?.divingContraindicated}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Consultation pneumologie"
            value={treatmentDischarge?.pneumologyConsultation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Consultation chirurgie thoracique"
            value={treatmentDischarge?.thoracicSurgeryConsultation}
          />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField label="Radio de contrôle" value={treatmentDischarge?.controlXray} />
        </View>
        <View style={baseStyles.gridItem}>
          <PDFField
            label="Date radio contrôle"
            value={treatmentDischarge?.controlXrayDate}
          />
        </View>
      </View>
      {hasValue(treatmentDischarge?.otherInstructions) && (
        <View style={baseStyles.gridItemFull}>
          <PDFField
            label="Autres consignes"
            value={treatmentDischarge?.otherInstructions}
          />
        </View>
      )}
    </View>
  );
}

/**
 * Composant principal pour la pathologie Pneumothorax
 */
export function PneumothoraxPathologyPDF({ patient }: PneumothoraxPathologyPDFProps) {
  return (
    <View>
      <ConsultationReasonSection patient={patient} />
      <MedicalHistorySection patient={patient} />
      <DiseaseHistorySection patient={patient} />
      <ClinicalExamSection patient={patient} />
      <ComplementaryExamsSection patient={patient} />
      <DiagnosisSection patient={patient} />
      <ManagementSection patient={patient} />
      <MonitoringSection patient={patient} />
      <TreatmentDischargeSection patient={patient} />
    </View>
  );
}
