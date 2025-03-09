"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { deleteAppointment, getAppointment } from "@/firebase/appointments";
import { db } from "@/firebase/config";
import { getPatient } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import { Dialog } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface AppointmentDetails {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  notes?: string;
  createdBy: string;
  doctor?: {
    displayName: string;
    role: string;
  };
}

export default function AppointmentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(
    null
  );
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!params.id || typeof params.id !== "string") {
        toast.error("ID de rendez-vous invalide");
        router.push("/appointments");
        return;
      }

      try {
        const appointmentData = await getAppointment(params.id);
        if (!appointmentData) {
          toast.error("Rendez-vous non trouvé");
          router.push("/appointments");
          return;
        }

        const patient = await getPatient(appointmentData.patientId);
        if (!patient) {
          toast.error("Patient non trouvé");
          return;
        }

        // Récupérer les informations du médecin si disponibles
        let doctorInfo = undefined;
        if (appointmentData.createdBy) {
          const doctorDoc = await getDoc(
            doc(db, "users", appointmentData.createdBy)
          );
          if (doctorDoc.exists()) {
            const doctorData = doctorDoc.data();
            doctorInfo = {
              displayName: doctorData.displayName,
              role: doctorData.role,
            };
          }
        }

        setAppointment({
          ...appointmentData,
          id: params.id,
          patientName: `${patient.firstName} ${patient.lastName}`,
          doctor: doctorInfo,
        });
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement du rendez-vous");
      }
    };

    fetchAppointment();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour supprimer un rendez-vous");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAppointment(params.id as string, user.uid);
      toast.success("Rendez-vous supprimé avec succès");
      router.push("/appointments");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression du rendez-vous");
      setIsDeleting(false);
    }
  };

  if (!appointment) {
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

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Rendez-vous avec {appointment.patientName}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {format(
                  new Date(`${appointment.date}T${appointment.time}`),
                  "EEEE d MMMM yyyy 'à' HH:mm",
                  {
                    locale: fr,
                  }
                )}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/patients/${appointment.patientId}`}>
                <Button variant="outline">Voir le dossier patient</Button>
              </Link>
              <Link href={`/appointments/edit/${appointment.id}`}>
                <Button>
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Modifier
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Informations du rendez-vous
                </h3>
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {appointment.type}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Durée
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {appointment.duration} minutes
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Patient
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {appointment.patientName}
                    </dd>
                  </div>
                  {appointment.doctor && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Médecin
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {appointment.doctor.displayName}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          (
                          {appointment.doctor.role === "medecin"
                            ? "Médecin"
                            : appointment.doctor.role === "super-admin"
                            ? "Super Admin"
                            : appointment.doctor.role === "infirmier"
                            ? "Infirmier"
                            : ""}
                          )
                        </span>
                      </dd>
                    </div>
                  )}
                  {appointment.notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Notes
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                        {appointment.notes}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDeleteOpen(true)}
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              Supprimer le rendez-vous
            </Button>
          </div>

          {/* Modal de confirmation */}
          <Dialog
            open={isConfirmDeleteOpen}
            onClose={() => !isDeleting && setIsConfirmDeleteOpen(false)}
            className="relative z-50"
          >
            <div
              className="fixed inset-0 bg-black/30 dark:bg-black/50"
              aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                      Confirmer la suppression
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette
                      action est irréversible.
                    </Dialog.Description>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmDeleteOpen(false)}
                    className="w-full sm:w-auto"
                    disabled={isDeleting}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Suppression...
                      </>
                    ) : (
                      "Confirmer la suppression"
                    )}
                  </Button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
