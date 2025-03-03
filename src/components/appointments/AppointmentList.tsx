"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

// Données temporaires pour la démonstration
const TEMP_APPOINTMENTS = [
  {
    id: "1",
    patientId: "1",
    patientName: "Hamza Farhi",
    date: new Date(2024, 2, 15, 14, 30),
    duration: 30,
    type: "Consultation",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Marie Martin",
    date: new Date(2024, 2, 16, 10, 0),
    duration: 45,
    type: "Suivi",
  },
];

export function AppointmentList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {TEMP_APPOINTMENTS.map((appointment) => (
          <li key={appointment.id}>
            <Link
              href={`/appointments/${appointment.id}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {appointment.patientName}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {format(appointment.date, "d MMMM yyyy", {
                          locale: fr,
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{format(appointment.date, "HH:mm")}</span>
                      <span className="mx-2">•</span>
                      <span>{appointment.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
