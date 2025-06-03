import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";
import { patientSchema } from "../schema";

type PatientFormData = z.infer<typeof patientSchema>;

export type FormSectionProps<T extends FieldValues = PatientFormData> = {
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  submitting?: boolean;
  disabled?: boolean;
};
