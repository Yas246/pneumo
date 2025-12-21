"use client";

import { FormSectionProps } from "../../types";
export function FollowUpForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IX. Surveillance évolutive
      </h3>

      <div className="space-y-6">
        {/* Surveillance clinique régulière */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("pneumothoraxMonitoring.regularClinicalMonitoring")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Surveillance clinique régulière
            </span>
          </label>
          <div className="ml-7">
            <input
              type="text"
              {...register("pneumothoraxMonitoring.monitoringDetails")}
              disabled={disabled}
              placeholder="Valeurs FR, SpO2, Douleur..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Contrôle radiologique */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contrôle radiologique
          </label>
          <select
            {...register("pneumothoraxMonitoring.radiologicalControl")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionner</option>
            <option value="6h">à 6h</option>
            <option value="24h">à 24h</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Surveillance du drain */}
        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <input
            type="checkbox"
            {...register("pneumothoraxMonitoring.drainMonitoring")}
            disabled={disabled}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Surveillance du drain (si posé)
          </span>
        </label>

        {/* Recherche de complications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recherche de complications
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="hemothorax"
                {...register("pneumothoraxMonitoring.complications")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hémothorax
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="infection"
                {...register("pneumothoraxMonitoring.complications")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Infection
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="emphysemeSC"
                {...register("pneumothoraxMonitoring.complications")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Emphysème SC
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="oedemeReexpansion"
                {...register("pneumothoraxMonitoring.complications")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Œdème de réexpansion
              </span>
            </label>
          </div>
        </div>

        {/* Évolution / remarques */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Évolution / remarques
          </label>
          <textarea
            {...register("pneumothoraxMonitoring.evolutionRemarks")}
            disabled={disabled}
            rows={3}
            placeholder="Remarques..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
