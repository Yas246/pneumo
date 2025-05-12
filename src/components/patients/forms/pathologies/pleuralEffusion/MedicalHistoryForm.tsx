import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({ register, watch }: FormSectionProps) {
  const tuberculosisPresent = watch("tuberculosis.present");
  const tbContactPresent = watch("tbContact.present");
  const pleurisyHistoryPresent = watch("pleurisyHistory.present");
  const pleurisyDiagnosed = watch("pleurisyHistory.diagnosed");
  const knownCardiopathy = watch("medicalHistory.knownCardiopathy");
  const knownCancer = watch("medicalHistory.knownCancer");
  const generalDisease = watch("medicalHistory.generalDisease");
  const chronicMedication = watch("medicalHistory.chronicMedication");
  const professionalExposure = watch("medicalHistory.professionalExposure");
  const otherDiseases = watch("medicalHistory.otherDiseases");
  const activeSmokingStatus = watch("smoking.active");
  const stoppedSmoking = watch("smoking.stopped");
  const passiveSmokingStatus = watch("smoking.passive");
  const cannabisUse = watch("substanceUse.cannabis");
  const cannabisStopped = watch("substanceUse.cannabisStopped");
  const alcoholUse = watch("substanceUse.alcohol");
  const alcoholStopped = watch("substanceUse.alcoholStopped");
  const surgicalHistory = watch("otherHistory.surgical");
  const familyHistory = watch("otherHistory.family");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Antécédents
      </h3>

      {/* Tuberculose */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="tuberculosis.present"
            {...register("tuberculosis.present")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="tuberculosis.present"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tuberculose
          </label>
        </div>

        {tuberculosisPresent && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="tuberculosis.date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                type="text"
                id="tuberculosis.date"
                {...register("tuberculosis.date")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tuberculosis.form"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Forme
              </label>
              <input
                type="text"
                id="tuberculosis.form"
                {...register("tuberculosis.form")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tuberculosis.treatment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Traitement
              </label>
              <input
                type="text"
                id="tuberculosis.treatment"
                {...register("tuberculosis.treatment")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tuberculosis.evolution"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Évolution
              </label>
              <input
                type="text"
                id="tuberculosis.evolution"
                {...register("tuberculosis.evolution")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Contage TB */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="tbContact.present"
            {...register("tbContact.present")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="tbContact.present"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contage TB
          </label>
        </div>

        {tbContactPresent && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="tbContact.who"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Qui?
              </label>
              <input
                type="text"
                id="tbContact.who"
                {...register("tbContact.who")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tbContact.form"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Forme
              </label>
              <input
                type="text"
                id="tbContact.form"
                {...register("tbContact.form")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Antécédent de pleurésie */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="pleurisyHistory.present"
            {...register("pleurisyHistory.present")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="pleurisyHistory.present"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Antécédent de pleurésie
          </label>
        </div>

        {pleurisyHistoryPresent && (
          <div className="ml-6 space-y-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="pleurisyHistory.diagnosed"
                {...register("pleurisyHistory.diagnosed")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pleurisyHistory.diagnosed"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Diagnostiquée
              </label>
            </div>

            {pleurisyDiagnosed && (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="pleurisyHistory.diagnosis"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Diagnostic
                  </label>
                  <input
                    type="text"
                    id="pleurisyHistory.diagnosis"
                    {...register("pleurisyHistory.diagnosis")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pleurisyHistory.treatment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Traitement
                  </label>
                  <input
                    type="text"
                    id="pleurisyHistory.treatment"
                    {...register("pleurisyHistory.treatment")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pleurisyHistory.evolution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Évolution
                  </label>
                  <input
                    type="text"
                    id="pleurisyHistory.evolution"
                    {...register("pleurisyHistory.evolution")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Medical History - Common conditions */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Antécédents médicaux
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.hta"
              {...register("medicalHistory.hta")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.hta"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              HTA
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.diabetes"
              {...register("medicalHistory.diabetes")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.diabetes"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Diabète
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.hepatopathy"
              {...register("medicalHistory.hepatopathy")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.hepatopathy"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hépatopathie
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.renalFailure"
              {...register("medicalHistory.renalFailure")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.renalFailure"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Insuffisance rénale
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.generalDisease"
              {...register("medicalHistory.generalDisease")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.generalDisease"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Maladie générale
            </label>
          </div>
        </div>

        {generalDisease && (
          <div className="ml-6 mb-4 space-y-2">
            <label
              htmlFor="medicalHistory.generalDiseaseType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Type
            </label>
            <input
              type="text"
              id="medicalHistory.generalDiseaseType"
              {...register("medicalHistory.generalDiseaseType")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}

        <div className="space-y-4">
          {/* Cardiopathie connue */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="medicalHistory.knownCardiopathy"
                {...register("medicalHistory.knownCardiopathy")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.knownCardiopathy"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cardiopathie connue
              </label>
            </div>

            {knownCardiopathy && (
              <div className="ml-6 space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.cardiopathyType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.cardiopathyType"
                    {...register("medicalHistory.cardiopathyType")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.cardiopathyTreatment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Traitement
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.cardiopathyTreatment"
                    {...register("medicalHistory.cardiopathyTreatment")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.cardiopathyEvolution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Évolution
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.cardiopathyEvolution"
                    {...register("medicalHistory.cardiopathyEvolution")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cancer connu */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="medicalHistory.knownCancer"
                {...register("medicalHistory.knownCancer")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.knownCancer"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cancer connu
              </label>
            </div>

            {knownCancer && (
              <div className="ml-6 space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.cancerTypeExtension"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type et extension
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.cancerTypeExtension"
                    {...register("medicalHistory.cancerTypeExtension")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.cancerTreatment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Traitement
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.cancerTreatment"
                    {...register("medicalHistory.cancerTreatment")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.cancerEvolution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Évolution
                  </label>
                  <select
                    id="medicalHistory.cancerEvolution"
                    {...register("medicalHistory.cancerEvolution")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Guéri">Guéri</option>
                    <option value="En rémission">En rémission</option>
                    <option value="En progression">En progression</option>
                    <option value="Stade palliatif">Stade palliatif</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Prise médicamenteuse chronique */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="medicalHistory.chronicMedication"
                {...register("medicalHistory.chronicMedication")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.chronicMedication"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Prise médicamenteuse chronique
              </label>
            </div>

            {chronicMedication && (
              <div className="ml-6 space-y-2">
                <label
                  htmlFor="medicalHistory.medicationMolecules"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Molécules
                </label>
                <input
                  type="text"
                  id="medicalHistory.medicationMolecules"
                  {...register("medicalHistory.medicationMolecules")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* Exposition professionnelle */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="medicalHistory.professionalExposure"
                {...register("medicalHistory.professionalExposure")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.professionalExposure"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Exposition professionnelle
              </label>
            </div>

            {professionalExposure && (
              <div className="ml-6 space-y-2">
                <label
                  htmlFor="medicalHistory.exposureDescription"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="medicalHistory.exposureDescription"
                  {...register("medicalHistory.exposureDescription")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* Autres maladies */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="medicalHistory.otherDiseases"
                {...register("medicalHistory.otherDiseases")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.otherDiseases"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Autres maladies
              </label>
            </div>

            {otherDiseases && (
              <div className="ml-6 space-y-2">
                <label
                  htmlFor="medicalHistory.otherDiseasesType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="medicalHistory.otherDiseasesType"
                  {...register("medicalHistory.otherDiseasesType")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More History Fields */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Autres antécédents
        </h4>

        {/* Tabagisme */}
        <div className="mb-6 space-y-4">
          <h5 className="text-sm font-medium text-gray-900 dark:text-white">
            Tabagisme
          </h5>

          {/* Tabagisme actif */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="smoking.active"
                {...register("smoking.active")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="smoking.active"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tabagisme actif
              </label>
            </div>

            {activeSmokingStatus && (
              <div className="ml-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smoking.type.cigarette"
                        {...register("smoking.type.cigarette")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="smoking.type.cigarette"
                        className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Cigarette
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smoking.type.chicha"
                        {...register("smoking.type.chicha")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="smoking.type.chicha"
                        className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Chicha
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smoking.type.chewingTobacco"
                        {...register("smoking.type.chewingTobacco")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="smoking.type.chewingTobacco"
                        className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Tabac chique
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smoking.type.sniffingTobacco"
                        {...register("smoking.type.sniffingTobacco")}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label
                        htmlFor="smoking.type.sniffingTobacco"
                        className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Tabac sniff
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="smoking.startAge"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Âge de début
                    </label>
                    <input
                      type="number"
                      id="smoking.startAge"
                      {...register("smoking.startAge", { valueAsNumber: true })}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="smoking.packYears"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      PA (Paquets-Années)
                    </label>
                    <input
                      type="number"
                      id="smoking.packYears"
                      {...register("smoking.packYears", {
                        valueAsNumber: true,
                      })}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="smoking.stopped"
                      {...register("smoking.stopped")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="smoking.stopped"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Sevré
                    </label>
                  </div>

                  {stoppedSmoking && (
                    <div className="ml-6 space-y-2">
                      <label
                        htmlFor="smoking.stoppedDuration"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Durée du sevrage
                      </label>
                      <input
                        type="text"
                        id="smoking.stoppedDuration"
                        {...register("smoking.stoppedDuration")}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tabagisme passif */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="smoking.passive"
                {...register("smoking.passive")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="smoking.passive"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tabagisme passif
              </label>
            </div>

            {passiveSmokingStatus && (
              <div className="ml-6 space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lieu
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smoking.passiveLocation.home"
                      {...register("smoking.passiveLocation.home")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="smoking.passiveLocation.home"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Domicile
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smoking.passiveLocation.work"
                      {...register("smoking.passiveLocation.work")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="smoking.passiveLocation.work"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Travail
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smoking.passiveLocation.publicPlace"
                      {...register("smoking.passiveLocation.publicPlace")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="smoking.passiveLocation.publicPlace"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Lieu public
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Autres substances */}
        <div className="mb-6 space-y-4">
          <h5 className="text-sm font-medium text-gray-900 dark:text-white">
            Autres substances
          </h5>

          {/* Cannabis */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="substanceUse.cannabis"
                {...register("substanceUse.cannabis")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="substanceUse.cannabis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cannabisme
              </label>
            </div>

            {cannabisUse && (
              <div className="ml-6 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="substanceUse.cannabisFrequency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Fréquence
                  </label>
                  <input
                    type="text"
                    id="substanceUse.cannabisFrequency"
                    {...register("substanceUse.cannabisFrequency")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="substanceUse.cannabisStopped"
                      {...register("substanceUse.cannabisStopped")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="substanceUse.cannabisStopped"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Sevré
                    </label>
                  </div>

                  {cannabisStopped && (
                    <div className="ml-6 space-y-2">
                      <label
                        htmlFor="substanceUse.cannabisStoppedDuration"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Durée du sevrage
                      </label>
                      <input
                        type="text"
                        id="substanceUse.cannabisStoppedDuration"
                        {...register("substanceUse.cannabisStoppedDuration")}
                        className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Alcool */}
          <div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="substanceUse.alcohol"
                {...register("substanceUse.alcohol")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="substanceUse.alcohol"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Alcool
              </label>
            </div>

            {alcoholUse && (
              <div className="ml-6 space-y-3">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="substanceUse.alcoholStopped"
                    {...register("substanceUse.alcoholStopped")}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="substanceUse.alcoholStopped"
                    className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Sevré
                  </label>
                </div>

                {alcoholStopped && (
                  <div className="ml-6 space-y-2">
                    <label
                      htmlFor="substanceUse.alcoholStoppedDuration"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Durée du sevrage
                    </label>
                    <input
                      type="text"
                      id="substanceUse.alcoholStoppedDuration"
                      {...register("substanceUse.alcoholStoppedDuration")}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Gynéco-obstétrique */}
        <div className="mb-6">
          <div className="space-y-2">
            <label
              htmlFor="otherHistory.gynecoObstetric"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Gynéco-obstétrique
            </label>
            <textarea
              id="otherHistory.gynecoObstetric"
              {...register("otherHistory.gynecoObstetric")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>

        {/* Antécédents chirurgicaux */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="otherHistory.surgical"
              {...register("otherHistory.surgical")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="otherHistory.surgical"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Antécédents chirurgicaux
            </label>
          </div>

          {surgicalHistory && (
            <div className="ml-6 space-y-2">
              <textarea
                id="otherHistory.surgicalDetails"
                {...register("otherHistory.surgicalDetails")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Antécédents familiaux */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="otherHistory.family"
              {...register("otherHistory.family")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="otherHistory.family"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Antécédents familiaux
            </label>
          </div>

          {familyHistory && (
            <div className="ml-6 space-y-2">
              <textarea
                id="otherHistory.familyDetails"
                {...register("otherHistory.familyDetails")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
