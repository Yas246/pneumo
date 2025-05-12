import { z } from "zod";
import { pleuralEffusionSchema } from "./forms/pathologies/pleuralEffusion/schema";
import { sleepPathologySchema } from "./forms/pathologies/sleep/schema";

// Common schema for all patients
export const patientSchema = z.object({
  // Informations personnelles
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  birthDate: z.string().min(1, "La date de naissance est requise"),
  sex: z.enum(["M", "F"]),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  profession: z.string().optional(),
  socialSecurity: z.string().optional(),
  treatingDoctor: z.string().optional(),
  status: z.enum(["active", "archived"]).default("active"),

  // Pathologies (mixins)
  ...sleepPathologySchema.shape,
  ...pleuralEffusionSchema.shape,

  // Motif de consultation
  consultationReason: z.string().optional(),
  symptomsDuration: z.string().optional(),
  diurnalSymptoms: z
    .object({
      excessiveSleepiness: z.boolean().default(false),
      headaches: z.boolean().default(false),
      asthenia: z.boolean().default(false),
      epworthScore: z.number().optional(),
      other: z.string().optional(),
    })
    .optional(),
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
    .optional(),

  // Reference to selected pathologies
  pathologies: z.array(z.string()).optional(),
});
