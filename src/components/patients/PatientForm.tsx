"use client";

import { Button } from "@/components/shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
//import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const patientSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  age: z
    .number()
    .min(0, "L'âge doit être positif")
    .max(150, "L'âge doit être inférieur à 150"),
  socialSecurity: z
    .string()
    .min(13, "Le numéro de sécurité sociale doit contenir 13 chiffres")
    .max(15),
  symptoms: z.array(z.string()),
  medicalHistory: z.string(),
  consultationReason: z.string(),
  medicalBackground: z.string(),
  clinicalExam: z.string(),
  diagnosis: z.string(),
  treatment: z.string(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  selectedPathologies: string[];
  initialData?: {
    firstName: string;
    lastName: string;
    age: number;
    socialSecurity: string;
    symptoms: string[];
    medicalHistory: string;
    consultationReason: string;
    medicalBackground: string;
    clinicalExam: string;
    diagnosis: string;
    treatment: string;
  };
  mode?: "create" | "edit";
  onSubmit: (data: PatientFormData) => void;
}

const commonSymptoms = [
  "Dyspnée",
  "Toux chronique",
  "Fièvre",
  "Douleurs thoraciques",
  "Expectorations",
  "Hémoptysie",
];

export function PatientForm({
  // selectedPathologies,
  initialData,
  mode = "create",
  onSubmit,
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData,
  });

  //  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
  //    initialData?.symptoms || []
  //  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Informations personnelles */}
      <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Informations personnelles
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nom
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Prénom
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Âge
            </label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
            {errors.age && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.age.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="socialSecurity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Numéro de sécurité sociale
            </label>
            <input
              type="text"
              {...register("socialSecurity")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
            {errors.socialSecurity && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.socialSecurity.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Symptômes */}
      <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Symptômes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {commonSymptoms.map((symptom) => (
            <label key={symptom} className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  value={symptom}
                  {...register("symptoms")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 transition-colors"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {symptom}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Observation médicale */}
      <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Observation médicale
        </h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="consultationReason"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Motif de consultation
            </label>
            <textarea
              {...register("consultationReason")}
              rows={4}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="medicalBackground"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Antécédents médicaux
            </label>
            <textarea
              {...register("medicalBackground")}
              rows={4}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Examen clinique
            </label>
            <textarea
              {...register("clinicalExam")}
              rows={4}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="diagnosis"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Diagnostic
            </label>
            <textarea
              {...register("diagnosis")}
              rows={4}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="treatment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Traitement et conduite à tenir
            </label>
            <textarea
              {...register("treatment")}
              rows={4}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          variant="secondary"
          type="button"
          onClick={() => window.history.back()}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {mode === "create" ? "Création..." : "Mise à jour..."}
            </>
          ) : mode === "create" ? (
            "Créer le dossier"
          ) : (
            "Mettre à jour le dossier"
          )}
        </Button>
      </div>
    </form>
  );
}
