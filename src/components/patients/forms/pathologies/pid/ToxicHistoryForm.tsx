import { FormSectionProps } from "../../types";

export function ToxicHistoryForm({ register, watch }: FormSectionProps) {
  const smoking = watch("pidToxicHistory.smoking.present");
  const longTermMedication = watch(
    "pidToxicHistory.longTermMedication.present"
  );
  const drugAddiction = watch("pidToxicHistory.drugAddiction.present");
  const medicinalPlants = watch("pidToxicHistory.medicinalPlants.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Antécédents Toxiques
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          {/* Tabagisme */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pidToxicHistory.smoking.present"
                {...register("pidToxicHistory.smoking.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidToxicHistory.smoking.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tabagisme
              </label>
            </div>

            {smoking && (
              <div className="pl-6 pt-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pidToxicHistory.smoking.type.active"
                      {...register("pidToxicHistory.smoking.type.active")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidToxicHistory.smoking.type.active"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Actif
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pidToxicHistory.smoking.type.passive"
                      {...register("pidToxicHistory.smoking.type.passive")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidToxicHistory.smoking.type.passive"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Passif
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="toxicHistory.smoking.packYears"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      PA
                    </label>
                    <input
                      type="number"
                      id="pidToxicHistory.smoking.packYears"
                      {...register("pidToxicHistory.smoking.packYears", {
                        valueAsNumber: true,
                      })}
                      className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="toxicHistory.smoking.startAge"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Âge de début
                    </label>
                    <input
                      type="number"
                      id="pidToxicHistory.smoking.startAge"
                      {...register("pidToxicHistory.smoking.startAge", {
                        valueAsNumber: true,
                      })}
                      className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pidToxicHistory.smoking.stopped"
                      {...register("pidToxicHistory.smoking.stopped")}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidToxicHistory.smoking.stopped"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Sevré
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Alcoolisme */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pidToxicHistory.alcoholism"
              {...register("pidToxicHistory.alcoholism")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidToxicHistory.alcoholism"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Alcoolisme
            </label>
          </div>

          {/* Toxicomanie */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="  pidToxicHistory.drugAddiction.present"
                {...register("pidToxicHistory.drugAddiction.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidToxicHistory.drugAddiction.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Toxicomanie
              </label>
            </div>

            {drugAddiction && (
              <div className="pl-6 pt-2">
                <div className="space-y-2">
                  <label
                    htmlFor="pidToxicHistory.drugAddiction.details"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Préciser
                  </label>
                  <input
                    type="text"
                    id="pidToxicHistory.drugAddiction.details"
                    {...register("pidToxicHistory.drugAddiction.details")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Médicaments au long cours */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pidToxicHistory.longTermMedication.present"
                {...register("pidToxicHistory.longTermMedication.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidToxicHistory.longTermMedication.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Médicaments au long cours
              </label>
            </div>

            {longTermMedication && (
              <div className="pl-6 pt-2 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="toxicHistory.longTermMedication.products"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Produits
                  </label>
                  <input
                    type="text"
                    id="pidToxicHistory.longTermMedication.products"
                    {...register("pidToxicHistory.longTermMedication.products")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="toxicHistory.longTermMedication.duration"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Durée
                  </label>
                  <input
                    type="text"
                    id="pidToxicHistory.longTermMedication.duration"
                    {...register("pidToxicHistory.longTermMedication.duration")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Plantes médicinales */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pidToxicHistory.medicinalPlants.present"
                {...register("pidToxicHistory.medicinalPlants.present")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="pidToxicHistory.medicinalPlants.present"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Plantes médicinales
              </label>
            </div>

            {medicinalPlants && (
              <div className="pl-6 pt-2">
                <div className="space-y-2">
                  <label
                    htmlFor="pidToxicHistory.medicinalPlants.details"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Préciser
                  </label>
                  <input
                    type="text"
                    id="pidToxicHistory.medicinalPlants.details"
                    {...register("pidToxicHistory.medicinalPlants.details")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
