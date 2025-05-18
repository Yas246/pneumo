import { FormSectionProps } from "../../types";

export function DiseaseHistoryForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Histoire de la Maladie
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="diseaseHistory.symptomsDuration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Durée des symptômes
            </label>
            <select
              id="diseaseHistory.symptomsDuration"
              {...register("pidDiseaseHistory.symptomsDuration")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            >
              <option value="">Sélectionner</option>
              <option value="<3 semaines">&lt;3 semaines</option>
              <option value=">3 semaines">&gt;3 semaines</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="diseaseHistory.installationMode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mode d&apos;installation
            </label>
            <select
              id="diseaseHistory.installationMode"
              {...register("pidDiseaseHistory.installationMode")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            >
              <option value="">Sélectionner</option>
              <option value="Brutal">Brutal</option>
              <option value="Progressif">Progressif</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
