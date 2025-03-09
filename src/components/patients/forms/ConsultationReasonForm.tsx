import { FormSectionProps } from "./types";

export function ConsultationReasonForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Motif de Consultation
      </h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="consultationReason"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Motif principal
          </label>
          <textarea
            {...register("consultationReason")}
            rows={4}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Symptômes diurnes */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Symptômes diurnes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diurnalSymptoms.excessiveSleepiness")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Somnolence diurne excessive
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diurnalSymptoms.headaches")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Céphalées
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diurnalSymptoms.asthenia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Asthénie
                </span>
              </div>
            </label>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="epworthScore"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Score d&apos;Epworth
            </label>
            <input
              type="number"
              {...register("diurnalSymptoms.epworthScore", {
                valueAsNumber: true,
              })}
              min="0"
              max="24"
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>
        </div>

        {/* Symptômes nocturnes */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Symptômes nocturnes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.snoring")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Ronflements
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.sleepApnea")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Apnées nocturnes
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.choking")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Étouffement/Suffocation
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.agitation")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Agitation
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.insomnia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Insomnie
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.nocturia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Nycturie
                </span>
              </div>
            </label>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="nocturnalSymptomsOther"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres symptômes nocturnes
            </label>
            <input
              type="text"
              {...register("nocturnalSymptoms.other")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="symptomsDuration"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Durée des symptômes
          </label>
          <input
            type="text"
            {...register("symptomsDuration")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
