"use client";

import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";
import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  disabled,
  watch,
  setValue,
}: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Examens paracliniques
      </h3>

      <div className="space-y-8">
        {/* Imagerie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Imagerie
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.chestXray")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Radiographie thoracique
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.chestXray") && (
                <>
                  <div className="ml-7">
                    <textarea
                      {...register(
                        "pneumothoraxComplementaryExams.chestXrayReport"
                      )}
                      disabled={disabled}
                      rows={2}
                      placeholder="Compte rendu..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div className="ml-7">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de la Radiographie thoracique
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "pneumothoraxComplementaryExams.chestXrayImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.(
                          "pneumothoraxComplementaryExams.chestXrayImages"
                        ) || []
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "pneumothoraxComplementaryExams.pleuralUltrasound"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Échographie pleurale
                </span>
              </label>

              {watch?.("pneumothoraxComplementaryExams.pleuralUltrasound") && (
                <>
                  <div className="ml-7">
                    <textarea
                      {...register(
                        "pneumothoraxComplementaryExams.pleuralUltrasoundReport"
                      )}
                      disabled={disabled}
                      rows={2}
                      placeholder="Compte rendu..."
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                  <div className="ml-7">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de l&apos;Échographie pleurale
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "pneumothoraxComplementaryExams.pleuralUltrasoundImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.(
                          "pneumothoraxComplementaryExams.pleuralUltrasoundImages"
                        ) || []
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.thoracicCtd")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  TDM thoracique
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.thoracicCtd") && (
                <>
                  <div className="ml-7">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Images de la TDM thoracique
                    </label>
                    <MediaUploadDragDrop
                      onFileSelect={(files, urls) => {
                        if (urls && urls.length > 0) {
                          setValue(
                            "pneumothoraxComplementaryExams.thoracicCtdImages",
                            urls
                          );
                        }
                      }}
                      accept="image/*"
                      placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                      currentUrls={
                        watch?.(
                          "pneumothoraxComplementaryExams.thoracicCtdImages"
                        ) || []
                      }
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Résultats imagerie globaux
              </label>
              <textarea
                {...register("pneumothoraxComplementaryExams.imagingResults")}
                disabled={disabled}
                rows={3}
                placeholder="Côté, taille, signes associés..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Biologie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Biologie
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gaz du sang (GDS)
              </label>
              <select
                {...register("pneumothoraxComplementaryExams.bloodGas")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionner</option>
                <option value="fait">Fait</option>
                <option value="nonFait">Non fait</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.nfs")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  NFS
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.nfs") && (
                <div className="ml-7">
                  <textarea
                    {...register("pneumothoraxComplementaryExams.nfsResults")}
                    disabled={disabled}
                    rows={2}
                    placeholder="Résultats NFS..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.crp")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  CRP
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.crp") && (
                <div className="ml-7">
                  <textarea
                    {...register("pneumothoraxComplementaryExams.crpResults")}
                    disabled={disabled}
                    rows={2}
                    placeholder="Résultats CRP..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.ionogram")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ionogramme / urée / créatinine
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.ionogram") && (
                <div className="ml-7">
                  <textarea
                    {...register(
                      "pneumothoraxComplementaryExams.ionogramResults"
                    )}
                    disabled={disabled}
                    rows={2}
                    placeholder="Résultats Ionogramme..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.hemostasis")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Bilan d&apos;hémostase
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.hemostasis") && (
                <div className="ml-7">
                  <textarea
                    {...register(
                      "pneumothoraxComplementaryExams.hemostasisResults"
                    )}
                    disabled={disabled}
                    rows={2}
                    placeholder="Résultats Hémostase..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("pneumothoraxComplementaryExams.bloodGroup")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Groupage - RAI
                </span>
              </label>
              {watch?.("pneumothoraxComplementaryExams.bloodGroup") && (
                <div className="ml-7">
                  <textarea
                    {...register(
                      "pneumothoraxComplementaryExams.bloodGroupResults"
                    )}
                    disabled={disabled}
                    rows={2}
                    placeholder="Résultats Groupage..."
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
