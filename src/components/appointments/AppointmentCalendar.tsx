"use client";

import { useAuth } from "@/hooks/useAuth";
import { AppointmentWithPatient } from "@/types/appointment";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AppointmentCalendarProps {
  appointments: AppointmentWithPatient[];
}

export function AppointmentCalendar({
  appointments,
}: AppointmentCalendarProps) {
  const { isSuperAdmin } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Vérifier si l'écran est mobile
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Obtenir les rendez-vous pour une date donnée
  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter((appointment) =>
      isSameDay(new Date(`${appointment.date}T${appointment.time}`), date)
    );
  };

  const handleAppointmentClick = (appointmentId: string | undefined) => {
    if (appointmentId) {
      router.push(`/appointments/${appointmentId}`);
    }
  };

  const handleDayClick = (day: Date) => {
    if (isMobile) {
      setSelectedDay(selectedDay?.getTime() === day.getTime() ? null : day);
    }
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getAppointmentStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case "consultation":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40 hover:shadow-md transform transition-all duration-200 hover:scale-[1.02]";
      case "suivi":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/40 hover:shadow-md transform transition-all duration-200 hover:scale-[1.02]";
      case "examen":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/40 hover:shadow-md transform transition-all duration-200 hover:scale-[1.02]";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800/40 hover:shadow-md transform transition-all duration-200 hover:scale-[1.02]";
    }
  };

  // Générer les jours du mois
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
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
            const dayAppointments = getAppointmentsForDay(day);
            const hasMultipleAppointments = dayAppointments.length > 2;
            const isSelected = selectedDay && isSameDay(day, selectedDay);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] relative group border border-gray-200 dark:border-gray-700 p-2 ${
                  !isCurrentMonth
                    ? "bg-gray-50 dark:bg-gray-900/50"
                    : "bg-white dark:bg-gray-800"
                } ${
                  isSelected
                    ? "ring-2 ring-primary-500 dark:ring-primary-400"
                    : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                <div
                  className={`text-right mb-1 ${
                    !isCurrentMonth
                      ? "text-gray-400 dark:text-gray-500"
                      : isToday
                      ? "text-primary-600 dark:text-primary-400 font-bold"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {hasMultipleAppointments ? (
                    <div className="relative">
                      <div className="block text-xs p-1.5 rounded-lg bg-primary-500/10 dark:bg-primary-400/10 text-primary-700 dark:text-primary-300 font-medium cursor-pointer hover:bg-primary-500/20 dark:hover:bg-primary-400/20 transition-colors text-center border border-primary-500/20 dark:border-primary-400/20 shadow-sm">
                        {dayAppointments.length} RDV
                      </div>
                      <div
                        className={`absolute ${
                          isMobile
                            ? "fixed inset-x-0 bottom-0 w-full rounded-b-none"
                            : "left-1/2 -translate-x-1/2 bottom-full mb-2 w-64"
                        } bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 z-[60] ${
                          isMobile
                            ? isSelected
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible translate-y-full"
                            : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                        }`}
                      >
                        <div
                          className={`${
                            isMobile ? "max-h-[50vh]" : "max-h-64"
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
                            {dayAppointments.map((appointment) => (
                              <button
                                key={appointment.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAppointmentClick(appointment.id);
                                }}
                                className={`w-full text-left px-2 py-1.5 rounded-md text-xs transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${getAppointmentStyle(
                                  appointment.type
                                )}`}
                              >
                                <div className="font-medium">
                                  {format(
                                    new Date(
                                      `${appointment.date}T${appointment.time}`
                                    ),
                                    "HH:mm"
                                  )}
                                </div>
                                <div className="text-xs font-medium truncate">
                                  {appointment.patient.firstName}{" "}
                                  {appointment.patient.lastName}
                                </div>
                                {isSuperAdmin && appointment.doctor && (
                                  <div className="text-xs opacity-75 truncate">
                                    Dr. {appointment.doctor.displayName}
                                  </div>
                                )}
                                <div className="text-xs opacity-75">
                                  {appointment.type}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    dayAppointments.map((appointment) => (
                      <button
                        key={appointment.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAppointmentClick(appointment.id);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-xs transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${getAppointmentStyle(
                          appointment.type
                        )}`}
                      >
                        <div className="font-medium">
                          {format(
                            new Date(`${appointment.date}T${appointment.time}`),
                            "HH:mm"
                          )}
                        </div>
                        <div className="text-xs font-medium truncate">
                          {appointment.patient.firstName}{" "}
                          {appointment.patient.lastName}
                        </div>
                        {isSuperAdmin && appointment.doctor && (
                          <div className="text-xs opacity-75 truncate">
                            Dr. {appointment.doctor.displayName}
                          </div>
                        )}
                        <div className="text-xs opacity-75">
                          {appointment.type}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
