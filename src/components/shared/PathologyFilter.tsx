"use client";

import { pathologies } from "@/config/pathologies";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface PathologyFilterProps {
  onFilterChange: (selectedPathologies: string[]) => void;
}

export function PathologyFilter({ onFilterChange }: PathologyFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPathologies, setSelectedPathologies] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const handlePathologyToggle = (pathologyId: string) => {
    let newSelection: string[];

    if (selectedPathologies.includes(pathologyId)) {
      // Si on désélectionne une pathologie
      newSelection = selectedPathologies.filter((id) => id !== pathologyId);
    } else {
      // Si on sélectionne une pathologie
      newSelection = [...selectedPathologies, pathologyId];
    }

    setSelectedPathologies(newSelection);
    onFilterChange(newSelection);
  };

  const handleResetFilter = () => {
    setSelectedPathologies([]);
    onFilterChange([]);
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
        <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
        Filtrer par Entité
        {selectedPathologies.length > 0 && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
            {selectedPathologies.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <label className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={false}
                onChange={handleResetFilter}
              />
              <div className="ml-3 flex-1">
                <div className="font-medium">Réinitialiser</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Réinitialiser le filtre
                </p>
              </div>
            </label>
            {pathologies.map((pathology) => (
              <label
                key={pathology.id}
                className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={selectedPathologies.includes(pathology.id)}
                  onChange={() => handlePathologyToggle(pathology.id)}
                />
                <div className="ml-3 flex-1">
                  <div className="font-medium">{pathology.name}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {pathology.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
