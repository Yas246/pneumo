/**
 * Styles PDF pour la génération de rapports patients
 * Utilise react-pdf/renderer pour créer des styles cohérents
 */

import { StyleSheet } from "@react-pdf/renderer";

// Couleurs médicales cohérentes
export const COLORS = {
  primary: "#2563eb", // Bleu médical
  secondary: "#64748b", // Gris secondaire
  accent: "#06b6d4", // Cyan pour les accents
  success: "#10b981", // Vert succès
  warning: "#f59e0b", // Orange avertissement
  danger: "#ef4444", // Rouge danger
  text: "#1f2937", // Gris foncé pour le texte
  textLight: "#6b7280", // Gris clair pour le texte secondaire
  background: "#ffffff", // Blanc pour l'arrière-plan
  border: "#e5e7eb", // Gris très clair pour les bordures
};

// Styles de base pour le document
export const baseStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: COLORS.background,
  },

  // Styles d'en-tête
  header: {
    marginBottom: 20,
    borderBottom: `2pt solid ${COLORS.primary}`,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },

  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
  },

  // Styles de sections
  section: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
    borderBottom: `1pt solid ${COLORS.border}`,
    paddingBottom: 3,
  },

  subsectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 5,
    marginTop: 8,
  },

  // Styles de contenu
  content: {
    lineHeight: 1.4,
  },

  paragraph: {
    marginBottom: 6,
    textAlign: "justify",
  },

  // Styles de grille
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  gridItem: {
    width: "48%",
    marginRight: "2%",
    marginBottom: 8,
  },

  gridItemFull: {
    width: "100%",
    marginBottom: 8,
  },

  // Styles de champs
  field: {
    marginBottom: 4,
  },

  fieldLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 2,
  },

  fieldValue: {
    fontSize: 11,
    color: COLORS.text,
    lineHeight: 1.3,
  },

  fieldEmpty: {
    fontSize: 11,
    color: COLORS.textLight,
    fontStyle: "italic",
  },

  // Styles de tableau
  table: {
    marginBottom: 10,
  },

  tableHeader: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
    padding: 6,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },

  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: `0.5pt solid ${COLORS.border}`,
  },

  tableCell: {
    padding: 4,
    fontSize: 9,
    textAlign: "left",
    flex: 1,
  },

  tableCellHeader: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
    fontWeight: "bold",
  },

  // Styles de liste
  list: {
    marginBottom: 8,
  },

  listItem: {
    marginBottom: 3,
    paddingLeft: 10,
  },

  bullet: {
    position: "absolute",
    left: 0,
    fontSize: 8,
    color: COLORS.secondary,
  },

  // Styles spéciaux pour la médecine
  medicalBadge: {
    padding: "2 6",
    margin: "1 2",
    fontSize: 8,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    color: COLORS.background,
  },

  medicalBadgePositive: {
    backgroundColor: COLORS.success,
  },

  medicalBadgeNegative: {
    backgroundColor: COLORS.danger,
  },

  medicalBadgeWarning: {
    backgroundColor: COLORS.warning,
  },

  // Styles de pied de page
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: COLORS.textLight,
    borderTop: `0.5pt solid ${COLORS.border}`,
    paddingTop: 5,
    textAlign: "center",
  },

  // Styles d'espacement
  spacer: {
    height: 10,
  },

  smallSpacer: {
    height: 5,
  },

  // Styles de sauts de page
  pageBreak: {
    marginTop: 20,
  },
});

// Styles conditionnels pour les champs vides/présents
export const conditionalStyles = {
  fieldValue: (hasValue: boolean) => ({
    ...baseStyles.fieldValue,
    ...(hasValue ? {} : baseStyles.fieldEmpty),
  }),

  medicalBadge: (
    type: "positive" | "negative" | "warning" | "neutral" = "neutral"
  ) => ({
    ...baseStyles.medicalBadge,
    ...(type === "positive" ? baseStyles.medicalBadgePositive : {}),
    ...(type === "negative" ? baseStyles.medicalBadgeNegative : {}),
    ...(type === "warning" ? baseStyles.medicalBadgeWarning : {}),
  }),
};

// Fonctions utilitaires pour les styles dynamiques
export const createGridStyle = (columns: number = 2) => {
  const width = `${Math.floor(100 / columns) - 2}%`;
  return StyleSheet.create({
    grid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    gridItem: {
      width,
      marginRight: "2%",
      marginBottom: 8,
    },
  });
};

export const createTableStyle = (columns: number) => {
  const cellWidth = `${100 / columns}%`;
  return StyleSheet.create({
    tableCell: {
      ...baseStyles.tableCell,
      width: cellWidth,
    },
  });
};

// Styles spécialisés pour les pathologies
export const pathologyStyles = StyleSheet.create({
  asthmaBadge: {
    ...baseStyles.medicalBadge,
    backgroundColor: "#10b981", // Vert pour asthme contrôlé
  },

  bpcoBadge: {
    ...baseStyles.medicalBadge,
    backgroundColor: "#f59e0b", // Orange pour BPCO
  },

  tbkBadge: {
    ...baseStyles.medicalBadge,
    backgroundColor: "#ef4444", // Rouge pour tuberculose
  },

  sleepBadge: {
    ...baseStyles.medicalBadge,
    backgroundColor: "#8b5cf6", // Violet pour sommeil
  },
});
