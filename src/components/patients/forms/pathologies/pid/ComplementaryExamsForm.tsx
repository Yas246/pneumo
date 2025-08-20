import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({ register, watch }: FormSectionProps) {
  const chestXRayPerformed = watch("pidComplementaryExams.chestXRay.done");
  const chestCTPerformed = watch("pidComplementaryExams.chestCT.done");
  const handsXRayPerformed = watch("pidComplementaryExams.handXRay.done");
  const sinusCTPerformed = watch("pidComplementaryExams.sinusCT.done");

  const cbcPerformed = watch("pidComplementaryExams.biology.cbc.done");
  const biochemistryPerformed = watch(
    "pidComplementaryExams.biology.biochemistry.done"
  );
  const immunologyPerformed = watch(
    "pidComplementaryExams.biology.immunology.done"
  );
  const viralSerologiesPerformed = watch(
    "pidComplementaryExams.biology.viralSerology.done"
  );
  const microbiologyPerformed = watch(
    "pidComplementaryExams.microbiology.done"
  );
  const phthisiologyPerformed = watch(
    "pidComplementaryExams.phthisiology.done"
  );
  const bronchoscopyPerformed = watch(
    "pidComplementaryExams.bronchoscopy.done"
  );
  const histologyPerformed = watch("pidComplementaryExams.histology.done");
  const functionalAssessmentPerformed = watch(
    "pidComplementaryExams.functionalAssessment.done"
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Examens Complémentaires
      </h3>

      {/* Imagerie */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Imagerie
        </h4>

        {/* Radiographie thoracique */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.chestXRay.done"
              {...register("pidComplementaryExams.chestXRay.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.chestXRay.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Radiographie thoracique
            </label>
          </div>

          {chestXRayPerformed && (
            <div className="ml-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.chestXRay.normalFindings"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Résultats
                </label>
                <textarea
                  id="pidComplementaryExams.chestXRay.normalFindings"
                  {...register(
                    "pidComplementaryExams.chestXRay.normalFindings"
                  )}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pidComplementaryExams.chestXRay.location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Localisation
                  </label>
                  <input
                    type="text"
                    id="pidComplementaryExams.chestXRay.location"
                    {...register("pidComplementaryExams.chestXRay.location")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.imaging.chestXRay.type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="pidComplementaryExams.chestXRay.type"
                    {...register("pidComplementaryExams.chestXRay.type")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidComplementaryExams.chestXRay.distribution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Distribution
                  </label>
                  <input
                    type="text"
                    id="pidComplementaryExams.chestXRay.distribution"
                    {...register(
                      "pidComplementaryExams.chestXRay.distribution"
                    )}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scanner thoracique */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.chestCT.done"
              {...register("pidComplementaryExams.chestCT.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.chestCT.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Scanner thoracique
            </label>
          </div>

          {chestCTPerformed && (
            <div className="ml-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.chestCT.findings"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Résultats
                </label>
                <textarea
                  id="pidComplementaryExams.chestCT.findings"
                  {...register("pidComplementaryExams.chestCT.findings")}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.imaging.chestCT.location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Localisation
                  </label>
                  <input
                    type="text"
                    id="pidComplementaryExams.chestCT.location"
                    {...register("pidComplementaryExams.chestCT.location")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="complementaryExams.imaging.chestCT.type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="pidComplementaryExams.chestCT.type"
                    {...register("pidComplementaryExams.chestCT.type")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidComplementaryExams.chestCT.distribution"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Distribution
                  </label>
                  <input
                    type="text"
                    id="pidComplementaryExams.chestCT.distribution"
                    {...register("pidComplementaryExams.chestCT.distribution")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Radiographie des mains */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.handXRay.done"
              {...register("pidComplementaryExams.handXRay.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.handXRay.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Radiographie des mains
            </label>
          </div>

          {handsXRayPerformed && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="pidComplementaryExams.handXRay.findings"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultats
              </label>
              <textarea
                id="pidComplementaryExams.handXRay.findings"
                {...register("pidComplementaryExams.handXRay.findings")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Scanner des sinus */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.sinusCT.done"
              {...register("pidComplementaryExams.sinusCT.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.sinusCT.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Scanner des sinus
            </label>
          </div>

          {sinusCTPerformed && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="pidComplementaryExams.sinusCT.findings"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Résultats
              </label>
              <textarea
                id="pidComplementaryExams.sinusCT.findings"
                {...register("pidComplementaryExams.sinusCT.findings")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>
      </div>

      {/* Biologie */}
      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Biologie
        </h4>

        {/* NFS */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.biology.cbc.done"
              {...register("pidComplementaryExams.biology.cbc.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.biology.cbc.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              NFS
            </label>
          </div>

          {cbcPerformed && (
            <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.hemoglobin"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Hémoglobine (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="pidComplementaryExams.biology.cbc.hemoglobin"
                  {...register("pidComplementaryExams.biology.cbc.hemoglobin", {
                    valueAsNumber: true,
                  })}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.mcv"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  VGM (fL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="pidComplementaryExams.biology.cbc.mcv"
                  {...register("pidComplementaryExams.biology.cbc.mcv", {
                    valueAsNumber: true,
                  })}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.whiteBloodCells"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Globules blancs (/mm³)
                </label>
                <input
                  type="number"
                  id="pidComplementaryExams.biology.cbc.whiteBloodCells"
                  {...register(
                    "pidComplementaryExams.biology.cbc.whiteBloodCells",
                    { valueAsNumber: true }
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.neutrophils"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Neutrophiles (/mm³)
                </label>
                <input
                  type="number"
                  id="pidComplementaryExams.biology.cbc.neutrophils"
                  {...register(
                    "pidComplementaryExams.biology.cbc.neutrophils",
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.lymphocytes"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Lymphocytes (/mm³)
                </label>
                <input
                  type="number"
                  id="pidComplementaryExams.biology.cbc.lymphocytes"
                  {...register(
                    "pidComplementaryExams.biology.cbc.lymphocytes",
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.eosinophils"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Éosinophiles (/mm³)
                </label>
                <input
                  type="number"
                  id="pidComplementaryExams.biology.cbc.eosinophils"
                  {...register(
                    "pidComplementaryExams.biology.cbc.eosinophils",
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.cbc.platelets"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Plaquettes (/mm³)
                </label>
                <input
                  type="number"
                  id="pidComplementaryExams.biology.cbc.platelets"
                  {...register("pidComplementaryExams.biology.cbc.platelets", {
                    valueAsNumber: true,
                  })}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Biochimie */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.biology.biochemistry.done"
              {...register("pidComplementaryExams.biology.biochemistry.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.biology.biochemistry.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Biochimie
            </label>
          </div>

          {biochemistryPerformed && (
            <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.biochemistry.creatinine"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Créatinine (μmol/L)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="pidComplementaryExams.biology.biochemistry.creatinine"
                  {...register(
                    "pidComplementaryExams.biology.biochemistry.creatinine"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.biochemistry.crp"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  CRP (mg/L)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="pidComplementaryExams.biology.biochemistry.crp"
                  {...register(
                    "pidComplementaryExams.biology.biochemistry.crp",
                    { valueAsNumber: true }
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.biochemistry.vs"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  VS (mm)
                </label>
                <input
                  type="number"
                  id="pidComplementaryExams.biology.biochemistry.vs"
                  {...register(
                    "pidComplementaryExams.biology.biochemistry.vs",
                    {
                      valueAsNumber: true,
                    }
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Immunologie */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.biology.immunology.done"
              {...register("pidComplementaryExams.biology.immunology.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.biology.immunology.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Immunologie
            </label>
          </div>

          {immunologyPerformed && (
            <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.immunology.anca"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ANCA
                </label>
                <select
                  id="pidComplementaryExams.biology.immunology.anca"
                  {...register("pidComplementaryExams.biology.immunology.anca")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.immunology.ana"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ANA
                </label>
                <select
                  id="pidComplementaryExams.biology.immunology.ana"
                  {...register("pidComplementaryExams.biology.immunology.ana")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.immunology.rheumatoidFactor"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Facteur rhumatoïde
                </label>
                <select
                  id="pidComplementaryExams.biology.immunology.rheumatoidFactor"
                  {...register(
                    "pidComplementaryExams.biology.immunology.rheumatoidFactor"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.immunology.antiCcp"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Anti-CCP
                </label>
                <select
                  id="pidComplementaryExams.biology.immunology.antiCcp"
                  {...register(
                    "pidComplementaryExams.biology.immunology.antiCcp"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.immunology.otherDetails"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Autres détails
                </label>
                <textarea
                  id="pidComplementaryExams.biology.immunology.otherDetails"
                  {...register(
                    "pidComplementaryExams.biology.immunology.otherDetails"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sérologies virales */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.biology.viralSerology.done"
              {...register("pidComplementaryExams.biology.viralSerology.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.biology.viralSerology.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Sérologies virales
            </label>
          </div>

          {viralSerologiesPerformed && (
            <div className="ml-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.biology.viralSerology.hiv"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  VIH
                </label>
                <select
                  id="pidComplementaryExams.biology.viralSerology.hiv"
                  {...register(
                    "pidComplementaryExams.biology.viralSerology.hiv"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.biology.viralSerology.hbv"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  VHB
                </label>
                <select
                  id="pidComplementaryExams.biology.viralSerology.hbv"
                  {...register(
                    "pidComplementaryExams.biology.viralSerology.hbv"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.biology.viralSerology.hcv"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  VHC
                </label>
                <select
                  id="pidComplementaryExams.biology.viralSerology.hcv"
                  {...register(
                    "pidComplementaryExams.biology.viralSerology.hcv"
                  )}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Positif">Positif</option>
                  <option value="Négatif">Négatif</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Fibroscopie bronchique */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.bronchoscopy.done"
              {...register("pidComplementaryExams.bronchoscopy.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.bronchoscopy.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fibroscopie bronchique
            </label>
          </div>

          {bronchoscopyPerformed && (
            <div className="ml-6 grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.bronchoscopy.bronchialEndoscopy"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Endoscopie bronchique
                </label>
                <textarea
                  id="pidComplementaryExams.bronchoscopy.bronchialEndoscopy"
                  {...register(
                    "pidComplementaryExams.bronchoscopy.bronchialEndoscopy"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.bronchoscopy.bal"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  LBA
                </label>
                <textarea
                  id="pidComplementaryExams.bronchoscopy.bal"
                  {...register("pidComplementaryExams.bronchoscopy.bal")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Histologie */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.biology.histology.done"
              {...register("pidComplementaryExams.histology.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="complementaryExams.biology.histology..done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Histologie
            </label>
          </div>

          {histologyPerformed && (
            <div className="ml-6 grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.histology.lymphNodeBiopsy"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Biopsie ganglionnaire
                </label>
                <textarea
                  id="pidComplementaryExams.histology.lymphNodeBiopsy"
                  {...register(
                    "pidComplementaryExams.histology.lymphNodeBiopsy"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.histology.pleuralBiopsy"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Biopsie pleurale
                </label>
                <textarea
                  id="pidComplementaryExams.histology.pleuralBiopsy"
                  {...register("pidComplementaryExams.histology.pleuralBiopsy")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="complementaryExams.biology.histology.skinBiopsy"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Biopsie cutanée
                </label>
                <textarea
                  id="pidComplementaryExams.histology.skinBiopsy"
                  {...register("pidComplementaryExams.histology.skinBiopsy")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.histology.otherBiopsy"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Autre biopsie
                </label>
                <textarea
                  id="pidComplementaryExams.histology.otherBiopsy"
                  {...register("pidComplementaryExams.histology.otherBiopsy")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Microbiologie */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.biology.microbiology.done"
              {...register("pidComplementaryExams.microbiology.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="complementaryExams.biology.microbiology.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Microbiologie
            </label>
          </div>

          {microbiologyPerformed && (
            <div className="ml-6 grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.microbiology.ecbc"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ECBC
                </label>
                <textarea
                  id="pidComplementaryExams.microbiology.ecbc"
                  {...register("pidComplementaryExams.microbiology.ecbc")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.microbiology.pcr"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  PCR
                </label>
                <textarea
                  id="pidComplementaryExams.microbiology.pcr"
                  {...register("pidComplementaryExams.microbiology.pcr")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.microbiology.bkSputum"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  BK crachat
                </label>
                <textarea
                  id="pidComplementaryExams.microbiology.bkSputum"
                  {...register("pidComplementaryExams.microbiology.bkSputum")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.microbiology.otherTests"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Autres tests
                </label>
                <textarea
                  id="pidComplementaryExams.microbiology.otherTests"
                  {...register("pidComplementaryExams.microbiology.otherTests")}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Phtisiologie */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.phthisiology.done"
              {...register("pidComplementaryExams.phthisiology.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.phthisiology.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phtisiologie
            </label>
          </div>

          {phthisiologyPerformed && (
            <div className="ml-6 space-y-2">
              <label
                htmlFor="pidComplementaryExams.phthisiology.result"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Détails
              </label>
              <textarea
                id="pidComplementaryExams.phthisiology.result"
                {...register("pidComplementaryExams.phthisiology.result")}
                rows={3}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          )}
        </div>

        {/* Impact / Retentissement */}
        <div className="mb-6">
          <div className="flex items-center mb-4 space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidComplementaryExams.functionalAssessment.done"
              {...register("pidComplementaryExams.functionalAssessment.done")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidComplementaryExams.functionalAssessment.done"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Retentissement
            </label>
          </div>

          {functionalAssessmentPerformed && (
            <div className="ml-6 grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.functionalAssessment.efr"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  EFR
                </label>
                <textarea
                  id="pidComplementaryExams.functionalAssessment.efr"
                  {...register(
                    "pidComplementaryExams.functionalAssessment.efr"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.functionalAssessment.ecg"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ECG
                </label>
                <textarea
                  id="pidComplementaryExams.functionalAssessment.ecg"
                  {...register(
                    "pidComplementaryExams.functionalAssessment.ecg"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.functionalAssessment.echocardiography"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Échocardiographie
                </label>
                <textarea
                  id="pidComplementaryExams.functionalAssessment.echocardiography"
                  {...register(
                    "pidComplementaryExams.functionalAssessment.echocardiography"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.functionalAssessment.walkTest"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Test de marche
                </label>
                <textarea
                  id="pidComplementaryExams.functionalAssessment.walkTest"
                  {...register(
                    "pidComplementaryExams.functionalAssessment.walkTest"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidComplementaryExams.functionalAssessment.bloodGas"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Gaz du sang
                </label>
                <textarea
                  id="pidComplementaryExams.functionalAssessment.bloodGas"
                  {...register(
                    "pidComplementaryExams.functionalAssessment.bloodGas"
                  )}
                  rows={2}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
