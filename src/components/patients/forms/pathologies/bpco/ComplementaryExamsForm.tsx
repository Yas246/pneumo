import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";
import { ExtendedPatientFormData, FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  disabled,
  watch,
}: FormSectionProps<ExtendedPatientFormData>) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Examens complémentaires
      </h3>

      <div className="space-y-8">
        {/* Bilan à visée diagnostique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Bilan à visée diagnostique
          </h4>

          {/* EFR / spirométrie */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              EFR / spirométrie
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VEMS (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.spirometry.vems", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VEMS/CV (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.spirometry.vemsCv", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 65"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stade GOLD
                </label>
                <select
                  {...register("bpcoDiagnosticTests.spirometry.goldStage", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pléthysmographie */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Pléthysmographie
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CPT (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.plethysmography.cpt", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 5.2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VR (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.plethysmography.vr", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 2.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CRF (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.plethysmography.crf", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 3.1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Imagerie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Imagerie
          </h4>

          {/* Rx thoracique */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Rx thoracique
            </h5>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image
              </label>
              <textarea
                {...register("bpcoDiagnosticTests.chestXRay.image")}
                disabled={disabled}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Description de l'image..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Images/Vidéos
              </label>
              <MediaUploadDragDrop
                accept="image/*,video/*"
                placeholder="Glissez-déposez des images ou vidéos ici ou cliquez pour sélectionner"
                disabled={disabled}
                currentFiles={
                  watch?.("bpcoDiagnosticTests.chestXRay.imageFiles") || []
                }
                onFileSelect={(files: File[], urls?: string[]) => {
                  if (urls && urls.length > 0) {
                    // Mettre à jour le champ avec les URLs des fichiers uploadés
                    register(
                      "bpcoDiagnosticTests.chestXRay.imageFiles"
                    ).onChange({
                      target: { value: urls },
                    });
                  }
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <select
                {...register("bpcoDiagnosticTests.chestXRay.result")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="Normal">Normal</option>
                <option value="anormal">Anormal</option>
              </select>
            </div>

            {/* Détails si anormal */}
            {watch &&
              watch("bpcoDiagnosticTests.chestXRay.result") === "anormal" && (
                <div className="ml-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register(
                          "bpcoDiagnosticTests.chestXRay.abnormalDetails.distensionSigns"
                        )}
                        disabled={disabled}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Signes de distension
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register(
                          "bpcoDiagnosticTests.chestXRay.abnormalDetails.bronchialSyndrome"
                        )}
                        disabled={disabled}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sd bronchique
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register(
                          "bpcoDiagnosticTests.chestXRay.abnormalDetails.emphysema"
                        )}
                        disabled={disabled}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Emphysème
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Autres
                    </label>
                    <textarea
                      {...register(
                        "bpcoDiagnosticTests.chestXRay.otherAbnormalities"
                      )}
                      disabled={disabled}
                      rows={2}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Autres anomalies..."
                    />
                  </div>
                </div>
              )}
          </div>

          {/* TDM thoracique */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              TDM thoracique
            </h5>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vidéo
              </label>
              <textarea
                {...register("bpcoDiagnosticTests.chestCT.video")}
                disabled={disabled}
                rows={2}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Description de la vidéo..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Images/Vidéos
              </label>
              <MediaUploadDragDrop
                accept="image/*,video/*"
                placeholder="Glissez-déposez des images ou vidéos ici ou cliquez pour sélectionner"
                disabled={disabled}
                currentFiles={
                  watch?.("bpcoDiagnosticTests.chestCT.videoFiles") || []
                }
                onFileSelect={(files: File[], urls?: string[]) => {
                  if (urls && urls.length > 0) {
                    // Mettre à jour le champ avec les URLs des fichiers uploadés
                    register("bpcoDiagnosticTests.chestCT.videoFiles").onChange(
                      {
                        target: { value: urls },
                      }
                    );
                  }
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <select
                {...register("bpcoDiagnosticTests.chestCT.result")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="normal">Normal</option>
                <option value="anormal">Anormal</option>
              </select>
            </div>

            {/* Détails si anormal */}
            {watch &&
              watch("bpcoDiagnosticTests.chestCT.result") === "anormal" && (
                <div className="ml-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register(
                          "bpcoDiagnosticTests.chestCT.abnormalDetails.bronchialThickening"
                        )}
                        disabled={disabled}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Épaississement bronchique
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        {...register(
                          "bpcoDiagnosticTests.chestCT.abnormalDetails.emphysema"
                        )}
                        disabled={disabled}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Emphysème
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lésions associées : type
                    </label>
                    <textarea
                      {...register(
                        "bpcoDiagnosticTests.chestCT.associatedLesionsDetails"
                      )}
                      disabled={disabled}
                      rows={2}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Type de lésions associées..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Autres
                    </label>
                    <textarea
                      {...register(
                        "bpcoDiagnosticTests.chestCT.otherAbnormalities"
                      )}
                      disabled={disabled}
                      rows={2}
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder="Autres anomalies..."
                    />
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Bilan de retentissement */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Bilan de retentissement
          </h4>

          {/* Gaz du sang */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Gaz du sang
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  pH
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("bpcoImpactAssessment.bloodGas.ph", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 7.35"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PaO2
                </label>
                <input
                  type="number"
                  {...register("bpcoImpactAssessment.bloodGas.paO2", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PaCO2
                </label>
                <input
                  type="number"
                  {...register("bpcoImpactAssessment.bloodGas.paCO2", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 45"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Test de tolérance à la marche de 6 min
            </h5>
            <input
              type="text"
              {...register("bpcoImpactAssessment.otherTests.sixMinWalkTest")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Distance parcourue, dyspnée..."
            />
          </div>

          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              VO2 max
            </h5>
            <input
              type="text"
              {...register("bpcoImpactAssessment.otherTests.vo2Max")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Résultats VO2 max..."
            />
          </div>

          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Echo cœur - Conclusion
            </h5>
            <input
              type="text"
              {...register(
                "bpcoImpactAssessment.otherTests.echoHeartConclusion"
              )}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Conclusion échocardiographie..."
            />
          </div>

          <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Enregistrement du sommeil (PG, PSG)
            </h5>
            <input
              type="text"
              {...register("bpcoImpactAssessment.otherTests.sleepRecording")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Résultats enregistrement sommeil..."
            />
          </div>

          <div className="mb-6 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Autres (retentissement)
            </h5>
            <input
              type="text"
              {...register(
                "bpcoImpactAssessment.otherTests.otherRetentissement"
              )}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="Autres examens de retentissement..."
            />
          </div>

          {/* Bilan biologique */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Bilan biologique
            </h5>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                NFS
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.nfs")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Résultats NFS..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CRP
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.crp")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Résultats CRP..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alpha-1 AT
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.alpha1At")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Résultats Alpha-1 AT..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                D-dimères
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.dDimers")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Résultats D-dimères..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                BNP
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.bnp")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Résultats BNP..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dosage de vitD
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.vitaminD")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Résultats vitD..."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres (biologie)
              </label>
              <input
                type="text"
                {...register("bpcoDiagnosticTests.biology.otherBiology")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Autres examens biologiques..."
              />
            </div>

            {/* CBC */}
            <div className="mb-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors mb-3">
                <input
                  type="checkbox"
                  {...register("bpcoDiagnosticTests.biology.cbc.done")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  NFS - Numération formule sanguine
                </span>
              </label>

              <div className="ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hémoglobine (g/dL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("bpcoDiagnosticTests.biology.cbc.hemoglobin", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 14.2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    MCV (fL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("bpcoDiagnosticTests.biology.cbc.mcv", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 85"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Globules blancs (/mm³)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "bpcoDiagnosticTests.biology.cbc.whiteBloodCells",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 7500"
                  />
                </div>
              </div>
            </div>

            {/* Biochimie */}
            <div className="mb-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors mb-3">
                <input
                  type="checkbox"
                  {...register("bpcoDiagnosticTests.biology.biochemistry.done")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Biochimie
                </span>
              </label>

              <div className="ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Créatinine (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.creatinine",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ASAT (UI/L)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.ast",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ALAT (UI/L)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.alt",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CRP (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.crp",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 5.2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Microbiologie */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Microbiologie
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  BK expectoration
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.microbiology.bkSputum")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultat BK..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ECBU
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.microbiology.ecbc")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultat ECBU..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  PCR
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.microbiology.pcr")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultat PCR..."
                />
              </div>
            </div>
          </div>

          {/* Bronchoscopie */}
          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Bronchoscopie
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Résultats
                </label>
                <textarea
                  {...register("bpcoDiagnosticTests.bronchoscopy.findings")}
                  disabled={disabled}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats de la bronchoscopie..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LBA
                </label>
                <textarea
                  {...register("bpcoDiagnosticTests.bronchoscopy.bal")}
                  disabled={disabled}
                  rows={2}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats LBA..."
                />
              </div>
            </div>
          </div>

          {/* Évaluation fonctionnelle */}
          <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Évaluation fonctionnelle
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test de tolérance à la marche de 6 min
                </label>
                <input
                  type="text"
                  {...register(
                    "bpcoDiagnosticTests.functionalAssessment.walkTest"
                  )}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Distance parcourue, dyspnée..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ECG
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.functionalAssessment.ecg")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats ECG..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Échocardiographie
                </label>
                <input
                  type="text"
                  {...register(
                    "bpcoDiagnosticTests.functionalAssessment.echocardiography"
                  )}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats échocardiographie..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
