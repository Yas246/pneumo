"use client";

import { Navbar } from "@/components/shared/Navbar";
import { StatCard } from "@/components/statistics/StatCard";
import { StatChart } from "@/components/statistics/StatChart";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// Données temporaires pour la démonstration
const TEMP_STATS = {
  totalPatients: 150,
  activePatients: 85,
  archivedPatients: 65,
  appointmentsThisMonth: 45,
  pathologyDistribution: [
    { name: "Pneumopathies tumorales", count: 35 },
    { name: "BPCO", count: 42 },
    { name: "Asthme", count: 28 },
    { name: "Infections pulmonaires", count: 45 },
  ],
  monthlyAppointments: [
    { name: "Jan", count: 35 },
    { name: "Fév", count: 28 },
    { name: "Mar", count: 45 },
    { name: "Avr", count: 42 },
    { name: "Mai", count: 38 },
    { name: "Juin", count: 30 },
  ],
};

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Tableau de bord
          </h1>

          {/* Cartes statistiques */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total patients"
              value={TEMP_STATS.totalPatients}
              icon={UsersIcon}
              trend={{ value: 12, label: "vs mois dernier" }}
            />
            <StatCard
              title="Patients actifs"
              value={TEMP_STATS.activePatients}
              icon={UserGroupIcon}
              trend={{ value: 5, label: "vs mois dernier" }}
            />
            <StatCard
              title="Patients archivés"
              value={TEMP_STATS.archivedPatients}
              icon={ClipboardDocumentListIcon}
              trend={{ value: -2, label: "vs mois dernier" }}
            />
            <StatCard
              title="RDV ce mois"
              value={TEMP_STATS.appointmentsThisMonth}
              icon={ChartBarIcon}
              trend={{ value: 8, label: "vs mois dernier" }}
            />
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <StatChart
              title="Distribution des pathologies"
              type="pie"
              data={TEMP_STATS.pathologyDistribution}
            />
            <StatChart
              title="Rendez-vous par mois"
              type="bar"
              data={TEMP_STATS.monthlyAppointments}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
