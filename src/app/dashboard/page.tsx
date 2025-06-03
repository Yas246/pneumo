"use client";

import { PatientList } from "@/components/patients/PatientList";
import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { PathologyFilter } from "@/components/shared/PathologyFilter";
import { SearchBar } from "@/components/shared/SearchBar";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [isArchivedOpen, setIsArchivedOpen] = useState(false);
  const [selectedPathologies, setSelectedPathologies] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Dossiers Patients
            </h1>
            <Link href="/patients/new" className="sm:flex-shrink-0">
              <Button className="w-full sm:w-auto justify-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Nouveau Patient
              </Button>
            </Link>
          </div>

          <div className="mb-6 sm:mb-8 space-y-4">
            <SearchBar />
            <PathologyFilter onFilterChange={setSelectedPathologies} />
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 px-4 sm:px-0">
                Patients en cours de traitement
              </h2>
              <PatientList
                status="active"
                selectedPathologies={selectedPathologies}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setIsArchivedOpen(!isArchivedOpen)}
                className="w-full px-4 py-3 sm:py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  Patients archivés
                </h2>
                {isArchivedOpen ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              <div
                className={`transition-all duration-200 ease-in-out ${
                  isArchivedOpen
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="px-4 pb-4">
                  <PatientList
                    status="archived"
                    selectedPathologies={selectedPathologies}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
