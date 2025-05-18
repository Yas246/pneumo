import { FormSectionProps } from "../../types";

export function MedicalHistoryForm({ register, watch }: FormSectionProps) {
  const tuberculosis = watch("pidMedicalHistory.tuberculosis.present");
  const tbOtherEvolution =
    watch("pidMedicalHistory.tuberculosis.evolution") === "Autres";
  const asthma = watch("pidMedicalHistory.asthma.present");
  const chronicBronchitis = watch(
    "pidMedicalHistory.chronicBronchitis.present"
  );
  const diabetes = watch("pidMedicalHistory.diabetes.present");
  const hypertension = watch("pidMedicalHistory.hypertension.present");
  const heartDisease = watch("pidMedicalHistory.heartDisease.present");
  const systemicDisease = watch("pidMedicalHistory.systemicDisease.present");
  const neoplasia = watch("pidMedicalHistory.neoplasia.present");
  const gerd = watch("pidMedicalHistory.gerd.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Antécédents Médicaux
      </h3>

      <div className="space-y-6">
        {/* Tuberculose */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.tuberculosis.present"
              {...register("pidMedicalHistory.tuberculosis.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.tuberculosis.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tuberculose
            </label>
          </div>

          {tuberculosis && (
            <div className="pl-6 pt-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.tuberculosis.form"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Forme
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.tuberculosis.form"
                    {...register("pidMedicalHistory.tuberculosis.form")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.tuberculosis.date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="medicalHistory.tuberculosis.date"
                    {...register("pidMedicalHistory.tuberculosis.date")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="medicalHistory.tuberculosis.treatment"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Traitement
                </label>
                <input
                  type="text"
                  id="medicalHistory.tuberculosis.treatment"
                  {...register("pidMedicalHistory.tuberculosis.treatment")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="medicalHistory.tuberculosis.evolution"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Évolution
                </label>
                <select
                  id="medicalHistory.tuberculosis.evolution"
                  {...register("pidMedicalHistory.tuberculosis.evolution")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Guéri">Guéri</option>
                  <option value="Traitement achevé">Traitement achevé</option>
                  <option value="Autres">Autres</option>
                </select>
              </div>

              {tbOtherEvolution && (
                <div className="space-y-2">
                  <label
                    htmlFor="medicalHistory.tuberculosis.otherEvolution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Préciser autre évolution
                  </label>
                  <input
                    type="text"
                    id="medicalHistory.tuberculosis.otherEvolution"
                    {...register("pidMedicalHistory.tuberculosis.evolution")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Asthme */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.asthma.present"
              {...register("pidMedicalHistory.asthma.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.asthma.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Asthme
            </label>
          </div>

          {asthma && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="medicalHistory.asthma.since"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Depuis quand
                </label>
                <input
                  type="text"
                  id="medicalHistory.asthma.since"
                  {...register("pidMedicalHistory.asthma.since")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Hypersensibilité */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="medicalHistory.hypersensitivity"
            {...register("pidMedicalHistory.hypersensitivity")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="medicalHistory.hypersensitivity"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Hypersensibilité
          </label>
        </div>

        {/* Bronchite chronique */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="medicalHistory.chronicBronchitis.present"
              {...register("pidMedicalHistory.chronicBronchitis.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="medicalHistory.chronicBronchitis.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Bronchite chronique
            </label>
          </div>

          {chronicBronchitis && (
            <div className="pl-6 pt-2 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="medicalHistory.chronicBronchitis.details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Préciser
                </label>
                <input
                  type="text"
                  id="medicalHistory.chronicBronchitis.details"
                  {...register("pidMedicalHistory.chronicBronchitis.details")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="medicalHistory.chronicBronchitis.duration"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Durée
                </label>
                <input
                  type="text"
                  id="medicalHistory.chronicBronchitis.duration"
                  {...register("pidMedicalHistory.chronicBronchitis.duration")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Autres pathologies respiratoires */}
        <div className="space-y-2">
          <label
            htmlFor="medicalHistory.otherRespiratoryDiseases"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres pathologies respiratoires
          </label>
          <textarea
            id="medicalHistory.otherRespiratoryDiseases"
            {...register("pidMedicalHistory.otherRespiratoryDiseases")}
            rows={2}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>

        {/* Autres conditions médicales avec conditional rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          {/* Diabète */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicalHistory.diabetes.present"
                {...register("pidMedicalHistory.diabetes.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.diabetes.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Diabète
              </label>
            </div>
            {diabetes && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  id="medicalHistory.diabetes.details"
                  {...register("pidMedicalHistory.diabetes.details")}
                  placeholder="Préciser"
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* HTA */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicalHistory.hypertension.present"
                {...register("pidMedicalHistory.hypertension.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.hypertension.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                HTA
              </label>
            </div>
            {hypertension && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  id="medicalHistory.hypertension.details"
                  {...register("pidMedicalHistory.hypertension.details")}
                  placeholder="Préciser"
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* Cardiopathie */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicalHistory.heartDisease.present"
                {...register("pidMedicalHistory.heartDisease.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.heartDisease.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cardiopathie
              </label>
            </div>
            {heartDisease && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  id="medicalHistory.heartDisease.details"
                  {...register("pidMedicalHistory.heartDisease.details")}
                  placeholder="Préciser"
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* Maladie de système */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicalHistory.systemicDisease.present"
                {...register("pidMedicalHistory.systemicDisease.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.systemicDisease.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Maladie de système
              </label>
            </div>
            {systemicDisease && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  id="medicalHistory.systemicDisease.details"
                  {...register("pidMedicalHistory.systemicDisease.details")}
                  placeholder="Préciser"
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* Néoplasie */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicalHistory.neoplasia.present"
                {...register("pidMedicalHistory.neoplasia.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.neoplasia.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Néoplasie
              </label>
            </div>
            {neoplasia && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  id="medicalHistory.neoplasia.details"
                  {...register("pidMedicalHistory.neoplasia.details")}
                  placeholder="Préciser"
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>

          {/* RGO */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="medicalHistory.gerd.present"
                {...register("pidMedicalHistory.gerd.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="medicalHistory.gerd.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                RGO
              </label>
            </div>
            {gerd && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  id="medicalHistory.gerd.details"
                  {...register("pidMedicalHistory.gerd.details")}
                  placeholder="Préciser"
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}
          </div>
        </div>

        {/* Autres antécédents */}
        <div className="space-y-2 mt-4">
          <label
            htmlFor="medicalHistory.otherAntecedents"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres antécédents
          </label>
          <textarea
            id="medicalHistory.otherAntecedents"
            {...register("pidMedicalHistory.otherAntecedents")}
            rows={3}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
