import { FormSectionProps } from "../../types";

export function DiseaseHistoryForm({
  register,
  disabled,
  watch,
}: FormSectionProps) {
  const watchHospitalizationsForBpco = watch
    ? watch("bpcoDiseaseHistory.hospitalizationsForBpco")
    : false;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IV. Histoire de la maladie
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date d&apos;apparition des premiers symptômes
            </label>
            <input
              type="date"
              {...register("bpcoDiseaseHistory.firstSymptomsDate")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Évolution
            </label>
            <select
              {...register("bpcoDiseaseHistory.evolution")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionnez</option>
              <option value="Par poussées">Par poussées</option>
              <option value="Continue">Continue</option>
              <option value="Aggravation récente">Aggravation récente</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Facteurs déclenchants ou aggravants
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoDiseaseHistory.triggeringFactors.tobacco")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tabac
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoDiseaseHistory.triggeringFactors.pollution")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Pollution
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "bpcoDiseaseHistory.triggeringFactors.professional"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Professionnels
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre d&exacerbations par an
            </label>
            <input
              type="number"
              {...register("bpcoDiseaseHistory.exacerbationsPerYear", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Ex: 2"
            />
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoDiseaseHistory.hospitalizationsForBpco")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hospitalisations pour BPCO
              </span>
            </label>
          </div>
        </div>

        {watchHospitalizationsForBpco && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre d&apos;hospitalisations
            </label>
            <input
              type="number"
              {...register("bpcoDiseaseHistory.hospitalizationsCount", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Ex: 1"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Signes associées
          </label>
          <textarea
            {...register("bpcoDiseaseHistory.associatedSigns")}
            disabled={disabled}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Décrivez les signes associés..."
          />
        </div>
      </div>
    </div>
  );
}
