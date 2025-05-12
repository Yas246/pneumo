/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormSectionProps } from "../../types";

export function DiagnosisForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Diagnostic
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("diagnosis.saos" as any)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
            SAOS
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("diagnosis.sacs" as any)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
            SACS
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("diagnosis.soh" as any)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
            SOH
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("diagnosis.nocturalHypoventilation" as any)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
            Hypoventilation nocturne
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("diagnosis.simpleSnoring" as any)}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label className="ml-3 text-sm text-gray-700 dark:text-gray-300">
            Ronflement simple
          </label>
        </div>
      </div>
    </div>
  );
}
