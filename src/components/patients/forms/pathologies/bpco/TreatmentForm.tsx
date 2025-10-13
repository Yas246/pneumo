import { FormSectionProps } from "../../types";

export function TreatmentForm({
  register,

  disabled,
}: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VIII. Traitement
      </h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Traitement de fond
          </label>
          <textarea
            {...register("bpcoTreatment.maintenanceTreatment")}
            disabled={disabled}
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Décrivez le traitement de fond..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Traitements prescrits
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "bpcoTreatment.prescribedTreatments.antibioticTherapy"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Antibiothérapie
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "bpcoTreatment.prescribedTreatments.oralCorticosteroids"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Corticoïdes oraux
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "bpcoTreatment.prescribedTreatments.respiratoryPhysiotherapy"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Kinésithérapie respiratoire
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoTreatment.longTermOxygenTherapy")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Oxygénothérapie de longue durée
            </span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Éducation thérapeutique
            </label>
            <select
              {...register("bpcoTreatment.therapeuticEducationDone")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionnez</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoTreatment.smokingCessationOffered")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Sevrage tabagique proposé
            </span>
          </label>
        </div>

        {/* Détails oxygénothérapie */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Détails oxygénothérapie
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Début
              </label>
              <input
                type="date"
                {...register("bpcoTreatment.longTermOxygenTherapyStartDate")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée
              </label>
              <input
                type="text"
                {...register("bpcoTreatment.longTermOxygenTherapyDuration")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Durée..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Débit au repos
              </label>
              <input
                type="text"
                {...register("bpcoTreatment.longTermOxygenTherapyRestFlow")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="2.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Débit à l&apos;effort (L/min)
              </label>
              <input
                type="text"
                {...register("bpcoTreatment.longTermOxygenTherapyEffortFlow")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="4.0"
              />
            </div>
          </div>
        </div>

        {/* VNI */}
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Ventilation Non Invasive (VNI)
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Indication
              </label>
              <select
                {...register("bpcoTreatment.vni")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="Non indiqué">Non indiqué</option>
                <option value="Indiqué">Indiqué</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paramètres
              </label>
              <textarea
                {...register("bpcoTreatment.vniParameters")}
                disabled={disabled}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Paramètres VNI..."
              />
            </div>
          </div>
        </div>

        {/* Vaccinations */}
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Vaccinations
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-3 mb-2">
                  <input
                    type="checkbox"
                    {...register("bpcoTreatment.fluVaccination")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Vaccination Antigrippale
                  </span>
                </label>
                <input
                  type="date"
                  {...register("bpcoTreatment.fluVaccinationDate")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="flex items-center space-x-3 mb-2">
                  <input
                    type="checkbox"
                    {...register("bpcoTreatment.pneumococcalVaccination")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Vaccination Anti pneumococcique
                  </span>
                </label>
                <input
                  type="date"
                  {...register("bpcoTreatment.pneumococcalVaccinationDate")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
