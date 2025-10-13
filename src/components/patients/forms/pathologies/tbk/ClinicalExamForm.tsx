"use client";

import { FormSectionProps } from "../../types";

export function ClinicalExamForm({ register, watch }: FormSectionProps) {
  const fever = watch("tbkGeneralSigns.fever");
  const weightLoss = watch("tbkGeneralSigns.weightLoss");
  const extrathoracicSigns = watch("tbkFunctionalSigns.extrathoracicSigns");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        III. Clinique
      </h3>

      <div className="space-y-8">
        {/* Signes Généraux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Signes Généraux
          </h4>
          <div className="space-y-4">
            {/* Fièvre */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkGeneralSigns.fever")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Fièvre
                </span>
              </label>

              {fever && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type
                      </label>
                      <select
                        {...register("tbkGeneralSigns.feverType")}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Non chiffrée">Non chiffrée</option>
                        <option value="Chiffrée">Chiffrée</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Valeur (°C)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register("tbkGeneralSigns.feverValue", {
                          setValueAs: (value) =>
                            value === "" ? null : Number(value),
                        })}
                        placeholder="Température"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Autres signes généraux */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkGeneralSigns.anorexia")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Anorexie
                </span>
              </label>

              {/* Amaigrissement */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("tbkGeneralSigns.weightLoss")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Amaigrissement
                  </span>
                </label>

                {weightLoss && (
                  <div className="ml-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Type
                        </label>
                        <select
                          {...register("tbkGeneralSigns.weightLossType")}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="Non chiffré">Non chiffré</option>
                          <option value="Chiffré">Chiffré</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Valeur
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...register("tbkGeneralSigns.weightLossValue", {
                            setValueAs: (value) =>
                              value === "" ? null : Number(value),
                          })}
                          placeholder="Valeur..."
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkGeneralSigns.asthenia")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Asthénie
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PS (OMS)
                </label>
                <select
                  {...register("tbkGeneralSigns.omsPs", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Signes Fonctionnels */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Signes Fonctionnels
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkFunctionalSigns.cough")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Toux
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expectorations - Aspect
                </label>
                <select
                  {...register("tbkFunctionalSigns.sputumAspect")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Muqueuses">Muqueuses</option>
                  <option value="Purulentes">Purulentes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hémoptysie - Abondance
                </label>
                <select
                  {...register("tbkFunctionalSigns.hemoptysisAbundance")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Faible">Faible</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkFunctionalSigns.thoracicPain")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Douleur thoracique
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkFunctionalSigns.dyspnea")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Dyspnée
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stade Dyspnée mMRC
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  {...register("tbkFunctionalSigns.dyspneaMmrcStage", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="0-5"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres signes fonctionnels
              </label>
              <textarea
                {...register("tbkFunctionalSigns.otherFunctionalSigns")}
                rows={3}
                placeholder="Décrivez les autres signes fonctionnels..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {/* Signes extrathoraciques */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkFunctionalSigns.extrathoracicSigns")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Signes extrathoraciques
                </span>
              </label>

              {extrathoracicSigns && (
                <div className="ml-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Précisions
                  </label>
                  <textarea
                    {...register(
                      "tbkFunctionalSigns.extrathoracicSignsDetails"
                    )}
                    rows={3}
                    placeholder="Précisez les signes extrathoraciques..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Examen Clinique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Examen Clinique
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Température (T) (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkClinicalExam.temperature", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Température"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tension Artérielle (TA)
                </label>
                <input
                  type="text"
                  {...register("tbkClinicalExam.bloodPressure")}
                  placeholder="ex: 120/80"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pouls (bat/min)
                </label>
                <input
                  type="number"
                  {...register("tbkClinicalExam.pulse", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Pouls"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Saturation O2 (%)
                </label>
                <input
                  type="number"
                  {...register("tbkClinicalExam.oxygenSaturation", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Saturation"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conjonctives - Couleur
                </label>
                <select
                  {...register("tbkClinicalExam.conjunctivaColor")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Normalement colorées">
                    Normalement colorées
                  </option>
                  <option value="Légèrement décolorées">
                    Légèrement décolorées
                  </option>
                  <option value="Décolorées">Décolorées</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  État bucco-dentaire
                </label>
                <select
                  {...register("tbkClinicalExam.oralHygiene")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Bon">Bon</option>
                  <option value="Mauvais">Mauvais</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkClinicalExam.weight", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Poids"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Taille (m)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("tbkClinicalExam.height", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Taille"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  IMC (Kg/m²)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkClinicalExam.bmi", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="IMC"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Examen pleuro-pulmonaire
                </label>
                <select
                  {...register("tbkClinicalExam.pleuroPulmonaryExam")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Normal">Normal</option>
                  <option value="Anormal">Anormal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Précisions
                </label>
                <input
                  type="text"
                  {...register("tbkClinicalExam.pleuroPulmonaryExamDetails")}
                  placeholder="Précisions..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reste de l&apos;examen clinique
                </label>
                <select
                  {...register("tbkClinicalExam.generalExam")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Normal">Normal</option>
                  <option value="Anormal">Anormal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Précisions
                </label>
                <input
                  type="text"
                  {...register("tbkClinicalExam.generalExamDetails")}
                  placeholder="Précisions..."
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
