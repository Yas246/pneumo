"use client";

import { FormSectionProps } from "../../types";
import { ClinicalExamForm } from "./ClinicalExamForm";
import { ComplementaryExamsForm } from "./ComplementaryExamsForm";
import { ConsultationReasonForm } from "./ConsultationReasonForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { DiseaseHistoryForm } from "./DiseaseHistoryForm";
import { FollowUpForm } from "./FollowUpForm";
import { MedicalHistoryForm } from "./MedicalHistoryForm";
import { TreatmentDischargeForm } from "./TreatmentDischargeForm";
import { TreatmentForm } from "./TreatmentForm";

export function PneumothoraxForm({
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

      {/* III. Antécédents et facteurs de risque */}
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

      {/* V. Examen clinique */}
      <ClinicalExamForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VI. Examens paracliniques */}
      <ComplementaryExamsForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VII. Diagnostic */}
      <DiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VIII. Prise en charge (PEC) */}
      <TreatmentForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* IX. Surveillance évolutive */}
      <FollowUpForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* X. Traitement et ordonnance / consignes de sortie */}
      <TreatmentDischargeForm
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
