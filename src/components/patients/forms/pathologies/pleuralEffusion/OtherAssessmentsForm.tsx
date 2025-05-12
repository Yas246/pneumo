import { FormSectionProps } from "../../types";

export function OtherAssessmentsForm({ register, watch }: FormSectionProps) {
  const bronchialFibroscopy = watch("otherAssessments.bronchialFibroscopy");
  const thoracoscopy = watch("otherAssessments.thoracoscopy");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Autres explorations
      </h3>

      <div className="space-y-6">
        {/* Fibroscopie bronchique */}
        <div className="space-y-2">
          <label
            htmlFor="otherAssessments.bronchialFibroscopy"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Fibroscopie bronchique
          </label>
          <select
            id="otherAssessments.bronchialFibroscopy"
            {...register("otherAssessments.bronchialFibroscopy")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Non demandée">Non demandée</option>
            <option value="Normale">Normale</option>
            <option value="Anormale">Anormale</option>
          </select>

          {bronchialFibroscopy && bronchialFibroscopy !== "Non demandée" && (
            <div className="mt-2 space-y-2">
              <label
                htmlFor="otherAssessments.bronchialFibroscopyDetails"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Détails
              </label>
              <textarea
                id="otherAssessments.bronchialFibroscopyDetails"
                {...register("otherAssessments.bronchialFibroscopyDetails")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}

          {bronchialFibroscopy === "Anormale" && (
            <div className="mt-2 space-y-2">
              <label
                htmlFor="otherAssessments.postBronchoscopyAssessment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Bilan post-fibroscopie
              </label>
              <textarea
                id="otherAssessments.postBronchoscopyAssessment"
                {...register("otherAssessments.postBronchoscopyAssessment")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Thoracoscopie */}
        <div className="space-y-2">
          <label
            htmlFor="otherAssessments.thoracoscopy"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Thoracoscopie
          </label>
          <select
            id="otherAssessments.thoracoscopy"
            {...register("otherAssessments.thoracoscopy")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Non demandée">Non demandée</option>
            <option value="Normale">Normale</option>
            <option value="Anormale">Anormale</option>
          </select>

          {thoracoscopy && thoracoscopy !== "Non demandée" && (
            <div className="mt-2 space-y-2">
              <label
                htmlFor="otherAssessments.thoracoscopyDetails"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Détails
              </label>
              <textarea
                id="otherAssessments.thoracoscopyDetails"
                {...register("otherAssessments.thoracoscopyDetails")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}

          {thoracoscopy === "Anormale" && (
            <div className="mt-2 space-y-2">
              <label
                htmlFor="otherAssessments.postThoracoscopyAssessment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Bilan post-thoracoscopie
              </label>
              <textarea
                id="otherAssessments.postThoracoscopyAssessment"
                {...register("otherAssessments.postThoracoscopyAssessment")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Autres explorations */}
        <div className="space-y-2">
          <label
            htmlFor="otherAssessments.otherAssessments"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres explorations
          </label>
          <textarea
            id="otherAssessments.otherAssessments"
            {...register("otherAssessments.otherAssessments")}
            rows={3}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
