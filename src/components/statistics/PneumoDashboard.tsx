"use client";

import { pathologies } from "@/config/pathologies";
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
  tumorPathologyCount: number;
  bronchialPathologyCount: number;
  infectionCount: number;
  sleepDisordersCount: number;
  pathologyDistribution: Array<{ name: string; count: number }>;
  monthlyTrends: Array<{ name: string; count: number }>;
  severityDistribution: Array<{ name: string; count: number }>;
  treatmentOutcomes: Array<{ name: string; count: number }>;
};

export function PneumoDashboard() {
  const [metrics, setMetrics] = useState<PneumologyMetrics>({
    totalPatients: 0,
    pleuralEffusionCount: 0,
    pleuralEffusionTrend: 0,
    tumorPathologyCount: 0,
    bronchialPathologyCount: 0,
    infectionCount: 0,
    sleepDisordersCount: 0,
    pathologyDistribution: [],
    monthlyTrends: [],
    severityDistribution: [
      { name: "Légère", count: 0 },
      { name: "Modérée", count: 0 },
      { name: "Sévère", count: 0 },
    ],
    treatmentOutcomes: [
      { name: "Guérison", count: 0 },
      { name: "Amélioration", count: 0 },
      { name: "Stabilisation", count: 0 },
      { name: "Aggravation", count: 0 },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPneumologyData = async () => {
      try {
        // Fetch real data from your API
        const statistics = await getStatistics();

        // For now, let's populate with sample data
        // In a real implementation, you would map the API response to this format
        setMetrics({
          totalPatients: statistics.totalPatients || 120,
          pleuralEffusionCount: 42,
          pleuralEffusionTrend: 15,
          tumorPathologyCount: 35,
          bronchialPathologyCount: 28,
          infectionCount: 10,
          sleepDisordersCount: 5,
          pathologyDistribution: pathologies.map((p) => ({
            name: p.name,
            count: Math.floor(Math.random() * 50) + 10,
          })),
          monthlyTrends: [
            { name: "Jan", count: 15 },
            { name: "Fév", count: 18 },
            { name: "Mar", count: 20 },
            { name: "Avr", count: 22 },
            { name: "Mai", count: 25 },
            { name: "Juin", count: 30 },
          ],
          severityDistribution: [
            { name: "Légère", count: 18 },
            { name: "Modérée", count: 15 },
            { name: "Sévère", count: 9 },
          ],
          treatmentOutcomes: [
            { name: "Guérison", count: 12 },
            { name: "Amélioration", count: 18 },
            { name: "Stabilisation", count: 8 },
            { name: "Aggravation", count: 4 },
          ],
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
          title="Épanchements pleuraux"
          value={metrics.pleuralEffusionCount}
          icon={BeakerIcon}
          trend={{
            value: metrics.pleuralEffusionTrend,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Pneumopathies tumorales"
          value={metrics.tumorPathologyCount}
          icon={ChartBarIcon}
          trend={{
            value: 8,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Pneumopathies bronchiques"
          value={metrics.bronchialPathologyCount}
          icon={ClipboardDocumentListIcon}
          trend={{
            value: -5,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Infections pulmonaires"
          value={metrics.infectionCount}
          icon={UserGroupIcon}
          trend={{
            value: 12,
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
              Distribution de sévérité
            </h4>
            <div className="h-64">
              <StatChart
                title=""
                type="pie"
                data={metrics.severityDistribution}
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Résultats des traitements
            </h4>
            <div className="h-64">
              <StatChart title="" type="bar" data={metrics.treatmentOutcomes} />
            </div>
          </div>
        </div>
      </div>

      {/* Tableau des derniers cas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Derniers cas d&apos;épanchement pleural
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Sévérité
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 1,
                  name: "Ahmed Benani",
                  date: "15/06/2023",
                  severity: "Modérée",
                  status: "Suivi en cours",
                },
                {
                  id: 2,
                  name: "Fatima Zohra",
                  date: "22/06/2023",
                  severity: "Sévère",
                  status: "Hospitalisation",
                },
                {
                  id: 3,
                  name: "Karim El Amrani",
                  date: "28/06/2023",
                  severity: "Légère",
                  status: "Traitement ambulatoire",
                },
                {
                  id: 4,
                  name: "Nadia Ouazzani",
                  date: "02/07/2023",
                  severity: "Modérée",
                  status: "Suivi en cours",
                },
                {
                  id: 5,
                  name: "Omar Tadlaoui",
                  date: "10/07/2023",
                  severity: "Sévère",
                  status: "Traitement intensif",
                },
              ].map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {patient.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {patient.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.severity === "Légère"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : patient.severity === "Modérée"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {patient.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium">
            Voir tous les cas
          </button>
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
