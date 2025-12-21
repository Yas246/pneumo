"use client";

import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";
import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  watch,
  setValue,
}: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Examens complémentaires
      </h3>

      <div className="space-y-8">
        {/* Radiographie thoracique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Radiographie thoracique - Signes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Syndrome bronchique"
                {...register("ddbComplementaryExams.chestXRaySigns")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Syndrome bronchique
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Clartés tubulaires à parois épaissies"
                {...register("ddbComplementaryExams.chestXRaySigns")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Clartés tubulaires à parois épaissies
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Images kystiques"
                {...register("ddbComplementaryExams.chestXRaySigns")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Images kystiques
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Opacités alvéolaires avec bronchogramme aérique"
                {...register("ddbComplementaryExams.chestXRaySigns")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Opacités alvéolaires avec bronchogramme aérique
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Pleurésie"
                {...register("ddbComplementaryExams.chestXRaySigns")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Pleurésie
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="Abcès pulmonaire"
                {...register("ddbComplementaryExams.chestXRaySigns")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Abcès pulmonaire
              </span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <MediaUploadDragDrop
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("ddbComplementaryExams.chestXRayImages", urls);
                }
              }}
              accept="image/*,video/*"
              placeholder="Glissez-déposez les images ou vidéos de la radiographie thoracique ici"
              currentUrls={
                watch?.("ddbComplementaryExams.chestXRayImages") || []
              }
            />
          </div>
        </div>

        {/* TDM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              TDM - Aspect
            </label>
            <select
              {...register("ddbComplementaryExams.ctAspect")}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionnez</option>
              <option value="DDB localisée">DDB localisée</option>
              <option value="DDB généralisée">DDB généralisée</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              TDM - Signes
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  value="Clartés tubulées"
                  {...register("ddbComplementaryExams.ctSigns")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Clartés tubulées
                </span>
              </label>
              <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  value="Images en bagues à chaton"
                  {...register("ddbComplementaryExams.ctSigns")}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Images en bagues à chaton
                </span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <MediaUploadDragDrop
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("ddbComplementaryExams.ctImages", urls);
                }
              }}
              accept="image/*,video/*"
              placeholder="Glissez-déposez les images ou vidéos du TDM ici"
              currentUrls={watch?.("ddbComplementaryExams.ctImages") || []}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            TDM - Autres anomalies
          </label>
          <textarea
            {...register("ddbComplementaryExams.ctOtherAnomalies")}
            rows={3}
            placeholder="Décrivez les autres anomalies..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* EFR */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            EFR (Exploration Fonctionnelle Respiratoire) - Trouble
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="TVO (Trouble Ventilatoire Obstructif)"
                {...register("ddbComplementaryExams.efrDisorder")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                TVO (Trouble Ventilatoire Obstructif)
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="TVR (Restrictif)"
                {...register("ddbComplementaryExams.efrDisorder")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                TVR (Restrictif)
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                value="TVM (Mixte)"
                {...register("ddbComplementaryExams.efrDisorder")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                TVM (Mixte)
              </span>
            </label>
          </div>
        </div>

        {/* Autres examens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Endoscopie bronchique - Conclusion
            </label>
            <textarea
              {...register("ddbComplementaryExams.bronchoscopyConclusion")}
              rows={3}
              placeholder="Conclusion..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <MediaUploadDragDrop
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("ddbComplementaryExams.bronchoscopyImages", urls);
                }
              }}
              accept="image/*,video/*"
              placeholder="Glissez-déposez les images ou vidéos de l'endoscopie bronchique ici"
              currentUrls={
                watch?.("ddbComplementaryExams.bronchoscopyImages") || []
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ECBC (Examen Cytobactériologique des Crachats) - Résultat
            </label>
            <textarea
              {...register("ddbComplementaryExams.ecbcResult")}
              rows={3}
              placeholder="Résultat..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <MediaUploadDragDrop
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("ddbComplementaryExams.ecbcImages", urls);
                }
              }}
              accept="image/*,video/*"
              placeholder="Glissez-déposez les images ou vidéos de l'ECBC ici"
              currentUrls={watch?.("ddbComplementaryExams.ecbcImages") || []}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gazométrie sanguine - Résultat
            </label>
            <textarea
              {...register("ddbComplementaryExams.bloodGasResult")}
              rows={3}
              placeholder="Résultat..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <MediaUploadDragDrop
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("ddbComplementaryExams.bloodGasImages", urls);
                }
              }}
              accept="image/*,video/*"
              placeholder="Glissez-déposez les images ou vidéos de la gazométrie sanguine ici"
              currentUrls={
                watch?.("ddbComplementaryExams.bloodGasImages") || []
              }
            />
          </div>
        </div>

        {/* Biologie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Biologie
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                NFS
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    value="Hyperleucocytose"
                    {...register("ddbComplementaryExams.biologyNfs")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hyperleucocytose
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    value="Leucopénie"
                    {...register("ddbComplementaryExams.biologyNfs")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Leucopénie
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    value="Anémie"
                    {...register("ddbComplementaryExams.biologyNfs")}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Anémie
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CRP
                </label>
                <select
                  {...register("ddbComplementaryExams.biologyCrp")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Normale">Normale</option>
                  <option value="Élevée">Élevée</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Protéinurie
                </label>
                <select
                  {...register("ddbComplementaryExams.biologyProteinuria")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Positif (+)">Positif (+)</option>
                  <option value="Négatif (-)">Négatif (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test à la sueur
                </label>
                <select
                  {...register("ddbComplementaryExams.biologySweatTest")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Positif (+)">Positif (+)</option>
                  <option value="Négatif (-)">Négatif (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dosage pondéral des Ig
                </label>
                <select
                  {...register("ddbComplementaryExams.biologyIgDosage")}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="Positif (+)">Positif (+)</option>
                  <option value="Négatif (-)">Négatif (-)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
