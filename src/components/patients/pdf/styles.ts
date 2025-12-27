/**
 * Styles PDF pour la génération de rapports patients
 * Utilise react-pdf/renderer pour créer des styles cohérents
 *
 * @module styles
 * @description Système de styles cohérent pour les documents médicaux PDF
 * @accessibility Conforme WCAG AA pour les documents médicaux
 */

import { StyleSheet } from "@react-pdf/renderer";

// Couleurs médicales cohérentes - Optimisées pour WCAG AA
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
  // Backgrounds optimisés pour accessibilité (contraste AA)
  warningBg: "#fef3c7", // Background warning
  warningText: "#92400e", // Texte warning (contraste AA)
  infoBg: "#dbeafe", // Background info
  infoText: "#1e40af", // Texte info (contraste AA)
  successBg: "#d1fae5", // Background success
  successText: "#065f46", // Texte success (contraste AA)
  dangerBg: "#fee2e2", // Background danger
  dangerText: "#991b1b", // Texte danger (contraste AA)
  // Backgrounds pathologies
  sleepBg: "#faf5ff", // Background pathologie sommeil
  sleepBorder: "#8b5cf6", // Bordure pathologie sommeil
};

// Constantes de mise en page A4
export const A4_CONSTANTS = {
  width: 595, // Largeur A4 en points
  height: 842, // Hauteur A4 en points
  margin: 40, // Marge par défaut
  contentWidth: 515, // Largeur contenu (595 - 40*2)
  imageWidth16_9: 515, // Largeur image ratio 16:9
  imageHeight16_9: 291, // Hauteur image ratio 16:9 (515 * 9/16)
};

// Styles de base pour le document
export const baseStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: COLORS.background,
  },

  // Styles d'en-tête de page
  pageHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: "center",
  },

  pageSubheader: {
    fontSize: 14,
    fontWeight: "normal",
    color: COLORS.secondary,
    marginBottom: 15,
    textAlign: "center",
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

  // Styles de sections - Hiérarchie typographique améliorée
  section: {
    marginBottom: 15,
  },

  // Titre de section principal (niveau 1)
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
    marginTop: 15,
    paddingBottom: 6,
    borderBottom: `2pt solid ${COLORS.primary}`,
  },

  // Titre de section secondaire (niveau 2)
  sectionTitleSecondary: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 12,
    paddingBottom: 4,
    borderBottom: `1.5pt solid ${COLORS.secondary}`,
  },

  // Sous-titre de section (niveau 3)
  subsectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 8,
    marginTop: 10,
    paddingLeft: 10,
    borderLeft: `3pt solid ${COLORS.accent}`,
  },

  // Sous-sous-titre (niveau 4)
  subsubsectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textLight,
    marginBottom: 6,
    marginTop: 8,
    paddingLeft: 20,
    borderLeft: `2pt solid ${COLORS.border}`,
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

  // Grille à 3 colonnes pour données compactes
  grid3Columns: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  gridItem3Columns: {
    width: "31%",
    marginRight: "3.5%",
    marginBottom: 8,
  },

  // Grille avec bordure
  borderedGrid: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9fafb",
  },

  // Styles de champs - Amélioration typographique
  field: {
    marginBottom: 5,
  },

  // Label de champ avec style amélioré
  fieldLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Valeur de champ
  fieldValue: {
    fontSize: 11,
    color: COLORS.text,
    lineHeight: 1.4,
    fontWeight: "400",
  },

  // Valeur de champ vide
  fieldEmpty: {
    fontSize: 11,
    color: COLORS.textLight,
    fontStyle: "italic",
  },

  // Champ important mis en évidence
  fieldImportant: {
    marginBottom: 5,
    padding: 4,
    backgroundColor: "#fef3c7",
    borderLeft: `3pt solid ${COLORS.warning}`,
  },

  fieldImportantLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 2,
    textTransform: "uppercase",
  },

  fieldImportantValue: {
    fontSize: 11,
    color: "#1f2937",
    fontWeight: "500",
  },

  // Styles de tableau
  table: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
  },

  tableHeader: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: `1pt solid ${COLORS.border}`,
  },

  tableRowEven: {
    backgroundColor: "#f9fafb",
  },

  tableCell: {
    padding: 6,
    fontSize: 10,
    textAlign: "left",
    flex: 1,
    borderRight: `0.5pt solid ${COLORS.border}`,
  },

  tableCellLast: {
    borderRight: "none",
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
    padding: 2,
    margin: 1,
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

  // Zones d'alerte et d'information - Utilisation des constantes de couleurs
  alertBox: {
    backgroundColor: COLORS.warningBg,
    borderLeft: `4pt solid ${COLORS.warning}`,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
  },

  alertText: {
    fontSize: 10,
    color: COLORS.warningText,
    fontWeight: "bold",
    marginBottom: 3,
  },

  alertContent: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
  },

  infoBox: {
    backgroundColor: COLORS.infoBg,
    borderLeft: `4pt solid ${COLORS.primary}`,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
  },

  infoText: {
    fontSize: 10,
    color: COLORS.infoText,
    fontWeight: "bold",
    marginBottom: 3,
  },

  infoContent: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
  },

  successBox: {
    backgroundColor: COLORS.successBg,
    borderLeft: `4pt solid ${COLORS.success}`,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
  },

  successText: {
    fontSize: 10,
    color: COLORS.successText,
    fontWeight: "bold",
    marginBottom: 3,
  },

  successContent: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
  },

  dangerBox: {
    backgroundColor: COLORS.dangerBg,
    borderLeft: `4pt solid ${COLORS.danger}`,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
  },

  dangerText: {
    fontSize: 10,
    color: COLORS.dangerText,
    fontWeight: "bold",
    marginBottom: 3,
  },

  dangerContent: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
  },

  // Badges de sévérité
  severityBadge: {
    padding: "3 8",
    fontSize: 8,
    fontWeight: "bold",
    borderRadius: 10,
    textTransform: "uppercase",
    marginBottom: 5,
  },

  severityLow: {
    backgroundColor: COLORS.successBg,
    color: COLORS.successText,
  },

  severityMedium: {
    backgroundColor: COLORS.warningBg,
    color: COLORS.warningText,
  },

  severityHigh: {
    backgroundColor: COLORS.dangerBg,
    color: COLORS.dangerText,
  },

  // Cartes d'information
  infoCard: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  cardContent: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
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

  // Contrôle de pagination - Éviter les coupures indésirables
  avoidPageBreak: {
    breakInside: "avoid",
  },

  // Saut de page forcé
  forcePageBreak: {
    breakBefore: "always",
  },

  // Séparateur de section
  sectionSeparator: {
    height: 2,
    backgroundColor: COLORS.border,
    marginVertical: 15,
  },

  // Numéro de page
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 40,
    fontSize: 9,
    color: COLORS.textLight,
  },

  // Table des matières
  toc: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  tocTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tocItem: {
    fontSize: 10,
    marginBottom: 5,
    paddingLeft: 10,
    borderLeft: `2pt solid ${COLORS.border}`,
    lineHeight: 1.4,
  },

  tocSubitem: {
    fontSize: 9,
    marginBottom: 3,
    paddingLeft: 25,
    borderLeft: `1pt solid ${COLORS.border}`,
    lineHeight: 1.3,
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

  // Sections de pathologie avec bordures latérales
  asthmaSection: {
    borderLeft: `4pt solid #10b981`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#f0fdf4",
    borderRadius: 2,
  },

  bpcoSection: {
    borderLeft: `4pt solid #f59e0b`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#fffbeb",
    borderRadius: 2,
  },

  tbkSection: {
    borderLeft: `4pt solid #ef4444`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#fef2f2",
    borderRadius: 2,
  },

  sleepSection: {
    borderLeft: `4pt solid ${COLORS.sleepBorder}`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: COLORS.sleepBg,
    borderRadius: 2,
    ...baseStyles.avoidPageBreak,
  },

  lungCancerSection: {
    borderLeft: `4pt solid #ec4899`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#fdf2f8",
    borderRadius: 2,
  },

  ddbSection: {
    borderLeft: `4pt solid #3b82f6`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 2,
  },

  pidSection: {
    borderLeft: `4pt solid #f97316`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#fff7ed",
    borderRadius: 2,
  },

  pleuralEffusionSection: {
    borderLeft: `4pt solid #14b8a6`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#f0fdfa",
    borderRadius: 2,
  },

  pneumothoraxSection: {
    borderLeft: `4pt solid #6366f1`,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: "#eef2ff",
    borderRadius: 2,
  },
});

// Styles pour les images dans le PDF
/**
 * Styles pour l'affichage des images dans les documents PDF
 * Utilise les constantes A4_CONSTANTS pour les dimensions cohérentes
 */
export const imageStyles = StyleSheet.create({
  imageGrid: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
    ...baseStyles.avoidPageBreak,
  },
  imageContainer: {
    width: A4_CONSTANTS.contentWidth,
    height: A4_CONSTANTS.imageHeight16_9,
    marginRight: 0,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "solid",
    overflow: "hidden",
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  imageLabel: {
    fontSize: 9,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
});
