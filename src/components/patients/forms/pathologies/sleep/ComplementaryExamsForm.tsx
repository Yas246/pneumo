import { useFileUpload } from "../../../../../hooks/useFileUpload";
import { FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  setValue,
}: FormSectionProps) {
  const { uploadFile, uploading, progress } = useFileUpload();

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "chestXray" | "scanner",
    type: "image" | "video" = "image"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const downloadURL = await uploadFile(
        file,
        `complementary-exams/${field}/${type}`
      );
      if (downloadURL) {
        if (type === "image") {
          setValue(`complementaryExams.${field}.imageUrl`, downloadURL);
        } else if (field === "scanner") {
          setValue("complementaryExams.scanner.videoUrl", downloadURL);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    }
  };

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
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "chestXray")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
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
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "scanner")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vidéo
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, "scanner", "video")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
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
