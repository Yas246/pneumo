"use client";

import { Navbar } from "@/components/shared/Navbar";
import { DemographicsStats } from "@/components/statistics/DemographicsStats";
import { StatCard } from "@/components/statistics/StatCard";
import { StatChart } from "@/components/statistics/StatChart";
import { TemporalTrends } from "@/components/statistics/TemporalTrends";
import { getStatistics } from "@/firebase/statistics";
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type StatsData = {
  totalPatients: number;
  totalPatientsTrend: number;
  activePatients: number;
  activePatientsTrend: number;
  archivedPatients: number;
  archivedPatientsTrend: number;
  appointmentsThisMonth: number;
  appointmentsTrend: number;
  pathologyDistribution: Array<{ name: string; count: number }>;
  monthlyAppointments: Array<{ name: string; count: number }>;
  pathologyTrends: { [key: string]: number };
};

export default function StatisticsPage() {
  const [stats, setStats] = useState<StatsData>({
    totalPatients: 0,
    totalPatientsTrend: 0,
    activePatients: 0,
    activePatientsTrend: 0,
    archivedPatients: 0,
    archivedPatientsTrend: 0,
    appointmentsThisMonth: 0,
    appointmentsTrend: 0,
    pathologyDistribution: [],
    monthlyAppointments: [],
    pathologyTrends: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statistics = await getStatistics();
        setStats(statistics);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Statistiques
          </h1>

          {/* Cartes statistiques */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total patients"
              value={stats.totalPatients}
              icon={UsersIcon}
              trend={{
                value: Math.round(stats.totalPatientsTrend),
                label: "vs mois dernier",
              }}
            />
            <StatCard
              title="Patients actifs"
              value={stats.activePatients}
              icon={UserGroupIcon}
              trend={{
                value: Math.round(stats.activePatientsTrend),
                label: "vs mois dernier",
              }}
            />
            <StatCard
              title="Patients archivés"
              value={stats.archivedPatients}
              icon={ClipboardDocumentListIcon}
              trend={{
                value: Math.round(stats.archivedPatientsTrend),
                label: "vs mois dernier",
              }}
            />
            <StatCard
              title="RDV ce mois"
              value={stats.appointmentsThisMonth}
              icon={ChartBarIcon}
              trend={{
                value: Math.round(stats.appointmentsTrend),
                label: "vs mois dernier",
              }}
            />
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <StatChart
              title="Distribution des pathologies"
              type="pie"
              data={stats.pathologyDistribution}
            />
            <StatChart
              title="Rendez-vous par mois"
              type="bar"
              data={stats.monthlyAppointments}
            />
          </div>

          {/* Statistiques Démographiques */}
          <DemographicsStats />

          {/* Tendances Temporelles */}
          <TemporalTrends />
        </div>
      </main>
    </div>
  );
}
