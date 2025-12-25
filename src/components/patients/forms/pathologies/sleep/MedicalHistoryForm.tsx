import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Antécédents et Facteurs de Risque
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Antécédents personnels
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("sleepPersonalHistory.obesity")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Obésité
                </span>
              </div>
            </label>
            <label className="relative flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("sleepPersonalHistory.hta")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">HTA</span>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.orl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ORL
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.orl")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.neuro"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Neuro
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.neuro")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.smoking"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tabagisme
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.smoking")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.alcoholism"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Alcoolisme
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.alcoholism")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.diabetes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Diabète
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.diabetes")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.cardiovascularDiseases"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Maladies cardiovasculaires
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.cardiovascularDiseases")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.lifestyle"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mode de vie
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.lifestyle")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.respiratoryPathology"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Pathologie respiratoire
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.respiratoryPathology")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPersonalHistory.currentMedications"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Médicaments en cours
            </label>
            <input
              type="text"
              {...register("sleepPersonalHistory.currentMedications")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>
        </div>

        {/* Antécédents familiaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Antécédents familiaux
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("sleepFamilyHistory.saosHistory")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Antécédents de SAOS
                </span>
              </div>
            </label>
            <label className="relative flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("sleepFamilyHistory.respiratoryPathologies")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Pathologies respiratoires
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
