import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";
import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  setValue,
  watch,
}: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Examens Complémentaires
      </h3>
      <div className="space-y-6">
        {/* Bilan métabolique */}
        <div className="space-y-2">
          <label
            htmlFor="complementaryExams.metabolicAssessment"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Bilan métabolique
          </label>
          <textarea
            {...register("complementaryExams.metabolicAssessment")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Radiographie thoracique */}
        <div className="space-y-2">
          <label
            htmlFor="complementaryExams.chestXray"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Radiographie thoracique
          </label>
          <div className="space-y-4">
            <MediaUploadDragDrop
              accept="image/*"
              placeholder="Glissez-déposez des images ici ou cliquez pour sélectionner"
              currentUrls={
                watch?.("complementaryExams.chestXray.imageUrls") || []
              }
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("complementaryExams.chestXray.imageUrls", urls);
                }
              }}
            />
            <textarea
              {...register("complementaryExams.chestXray.notes")}
              placeholder="Notes"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Scanner/TDM */}
        <div className="space-y-2">
          <label
            htmlFor="complementaryExams.scanner"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Scanner/TDM
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Images
              </label>
              <MediaUploadDragDrop
                accept="image/*"
                placeholder="Glissez-déposez des images ici ou cliquez pour sélectionner"
                currentUrls={
                  watch?.("complementaryExams.scanner.imageUrls") || []
                }
                onFileSelect={(files, urls) => {
                  if (urls && urls.length > 0) {
                    setValue("complementaryExams.scanner.imageUrls", urls);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vidéos
              </label>
              <MediaUploadDragDrop
                accept="video/*"
                placeholder="Glissez-déposez des vidéos ici ou cliquez pour sélectionner"
                currentUrls={
                  watch?.("complementaryExams.scanner.videoUrls") || []
                }
                onFileSelect={(files, urls) => {
                  if (urls && urls.length > 0) {
                    setValue("complementaryExams.scanner.videoUrls", urls);
                  }
                }}
              />
            </div>
            <textarea
              {...register("complementaryExams.scanner.notes")}
              placeholder="Notes"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Polygraphie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Polygraphie
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.polygraphyDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                type="date"
                {...register("complementaryExams.polygraphyDate")}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.iah"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                IAH
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.iah", { valueAsNumber: true })}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.iahCentral"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                IAH Central
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.iahCentral", {
                  valueAsNumber: true,
                })}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.oxygenDesaturation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Désaturation en O2
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.oxygenDesaturation", {
                  valueAsNumber: true,
                })}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.ct90"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                CT90
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.ct90", {
                  valueAsNumber: true,
                })}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Gazométrie */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Gazométrie
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.gazometryDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                type="date"
                {...register("complementaryExams.gazometryDate")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.ph"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                pH
              </label>
              <input
                type="number"
                step="0.01"
                {...register("complementaryExams.ph", { valueAsNumber: true })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.pao2"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                PaO2
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.pao2", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.paco2"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                PaCO2
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.paco2", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.hco3"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                HCO3-
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.hco3", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.sao2"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                SaO2
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.sao2", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* EFR */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            EFR
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.efrDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Date
              </label>
              <input
                type="date"
                {...register("complementaryExams.efrDate")}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.cvf"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                CVF
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.cvf", { valueAsNumber: true })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.vems"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                VEMS
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.vems", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.dlco"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                DLCO
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.dlco", {
                  valueAsNumber: true,
                })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="complementaryExams.cpt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                CPT
              </label>
              <input
                type="number"
                step="0.1"
                {...register("complementaryExams.cpt", { valueAsNumber: true })}
                className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Autres examens */}
        <div className="space-y-2">
          <label
            htmlFor="complementaryExams.otherExams"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres examens
          </label>
          <textarea
            {...register("complementaryExams.otherExams")}
            rows={3}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Autres examens complémentaires */}
        <div className="space-y-2">
          <label
            htmlFor="complementaryExams.otherComplementaryExams"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres examens complémentaires
          </label>
          <textarea
            {...register("complementaryExams.otherComplementaryExams")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
