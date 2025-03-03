"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Données temporaires pour la démonstration
const TEMP_APPOINTMENT = {
  id: "1",
  patientId: "1",
  patientName: "Jean Dupont",
  date: new Date(2024, 2, 15, 14, 30),
  duration: 30,
  type: "Consultation",
  notes: "Patient à suivre de près",
  diagnosis: "Pneumopathie tumorale",
};

export default function AppointmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Dans une vraie application, nous ferions un appel API ici
  const appointment = TEMP_APPOINTMENT;

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) return;

    setIsDeleting(true);
    try {
      // TODO: Implémenter la logique de suppression
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/appointments");
    } catch (error) {
      console.error("Error:", error);
      setIsDeleting(false);
    }
  };

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
                {format(appointment.date, "EEEE d MMMM yyyy 'à' HH:mm", {
                  locale: fr,
                })}
              </p>
            </div>
            <Link href={`/appointments/edit/${id}`}>
              <Button>
                <PencilIcon className="h-5 w-5 mr-2" />
                Modifier
              </Button>
            </Link>
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
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Diagnostic
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {appointment.diagnosis}
                    </dd>
                  </div>
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
              disabled={isDeleting}
              className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              {isDeleting ? "Suppression..." : "Supprimer le rendez-vous"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
