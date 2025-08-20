/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormSectionProps } from "../../types";

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
                {...register("clinicalExam.weight" as any, {
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
                {...register("clinicalExam.height" as any, {
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
                {...register("clinicalExam.bmi" as any, {
                  valueAsNumber: true,
                })}
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
                {...register("clinicalExam.neckCircumference" as any, {
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
                {...register("clinicalExam.abdominalPerimeter" as any, {
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
                {...register("clinicalExam.bloodPressure" as any)}
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
                {...register("clinicalExam.heartRate" as any, {
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
                {...register("clinicalExam.saturation" as any, {
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
            {...register("clinicalExam.pulmonaryAuscultation" as any)}
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
                {...register("orlExam.vasAnatomy" as any)}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("orlExam.nasalObstruction" as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Obstruction nasale
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("orlExam.amygdalineHypertrophy" as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hypertrophie amygdalienne
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("orlExam.retrognathia" as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Rétrognathie
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("orlExam.micromandible" as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Micromandibule
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("orlExam.macroglossia" as any)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Macroglossie
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
