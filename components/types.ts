import { Control } from 'react-hook-form';
import { z } from 'zod';

// Placeholder for the actual patient form data schema
export const patientFormSchema = z.object({
  // Define your patient form fields here
  // For example:
  // name: z.string().min(1, "Name is required"),
  // email: z.string().email("Invalid email address"),
  // age: z.number().min(0, "Age must be a positive number"),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;

export interface BaseInputProps {
  label: string;
  name: keyof PatientFormData; // Ensures name is a valid key of PatientFormData
  control: Control<PatientFormData>;
  disabled?: boolean;
  helperText?: string;
  required?: boolean;
  description?: string; // Optional description field
}

export interface OptionsInputProps extends BaseInputProps {
  options: { label:string; value: string | number | boolean }[];
}
