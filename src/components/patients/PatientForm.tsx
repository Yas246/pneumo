"use client";

import { Button } from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";
import { createPatient, updatePatient } from "@/lib/api";
import { CreatePatientData, Patient } from "@/types/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
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
  // État pour stocker les messages d'erreur de validation
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

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

    // Réinitialiser les erreurs précédentes
    setValidationErrors([]);

    // Tenter de valider avec le schéma patient
    let hasValidationErrors = false;
    const validationErrorMessages: string[] = [];

    try {
      const validPatientSchema = patientSchema.safeParse(data);
      if (!validPatientSchema.success) {
        hasValidationErrors = true;
        validPatientSchema.error.errors.forEach((err) => {
          validationErrorMessages.push(
            `Erreur au chemin ${err.path.join(".")}: ${err.message}`
          );
        });
      }
    } catch (err) {
      validationErrorMessages.push(
        `Erreur lors de la validation du schéma patient: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }

    // Vérifier spécifiquement le schéma PID si nécessaire
    if (pathologies.includes("pid")) {
      try {
        const { pidSchema } = await import("./forms/pathologies/pid/schema");

        // Extraire uniquement les champs liés au PID
        const pidData = Object.fromEntries(
          Object.entries(data).filter(([key]) => key.startsWith("pid"))
        );

        // Valider avec le schéma PID
        const validPidSchema = pidSchema.safeParse(pidData);
        if (!validPidSchema.success) {
          hasValidationErrors = true;
          validPidSchema.error.errors.forEach((err) => {
            validationErrorMessages.push(
              `Erreur PID au chemin ${err.path.join(".")}: ${err.message}`
            );
          });
        }
      } catch (err) {
        validationErrorMessages.push(
          `Erreur lors de la validation du schéma PID: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    // Si des erreurs de validation ont été trouvées, les afficher et arrêter
    if (hasValidationErrors) {
      setValidationErrors(validationErrorMessages);
      toast.error(
        "Des erreurs de validation ont été détectées. Voir détails ci-dessous."
      );
      return;
    }

    try {
      if (isEditing && initialData?.id) {
        await updatePatient(
          initialData.id,
          data as unknown as Partial<Patient>,
          user.uid
        );
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
          } as unknown as CreatePatientData,
          user.uid
        );
        toast.success("Patient créé avec succès");
        router.push("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      validationErrorMessages.push(
        `Erreur lors de la soumission: ${errorMessage}`
      );
      setValidationErrors(validationErrorMessages);
      toast.error(
        "Une erreur est survenue lors de la sauvegarde. Veuillez réessayer."
      );
    }
  };

  // Fonction de vérification sans soumission
  const checkValidation = async () => {
    const formData = getValues();
    setValidationErrors([]);

    const validationErrorMessages: string[] = [];

    // Vérifier les nombres qui sont encodés comme des chaînes
    const checkNumberFields = (
      obj: Record<string, unknown>,
      path = ""
    ): void => {
      if (!obj || typeof obj !== "object") return;

      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === "string") {
          // Vérifier si c'est un nombre stocké comme chaîne
          if (!isNaN(Number(value)) && value.trim() !== "") {
            validationErrorMessages.push(
              `Attention: Valeur numérique stockée comme chaîne à '${currentPath}': "${value}"`
            );
          }

          // Chaînes vides dans des champs qui pourraient être numériques
          if (
            value === "" &&
            (key.includes("number") ||
              key.includes("count") ||
              key.includes("age") ||
              key.includes("weight") ||
              key.includes("height") ||
              key.includes("temperature") ||
              key.includes("value"))
          ) {
            validationErrorMessages.push(
              `Attention: Chaîne vide dans un champ qui pourrait être numérique à '${currentPath}'`
            );
          }
        }

        // Vérifier récursivement les objets imbriqués
        if (value && typeof value === "object" && !Array.isArray(value)) {
          checkNumberFields(value as Record<string, unknown>, currentPath);
        }
      });
    };

    // Exécuter la vérification des nombres
    checkNumberFields(formData);

    // Valider avec le schéma patient
    try {
      const validPatientSchema = patientSchema.safeParse(formData);
      if (!validPatientSchema.success) {
        validPatientSchema.error.errors.forEach((err) => {
          validationErrorMessages.push(
            `Erreur au chemin ${err.path.join(".")}: ${err.message}`
          );
        });
      }
    } catch (err) {
      validationErrorMessages.push(
        `Erreur lors de la validation du schéma patient: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    }

    // Vérifier spécifiquement le schéma PID si nécessaire
    if (pathologies.includes("pid")) {
      try {
        const { pidSchema } = await import("./forms/pathologies/pid/schema");

        // Extraire uniquement les champs liés au PID
        const pidData = Object.fromEntries(
          Object.entries(formData).filter(([key]) => key.startsWith("pid"))
        );

        // Valider avec le schéma PID
        const validPidSchema = pidSchema.safeParse(pidData);
        if (!validPidSchema.success) {
          validPidSchema.error.errors.forEach((err) => {
            validationErrorMessages.push(
              `Erreur PID au chemin ${err.path.join(".")}: ${err.message}`
            );
          });
        }
      } catch (err) {
        validationErrorMessages.push(
          `Erreur lors de la validation du schéma PID: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    if (validationErrorMessages.length > 0) {
      setValidationErrors(validationErrorMessages);
      setShowDebugInfo(true);
      toast.error(
        "Des erreurs de validation ont été détectées. Voir détails ci-dessous."
      );
    } else {
      toast.success("Le formulaire est valide !");
    }
  };

  // Si ce n'est pas la pathologie sleep ou pleuralEffusion, afficher uniquement le message
  if (
    pathologies[0] !== "sleep" &&
    pathologies[0] !== "pleuralEffusion" &&
    pathologies[0] !== "pid"
  ) {
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
      {/* Afficher les erreurs de validation si présentes */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
          <h4 className="font-bold mb-2 flex items-center">
            <span className="mr-2">⚠️</span>
            Erreurs de validation détectées:
            <button
              type="button"
              className="ml-auto text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowDebugInfo(!showDebugInfo)}
            >
              {showDebugInfo ? "Masquer détails" : "Afficher détails"}
            </button>
          </h4>
          {showDebugInfo && (
            <ul className="list-disc pl-5 mt-2 text-sm">
              {validationErrors.map((error, index) => (
                <li key={index} className="mt-1">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Informations personnelles - commun à toutes les pathologies */}
      <PersonalInfoForm
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
        <Button
          type="button"
          variant="outline"
          onClick={checkValidation}
          disabled={isSubmitting}
        >
          Vérifier le formulaire
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
