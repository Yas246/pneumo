import { FormSectionProps } from "../../types";

export function FamilyHistoryForm({ register, watch }: FormSectionProps) {
  const autoImmuneDisease = watch("pidFamilyHistory.autoImmuneDisease.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Antécédents Familiaux
      </h3>

      <div className="space-y-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="familyHistory.similarCaseInFamily"
            {...register("pidFamilyHistory.similarCaseInFamily")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="familyHistory.similarCaseInFamily"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Cas similaire dans la famille
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="familyHistory.autoImmuneDisease.present"
              {...register("pidFamilyHistory.autoImmuneDisease.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="familyHistory.autoImmuneDisease.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Maladie auto-immune dans la famille
            </label>
          </div>

          {autoImmuneDisease && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="familyHistory.autoImmuneDisease.details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Préciser
                </label>
                <input
                  type="text"
                  id="familyHistory.autoImmuneDisease.details"
                  {...register("pidFamilyHistory.autoImmuneDisease.details")}
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
