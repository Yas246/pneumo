"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

// Données temporaires pour la démonstration
const TEMP_APPOINTMENTS = [
  {
    id: "1",
    patientId: "1",
    patientName: "Jean Dupont",
    date: new Date(2024, 2, 15, 9, 30),
    duration: 30,
    type: "Consultation",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Marie Martin",
    date: new Date(2025, 2, 15, 14, 0),
    duration: 45,
    type: "Suivi",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Pierre Durant",
    date: new Date(2025, 2, 18, 11, 0),
    duration: 30,
    type: "Consultation",
  },
  {
    id: "4",
    patientId: "4",
    patientName: "Sophie Bernard",
    date: new Date(2025, 2, 18, 15, 30),
    duration: 60,
    type: "Examen",
  },
  {
    id: "5",
    patientId: "5",
    patientName: "Lucas Petit",
    date: new Date(2025, 2, 20, 10, 0),
    duration: 30,
    type: "Suivi",
  },
  {
    id: "6",
    patientId: "6",
    patientName: "Emma Dubois",
    date: new Date(2025, 2, 20, 14, 30),
    duration: 45,
    type: "Consultation",
  },
  {
    id: "7",
    patientId: "7",
    patientName: "Thomas Moreau",
    date: new Date(2025, 2, 22, 9, 0),
    duration: 30,
    type: "Suivi",
  },
  {
    id: "8",
    patientId: "8",
    patientName: "Julie Lambert",
    date: new Date(2025, 2, 22, 11, 0),
    duration: 60,
    type: "Examen",
  },
  {
    id: "9",
    patientId: "9",
    patientName: "Antoine Girard",
    date: new Date(2025, 2, 25, 10, 30),
    duration: 30,
    type: "Consultation",
  },
  {
    id: "10",
    patientId: "10",
    patientName: "Camille Roux",
    date: new Date(2025, 2, 25, 15, 0),
    duration: 45,
    type: "Suivi",
  },
  {
    id: "11",
    patientId: "11",
    patientName: "Camillia Roux",
    date: new Date(2025, 2, 25, 15, 0),
    duration: 45,
    type: "Suivi",
  },
];

export function AppointmentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection du mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDayClick = (day: Date, hasAppointments: boolean) => {
    if (hasAppointments && isMobile) {
      setSelectedDay(selectedDay?.getTime() === day.getTime() ? null : day);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: fr });
  const calendarEnd = endOfWeek(monthEnd, { locale: fr });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getAppointmentStyle = (type: string) => {
    switch (type) {
      case "Consultation":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
      case "Suivi":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "Examen":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* En-tête du calendrier */}
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {format(currentDate, "MMMM yyyy", { locale: fr })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div
            key={day}
            className="py-2 border-b border-gray-200 dark:border-gray-700"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-sm">
        {days.map((day) => {
          const appointments = TEMP_APPOINTMENTS.filter((apt) =>
            isSameDay(apt.date, day)
          );
          const hasMultipleAppointments = appointments.length > 1;

          return (
            <div
              key={day.toString()}
              className={`min-h-[100px] relative group border border-gray-200 dark:border-gray-700 p-2 ${
                !isSameMonth(day, currentDate)
                  ? "bg-gray-50 dark:bg-gray-800/50"
                  : ""
              }`}
              onClick={() => handleDayClick(day, hasMultipleAppointments)}
            >
              <div
                className={`text-right mb-1 ${
                  !isSameMonth(day, currentDate)
                    ? "text-gray-400 dark:text-gray-600"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {format(day, "d")}
              </div>

              {hasMultipleAppointments ? (
                <div className="space-y-1">
                  <div className="relative">
                    <div className="block text-xs p-1.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors text-center">
                      {appointments.length} RDV
                    </div>
                    <div
                      className={`absolute ${
                        isMobile
                          ? "fixed inset-x-0 bottom-0 w-full rounded-b-none"
                          : "left-0 bottom-full mb-1 w-64"
                      } bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50 ${
                        isMobile
                          ? selectedDay?.getTime() === day.getTime()
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible translate-y-full"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      }`}
                    >
                      <div
                        className={`${
                          isMobile ? "max-h-[50vh]" : "max-h-48"
                        } overflow-y-auto`}
                      >
                        {isMobile && (
                          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {format(day, "EEEE d MMMM", { locale: fr })}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedDay(null);
                                }}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="p-2 space-y-1">
                          {appointments.map((apt) => (
                            <Link
                              key={apt.id}
                              href={`/appointments/${apt.id}`}
                              className={`block text-xs p-2 rounded ${getAppointmentStyle(
                                apt.type
                              )} hover:opacity-75 transition-opacity`}
                            >
                              <div className="font-medium">
                                {format(apt.date, "HH:mm")} ({apt.duration} min)
                              </div>
                              <div className="truncate">{apt.patientName}</div>
                              <div className="text-xs opacity-75">
                                {apt.type}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : appointments.length === 1 ? (
                <Link
                  href={`/appointments/${appointments[0].id}`}
                  className={`block text-xs p-1.5 rounded ${getAppointmentStyle(
                    appointments[0].type
                  )} hover:opacity-75 transition-opacity`}
                >
                  <div className="font-medium">
                    {format(appointments[0].date, "HH:mm")} (
                    {appointments[0].duration} min)
                  </div>
                  <div className="truncate">{appointments[0].patientName}</div>
                  <div className="text-xs opacity-75">
                    {appointments[0].type}
                  </div>
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
