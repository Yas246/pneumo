"use client";

import type { ChartEvent, LegendItem } from "chart.js";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  name: string;
  count: number;
}

interface MultiSeriesChartData {
  date: string;
  [key: string]: string | number;
}

interface StatChartProps {
  title: string;
  type: "bar" | "pie" | "line";
  data: ChartData[] | MultiSeriesChartData[];
  multiSeries?: boolean;
}

export function StatChart({
  title,
  type,
  data,
  multiSeries = false,
}: StatChartProps) {
  const isMultiSeries = multiSeries && type === "line";

  const chartData = isMultiSeries
    ? {
        labels: (data as MultiSeriesChartData[]).map((item) => item.date),
        datasets: (() => {
          const firstItem = data[0] as MultiSeriesChartData;
          const seriesKeys = Object.keys(firstItem).filter(
            (key) => key !== "date"
          );
          const colors = [
            { bg: "rgba(14, 165, 233, 0.2)", border: "rgb(14, 165, 233)" },
            { bg: "rgba(59, 130, 246, 0.2)", border: "rgb(59, 130, 246)" },
            { bg: "rgba(99, 102, 241, 0.2)", border: "rgb(99, 102, 241)" },
            { bg: "rgba(139, 92, 246, 0.2)", border: "rgb(139, 92, 246)" },
            { bg: "rgba(168, 85, 247, 0.2)", border: "rgb(168, 85, 247)" },
            { bg: "rgba(217, 70, 239, 0.2)", border: "rgb(217, 70, 239)" },
            { bg: "rgba(236, 72, 153, 0.2)", border: "rgb(236, 72, 153)" },
            { bg: "rgba(249, 115, 22, 0.2)", border: "rgb(249, 115, 22)" },
            { bg: "rgba(34, 197, 94, 0.2)", border: "rgb(34, 197, 94)" },
          ];

          return seriesKeys.map((key, index) => ({
            label: key,
            data: (data as MultiSeriesChartData[]).map(
              (item) => item[key] as number
            ),
            backgroundColor: colors[index % colors.length].bg,
            borderColor: colors[index % colors.length].border,
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          }));
        })(),
      }
    : {
        labels: (data as ChartData[]).map((item) => item.name),
        datasets: [
          {
            data: (data as ChartData[]).map((item) => item.count),
            backgroundColor: [
              "rgba(14, 165, 233, 0.5)", // primary-500
              "rgba(59, 130, 246, 0.5)", // blue-500
              "rgba(99, 102, 241, 0.5)", // indigo-500
              "rgba(139, 92, 246, 0.5)", // violet-500
              "rgba(168, 85, 247, 0.5)", // purple-500
              "rgba(217, 70, 239, 0.5)", // fuchsia-500
            ],
            borderColor: [
              "rgb(14, 165, 233)", // primary-500
              "rgb(59, 130, 246)", // blue-500
              "rgb(99, 102, 241)", // indigo-500
              "rgb(139, 92, 246)", // violet-500
              "rgb(168, 85, 247)", // purple-500
              "rgb(217, 70, 239)", // fuchsia-500
            ],
            borderWidth: 1,
          },
        ],
      };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: type === "pie" || isMultiSeries,
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)", // gray-400
        },
        onClick: (
          e: ChartEvent,
          legendItem: LegendItem,
          legend: { chart: Chart }
        ) => {
          const ci = legend.chart;

          // Pour les camemberts (pie charts), utiliser legendItem.index
          if (type === "pie") {
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
          } else {
            // Pour les graphiques multi-datasets (line, bar)
            const index = legendItem.datasetIndex;
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
          }
        },
      },
      title: {
        display: false,
      },
    },
    scales:
      type === "bar" || type === "line"
        ? {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(156, 163, 175, 0.1)", // gray-400 with opacity
              },
              ticks: {
                color: "rgb(156, 163, 175)", // gray-400
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "rgb(156, 163, 175)", // gray-400
              },
            },
          }
        : undefined,
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="h-80 w-full">
        {type === "bar" ? (
          <Bar data={chartData} options={options} />
        ) : type === "line" ? (
          <Line data={chartData} options={options} />
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
