import { z } from "zod";
import { sleepPathologySchema } from "./forms/pathologies/sleep/schema";

// Schéma de base pour les informations communes à toutes les pathologies
const basePatientSchema = z.object({
  // Informations personnelles
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  sex: z.enum(["M", "F"]),
  address: z.string().min(1, "L'adresse est requise"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  profession: z.string().min(1, "La profession est requise"),
  treatingDoctor: z.string().min(1, "Le médecin traitant est requis"),
  socialSecurity: z.enum(["Aucun", "CNSS", "AMO", "Mutuelle", "Autre"]),
  status: z.enum(["active", "archived"]).default("active"),
  lastVisit: z.string().optional().default(""),
  pathologies: z
    .union([z.array(z.string()), z.record(z.string()), z.null(), z.undefined()])
    .transform((val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === "object") {
        return Object.values(val).filter((v) => typeof v === "string");
      }
      return [];
    })
    .default([]),

  // Motif de consultation
  consultationReason: z.string().default(""),
  diurnalSymptoms: z
    .object({
      excessiveSleepiness: z.boolean().default(false),
      headaches: z.boolean().default(false),
      asthenia: z.boolean().default(false),
      epworthScore: z.number().min(0).max(24).default(0),
      epworthDetails: z
        .union([
          z.array(z.number().min(0).max(3)),
          z.record(z.number().min(0).max(3)),
          z.null(),
          z.undefined(),
        ])
        .transform((val) => {
          if (!val) return Array(8).fill(0);
          if (Array.isArray(val)) return val.map((v) => Number(v) || 0);
          if (typeof val === "object") {
            return Array(8)
              .fill(0)
              .map((_, i) => Number(val[i]) || 0);
          }
          return Array(8).fill(0);
        })
        .default([0, 0, 0, 0, 0, 0, 0, 0]),
    })
    .default({
      excessiveSleepiness: false,
      headaches: false,
      asthenia: false,
      epworthScore: 0,
      epworthDetails: [0, 0, 0, 0, 0, 0, 0, 0],
    }),
  nocturnalSymptoms: z
    .object({
      snoring: z.boolean().default(false),
      sleepApnea: z.boolean().default(false),
      choking: z.boolean().default(false),
      agitation: z.boolean().default(false),
      insomnia: z.boolean().default(false),
      nocturia: z.boolean().default(false),
      other: z.string().optional(),
    })
    .default({}),
  symptomsDuration: z.string().default(""),
});

// Schéma complet qui inclut les champs spécifiques à la pathologie sleep
export const patientSchema = basePatientSchema.merge(sleepPathologySchema);
