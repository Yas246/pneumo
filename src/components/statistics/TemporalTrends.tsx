"use client";

import { getTemporalStatistics } from "@/firebase/statistics";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { StatChart } from "./StatChart";

interface TrendData {
  date: string;
  count: number;
}

interface MultiSeriesTrendData {
  date: string;
  [key: string]: string | number;
}

interface ComparisonData {
  currentPeriod: {
    patients: number;
    appointments: number;
  };
  previousPeriod: {
    patients: number;
    appointments: number;
  };
  change: {
    patients: number;
    appointments: number;
  };
}

interface TemporalStatisticsData {
  patientCreationTrend: TrendData[];
  pathologyCreationTrend: MultiSeriesTrendData[];
  appointmentTrend: TrendData[];
  comparison: ComparisonData;
}

export function TemporalTrends() {
  const [data, setData] = useState<TemporalStatisticsData>({
    patientCreationTrend: [],
    pathologyCreationTrend: [],
    appointmentTrend: [],
    comparison: {
      currentPeriod: { patients: 0, appointments: 0 },
      previousPeriod: { patients: 0, appointments: 0 },
      change: { patients: 0, appointments: 0 },
    },
  });
  const [period, setPeriod] = useState<string>("30d");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemporalStats = async () => {
      try {
        setLoading(true);
        const temporalStats = await getTemporalStatistics(period);
        setData(temporalStats);
        setError(null);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des statistiques temporelles:",
          err
        );
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchTemporalStats();
  }, [period]);

  const periodOptions = [
    { value: "7d", label: "7 jours" },
    { value: "30d", label: "30 jours" },
    { value: "90d", label: "90 jours" },
    { value: "6m", label: "6 mois" },
    { value: "1y", label: "1 an" },
  ];

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Tendances Temporelles
          </h2>
          <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Tendances Temporelles
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tendances Temporelles
        </h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {periodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cartes de comparaison */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <StatCard
          title="Patients (période actuelle)"
          value={data.comparison.currentPeriod.patients}
          icon={UserPlusIcon}
          trend={{
            value: Math.round(data.comparison.change.patients),
            label: "vs période précédente",
          }}
        />
        <StatCard
          title="RDV (période actuelle)"
          value={data.comparison.currentPeriod.appointments}
          icon={CalendarDaysIcon}
          trend={{
            value: Math.round(data.comparison.change.appointments),
            label: "vs période précédente",
          }}
        />
        <StatCard
          title="Patients (période précédente)"
          value={data.comparison.previousPeriod.patients}
          icon={ClockIcon}
          trend={{
            value: 0,
            label: "référence",
          }}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <StatChart
            title="Tendance de création de patients"
            type="line"
            data={data.patientCreationTrend.map((item) => ({
              name: item.date,
              count: item.count,
            }))}
          />
        </div>
        <div className="lg:col-span-2">
          <StatChart
            title="Tendance de création par pathologie"
            type="line"
            data={data.pathologyCreationTrend}
            multiSeries={true}
          />
        </div>
        <div className="lg:col-span-2">
          <StatChart
            title="Tendance des rendez-vous"
            type="line"
            data={data.appointmentTrend.map((item) => ({
              name: item.date,
              count: item.count,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
