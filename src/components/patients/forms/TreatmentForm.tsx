import { FormSectionProps } from "./types";

export function TreatmentForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Plan de Traitement
      </h3>
      <div className="space-y-6">
        {/* Mesures hygiéno-diététiques */}
        <div className="space-y-2">
          <label
            htmlFor="treatment.hygiene"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mesures hygiéno-diététiques
          </label>
          <textarea
            {...register("treatment.hygieneDietetic.notes")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Traitement médical */}
        <div className="space-y-2">
          <label
            htmlFor="treatment.medical"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Traitement médical
          </label>
          <textarea
            {...register("treatment.medicalTreatments.medications")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Traitement chirurgical */}
        <div className="space-y-2">
          <label
            htmlFor="treatment.surgical"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Traitement chirurgical
          </label>
          <textarea
            {...register("treatment.surgicalTreatments.notes")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Appareillage */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Appareillage
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("treatment.medicalTreatments.ppc")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">PPC</span>
              </div>
            </label>

            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("treatment.medicalTreatments.oam")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">OAM</span>
              </div>
            </label>

            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("treatment.medicalTreatments.oxygenotherapy")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Oxygénothérapie
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Commentaires */}
        <div className="space-y-2">
          <label
            htmlFor="treatment.comments"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Commentaires
          </label>
          <textarea
            {...register("treatment.comments")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
