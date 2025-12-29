"use client";

import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export interface AdvancedFilterValues {
  startDate?: string;
  endDate?: string;
  treatingDoctor?: string;
}

interface AdvancedFilterProps {
  onFilterChange: (filters: AdvancedFilterValues) => void;
  availableDoctors?: string[];
}

export function AdvancedFilter({
  onFilterChange,
  availableDoctors,
}: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<AdvancedFilterValues>({});
  const filterRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters =
    filters.startDate || filters.endDate || filters.treatingDoctor;

  const handleFilterChange = (
    key: keyof AdvancedFilterValues,
    value: string
  ) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters: AdvancedFilterValues = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
      >
        <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
        Filtres Avancés
        {hasActiveFilters && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
            {
              [
                filters.startDate && "Date",
                filters.treatingDoctor && "Médecin",
              ].filter(Boolean).length
            }
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-80 right-0 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="p-4 space-y-4">
            {/* En-tête avec réinitialisation */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Filtres Avancés
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
                >
                  <XMarkIcon className="h-3.5 w-3.5 mr-1" />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Filtre par période */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Période de temps
              </label>
              <div className="space-y-2">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Date de début
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={filters.startDate || ""}
                    onChange={(e) =>
                      handleFilterChange("startDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-xs text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Date de fin
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    value={filters.endDate || ""}
                    onChange={(e) =>
                      handleFilterChange("endDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
              </div>
            </div>

            {/* Filtre par médecin traitant */}
            <div className="space-y-3">
              <label
                htmlFor="treatingDoctor"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Médecin traitant
              </label>
              <select
                id="treatingDoctor"
                value={filters.treatingDoctor || ""}
                onChange={(e) =>
                  handleFilterChange("treatingDoctor", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              >
                <option value="">Tous les médecins</option>
                {availableDoctors &&
                  availableDoctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
              </select>
            </div>

            {/* Résumé des filtres actifs */}
            {hasActiveFilters && (
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Filtres actifs :
                </p>
                <div className="flex flex-wrap gap-2">
                  {filters.startDate && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      Du {new Date(filters.startDate).toLocaleDateString()}
                    </span>
                  )}
                  {filters.endDate && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      Au {new Date(filters.endDate).toLocaleDateString()}
                    </span>
                  )}
                  {filters.treatingDoctor && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                      Dr. {filters.treatingDoctor}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
