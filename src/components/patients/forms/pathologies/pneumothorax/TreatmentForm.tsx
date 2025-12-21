"use client";

import { FormSectionProps } from "../../types";
export function TreatmentForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VIII. Prise en charge (PEC)
      </h3>

      <div className="space-y-8">
        {/* Mesures immédiates */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Mesures immédiates
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxManagement.oxygenTherapy")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mise sous O2
                </span>
              </label>
              <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Modalité
                  </label>
                  <select
                    {...register("pneumothoraxManagement.oxygenModality")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="lunettes">Lunettes</option>
                    <option value="masque">Masque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Débit (L/min)
                  </label>
                  <input
                    type="number"
                    {...register("pneumothoraxManagement.oxygenFlow", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                    disabled={disabled}
                    placeholder="Ex: 2"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxManagement.analgesia")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Antalgie
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register("pneumothoraxManagement.analgesiaDetails")}
                  disabled={disabled}
                  placeholder="Préciser..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.peripheralIv")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Voie veineuse périphérique
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.monitoring")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Monitorage / scope
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.bloodGasIndication")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Gaz du sang (si indication)
              </span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Avis spécialisé
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="pneumologie"
                    {...register("pneumothoraxManagement.specializedAdvice")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Pneumologie
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="chirThoracique"
                    {...register("pneumothoraxManagement.specializedAdvice")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Chir thoracique
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="reanimation"
                    {...register("pneumothoraxManagement.specializedAdvice")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Réanimation
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Traitement spécifique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Traitement spécifique
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.simpleMonitoring")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Surveillance simple + repos + radio
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.needleAspiration")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Exsufflation / aspiration à l&apos;aiguille
              </span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxManagement.pleuralDrainage")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Drainage pleural
                </span>
              </label>
              <div className="ml-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Côté
                  </label>
                  <select
                    {...register("pneumothoraxManagement.drainageSide")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="droit">Droit</option>
                    <option value="gauche">Gauche</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    {...register("pneumothoraxManagement.drainageType")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="drainThoracique">Drain thoracique</option>
                    <option value="pigtail">Pigtail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Système
                  </label>
                  <select
                    {...register("pneumothoraxManagement.drainageSystem")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="bocal">Bocal</option>
                    <option value="valveHeimlich">Valve de Heimlich</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Aspiration
                  </label>
                  <select
                    {...register("pneumothoraxManagement.drainageAspiration")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="non">Non</option>
                    <option value="oui">Oui</option>
                  </select>
                </div>
              </div>
              <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Pression aspiration (cmH2O)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "pneumothoraxManagement.drainageAspirationPressure",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    placeholder="Ex: -20"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register("pneumothoraxManagement.localAnesthesia")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Anesthésie locale réalisée
                  </span>
                </div>
              </div>
              <div className="ml-7">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register("pneumothoraxManagement.postProcedureXray")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Radiographie de contrôle post-geste
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Situations particulières */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Situations particulières
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.compressiveDecompression")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Compressif (décompression urgence)
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.persistentAirLeak")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Fuite d&apos;air persistante / récidives
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("pneumothoraxManagement.highRiskTerrain")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Terrain à risque (BPCO, ventilation)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
