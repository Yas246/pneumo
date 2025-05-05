import { FormSectionProps } from "../../types";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { PPCFollowUpForm } from "./PPCFollowUpForm";
import { TreatmentForm } from "./TreatmentForm";

export function SleepPathologyForm({
  register,
  errors,
  getValues,
  setValue,
  watch,
}: FormSectionProps) {
  return (
    <>
      <MedicalHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <ClinicalExamForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <ComplementaryExamsForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <DiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <TreatmentForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <PPCFollowUpForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
    </>
  );
}
