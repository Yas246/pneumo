import { FormSectionProps } from "../../types";
import { BiologyForm } from "./BiologyForm";
import { ChestXRayForm } from "./ChestXRayForm";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ConsultationReasonForm } from "./ConsultationReasonForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { EvolutionForm } from "./EvolutionForm";
import { ImagingForm } from "./ImagingForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { OtherAssessmentsForm } from "./OtherAssessmentsForm";
import { PleuralPunctureForm } from "./PleuralPunctureForm";
import { TreatmentForm } from "./TreatmentForm";

export function PleuralEffusionForm({
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
      <ChestXRayForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <ImagingForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <PleuralPunctureForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <BiologyForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <OtherAssessmentsForm
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
      <EvolutionForm
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
