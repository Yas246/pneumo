import { FormSectionProps } from "./types";

export function ClinicalExamForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Examen Clinique
      </h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Mesures
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.weight"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Poids (kg)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("clinicalExam.weight", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.height"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Taille (cm)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("clinicalExam.height", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.bmi"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                IMC
              </label>
              <input
                type="number"
                step="0.1"
                {...register("clinicalExam.bmi", { valueAsNumber: true })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.neckCircumference"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tour de cou (cm)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("clinicalExam.neckCircumference", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.abdominalPerimeter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Périmètre abdominal (cm)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("clinicalExam.abdominalPerimeter", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.bloodPressure"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tension artérielle
              </label>
              <input
                type="text"
                {...register("clinicalExam.bloodPressure")}
                placeholder="ex: 120/80"
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.heartRate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fréquence cardiaque
              </label>
              <input
                type="number"
                {...register("clinicalExam.heartRate", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.saturation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Saturation
              </label>
              <input
                type="number"
                {...register("clinicalExam.saturation", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.pulmonaryAuscultation"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Auscultation pulmonaire
          </label>
          <textarea
            {...register("clinicalExam.pulmonaryAuscultation")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Examen ORL */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Examen ORL
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="orlExam.vasAnatomy"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Morphologie des VAS
              </label>
              <input
                type="text"
                {...register("orlExam.vasAnatomy")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("orlExam.nasalObstruction")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Obstruction nasale
                  </span>
                </div>
              </label>

              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("orlExam.amygdalineHypertrophy")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Hypertrophie amygdalienne
                  </span>
                </div>
              </label>

              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("orlExam.retrognathia")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Rétrognathie
                  </span>
                </div>
              </label>

              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("orlExam.micromandible")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Micromandibule
                  </span>
                </div>
              </label>

              <label className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("orlExam.macroglossia")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Macroglossie
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
