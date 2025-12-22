import { FormSectionProps } from "../../types";
import { AdmissionReasonForm } from "./AdmissionReasonForm";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { DiseaseHistoryForm } from "./DiseaseHistoryForm";
import { ExtraRespiratorySymptomsForms } from "./ExtraRespiratorySymptomsForms";
import { FamilyHistoryForm } from "./FamilyHistoryForm";
import { FinalDiagnosisForm } from "./FinalDiagnosisForm";
import { GeneralSignsForm } from "./GeneralSignsForm";
import { GynecoObstetricHistoryForm } from "./GynecoObstetricHistoryForm";
import { LifestyleForm } from "./LifestyleForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { RespiratorySymptomsForms } from "./RespiratorySymptomsForms";
import { ToxicHistoryForm } from "./ToxicHistoryForm";

export function PIDForm({
  register,
  errors,
  getValues,
  setValue,
  watch,
  disabled,
}: FormSectionProps) {
  return (
    <>
      <AdmissionReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <ToxicHistoryForm
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
      <GynecoObstetricHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <LifestyleForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <FamilyHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <DiseaseHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <RespiratorySymptomsForms
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <ExtraRespiratorySymptomsForms
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <GeneralSignsForm
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
      <ComplementaryExamsForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
      />
      <FinalDiagnosisForm
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
