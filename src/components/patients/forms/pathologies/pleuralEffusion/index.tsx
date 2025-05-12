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
}: FormSectionProps) {
  return (
    <>
      <ConsultationReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
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
      <ChestXRayForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <ImagingForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <PleuralPunctureForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <BiologyForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <OtherAssessmentsForm
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
      <EvolutionForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
    </>
  );
}
