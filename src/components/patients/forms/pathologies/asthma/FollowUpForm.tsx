"use client";

import { FormSectionProps } from "../../types";
export function FollowUpForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IX. Suivi
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prochaine consultation
            </label>
            <input
              type="date"
              {...register("asthmaFollowUp.nextConsultation")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Délai prochaine spirométrie (semaines)
            </label>
            <input
              type="number"
              {...register("asthmaFollowUp.spirometryDelay", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              placeholder="Ex: 12"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Objectif de contrôle (ACT)
          </label>
          <textarea
            {...register("asthmaFollowUp.controlObjective")}
            disabled={disabled}
            rows={3}
            placeholder="Définir les objectifs de contrôle de l'asthme..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
