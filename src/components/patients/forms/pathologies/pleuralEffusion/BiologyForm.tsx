import { FormSectionProps } from "../../types";

export function BiologyForm({ register, watch }: FormSectionProps) {
  const idrt = watch("biology.idrt");
  const quantiferon = watch("biology.quantiferon");
  const bkEDSputum = watch("biology.bkEDSputum");
  const bkCSputum = watch("biology.bkCSputum");
  const geneXpert = watch("biology.geneXpert");
  const bnp = watch("biology.bnp");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Biologie
      </h3>

      <div className="space-y-6">
        {/* IDR à la tuberculine */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="biology.idrt"
              {...register("biology.idrt")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="biology.idrt"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              IDR à la tuberculine
            </label>
          </div>

          {idrt && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="biology.idrtResult"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultat (mm)
              </label>
              <input
                type="number"
                id="biology.idrtResult"
                {...register("biology.idrtResult", { valueAsNumber: true })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Quantiferon */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="biology.quantiferon"
              {...register("biology.quantiferon")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="biology.quantiferon"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Quantiferon
            </label>
          </div>

          {quantiferon && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="biology.quantiferonResult"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultat
              </label>
              <select
                id="biology.quantiferonResult"
                {...register("biology.quantiferonResult")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              >
                <option value="">Sélectionner</option>
                <option value="Positif">Positif</option>
                <option value="Négatif">Négatif</option>
              </select>
            </div>
          )}
        </div>

        {/* BK ED des expectorations */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="biology.bkEDSputum"
              {...register("biology.bkEDSputum")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="biology.bkEDSputum"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              BK ED des expectorations
            </label>
          </div>

          {bkEDSputum && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="biology.bkEDSputumResult"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultat
              </label>
              <input
                type="text"
                id="biology.bkEDSputumResult"
                {...register("biology.bkEDSputumResult")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* BK Culture des expectorations */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="biology.bkCSputum"
              {...register("biology.bkCSputum")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="biology.bkCSputum"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              BK Culture des expectorations
            </label>
          </div>

          {bkCSputum && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="biology.bkCSputumResult"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultat
              </label>
              <input
                type="text"
                id="biology.bkCSputumResult"
                {...register("biology.bkCSputumResult")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* GeneXpert */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="biology.geneXpert"
              {...register("biology.geneXpert")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="biology.geneXpert"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              GeneXpert
            </label>
          </div>

          {geneXpert && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="biology.geneXpertResult"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultat
              </label>
              <input
                type="text"
                id="biology.geneXpertResult"
                {...register("biology.geneXpertResult")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Numération Formule Sanguine */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Numération Formule Sanguine
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="biology.cbc.hemoglobin"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Hémoglobine (g/dl)
              </label>
              <input
                type="number"
                step="0.1"
                id="biology.cbc.hemoglobin"
                {...register("biology.cbc.hemoglobin", { valueAsNumber: true })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="biology.cbc.whiteBloodCells"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Leucocytes (éléments/mm³)
              </label>
              <input
                type="number"
                id="biology.cbc.whiteBloodCells"
                {...register("biology.cbc.whiteBloodCells", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="biology.cbc.platelets"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Plaquettes (/mm³)
              </label>
              <input
                type="number"
                id="biology.cbc.platelets"
                {...register("biology.cbc.platelets", {
                  valueAsNumber: true,
                })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        </div>

        {/* Autres paramètres biologiques */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Autres paramètres biologiques
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="biology.crp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                CRP (mg/l)
              </label>
              <input
                type="number"
                step="0.1"
                id="biology.crp"
                {...register("biology.crp", { valueAsNumber: true })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="biology.esr"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                VS (mm)
              </label>
              <input
                type="number"
                id="biology.esr"
                {...register("biology.esr", { valueAsNumber: true })}
                className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="biology.hivSerology"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sérologie VIH
              </label>
              <select
                id="biology.hivSerology"
                {...register("biology.hivSerology")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              >
                <option value="">Sélectionner</option>
                <option value="Non demandée">Non demandée</option>
                <option value="Positive">Positive</option>
                <option value="Négative">Négative</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="biology.bnp"
                  {...register("biology.bnp")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="biology.bnp"
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  BNP
                </label>
              </div>

              {bnp && (
                <div className="mt-2">
                  <input
                    type="number"
                    id="biology.bnpValue"
                    {...register("biology.bnpValue", { valueAsNumber: true })}
                    className="block w-full sm:w-32 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Autres résultats biologiques */}
        <div className="space-y-2">
          <label
            htmlFor="biology.otherBiology"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres résultats biologiques
          </label>
          <textarea
            id="biology.otherBiology"
            {...register("biology.otherBiology")}
            rows={3}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
