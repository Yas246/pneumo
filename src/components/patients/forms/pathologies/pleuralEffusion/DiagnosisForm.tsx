import { FormSectionProps } from "../../types";

export function DiagnosisForm({ register, watch }: FormSectionProps) {
  const diagnosisType = watch("diagnosis.type");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Diagnostic retenu
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="diagnosis.type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Diagnostic
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="diagnosis.type.tuberculosis"
                value="Tuberculose"
                {...register("diagnosis.type")}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="diagnosis.type.tuberculosis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tuberculose
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="diagnosis.type.metastasis"
                value="Métastase pleurale"
                {...register("diagnosis.type")}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="diagnosis.type.metastasis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Métastase pleurale
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="diagnosis.type.other"
                value="Autre"
                {...register("diagnosis.type")}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="diagnosis.type.other"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Autre
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="diagnosis.type.unknown"
                value="Sans cause"
                {...register("diagnosis.type")}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="diagnosis.type.unknown"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sans cause
              </label>
            </div>
          </div>
        </div>

        {diagnosisType === "Métastase pleurale" && (
          <div className="space-y-2">
            <label
              htmlFor="diagnosis.primaryCancer"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cancer primitif
            </label>
            <input
              type="text"
              id="diagnosis.primaryCancer"
              {...register("diagnosis.primaryCancer")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}

        {diagnosisType === "Autre" && (
          <div className="space-y-2">
            <label
              htmlFor="diagnosis.otherDiagnosis"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Préciser
            </label>
            <textarea
              id="diagnosis.otherDiagnosis"
              {...register("diagnosis.otherDiagnosis")}
              rows={3}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
