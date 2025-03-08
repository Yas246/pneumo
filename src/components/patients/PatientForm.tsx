"use client";

import { Button } from "@/components/shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const patientSchema = z.object({
  // Informations Générales du Patient
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  birthDate: z.string(),
  sex: z.enum(["M", "F"]),
  address: z.string(),
  phone: z.string(),
  profession: z.string(),
  treatingDoctor: z.string(),
  socialSecurity: z.enum(["CNSS", "AMO", "Mutuelle", "Aucun", "Autre"]),

  // Motif de Consultation
  consultationReason: z.string(),
  diurnalSymptoms: z.object({
    excessiveSleepiness: z.boolean(),
    headaches: z.boolean(),
    asthenia: z.boolean(),
    epworthScore: z.number().min(0).max(24),
  }),
  nocturnalSymptoms: z.object({
    snoring: z.boolean(),
    sleepApnea: z.boolean(),
    choking: z.boolean(),
    agitation: z.boolean(),
    insomnia: z.boolean(),
    nocturia: z.boolean(),
    other: z.string().optional(),
  }),
  symptomsDuration: z.string(),

  // ATCD + FDR
  personalHistory: z.object({
    obesity: z.boolean(),
    hta: z.boolean(),
    orl: z.string().optional(),
    neuro: z.string().optional(),
    smoking: z.string().optional(),
    alcoholism: z.string().optional(),
    diabetes: z.string().optional(),
    cardiovascularDiseases: z.string().optional(),
    lifestyle: z.string().optional(),
    respiratoryPathology: z.string().optional(),
    currentMedications: z.string().optional(),
  }),
  familyHistory: z.object({
    saosHistory: z.boolean(),
    respiratoryPathologies: z.boolean(),
  }),

  // Examen Clinique
  clinicalExam: z.object({
    weight: z.number(),
    height: z.number(),
    bmi: z.number(),
    neckCircumference: z.number(),
    abdominalPerimeter: z.number(),
    bloodPressure: z.string(),
    heartRate: z.number(),
    pulmonaryAuscultation: z.string(),
  }),
  orlExam: z.object({
    vasAnatomy: z.string(),
    nasalObstruction: z.boolean(),
    amygdalineHypertrophy: z.boolean(),
    retrognathia: z.boolean(),
    micromandible: z.boolean(),
    macroglossia: z.boolean(),
  }),

  // Examens Complémentaires
  complementaryExams: z.object({
    ventilationPolygraphy: z.boolean(),
    psg: z.boolean(),
    tensionalHolter: z.boolean(),
    metabolicAssessment: z.object({
      uricAcid: z.number().optional(),
      lipidProfile: z.object({
        totalCholesterol: z.number().optional(),
        hdl: z.number().optional(),
        ldl: z.number().optional(),
        triglycerides: z.number().optional(),
      }),
      tsh: z.number().optional(),
      hba1c: z.number().optional(),
      got: z.number().optional(),
    }),
    nightOximetry: z.boolean(),
    morningBloodGas: z.object({
      ph: z.number().optional(),
      pao2: z.number().optional(),
      paco2: z.number().optional(),
      hco3: z.number().optional(),
    }),
    spirometry: z.object({
      cvf: z.number().optional(),
      vems: z.number().optional(),
      vemsOverCvf: z.number().optional(),
    }),
    imaging: z.object({
      chestXray: z.boolean(),
      orlScan: z.boolean(),
    }),
  }),

  // Diagnostic Principal
  diagnosis: z.object({
    saos: z.boolean(),
    sacs: z.boolean(),
    soh: z.boolean(),
    nocturalHypoventilation: z.boolean(),
    simpleSnoring: z.boolean(),
  }),

  // Plan de Traitement
  treatment: z.object({
    hygieneDietetic: z.object({
      weightLoss: z.boolean(),
      alcoholAndSedativesStop: z.boolean(),
      sleepHygieneImprovement: z.boolean(),
    }),
    medicalTreatments: z.object({
      ppc: z.boolean(),
      oam: z.boolean(),
      medications: z.string().optional(),
    }),
    surgicalTreatments: z.object({
      orlSurgery: z.boolean(),
      bariatricSurgery: z.boolean(),
    }),
  }),

  // PPC Follow-up
  ppcFollowUp: z.object({
    ppcPrescribingDoctor: z.string(),
    ppcStartDate: z.string(),
    deviceModel: z.string(),
    deviceSupplier: z.string(),
    initialPressure: z.number(),
    ventilationMode: z.enum(["AutoPAP", "CPAP fixe", "BiPAP"]),
    humidifier: z.boolean(),
    maskType: z.string(),
    otherAccessories: z.string().optional(),
  }),

  status: z.enum(["active", "archived"]),
  lastVisit: z.string(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  mode?: "create" | "edit";
  onSubmit: (data: PatientFormData) => void;
}

export function PatientForm({
  initialData,
  mode = "create",
  onSubmit,
}: PatientFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData,
  });

  return (
    <>
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
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date de naissance
              </label>
              <input
                type="date"
                {...register("birthDate")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sexe
              </label>
              <select
                {...register("sex")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              >
                <option value="">Sélectionnez le sexe</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Adresse
              </label>
              <input
                type="text"
                {...register("address")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Téléphone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Profession
              </label>
              <input
                type="text"
                {...register("profession")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="treatingDoctor"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Médecin traitant
              </label>
              <input
                type="text"
                {...register("treatingDoctor")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="socialSecurity"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Couverture Sociale
              </label>
              <select
                {...register("socialSecurity")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              >
                <option value="">Sélectionnez une couverture sociale</option>
                <option value="CNSS">CNSS</option>
                <option value="AMO">AMO</option>
                <option value="Mutuelle">Mutuelle</option>
                <option value="Aucun">Aucun</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>
        </div>
        {errors.socialSecurity && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.socialSecurity.message}
          </p>
        )}

        <div className="space-y-2">
          <label
            htmlFor="lastVisit"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date de dernière visite
          </label>
          <input
            type="date"
            {...register("lastVisit")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
          {errors.lastVisit && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.lastVisit.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Statut du dossier
          </label>
          <select
            {...register("status")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          >
            <option value="active">Actif</option>
            <option value="archived">Archivé</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Motif de Consultation
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="consultationReason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Motif principal
              </label>
              <textarea
                {...register("consultationReason")}
                rows={4}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            {/* Symptômes diurnes */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Symptômes diurnes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("diurnalSymptoms.excessiveSleepiness")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Somnolence diurne excessive
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("diurnalSymptoms.headaches")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Céphalées
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("diurnalSymptoms.asthenia")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Asthénie
                    </span>
                  </div>
                </label>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="epworthScore"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Score d&apos;Epworth
                </label>
                <input
                  type="number"
                  {...register("diurnalSymptoms.epworthScore", {
                    valueAsNumber: true,
                  })}
                  min="0"
                  max="24"
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>
            </div>

            {/* Symptômes nocturnes */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Symptômes nocturnes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("nocturnalSymptoms.snoring")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Ronflements
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("nocturnalSymptoms.sleepApnea")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Apnées nocturnes
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("nocturnalSymptoms.choking")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Étouffement/Suffocation
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("nocturnalSymptoms.agitation")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Agitation
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("nocturnalSymptoms.insomnia")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Insomnie
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("nocturnalSymptoms.nocturia")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Nycturie
                    </span>
                  </div>
                </label>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="nocturnalSymptomsOther"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Autres symptômes nocturnes
                </label>
                <input
                  type="text"
                  {...register("nocturnalSymptoms.other")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="symptomsDuration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Durée des symptômes
              </label>
              <input
                type="text"
                {...register("symptomsDuration")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ATCD + FDR */}
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Antécédents et Facteurs de Risque
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Antécédents personnels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("personalHistory.obesity")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Obésité
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("personalHistory.hta")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      HTA
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.orl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ORL
                </label>
                <input
                  type="text"
                  {...register("personalHistory.orl")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.neuro"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Neuro
                </label>
                <input
                  type="text"
                  {...register("personalHistory.neuro")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.smoking"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Tabagisme
                </label>
                <input
                  type="text"
                  {...register("personalHistory.smoking")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.alcoholism"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Alcoolisme
                </label>
                <input
                  type="text"
                  {...register("personalHistory.alcoholism")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.diabetes"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Diabète
                </label>
                <input
                  type="text"
                  {...register("personalHistory.diabetes")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.cardiovascularDiseases"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Maladies cardiovasculaires
                </label>
                <input
                  type="text"
                  {...register("personalHistory.cardiovascularDiseases")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.lifestyle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mode de vie
                </label>
                <input
                  type="text"
                  {...register("personalHistory.lifestyle")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.respiratoryPathology"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Pathologie respiratoire
                </label>
                <input
                  type="text"
                  {...register("personalHistory.respiratoryPathology")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="personalHistory.currentMedications"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Médicaments en cours
                </label>
                <input
                  type="text"
                  {...register("personalHistory.currentMedications")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>
            </div>

            {/* Antécédents familiaux */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Antécédents familiaux
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("familyHistory.saosHistory")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Antécédents de SAOS
                    </span>
                  </div>
                </label>
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("familyHistory.respiratoryPathologies")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Pathologies respiratoires
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Examen Clinique */}
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Examen Clinique
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Mesures
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.weight"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Poids (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("clinicalExam.weight", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.height"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Taille (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("clinicalExam.height", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.bmi"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    IMC
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("clinicalExam.bmi", { valueAsNumber: true })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.neckCircumference"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tour de cou (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("clinicalExam.neckCircumference", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.abdominalPerimeter"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Périmètre abdominal (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("clinicalExam.abdominalPerimeter", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.bloodPressure"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tension artérielle
                  </label>
                  <input
                    type="text"
                    {...register("clinicalExam.bloodPressure")}
                    placeholder="ex: 120/80"
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="clinicalExam.heartRate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Fréquence cardiaque
                  </label>
                  <input
                    type="number"
                    {...register("clinicalExam.heartRate", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.pulmonaryAuscultation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Auscultation pulmonaire
              </label>
              <textarea
                {...register("clinicalExam.pulmonaryAuscultation")}
                rows={3}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            {/* Examen ORL */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Examen ORL
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="orlExam.vasAnatomy"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Morphologie des VAS
                  </label>
                  <input
                    type="text"
                    {...register("orlExam.vasAnatomy")}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("orlExam.nasalObstruction")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Obstruction nasale
                      </span>
                    </div>
                  </label>

                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("orlExam.amygdalineHypertrophy")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Hypertrophie amygdalienne
                      </span>
                    </div>
                  </label>

                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("orlExam.retrognathia")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Rétrognathie
                      </span>
                    </div>
                  </label>

                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("orlExam.micromandible")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Micromandibule
                      </span>
                    </div>
                  </label>

                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("orlExam.macroglossia")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        Macroglossie
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Examens Complémentaires */}
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Examens Complémentaires
          </h3>
          <div className="space-y-6">
            {/* Examens de base */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("complementaryExams.ventilationPolygraphy")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Polygraphie ventilatoire
                  </span>
                </div>
              </label>

              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("complementaryExams.psg")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">PSG</span>
                </div>
              </label>

              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("complementaryExams.tensionalHolter")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Holter tensionnel
                  </span>
                </div>
              </label>
            </div>

            {/* Bilan métabolique */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Bilan métabolique
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.uricAcid"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Acide urique
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "complementaryExams.metabolicAssessment.uricAcid",
                      {
                        valueAsNumber: true,
                      }
                    )}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.lipidProfile.totalCholesterol"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Cholestérol total
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "complementaryExams.metabolicAssessment.lipidProfile.totalCholesterol",
                      { valueAsNumber: true }
                    )}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.lipidProfile.hdl"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    HDL
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "complementaryExams.metabolicAssessment.lipidProfile.hdl",
                      { valueAsNumber: true }
                    )}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.lipidProfile.ldl"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    LDL
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "complementaryExams.metabolicAssessment.lipidProfile.ldl",
                      { valueAsNumber: true }
                    )}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.lipidProfile.triglycerides"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Triglycérides
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "complementaryExams.metabolicAssessment.lipidProfile.triglycerides",
                      { valueAsNumber: true }
                    )}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.tsh"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    TSH
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("complementaryExams.metabolicAssessment.tsh", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.hba1c"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    HbA1c
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(
                      "complementaryExams.metabolicAssessment.hba1c",
                      {
                        valueAsNumber: true,
                      }
                    )}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.metabolicAssessment.got"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    GOT
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("complementaryExams.metabolicAssessment.got", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Oxymétrie et gaz du sang */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("complementaryExams.nightOximetry")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Oxymétrie nocturne
                    </span>
                  </div>
                </label>
              </div>

              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Gaz du sang matinal
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.morningBloodGas.ph"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    pH
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("complementaryExams.morningBloodGas.ph", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.morningBloodGas.pao2"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    PaO2 (mmHg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("complementaryExams.morningBloodGas.pao2", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.morningBloodGas.paco2"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    PaCO2 (mmHg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("complementaryExams.morningBloodGas.paco2", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.morningBloodGas.hco3"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    HCO3-
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("complementaryExams.morningBloodGas.hco3", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Spirométrie */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Spirométrie
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.spirometry.cvf"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    CVF (L)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("complementaryExams.spirometry.cvf", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.spirometry.vems"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    VEMS (L)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("complementaryExams.spirometry.vems", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.spirometry.vemsOverCvf"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    VEMS/CVF (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("complementaryExams.spirometry.vemsOverCvf", {
                      valueAsNumber: true,
                    })}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Imagerie */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Imagerie
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("complementaryExams.imaging.chestXray")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Rx thoracique
                    </span>
                  </div>
                </label>

                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("complementaryExams.imaging.orlScan")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Scanner ORL
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Principal */}
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Diagnostic Principal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diagnosis.saos")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">SAOS</span>
              </div>
            </label>

            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diagnosis.sacs")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">SACS</span>
              </div>
            </label>

            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diagnosis.soh")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">SOH</span>
              </div>
            </label>

            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diagnosis.nocturalHypoventilation")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Hypoventilation nocturne
                </span>
              </div>
            </label>

            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diagnosis.simpleSnoring")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Ronflement simple
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Plan de Traitement */}
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Plan de Traitement
          </h3>
          <div className="space-y-6">
            {/* Mesures hygiéno-diététiques */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Mesures hygiéno-diététiques
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("treatment.hygieneDietetic.weightLoss")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Perte de poids
                    </span>
                  </div>
                </label>

                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register(
                        "treatment.hygieneDietetic.alcoholAndSedativesStop"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Arrêt alcool et sédatifs
                    </span>
                  </div>
                </label>

                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register(
                        "treatment.hygieneDietetic.sleepHygieneImprovement"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Amélioration hygiène du sommeil
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Traitements médicaux */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Traitements médicaux
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("treatment.medicalTreatments.ppc")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        PPC
                      </span>
                    </div>
                  </label>

                  <label className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        {...register("treatment.medicalTreatments.oam")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        OAM
                      </span>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="treatment.medicalTreatments.medications"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Médicaments
                  </label>
                  <input
                    type="text"
                    {...register("treatment.medicalTreatments.medications")}
                    className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Traitements chirurgicaux */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Traitements chirurgicaux
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register("treatment.surgicalTreatments.orlSurgery")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Chirurgie ORL
                    </span>
                  </div>
                </label>

                <label className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      {...register(
                        "treatment.surgicalTreatments.bariatricSurgery"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      Chirurgie bariatrique
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Suivi PPC
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.ppcPrescribingDoctor"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Médecin prescripteur PPC
                </label>
                <input
                  type="text"
                  {...register("ppcFollowUp.ppcPrescribingDoctor")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.ppcStartDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Date de mise en place PPC
                </label>
                <input
                  type="date"
                  {...register("ppcFollowUp.ppcStartDate")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.deviceModel"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Modèle et référence de l&apos;appareil
                </label>
                <input
                  type="text"
                  {...register("ppcFollowUp.deviceModel")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.deviceSupplier"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Fournisseur du dispositif
                </label>
                <input
                  type="text"
                  {...register("ppcFollowUp.deviceSupplier")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.initialPressure"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Pression initiale prescrite
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("ppcFollowUp.initialPressure", {
                    valueAsNumber: true,
                  })}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.ventilationMode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mode de ventilation
                </label>
                <select
                  {...register("ppcFollowUp.ventilationMode")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                >
                  <option value="">Sélectionnez un mode</option>
                  <option value="AutoPAP">AutoPAP</option>
                  <option value="CPAP fixe">CPAP fixe</option>
                  <option value="BiPAP">BiPAP</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.humidifier"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Humidificateur
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("ppcFollowUp.humidifier")}
                      value="true"
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Oui
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("ppcFollowUp.humidifier")}
                      value="false"
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Non
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.maskType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Masque utilisé
                </label>
                <input
                  type="text"
                  {...register("ppcFollowUp.maskType")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ppcFollowUp.otherAccessories"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Autres accessoires
                </label>
                <input
                  type="text"
                  {...register("ppcFollowUp.otherAccessories")}
                  className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
                />
              </div>
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
    </>
  );
}
