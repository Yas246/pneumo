"use client";

import { FormSectionProps } from "../../types";
export function TreatmentForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VIII. Traitement
      </h3>

      <div className="space-y-8">
        {/* Traitement de fond */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Traitement de fond
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Corticoïdes inhalés (Molécule)
              </label>
              <input
                type="text"
                {...register(
                  "asthmaTreatment.maintenanceTreatment.inhaledCorticosteroids"
                )}
                disabled={disabled}
                placeholder="Ex: Fluticasone, Budésonide..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dose (CSI) (µg)
                </label>
                <input
                  type="number"
                  {...register("asthmaTreatment.maintenanceTreatment.csiDose", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  placeholder="Ex: 500"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fréquence (CSI) (/j)
                </label>
                <input
                  type="number"
                  {...register(
                    "asthmaTreatment.maintenanceTreatment.csiFrequency",
                    {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    }
                  )}
                  disabled={disabled}
                  placeholder="Ex: 2"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bêta-2 longue durée (LABA)
              </label>
              <input
                type="text"
                {...register("asthmaTreatment.maintenanceTreatment.laba")}
                disabled={disabled}
                placeholder="Ex: Salmétérol, Formotérol..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "asthmaTreatment.maintenanceTreatment.antiLeukotrienes"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Anti-leucotriènes (Montelukast)
              </span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (Traitement de fond)
              </label>
              <textarea
                {...register(
                  "asthmaTreatment.maintenanceTreatment.otherMaintenance"
                )}
                disabled={disabled}
                rows={3}
                placeholder="Précisez les autres traitements de fond..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Traitement de crise */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Traitement de crise
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instruction Salbutamol 100 µg
              </label>
              <input
                type="text"
                {...register(
                  "asthmaTreatment.crisisTreatment.salbutamolInstruction"
                )}
                disabled={disabled}
                placeholder="Ex: 2 bouffées si besoin..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (Traitement de crise)
              </label>
              <textarea
                {...register("asthmaTreatment.crisisTreatment.otherCrisis")}
                disabled={disabled}
                rows={3}
                placeholder="Précisez les autres traitements de crise..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mesures associées */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Mesures associées
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="educationTherapeutique"
                {...register("asthmaTreatment.associatedMeasures")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Éducation thérapeutique
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="reglesHygienoDietetiques"
                {...register("asthmaTreatment.associatedMeasures")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Règles hygiéno-diététiques
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="techniqueInhalation"
                {...register("asthmaTreatment.associatedMeasures")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Technique d&apos;inhalation expliquée
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="carnetSuivi"
                {...register("asthmaTreatment.associatedMeasures")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Carnet de suivi remis
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
