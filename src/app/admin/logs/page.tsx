"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { getLogs } from "@/firebase/logs";
import { useAuth } from "@/hooks/useAuth";
import type { LogActionType, LogEntry, UserRole } from "@/types/user";
import {
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const ACTIONS: LogActionType[] = [
  "CREATION_COMPTE",
  "SUPPRESSION_COMPTE",
  "CHANGEMENT_MDP",
  "CREATION_RDV",
  "MODIFICATION_RDV",
  "SUPPRESSION_RDV",
  "CREATION_DOSSIER",
  "MODIFICATION_DOSSIER",
  "ARCHIVAGE_DOSSIER",
  "DESARCHIVAGE_DOSSIER",
];

const ROLES: UserRole[] = ["medecin", "infirmier", "super-admin"];

const ACTION_LABELS: Record<LogActionType, string> = {
  CREATION_COMPTE: "Création de compte",
  SUPPRESSION_COMPTE: "Suppression de compte",
  CHANGEMENT_MDP: "Changement de mot de passe",
  CREATION_RDV: "Création de rendez-vous",
  MODIFICATION_RDV: "Modification de rendez-vous",
  SUPPRESSION_RDV: "Suppression de rendez-vous",
  CREATION_DOSSIER: "Création de dossier patient",
  MODIFICATION_DOSSIER: "Modification de dossier patient",
  ARCHIVAGE_DOSSIER: "Archivage de dossier patient",
  DESARCHIVAGE_DOSSIER: "Désarchivage de dossier patient",
};

const ACTION_COLORS: Record<
  LogActionType,
  { bg: string; text: string; hover: string }
> = {
  CREATION_COMPTE: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-300",
    hover: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
  },
  SUPPRESSION_COMPTE: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-300",
    hover: "hover:bg-red-200 dark:hover:bg-red-800/50",
  },
  CHANGEMENT_MDP: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-300",
    hover: "hover:bg-yellow-200 dark:hover:bg-yellow-800/50",
  },
  CREATION_RDV: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    hover: "hover:bg-green-200 dark:hover:bg-green-800/50",
  },
  MODIFICATION_RDV: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-300",
    hover: "hover:bg-purple-200 dark:hover:bg-purple-800/50",
  },
  SUPPRESSION_RDV: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-800 dark:text-pink-300",
    hover: "hover:bg-pink-200 dark:hover:bg-pink-800/50",
  },
  CREATION_DOSSIER: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-800 dark:text-emerald-300",
    hover: "hover:bg-emerald-200 dark:hover:bg-emerald-800/50",
  },
  MODIFICATION_DOSSIER: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-800 dark:text-indigo-300",
    hover: "hover:bg-indigo-200 dark:hover:bg-indigo-800/50",
  },
  ARCHIVAGE_DOSSIER: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-800 dark:text-orange-300",
    hover: "hover:bg-orange-200 dark:hover:bg-orange-800/50",
  },
  DESARCHIVAGE_DOSSIER: {
    bg: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-800 dark:text-teal-300",
    hover: "hover:bg-teal-200 dark:hover:bg-teal-800/50",
  },
};

export default function LogsPage() {
  const router = useRouter();
  const { loading, isSuperAdmin } = useAuth();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActions, setSelectedActions] = useState<LogActionType[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!loading && !isSuperAdmin) {
      router.push("/dashboard");
    }
  }, [loading, isSuperAdmin, router]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsList = await getLogs();
        setLogs(logsList);
      } catch (error) {
        console.error("Erreur lors de la récupération des logs:", error);
        toast.error("Erreur lors de la récupération des logs");
      } finally {
        setLoadingLogs(false);
      }
    };

    if (isSuperAdmin) {
      fetchLogs();
    }
  }, [isSuperAdmin]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Filtre par recherche
      const searchMatch =
        searchTerm === "" ||
        log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par action
      const actionMatch =
        selectedActions.length === 0 ||
        selectedActions.includes(log.action as LogActionType);

      // Filtre par rôle
      const roleMatch =
        selectedRoles.length === 0 || selectedRoles.includes(log.userRole);

      // Filtre par date
      const dateMatch =
        (!startDate || log.timestamp >= new Date(startDate + "T00:00:00")) &&
        (!endDate || log.timestamp <= new Date(endDate + "T23:59:59"));

      return searchMatch && actionMatch && roleMatch && dateMatch;
    });
  }, [logs, searchTerm, selectedActions, selectedRoles, startDate, endDate]);

  const handleExport = () => {
    const csvContent = [
      [
        "Date",
        "Email",
        "Rôle",
        "Action",
        "Détails",
        "ID Cible",
        "Type Cible",
      ].join(","),
      ...filteredLogs.map((log) =>
        [
          format(log.timestamp, "dd/MM/yyyy HH:mm:ss"),
          log.userEmail,
          log.userRole,
          ACTION_LABELS[log.action as LogActionType] || log.action,
          `"${log.details.replace(/"/g, '""')}"`,
          log.targetId || "",
          log.targetType || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `logs_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`;
    link.click();
  };

  if (loading || !isSuperAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Logs système
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Historique des actions effectuées sur la plateforme
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="flex items-center"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Exporter (CSV)
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
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
                      Types d&apos;actions
                    </label>
                    <select
                      multiple
                      value={selectedActions}
                      onChange={(e) =>
                        setSelectedActions(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          ) as LogActionType[]
                        )
                      }
                      className="block px-4 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      size={6}
                    >
                      {ACTIONS.map((action) => (
                        <option
                          key={action}
                          value={action}
                          className="py-2 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          {ACTION_LABELS[action]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rôles
                    </label>
                    <select
                      multiple
                      value={selectedRoles}
                      onChange={(e) =>
                        setSelectedRoles(
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          ) as UserRole[]
                        )
                      }
                      className="block px-4 w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      size={4}
                    >
                      {ROLES.map((role) => (
                        <option
                          key={role}
                          value={role}
                          className="py-2 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          {role === "medecin"
                            ? "Médecin"
                            : role === "super-admin"
                            ? "Super Admin"
                            : "Infirmier"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filtres actifs */}
                {(startDate ||
                  endDate ||
                  selectedActions.length > 0 ||
                  selectedRoles.length > 0) && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Filtres actifs
                      </h3>
                      <button
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setSelectedActions([]);
                          setSelectedRoles([]);
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
                      {selectedActions.map((action) => (
                        <span
                          key={action}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          {ACTION_LABELS[action]}
                          <button
                            onClick={() =>
                              setSelectedActions(
                                selectedActions.filter((a) => a !== action)
                              )
                            }
                            className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {selectedRoles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          {role === "medecin"
                            ? "Médecin"
                            : role === "super-admin"
                            ? "Super Admin"
                            : "Infirmier"}
                          <button
                            onClick={() =>
                              setSelectedRoles(
                                selectedRoles.filter((r) => r !== role)
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

            <div className="mt-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher dans les logs..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            {loadingLogs ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Utilisateur
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Détails
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {format(log.timestamp, "dd/MM/yyyy HH:mm:ss")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {log.userEmail}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {log.userRole === "medecin"
                              ? "Médecin"
                              : log.userRole === "super-admin"
                              ? "Super Admin"
                              : "Infirmier"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition-colors ${
                              ACTION_COLORS[log.action as LogActionType]?.bg ||
                              "bg-gray-100 dark:bg-gray-900/30"
                            } ${
                              ACTION_COLORS[log.action as LogActionType]
                                ?.text || "text-gray-800 dark:text-gray-300"
                            } ${
                              ACTION_COLORS[log.action as LogActionType]
                                ?.hover ||
                              "hover:bg-gray-200 dark:hover:bg-gray-800/50"
                            }`}
                          >
                            {ACTION_LABELS[log.action as LogActionType] ||
                              log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="max-w-lg break-words">
                            {log.details}
                            {log.targetId && (
                              <span className="block text-xs mt-1 text-gray-400 dark:text-gray-500">
                                ID: {log.targetId}
                                {log.targetType && ` (${log.targetType})`}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
