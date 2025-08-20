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

// Extended type for BPCO forms that includes diagnostic test fields
export type ExtendedPatientFormData = PatientFormData & {
  bpcoDiagnosticTests?: {
    spirometry?: {
      vems?: number | null;
      vemsCv?: number | null;
      goldStage?: number | null;
    };
    plethysmography?: {
      cpt?: number | null;
      vr?: number | null;
      crf?: number | null;
    };
    biology?: {
      cbc?: {
        done?: boolean;
        hemoglobin?: number | null;
        mcv?: number | null;
        whiteBloodCells?: number | null;
      };
      biochemistry?: {
        done?: boolean;
        creatinine?: number | null;
        ast?: number | null;
        alt?: number | null;
        crp?: number | null;
      };
    };
    microbiology?: {
      bkSputum?: string;
      ecbc?: string;
      pcr?: string;
    };
    bronchoscopy?: {
      findings?: string;
      bal?: string;
    };
    functionalAssessment?: {
      walkTest?: string;
      ecg?: string;
      echocardiography?: string;
    };
  };
};

export type FormSectionProps<T extends FieldValues = ExtendedPatientFormData> =
  {
    register: UseFormRegister<T>;
    getValues: UseFormGetValues<T>;
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    errors: FieldErrors<T>;
    submitting?: boolean;
    disabled?: boolean;
  };
