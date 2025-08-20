import { FormSectionProps } from "../../types";

export function FinalDiagnosisForm({ register, watch }: FormSectionProps) {
  const otherDiagnosis = watch("pidFinalDiagnosis.diagnosisType.other.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Diagnostic Final
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type de diagnostic
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.idiopathicPulmonaryFibrosis"
                {...register(
                  "pidFinalDiagnosis.diagnosisType.idiopathicPulmonaryFibrosis"
                )}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.idiopathicPulmonaryFibrosis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fibrose Pulmonaire Idiopathique (FPI)
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.sarcoidosis"
                {...register("pidFinalDiagnosis.diagnosisType.sarcoidosis")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.sarcoidosis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sarcoïdose
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.rheumatoidArthritis"
                {...register(
                  "pidFinalDiagnosis.diagnosisType.rheumatoidArthritis"
                )}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.rheumatoidArthritis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Polyarthrite Rhumatoïde (PR)
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.hypersensitivityPneumonitis"
                {...register(
                  "pidFinalDiagnosis.diagnosisType.hypersensitivityPneumonitis"
                )}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.hypersensitivityPneumonitis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Pneumopathie d&apos;Hypersensibilité (PHS)
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.scleroderma"
                {...register("pidFinalDiagnosis.diagnosisType.scleroderma")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.scleroderma"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sclérodermie
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.mixedConnectiveTissueDisease"
                {...register(
                  "pidFinalDiagnosis.diagnosisType.mixedConnectiveTissueDisease"
                )}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.mixedConnectiveTissueDisease"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Connectivite mixte
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.drugInducedIld"
                {...register("pidFinalDiagnosis.diagnosisType.drugInducedIld")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.drugInducedIld"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                PID médicamenteuse
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.indeterminateIld"
                {...register(
                  "pidFinalDiagnosis.diagnosisType.indeterminateIld"
                )}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.indeterminateIld"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                PID indéterminée
              </label>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ">
              <input
                type="checkbox"
                id="pidFinalDiagnosis.diagnosisType.other.present"
                {...register("pidFinalDiagnosis.diagnosisType.other.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.other.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Autre
              </label>
            </div>
          </div>

          {otherDiagnosis && (
            <div className="space-y-2 pt-2">
              <label
                htmlFor="pidFinalDiagnosis.diagnosisType.other.details"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Préciser le diagnostic
              </label>
              <textarea
                id="pidFinalDiagnosis.diagnosisType.other.details"
                {...register("pidFinalDiagnosis.diagnosisType.other.details")}
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
