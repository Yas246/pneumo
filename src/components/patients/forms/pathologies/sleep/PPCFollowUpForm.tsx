import { FormSectionProps } from "../../types";

export function PPCFollowUpForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Suivi PPC
      </h3>
      <div className="space-y-6">
        {/* Informations générales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="sleepPpcFollowUp.ppcPrescribingDoctor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Médecin prescripteur
            </label>
            <input
              type="text"
              {...register("sleepPpcFollowUp.ppcPrescribingDoctor")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPpcFollowUp.ppcStartDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date de prescription
            </label>
            <input
              type="date"
              {...register("sleepPpcFollowUp.ppcStartDate")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sleepPpcFollowUp.provider"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Prestataire
            </label>
            <input
              type="text"
              {...register("sleepPpcFollowUp.provider")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>
        </div>

        {/* Appareil */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Appareil
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.deviceSupplier"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fournisseur
              </label>
              <input
                type="text"
                {...register("sleepPpcFollowUp.deviceSupplier")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.deviceModel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Modèle
              </label>
              <input
                type="text"
                {...register("sleepPpcFollowUp.deviceModel")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.serialNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Numéro de série
              </label>
              <input
                type="number"
                {...register("sleepPpcFollowUp.serialNumber", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.initialPressure"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Pression initiale (cmH2O)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("sleepPpcFollowUp.initialPressure", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.ventilationMode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mode de ventilation
              </label>
              <select
                {...register("sleepPpcFollowUp.ventilationMode")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              >
                <option value="">Sélectionner un mode</option>
                <option value="CPAP">CPAP</option>
                <option value="APAP">APAP</option>
                <option value="Bi-level">Bi-level</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.humidifier"
                className=" mt-5 flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("sleepPpcFollowUp.humidifier")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Humidificateur
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Masque */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Masque
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.maskType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Type
              </label>
              <select
                {...register("sleepPpcFollowUp.maskType")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              >
                <option value="">Sélectionner un type</option>
                <option value="nasal">Nasal</option>
                <option value="facial">Facial</option>
                <option value="narinaire">Narinaire</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.maskModel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Modèle
              </label>
              <input
                type="text"
                {...register("sleepPpcFollowUp.maskModel")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sleepPpcFollowUp.maskSize"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Taille
              </label>
              <input
                type="text"
                {...register("sleepPpcFollowUp.maskSize")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Accessoires */}
        <div className="space-y-2">
          <label
            htmlFor="sleepPpcFollowUp.otherAccessories"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres accessoires
          </label>
          <textarea
            {...register("sleepPpcFollowUp.otherAccessories")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
