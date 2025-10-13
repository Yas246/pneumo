"use client";

import { FormSectionProps } from "../../types";

export function TreatmentForm({ register, watch }: FormSectionProps) {
  const serumDosage = watch("tbkSerumDosage.status");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        V. Traitement prescrit
      </h3>

      <div className="space-y-8">
        {/* Traitement prescrit */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Traitement prescrit
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date de début (DDT)
                </label>
                <input
                  type="date"
                  {...register("tbkPrescribedTreatment.startDate")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Régime
                </label>
                <div className="space-y-2">
                  {["2RHZE/4RH", "3RHZE/5RH", "Autre"].map((regimen) => (
                    <label
                      key={regimen}
                      className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        value={regimen}
                        {...register("tbkPrescribedTreatment.regimen")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {regimen}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Autre régime
              </label>
              <input
                type="text"
                {...register("tbkPrescribedTreatment.otherRegimen")}
                placeholder="Autre régime..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Posologie
              </label>
              <textarea
                {...register("tbkPrescribedTreatment.dosage")}
                rows={3}
                placeholder="Posologie..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres thérapeutiques
              </label>
              <textarea
                {...register("tbkPrescribedTreatment.otherTherapeutics")}
                rows={3}
                placeholder="Autres thérapeutiques..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Dosage sérique des AT */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Dosage sérique des anti-tuberculeux (AT)
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Statut
                </label>
                <select
                  {...register("tbkSerumDosage.status")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Non faite">Non faite</option>
                  <option value="Faite">Faite</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  {...register("tbkSerumDosage.date")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Indication
              </label>
              <textarea
                {...register("tbkSerumDosage.indication")}
                rows={2}
                placeholder="Indication..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            {serumDosage === "Faite" && (
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Résultats
                </h5>
                <div className="space-y-4">
                  {/* Hémie */}
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Hémie
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Réalisé
                        </label>
                        <select
                          {...register("tbkSerumDosage.hemie.performed", {
                            setValueAs: (value) => value === "true",
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        >
                          <option value="false">Non</option>
                          <option value="true">Oui</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date du dosage
                        </label>
                        <input
                          type="date"
                          {...register("tbkSerumDosage.hemie.dosageDate", {
                            setValueAs: (value) => value || null,
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pic sérique (mg/l)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...register("tbkSerumDosage.hemie.peakSerumLevel", {
                            setValueAs: (value) =>
                              value === "" ? null : Number(value),
                          })}
                          placeholder="mg/l"
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rémie */}
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Rémie
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Réalisé
                        </label>
                        <select
                          {...register("tbkSerumDosage.remie.performed", {
                            setValueAs: (value) => value === "true",
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        >
                          <option value="false">Non</option>
                          <option value="true">Oui</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date du dosage
                        </label>
                        <input
                          type="date"
                          {...register("tbkSerumDosage.remie.dosageDate", {
                            setValueAs: (value) => value || null,
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pic sérique (mg/l)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...register("tbkSerumDosage.remie.peakSerumLevel", {
                            setValueAs: (value) =>
                              value === "" ? null : Number(value),
                          })}
                          placeholder="mg/l"
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Zémie */}
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Zémie
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Réalisé
                        </label>
                        <select
                          {...register("tbkSerumDosage.zemie.performed", {
                            setValueAs: (value) => value === "true",
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        >
                          <option value="false">Non</option>
                          <option value="true">Oui</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date du dosage
                        </label>
                        <input
                          type="date"
                          {...register("tbkSerumDosage.zemie.dosageDate", {
                            setValueAs: (value) => value || null,
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pic sérique (mg/l)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...register("tbkSerumDosage.zemie.peakSerumLevel", {
                            setValueAs: (value) =>
                              value === "" ? null : Number(value),
                          })}
                          placeholder="mg/l"
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Eémie */}
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Eémie
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Réalisé
                        </label>
                        <select
                          {...register("tbkSerumDosage.emie.performed", {
                            setValueAs: (value) => value === "true",
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        >
                          <option value="false">Non</option>
                          <option value="true">Oui</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date du dosage
                        </label>
                        <input
                          type="date"
                          {...register("tbkSerumDosage.emie.dosageDate", {
                            setValueAs: (value) => value || null,
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pic sérique (mg/l)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          {...register("tbkSerumDosage.emie.peakSerumLevel", {
                            setValueAs: (value) =>
                              value === "" ? null : Number(value),
                          })}
                          placeholder="mg/l"
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
