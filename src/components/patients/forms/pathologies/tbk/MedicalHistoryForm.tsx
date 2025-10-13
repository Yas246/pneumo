"use client";

import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({ register, watch }: FormSectionProps) {
  const diabetes = watch("tbkComorbidities.diabetes");
  const renalInsufficiency = watch("tbkComorbidities.renalInsufficiency");
  const personalTuberculosisHistory = watch(
    "tbkPersonalTuberculosisHistory.personalTuberculosisHistory"
  );
  const recentContagion = watch(
    "tbkRecentTuberculosisContagion.recentContagion"
  );
  const smoking = watch("tbkToxicHabits.smoking");
  const cannabis = watch("tbkToxicHabits.cannabis");
  const alcohol = watch("tbkToxicHabits.alcohol");
  const drugAddiction = watch("tbkToxicHabits.drugAddiction");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        II. ATCD
      </h3>

      <div className="space-y-8">
        {/* Comorbidités */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Comorbidités
          </h4>
          <div className="space-y-4">
            {/* Diabète */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkComorbidities.diabetes")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Diabète
                </span>
              </label>

              {diabetes && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type
                      </label>
                      <select
                        {...register("tbkComorbidities.diabetesType")}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="DID">DID</option>
                        <option value="DNID">DNID</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Équilibre
                      </label>
                      <select
                        {...register("tbkComorbidities.diabetesBalance")}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Équilibré">Équilibré</option>
                        <option value="Non équilibré">Non équilibré</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Traitement
                    </label>
                    <input
                      type="text"
                      {...register("tbkComorbidities.diabetesTreatment")}
                      placeholder="Traitement..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Insuffisance rénale */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkComorbidities.renalInsufficiency")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Insuffisance rénale
                </span>
              </label>

              {renalInsufficiency && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Clairance créatinine
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register("tbkComorbidities.creatinineClearance", {
                          setValueAs: (value) =>
                            value === "" ? null : Number(value),
                        })}
                        placeholder="ml/min"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register("tbkComorbidities.dialysis")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Dialyse
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Autres comorbidités */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkComorbidities.hiv")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  HIV
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkComorbidities.pregnancy")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Grossesse
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres comorbidités
              </label>
              <textarea
                {...register("tbkComorbidities.otherComorbidities")}
                rows={3}
                placeholder="Décrivez les autres comorbidités..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* ATCD Personnel de Tuberculose */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            ATCD Personnel de Tuberculose
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "tbkPersonalTuberculosisHistory.personalTuberculosisHistory"
                )}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                ATCD personnel de tuberculose
              </span>
            </label>

            {personalTuberculosisHistory && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tableau des traitements (pour 3 épisodes)
                </label>
                {[1, 2, 3].map((episode) => (
                  <div
                    key={episode}
                    className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                  >
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Épisode {episode}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Traitement
                        </label>
                        <input
                          type="text"
                          {...register(
                            `tbkPersonalTuberculosisHistory.treatments.${
                              episode - 1
                            }.treatment`
                          )}
                          placeholder="Traitement..."
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Forme
                        </label>
                        <input
                          type="text"
                          {...register(
                            `tbkPersonalTuberculosisHistory.treatments.${
                              episode - 1
                            }.form`
                          )}
                          placeholder="Forme..."
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Régime
                        </label>
                        <input
                          type="text"
                          {...register(
                            `tbkPersonalTuberculosisHistory.treatments.${
                              episode - 1
                            }.regimen`
                          )}
                          placeholder="Régime..."
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date de début (DDT)
                        </label>
                        <input
                          type="date"
                          {...register(
                            `tbkPersonalTuberculosisHistory.treatments.${
                              episode - 1
                            }.startDate`
                          )}
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Évolution
                        </label>
                        <input
                          type="text"
                          {...register(
                            `tbkPersonalTuberculosisHistory.treatments.${
                              episode - 1
                            }.evolution`
                          )}
                          placeholder="Évolution..."
                          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notion de Contage Tuberculeux Récent */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Notion de Contage Tuberculeux Récent
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("tbkRecentTuberculosisContagion.recentContagion")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Contage tuberculeux récent
              </span>
            </label>

            {recentContagion && (
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sujet contact - Type
                    </label>
                    <select
                      {...register(
                        "tbkRecentTuberculosisContagion.contactType"
                      )}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="TPM+ Nv cas">TPM+ Nv cas</option>
                      <option value="TPM+ déjà traité">TPM+ déjà traité</option>
                      <option value="TB MDR">TB MDR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contage - Forme TB du contact
                    </label>
                    <select
                      {...register(
                        "tbkRecentTuberculosisContagion.contactForm"
                      )}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Pulmonaire">Pulmonaire</option>
                      <option value="Extrapulmonaire">Extrapulmonaire</option>
                      <option value="Disséminée">Disséminée</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contage - Régime TB du contact
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["2RHZE/4RH", "2RHZE/7RH", "3RHZE/5RHE", "Autre"].map(
                      (regimen) => (
                        <label
                          key={regimen}
                          className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            value={regimen}
                            {...register(
                              "tbkRecentTuberculosisContagion.contactRegimen"
                            )}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {regimen}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contage - Régime Autre
                  </label>
                  <input
                    type="text"
                    {...register(
                      "tbkRecentTuberculosisContagion.contactRegimenOther"
                    )}
                    placeholder="Autre régime..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contage - Évolution TB du contact
                  </label>
                  <select
                    {...register(
                      "tbkRecentTuberculosisContagion.contactEvolution"
                    )}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Guérison">Guérison</option>
                    <option value="Échec">Échec</option>
                    <option value="Rechute">Rechute</option>
                    <option value="Abandon">Abandon</option>
                    <option value="TTT achevé">TTT achevé</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Habitudes Toxiques */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Habitudes Toxiques
          </h4>
          <div className="space-y-6">
            {/* Tabac */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkToxicHabits.smoking")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tabac
                </span>
              </label>

              {smoking && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Paquets-années
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register("tbkToxicHabits.packYears", {
                          setValueAs: (value) =>
                            value === "" ? null : Number(value),
                        })}
                        placeholder="Paquets-années"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register("tbkToxicHabits.smokingStopped")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sevré (Tabac)
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
                  {...register("tbkToxicHabits.cannabis")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Cannabisme
                </span>
              </label>

              {cannabis && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Joints/jour
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register("tbkToxicHabits.jointsPerDay", {
                          setValueAs: (value) =>
                            value === "" ? null : Number(value),
                        })}
                        placeholder="Joints/jour"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register("tbkToxicHabits.cannabisStopped")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sevré (Cannabis)
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Alcool */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkToxicHabits.alcohol")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Alcool
                </span>
              </label>

              {alcohol && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fréquence
                      </label>
                      <select
                        {...register("tbkToxicHabits.alcoholFrequency")}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Régulier">Régulier</option>
                        <option value="Occasionnel">Occasionnel</option>
                      </select>
                    </div>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register("tbkToxicHabits.alcoholStopped")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sevré (Alcool)
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Toxicomanie */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkToxicHabits.drugAddiction")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Toxicomanie
                </span>
              </label>

              {drugAddiction && (
                <div className="ml-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type
                      </label>
                      <input
                        type="text"
                        {...register("tbkToxicHabits.drugType")}
                        placeholder="Type de toxicomanie..."
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register("tbkToxicHabits.drugStopped")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sevré (Toxicomanie)
                      </span>
                    </label>
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
