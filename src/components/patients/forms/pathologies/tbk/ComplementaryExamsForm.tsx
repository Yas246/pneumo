"use client";

import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";
import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  watch,
  setValue,
}: FormSectionProps) {
  const thoracicCt = watch("tbkOtherAssessments.thoracicCt");
  const bronchoscopy = watch("tbkOtherAssessments.bronchoscopy");
  const pleuralPuncture = watch("tbkOtherAssessments.pleuralPuncture");
  const pleuralBiopsy = watch("tbkOtherAssessments.pleuralBiopsy");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IV. Paraclinique
      </h3>

      <div className="space-y-8">
        {/* Rx Thoracique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Rx Thoracique
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type des lésions
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  "Infiltrats",
                  "Micronodules",
                  "Nodules",
                  "Excavations",
                  "Opacités alvéolaires",
                  "Milaire",
                ].map((lesion) => (
                  <label
                    key={lesion}
                    className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={lesion}
                      {...register("tbkChestXRay.lesionTypes")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {lesion}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres lésions
              </label>
              <input
                type="text"
                {...register("tbkChestXRay.otherLesions")}
                placeholder="Autres lésions..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Étendue et siège
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  "1/3 Sup Dt",
                  "1/3 Moy Dt",
                  "1/3 Inf Dt",
                  "1/3 Sup G",
                  "1/3 Moy G",
                  "1/3 Inf G",
                ].map((location) => (
                  <label
                    key={location}
                    className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={location}
                      {...register("tbkChestXRay.extentLocation")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {location}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkChestXRay.associatedPleuralEffusion")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Lésions associées - Pleurésie
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("tbkChestXRay.associatedAdenopathies")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Lésions associées - Adénopathies
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres lésions associées
              </label>
              <input
                type="text"
                {...register("tbkChestXRay.otherAssociatedLesions")}
                placeholder="Autres lésions associées..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Images de la Rx Thoracique
              </label>
              <MediaUploadDragDrop
                onFileSelect={(files, urls) => {
                  if (urls && urls.length > 0) {
                    setValue("tbkChestXRay.imageFiles", urls);
                  }
                }}
                accept="image/*"
                placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                currentUrls={watch?.("tbkChestXRay.imageFiles") || []}
              />
            </div>
          </div>
        </div>

        {/* Bactériologie des Expectorations */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Bactériologie des Expectorations
          </h4>
          <div className="space-y-6">
            {/* Examen direct */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Examen direct (BK ED n°1, 2, 3, Autres)
              </h5>
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                >
                  <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    {num === 4 ? "Autres" : `n°${num}`}
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        {...register(
                          `tbkSputumBacteriology.directExams.${num - 1}.date`
                        )}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Résultat
                      </label>
                      <select
                        {...register(
                          `tbkSputumBacteriology.directExams.${num - 1}.result`
                        )}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Négatif">Négatif</option>
                        <option value="Positif">Positif</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Charge bactérienne
                      </label>
                      <input
                        type="text"
                        {...register(
                          `tbkSputumBacteriology.directExams.${
                            num - 1
                          }.bacterialLoad`
                        )}
                        placeholder="Charge bactérienne..."
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Culture BK */}
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Culture BK
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register("tbkSputumBacteriology.bkCulture.date")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Milieu
                  </label>
                  <select
                    {...register("tbkSputumBacteriology.bkCulture.medium")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Solide">Solide</option>
                    <option value="Liquide">Liquide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Résultat
                  </label>
                  <select
                    {...register("tbkSputumBacteriology.bkCulture.result")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Négative">Négative</option>
                    <option value="Positive">Positive</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Charge bactérienne (Nombre de colonies)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "tbkSputumBacteriology.bkCulture.bacterialLoad",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    placeholder="Nombre de colonies"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Antibiogramme */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Antibiogramme
                  </label>
                  <select
                    {...register("tbkSputumBacteriology.antibiogram")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non fait">Non fait</option>
                    <option value="Fait">Fait</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type d&apos;antibiogramme
                  </label>
                  <select
                    {...register("tbkSputumBacteriology.antibiogramType")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Direct">Direct</option>
                    <option value="Indirect">Indirect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Résultat antibiogramme
                  </label>
                  <select
                    {...register("tbkSputumBacteriology.antibiogramResult")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Sensible">Sensible</option>
                    <option value="Résistance">Résistance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Détail résistance
                  </label>
                  <input
                    type="text"
                    {...register("tbkSputumBacteriology.resistanceDetails")}
                    placeholder="Détail résistance..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (Bactériologie)
              </label>
              <textarea
                {...register("tbkSputumBacteriology.otherBacteriology")}
                rows={3}
                placeholder="Autres examens bactériologiques..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Génétique BK */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Génétique BK
          </h4>
          <div className="space-y-6">
            {/* GeneXpert */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    GeneXpert
                  </label>
                  <select
                    {...register("tbkBkGenetics.genexpert")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non fait">Non fait</option>
                    <option value="Fait">Fait</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date GeneXpert
                  </label>
                  <input
                    type="date"
                    {...register("tbkBkGenetics.genexpertDate")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ADN Mycobacterium tuberculosis
                  </label>
                  <select
                    {...register("tbkBkGenetics.mtbDna")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Absent">Absent</option>
                    <option value="Présent">Présent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sensibilité Rifampicine
                  </label>
                  <select
                    {...register("tbkBkGenetics.rifampicinSensitivity")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Sensible">Sensible</option>
                    <option value="Résistance à R">Résistance à R</option>
                  </select>
                </div>
              </div>
            </div>

            {/* HAIN */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    HAIN
                  </label>
                  <select
                    {...register("tbkBkGenetics.hain")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non fait">Non fait</option>
                    <option value="Fait">Fait</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date HAIN
                  </label>
                  <input
                    type="date"
                    {...register("tbkBkGenetics.hainDate")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sensibilité (HAIN)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {[
                    "Sensible",
                    "Résistance à R",
                    "Résistance à H",
                    "Résistance à E",
                  ].map((sensitivity) => (
                    <label
                      key={sensitivity}
                      className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        value={sensitivity}
                        {...register("tbkBkGenetics.hainSensitivity")}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {sensitivity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Autres résistances (HAIN)
                </label>
                <input
                  type="text"
                  {...register("tbkBkGenetics.hainOtherResistances")}
                  placeholder="Autres résistances..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Biologie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Biologie
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  NFS - Hb (g/dl)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.nfsHb", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Hb"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  NFS - GB (/mm³)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.nfsWbc", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="GB"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  NFS - Plaquettes (/mm³)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.nfsPlatelets", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Plaquettes"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  NFS - Lymphocytes (/mm³)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.nfsLymphocytes", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Lymphocytes"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  NFS - PNE (/mm³)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.nfsPmn", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="PNE"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VS (mm)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.esr", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="VS"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CRP (mg/l)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.crp", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="CRP"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Urée (g/l)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("tbkBiology.urea", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Urée"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Créatinine (mg/l)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.creatinine", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Créatinine"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Clairance créatinine (calculée)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.calculatedCreatinineClearance", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Clairance"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ALAT (UI/l)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.alt", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="ALAT"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PA (UI/l)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.alp", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="PA"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ratio R (ALAT/PA)
                </label>
                <select
                  {...register("tbkBiology.altAlpRatio")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="R<2">R&lt;2</option>
                  <option value="2<R<5">2&lt;R&lt;5</option>
                  <option value="R>5">R&gt;5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GGT (UI/l)
                </label>
                <input
                  type="number"
                  {...register("tbkBiology.ggt", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="GGT"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  BT (mg/l)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.totalBilirubin", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="BT"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  TP (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.prothrombinTime", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="TP"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Albumine (g/l)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.albumin", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Albumine"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sérologie HVB
                </label>
                <select
                  {...register("tbkBiology.hbvSerology")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Négative">Négative</option>
                  <option value="Positive">Positive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sérologie HVC
                </label>
                <select
                  {...register("tbkBiology.hcvSerology")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Négative">Négative</option>
                  <option value="Positive">Positive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sérologie HIV
                </label>
                <select
                  {...register("tbkBiology.hivSerology")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Négative">Négative</option>
                  <option value="Positive">Positive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hb glyquée à l&apos;admission (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("tbkBiology.admissionGlycatedHemoglobin", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  placeholder="Hb glyquée"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres bilans biologiques
              </label>
              <textarea
                {...register("tbkBiology.otherBiologicalAssessments")}
                rows={3}
                placeholder="Autres bilans biologiques..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Autres bilans paracliniques */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Autres bilans paracliniques
          </h4>
          <div className="space-y-6">
            {/* TDM Thoracique */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    TDM Thoracique
                  </label>
                  <select
                    {...register("tbkOtherAssessments.thoracicCt")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non fait">Non fait</option>
                    <option value="Fait">Fait</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date TDM
                  </label>
                  <input
                    type="date"
                    {...register("tbkOtherAssessments.thoracicCtDate")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              {thoracicCt === "Fait" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Indication TDM
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.thoracicCtIndication")}
                      rows={2}
                      placeholder="Indication..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Résultats TDM
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.thoracicCtResults")}
                      rows={3}
                      placeholder="Résultats..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de la TDM Thoracique
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "tbkOtherAssessments.thoracicCtImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.("tbkOtherAssessments.thoracicCtImages") || []
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bronchoscopie */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bronchoscopie
                  </label>
                  <select
                    {...register("tbkOtherAssessments.bronchoscopy")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non faite">Non faite</option>
                    <option value="Faite">Faite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Bronchoscopie
                  </label>
                  <input
                    type="date"
                    {...register("tbkOtherAssessments.bronchoscopyDate")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              {bronchoscopy === "Faite" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Indication Bronchoscopie
                    </label>
                    <textarea
                      {...register(
                        "tbkOtherAssessments.bronchoscopyIndication"
                      )}
                      rows={2}
                      placeholder="Indication..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Aspect macroscopique
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.macroscopicAspect")}
                      rows={2}
                      placeholder="Aspect macroscopique..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expectorations BK ED Post fibro
                      </label>
                      <select
                        {...register(
                          "tbkOtherAssessments.postFibroBkDirectExam"
                        )}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Non faite">Non faite</option>
                        <option value="Faite">Faite</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Aspiration bronchique
                      </label>
                      <select
                        {...register("tbkOtherAssessments.bronchialAspiration")}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Non faite">Non faite</option>
                        <option value="Faite">Faite</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        BK ED (Aspiration)
                      </label>
                      <select
                        {...register(
                          "tbkOtherAssessments.bronchialAspirationBkDirect"
                        )}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Négatif">Négatif</option>
                        <option value="Positif">Positif</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Charge BK
                      </label>
                      <input
                        type="text"
                        {...register(
                          "tbkOtherAssessments.bronchialAspirationBkLoad"
                        )}
                        placeholder="Charge BK..."
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        BK Culture (Aspiration)
                      </label>
                      <select
                        {...register(
                          "tbkOtherAssessments.bronchialAspirationBkCulture"
                        )}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Négatif">Négatif</option>
                        <option value="Positif">Positif</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre de colonies
                      </label>
                      <input
                        type="number"
                        {...register(
                          "tbkOtherAssessments.bronchialAspirationColonyCount",
                          {
                            setValueAs: (value) =>
                              value === "" ? null : Number(value),
                          }
                        )}
                        placeholder="Nombre de colonies"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Biopsies bronchiques
                      </label>
                      <select
                        {...register("tbkOtherAssessments.bronchialBiopsies")}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Non fait">Non fait</option>
                        <option value="Fait">Fait</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Résultat
                      </label>
                      <input
                        type="text"
                        {...register(
                          "tbkOtherAssessments.bronchialBiopsiesResult"
                        )}
                        placeholder="Résultat..."
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Autres (Bronchoscopie)
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.otherBronchoscopy")}
                      rows={2}
                      placeholder="Autres..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Résultats (Bronchoscopie)
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.bronchoscopyResults")}
                      rows={3}
                      placeholder="Résultats..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de la Bronchoscopie
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "tbkOtherAssessments.bronchoscopyImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.("tbkOtherAssessments.bronchoscopyImages") || []
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ponction pleurale */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ponction pleurale
                  </label>
                  <select
                    {...register("tbkOtherAssessments.pleuralPuncture")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non faite">Non faite</option>
                    <option value="Faite">Faite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Ponction
                  </label>
                  <input
                    type="date"
                    {...register("tbkOtherAssessments.pleuralPunctureDate")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              {pleuralPuncture === "Faite" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Aspect du liquide
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.pleuralFluidAspect")}
                      rows={2}
                      placeholder="Aspect du liquide..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Biochimie
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.pleuralBiochemistry")}
                      rows={2}
                      placeholder="Biochimie..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cytologie
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.pleuralCytology")}
                      rows={2}
                      placeholder="Cytologie..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de la Ponction Pleurale
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "tbkOtherAssessments.pleuralPunctureImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.("tbkOtherAssessments.pleuralPunctureImages") ||
                        []
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Biopsie pleurale */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Biopsie pleurale
                  </label>
                  <select
                    {...register("tbkOtherAssessments.pleuralBiopsy")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Non faite">Non faite</option>
                    <option value="Faite">Faite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Biopsie
                  </label>
                  <input
                    type="date"
                    {...register("tbkOtherAssessments.pleuralBiopsyDate")}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              </div>

              {pleuralBiopsy === "Faite" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Histologie
                    </label>
                    <textarea
                      {...register("tbkOtherAssessments.pleuralHistology")}
                      rows={2}
                      placeholder="Histologie..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Culture fragment BK
                    </label>
                    <textarea
                      {...register(
                        "tbkOtherAssessments.pleuralFragmentBkCulture"
                      )}
                      rows={2}
                      placeholder="Culture fragment BK..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de la Biopsie Pleurale
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "tbkOtherAssessments.pleuralBiopsyImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.("tbkOtherAssessments.pleuralBiopsyImages") || []
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Autres examens histologiques */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Autres examens histologiques - Type
                </label>
                <input
                  type="text"
                  {...register(
                    "tbkOtherAssessments.otherHistologicalExamsType"
                  )}
                  placeholder="Type d'examen..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Autres examens histologiques - Résultats
                </label>
                <textarea
                  {...register(
                    "tbkOtherAssessments.otherHistologicalExamsResults"
                  )}
                  rows={3}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Images des Autres Bilans Paracliniques
              </label>
              <MediaUploadDragDrop
                onFileSelect={(files, urls) => {
                  if (urls && urls.length > 0) {
                    setValue(
                      "tbkOtherAssessments.otherAssessmentsImages",
                      urls
                    );
                  }
                }}
                accept="image/*"
                placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                currentUrls={
                  watch?.("tbkOtherAssessments.otherAssessmentsImages") || []
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
