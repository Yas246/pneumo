"use client";

import { Navbar } from "@/components/shared/Navbar";
import { PleuralEffusionStats } from "@/components/statistics/PleuralEffusionStats";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function PleuralEffusionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              href="/pneumology"
              className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 mr-4"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour au tableau de bord
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Épanchement pleural - Statistiques détaillées
            </h1>
          </div>

          <PleuralEffusionStats />
        </div>
      </main>
    </div>
  );
}
