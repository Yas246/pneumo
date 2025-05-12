/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormSectionProps } from "../../types";

export function ConsultationReasonForm({
  register,
  setValue,
  watch,
}: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Motif de Consultation
      </h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="consultationReason"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Motif principal
          </label>
          <textarea
            {...register("consultationReason")}
            rows={4}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        {/* Symptômes diurnes */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Symptômes diurnes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diurnalSymptoms.excessiveSleepiness")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Somnolence diurne excessive
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diurnalSymptoms.headaches")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Céphalées
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("diurnalSymptoms.asthenia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Asthénie
                </span>
              </div>
            </label>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="epworthScore"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Score d&apos;Epworth
            </label>
            <div className="mt-2 space-y-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                      Situation
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      0
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      1
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      2
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      3
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    "Assis en train de lire",
                    "En train de regarder la télévision",
                    "Assis, inactif dans un endroit public (au théâtre, en réunion...)",
                    "Comme passager dans une voiture roulant sans arrêt pendant une heure",
                    "Allongé l'après-midi pour se reposer quand les circonstances le permettent",
                    "Assis en train de parler à quelqu'un",
                    "Assis calmement après un repas sans alcool",
                    "Dans une voiture immobilisée quelques minutes dans un embouteillage",
                  ].map((situation, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                        {situation}
                      </td>
                      {[0, 1, 2, 3].map((value) => (
                        <td key={value} className="px-4 py-2 text-center">
                          <input
                            type="radio"
                            name={`epworth_${index}`}
                            value={value}
                            checked={
                              Number(
                                watch(
                                  `diurnalSymptoms.epworthDetails.${index}` as any
                                )
                              ) === value
                            }
                            className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                            onChange={(e) => {
                              const newValue = Number(e.target.value);

                              // Initialize the array if it doesn't exist
                              const currentDetails =
                                watch(
                                  "diurnalSymptoms.epworthDetails" as any
                                ) || Array(8).fill(0);
                              let newDetails;

                              if (Array.isArray(currentDetails)) {
                                newDetails = [...currentDetails];
                              } else {
                                // If it's an object, convert it to array
                                newDetails = Array(8).fill(0);
                                Object.entries(currentDetails).forEach(
                                  ([idx, val]) => {
                                    const index = parseInt(idx);
                                    if (
                                      !isNaN(index) &&
                                      index >= 0 &&
                                      index < 8
                                    ) {
                                      newDetails[index] = Number(val) || 0;
                                    }
                                  }
                                );
                              }

                              // Update the value
                              newDetails[index] = newValue;

                              // Ensure we're setting an array
                              setValue(
                                "diurnalSymptoms.epworthDetails" as any,
                                newDetails
                              );
                              setValue(
                                "diurnalSymptoms.epworthScore" as any,
                                newDetails.reduce((sum, val) => sum + val, 0)
                              );
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Score total:{" "}
                  {Number(watch("diurnalSymptoms.epworthScore")) || 0}
                </p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>0 = ne s&apos;endormirait jamais</p>
                <p>1 = faible chance de s&apos;endormir</p>
                <p>2 = chance moyenne de s&apos;endormir</p>
                <p>3 = forte chance de s&apos;endormir</p>
              </div>
            </div>
          </div>
        </div>

        {/* Symptômes nocturnes */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900 dark:text-white">
            Symptômes nocturnes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.snoring")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Ronflements
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.sleepApnea")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Apnées nocturnes
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.choking")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Étouffement/Suffocation
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.agitation")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Agitation
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.insomnia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Insomnie
                </span>
              </div>
            </label>
            <label className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  {...register("nocturnalSymptoms.nocturia")}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Nycturie
                </span>
              </div>
            </label>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="nocturnalSymptomsOther"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Autres symptômes
            </label>
            <input
              type="text"
              {...register("nocturnalSymptoms.other")}
              className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="symptomsDuration"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Durée des symptômes
          </label>
          <input
            type="text"
            {...register("symptomsDuration")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
