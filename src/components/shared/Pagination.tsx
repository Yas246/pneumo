"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 20,
}: PaginationProps) {
  const pages: (number | string)[] = [];

  // Logique pour générer les numéros de page
  if (totalPages <= 7) {
    // Afficher toutes les pages si 7 ou moins
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Sinon, afficher un nombre limité de pages avec des "..."
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Informations sur le nombre d'éléments */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {totalItems !== undefined && (
              <>
                Affichage de <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> à{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> sur{" "}
                <span className="font-medium">{totalItems}</span> patients
              </>
            )}
          </p>
        </div>
      </div>

      {/* Contrôles de pagination */}
      <div className="flex items-center justify-between sm:justify-end gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Précédent
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {pages.map((page, index) => (
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ) : (
              <span
                key={index}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {page}
              </span>
            )
          ))}
        </div>

        {/* Indicateur de page pour mobile */}
        <div className="sm:hidden">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Suivant
          <ChevronRightIcon className="h-5 w-5 ml-1" />
        </button>
      </div>
    </div>
  );
}
