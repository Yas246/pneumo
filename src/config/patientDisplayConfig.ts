export interface PathologyDisplayConfig {
  id: string;
  sections: {
    consultationReason?: {
      title: string;
      reasons: Array<{
        key: string;
        label: string;
        color: string;
        isOther?: boolean;
      }>;
    };
    medicalHistory?: {
      sections: Array<{
        title: string;
        items?: Array<{
          key: string;
          label: string;
          hasCount?: string;
          suffix?: string;
          prefix?: string;
          isArray?: boolean;
          color?: string;
        }>;
        key?: string;
        isTextArea?: boolean;
        placeholder?: string;
        isArray?: boolean;
      }>;
    };
    clinicalExam?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          type?: "text" | "number" | "boolean";
          prefix?: string;
          suffix?: string;
          isArray?: boolean;
          condition?: string;
          color?: string;
        }>;
      }>;
    };
    complementaryExams?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          unit?: string;
          type?: "text" | "number";
          suffix?: string;
          prefix?: string;
          isArray?: boolean;
          condition?: string;
          color?: string;
        }>;
      }>;
    };
    diagnosis?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          color?: string;
          prefix?: string;
        }>;
      }>;
    };
    treatment?: {
      sections: Array<{
        title: string;
        items?: Array<{
          key: string;
          label: string;
          color?: string;
          isArray?: boolean;
          prefix?: string;
          suffix?: string;
        }>;
        key?: string;
        isTextArea?: boolean;
      }>;
    };
    followUp?: {
      sections: Array<{
        title: string;
        items: Array<{
          key: string;
          label: string;
          type?: "text" | "date";
          prefix?: string;
          suffix?: string;
        }>;
      }>;
    };
  };
}

// Configuration centralisée pour toutes les pathologies
export const pathologyDisplayConfigs: Record<string, PathologyDisplayConfig> = {
  bpco: {
    id: "bpco",
    sections: {
      consultationReason: {
        title: "Motifs de consultation BPCO",
        reasons: [
          {
            key: "chronicCough",
            label: "Toux chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "chronicBronchitis",
            label: "Bronchite chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "chronicDyspnea",
            label: "Dyspnée chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "acuteDyspneaAggravation",
            label: "Aggravation aigue d'une dyspnée chronique",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "frequentRespiratoryInfections",
            label: "Infections respiratoires fréquentes",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
          },
          {
            key: "other",
            label: "Autre",
            color:
              "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
            isOther: true,
          },
        ],
      },
      medicalHistory: {
        sections: [
          {
            title: "Antécédents respiratoires BPCO",
            items: [
              {
                key: "asthma",
                label: "Asthme",
                hasCount: "asthmaExacerbationsPerYear",
                suffix: "exacerbations/an",
              },
              {
                key: "bpco",
                label: "BPCO",
                hasCount: "bpcoExacerbationsPerYear",
                suffix: "exacerbations/an",
              },
              { key: "tuberculosis", label: "Tuberculose" },
              { key: "pneumonia", label: "Pneumonies" },
              {
                key: "recurrentRespiratoryInfections",
                label: "Infections respiratoires à répétition",
              },
            ],
          },
          {
            title: "Exposition professionnelle BPCO",
            items: [
              {
                key: "professionalPollutants",
                label: "Polluants professionnels",
              },
              { key: "domesticPollutants", label: "Polluants domestiques" },
              { key: "urbanPollutants", label: "Polluants urbains" },
            ],
          },
          {
            title: "Autres antécédents BPCO",
            items: [
              { key: "rgo", label: "RGO" },
              { key: "hepatopathy", label: "Hépatopathie" },
              { key: "nephropathy", label: "Néphropathie" },
              { key: "cardiopathy", label: "Cardiopathie" },
              { key: "connectiveTissue", label: "Connectivite" },
              { key: "neoplasia", label: "Néooplasie" },
              { key: "other", label: "Autres" },
            ],
          },
          {
            title: "Antécédents chirurgicaux BPCO",
            key: "surgicalHistory",
            isTextArea: true,
            placeholder: "Aucun",
          },
          {
            title: "Vaccination BPCO",
            key: "vaccinations",
            isArray: true,
            items: [
              {
                key: "annualFlu",
                label: "Grippe annuelle",
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
              {
                key: "pneumococcal",
                label: "Pneumocoque",
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
              {
                key: "sarsCov2",
                label: "SARS-CoV-2",
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
            ],
          },
          {
            title: "Toxiques BPCO",
            items: [
              { key: "smokingStatus", label: "Statut tabagique" },
              { key: "paquetsAnnees", label: "PA", prefix: "• " },
              { key: "cannabis", label: "Cannabis", prefix: "• " },
              { key: "alcohol", label: "Alcool", prefix: "• " },
            ],
          },
        ],
      },
    },
  },
  asthma: {
    id: "asthma",
    sections: {
      consultationReason: {
        title: "Motifs de consultation Asthme",
        reasons: [
          {
            key: "expiratoryDyspnea",
            label: "Dyspnée expiratoire",
            color:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
          },
          {
            key: "dryCough",
            label: "Toux sèche",
            color:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
          },
          {
            key: "nocturnalCrisis",
            label: "Crise nocturne",
            color:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
          },
          {
            key: "thoracicOppression",
            label: "Oppression thoracique",
            color:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
          },
          {
            key: "other",
            label: "Autre",
            color:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
            isOther: true,
          },
        ],
      },
      medicalHistory: {
        sections: [
          {
            title: "Antécédents médicaux Asthme",
            items: [
              { key: "knownAsthma", label: "Asthme connu" },
              { key: "asthmaSince", label: "Asthme depuis", prefix: "• " },
              { key: "allergicRhinitis", label: "Rhinite allergique" },
              {
                key: "eczemaAtopicDermatitis",
                label: "Eczéma / Dermatite atopique",
              },
              { key: "gerd", label: "RGO" },
              { key: "other", label: "Autres", prefix: "• " },
            ],
          },
          {
            title: "Antécédents chirurgicaux Asthme",
            key: "surgicalHistory",
            isTextArea: true,
            placeholder: "Aucun",
          },
          {
            title: "Allergies connues",
            items: [
              {
                key: "respiratoryAllergens",
                label: "Allergènes respiratoires",
                isArray: true,
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
              {
                key: "drugAllergies",
                label: "Allergies médicamenteuses",
                hasCount: "drugAllergiesDetails",
                suffix: "",
              },
              {
                key: "otherAllergies",
                label: "Autres allergies",
                hasCount: "otherAllergiesDetails",
                suffix: "",
              },
            ],
          },
          {
            title: "Antécédents familiaux",
            items: [
              { key: "parentAsthmatic", label: "Parent asthmatique" },
              { key: "familyAtopy", label: "Atopie familiale" },
              { key: "familyOther", label: "Autres", prefix: "• " },
            ],
          },
          {
            title: "Tabac",
            items: [
              { key: "smokingStatus", label: "Statut tabagique", prefix: "• " },
              {
                key: "tobaccoQuantity",
                label: "Quantité (Tabac)",
                prefix: "• ",
                suffix: " PA",
              },
              { key: "cannabis", label: "Cannabis", prefix: "• " },
              { key: "otherToxic", label: "Autres (Toxiques)", prefix: "• " },
            ],
          },
        ],
      },
      clinicalExam: {
        sections: [
          {
            title: "État général",
            items: [
              {
                key: "consciousness",
                label: "État de conscience",
                isArray: true,
                color:
                  "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
              },
              { key: "asthenia", label: "Asthénie" },
              {
                key: "generalStateAlteration",
                label: "Altération de l'état général",
              },
              { key: "bloodPressure", label: "TA", prefix: "• " },
              { key: "heartRate", label: "FC", suffix: " bpm" },
              { key: "temperature", label: "Température", suffix: " °C" },
              { key: "spO2", label: "SpO2", suffix: " %" },
              { key: "weight", label: "Poids", suffix: " kg" },
              { key: "height", label: "Taille", suffix: " cm" },
              { key: "bmi", label: "IMC", suffix: " kg/m²" },
            ],
          },
          {
            title: "Appareil respiratoire",
            items: [
              {
                key: "vesicularMurmur",
                label: "Murmure vésiculaire",
                prefix: "• ",
              },
              {
                key: "auscultationAnomalies",
                label: "Anomalies auscultatoires",
                isArray: true,
                color:
                  "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
              },
              {
                key: "respiratoryDistressSigns",
                label: "Signes de détresse respiratoire",
                isArray: true,
                color:
                  "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
              },
              {
                key: "pleuropulmonarySyndromes",
                label: "Syndromes pleuropulmonaires",
                isArray: true,
                color:
                  "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
              },
              {
                key: "syndromeLocation",
                label: "Localisation (Syndromes)",
                prefix: "• ",
              },
              {
                key: "otherRespiratory",
                label: "Autre (Appareil respiratoire)",
                prefix: "• ",
              },
            ],
          },
          {
            title: "Appareil cardiovasculaire",
            items: [
              { key: "regularBdc", label: "BDC réguliers" },
              { key: "heartMurmur", label: "Souffle cardiaque" },
              {
                key: "murmurTiming",
                label: "Moment du souffle",
                prefix: "• ",
                condition: "heartMurmur",
              },
              {
                key: "murmurLocation",
                label: "Localisation du souffle",
                isArray: true,
                color:
                  "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
                condition: "heartMurmur",
              },
              {
                key: "murmurType",
                label: "Type de souffle",
                isArray: true,
                color:
                  "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
                condition: "heartMurmur",
              },
              {
                key: "murmurIntensity",
                label: "Intensité du souffle",
                suffix: "/6",
                condition: "heartMurmur",
              },
              {
                key: "murmurIrradiation",
                label: "Irradiation du souffle",
                prefix: "• ",
                condition: "heartMurmur",
              },
              { key: "muffledNoises", label: "Bruits assourdis" },
              { key: "pericardialFriction", label: "Frottement péricardique" },
              { key: "irregularRhythm", label: "Rythme irrégulier" },
              { key: "lowerLimbEdema", label: "Œdèmes des membres inférieurs" },
              { key: "rhj", label: "RHJ" },
              { key: "tjPlus", label: "TJ+" },
              { key: "marbling", label: "Marbrures" },
            ],
          },
          {
            title: "Appareil digestif",
            items: [
              {
                key: "abdomenInspection",
                label: "Inspection (Abdomen)",
                isArray: true,
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
              {
                key: "abdomenPalpation",
                label: "Palpation (Abdomen)",
                isArray: true,
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
              { key: "hepatomegaly", label: "Hépatomégalie" },
              {
                key: "hepatomegalySize",
                label: "Taille (Hépatomégalie)",
                suffix: " cm",
                condition: "hepatomegaly",
              },
              { key: "splenomegaly", label: "Splénomégalie" },
              {
                key: "splenomegalySize",
                label: "Taille (Splénomégalie)",
                suffix: " cm",
                condition: "splenomegaly",
              },
              {
                key: "abdomenPercussion",
                label: "Percussion (Abdomen)",
                isArray: true,
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
              {
                key: "abdomenAuscultation",
                label: "Auscultation (Abdomen)",
                isArray: true,
                color:
                  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
              },
            ],
          },
          {
            title: "Appareil urinaire",
            items: [
              { key: "diuresis", label: "Diurèse", prefix: "• " },
              { key: "bladderGlobe", label: "Globe vésical" },
              {
                key: "urinaryFunctionalSigns",
                label: "Signes fonctionnels urinaires",
                isArray: true,
                color:
                  "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
              },
              { key: "puBuPerformed", label: "PU/BU réalisé" },
              {
                key: "puBuResult",
                label: "Résultat (PU/BU)",
                prefix: "• ",
                condition: "puBuPerformed",
              },
            ],
          },
          {
            title: "Appareil locomoteur",
            items: [
              {
                key: "symptoms",
                label: "Symptômes",
                isArray: true,
                color:
                  "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
              },
              { key: "mobility", label: "Mobilité", prefix: "• " },
              {
                key: "affectedJoints",
                label: "Articulations concernées",
                prefix: "• ",
              },
            ],
          },
          {
            title: "Système nerveux",
            items: [
              {
                key: "consciousness",
                label: "État de conscience",
                prefix: "• ",
              },
              {
                key: "neurologicalSigns",
                label: "Signes neurologiques",
                isArray: true,
                color:
                  "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
              },
              { key: "motorDeficit", label: "Déficit moteur", prefix: "• " },
              {
                key: "sensoryDeficit",
                label: "Déficit sensitif",
                prefix: "• ",
              },
              { key: "rot", label: "ROT", prefix: "• " },
              {
                key: "rotDescription",
                label: "Description ROT",
                prefix: "• ",
                condition: "rot",
              },
              {
                key: "balance",
                label: "Équilibre",
                isArray: true,
                color:
                  "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
              },
            ],
          },
          {
            title: "Peau et muqueuses",
            items: [
              {
                key: "inspection",
                label: "Inspection",
                isArray: true,
                color:
                  "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
              },
              {
                key: "dermatologicalLesions",
                label: "Lésions dermatologiques",
                prefix: "• ",
              },
            ],
          },
          {
            title: "ORL / Yeux / Bouche",
            items: [
              { key: "conjunctiva", label: "Conjonctives", prefix: "• " },
              {
                key: "oralCavity",
                label: "Cavité buccale",
                isArray: true,
                color:
                  "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300",
              },
              { key: "tonsils", label: "Amygdales", prefix: "• " },
              {
                key: "orlSymptoms",
                label: "Symptômes ORL",
                isArray: true,
                color:
                  "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
              },
            ],
          },
        ],
      },
      complementaryExams: {
        sections: [
          {
            title: "Examens fonctionnels",
            items: [
              { key: "morningPef", label: "DEP matin", suffix: " L/min" },
              { key: "eveningPef", label: "DEP soir", suffix: " L/min" },
              {
                key: "efrReversibleObstruction",
                label: "EFR - Obstruction réversible",
              },
              { key: "efrVems", label: "EFR - VEMS" },
              { key: "efrVemsCv", label: "EFR - VEMS/CV", suffix: " %" },
            ],
          },
          {
            title: "Imagerie",
            items: [
              {
                key: "chestXray",
                label: "RX thorax",
                isArray: true,
                color:
                  "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
              },
              {
                key: "chestXrayOther",
                label: "RX thorax - Autre (image)",
                prefix: "• ",
              },
            ],
          },
          {
            title: "Biologie",
            items: [
              { key: "nfsHyperEosinophilia", label: "NFS - Hyperéosinophilie" },
              {
                key: "hyperEosinophiliaValue",
                label: "Valeur (Hyperéosinophilie)",
                suffix: " /mm³",
                condition: "nfsHyperEosinophilia",
              },
              { key: "totalIge", label: "IgE totales", suffix: " UI/mL" },
              { key: "reversibilityTest", label: "Test de réversibilité" },
              {
                key: "variationPercentage",
                label: "Variation (%)",
                suffix: " %",
                condition: "reversibilityTest",
              },
              {
                key: "variationMl",
                label: "Variation (ml)",
                suffix: " ml",
                condition: "reversibilityTest",
              },
              {
                key: "positivePrickTests",
                label: "Prick-tests allergènes positifs",
                prefix: "• ",
              },
              {
                key: "otherComplementaryExams",
                label: "Autres (Examens complémentaires)",
                prefix: "• ",
              },
            ],
          },
        ],
      },
      diagnosis: {
        sections: [
          {
            title: "Classification de la gravité",
            items: [
              { key: "allergicAsthma", label: "Asthme allergique" },
              { key: "nonAllergicAsthma", label: "Asthme non allergique" },
              { key: "intermittentAsthma", label: "Asthme intermittent" },
              {
                key: "persistentAsthmaSeverity",
                label: "Asthme persistant",
                prefix: "• ",
              },
              {
                key: "exerciseInducedAsthma",
                label: "Asthme induit par l'effort",
              },
              { key: "otherForms", label: "Autres formes", prefix: "• " },
            ],
          },
        ],
      },
      treatment: {
        sections: [
          {
            title: "Traitement de fond",
            items: [
              {
                key: "inhaledCorticosteroids",
                label: "Corticoïdes inhalés",
                prefix: "• ",
              },
              { key: "csiDose", label: "Dose (CSI)", suffix: " µg" },
              { key: "csiFrequency", label: "Fréquence (CSI)", suffix: " /j" },
              {
                key: "laba",
                label: "Bêta-2 longue durée (LABA)",
                prefix: "• ",
              },
              {
                key: "antiLeukotrienes",
                label: "Anti-leucotriènes (Montelukast)",
              },
              {
                key: "otherMaintenance",
                label: "Autres (Traitement de fond)",
                prefix: "• ",
              },
            ],
          },
          {
            title: "Traitement de crise",
            items: [
              {
                key: "salbutamolInstruction",
                label: "Instruction Salbutamol 100 µg",
                prefix: "• ",
              },
              {
                key: "otherCrisis",
                label: "Autres (Traitement de crise)",
                prefix: "• ",
              },
            ],
          },
          {
            title: "Mesures associées",
            items: [
              {
                key: "associatedMeasures",
                label: "Mesures associées",
                isArray: true,
                color:
                  "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300",
              },
            ],
          },
        ],
      },
      followUp: {
        sections: [
          {
            title: "Suivi",
            items: [
              {
                key: "nextConsultation",
                label: "Prochaine consultation",
                prefix: "• ",
              },
              {
                key: "spirometryDelay",
                label: "Délai prochaine spirométrie",
                suffix: " semaines",
              },
              {
                key: "controlObjective",
                label: "Objectif de contrôle (ACT)",
                prefix: "• ",
              },
            ],
          },
        ],
      },
    },
  },
};

// Utilitaires pour accéder aux configurations
export const getPathologyConfig = (
  pathologyId: string
): PathologyDisplayConfig | null => {
  return pathologyDisplayConfigs[pathologyId] || null;
};

export const getSectionConfig = (
  pathologyId: string,
  sectionName: keyof PathologyDisplayConfig["sections"]
) => {
  const config = getPathologyConfig(pathologyId);
  return config?.sections[sectionName] || null;
};
