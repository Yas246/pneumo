"use client";

import { useAuth } from "@/hooks/useAuth";
import { AppointmentWithPatient } from "@/types/appointment";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

interface AppointmentListProps {
  appointments: AppointmentWithPatient[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  const { isSuperAdmin } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            {isSuperAdmin && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Médecin
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Notes
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {format(
                    new Date(`${appointment.date}T${appointment.time}`),
                    "PPP",
                    { locale: fr }
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {format(
                    new Date(`${appointment.date}T${appointment.time}`),
                    "HH:mm"
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-800/20 dark:text-primary-400">
                  {appointment.type}
                </span>
              </td>
              {isSuperAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {appointment.doctor?.displayName || "Non assigné"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {appointment.doctor?.role === "medecin"
                      ? "Médecin"
                      : appointment.doctor?.role === "super-admin"
                      ? "Super Admin"
                      : appointment.doctor?.role === "infirmier"
                      ? "Infirmier"
                      : ""}
                  </div>
                </td>
              )}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-white line-clamp-2">
                  {appointment.notes}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/appointments/${appointment.id}`}
                  className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
