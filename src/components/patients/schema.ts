import { z } from "zod";
import { asthmaSchema } from "./forms/pathologies/asthma/schema";
import { bpcoSchema } from "./forms/pathologies/bpco/schema";
import { ddbSchema } from "./forms/pathologies/ddb/schema";
import { pidSchema } from "./forms/pathologies/pid/schema";
import { pleuralEffusionSchema } from "./forms/pathologies/pleuralEffusion/schema";
import { pneumothoraxSchema } from "./forms/pathologies/pneumothorax/schema";
import { sleepPathologySchema } from "./forms/pathologies/sleep/schema";
import { tbkSchema } from "./forms/pathologies/tbk/schema";
import { lungCancerSchema } from "./forms/pathologies/lungCancer/schema";

const zNullableNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}, z.number().nullable());

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

  // Examen clinique (commun à toutes les pathologies)
  clinicalExam: z
    .object({
      weight: zNullableNumber,
      height: zNullableNumber,
      bmi: zNullableNumber,
      neckCircumference: zNullableNumber,
      abdominalPerimeter: zNullableNumber,
      bloodPressure: z.string().optional(),
      heartRate: zNullableNumber,
      saturation: zNullableNumber,
      pulmonaryAuscultation: z.string().optional(),
    })
    .optional(),

  // Pathologies (mixins)
  ...sleepPathologySchema.shape,
  ...pleuralEffusionSchema.shape,
  ...pidSchema.shape,
  ...bpcoSchema.shape,
  ...asthmaSchema.shape,
  ...ddbSchema.shape,
  ...lungCancerSchema.shape,
  ...pneumothoraxSchema.shape,
  ...tbkSchema.shape,

  // Motif de consultation
  consultationReason: z.string().optional(),
  symptomsDuration: z.string().optional(),
  diurnalSymptoms: z
    .object({
      excessiveSleepiness: z.boolean().default(false),
      headaches: z.boolean().default(false),
      asthenia: z.boolean().default(false),
      showEpworth: z.boolean().default(false),
      epworthScore: z.number().optional(),
      epworthDetails: z.array(z.number()).default([]),
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

export type PatientFormData = z.infer<typeof patientSchema>;
