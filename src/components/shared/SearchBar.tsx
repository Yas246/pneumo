"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { Patient } from "@/types/patient";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    console.log("Query changée:", query);
    console.log("Debounced query:", debouncedQuery);
  }, [query, debouncedQuery]);

  useEffect(() => {
    const searchPatients = async () => {
      if (!debouncedQuery.trim()) {
        console.log("Query vide, réinitialisation des résultats");
        setResults([]);
        return;
      }

      console.log("Début de la recherche pour:", debouncedQuery);
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/patients/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();
        console.log("Résultats reçus:", data.patients);
        setResults(data.patients);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
      } finally {
        console.log("Fin de la recherche");
        setIsLoading(false);
      }
    };

    searchPatients();
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Soumission du formulaire avec la query:", query);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary-600" />
            ) : (
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              console.log("Nouvelle valeur input:", e.target.value);
              setQuery(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 pl-10 pr-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
            placeholder="Rechercher un patient par nom, prénom..."
          />
        </div>
      </form>

      {results.length > 0 && (
        <div className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg z-10">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
            {results.map((patient) => (
              <li
                key={patient.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  console.log("Patient sélectionné:", patient);
                  router.push(`/patients/${patient.id}`);
                  setQuery("");
                  setResults([]);
                }}
              >
                <div className="flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {patient.phone}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
