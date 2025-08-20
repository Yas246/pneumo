import { FormSectionProps } from "../../types";

export function ChestXRayForm({ register, watch }: FormSectionProps) {
  const pleurisyLocation = watch("chestXRay.pleurisyLocation");
  const otherAnomalies = watch("chestXRay.otherAnomalies");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Radiographie thoracique
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="chestXRay.pleurisyLocation"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Siège de pleurésie
          </label>
          <select
            id="chestXRay.pleurisyLocation"
            {...register("chestXRay.pleurisyLocation")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Droite">Droite</option>
            <option value="Gauche">Gauche</option>
            <option value="Bilatérale">Bilatérale</option>
            <option value="Autre">Autre</option>
          </select>

          {pleurisyLocation === "Autre" && (
            <div className="space-y-2">
              <label
                htmlFor="chestXRay.pleurisyLocationOther"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Préciser
              </label>
              <input
                type="text"
                id="chestXRay.pleurisyLocationOther"
                {...register("chestXRay.pleurisyLocationOther")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label
            htmlFor="chestXRay.abundance"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Abondance
          </label>
          <select
            id="chestXRay.abundance"
            {...register("chestXRay.abundance")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Grande">Grande</option>
            <option value="Thorax blanc">Thorax blanc</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="chestXRay.otherAnomalies"
              {...register("chestXRay.otherAnomalies")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="chestXRay.otherAnomalies"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres anomalies
            </label>
          </div>

          {otherAnomalies && (
            <div className="mt-4 space-y-2">
              <label
                htmlFor="chestXRay.otherAnomaliesDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="chestXRay.otherAnomaliesDescription"
                {...register("chestXRay.otherAnomaliesDescription")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
