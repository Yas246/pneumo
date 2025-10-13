"use client";

import { FormSectionProps } from "../../types";

export function DiseaseHistoryForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IV. Histoire de la maladie
      </h3>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="ddbDiseaseHistory.firstSymptoms"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Premiers symptômes
          </label>
          <input
            type="text"
            {...register("ddbDiseaseHistory.firstSymptoms")}
            placeholder="Décrivez les premiers symptômes..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="ddbDiseaseHistory.evolution"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Évolution
          </label>
          <textarea
            {...register("ddbDiseaseHistory.evolution")}
            rows={3}
            placeholder="Décrivez l'évolution de la maladie..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
