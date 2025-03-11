import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";
import { patientSchema } from "../schema";

type PatientFormData = z.infer<typeof patientSchema>;

export type FormSectionProps = {
  register: UseFormRegister<PatientFormData>;
  getValues: UseFormGetValues<PatientFormData>;
  setValue: UseFormSetValue<PatientFormData>;
  watch: UseFormWatch<PatientFormData>;
  errors: FieldErrors<PatientFormData>;
  submitting?: boolean;
};
