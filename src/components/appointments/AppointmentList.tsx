"use client";

import { Button } from "@/components/shared/Button";
import { getAppointments } from "@/firebase/appointments";
import { useAuth } from "@/hooks/useAuth";
import { AppointmentWithPatient } from "@/types/appointment";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface AppointmentListProps {
  initialAppointments: AppointmentWithPatient[];
}

export function AppointmentList({ initialAppointments }: AppointmentListProps) {
  const { isSuperAdmin, user, isResident, isProf } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] =
    useState<AppointmentWithPatient[]>(initialAppointments);

  // Extraire tous les types uniques de rendez-vous
  const appointmentTypes = useMemo(() => {
    const types = new Set<string>();
    appointments.forEach((appointment) => {
      types.add(appointment.type);
    });
    return Array.from(types);
  }, [appointments]);

  // Extraire tous les médecins uniques
  const doctors = useMemo(() => {
    const uniqueDoctors = new Set<string>();
    appointments.forEach((appointment) => {
      if (appointment.doctor?.displayName) {
        uniqueDoctors.add(appointment.doctor.displayName);
      }
    });
    return Array.from(uniqueDoctors);
  }, [appointments]);

  // Filtrer les rendez-vous
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      // Filtre par recherche
      const searchMatch =
        searchTerm === "" ||
        `${appointment.patient.firstName} ${appointment.patient.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par type
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(appointment.type);

      // Filtre par médecin
      const doctorMatch =
        selectedDoctors.length === 0 ||
        (appointment.doctor?.displayName &&
          selectedDoctors.includes(appointment.doctor.displayName));

      // Filtre par date
      const dateMatch =
        (!startDate || appointment.date >= startDate) &&
        (!endDate || appointment.date <= endDate);

      return searchMatch && typeMatch && doctorMatch && dateMatch;
    });
  }, [
    appointments,
    searchTerm,
    selectedTypes,
    selectedDoctors,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!user) return;

        const appointmentsList = await getAppointments(user.uid, user.role);

        // Messages spécifiques selon le rôle
        if (isResident) {
          toast.success("Affichage de vos rendez-vous uniquement");
        } else if (isProf) {
          toast.success("Affichage de vos rendez-vous et ceux des résidents");
        }

        setAppointments(appointmentsList);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Erreur lors de la récupération des rendez-vous");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, isResident, isProf]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Aucun rendez-vous trouvé
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block px-4 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block px-4 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Types de rendez-vous
              </label>
              <select
                multiple
                value={selectedTypes}
                onChange={(e) =>
                  setSelectedTypes(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                size={4}
              >
                {appointmentTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="py-2 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {isSuperAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Médecins
                </label>
                <select
                  multiple
                  value={selectedDoctors}
                  onChange={(e) =>
                    setSelectedDoctors(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  size={4}
                >
                  {doctors.map((doctor) => (
                    <option
                      key={doctor}
                      value={doctor}
                      className="py-2 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Filtres actifs */}
          {(startDate ||
            endDate ||
            selectedTypes.length > 0 ||
            selectedDoctors.length > 0) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filtres actifs
                </h3>
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                    setSelectedTypes([]);
                    setSelectedDoctors([]);
                  }}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {startDate && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    À partir du {new Date(startDate).toLocaleDateString()}
                    <button
                      onClick={() => setStartDate("")}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                )}
                {endDate && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    Jusqu&apos;au {new Date(endDate).toLocaleDateString()}
                    <button
                      onClick={() => setEndDate("")}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {type}
                    <button
                      onClick={() =>
                        setSelectedTypes(
                          selectedTypes.filter((t) => t !== type)
                        )
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedDoctors.map((doctor) => (
                  <span
                    key={doctor}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {doctor}
                    <button
                      onClick={() =>
                        setSelectedDoctors(
                          selectedDoctors.filter((d) => d !== doctor)
                        )
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher dans les rendez-vous..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        {/* Vue mobile */}
        <div className="block sm:hidden">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-4 border-l-4 border-b border-b-gray-200 dark:border-b-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors ${
                appointment.type === "consultation"
                  ? "border-l-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                  : appointment.type === "examen"
                  ? "border-l-green-500 hover:bg-green-50/50 dark:hover:bg-green-900/10"
                  : appointment.type === "suivi"
                  ? "border-l-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                  : "border-l-gray-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(
                        new Date(`${appointment.date}T${appointment.time}`),
                        "PPP",
                        { locale: fr }
                      )}
                    </p>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {format(
                        new Date(`${appointment.date}T${appointment.time}`),
                        "HH:mm"
                      )}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    appointment.type === "consultation"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : appointment.type === "examen"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : appointment.type === "suivi"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
                  }`}
                >
                  {appointment.type}
                </span>
              </div>

              {isSuperAdmin && appointment.doctor && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {appointment.doctor.displayName?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {appointment.doctor.displayName || "Non assigné"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {appointment.doctor.role === "medecin"
                        ? "Médecin"
                        : appointment.doctor.role === "super-admin"
                        ? "Super Admin"
                        : appointment.doctor.role === "infirmier"
                        ? "Infirmier"
                        : ""}
                    </p>
                  </div>
                </div>
              )}

              {appointment.notes && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {appointment.notes}
                </p>
              )}

              <div className="mt-4 flex justify-end">
                <Link
                  href={`/appointments/${appointment.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className={`w-full sm:w-auto ${
                      appointment.type === "consultation"
                        ? "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                        : appointment.type === "examen"
                        ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
                        : appointment.type === "suivi"
                        ? "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10"
                        : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/10"
                    }`}
                  >
                    Voir
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Vue desktop */}
        <table className="hidden sm:table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
            {filteredAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                className={`border-l-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors ${
                  appointment.type === "consultation"
                    ? "border-l-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
                    : appointment.type === "examen"
                    ? "border-l-green-500 hover:bg-green-50/50 dark:hover:bg-green-900/10"
                    : appointment.type === "suivi"
                    ? "border-l-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                    : "border-l-gray-500"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
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
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      appointment.type === "consultation"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : appointment.type === "examen"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : appointment.type === "suivi"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300"
                    }`}
                  >
                    {appointment.type}
                  </span>
                </td>
                {isSuperAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {appointment.doctor?.displayName?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div>
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
                      </div>
                    </div>
                  </td>
                )}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white line-clamp-2">
                    {appointment.notes}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/appointments/${appointment.id}`}>
                    <Button
                      variant="outline"
                      className={`${
                        appointment.type === "consultation"
                          ? "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                          : appointment.type === "examen"
                          ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
                          : appointment.type === "suivi"
                          ? "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/10"
                          : "text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/10"
                      }`}
                    >
                      Voir
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
