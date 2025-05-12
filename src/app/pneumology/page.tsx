"use client";

import { Navbar } from "@/components/shared/Navbar";
import { PneumoDashboard } from "@/components/statistics/PneumoDashboard";

export default function PneumologyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Tableau de Bord Pneumologique
            </h1>
          </div>

          <PneumoDashboard />
        </div>
      </main>
    </div>
  );
}
