"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Données temporaires pour la démonstration
const TEMP_APPOINTMENT = {
  id: "1",
  patientId: "1",
  patientName: "Jean Dupont",
  date: "2024-03-15T14:30",
  duration: 30,
  type: "Consultation",
  notes: "Patient à suivre de près",
};

const appointmentSchema = z.object({
  date: z.string().min(1, "La date est requise"),
  duration: z.string().min(1, "La durée est requise"),
  type: z.string().min(1, "Le type est requis"),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function EditAppointmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dans une vraie application, nous ferions un appel API ici
  const appointment = TEMP_APPOINTMENT;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: appointment.date,
      duration: String(appointment.duration),
      type: appointment.type,
      notes: appointment.notes,
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implémenter la logique de mise à jour
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/appointments/${id}`);
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/appointments/${id}`}
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour au rendez-vous
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Modifier le rendez-vous avec {appointment.patientName}
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Date et heure
                  </label>
                  <input
                    type="datetime-local"
                    {...register("date")}
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Durée (minutes)
                  </label>
                  <select
                    {...register("duration")}
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 heure</option>
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.duration.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type de rendez-vous
                  </label>
                  <select
                    {...register("type")}
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Suivi">Suivi</option>
                    <option value="Urgence">Urgence</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Notes (optionnel)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => router.back()}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
