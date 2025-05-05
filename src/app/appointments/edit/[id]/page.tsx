"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { getAppointment, updateAppointment } from "@/firebase/appointments";
import { getPatient } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const appointmentSchema = z.object({
  date: z.string(),
  time: z.string(),
  duration: z.number().min(15).max(120),
  type: z.enum(["consultation", "suivi", "examen"]),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function EditAppointmentPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!params.id || typeof params.id !== "string") {
        toast.error("ID de rendez-vous invalide");
        router.push("/appointments");
        return;
      }

      try {
        const appointment = await getAppointment(params.id);
        if (!appointment) {
          toast.error("Rendez-vous non trouvé");
          router.push("/appointments");
          return;
        }

        const patient = await getPatient(appointment.patientId);
        if (patient) {
          setPatientName(`${patient.firstName} ${patient.lastName}`);
        }

        reset({
          date: appointment.date,
          time: appointment.time,
          duration: appointment.duration,
          type: appointment.type,
          notes: appointment.notes,
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement du rendez-vous");
        router.push("/appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [params.id, router, reset]);

  const onSubmit = async (data: AppointmentFormData) => {
    if (!user) {
      toast.error("Vous devez être connecté pour modifier un rendez-vous");
      return;
    }

    if (!params.id || typeof params.id !== "string") {
      toast.error("ID de rendez-vous invalide");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateAppointment(params.id, data, user.uid, user.role);
      toast.success("Rendez-vous modifié avec succès");
      router.push("/appointments");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erreur lors de la modification du rendez-vous");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/appointments/${params.id}`}
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour au rendez-vous
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Modifier le rendez-vous
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              avec {patientName}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      {...register("date")}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base px-4 py-3"
                    />
                    {errors.date && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Heure
                    </label>
                    <input
                      type="time"
                      {...register("time")}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base px-4 py-3"
                    />
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.time.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Durée
                    </label>
                    <select
                      {...register("duration", { valueAsNumber: true })}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base px-4 py-3"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 heure</option>
                    </select>
                    {errors.duration && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Type
                    </label>
                    <select
                      {...register("type")}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base px-4 py-3"
                    >
                      <option value="consultation">Consultation</option>
                      <option value="suivi">Suivi</option>
                      <option value="examen">Examen</option>
                    </select>
                    {errors.type && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Notes
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base px-4 py-3"
                      placeholder="Ajoutez des notes ou instructions particulières..."
                    />
                    {errors.notes && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.notes.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
