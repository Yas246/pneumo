import { FormSectionProps } from "../../types";

export function LifestyleForm({ register, watch }: FormSectionProps) {
  const professionalExposure = watch(
    "pidLifestyle.professionalExposure.present"
  );
  const avianContact = watch("pidLifestyle.avianContact.present");
  const tropicalTravel = watch("pidLifestyle.tropicalTravel.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Mode de Vie
      </h3>

      <div className="space-y-6">
        {/* Exposition professionnelle */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lifestyle.professionalExposure.present"
              {...register("pidLifestyle.professionalExposure.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="lifestyle.professionalExposure.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Exposition professionnelle
            </label>
          </div>

          {professionalExposure && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="lifestyle.professionalExposure.details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Préciser
                </label>
                <input
                  type="text"
                  id="lifestyle.professionalExposure.details"
                  {...register("pidLifestyle.professionalExposure.details")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Contact aviaire */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lifestyle.avianContact.present"
              {...register("pidLifestyle.avianContact.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="lifestyle.avianContact.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contact aviaire
            </label>
          </div>

          {avianContact && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="lifestyle.avianContact.description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="lifestyle.avianContact.description"
                  {...register("pidLifestyle.avianContact.description")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Contact foin moisi */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="lifestyle.moltyHayContact"
            {...register("pidLifestyle.moltyHayContact")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="lifestyle.moltyHayContact"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contact avec du foin moisi
          </label>
        </div>

        {/* Voyage en zone tropicale */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lifestyle.tropicalTravel.present"
              {...register("pidLifestyle.tropicalTravel.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="lifestyle.tropicalTravel.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Voyage en zone tropicale
            </label>
          </div>

          {tropicalTravel && (
            <div className="pl-6 pt-2">
              <div className="space-y-2">
                <label
                  htmlFor="lifestyle.tropicalTravel.location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Lieu
                </label>
                <input
                  type="text"
                  id="lifestyle.tropicalTravel.location"
                  {...register("pidLifestyle.tropicalTravel.location")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* Autres expositions */}
        <div className="space-y-2 mt-4">
          <label
            htmlFor="lifestyle.otherExposures"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres expositions
          </label>
          <textarea
            id="lifestyle.otherExposures"
            {...register("pidLifestyle.otherExposures")}
            rows={2}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
