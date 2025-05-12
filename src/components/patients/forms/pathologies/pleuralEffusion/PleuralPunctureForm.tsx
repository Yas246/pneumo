import { FormSectionProps } from "../../types";

export function PleuralPunctureForm({ register, watch }: FormSectionProps) {
  const bkED = watch("pleuralPuncture.mycoBacteriology.bkED");
  const bkCulture = watch("pleuralPuncture.mycoBacteriology.bkCulture");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Ponction pleurale
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.date"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                type="date"
                id="pleuralPuncture.date"
                {...register("pleuralPuncture.date")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.state"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                État
              </label>
              <input
                type="text"
                id="pleuralPuncture.state"
                {...register("pleuralPuncture.state")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Aspect
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.clear"
                  {...register("pleuralPuncture.aspect.clear")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.clear"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Clair
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.jc"
                  {...register("pleuralPuncture.aspect.jc")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.jc"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Jaune citrin
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.yellow"
                  {...register("pleuralPuncture.aspect.yellow")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.yellow"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Jaune
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.seroHemorrhagic"
                  {...register("pleuralPuncture.aspect.seroHemorrhagic")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.seroHemorrhagic"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Séro-hématique
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.hemorrhagic"
                  {...register("pleuralPuncture.aspect.hemorrhagic")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.hemorrhagic"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Hématique
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.troubled"
                  {...register("pleuralPuncture.aspect.troubled")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.troubled"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Trouble
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.chylous"
                  {...register("pleuralPuncture.aspect.chylous")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.chylous"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Chyleux
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.aspect.purulent"
                  {...register("pleuralPuncture.aspect.purulent")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.aspect.purulent"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Purulent
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Biochimie */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Biochimie
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.biochemistry.proteins"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Protéines (g/l)
              </label>
              <input
                type="number"
                step="0.01"
                id="pleuralPuncture.biochemistry.proteins"
                {...register("pleuralPuncture.biochemistry.proteins", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.biochemistry.ldh"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                LDH (UI/l)
              </label>
              <input
                type="number"
                id="pleuralPuncture.biochemistry.ldh"
                {...register("pleuralPuncture.biochemistry.ldh", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.biochemistry.glucose"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Glucose (g/l)
              </label>
              <input
                type="number"
                step="0.01"
                id="pleuralPuncture.biochemistry.glucose"
                {...register("pleuralPuncture.biochemistry.glucose", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="pleuralPuncture.biochemistry.others"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres paramètres biochimiques
            </label>
            <textarea
              id="pleuralPuncture.biochemistry.others"
              {...register("pleuralPuncture.biochemistry.others")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>

        {/* Cytologie */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Cytologie
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.cytology.redBloodCells"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Hématies (éléments/mm³)
              </label>
              <input
                type="number"
                id="pleuralPuncture.cytology.redBloodCells"
                {...register("pleuralPuncture.cytology.redBloodCells", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.cytology.whiteBloodCells"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Leucocytes (éléments/mm³)
              </label>
              <input
                type="number"
                id="pleuralPuncture.cytology.whiteBloodCells"
                {...register("pleuralPuncture.cytology.whiteBloodCells", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.cytology.lymphocytes"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Lymphocytes (%)
              </label>
              <input
                type="number"
                id="pleuralPuncture.cytology.lymphocytes"
                {...register("pleuralPuncture.cytology.lymphocytes", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.cytology.neutrophils"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Neutrophiles (%)
              </label>
              <input
                type="number"
                id="pleuralPuncture.cytology.neutrophils"
                {...register("pleuralPuncture.cytology.neutrophils", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pleuralPuncture.cytology.eosinophils"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Éosinophiles (%)
              </label>
              <input
                type="number"
                id="pleuralPuncture.cytology.eosinophils"
                {...register("pleuralPuncture.cytology.eosinophils", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        </div>

        {/* Mycobactériologie */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Mycobactériologie
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.mycoBacteriology.bkED"
                  {...register("pleuralPuncture.mycoBacteriology.bkED")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.mycoBacteriology.bkED"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  BK Examen direct
                </label>
              </div>

              {bkED && (
                <div className="ml-6">
                  <select
                    id="pleuralPuncture.mycoBacteriology.bkEDResult"
                    {...register("pleuralPuncture.mycoBacteriology.bkEDResult")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Positif">Positif</option>
                    <option value="Négatif">Négatif</option>
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pleuralPuncture.mycoBacteriology.bkCulture"
                  {...register("pleuralPuncture.mycoBacteriology.bkCulture")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="pleuralPuncture.mycoBacteriology.bkCulture"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  BK Culture
                </label>
              </div>

              {bkCulture && (
                <div className="ml-6">
                  <select
                    id="pleuralPuncture.mycoBacteriology.bkCultureResult"
                    {...register(
                      "pleuralPuncture.mycoBacteriology.bkCultureResult"
                    )}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Positif">Positif</option>
                    <option value="Négatif">Négatif</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="pleuralPuncture.mycoBacteriology.others"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres résultats
            </label>
            <textarea
              id="pleuralPuncture.mycoBacteriology.others"
              {...register("pleuralPuncture.mycoBacteriology.others")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>

        {/* Biopsie pleurale et autres */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="pleuralPuncture.pleuralBiopsy"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Biopsie pleurale
            </label>
            <textarea
              id="pleuralPuncture.pleuralBiopsy"
              {...register("pleuralPuncture.pleuralBiopsy")}
              rows={3}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="pleuralPuncture.evacuatedAmount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Quantité évacuée (ml)
            </label>
            <input
              type="number"
              id="pleuralPuncture.evacuatedAmount"
              {...register("pleuralPuncture.evacuatedAmount", {
                valueAsNumber: true,
              })}
              className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="pleuralPuncture.anapathResults"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Résultats anatomopathologiques
            </label>
            <textarea
              id="pleuralPuncture.anapathResults"
              {...register("pleuralPuncture.anapathResults")}
              rows={3}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
