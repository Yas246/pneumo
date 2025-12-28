"use client";

import { getStatistics } from "@/firebase/statistics";
import {
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  BeakerIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { StatChart } from "./StatChart";

type PneumologyMetrics = {
  totalPatients: number;
  pleuralEffusionCount: number;
  pleuralEffusionTrend: number;
  pathologyDistribution: Array<{ name: string; count: number }>;
  monthlyTrends: Array<{ name: string; count: number }>;
  pathologyTrends: { [key: string]: number };
};

export function PneumoDashboard() {
  const [metrics, setMetrics] = useState<PneumologyMetrics>({
    totalPatients: 0,
    pleuralEffusionCount: 0,
    pleuralEffusionTrend: 0,
    pathologyDistribution: [],
    monthlyTrends: [],
    pathologyTrends: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPneumologyData = async () => {
      try {
        const statistics = await getStatistics();

        // Récupérer le nombre d'épanchements pleuraux depuis la distribution
        const pleuralEffusionData = statistics.pathologyDistribution.find(
          (p) => p.name === "Épanchement pleural"
        );
        const pleuralEffusionCount = pleuralEffusionData?.count || 0;
        const pleuralEffusionTrend =
          statistics.pathologyTrends?.["pleuralEffusion"] || 0;

        setMetrics({
          totalPatients: statistics.totalPatients || 0,
          pleuralEffusionCount,
          pleuralEffusionTrend,
          pathologyDistribution: statistics.pathologyDistribution,
          monthlyTrends: statistics.monthlyAppointments,
          pathologyTrends: statistics.pathologyTrends || {},
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de pneumologie:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPneumologyData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Tableau de Bord Pneumologique
      </h2>

      {/* Principales métriques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total patients"
          value={metrics.totalPatients}
          icon={UserGroupIcon}
          trend={{
            value: 0,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Épanchements pleuraux"
          value={metrics.pleuralEffusionCount}
          icon={BeakerIcon}
          trend={{
            value: Math.round(metrics.pleuralEffusionTrend),
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Pathologies diverses"
          value={metrics.pathologyDistribution.length}
          icon={ChartBarIcon}
          trend={{
            value: 0,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Total pathologies"
          value={metrics.pathologyDistribution.reduce(
            (sum, p) => sum + p.count,
            0
          )}
          icon={ClipboardDocumentListIcon}
          trend={{
            value: 0,
            label: "vs mois dernier",
          }}
        />
      </div>

      {/* Graphiques d'analyse */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatChart
          title="Distribution des pathologies"
          type="pie"
          data={metrics.pathologyDistribution}
        />
        <StatChart
          title="Tendances mensuelles"
          type="bar"
          data={metrics.monthlyTrends}
        />
      </div>

      {/* Métriques additionnelles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Statistiques détaillées sur l&apos;épanchement pleural
          </h3>
          <Link
            href="/pneumology/pleural-effusion"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 flex items-center"
          >
            Voir tous les détails
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Distribution des pathologies
            </h4>
            <div className="h-64">
              <StatChart
                title=""
                type="pie"
                data={metrics.pathologyDistribution}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Tendances mensuelles
            </h4>
            <div className="h-64">
              <StatChart title="" type="bar" data={metrics.monthlyTrends} />
            </div>
          </div>
        </div>
      </div>

      {/* Guide clinique */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <PresentationChartLineIcon className="h-6 w-6 text-primary-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Guide clinique: Épanchement pleural
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Protocole de diagnostic
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Examen physique, radiographie thoracique, échographie,
                tomodensitométrie, ponction pleurale.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Critères de sévérité
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Volume de l&apos;épanchement, détresse respiratoire, présence
                d&apos;infection, comorbidités.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Options thérapeutiques
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Traitement de la cause sous-jacente, thoracentèse, drainage
                thoracique, pleurodèse.
              </p>
            </div>
          </div>
        </div>

        <button className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium">
          Consulter le protocole complet
        </button>
      </div>
    </div>
  );
}
