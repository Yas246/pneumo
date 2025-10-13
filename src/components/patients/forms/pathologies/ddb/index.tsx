"use client";

import { FormSectionProps } from "../../types";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { ConsultationReasonForm } from "./ConsultationReasonForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { DiseaseHistoryForm } from "./DiseaseHistoryForm";
import { FollowUpForm } from "./FollowUpForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { TreatmentForm } from "./TreatmentForm";

export function DDBForm({
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
      {/* II. Motif de consultation */}
      <ConsultationReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* III. Antécédents */}
      <MedicalHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* IV. Histoire de la maladie */}
      <DiseaseHistoryForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* V. Clinique */}
      <ClinicalExamForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VI. Examens complémentaires */}
      <ComplementaryExamsForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VII. Conclusion */}
      <DiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VIII. Étiologie retrouvée */}
      {/* TODO: Add EtiologyForm when needed */}

      {/* IX. Traitements envisagés */}
      <TreatmentForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* X. Suivi */}
      <FollowUpForm
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
export default DDBForm;
