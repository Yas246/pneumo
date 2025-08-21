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

export function AsthmaForm({
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

      {/* VII. Classification de la gravité */}
      <DiagnosisForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* VIII. Traitement */}
      <TreatmentForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        disabled={disabled}
        submitting={submitting}
      />

      {/* IX. Suivi */}
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
