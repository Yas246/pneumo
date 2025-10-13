"use client";

import { FormSectionProps } from "../../types";

export function FollowUpForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Évolution
      </h3>

      <div className="space-y-8">
        {/* Clinique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Clinique
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Évolution clinique
              </label>
              <select
                {...register("tbkEvolution.clinicalEvolution")}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner...</option>
                <option value="Amélioration">Amélioration</option>
                <option value="Aggravation">Aggravation</option>
                <option value="Stagnation">Stagnation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (Évolution clinique)
              </label>
              <textarea
                {...register("tbkEvolution.otherClinicalEvolution")}
                rows={3}
                placeholder="Autres commentaires sur l'évolution clinique..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bactério BK ED (J15) */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Bactério BK ED (J15)
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Résultat
                </label>
                <select
                  {...register("tbkEvolution.day15BkDirectExam")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Négatif">Négatif</option>
                  <option value="Positif">Positif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Charge BK (J15)
                </label>
                <input
                  type="number"
                  {...register("tbkEvolution.day15BkLoad", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Charge bactérienne..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rx thoracique (Évolution) */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Rx thoracique (Évolution)
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Évolution Rx thoracique
              </label>
              <select
                {...register("tbkEvolution.chestXRayEvolution")}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner...</option>
                <option value="Amélioration">Amélioration</option>
                <option value="Aggravation">Aggravation</option>
                <option value="Stagnation">Stagnation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (Évolution Rx)
              </label>
              <textarea
                {...register("tbkEvolution.otherChestXRayEvolution")}
                rows={3}
                placeholder="Autres commentaires sur l'évolution radiologique..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Tolérance du traitement */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Tolérance du traitement
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tolérance du traitement
                </label>
                <select
                  {...register("tbkEvolution.treatmentTolerance")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Bonne">Bonne</option>
                  <option value="Mauvaise">Mauvaise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Précisions Tolérance
                </label>
                <input
                  type="text"
                  {...register("tbkEvolution.toleranceDetails")}
                  placeholder="Précisions..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Effets secondaires */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Effets secondaires
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("tbkEvolution.sideEffects")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Présence d&apos;effets secondaires
              </span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Précisions Effets secondaires
              </label>
              <textarea
                {...register("tbkEvolution.sideEffectsDetails")}
                rows={3}
                placeholder="Décrire les effets secondaires..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
