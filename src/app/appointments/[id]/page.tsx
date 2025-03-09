"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { deleteAppointment, getAppointment } from "@/firebase/appointments";
import { db } from "@/firebase/config";
import { getPatient } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
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

    if (!params.id || typeof params.id !== "string") {
      toast.error("ID de rendez-vous invalide");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      try {
        await deleteAppointment(params.id, user.uid);
        toast.success("Rendez-vous supprimé avec succès");
        router.push("/appointments");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors de la suppression du rendez-vous");
      }
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
              onClick={handleDelete}
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              Supprimer le rendez-vous
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
