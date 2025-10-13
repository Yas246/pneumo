"use client";

import { FormSectionProps } from "../../types";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { ConsultationReasonForm } from "./ConsultationReasonForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { FollowUpForm } from "./FollowUpForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { TreatmentForm } from "./TreatmentForm";

export function TBKForm({
  register,
  errors,
  getValues,
  setValue,
  watch,
  disabled,
  submitting,
}: FormSectionProps) {
  return (
    <div className="space-y-8">
      {/* I. Motif d'hospitalisation */}
      <ConsultationReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* II. ATCD */}
      <MedicalHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* III. Clinique */}
      <ClinicalExamForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* IV. Paraclinique */}
      <ComplementaryExamsForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* V. Traitement prescrit */}
      <TreatmentForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VI. Évolution */}
      <FollowUpForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VII. Conclusion de sortie */}
      <DiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />
    </div>
  );
}

// Export par défaut pour une meilleure compatibilité
export default TBKForm;
