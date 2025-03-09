import { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { patientSchema } from "../schema";

export type PatientFormData = z.infer<typeof patientSchema> & {
  id?: string;
};

export interface FormSectionProps {
  register: UseFormRegister<PatientFormData>;
  errors: FieldErrors<PatientFormData>;
  submitting?: boolean;
}
