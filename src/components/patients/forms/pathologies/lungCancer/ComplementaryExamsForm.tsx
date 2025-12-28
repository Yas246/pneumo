"use client";

import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";
import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  disabled,
  watch,
  setValue,
}: FormSectionProps) {
  // Surveiller l'état des checkboxes pour afficher conditionnellement les champs de résultats
  // Section 6.1 Imagerie thoracique
  const chestXRay = watch(
    "lungCancerComplementaryExams.thoracicImaging.chestXRay"
  );
  const tapCt = watch("lungCancerComplementaryExams.thoracicImaging.tapCt");
  const brainMri = watch(
    "lungCancerComplementaryExams.thoracicImaging.brainMri"
  );
  const petCt = watch("lungCancerComplementaryExams.thoracicImaging.petCt");
  const pleuralUltrasound = watch(
    "lungCancerComplementaryExams.thoracicImaging.pleuralUltrasound"
  );

  // Section 6.2 Endoscopie / prélèvements
  const bronchoscopy = watch(
    "lungCancerComplementaryExams.endoscopyBiopsies.bronchoscopy"
  );
  const bronchialBiopsies = watch(
    "lungCancerComplementaryExams.endoscopyBiopsies.bronchialBiopsies"
  );
  const balCytology = watch(
    "lungCancerComplementaryExams.endoscopyBiopsies.balCytology"
  );
  const ebus = watch("lungCancerComplementaryExams.endoscopyBiopsies.ebus");
  const ctGuidedBiopsy = watch(
    "lungCancerComplementaryExams.endoscopyBiopsies.ctGuidedBiopsy"
  );
  const diagnosticPleuralPuncture = watch(
    "lungCancerComplementaryExams.endoscopyBiopsies.diagnosticPleuralPuncture"
  );
  const lymphNodeBiopsy = watch(
    "lungCancerComplementaryExams.endoscopyBiopsies.lymphNodeBiopsy"
  );

  // Section 6.3 Biologie (bilan initial)
  const cbc = watch("lungCancerComplementaryExams.initialBiology.cbc");
  const crp = watch("lungCancerComplementaryExams.initialBiology.crp");
  const ionogramUreaCreatinine = watch(
    "lungCancerComplementaryExams.initialBiology.ionogramUreaCreatinine"
  );
  const liverFunction = watch(
    "lungCancerComplementaryExams.initialBiology.liverFunction"
  );
  const hemostasis = watch(
    "lungCancerComplementaryExams.initialBiology.hemostasis"
  );
  const tumorMarkers = watch(
    "lungCancerComplementaryExams.initialBiology.tumorMarkers"
  );

  // Section 6.4 Bilan pré-thérapeutique
  const pftSpirometry = watch(
    "lungCancerComplementaryExams.preTherapeuticAssessment.pftSpirometry"
  );
  const dlco = watch(
    "lungCancerComplementaryExams.preTherapeuticAssessment.dlco"
  );
  const bloodGas = watch(
    "lungCancerComplementaryExams.preTherapeuticAssessment.bloodGas"
  );
  const ecg = watch(
    "lungCancerComplementaryExams.preTherapeuticAssessment.ecg"
  );
  const echocardiography = watch(
    "lungCancerComplementaryExams.preTherapeuticAssessment.echocardiography"
  );
  const anestheticEvaluation = watch(
    "lungCancerComplementaryExams.preTherapeuticAssessment.anestheticEvaluation"
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Examens paracliniques
      </h3>

      <div className="space-y-8">
        {/* 6.1 Imagerie thoracique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            6.1 Imagerie thoracique
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.chestXRay"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Radiographie thoracique
                </span>
              </label>
              {chestXRay && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.chestXRayReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {chestXRay && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la Radiographie thoracique
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.thoracicImaging.chestXRayImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.thoracicImaging.chestXRayImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.tapCt"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  TDM TAP
                </span>
              </label>
              {tapCt && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.tapCtReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {tapCt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la TDM TAP
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.thoracicImaging.tapCtImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.thoracicImaging.tapCtImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.brainMri"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  IRM cérébrale
                </span>
              </label>
              {brainMri && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.brainMriReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {brainMri && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de l&apos;IRM cérébrale
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.thoracicImaging.brainMriImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.thoracicImaging.brainMriImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.petCt"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  TEP-TDM
                </span>
              </label>
              {petCt && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.petCtReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {petCt && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la TEP-TDM
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.thoracicImaging.petCtImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.thoracicImaging.petCtImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.pleuralUltrasound"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Échographie pleurale
                </span>
              </label>
              {pleuralUltrasound && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.thoracicImaging.pleuralUltrasoundReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {pleuralUltrasound && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de l&apos;Échographie pleurale
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.thoracicImaging.pleuralUltrasoundImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.thoracicImaging.pleuralUltrasoundImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autre
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.thoracicImaging.other"
                )}
                disabled={disabled}
                placeholder="Autre..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Images des Autres imageries
              </label>
              <MediaUploadDragDrop
                onFileSelect={(files, urls) => {
                  if (urls && urls.length > 0) {
                    setValue(
                      "lungCancerComplementaryExams.thoracicImaging.otherImages",
                      urls
                    );
                  }
                }}
                accept="image/*"
                placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                currentUrls={
                  watch?.(
                    "lungCancerComplementaryExams.thoracicImaging.otherImages"
                  ) || []
                }
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* 6.2 Endoscopie / prélèvements */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            6.2 Endoscopie / prélèvements
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.bronchoscopy"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Bronchoscopie
                </span>
              </label>
              {bronchoscopy && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.bronchoscopyReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {bronchoscopy && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la Bronchoscopie
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.bronchoscopyImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.bronchoscopyImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.bronchialBiopsies"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Biopsies bronchiques
                </span>
              </label>
              {bronchialBiopsies && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.bronchialBiopsiesReport"
                  )}
                  disabled={disabled}
                  placeholder="Rapport..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {bronchialBiopsies && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images des Biopsies bronchiques
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.bronchialBiopsiesImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.bronchialBiopsiesImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.balCytology"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Cytologie LBA
                </span>
              </label>
              {balCytology && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.balCytologyResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {balCytology && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la Cytologie LBA
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.balCytologyImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.balCytologyImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.ebus"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  EBUS
                </span>
              </label>
              {ebus && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.ebusResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {ebus && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de l&apos;EBUS
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.ebusImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.ebusImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.ctGuidedBiopsy"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Biopsie sous TDM
                </span>
              </label>
              {ctGuidedBiopsy && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.ctGuidedBiopsyResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {ctGuidedBiopsy && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la Biopsie scanno-guidée
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.ctGuidedBiopsyImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.ctGuidedBiopsyImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.diagnosticPleuralPuncture"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ponction pleurale diagnostique
                </span>
              </label>
              {diagnosticPleuralPuncture && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.diagnosticPleuralPunctureResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.lymphNodeBiopsy"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Biopsie ganglionnaire
                </span>
              </label>
              {lymphNodeBiopsy && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.endoscopyBiopsies.lymphNodeBiopsyResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            {diagnosticPleuralPuncture && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la Ponction pleurale diagnostique
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.diagnosticPleuralPunctureImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.diagnosticPleuralPunctureImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            {lymphNodeBiopsy && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images de la Biopsie ganglionnaire
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue(
                        "lungCancerComplementaryExams.endoscopyBiopsies.lymphNodeBiopsyImages",
                        urls
                      );
                    }
                  }}
                  accept="image/*"
                  placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                  currentUrls={
                    watch?.(
                      "lungCancerComplementaryExams.endoscopyBiopsies.lymphNodeBiopsyImages"
                    ) || []
                  }
                  disabled={disabled}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Images de l&apos;Anatomopathologie
              </label>
              <MediaUploadDragDrop
                onFileSelect={(files, urls) => {
                  if (urls && urls.length > 0) {
                    setValue(
                      "lungCancerComplementaryExams.pathology.pathologyImages",
                      urls
                    );
                  }
                }}
                accept="image/*"
                placeholder="Glissez-déposez des images ou cliquez pour sélectionner"
                currentUrls={
                  watch?.(
                    "lungCancerComplementaryExams.pathology.pathologyImages"
                  ) || []
                }
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Anatomo-pathologie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Anatomo-pathologie
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type histologique
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.pathology.histologicalType"
                )}
                disabled={disabled}
                placeholder="Type..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sous-type CBNPC
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.pathology.nsclcSubtype"
                )}
                disabled={disabled}
                placeholder="Sous-type..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Biologie moléculaire
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.pathology.molecularBiology"
                )}
                disabled={disabled}
                placeholder="Biologie..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autre
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.pathology.otherMolecular"
                )}
                disabled={disabled}
                placeholder="Autre..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 6.3 Biologie (bilan initial) */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            6.3 Biologie (bilan initial)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.cbc"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  NFS
                </span>
              </label>
              {cbc && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.cbcResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.crp"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  CRP
                </span>
              </label>
              {crp && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.crpResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.ionogramUreaCreatinine"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ionogramme urée créatinine
                </span>
              </label>
              {ionogramUreaCreatinine && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.ionogramUreaCreatinineResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.liverFunction"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Fonction hépatique
                </span>
              </label>
              {liverFunction && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.liverFunctionResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calcium
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.initialBiology.calcium"
                )}
                disabled={disabled}
                placeholder="Calcium..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Albumine nutrition
              </label>
              <input
                type="text"
                {...register(
                  "lungCancerComplementaryExams.initialBiology.albuminNutrition"
                )}
                disabled={disabled}
                placeholder="Albumine..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.hemostasis"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hémostase
                </span>
              </label>
              {hemostasis && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.hemostasisResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.tumorMarkers"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Marqueurs tumoraux
                </span>
              </label>
              {tumorMarkers && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.initialBiology.tumorMarkersResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
          </div>
        </div>

        {/* 6.4 Bilan pré-thérapeutique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            6.4 Bilan pré-thérapeutique
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.pftSpirometry"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  EFR spirométrie
                </span>
              </label>
              {pftSpirometry && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.pftSpirometryResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.dlco"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  DLCO
                </span>
              </label>
              {dlco && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.dlcoResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.bloodGas"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Gaz du sang
                </span>
              </label>
              {bloodGas && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.bloodGasResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.ecg"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  ECG
                </span>
              </label>
              {ecg && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.ecgResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.echocardiography"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Échocardiographie
                </span>
              </label>
              {echocardiography && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.echocardiographyResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.anestheticEvaluation"
                  )}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Consultation anesthésique
                </span>
              </label>
              {anestheticEvaluation && (
                <input
                  type="text"
                  {...register(
                    "lungCancerComplementaryExams.preTherapeuticAssessment.anestheticEvaluationResults"
                  )}
                  disabled={disabled}
                  placeholder="Résultats..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
