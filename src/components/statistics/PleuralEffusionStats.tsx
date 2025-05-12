"use client";

import {
  BeakerIcon,
  ClockIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { StatChart } from "./StatChart";

type PleuralEffusionData = {
  totalCases: number;
  activeCases: number;
  resolvedCases: number;
  averageDuration: number;
  etiologyDistribution: Array<{ name: string; count: number }>;
  fluidCharacteristics: Array<{ name: string; count: number }>;
  ageDistribution: Array<{ name: string; count: number }>;
  treatmentMethods: Array<{ name: string; count: number }>;
};

export function PleuralEffusionStats() {
  const [data, setData] = useState<PleuralEffusionData>({
    totalCases: 0,
    activeCases: 0,
    resolvedCases: 0,
    averageDuration: 0,
    etiologyDistribution: [],
    fluidCharacteristics: [],
    ageDistribution: [],
    treatmentMethods: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData({
        totalCases: 65,
        activeCases: 42,
        resolvedCases: 23,
        averageDuration: 14,
        etiologyDistribution: [
          { name: "Infectieux", count: 22 },
          { name: "Tumoral", count: 18 },
          { name: "Cardiaque", count: 12 },
          { name: "Inflammatoire", count: 8 },
          { name: "Autre", count: 5 },
        ],
        fluidCharacteristics: [
          { name: "Transsudat", count: 25 },
          { name: "Exsudat", count: 40 },
        ],
        ageDistribution: [
          { name: "< 30 ans", count: 8 },
          { name: "30-45 ans", count: 15 },
          { name: "46-60 ans", count: 22 },
          { name: "61-75 ans", count: 14 },
          { name: "> 75 ans", count: 6 },
        ],
        treatmentMethods: [
          { name: "Ponction pleurale", count: 48 },
          { name: "Drainage thoracique", count: 32 },
          { name: "Pleurodèse", count: 15 },
          { name: "Décortication", count: 7 },
        ],
      });
      setLoading(false);
    }, 1000);
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
        Statistiques sur l&apos;épanchement pleural
      </h2>

      {/* Cartes principales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Cas totaux"
          value={data.totalCases}
          icon={BeakerIcon}
          trend={{
            value: 8,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Cas actifs"
          value={data.activeCases}
          icon={DocumentChartBarIcon}
          trend={{
            value: 12,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Cas résolus"
          value={data.resolvedCases}
          icon={UserGroupIcon}
          trend={{
            value: 5,
            label: "vs mois dernier",
          }}
        />
        <StatCard
          title="Durée moyenne (jours)"
          value={data.averageDuration}
          icon={ClockIcon}
          trend={{
            value: -2,
            label: "vs mois dernier",
          }}
        />
      </div>

      {/* Graphiques d'analyse */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Étiologie des épanchements pleuraux
          </h3>
          <div className="h-80">
            <StatChart title="" type="pie" data={data.etiologyDistribution} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Distribution par âge
          </h3>
          <div className="h-80">
            <StatChart title="" type="bar" data={data.ageDistribution} />
          </div>
        </div>
      </div>

      {/* Informations détaillées */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Caractéristiques du liquide pleural
          </h3>
          <div className="h-64">
            <StatChart title="" type="pie" data={data.fluidCharacteristics} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Méthodes de traitement
          </h3>
          <div className="h-64">
            <StatChart title="" type="bar" data={data.treatmentMethods} />
          </div>
        </div>
      </div>

      {/* Tableau des paramètres biologiques */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Paramètres biologiques moyens du liquide pleural
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
                  Paramètre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Transsudat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Exsudat
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Valeurs normales
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 1,
                  parameter: "Protéines (g/L)",
                  transsudat: "< 30",
                  exsudat: "> 30",
                  normal: "< 30",
                },
                {
                  id: 2,
                  parameter: "LDH (UI/L)",
                  transsudat: "< 200",
                  exsudat: "> 200",
                  normal: "< 200",
                },
                {
                  id: 3,
                  parameter: "Glucose (g/L)",
                  transsudat: "≈ Sérum",
                  exsudat: "< Sérum",
                  normal: "0.7-1.1",
                },
                {
                  id: 4,
                  parameter: "pH",
                  transsudat: "> 7.4",
                  exsudat: "< 7.4",
                  normal: "7.35-7.45",
                },
                {
                  id: 5,
                  parameter: "Cellules (éléments/mm³)",
                  transsudat: "< 1000",
                  exsudat: "> 1000",
                  normal: "< 1000",
                },
              ].map((param) => (
                <tr
                  key={param.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {param.parameter}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {param.transsudat}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {param.exsudat}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {param.normal}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Indications cliniques */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Indications cliniques pour la prise en charge
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Indications de drainage
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>Épanchement important avec dyspnée</li>
                <li>Épanchement parapneumonique compliqué</li>
                <li>Empyème pleural</li>
                <li>Hémothorax</li>
                <li>Épanchement récidivant</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Indications de pleurodèse
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>Épanchement néoplasique récidivant</li>
                <li>Épanchement transudatif récidivant</li>
                <li>Pneumothorax récidivant</li>
                <li>Échec du traitement étiologique</li>
                <li>Absence d&apos;adhérence pleurale</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Suivi et évaluation
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <li>
                Radiographie thoracique de contrôle après ponction/drainage
              </li>
              <li>Surveillance biologique si infection</li>
              <li>Suivi clinique de la dyspnée et de la douleur</li>
              <li>Évaluation étiologique si cause initiale non identifiée</li>
              <li>
                Écho-doppler cardiaque si suspicion d&apos;origine cardiaque
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
