import { FormSectionProps } from "../../types";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { ConsultationReasonForm } from "./ConsultationReasonForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { DiseaseHistoryForm } from "./DiseaseHistoryForm";
import { FollowUpForm } from "./FollowUpForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { TreatmentForm } from "./TreatmentForm";

export function BPCOForm({
  register,
  errors,
  getValues,
  setValue,
  watch,
}: FormSectionProps) {
  return (
    <div className="space-y-6">
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

      <DiseaseHistoryForm
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

      <FollowUpForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
}

// Export par défaut pour une meilleure compatibilité
export default BPCOForm;
