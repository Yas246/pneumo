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
          hasCount?: string;
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
          condition?: string;
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
          condition?: string;
          hasCount?: string;
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
          condition?: string;
          isArray?: boolean;
          color?: string;
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
  pneumothorax: {
    id: "pneumothorax",
    sections: {
      consultationReason: {
        title: "Motifs de consultation Pneumothorax",
        reasons: [
          {
            key: "thoracicPain",
            label: "Douleur thoracique",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
          },
          {
            key: "dyspnea",
            label: "Dyspnée",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
          },
          {
            key: "cough",
            label: "Toux",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
          },
          {
            key: "thoracicOppression",
            label: "Oppression thoracique",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
          },
          {
            key: "malaiseSyncope",
            label: "Malaise/Syncope",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
          },
          {
            key: "radiologicalDiscovery",
            label: "Découverte radiologique",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
          },
          {
            key: "other",
            label: "Autre",
            color:
              "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
            isOther: true,
          },
        ],
      },
      medicalHistory: {
        sections: [
          {
            title: "Antécédents personnels Pneumothorax",
            items: [
              {
                key: "previousPneumothorax",
                label: "Pneumothorax antérieur",
                hasCount: "previousPneumothoraxCount",
                suffix: "fois",
              },
              { key: "previousPneumothoraxSide", label: "Côté", prefix: "• " },
              { key: "previousPneumothoraxDate", label: "Date", prefix: "• " },
              { key: "bpcoEmphysema", label: "BPCO/Emphysème" },
              { key: "severeAsthma", label: "Asthme sévère" },
              { key: "tuberculosis", label: "Tuberculose" },
              { key: "pidFibrosis", label: "PID/Fibrose" },
              {
                key: "cancers",
                label: "Cancers",
                hasCount: "cancersDetails",
                suffix: "",
              },
              { key: "cardiopathy", label: "Cardiopathie" },
              { key: "hta", label: "HTA" },
              { key: "diabetes", label: "Diabète" },
              { key: "irc", label: "IRC" },
              { key: "thoracicSurgery", label: "Chirurgie thoracique" },
              {
                key: "otherPersonal",
                label: "Autres",
                hasCount: "otherPersonalDetails",
                suffix: "",
              },
            ],
          },
          {
            title: "Antécédents iatrogènes/traumatiques Pneumothorax",
            items: [
              {
                key: "recentThoracicTrauma",
                label: "Traumatisme thoracique récent",
              },
              { key: "mechanicalVentilation", label: "Ventilation mécanique" },
              { key: "cvcPleuralPuncture", label: "CVC/Ponction pleurale" },
              {
                key: "otherRecentProcedure",
                label: "Autre procédure récente",
                hasCount: "otherRecentProcedureDetails",
                suffix: "",
              },
            ],
          },
          {
            title: "Habitus et facteurs de risque Pneumothorax",
            items: [
              {
                key: "smoking",
                label: "Tabagisme",
                hasCount: "smokingQuantity",
                suffix: "PA",
              },
              { key: "cannabisDrugs", label: "Cannabis/Drogues" },
              { key: "longiligneMorphotype", label: "Morphotype longiligne" },
              {
                key: "recentExposure",
                label: "Expositions récentes",
                isArray: true,
                color:
                  "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
              },
            ],
          },
          {
            title: "Allergies et traitements Pneumothorax",
            items: [
              {
                key: "allergies",
                label: "Allergies",
                hasCount: "allergiesDetails",
                suffix: "",
              },
              {
                key: "chronicTreatments",
                label: "Traitements chroniques",
                hasCount: "chronicTreatmentsDetails",
                suffix: "",
              },
            ],
          },
        ],
      },
      clinicalExam: {
        sections: [
          {
            title: "Constantes",
            items: [
              { key: "ta", label: "TA", suffix: " mmHg" },
              { key: "fc", label: "FC", suffix: " bpm" },
              { key: "fr", label: "FR", suffix: " /min" },
              { key: "spO2", label: "SpO2", suffix: " %" },
              { key: "temp", label: "Température", suffix: " °C" },
              { key: "painEva", label: "Douleur (EVA)", suffix: "/10" },
            ],
          },
          {
            title: "État général et signes de gravité",
            items: [
              { key: "respiratoryDistress", label: "Détresse respiratoire" },
              { key: "desaturation", label: "Désaturation" },
              {
                key: "hemodynamicInstability",
                label: "Instabilité hémodynamique",
              },
              {
                key: "consciousnessAlteration",
                label: "Altération de la conscience",
              },
              {
                key: "compressivePneumothorax",
                label: "Pneumothorax compressif",
              },
            ],
          },
          {
            title: "Inspection - Palpation",
            items: [
              { key: "thoracicAsymmetry", label: "Asymétrie thoracique" },
              {
                key: "thoracicAsymmetrySide",
                label: "Côté (Asymétrie)",
                prefix: "• ",
                condition: "thoracicAsymmetry",
              },
              { key: "subcutaneousEmphysema", label: "Emphysème sous-cutané" },
              { key: "trachealDeviation", label: "Déviation trachéale" },
              { key: "cyanosis", label: "Cyanose" },
            ],
          },
          {
            title: "Percussion - Auscultation",
            items: [
              { key: "tympaniism", label: "Tympanisme" },
              {
                key: "tympaniismSide",
                label: "Côté (Tympanisme)",
                prefix: "• ",
                condition: "tympaniism",
              },
              {
                key: "diminishedVesicularMurmur",
                label: "Murmure vésiculaire diminué",
              },
              {
                key: "diminishedVesicularMurmurSide",
                label: "Côté (Murmure diminué)",
                prefix: "• ",
                condition: "diminishedVesicularMurmur",
              },
              { key: "associatedRales", label: "Râles associés" },
              {
                key: "associatedRalesDetails",
                label: "Détails (Râles)",
                prefix: "• ",
                condition: "associatedRales",
              },
            ],
          },
          {
            title: "Examen cardio-vasculaire",
            items: [
              { key: "tachycardia", label: "Tachycardie" },
              { key: "shockSigns", label: "Signes de choc" },
              {
                key: "otherCardiovascular",
                label: "Autres",
                hasCount: "otherCardiovascularDetails",
                suffix: "",
              },
            ],
          },
          {
            title: "Autres examens",
            items: [
              { key: "otherExams", label: "Autres examens", prefix: "• " },
            ],
          },
        ],
      },
      complementaryExams: {
        sections: [
          {
            title: "Imagerie",
            items: [
              { key: "chestXray", label: "Radiographie thoracique" },
              {
                key: "chestXrayReport",
                label: "Compte-rendu RX thorax",
                prefix: "• ",
                condition: "chestXray",
              },
              { key: "pleuralUltrasound", label: "Échographie pleurale" },
              {
                key: "pleuralUltrasoundReport",
                label: "Compte-rendu Écho pleurale",
                prefix: "• ",
                condition: "pleuralUltrasound",
              },
              { key: "thoracicCtd", label: "TDM thoracique" },
              {
                key: "imagingResults",
                label: "Résultats d'imagerie",
                prefix: "• ",
              },
            ],
          },
          {
            title: "Biologie",
            items: [
              { key: "bloodGas", label: "Gaz du sang", prefix: "• " },
              { key: "nfs", label: "NFS" },
              { key: "crp", label: "CRP" },
              { key: "ionogram", label: "Ionogramme" },
              { key: "hemostasis", label: "Hémostase" },
              { key: "bloodGroup", label: "Groupe sanguin" },
            ],
          },
        ],
      },
      diagnosis: {
        sections: [
          {
            title: "Type de pneumothorax",
            items: [
              { key: "spontaneousPrimary", label: "Spontané primaire" },
              { key: "spontaneousSecondary", label: "Spontané secondaire" },
              {
                key: "spontaneousSecondaryTerrain",
                label: "Terrain (Spontané secondaire)",
                prefix: "• ",
                condition: "spontaneousSecondary",
              },
              { key: "traumatic", label: "Traumatique" },
              { key: "iatrogenic", label: "Iatrogène" },
            ],
          },
          {
            title: "Évaluation de la tolérance et de la taille",
            items: [
              { key: "wellTolerated", label: "Bien toléré" },
              { key: "poorlyTolerated", label: "Mal toléré" },
              { key: "compressiveTension", label: "Compressif/tensionnel" },
              { key: "small", label: "Petit" },
              { key: "medium", label: "Moyen" },
              { key: "large", label: "Grand" },
              {
                key: "diagnosticConclusion",
                label: "Conclusion diagnostique",
                prefix: "• ",
              },
            ],
          },
        ],
      },
      treatment: {
        sections: [
          {
            title: "Mesures immédiates",
            items: [
              { key: "oxygenTherapy", label: "Oxygénothérapie" },
              {
                key: "oxygenModality",
                label: "Modalité (Oxygène)",
                prefix: "• ",
                condition: "oxygenTherapy",
              },
              {
                key: "oxygenFlow",
                label: "Débit (Oxygène)",
                suffix: " L/min",
                condition: "oxygenTherapy",
              },
              {
                key: "analgesia",
                label: "Analgésie",
                hasCount: "analgesiaDetails",
                suffix: "",
              },
              { key: "peripheralIv", label: "Voie veineuse périphérique" },
              { key: "monitoring", label: "Monitorage" },
              { key: "bloodGasIndication", label: "Indication gaz du sang" },
              {
                key: "specializedAdvice",
                label: "Avis spécialisé demandé",
                isArray: true,
                color:
                  "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
              },
            ],
          },
          {
            title: "Traitement spécifique",
            items: [
              { key: "simpleMonitoring", label: "Surveillance simple" },
              { key: "needleAspiration", label: "Aspiration à l'aiguille" },
              { key: "pleuralDrainage", label: "Drainage pleural" },
              {
                key: "drainageSide",
                label: "Côté (Drainage)",
                prefix: "• ",
                condition: "pleuralDrainage",
              },
              {
                key: "drainageType",
                label: "Type (Drainage)",
                prefix: "• ",
                condition: "pleuralDrainage",
              },
              {
                key: "drainageSystem",
                label: "Système (Drainage)",
                prefix: "• ",
                condition: "pleuralDrainage",
              },
              {
                key: "drainageAspiration",
                label: "Aspiration (Drainage)",
                prefix: "• ",
                condition: "pleuralDrainage",
              },
              {
                key: "drainageAspirationPressure",
                label: "Pression (Aspiration)",
                suffix: " cmH2O",
                condition: "pleuralDrainage",
              },
              {
                key: "localAnesthesia",
                label: "Anesthésie locale",
                condition: "pleuralDrainage",
              },
              {
                key: "postProcedureXray",
                label: "RX post-procédure",
                condition: "pleuralDrainage",
              },
            ],
          },
          {
            title: "Situations particulières",
            items: [
              {
                key: "compressiveDecompression",
                label: "Décompression pneumothorax compressif",
              },
              { key: "persistentAirLeak", label: "Fuite aérienne persistante" },
              { key: "highRiskTerrain", label: "Terrain à haut risque" },
            ],
          },
        ],
      },
      followUp: {
        sections: [
          {
            title: "Surveillance évolutive",
            items: [
              {
                key: "regularClinicalMonitoring",
                label: "Monitorage clinique régulier",
              },
              {
                key: "monitoringDetails",
                label: "Détails (Monitorage)",
                prefix: "• ",
                condition: "regularClinicalMonitoring",
              },
              {
                key: "radiologicalControl",
                label: "Contrôle radiologique",
                prefix: "• ",
              },
              { key: "drainMonitoring", label: "Monitorage du drain" },
              {
                key: "complications",
                label: "Complications",
                isArray: true,
                color:
                  "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
              },
              {
                key: "evolutionRemarks",
                label: "Remarques évolutives",
                prefix: "• ",
              },
            ],
          },
        ],
      },
    },
  },
  sleep: {
    id: "sleep",
    sections: {
      clinicalExam: {
        sections: [
          {
            title: "Mesures",
            items: [
              { key: "weight", label: "Poids", suffix: " kg" },
              { key: "height", label: "Taille", suffix: " cm" },
              { key: "bmi", label: "IMC", suffix: " kg/m²" },
              { key: "neckCircumference", label: "Tour de cou", suffix: " cm" },
              {
                key: "abdominalPerimeter",
                label: "Périmètre abdominal",
                suffix: " cm",
              },
              { key: "bloodPressure", label: "Tension artérielle" },
              {
                key: "heartRate",
                label: "Fréquence cardiaque",
                suffix: " bpm",
              },
              { key: "saturation", label: "Saturation", suffix: " %" },
            ],
          },
          {
            title: "Auscultation",
            items: [
              {
                key: "pulmonaryAuscultation",
                label: "Auscultation pulmonaire",
              },
            ],
          },
        ],
      },
      complementaryExams: {
        sections: [
          {
            title: "Polygraphie",
            items: [
              { key: "polygraphyDate", label: "Date" },
              { key: "iah", label: "IAH" },
              { key: "iahCentral", label: "IAH Central" },
              {
                key: "oxygenDesaturation",
                label: "Désaturation en O2",
                suffix: " %",
              },
              { key: "ct90", label: "CT90", suffix: " %" },
            ],
          },
          {
            title: "Gazométrie",
            items: [
              { key: "gazometryDate", label: "Date" },
              { key: "ph", label: "pH" },
              { key: "pao2", label: "PaO2", suffix: " mmHg" },
              { key: "paco2", label: "PaCO2", suffix: " mmHg" },
              { key: "hco3", label: "HCO3-", suffix: " mmol/L" },
              { key: "sao2", label: "SaO2", suffix: " %" },
            ],
          },
          {
            title: "EFR",
            items: [
              { key: "efrDate", label: "Date" },
              { key: "cvf", label: "CVF", suffix: " %" },
              { key: "vems", label: "VEMS", suffix: " %" },
              { key: "dlco", label: "DLCO", suffix: " %" },
              { key: "cpt", label: "CPT", suffix: " %" },
            ],
          },
        ],
      },
      diagnosis: {
        sections: [
          {
            title: "Diagnostic",
            items: [
              { key: "saos", label: "SAOS" },
              { key: "sacs", label: "SACS" },
              { key: "soh", label: "SOH" },
              {
                key: "nocturalHypoventilation",
                label: "Hypoventilation nocturne",
              },
              { key: "simpleSnoring", label: "Ronflement simple" },
            ],
          },
        ],
      },
      treatment: {
        sections: [
          {
            title: "Mesures hygiéno-diététiques",
            items: [
              { key: "weightLoss", label: "Perte de poids" },
              {
                key: "alcoholAndSedativesStop",
                label: "Arrêt alcool et sédatifs",
              },
              {
                key: "sleepHygieneImprovement",
                label: "Amélioration de l'hygiène du sommeil",
              },
            ],
          },
          {
            title: "Appareillage",
            items: [
              { key: "ppc", label: "PPC" },
              { key: "oam", label: "OAM" },
            ],
          },
          {
            title: "Traitement médical",
            items: [{ key: "medications", label: "Médicaments" }],
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
