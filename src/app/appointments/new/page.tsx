"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { createAppointment, getDoctors } from "@/firebase/appointments";
import { searchPatients } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { Patient } from "@/types/patient";
import { UserData } from "@/types/user";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Veuillez sélectionner un patient"),
  date: z.string().min(1, "Veuillez sélectionner une date"),
  time: z.string().min(1, "Veuillez sélectionner une heure"),
  duration: z.number().min(15, "La durée minimum est de 15 minutes"),
  type: z.enum(["consultation", "suivi", "examen"]),
  notes: z.string().optional(),
  doctorId: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

function NewAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [doctors, setDoctors] = useState<UserData[]>([]);
  const {
    canCreateAppointment,
    canAssignDoctor,
    loading: permissionsLoading,
  } = usePermissions();
  const { user } = useAuth();

  const patientId = searchParams.get("patientId");
  const patientName = searchParams.get("patientName");
  const diagnosis = searchParams.get("diagnosis");

  useEffect(() => {
    if (!permissionsLoading && !canCreateAppointment) {
      toast.error("Vous n'avez pas les permissions nécessaires");
      router.push("/appointments");
    }
  }, [canCreateAppointment, permissionsLoading, router]);

  useEffect(() => {
    const searchPatientsDebounced = async () => {
      if (searchTerm.length >= 2) {
        try {
          const results = await searchPatients(searchTerm);
          setPatients(results);
        } catch (error) {
          console.error("Erreur lors de la recherche des patients:", error);
        }
      } else {
        setPatients([]);
      }
    };

    const timeoutId = setTimeout(searchPatientsDebounced, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (canAssignDoctor) {
        try {
          const doctorsList = await getDoctors();
          setDoctors(doctorsList);
        } catch (error) {
          console.error("Erreur lors de la récupération des médecins:", error);
        }
      }
    };

    fetchDoctors();
  }, [canAssignDoctor]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: patientId || "",
      duration: 30,
      type: "consultation",
    },
  });

  const onSubmit = async (
    data: AppointmentFormData & { doctorId?: string }
  ) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un rendez-vous");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!selectedPatient || !selectedPatient.id) {
        throw new Error("Patient non sélectionné");
      }

      // Si un médecin est sélectionné, utiliser ses informations
      let doctorId = user.uid;
      let doctorRole = user.role;
      let doctorName = user.displayName || "";

      if (canAssignDoctor && data.doctorId) {
        const selectedDoctor = doctors.find((d) => d.uid === data.doctorId);
        if (selectedDoctor) {
          doctorId = selectedDoctor.uid;
          doctorRole = selectedDoctor.role;
          doctorName = selectedDoctor.displayName;
        }
      }

      const appointmentData = {
        ...data,
        status: "scheduled" as const,
        patient: {
          id: selectedPatient.id,
          firstName: selectedPatient.firstName,
          lastName: selectedPatient.lastName,
          email: selectedPatient.email || "",
          phone: selectedPatient.phone || "",
          birthDate: selectedPatient.birthDate,
        },
        creatorId: doctorId,
        creatorRole: doctorRole,
        creatorName: doctorName,
      };
      await createAppointment(appointmentData, doctorId, doctorRole);
      toast.success("Rendez-vous créé avec succès");
      router.push("/appointments");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erreur lors de la création du rendez-vous");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (permissionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!canCreateAppointment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/appointments"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Retour au calendrier
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Nouveau rendez-vous
          </h1>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Sélection du patient */}
              <div className="w-full">
                <label
                  htmlFor="patientId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Patient
                </label>
                {!selectedPatient && !patientId && (
                  <input
                    type="text"
                    placeholder="Rechercher un patient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full px-4 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white rounded-lg mb-2"
                  />
                )}
                {!selectedPatient && !patientId && patients.length > 0 && (
                  <div className="mt-2 max-h-48 overflow-auto rounded-md border border-gray-300 dark:border-gray-600">
                    {patients.map((patient) => (
                      <button
                        key={patient.id}
                        type="button"
                        onClick={() => {
                          if (patient.id) {
                            setValue("patientId", patient.id);
                            setSelectedPatient(patient);
                            setSearchTerm("");
                            setPatients([]);
                          }
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {patient.firstName} {patient.lastName}
                      </button>
                    ))}
                  </div>
                )}
                {selectedPatient && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Patient sélectionné : {selectedPatient.firstName}{" "}
                      {selectedPatient.lastName}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPatient(null);
                        setValue("patientId", "");
                      }}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      Changer
                    </button>
                  </div>
                )}
                {patientId && patientName && !selectedPatient && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Patient sélectionné : {patientName}
                    {diagnosis && ` - ${diagnosis}`}
                  </p>
                )}
                {errors.patientId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.patientId.message}
                  </p>
                )}
              </div>

              {/* Date et heure */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    {...register("date")}
                    className="block w-full px-4 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base py-2.5"
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
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
                    id="time"
                    {...register("time")}
                    className="block w-full px-4 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base py-2.5"
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Type et durée */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Type de rendez-vous
                  </label>
                  <select
                    id="type"
                    {...register("type")}
                    className="block w-full px-2 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white rounded-lg"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="suivi">Suivi</option>
                    <option value="examen">Examen</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Durée (minutes)
                  </label>
                  <select
                    id="duration"
                    {...register("duration", { valueAsNumber: true })}
                    className="block w-full px-4 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white rounded-lg"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 heure</option>
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Sélection du médecin (visible uniquement pour super-admin, chef-service, prof) */}
              {canAssignDoctor && (
                <div>
                  <label
                    htmlFor="doctorId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Médecin traitant
                  </label>
                  <select
                    id="doctorId"
                    {...register("doctorId")}
                    className="block w-full px-4 py-2.5 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white rounded-lg"
                  >
                    <option value="">Sélectionner un médecin...</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.uid} value={doctor.uid}>
                        {doctor.displayName} (
                        {doctor.role === "medecin"
                          ? "Médecin"
                          : doctor.role === "chef-service"
                          ? "Chef de service"
                          : doctor.role === "prof"
                          ? "Professeur"
                          : doctor.role === "resident"
                          ? "Résident"
                          : doctor.role}
                        )
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Laissez vide pour vous assigner ce rendez-vous
                  </p>
                </div>
              )}

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Notes (optionnel)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  {...register("notes")}
                  className="block w-full px-4 py-2.5 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-base"
                  placeholder="Ajoutez des notes ou instructions particulières..."
                />
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => router.back()}
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
                      Création...
                    </>
                  ) : (
                    "Créer le rendez-vous"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function NewAppointmentPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <NewAppointmentContent />
    </Suspense>
  );
}
