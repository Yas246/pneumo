"use client";

import { Button } from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";
import { createPatient, updatePatient } from "@/lib/api";
import { CreatePatientData, Patient } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { ConsultationReasonForm } from "./forms/ConsultationReasonForm";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { PathologyFormSelector } from "./forms/pathologies/PathologyFormSelector";
import { patientSchema } from "./schema";

type PatientFormData = z.infer<typeof patientSchema> & {
  id?: string;
};

interface PatientFormProps {
  initialData?: PatientFormData;
  isEditing?: boolean;
  pathologies?: string[];
}

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
      ...initialData,
    }),
    [initialData, pathologies]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  const onSubmit = async (data: PatientFormData) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un patient");
      return;
    }

    try {
      if (isEditing && initialData?.id) {
        await updatePatient(initialData.id, data as Partial<Patient>, user.uid);
        toast.success("Patient mis à jour avec succès");
        router.push(`/patients/${initialData.id}`);
      } else {
        const now = new Date();
        await createPatient(
          {
            ...data,
            email: "",
            creatorId: user.uid,
            creatorRole: user.role,
            creatorName: user.displayName || "",
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

  // Si ce n'est pas la pathologie sleep, afficher uniquement le message
  if (pathologies[0] !== "sleep") {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Pas de formulaire
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informations personnelles - commun à toutes les pathologies */}
      <PersonalInfoForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />

      {/* Motif de consultation - commun à toutes les pathologies */}
      <ConsultationReasonForm
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />

      {/* Formulaire spécifique à la pathologie */}
      <PathologyFormSelector
        selectedPathologies={pathologies}
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />

      <div className="flex justify-end space-x-4">
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
