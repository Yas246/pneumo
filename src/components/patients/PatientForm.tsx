"use client";

import { Button } from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";
import { createPatient, updatePatient } from "@/lib/api";
import { CreatePatientData, Patient } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  ClinicalExamForm,
  ComplementaryExamsForm,
  ConsultationReasonForm,
  DiagnosisForm,
  MedicalHistoryForm,
  PatientFormData,
  PersonalInfoForm,
  PPCFollowUpForm,
  TreatmentForm,
} from "./forms";
import { patientSchema } from "./schema";

interface PatientFormProps {
  initialData?: PatientFormData;
  isEditing?: boolean;
  pathologies?: string[];
}

const emptyPersonalHistory = {
  obesity: false,
  hta: false,
  orl: "",
  neuro: "",
  smoking: "",
  alcoholism: "",
  diabetes: "",
  cardiovascularDiseases: "",
  lifestyle: "",
  respiratoryPathology: "",
  currentMedications: "",
};

const emptyDiurnalSymptoms = {
  excessiveSleepiness: false,
  headaches: false,
  asthenia: false,
  epworthScore: 0,
};

const emptyNocturnalSymptoms = {
  snoring: false,
  sleepApnea: false,
  choking: false,
  agitation: false,
  insomnia: false,
  nocturia: false,
  other: "",
};

const emptyFamilyHistory = {
  saosHistory: false,
  respiratoryPathologies: false,
};

const emptyClinicalExam = {
  weight: undefined,
  height: undefined,
  bmi: undefined,
  neckCircumference: undefined,
  abdominalPerimeter: undefined,
  bloodPressure: "",
  heartRate: undefined,
  pulmonaryAuscultation: "",
};

const emptyDiagnosis = {
  saos: false,
  sacs: false,
  soh: false,
  nocturalHypoventilation: false,
  simpleSnoring: false,
};

const emptyTreatment = {
  hygieneDietetic: {
    weightLoss: false,
    alcoholAndSedativesStop: false,
    sleepHygieneImprovement: false,
  },
  medicalTreatments: {
    ppc: false,
    oam: false,
    medications: "",
  },
  surgicalTreatments: {
    orlSurgery: false,
    bariatricSurgery: false,
  },
};

const removeUndefinedValues = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> => {
  const result: Partial<T> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      if (typeof value === "object" && value !== null) {
        result[key as keyof T] = removeUndefinedValues(
          value as Record<string, unknown>
        ) as T[keyof T];
      } else {
        result[key as keyof T] = value as T[keyof T];
      }
    }
  });
  return result;
};

export function PatientForm({
  initialData,
  isEditing = false,
  pathologies = [],
}: PatientFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  // Mémoriser les valeurs par défaut pour éviter les recréations
  const defaultValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      birthDate: "",
      sex: "M" as const,
      address: "",
      phone: "",
      profession: "",
      treatingDoctor: "",
      socialSecurity: "Aucun" as const,
      status: "active" as const,
      lastVisit: "",
      pathologies,
      consultationReason: "",
      symptomsDuration: "",
      personalHistory: emptyPersonalHistory,
      diurnalSymptoms: emptyDiurnalSymptoms,
      nocturnalSymptoms: emptyNocturnalSymptoms,
      familyHistory: emptyFamilyHistory,
      clinicalExam: emptyClinicalExam,
      diagnosis: emptyDiagnosis,
      treatment: emptyTreatment,
      ...initialData,
    }),
    [initialData, pathologies]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  // Utiliser useRef pour suivre si c'est le premier rendu
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ne réinitialiser que lors du premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
      reset(defaultValues);
    }
  }, [reset, defaultValues]);

  const onSubmit = async (data: PatientFormData) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un patient");
      return;
    }

    try {
      console.log("Form data:", data);

      if (isEditing && initialData?.id) {
        const cleanedData = removeUndefinedValues(data);
        if (cleanedData.clinicalExam) {
          cleanedData.clinicalExam = Object.fromEntries(
            Object.entries(cleanedData.clinicalExam).filter(
              ([, v]) => v !== undefined
            )
          );
        }
        await updatePatient(
          initialData.id,
          cleanedData as Partial<Patient>,
          user.uid
        );
        toast.success("Patient mis à jour avec succès");
        router.push(`/patients/${initialData.id}`);
      } else {
        const now = new Date();
        await createPatient(
          {
            ...data,
            statusHistory: [{ status: data.status, date: now }],
            statusChangedAt: now,
          } as CreatePatientData,
          user.uid
        );
        toast.success("Patient créé avec succès");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error(
        "Une erreur est survenue lors de la sauvegarde. Veuillez réessayer."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PersonalInfoForm register={register} errors={errors} />
      <ConsultationReasonForm register={register} errors={errors} />
      <MedicalHistoryForm register={register} errors={errors} />
      <ClinicalExamForm register={register} errors={errors} />
      <ComplementaryExamsForm register={register} errors={errors} />
      <DiagnosisForm register={register} errors={errors} />
      <TreatmentForm register={register} errors={errors} />
      <PPCFollowUpForm register={register} errors={errors} />

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Enregistrement..."
            : isEditing
            ? "Mettre à jour"
            : "Créer"}
        </Button>
      </div>
    </form>
  );
}
