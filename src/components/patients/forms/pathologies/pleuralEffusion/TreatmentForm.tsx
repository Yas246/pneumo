import { FormSectionProps } from "../../types";

export function TreatmentForm({ register, watch }: FormSectionProps) {
  const surgery = watch("treatment.types.surgery");
  const pleuralPhysiotherapy = watch("treatment.types.pleuralPhysiotherapy");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Traitement
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Types de traitement
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.iterativePuncture"
                {...register("treatment.types.iterativePuncture")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.iterativePuncture"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ponction itérative
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.intraPleuralInfiltration"
                {...register("treatment.types.intraPleuralInfiltration")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.intraPleuralInfiltration"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Infiltration intra-pleurale
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.drainage"
                {...register("treatment.types.drainage")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.drainage"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Drainage
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.analgesics"
                {...register("treatment.types.analgesics")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.analgesics"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Antalgiques
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.antituberculosis"
                {...register("treatment.types.antituberculosis")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.antituberculosis"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Antibacillaires
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.nonSpecificAntibiotherapy"
                {...register("treatment.types.nonSpecificAntibiotherapy")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.nonSpecificAntibiotherapy"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Antibiothérapie non spécifique
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.guidedAntibiotherapy"
                {...register("treatment.types.guidedAntibiotherapy")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.guidedAntibiotherapy"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Antibiothérapie guidée
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.pleuralPhysiotherapy"
                {...register("treatment.types.pleuralPhysiotherapy")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.pleuralPhysiotherapy"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Kinésithérapie pleurale
              </label>
            </div>

            {pleuralPhysiotherapy && (
              <div className="md:col-span-2 ml-6 space-y-2">
                <label
                  htmlFor="treatment.types.physiotherapySessions"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nombre de séances
                </label>
                <input
                  type="number"
                  id="treatment.types.physiotherapySessions"
                  {...register("treatment.types.physiotherapySessions", {
                    valueAsNumber: true,
                  })}
                  className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="treatment.types.surgery"
                {...register("treatment.types.surgery")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="treatment.types.surgery"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Chirurgie
              </label>
            </div>

            {surgery && (
              <div className="md:col-span-2 ml-6">
                <div className="space-y-1 mb-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="treatment.types.surgeryType.talcage"
                      {...register("treatment.types.surgeryType.talcage")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="treatment.types.surgeryType.talcage"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Talcage
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="treatment.types.surgeryType.refreshing"
                      {...register("treatment.types.surgeryType.refreshing")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="treatment.types.surgeryType.refreshing"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Avivement
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="treatment.types.surgeryType.decortication"
                      {...register("treatment.types.surgeryType.decortication")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="treatment.types.surgeryType.decortication"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Décortication
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="treatment.types.others"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres traitements
          </label>
          <textarea
            id="treatment.types.others"
            {...register("treatment.types.others")}
            rows={2}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="treatment.startDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date de début de traitement
          </label>
          <input
            type="date"
            id="treatment.startDate"
            {...register("treatment.startDate")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="treatment.protocol"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Protocole
          </label>
          <textarea
            id="treatment.protocol"
            {...register("treatment.protocol")}
            rows={3}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
