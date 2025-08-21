"use client";

import { FormSectionProps } from "../../types";

export function ClinicalExamForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        V. Examen clinique
      </h3>

      <div className="space-y-8">
        {/* 1. État général */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            1. État général
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* État de conscience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                État de conscience
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="bonneConscience"
                    {...register("asthmaGeneralState.consciousness")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Bonne conscience
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="confusion"
                    {...register("asthmaGeneralState.consciousness")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Confusion
                  </span>
                </label>
              </div>
            </div>

            {/* Signes généraux */}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                <input
                  type="checkbox"
                  {...register("asthmaGeneralState.asthenia")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Asthénie
                </span>
              </label>
              <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                <input
                  type="checkbox"
                  {...register("asthmaGeneralState.generalStateAlteration")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Altération de l&apos;état général
                </span>
              </label>
            </div>
          </div>

          {/* Signes vitaux */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                TA (mmHg)
              </label>
              <input
                type="text"
                {...register("asthmaGeneralState.bloodPressure")}
                disabled={disabled}
                placeholder="120/80"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                FC (bpm)
              </label>
              <input
                type="number"
                {...register("asthmaGeneralState.heartRate", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="75"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Température (°C)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaGeneralState.temperature", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="37.0"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SpO2 (%)
              </label>
              <input
                type="number"
                {...register("asthmaGeneralState.spO2", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="98"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>

          {/* Mensurations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Poids (kg)
              </label>
              <input
                type="number"
                {...register("asthmaGeneralState.weight", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="70"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taille (cm)
              </label>
              <input
                type="number"
                {...register("asthmaGeneralState.height", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="170"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                IMC (kg/m²)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("asthmaGeneralState.bmi", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="24.2"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 2. Appareil respiratoire */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            2. Appareil respiratoire
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Murmure vésiculaire
              </label>
              <select
                {...register("asthmaRespiratorySystem.vesicularMurmur")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="conservé">Conservé</option>
                <option value="diminué">Diminué</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anomalies auscultatoires
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="ralesCrepitants"
                    {...register(
                      "asthmaRespiratorySystem.auscultationAnomalies"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Râles crépitants
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="ronchis"
                    {...register(
                      "asthmaRespiratorySystem.auscultationAnomalies"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Ronchis
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="normale"
                    {...register(
                      "asthmaRespiratorySystem.auscultationAnomalies"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Normale
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="sibilantsExpiratoires"
                    {...register(
                      "asthmaRespiratorySystem.auscultationAnomalies"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Sibilants expiratoires
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="allongementTempsExpiratoire"
                    {...register(
                      "asthmaRespiratorySystem.auscultationAnomalies"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Allongement du temps expiratoire
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Signes de détresse respiratoire
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="dyspneeRepos"
                    {...register(
                      "asthmaRespiratorySystem.respiratoryDistressSigns"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Dyspnée au repos
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="orthopnee"
                    {...register(
                      "asthmaRespiratorySystem.respiratoryDistressSigns"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Orthopnée
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="tirage"
                    {...register(
                      "asthmaRespiratorySystem.respiratoryDistressSigns"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Tirage
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="cyanose"
                    {...register(
                      "asthmaRespiratorySystem.respiratoryDistressSigns"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Cyanose
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Syndromes pleuropulmonaires
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register(
                      "asthmaRespiratorySystem.syndromeCondensation"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Syndrome de condensation
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaRespiratorySystem.syndromePleural")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Syndrome pleural
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Localisation (Syndromes)
                </label>
                <input
                  type="text"
                  {...register("asthmaRespiratorySystem.syndromeLocation")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Autre (Appareil respiratoire)
                </label>
                <input
                  type="text"
                  {...register("asthmaRespiratorySystem.otherRespiratory")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Appareil cardiovasculaire */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            3. Appareil cardiovasculaire
          </h4>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("asthmaCardiovascularSystem.regularBdc")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                BDC réguliers
              </span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.heartMurmur")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Souffle cardiaque
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Moment du souffle
                </label>
                <select
                  {...register("asthmaCardiovascularSystem.murmurTiming")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="systolique">Systolique</option>
                  <option value="diastolique">Diastolique</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Localisation du souffle
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="apex"
                    {...register("asthmaCardiovascularSystem.murmurLocation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Apex
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="foyerAortique"
                    {...register("asthmaCardiovascularSystem.murmurLocation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Foyer aortique
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="foyerPulmonaire"
                    {...register("asthmaCardiovascularSystem.murmurLocation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Foyer pulmonaire
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="foyerTricuspidien"
                    {...register("asthmaCardiovascularSystem.murmurLocation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Foyer tricuspidien
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type de souffle
                </label>
                <select
                  {...register("asthmaCardiovascularSystem.murmurType")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="mitral">Mitral</option>
                  <option value="aortique">Aortique</option>
                  <option value="tricuspidien">Tricuspidien</option>
                  <option value="pulmonaire">Pulmonaire</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Intensité du souffle (/6)
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  {...register("asthmaCardiovascularSystem.murmurIntensity", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  placeholder="Ex: 3"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Irradiation du souffle
                </label>
                <input
                  type="text"
                  {...register("asthmaCardiovascularSystem.murmurIrradiation")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.muffledNoises")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Bruits assourdis
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "asthmaCardiovascularSystem.pericardialFriction"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Frottement péricardique
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.irregularRhythm")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Rythme irrégulier
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.lowerLimbEdema")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Œdèmes des membres inférieurs
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.rhj")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  RHJ
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.tjPlus")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  TJ+
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaCardiovascularSystem.marbling")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Marbrures
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 4. Appareil digestif */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            4. Appareil digestif
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Inspection (Abdomen)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="plat"
                    {...register("asthmaDigestiveSystem.abdomenInspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Plat
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="distendu"
                    {...register("asthmaDigestiveSystem.abdomenInspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Distendu
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="cicatrices"
                    {...register("asthmaDigestiveSystem.abdomenInspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Cicatrices
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="hernie"
                    {...register("asthmaDigestiveSystem.abdomenInspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hernie
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Palpation (Abdomen)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="souple"
                    {...register("asthmaDigestiveSystem.abdomenPalpation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Souple
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="defense"
                    {...register("asthmaDigestiveSystem.abdomenPalpation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Défense
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="contracture"
                    {...register("asthmaDigestiveSystem.abdomenPalpation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Contracture
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="masse"
                    {...register("asthmaDigestiveSystem.abdomenPalpation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Masse
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaDigestiveSystem.hepatomegaly")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hépatomégalie
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Taille (cm)
                </label>
                <input
                  type="number"
                  {...register("asthmaDigestiveSystem.hepatomegalySize", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  placeholder="Ex: 15"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaDigestiveSystem.splenomegaly")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Splénomégalie
                </span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Taille (cm)
                </label>
                <input
                  type="number"
                  {...register("asthmaDigestiveSystem.splenomegalySize", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  placeholder="Ex: 12"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Percussion (Abdomen)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaDigestiveSystem.matiteDeclive")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Matité déclive
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaDigestiveSystem.tympanisme")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Tympanisme
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Auscultation (Abdomen)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="bruitsNormaux"
                    {...register("asthmaDigestiveSystem.abdomenAuscultation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Bruits normaux
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="silence"
                    {...register("asthmaDigestiveSystem.abdomenAuscultation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Silence
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="hyperperistaltisme"
                    {...register("asthmaDigestiveSystem.abdomenAuscultation")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hyperpéristaltisme
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Appareil urinaire */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            5. Appareil urinaire
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Diurèse
              </label>
              <select
                {...register("asthmaUrinarySystem.diuresis")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="conservee">Conservée</option>
                <option value="retention">Rétention</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaUrinarySystem.bladderGlobe")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Globe vésical
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaUrinarySystem.puBuPerformed")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  PU/BU réalisé
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Signes fonctionnels urinaires
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="pollakiurie"
                    {...register("asthmaUrinarySystem.urinaryFunctionalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Pollakiurie
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="bruluresMictionnelles"
                    {...register("asthmaUrinarySystem.urinaryFunctionalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Brûlures mictionnelles
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="hematurie"
                    {...register("asthmaUrinarySystem.urinaryFunctionalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hématurie
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="douleurLombaire"
                    {...register("asthmaUrinarySystem.urinaryFunctionalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Douleur lombaire
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Résultat (PU/BU)
              </label>
              <input
                type="text"
                {...register("asthmaUrinarySystem.puBuResult")}
                disabled={disabled}
                placeholder="Résultats des analyses..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 6. Appareil locomoteur */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            6. Appareil locomoteur
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Symptômes
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="douleursArticulaires"
                    {...register("asthmaMusculoskeletalSystem.symptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Douleurs articulaires
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="arthrite"
                    {...register("asthmaMusculoskeletalSystem.symptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Arthrite
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="myalgies"
                    {...register("asthmaMusculoskeletalSystem.symptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Myalgies
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="deformation"
                    {...register("asthmaMusculoskeletalSystem.symptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Déformation
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobilité
                </label>
                <select
                  {...register("asthmaMusculoskeletalSystem.mobility")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="conservee">Conservée</option>
                  <option value="limitation">Limitation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Articulations concernées
                </label>
                <input
                  type="text"
                  {...register("asthmaMusculoskeletalSystem.affectedJoints")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Système nerveux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            7. Système nerveux
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                État de conscience
              </label>
              <select
                {...register("asthmaNervousSystem.consciousness")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="conscienceClaire">Conscience claire</option>
                <option value="somnolence">Somnolence</option>
                <option value="coma">Coma</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Signes neurologiques
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="cephalées"
                    {...register("asthmaNervousSystem.neurologicalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Céphalées
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="vomissements"
                    {...register("asthmaNervousSystem.neurologicalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Vomissements
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="raideurMeningee"
                    {...register("asthmaNervousSystem.neurologicalSigns")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Raideur méningée
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Déficit moteur
                </label>
                <input
                  type="text"
                  {...register("asthmaNervousSystem.motorDeficit")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Déficit sensitif
                </label>
                <input
                  type="text"
                  {...register("asthmaNervousSystem.sensoryDeficit")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ROT
                </label>
                <select
                  {...register("asthmaNervousSystem.rot")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="normaux">Normaux</option>
                  <option value="abolis">Abolis</option>
                  <option value="exageres">Exagérés</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description ROT
                </label>
                <input
                  type="text"
                  {...register("asthmaNervousSystem.rotDescription")}
                  disabled={disabled}
                  placeholder="Précisez..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Équilibre
                </label>
                <select
                  {...register("asthmaNervousSystem.balance")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="normal">Normal</option>
                  <option value="rombergPositif">Romberg +</option>
                  <option value="ataxie">Ataxie</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Peau et muqueuses */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            8. Peau et muqueuses
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Inspection
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="ictere"
                    {...register("asthmaSkinMucous.inspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Ictère
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="cyanose"
                    {...register("asthmaSkinMucous.inspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Cyanose
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="petechies"
                    {...register("asthmaSkinMucous.inspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Pétéchies
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="purpura"
                    {...register("asthmaSkinMucous.inspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Purpura
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="dehydration"
                    {...register("asthmaSkinMucous.inspection")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Déshydratation
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lésions dermatologiques
              </label>
              <input
                type="text"
                {...register("asthmaSkinMucous.dermatologicalLesions")}
                disabled={disabled}
                placeholder="Décrire les lésions..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 9. ORL / Yeux / Bouche */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            9. ORL / Yeux / Bouche
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Conjonctives
                </label>
                <select
                  {...register("asthmaOrlEyesMouth.conjunctiva")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="normales">Normales</option>
                  <option value="pales">Pâles</option>
                  <option value="icteriques">Ictériques</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amyagdales
                </label>
                <select
                  {...register("asthmaOrlEyesMouth.tonsils")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="hypertrophiees">Hypertrophiées</option>
                  <option value="pultacees">Pultacées</option>
                  <option value="normales">Normales</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cavité buccale
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaOrlEyesMouth.muqueusesHydratees")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Muqueuses hydratées
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaOrlEyesMouth.seches")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Sèches
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaOrlEyesMouth.lesions")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Lésions
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Symptômes ORL
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="otalgie"
                    {...register("asthmaOrlEyesMouth.orlSymptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Otalgie
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="rhinorrhee"
                    {...register("asthmaOrlEyesMouth.orlSymptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Rhinorrhée
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="adenopathiesCervicales"
                    {...register("asthmaOrlEyesMouth.orlSymptoms")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Adénopathies cervicales
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 10. Autres remarques */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            10. Autres remarques
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Autres remarques cliniques
            </label>
            <textarea
              {...register("asthmaOtherClinicalRemarks.otherClinicalRemarks")}
              disabled={disabled}
              rows={4}
              placeholder="Précisez toutes autres remarques cliniques..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
