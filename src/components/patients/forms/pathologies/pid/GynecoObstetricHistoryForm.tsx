import { FormSectionProps } from "../../types";

export function GynecoObstetricHistoryForm({
  register,
  watch,
}: FormSectionProps) {
  const sex = watch("sex");

  // N'afficher ce formulaire que pour les femmes
  if (sex !== "F") {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Antécédents Gynéco-Obstétricaux
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="gynecoObstetricHistory.menarche"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Ménarche
            </label>
            <input
              type="text"
              id="gynecoObstetricHistory.menarche"
              {...register("pidGynecoObstetricHistory.menarche")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="gynecoObstetricHistory.cycle"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cycle
            </label>
            <select
              id="gynecoObstetricHistory.cycle"
              {...register("pidGynecoObstetricHistory.cycle")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            >
              <option value="">Sélectionner</option>
              <option value="Régulier">Régulier</option>
              <option value="Irrégulier">Irrégulier</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="gynecoObstetricHistory.contraceptives"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contraceptifs
            </label>
            <input
              type="text"
              id="pidGynecoObstetricHistory.contraceptives"
              {...register("pidGynecoObstetricHistory.contraceptives")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="gynecoObstetricHistory.gestity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Gestité
            </label>
            <input
              type="number"
              id="gynecoObstetricHistory.gestity"
              {...register("pidGynecoObstetricHistory.gestity", {
                valueAsNumber: true,
              })}
              className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="gynecoObstetricHistory.parity"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Parité
            </label>
            <input
              type="number"
              id="gynecoObstetricHistory.parity"
              {...register("pidGynecoObstetricHistory.parity", {
                valueAsNumber: true,
              })}
              className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
