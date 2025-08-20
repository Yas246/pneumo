import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({
  register,
  disabled,
  watch,
}: FormSectionProps) {
  const watchAsthma = watch ? watch("bpcoMedicalHistory.asthma") : false;
  const watchBpco = watch ? watch("bpcoMedicalHistory.bpco") : false;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        III. Antécédents - Personnels médicaux
      </h3>

      {/* Antécédents respiratoires */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Antécédents respiratoires
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoMedicalHistory.asthma")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Asthme
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoMedicalHistory.bpco")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                BPCO
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoMedicalHistory.tuberculosis")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tuberculose
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoMedicalHistory.pneumonias")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Pneumonies
              </span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register(
                  "bpcoMedicalHistory.recurrentRespiratoryInfections"
                )}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Infections respiratoires à répétitions
              </span>
            </label>
          </div>

          {/* Champs conditionnels pour asthme */}
          {watchAsthma && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre d&apos;exacerbations par an (Asthme)
              </label>
              <input
                type="number"
                {...register("bpcoMedicalHistory.asthmaExacerbationsPerYear", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Ex: 2"
              />
            </div>
          )}

          {/* Champs conditionnels pour BPCO */}
          {watchBpco && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre d&apos;exacerbations par an (BPCO)
              </label>
              <input
                type="number"
                {...register("bpcoMedicalHistory.bpcoExacerbationsPerYear", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Ex: 1"
              />
            </div>
          )}
        </div>
      </div>

      {/* Exposition */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Exposition
        </h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoExposure.professionalPollutants")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Polluants professionnels
              </span>
            </label>
            {watch && watch("bpcoExposure.professionalPollutants") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoExposure.professionalPollutantsDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez les polluants professionnels..."
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoExposure.domesticPollutants")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Polluants domestiques
              </span>
            </label>
            {watch && watch("bpcoExposure.domesticPollutants") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoExposure.domesticPollutantsDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez les polluants domestiques..."
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoExposure.urbanPollutants")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Polluants urbains
              </span>
            </label>
            {watch && watch("bpcoExposure.urbanPollutants") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoExposure.urbanPollutantsDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez les polluants urbains..."
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Autres antécédents médicaux */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Autres antécédents médicaux
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoOtherMedicalHistory.gerd")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              RGO
            </span>
          </label>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoOtherMedicalHistory.hepatopathy")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hépatopathie
              </span>
            </label>
            {watch && watch("bpcoOtherMedicalHistory.hepatopathy") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoOtherMedicalHistory.hepatopathyDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez l'hépatopathie..."
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoOtherMedicalHistory.nephropathy")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Néphropathie
              </span>
            </label>
            {watch && watch("bpcoOtherMedicalHistory.nephropathy") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoOtherMedicalHistory.nephropathyDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez la néphropathie..."
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoOtherMedicalHistory.cardiopathy")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Cardiopathie
              </span>
            </label>
            {watch && watch("bpcoOtherMedicalHistory.cardiopathy") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoOtherMedicalHistory.cardiopathyDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez la cardiopathie..."
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoOtherMedicalHistory.connectiveTissueDisease")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Connectivite
              </span>
            </label>
            {watch &&
              watch("bpcoOtherMedicalHistory.connectiveTissueDisease") && (
                <div className="mt-2 ml-4">
                  <input
                    type="text"
                    {...register(
                      "bpcoOtherMedicalHistory.connectiveTissueDiseaseDetails"
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Précisez la connectivite..."
                  />
                </div>
              )}
          </div>

          <div>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("bpcoOtherMedicalHistory.neoplasia")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Néooplasie
              </span>
            </label>
            {watch && watch("bpcoOtherMedicalHistory.neoplasia") && (
              <div className="mt-2 ml-4">
                <input
                  type="text"
                  {...register("bpcoOtherMedicalHistory.neoplasiaDetails")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Précisez la néoplasie..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Autres antécédents
          </label>
          <textarea
            {...register("bpcoOtherMedicalHistory.other")}
            disabled={disabled}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Décrivez les autres antécédents..."
          />
        </div>
      </div>

      {/* Antécédents chirurgicaux */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Antécédents chirurgicaux
        </h4>
        <div>
          <textarea
            {...register("bpcoSurgicalHistory.details")}
            disabled={disabled}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Décrivez les antécédents chirurgicaux..."
          />
        </div>
      </div>

      {/* Vaccination */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Vaccination
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoVaccination.annualFlu")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Grippe annuelle
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoVaccination.pneumococcus")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Pneumocoque
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoVaccination.sarsCov2")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              SARS-CoV-2
            </span>
          </label>
        </div>
      </div>

      {/* Toxique */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Toxique
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Statut tabagique
            </label>
            <select
              {...register("bpcoToxicHistory.smokingStatus")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionnez</option>
              <option value="Fumeur">Fumeur</option>
              <option value="Ex-fumeur">Ex-fumeur</option>
              <option value="Non-fumeur">Non-fumeur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nb PA (Paquets-Années)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("bpcoToxicHistory.packYears", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Ex: 20"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoToxicHistory.cannabis")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Cannabis
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoToxicHistory.alcohol")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Alcool
            </span>
          </label>
        </div>
      </div>

      {/* Familiaux */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Familiaux
        </h4>
        <div>
          <textarea
            {...register("bpcoFamilyHistory.details")}
            disabled={disabled}
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            placeholder="Décrivez les antécédents familiaux..."
          />
        </div>
      </div>
    </div>
  );
}
