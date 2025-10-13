"use client";

import { FormSectionProps } from "../../types";
export function ComplementaryExamsForm({
  register,
  disabled,
}: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Examens complémentaires
      </h3>

      <div className="space-y-8">
        {/* Examens fonctionnels */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Examens fonctionnels
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                DEP matin (L/min)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaComplementaryExams.morningPef", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="Ex: 350"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                DEP soir (L/min)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaComplementaryExams.eveningPef", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="Ex: 380"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "asthmaComplementaryExams.efrReversibleObstruction"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                EFR - Obstruction réversible
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                EFR - VEMS
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaComplementaryExams.efrVems", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="Ex: 2.8"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                EFR - VEMS/CV (%)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaComplementaryExams.efrVemsCv", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="Ex: 85"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Imagerie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Imagerie - Rx thorax
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Résultat
              </label>
              <select
                {...register("asthmaComplementaryExams.chestXray")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="normale">Normale</option>
                <option value="hyperclarte">Hyperclarté</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autre (image)
              </label>
              <input
                type="text"
                {...register("asthmaComplementaryExams.chestXrayOther")}
                disabled={disabled}
                placeholder="Précisez les anomalies..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Biologie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Biologie
          </h4>
          <div className="space-y-6">
            {/* NFS - Hyperéosinophilie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaComplementaryExams.nfsHyperEosinophilia")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  NFS - Hyperéosinophilie
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Valeur (/mm³)
                </label>
                <input
                  type="number"
                  {...register(
                    "asthmaComplementaryExams.hyperEosinophiliaValue",
                    {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    }
                  )}
                  disabled={disabled}
                  placeholder="Ex: 500"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* IgE totales */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                IgE totales (UI/mL)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaComplementaryExams.totalIge", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="Ex: 150"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* Test de réversibilité */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Test de réversibilité
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Résultat
                  </label>
                  <select
                    {...register("asthmaComplementaryExams.reversibilityTest")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="positif">Positif</option>
                    <option value="negatif">Négatif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Variation (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register(
                      "asthmaComplementaryExams.variationPercentage",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    placeholder="Ex: 12.5"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Variation (ml)
                  </label>
                  <input
                    type="number"
                    {...register("asthmaComplementaryExams.variationMl", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                    disabled={disabled}
                    placeholder="Ex: 250"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Prick-tests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prick-tests allergènes positifs
              </label>
              <textarea
                {...register("asthmaComplementaryExams.positivePrickTests")}
                disabled={disabled}
                rows={3}
                placeholder="Liste des allergènes positifs..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* IgE sériques spécifiques */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                IgE sériques spécifiques
              </h5>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register(
                      "asthmaComplementaryExams.specificIgePerformed"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Réalisé
                  </span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Poussière de maison
                    </label>
                    <input
                      type="text"
                      {...register("asthmaComplementaryExams.specificIgeDust")}
                      disabled={disabled}
                      placeholder="Valeur..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Acariens (DP)
                    </label>
                    <input
                      type="text"
                      {...register(
                        "asthmaComplementaryExams.specificIgeMitesDp"
                      )}
                      disabled={disabled}
                      placeholder="Valeur..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Acariens (DF)
                    </label>
                    <input
                      type="text"
                      {...register(
                        "asthmaComplementaryExams.specificIgeMitesDf"
                      )}
                      disabled={disabled}
                      placeholder="Valeur..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Pollens
                    </label>
                    <input
                      type="text"
                      {...register(
                        "asthmaComplementaryExams.specificIgePollen"
                      )}
                      disabled={disabled}
                      placeholder="Valeur..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Autres
                    </label>
                    <input
                      type="text"
                      {...register("asthmaComplementaryExams.specificIgeOther")}
                      disabled={disabled}
                      placeholder="Valeur..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* IDR (Intradermoréaction) */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                IDR (Intradermoréaction)
              </h5>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Résultat
                  </label>
                  <select
                    {...register("asthmaComplementaryExams.idr")}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="nonFaites">
                      Non faites (ou non indiquées)
                    </option>
                    <option value="negatif">Négatif</option>
                    <option value="positif">Positif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Si positif
                  </label>
                  <input
                    type="text"
                    {...register("asthmaComplementaryExams.idrPositiveDetails")}
                    disabled={disabled}
                    placeholder="Précisez..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* BLONDO-SCANNER (ou Rx des sinus) */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                BLONDO-SCANNER (ou Rx des sinus)
              </h5>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register(
                      "asthmaComplementaryExams.blondScannerPerformed"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Réalisé
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Résultat
                  </label>
                  <input
                    type="text"
                    {...register("asthmaComplementaryExams.blondScannerResult")}
                    disabled={disabled}
                    placeholder="Précisez le résultat..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* TDM thoracique */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                TDM thoracique
              </h5>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register(
                      "asthmaComplementaryExams.thoracicCtdPerformed"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Réalisé
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Conclusion
                  </label>
                  <input
                    type="text"
                    {...register(
                      "asthmaComplementaryExams.thoracicCtdConclusion"
                    )}
                    disabled={disabled}
                    placeholder="Précisez la conclusion..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Autres examens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (Examens complémentaires)
              </label>
              <textarea
                {...register(
                  "asthmaComplementaryExams.otherComplementaryExams"
                )}
                disabled={disabled}
                rows={3}
                placeholder="Précisez les autres examens..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
