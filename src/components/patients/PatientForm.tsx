"use client";

import { Button } from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";
import { createPatient, updatePatient } from "@/lib/api";
import { CreatePatientData, Patient } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import {
  ClinicalExamForm,
  ComplementaryExamsForm,
  ConsultationReasonForm,
  DiagnosisForm,
  MedicalHistoryForm,
  PersonalInfoForm,
  PPCFollowUpForm,
  TreatmentForm,
} from "./forms";
import { patientSchema } from "./schema";

type PatientFormData = z.infer<typeof patientSchema> & {
  id?: string;
};

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
  weight: 0,
  height: 0,
  bmi: 0,
  neckCircumference: 0,
  abdominalPerimeter: 0,
  bloodPressure: "",
  heartRate: 0,
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

const emptyComplementaryExams = {
  ventilationPolygraphy: false,
  psg: false,
  tensionalHolter: false,
  nightOximetry: false,
  imaging: {
    chestXray: false,
    orlScan: false,
  },
  // Polygraphie
  polygraphyDate: "",
  iah: 0,
  iahCentral: 0,
  oxygenDesaturation: 0,
  ct90: 0,
  // Gazométrie
  gazometryDate: "",
  ph: 0,
  pao2: 0,
  paco2: 0,
  hco3: 0,
  sao2: 0,
  // EFR
  efrDate: "",
  cvf: 0,
  vems: 0,
  dlco: 0,
  cpt: 0,
  // Autres
  otherExams: "",
};

const emptyPPCFollowUp = {
  ppcPrescribingDoctor: "",
  ppcStartDate: "",
  deviceModel: "",
  deviceSupplier: "",
  initialPressure: 0,
  ventilationMode: "CPAP" as const,
  humidifier: false,
  maskType: "",
  maskModel: "",
  maskSize: "",
  serialNumber: "",
  provider: "",
  otherAccessories: "",
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
      // Champs obligatoires (informations personnelles)
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

      // Champs optionnels
      lastVisit: "",
      pathologies: pathologies || [],
      consultationReason: "",
      symptomsDuration: "",
      personalHistory: emptyPersonalHistory,
      diurnalSymptoms: emptyDiurnalSymptoms,
      nocturnalSymptoms: emptyNocturnalSymptoms,
      familyHistory: emptyFamilyHistory,
      clinicalExam: emptyClinicalExam,
      diagnosis: emptyDiagnosis,
      treatment: emptyTreatment,
      complementaryExams: emptyComplementaryExams,
      ppcFollowUp: emptyPPCFollowUp,
      ...initialData,
    }),
    [initialData, pathologies]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    getValues,
    watch,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  // Surveiller les changements de poids et taille
  const weight = useWatch({
    control,
    name: "clinicalExam.weight",
  });

  const height = useWatch({
    control,
    name: "clinicalExam.height",
  });

  // Calculer et mettre à jour l'IMC lorsque le poids ou la taille change
  useEffect(() => {
    if (weight && height) {
      // Convertir la taille en mètres si elle est en cm
      const heightInMeters = height > 3 ? height / 100 : height;
      // Calculer l'IMC : poids / (taille en mètres)²
      const bmi = Number(
        (weight / (heightInMeters * heightInMeters)).toFixed(1)
      );
      setValue("clinicalExam.bmi", bmi);
    }
  }, [weight, height, setValue]);

  // Utiliser useRef pour suivre si c'est le premier rendu
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ne réinitialiser que lors du premier rendu
    if (isFirstRender.current) {
      isFirstRender.current = false;
      reset(defaultValues);
    }
  }, [reset, defaultValues]);

  // Log form errors whenever they change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
    }
  }, [errors]);

  const onSubmit = async (data: PatientFormData) => {
    console.log("Form submission started");

    if (!user) {
      toast.error("Vous devez être connecté pour créer un patient");
      return;
    }

    try {
      console.log("Starting validation...");
      console.log("Data to validate:", JSON.stringify(data, null, 2));

      // Vérifier les valeurs de epworthDetails
      console.log("Epworth details:", data.diurnalSymptoms?.epworthDetails);

      // Validation debug avec plus de détails
      const result = patientSchema.safeParse(data);
      if (!result.success) {
        console.error("❌ Validation failed");
        console.error(
          "Validation errors:",
          JSON.stringify(result.error.format(), null, 2)
        );
        toast.error(
          "Erreur de validation des données. Vérifiez la console pour plus de détails."
        );
        return;
      }

      console.log("✅ Validation passed");
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
      <PersonalInfoForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
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
      <PPCFollowUpForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />

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
