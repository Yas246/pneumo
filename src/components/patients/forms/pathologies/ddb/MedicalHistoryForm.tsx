"use client";

import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({ register, watch }: FormSectionProps) {
  const passiveSmoking = watch("ddbToxicHistory.passiveSmoking");
  const cannabis = watch("ddbToxicHistory.cannabis");
  const alcohol = watch("ddbToxicHistory.alcohol");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        III. Antécédents
      </h3>

      <div className="space-y-8">
        {/* Antécédents médicaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Médicaux
          </h4>
          <div className="space-y-4">
            {/* Infections respiratoires de l&apos;enfance */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "ddbMedicalHistory.childhoodRespiratoryInfections"
                  )}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Infections respiratoires de l&apos;enfance
                </span>
              </label>

              {/* {childhoodRespiratoryInfections && ( */}
              <div className="ml-6 space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Infections de l&apos;enfance (si oui)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      value="Viroses"
                      {...register("ddbMedicalHistory.childhoodInfections")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Viroses
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      value="Rougeole"
                      {...register("ddbMedicalHistory.childhoodInfections")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Rougeole
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      value="Coqueluche"
                      {...register("ddbMedicalHistory.childhoodInfections")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Coqueluche
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      value="HIV"
                      {...register("ddbMedicalHistory.childhoodInfections")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      HIV
                    </span>
                  </label>
                </div>
              </div>
              {/* )} */}
            </div>

            {/* Autres conditions médicales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.cysticFibrosis")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mucoviscidose
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.immuneDeficiency")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Déficit Immunitaire
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.toxicInhalation")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Inhalation de produits toxiques
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.tuberculosis")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tuberculose
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.tuberculosisContagion")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Contage tuberculeux
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.recurrentSinusitis")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Sinusites à répétition
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.crohnDisease")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  RCH (Rectocolite Hémorragique)
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.infertility")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Infertilité
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.lymphoma")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Lymphome
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbMedicalHistory.asthma")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Asthme
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Antécédents chirurgicaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Chirurgicaux
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Antécédents chirurgicaux
            </label>
            <textarea
              {...register("ddbMedicalHistory.surgicalHistory")}
              rows={3}
              placeholder="Décrivez les antécédents chirurgicaux..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Antécédents gynéco-obstétricaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Gynéco-obstétricaux
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Antécédents Gynéco-obstétricaux
            </label>
            <textarea
              {...register("ddbMedicalHistory.gynecoObstetricHistory")}
              rows={3}
              placeholder="Décrivez les antécédents gynéco-obstétricaux..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Antécédents familiaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Familiaux
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("ddbMedicalHistory.consanguinity")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Consanguinité
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("ddbMedicalHistory.familyInfertility")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Infertilité (familiale)
              </span>
            </label>
          </div>
        </div>

        {/* Toxiques */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Toxiques
          </h4>
          <div className="space-y-6">
            {/* Tabagisme Actif */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbToxicHistory.activeSmoking")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tabagisme Actif
                </span>
              </label>

              {/* {activeSmoking && ( */}
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type de tabac
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <input
                          type="checkbox"
                          value="Cigarette"
                          {...register("ddbToxicHistory.smokingType")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Cigarette
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <input
                          type="checkbox"
                          value="Chicha"
                          {...register("ddbToxicHistory.smokingType")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Chicha
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <input
                          type="checkbox"
                          value="Tabac chiqué"
                          {...register("ddbToxicHistory.smokingType")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Tabac chiqué
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <input
                          type="checkbox"
                          value="Tabac sniffé"
                          {...register("ddbToxicHistory.smokingType")}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Tabac sniffé
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Âge de début / Paquets-Années
                      </label>
                      <input
                        type="number"
                        {...register("ddbToxicHistory.smokingStartAge", {
                          setValueAs: (value) =>
                            value === "" ? null : Number(value),
                        })}
                        placeholder="Âge de début"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                      <input
                        type="number"
                        step="0.1"
                        {...register("ddbToxicHistory.packYears", {
                          setValueAs: (value) =>
                            value === "" ? null : Number(value),
                        })}
                        placeholder="Paquets-Années"
                        className="block w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register("ddbToxicHistory.smokingStopped")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sevré (Tabac)
                      </span>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Durée de sevrage (Tabac)
                      </label>
                      <input
                        type="text"
                        {...register("ddbToxicHistory.smokingStoppedDuration")}
                        placeholder="Durée..."
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>

            {/* Tabagisme passif */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbToxicHistory.passiveSmoking")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tabagisme passif
                </span>
              </label>

              {passiveSmoking && (
                <div className="ml-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lieu (Tabagisme passif)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        value="Domicile"
                        {...register("ddbToxicHistory.passiveSmokingLocation")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Domicile
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        value="Travail"
                        {...register("ddbToxicHistory.passiveSmokingLocation")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Travail
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        value="Lieu public (café)"
                        {...register("ddbToxicHistory.passiveSmokingLocation")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Lieu public (café)
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Cannabisme */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbToxicHistory.cannabis")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Cannabisme
                </span>
              </label>

              {cannabis && (
                <div className="ml-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Consommation (Cannabis)
                    </label>
                    <input
                      type="text"
                      {...register("ddbToxicHistory.cannabisConsumption")}
                      placeholder="Ex: X joints/j"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      {...register("ddbToxicHistory.cannabisStopped")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Sevré (Cannabis)
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Durée de sevrage (Cannabis)
                    </label>
                    <input
                      type="text"
                      {...register("ddbToxicHistory.cannabisStoppedDuration")}
                      placeholder="Durée..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Alcool */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("ddbToxicHistory.alcohol")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Alcool
                </span>
              </label>

              {alcohol && (
                <div className="ml-6 space-y-4">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      {...register("ddbToxicHistory.alcoholStopped")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Sevré (Alcool)
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Durée de sevrage (Alcool)
                    </label>
                    <input
                      type="text"
                      {...register("ddbToxicHistory.alcoholStoppedDuration")}
                      placeholder="Durée..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
