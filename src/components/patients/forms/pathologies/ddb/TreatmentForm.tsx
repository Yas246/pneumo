"use client";

import { FormSectionProps } from "../../types";

export function TreatmentForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IX. Traitements envisagés
      </h3>

      <div className="space-y-8">
        {/* Traitements symptomatiques */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Traitements symptomatiques
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Kinésithérapie respiratoire"
                {...register("ddbTreatment.symptomaticTreatments")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Kinésithérapie respiratoire
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Antibiothérapie"
                {...register("ddbTreatment.symptomaticTreatments")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Antibiothérapie
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Bronchodilatateurs"
                {...register("ddbTreatment.symptomaticTreatments")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Bronchodilatateurs
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Chirurgie"
                {...register("ddbTreatment.symptomaticTreatments")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Chirurgie
              </span>
            </label>
          </div>
        </div>

        {/* Traitement étiologique */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Traitement étiologique
          </label>
          <select
            {...register("ddbTreatment.etiologicalTreatment")}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionnez</option>
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
        </div>

        {/* Autres mesures */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Autres mesures
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Vaccination"
                {...register("ddbTreatment.otherMeasures")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Vaccination
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Arrêt du tabac"
                {...register("ddbTreatment.otherMeasures")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Arrêt du tabac
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="OLD (Oxygénothérapie de Longue Durée)"
                {...register("ddbTreatment.otherMeasures")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                OLD (Oxygénothérapie de Longue Durée)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
