import { FormSectionProps } from "../../types";

export function GeneralSignsForm({ register, watch }: FormSectionProps) {
  const weightLoss = watch("pidGeneralSigns.weightLoss.present");
  const weightLossQuantified = watch(
    "pidGeneralSigns.weightLoss.quantified.present"
  );
  const fever = watch("pidGeneralSigns.fever.present");
  const feverQuantified = watch("pidGeneralSigns.fever.quantified.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Signes Généraux
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Asthénie */}
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="generalSigns.asthenia"
              {...register("pidGeneralSigns.asthenia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="generalSigns.asthenia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Asthénie
            </label>
          </div>

          {/* Anorexie */}
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="generalSigns.anorexia"
              {...register("pidGeneralSigns.anorexia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="generalSigns.anorexia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Anorexie
            </label>
          </div>
        </div>

        {/* Amaigrissement */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="generalSigns.weightLoss.present"
              {...register("pidGeneralSigns.weightLoss.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidGeneralSigns.weightLoss.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Amaigrissement
            </label>
          </div>

          {weightLoss && (
            <div className="pl-6 pt-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="generalSigns.weightLoss.quantified.present"
                  {...register("pidGeneralSigns.weightLoss.quantified.present")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pidGeneralSigns.weightLoss.quantified.present"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Chiffré
                </label>
              </div>

              {weightLossQuantified && (
                <div className="pl-6 pt-1 flex items-center gap-2">
                  <input
                    type="number"
                    id="generalSigns.weightLoss.quantified.value"
                    {...register(
                      "pidGeneralSigns.weightLoss.quantified.value",
                      {
                        valueAsNumber: true,
                      }
                    )}
                    className="block w-24 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300">kg</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fièvre */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="generalSigns.fever.present"
              {...register("pidGeneralSigns.fever.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidGeneralSigns.fever.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fièvre
            </label>
          </div>

          {fever && (
            <div className="pl-6 pt-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="generalSigns.fever.quantified.present"
                  {...register("pidGeneralSigns.fever.quantified.present")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pidGeneralSigns.fever.quantified.present"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Chiffrée
                </label>
              </div>

              {feverQuantified && (
                <div className="pl-6 pt-1 flex items-center gap-2">
                  <input
                    type="number"
                    id="generalSigns.fever.quantified.value"
                    {...register("pidGeneralSigns.fever.quantified.value", {
                      valueAsNumber: true,
                    })}
                    step="0.1"
                    className="block w-24 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300">°C</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sueurs nocturnes */}
        <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <input
            type="checkbox"
            id="generalSigns.nightSweats"
            {...register("pidGeneralSigns.nightSweats")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="pidGeneralSigns.nightSweats"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sueurs nocturnes
          </label>
        </div>
      </div>
    </div>
  );
}
