import { FormSectionProps } from "../../types";

export function FollowUpForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IX. Suivi
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dernière consultation
          </label>
          <input
            type="date"
            {...register("bpcoFollowUp.lastConsultation")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prochaine évaluation
          </label>
          <input
            type="date"
            {...register("bpcoFollowUp.nextEvaluation")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <input
            type="checkbox"
            {...register("bpcoFollowUp.pneumologyFollowUp")}
            disabled={disabled}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Suivi en pneumologie
          </span>
        </label>

        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <input
            type="checkbox"
            {...register("bpcoFollowUp.vaccinationsUpToDate")}
            disabled={disabled}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Vaccinations à jour
          </span>
        </label>
      </div>
    </div>
  );
}
