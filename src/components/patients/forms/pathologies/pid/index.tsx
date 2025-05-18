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
}: FormSectionProps) {
  return (
    <>
      <AdmissionReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <ToxicHistoryForm
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
      <GynecoObstetricHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <LifestyleForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <FamilyHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <DiseaseHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <RespiratorySymptomsForms
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <ExtraRespiratorySymptomsForms
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <GeneralSignsForm
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
      <FinalDiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
    </>
  );
}
