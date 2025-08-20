import { FormSectionProps } from "../../types";

export function EvolutionForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Évolution
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Évolution
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.iatrogenicComplication"
                {...register("evolution.outcome.iatrogenicComplication")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.iatrogenicComplication"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Complication iatrogène
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.parietalSuppuration"
                {...register("evolution.outcome.parietalSuppuration")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.parietalSuppuration"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Suppuration pariétale
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.recovery"
                {...register("evolution.outcome.recovery")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.recovery"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Guérison
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.regression"
                {...register("evolution.outcome.regression")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.regression"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Régression
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.encystment"
                {...register("evolution.outcome.encystment")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.encystment"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enkystement
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.pachypleuritis"
                {...register("evolution.outcome.pachypleuritis")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.pachypleuritis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Pachypleurite
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.recurrence"
                {...register("evolution.outcome.recurrence")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.recurrence"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Récidive
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.lostToFollowUp"
                {...register("evolution.outcome.lostToFollowUp")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.lostToFollowUp"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Perdu de vue
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="evolution.outcome.death"
                {...register("evolution.outcome.death")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="evolution.outcome.death"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Décès
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="evolution.otherDetails"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres précisions
          </label>
          <textarea
            id="evolution.otherDetails"
            {...register("evolution.otherDetails")}
            rows={3}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
