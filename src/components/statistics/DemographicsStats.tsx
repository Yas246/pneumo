"use client";

import { getDemographicsStatistics } from "@/firebase/statistics";
import type { ChartEvent, LegendItem } from "chart.js";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface DistributionData {
  name: string;
  count: number;
  percentage: number;
}

interface AgePyramidData {
  age: string;
  male: number;
  female: number;
}

interface DemographicsData {
  ageDistribution: DistributionData[];
  sexDistribution: DistributionData[];
  professionDistribution: DistributionData[];
  coverageDistribution: DistributionData[];
  agePyramid: AgePyramidData[];
}

export function DemographicsStats() {
  const [data, setData] = useState<DemographicsData>({
    ageDistribution: [],
    sexDistribution: [],
    professionDistribution: [],
    coverageDistribution: [],
    agePyramid: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const demographics = await getDemographicsStatistics("all");
        setData(demographics);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des statistiques démographiques:",
          err
        );
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchDemographics();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-pulse"
          >
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // Préparer les données pour les graphiques
  const ageChartData = {
    labels: data.ageDistribution.map((item) => item.name),
    datasets: [
      {
        label: "Patients",
        data: data.ageDistribution.map((item) => item.count),
        backgroundColor: "rgba(14, 165, 233, 0.5)",
        borderColor: "rgb(14, 165, 233)",
        borderWidth: 1,
      },
    ],
  };

  const sexChartData = {
    labels: data.sexDistribution.map((item) => item.name),
    datasets: [
      {
        data: data.sexDistribution.map((item) => item.count),
        backgroundColor: ["rgba(14, 165, 233, 0.5)", "rgba(217, 70, 239, 0.5)"],
        borderColor: ["rgb(14, 165, 233)", "rgb(217, 70, 239)"],
        borderWidth: 1,
      },
    ],
  };

  const professionChartData = {
    labels: data.professionDistribution.map((item) => item.name),
    datasets: [
      {
        label: "Patients",
        data: data.professionDistribution.map((item) => item.count),
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 1,
      },
    ],
  };

  const coverageChartData = {
    labels: data.coverageDistribution.map((item) => item.name),
    datasets: [
      {
        data: data.coverageDistribution.map((item) => item.count),
        backgroundColor: [
          "rgba(14, 165, 233, 0.5)",
          "rgba(59, 130, 246, 0.5)",
          "rgba(99, 102, 241, 0.5)",
          "rgba(139, 92, 246, 0.5)",
          "rgba(168, 85, 247, 0.5)",
        ],
        borderColor: [
          "rgb(14, 165, 233)",
          "rgb(59, 130, 246)",
          "rgb(99, 102, 241)",
          "rgb(139, 92, 246)",
          "rgb(168, 85, 247)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const agePyramidChartData = {
    labels: data.agePyramid.map((item) => item.age),
    datasets: [
      {
        label: "Hommes",
        data: data.agePyramid.map((item) => item.male),
        backgroundColor: "rgba(14, 165, 233, 0.5)",
        borderColor: "rgb(14, 165, 233)",
        borderWidth: 1,
      },
      {
        label: "Femmes",
        data: data.agePyramid.map((item) => -item.female),
        backgroundColor: "rgba(217, 70, 239, 0.5)",
        borderColor: "rgb(217, 70, 239)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)",
        },
        onClick: (
          e: ChartEvent,
          legendItem: LegendItem,
          legend: { chart: Chart }
        ) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;

          if (index === undefined) return;

          // Récupérer l'état actuel de tous les datasets
          const meta = ci.getDatasetMeta(index);

          // Si le dataset cliqué est déjà visible et c'est le seul visible, réafficher tout
          const visibleDatasets = ci.data.datasets.filter(
            (_dataset: unknown, i: number) => {
              return !ci.getDatasetMeta(i).hidden;
            }
          );

          if (visibleDatasets.length === 1 && !meta.hidden) {
            // Réafficher tous les datasets
            ci.data.datasets.forEach((_dataset: unknown, i: number) => {
              ci.getDatasetMeta(i).hidden = false;
            });
          } else {
            // Masquer tous les datasets sauf celui cliqué
            ci.data.datasets.forEach((_dataset: unknown, i: number) => {
              const meta = ci.getDatasetMeta(i);
              meta.hidden = i !== index;
            });
          }

          ci.update();
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const label = context.dataset.label || "";
            const value = Math.abs(context.raw as number);
            const dataIndex = context.dataIndex;
            const maleValue = data.agePyramid[dataIndex]?.male || 0;
            const femaleValue = data.agePyramid[dataIndex]?.female || 0;
            const total = maleValue + femaleValue;
            const percentage =
              total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
          callback: function (value: string | number) {
            return Math.abs(Number(value));
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const value = context.raw as number;
            const dataIndex = context.dataIndex;
            const total = context.chart.data.datasets.reduce(
              (sum: number, dataset) => {
                const datasetData = dataset.data as number[];
                return sum + datasetData[dataIndex];
              },
              0
            );
            const percentage =
              total > 0 ? Math.round((value / total) * 100) : 0;
            return `Patients: ${value} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)",
        },
        onClick: (
          e: ChartEvent,
          legendItem: LegendItem,
          legend: { chart: Chart }
        ) => {
          const ci = legend.chart;

          // Pour les camemberts (pie charts), utiliser legendItem.index
          const index = legendItem.index;
          if (index === undefined) return;

          const dataset = ci.data.datasets[0] as {
            data: number[];
            _originalData?: number[];
          };

          // Sauvegarder les données originales si ce n'est pas déjà fait
          if (!dataset._originalData) {
            dataset._originalData = [...dataset.data];
          }

          // Vérifier si un seul segment est visible
          const isOnlyOneVisible =
            dataset.data.filter((val, i) => i === index && val > 0).length ===
              1 && dataset.data.filter((val) => val > 0).length === 1;

          if (isOnlyOneVisible) {
            // Réafficher tous les segments
            dataset.data = [...dataset._originalData];
          } else {
            // Masquer tous les segments sauf celui cliqué
            dataset.data = dataset._originalData.map((val, i) =>
              i === index ? val : 0
            );
          }

          ci.update();
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const label = context.label || "";
            const value = context.raw as number;
            const dataIndex = context.dataIndex;
            const total = context.chart.data.datasets.reduce(
              (sum: number, dataset) => {
                const datasetData = dataset.data as number[];
                return sum + datasetData[dataIndex];
              },
              0
            );
            const percentage =
              total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Statistiques Démographiques
      </h2>

      {/* Distribution par âge et par sexe */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-5">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Distribution par Âge
          </h3>
          <div className="h-80">
            <Bar data={ageChartData} options={barChartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Distribution par Sexe
          </h3>
          <div className="h-80">
            <Pie data={sexChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Distribution par profession et par couverture sociale */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-5">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Distribution par Profession
          </h3>
          <div className="h-80">
            <Bar data={professionChartData} options={barChartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Distribution par Couverture Sociale
          </h3>
          <div className="h-80">
            <Pie data={coverageChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Pyramide des âges */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Pyramide des Âges
        </h3>
        <div className="h-80">
          <Bar data={agePyramidChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
