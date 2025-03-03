"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
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

interface ChartData {
  name: string;
  count: number;
}

interface StatChartProps {
  title: string;
  type: "bar" | "pie";
  data: ChartData[];
}

export function StatChart({ title, type, data }: StatChartProps) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.count),
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
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)", // gray-400
        },
      },
      title: {
        display: false,
      },
    },
    scales:
      type === "bar"
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
      <div className="h-80">
        {type === "bar" ? (
          <Bar data={chartData} options={options} />
        ) : (
          <Pie data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
