import { FormSectionProps } from "../../types";
import { MediaUploadDragDrop } from "../../../../shared/MediaUploadDragDrop";

export function ImagingForm({ register, watch, setValue }: FormSectionProps) {
  const thoracicEcho = watch("imaging.thoracicEcho");
  const thoracicCT = watch("imaging.thoracicCT");
  const abdominalEcho = watch("imaging.abdominalEcho");
  const ett = watch("imaging.ett");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Imagerie
      </h3>

      <div className="space-y-6">
        {/* Echographie thoracique */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="imaging.thoracicEcho"
              {...register("imaging.thoracicEcho")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="imaging.thoracicEcho"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Échographie thoracique
            </label>
          </div>

          {thoracicEcho && (
            <div className="ml-6 space-y-4">
              <div>
                <label
                  htmlFor="imaging.thoracicEchoResults"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Résultats
                </label>
                <textarea
                  id="imaging.thoracicEchoResults"
                  {...register("imaging.thoracicEchoResults")}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue("imaging.thoracicEchoImages", urls);
                    }
                  }}
                  accept="image/*,video/*"
                  placeholder="Glissez-déposez les images ou vidéos de l'échographie thoracique ici"
                  currentUrls={watch?.("imaging.thoracicEchoImages") || []}
                />
              </div>
            </div>
          )}
        </div>

        {/* TDM thoracique */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="imaging.thoracicCT"
              {...register("imaging.thoracicCT")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="imaging.thoracicCT"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              TDM thoracique
            </label>
          </div>

          {thoracicCT && (
            <div className="ml-6 space-y-4">
              <div>
                <label
                  htmlFor="imaging.thoracicCTResults"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Résultats
                </label>
                <textarea
                  id="imaging.thoracicCTResults"
                  {...register("imaging.thoracicCTResults")}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue("imaging.thoracicCTImages", urls);
                    }
                  }}
                  accept="image/*,video/*"
                  placeholder="Glissez-déposez les images ou vidéos du TDM thoracique ici"
                  currentUrls={watch?.("imaging.thoracicCTImages") || []}
                />
              </div>
            </div>
          )}
        </div>

        {/* Échographie abdominale */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="imaging.abdominalEcho"
              {...register("imaging.abdominalEcho")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="imaging.abdominalEcho"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Échographie abdominale
            </label>
          </div>

          {abdominalEcho && (
            <div className="ml-6 space-y-4">
              <div>
                <label
                  htmlFor="imaging.abdominalEchoResults"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Résultats
                </label>
                <textarea
                  id="imaging.abdominalEchoResults"
                  {...register("imaging.abdominalEchoResults")}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue("imaging.abdominalEchoImages", urls);
                    }
                  }}
                  accept="image/*,video/*"
                  placeholder="Glissez-déposez les images ou vidéos de l'échographie abdominale ici"
                  currentUrls={watch?.("imaging.abdominalEchoImages") || []}
                />
              </div>
            </div>
          )}
        </div>

        {/* ETT */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="imaging.ett"
              {...register("imaging.ett")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="imaging.ett"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ETT
            </label>
          </div>

          {ett && (
            <div className="ml-6 space-y-4">
              <div>
                <label
                  htmlFor="imaging.ettResults"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Résultats
                </label>
                <textarea
                  id="imaging.ettResults"
                  {...register("imaging.ettResults")}
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Images
                </label>
                <MediaUploadDragDrop
                  onFileSelect={(files, urls) => {
                    if (urls && urls.length > 0) {
                      setValue("imaging.ettImages", urls);
                    }
                  }}
                  accept="image/*,video/*"
                  placeholder="Glissez-déposez les images ou vidéos de l'ETT ici"
                  currentUrls={watch?.("imaging.ettImages") || []}
                />
              </div>
            </div>
          )}
        </div>

        {/* Autres imageries */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="imaging.otherImaging"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres imageries
            </label>
            <textarea
              id="imaging.otherImaging"
              {...register("imaging.otherImaging")}
              rows={3}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images
            </label>
            <MediaUploadDragDrop
              onFileSelect={(files, urls) => {
                if (urls && urls.length > 0) {
                  setValue("imaging.otherImagingImages", urls);
                }
              }}
              accept="image/*,video/*"
              placeholder="Glissez-déposez les images ou vidéos des autres imageries ici"
              currentUrls={watch?.("imaging.otherImagingImages") || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
