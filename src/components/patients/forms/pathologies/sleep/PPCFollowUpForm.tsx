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
              htmlFor="ppcFollowUp.ppcPrescribingDoctor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Médecin prescripteur
            </label>
            <input
              type="text"
              {...register("ppcFollowUp.ppcPrescribingDoctor")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ppcFollowUp.ppcStartDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date de prescription
            </label>
            <input
              type="date"
              {...register("ppcFollowUp.ppcStartDate")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ppcFollowUp.provider"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Prestataire
            </label>
            <input
              type="text"
              {...register("ppcFollowUp.provider")}
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
                htmlFor="ppcFollowUp.deviceSupplier"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fournisseur
              </label>
              <input
                type="text"
                {...register("ppcFollowUp.deviceSupplier")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ppcFollowUp.deviceModel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Modèle
              </label>
              <input
                type="text"
                {...register("ppcFollowUp.deviceModel")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ppcFollowUp.serialNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Numéro de série
              </label>
              <input
                type="number"
                {...register("ppcFollowUp.serialNumber", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ppcFollowUp.initialPressure"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Pression initiale (cmH2O)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("ppcFollowUp.initialPressure", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ppcFollowUp.ventilationMode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mode de ventilation
              </label>
              <select
                {...register("ppcFollowUp.ventilationMode")}
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
                htmlFor="ppcFollowUp.humidifier"
                className="relative flex items-start"
              >
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    {...register("ppcFollowUp.humidifier")}
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
                htmlFor="ppcFollowUp.maskType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Type
              </label>
              <select
                {...register("ppcFollowUp.maskType")}
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
                htmlFor="ppcFollowUp.maskModel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Modèle
              </label>
              <input
                type="text"
                {...register("ppcFollowUp.maskModel")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="ppcFollowUp.maskSize"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Taille
              </label>
              <input
                type="text"
                {...register("ppcFollowUp.maskSize")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Accessoires */}
        <div className="space-y-2">
          <label
            htmlFor="ppcFollowUp.otherAccessories"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres accessoires
          </label>
          <textarea
            {...register("ppcFollowUp.otherAccessories")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
