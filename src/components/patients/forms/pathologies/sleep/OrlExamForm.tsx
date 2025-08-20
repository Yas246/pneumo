import { FormSectionProps } from "../../types";

export function OrlExamForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <div className="space-y-6">
        {/* Morphologie faciale */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Morphologie faciale
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("orlExam.facialMorphology.retrognathism")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Rétrognatisme
                </span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("orlExam.facialMorphology.prognathism")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Prognatisme
                </span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("orlExam.facialMorphology.retromaxillia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Rétromaxillie
                </span>
              </div>
            </label>
          </div>
          <div className="mt-4">
            <label
              htmlFor="orlExam.facialMorphology.other"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres
            </label>
            <input
              type="text"
              {...register("orlExam.facialMorphology.other")}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Os hyoïde */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Os hyoïde
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="radio"
                  {...register("orlExam.hyoidBone")}
                  value="normal"
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Normositué
                </span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="radio"
                  {...register("orlExam.hyoidBone")}
                  value="low"
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Bas situé
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Classe dentaire */}
        <div className="space-y-2">
          <label
            htmlFor="orlExam.dentalClass"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Classe dentaire
          </label>
          <input
            type="text"
            {...register("orlExam.dentalClass")}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Palais ogival */}
        <div>
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                {...register("orlExam.ogivalPalate")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Palais ogival
              </span>
            </div>
          </label>
        </div>

        {/* Mallampati et Friedman */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="orlExam.mallampati"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mallampati
            </label>
            <input
              type="text"
              {...register("orlExam.mallampati")}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="orlExam.friedman"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Friedman
            </label>
            <input
              type="text"
              {...register("orlExam.friedman")}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Nasofibroscopie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Nasofibroscopie
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="orlExam.nasofibroscopy.nasalFossae"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fosses nasales
              </label>
              <textarea
                {...register("orlExam.nasofibroscopy.nasalFossae")}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="orlExam.nasofibroscopy.retrovelarObstacle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Obstacle rétro vélaire
              </label>
              <textarea
                {...register("orlExam.nasofibroscopy.retrovelarObstacle")}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="orlExam.nasofibroscopy.retrobasillingualObstacle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Obstacle rétro basilingual
              </label>
              <textarea
                {...register(
                  "orlExam.nasofibroscopy.retrobasillingualObstacle"
                )}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Manœuvres et résultats */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Manœuvres et résultats
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("orlExam.maneuvers.tongueProtraction")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Protraction de la langue
                </span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("orlExam.maneuvers.simulatedSnoring")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Ronflement simulé
                </span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("orlExam.maneuvers.prognathism")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Prognatisme
                </span>
              </div>
            </label>
          </div>
          <div className="mt-4 space-y-2">
            <label
              htmlFor="orlExam.maneuvers.otherExam"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Reste de l&apos;examen
            </label>
            <textarea
              {...register("orlExam.maneuvers.otherExam")}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Autres examens cliniques */}
        <div className="space-y-2">
          <label
            htmlFor="orlExam.otherClinicalExams"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres examens cliniques
          </label>
          <textarea
            {...register("orlExam.otherClinicalExams")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
