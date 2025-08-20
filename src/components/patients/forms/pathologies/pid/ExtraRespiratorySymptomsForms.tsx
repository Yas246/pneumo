import { FormSectionProps } from "../../types";

export function ExtraRespiratorySymptomsForms({
  register,
  watch,
}: FormSectionProps) {
  const arthralgia = watch("pidExtraRespiratorySymptoms.arthralgia.present");
  const cutaneousSigns = watch(
    "pidExtraRespiratorySymptoms.cutaneousSigns.present"
  );
  const neurologicalSigns = watch(
    "pidExtraRespiratorySymptoms.neurologicalSigns.present"
  );
  const digestiveSigns = watch(
    "pidExtraRespiratorySymptoms.digestiveSigns.present"
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Signes Extra-Respiratoires
      </h3>

      <div className="space-y-6">
        {/* Arthralgie */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidExtraRespiratorySymptoms.arthralgia.present"
              {...register("pidExtraRespiratorySymptoms.arthralgia.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidExtraRespiratorySymptoms.arthralgia.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Arthralgie
            </label>
          </div>

          {arthralgia && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="pidExtraRespiratorySymptoms.arthralgia.type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Type
                </label>
                <select
                  id="pidExtraRespiratorySymptoms.arthralgia.type"
                  {...register("pidExtraRespiratorySymptoms.arthralgia.type")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Inflammatoire">Inflammatoire</option>
                  <option value="Mécanique">Mécanique</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Signes oculaires et buccaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidExtraRespiratorySymptoms.xerophthalmia"
              {...register("pidExtraRespiratorySymptoms.xerophthalmia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidExtraRespiratorySymptoms.xerophthalmia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Xérophtalmie
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidExtraRespiratorySymptoms.xerostomia"
              {...register("pidExtraRespiratorySymptoms.xerostomia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidExtraRespiratorySymptoms.xerostomia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Xérostomie
            </label>
          </div>
        </div>

        {/* Signes cutanés */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidExtraRespiratorySymptoms.cutaneousSigns.present"
              {...register(
                "pidExtraRespiratorySymptoms.cutaneousSigns.present"
              )}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidExtraRespiratorySymptoms.cutaneousSigns.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Signes cutanés
            </label>
          </div>

          {cutaneousSigns && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="pidExtraRespiratorySymptoms.cutaneousSigns.details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Préciser
                </label>
                <input
                  type="text"
                  id="pidExtraRespiratorySymptoms.cutaneousSigns.details"
                  {...register(
                    "pidExtraRespiratorySymptoms.cutaneousSigns.details"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Signes neurologiques */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidExtraRespiratorySymptoms.neurologicalSigns.present"
              {...register(
                "pidExtraRespiratorySymptoms.neurologicalSigns.present"
              )}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidExtraRespiratorySymptoms.neurologicalSigns.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Signes neurologiques
            </label>
          </div>

          {neurologicalSigns && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="pidExtraRespiratorySymptoms.neurologicalSigns.details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Préciser
                </label>
                <input
                  type="text"
                  id="pidExtraRespiratorySymptoms.neurologicalSigns.details"
                  {...register(
                    "pidExtraRespiratorySymptoms.neurologicalSigns.details"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Signes digestifs */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidExtraRespiratorySymptoms.digestiveSigns.present"
              {...register(
                "pidExtraRespiratorySymptoms.digestiveSigns.present"
              )}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidExtraRespiratorySymptoms.digestiveSigns.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Signes digestifs
            </label>
          </div>

          {digestiveSigns && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="pidExtraRespiratorySymptoms.digestiveSigns.details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Préciser
                </label>
                <input
                  type="text"
                  id="pidExtraRespiratorySymptoms.digestiveSigns.details"
                  {...register(
                    "pidExtraRespiratorySymptoms.digestiveSigns.details"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
