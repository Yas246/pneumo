"use client";

import { FormSectionProps } from "../../types";

export function DiseaseHistoryForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IV. Histoire de la maladie
      </h3>

      <div className="space-y-6">
        {/* Date d'apparition des symptômes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date d&apos;apparition des symptômes
          </label>
          <input
            type="date"
            {...register("lungCancerDiseaseHistory.symptomOnsetDate")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* Évolution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Évolution
          </label>
          <select
            {...register("lungCancerDiseaseHistory.evolution")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionner...</option>
            <option value="Progressive">Progressive</option>
            <option value="Rapide">Rapide</option>
            <option value="Intermittente">Intermittente</option>
          </select>
        </div>

        {/* Toux */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Toux
          </label>
          <input
            type="text"
            {...register("lungCancerDiseaseHistory.cough")}
            disabled={disabled}
            placeholder="Types de toux..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* Expectoration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expectoration
            </label>
            <select
              {...register("lungCancerDiseaseHistory.expectoration")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aspect de l&apos;expectoration
            </label>
            <input
              type="text"
              {...register("lungCancerDiseaseHistory.expectorationAspect")}
              disabled={disabled}
              placeholder="Aspect..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Hémoptysie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hémoptysie
            </label>
            <select
              {...register("lungCancerDiseaseHistory.hemoptysis")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type d&apos;hémoptysie
            </label>
            <input
              type="text"
              {...register("lungCancerDiseaseHistory.hemoptysisType")}
              disabled={disabled}
              placeholder="Types..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Dyspnée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dyspnée
            </label>
            <select
              {...register("lungCancerDiseaseHistory.dyspnea")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Score mMRC
            </label>
            <input
              type="number"
              {...register("lungCancerDiseaseHistory.dyspneaMmrc", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Douleur thoracique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Douleur thoracique
            </label>
            <select
              {...register("lungCancerDiseaseHistory.chestPain")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de douleur
            </label>
            <select
              {...register("lungCancerDiseaseHistory.chestPainType")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionner...</option>
              <option value="Pleurale">Pleurale</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>

        {/* Fièvre/sueurs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fièvre/sueurs
          </label>
          <select
            {...register("lungCancerDiseaseHistory.feverSweats")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionner...</option>
            <option value="Non">Non</option>
            <option value="Oui">Oui</option>
          </select>
        </div>

        {/* État général */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            État général
          </label>
          <input
            type="text"
            {...register("lungCancerDiseaseHistory.generalState")}
            disabled={disabled}
            placeholder="État général..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* Infections récurrentes */}
        <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <input
            type="checkbox"
            {...register("lungCancerDiseaseHistory.recurrentInfections")}
            disabled={disabled}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Infections récurrentes
          </span>
        </label>

        {/* Signes d'extension / complication */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Signes d&apos;extension / complication
          </h4>
          <div className="space-y-4">
            {/* Syndrome cave supérieur */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerDiseaseHistory.extensionSigns.superiorVenaCavaSyndrome"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Syndrome cave supérieur
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register(
                    "lungCancerDiseaseHistory.extensionSigns.superiorVenaCavaSyndromeSigns"
                  )}
                  disabled={disabled}
                  placeholder="Signes..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* Dysphonie */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.dysphonia"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Dysphonie
              </span>
            </label>

            {/* Dysphagie */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.dysphagia"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Dysphagie
              </span>
            </label>

            {/* Douleurs osseuses */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.bonePain"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Douleurs osseuses
              </span>
            </label>

            {/* Céphalées */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.headaches"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Céphalées
              </span>
            </label>

            {/* Troubles neurologiques */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.neurologicalDisorders"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Troubles neurologiques
              </span>
            </label>

            {/* Convulsions */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.convulsions"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Convulsions
              </span>
            </label>

            {/* Ictère */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.jaundice"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Ictère
              </span>
            </label>

            {/* Douleurs abdominales */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.abdominalPain"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Douleurs abdominales
              </span>
            </label>

            {/* Épanchement pleural */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.pleuralEffusion"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Épanchement pleural
              </span>
            </label>

            {/* Hémoptysie massive */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.massiveHemoptysis"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hémoptysie massive
              </span>
            </label>

            {/* Commentaires chronologie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Commentaires chronologie
              </label>
              <textarea
                {...register(
                  "lungCancerDiseaseHistory.extensionSigns.commentsChronology"
                )}
                disabled={disabled}
                rows={3}
                placeholder="Commentaires..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
