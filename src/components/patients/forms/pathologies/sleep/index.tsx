import { FormSectionProps } from "../../types";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { ConsultationReasonForm } from "./ConsultationReasonForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { OrlExamForm } from "./OrlExamForm";
import { PPCFollowUpForm } from "./PPCFollowUpForm";
import { TreatmentForm } from "./TreatmentForm";

export function SleepPathologyForm({
  register,
  errors,
  getValues,
  setValue,
  watch,
  disabled,
}: FormSectionProps) {
  return (
    <>
      <ConsultationReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <MedicalHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <ClinicalExamForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <OrlExamForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <ComplementaryExamsForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <DiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <TreatmentForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <PPCFollowUpForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
    </>
  );
}
