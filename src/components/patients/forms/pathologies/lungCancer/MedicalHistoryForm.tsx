"use client";

import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        III. Antécédents et facteurs de risque
      </h3>

      <div className="space-y-8">
        {/* 3.1 Antécédents personnels */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            3.1 Antécédents personnels
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BPCO */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("lungCancerMedicalHistory.personalHistory.bpco")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                BPCO
              </span>
            </label>

            {/* Asthme */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("lungCancerMedicalHistory.personalHistory.asthma")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Asthme
              </span>
            </label>

            {/* Tuberculose */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.personalHistory.tuberculosis"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tuberculose
              </span>
            </label>

            {/* PID */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("lungCancerMedicalHistory.personalHistory.pid")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                PID
              </span>
            </label>

            {/* Bronchectasies */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.personalHistory.bronchiectasis"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Bronchectasies
              </span>
            </label>

            {/* Maladie cardiovasculaire */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.personalHistory.cardiovascularDisease"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Maladie cardiovasculaire
              </span>
            </label>

            {/* HTA */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("lungCancerMedicalHistory.personalHistory.hta")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  HTA
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.htaDetails"
                  )}
                  disabled={disabled}
                  placeholder="Détails..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* Diabète */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.diabetes"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Diabète
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.diabetesDetails"
                  )}
                  disabled={disabled}
                  placeholder="Détails..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* IRC */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.personalHistory.chronicKidneyDisease"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                IRC
              </span>
            </label>

            {/* Hépatopathie */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.liverDisease"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hépatopathie
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.liverDiseaseDetails"
                  )}
                  disabled={disabled}
                  placeholder="Détails..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* Antécédents de cancer */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.cancerHistory"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Antécédents de cancer
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.cancerHistoryDetails"
                  )}
                  disabled={disabled}
                  placeholder="Détails..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* Chirurgie thoracique */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.personalHistory.thoracicSurgery"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Chirurgie thoracique
              </span>
            </label>

            {/* Radiothérapie thoracique */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.personalHistory.thoracicRadiotherapy"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Radiothérapie thoracique
              </span>
            </label>

            {/* Autre */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.other"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Autre
                </span>
              </label>
              <div className="ml-7">
                <input
                  type="text"
                  {...register(
                    "lungCancerMedicalHistory.personalHistory.otherDetails"
                  )}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3.2 Facteurs de risque et expositions */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            3.2 Facteurs de risque et expositions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tabagisme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tabagisme
              </label>
              <select
                {...register("lungCancerMedicalHistory.riskFactors.smoking")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner...</option>
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
              </select>
            </div>

            {/* PAquets-années */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                PAquets-années
              </label>
              <input
                type="number"
                {...register("lungCancerMedicalHistory.riskFactors.packYears", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* Statut tabagique */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut tabagique
              </label>
              <select
                {...register(
                  "lungCancerMedicalHistory.riskFactors.smokingStatus"
                )}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner...</option>
                <option value="Actuel">Actuel</option>
                <option value="Sevré">Sevré</option>
              </select>
            </div>

            {/* Tabagisme passif */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.riskFactors.passiveSmoking"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tabagisme passif
              </span>
            </label>

            {/* Exposition professionnelle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Exposition professionnelle
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerMedicalHistory.riskFactors.occupationalExposure"
                )}
                disabled={disabled}
                placeholder="Expositions..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* Pollution */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("lungCancerMedicalHistory.riskFactors.pollution")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Pollution
              </span>
            </label>

            {/* Antécédents familiaux */}
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "lungCancerMedicalHistory.riskFactors.familyHistory"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Antécédents familiaux broncho-pulmonaire
              </span>
            </label>

            {/* Immunosuppression */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Immunosuppression
              </label>
              <select
                {...register(
                  "lungCancerMedicalHistory.riskFactors.immunosuppression"
                )}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner...</option>
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3.3 Allergies et traitements */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            3.3 Allergies et traitements
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Allergies */}
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Allergies
                </label>
                <select
                  {...register(
                    "lungCancerMedicalHistory.allergiesTreatments.allergies"
                  )}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Non">Non</option>
                  <option value="Oui">Oui</option>
                </select>
              </div>
              <input
                type="text"
                {...register(
                  "lungCancerMedicalHistory.allergiesTreatments.allergiesDetails"
                )}
                disabled={disabled}
                placeholder="Détails des allergies..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* Traitements chroniques */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Traitements chroniques
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerMedicalHistory.allergiesTreatments.chronicTreatments"
                )}
                disabled={disabled}
                placeholder="Traitements..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* Anticoagulants/Antiplaquettaires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anticoagulants/Antiplaquettaires
              </label>
              <select
                {...register(
                  "lungCancerMedicalHistory.allergiesTreatments.anticoagulantsAntiplatelets"
                )}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner...</option>
                <option value="Non">Non</option>
                <option value="Oui">Oui</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
