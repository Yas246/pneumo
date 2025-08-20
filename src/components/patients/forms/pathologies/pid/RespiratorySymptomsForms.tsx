{
  /* eslint-disable @typescript-eslint/no-explicit-any */
}
import { FormSectionProps } from "../../types";

export function RespiratorySymptomsForms({
  register,
  watch,
}: FormSectionProps) {
  const cough = watch("pidRespiratorySymptoms.cough.present");
  const dyspnea = watch("pidRespiratorySymptoms.dyspnea.present");
  const chestPain = watch("pidRespiratorySymptoms.chestPain.present");
  const hemoptysis = watch("pidRespiratorySymptoms.hemoptysis.present");
  const expectoration = watch("pidRespiratorySymptoms.expectoration.present");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Signes Fonctionnels Respiratoires
      </h3>

      <div className="space-y-8">
        {/* TOUX */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidRespiratorySymptoms.cough.present"
              {...register("pidRespiratorySymptoms.cough.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidRespiratorySymptoms.cough.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Toux
            </label>
          </div>

          {cough && (
            <div className="pl-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="pidRespiratorySymptoms.cough.type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Type
                </label>
                <select
                  id="pidRespiratorySymptoms.cough.type"
                  {...register("pidRespiratorySymptoms.cough.type")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                >
                  <option value="">Sélectionner</option>
                  <option value="Sèche">Sèche</option>
                  <option value="Productive">Productive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Intensité
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.intensity"
                      {...register(
                        "pidRespiratorySymptoms.cough.intensity.insomnia"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.intensity.insomnia"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Insomniante
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.intensity.emetic"
                      {...register(
                        "pidRespiratorySymptoms.cough.intensity.emetic"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.intensity.emetic"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Émétisante
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.intensity.painful"
                      {...register(
                        "pidRespiratorySymptoms.cough.intensity.painful"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.intensity.painful"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Douloureuse
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.intensity.withUrinaryIncontinence"
                      {...register(
                        "pidRespiratorySymptoms.cough.intensity.withUrinaryIncontinence"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.intensity.withUrinaryIncontinence"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Avec incontinence urinaire
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.cough.frequency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Fréquence
                  </label>
                  <select
                    id="pidRespiratorySymptoms.cough.frequency"
                    {...register("pidRespiratorySymptoms.cough.frequency")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Permanente">Permanente</option>
                    <option value="Saisonnière">Saisonnière</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.cough.timing"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Horaire
                  </label>
                  <select
                    id="pidRespiratorySymptoms.cough.timing"
                    {...register("pidRespiratorySymptoms.cough.timing")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Nocturne">Nocturne</option>
                    <option value="Diurne">Diurne</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Déclencheurs
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.triggers.noFactor"
                      {...register(
                        "pidRespiratorySymptoms.cough.triggers.noFactor"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.triggers.noFactor"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Sans facteur
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.triggers.tobacco"
                      {...register(
                        "pidRespiratorySymptoms.cough.triggers.tobacco"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.triggers.tobacco"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Tabac
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.triggers.postMeal"
                      {...register(
                        "pidRespiratorySymptoms.cough.triggers.postMeal"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.triggers.postMeal"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Après repas
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.triggers.duringMeal"
                      {...register(
                        "pidRespiratorySymptoms.cough.triggers.duringMeal"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.triggers.duringMeal"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Au moment des repas
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.cough.triggers.decubitus"
                      {...register(
                        "pidRespiratorySymptoms.cough.triggers.decubitus"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.cough.triggers.decubitus"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Décubitus
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.cough.triggers.other"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Autres déclencheurs
                  </label>
                  <input
                    type="text"
                    id="pidRespiratorySymptoms.cough.triggers.other"
                    {...register("pidRespiratorySymptoms.cough.triggers.other")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DYSPNÉE */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidRespiratorySymptoms.dyspnea.present"
              {...register("pidRespiratorySymptoms.dyspnea.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidRespiratorySymptoms.dyspnea.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Dyspnée
            </label>
          </div>

          {dyspnea && (
            <div className="pl-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.dyspnea.sadoulStage"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Stade de Sadoul
                  </label>
                  <select
                    id="pidRespiratorySymptoms.dyspnea.sadoulStage"
                    {...register("pidRespiratorySymptoms.dyspnea.sadoulStage")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.dyspnea.type"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Type
                  </label>
                  <select
                    id="pidRespiratorySymptoms.dyspnea.type"
                    {...register("pidRespiratorySymptoms.dyspnea.type")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Permanente">Permanente</option>
                    <option value="Paroxystique">Paroxystique</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Circonstances
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.dyspnea.circumstances.effort"
                      {...register(
                        "pidRespiratorySymptoms.dyspnea.circumstances.effort"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.dyspnea.circumstances.effort"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Effort
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.dyspnea.circumstances.rest"
                      {...register(
                        "pidRespiratorySymptoms.dyspnea.circumstances.rest"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.dyspnea.circumstances.rest"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Repos
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.dyspnea.circumstances.decubitus"
                      {...register(
                        "pidRespiratorySymptoms.dyspnea.circumstances.decubitus"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.dyspnea.circumstances.decubitus"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Décubitus
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.dyspnea.circumstances.other"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Autres circonstances
                  </label>
                  <input
                    type="text"
                    id="pidRespiratorySymptoms.dyspnea.circumstances.other"
                    {...register(
                      "pidRespiratorySymptoms.dyspnea.circumstances.other"
                    )}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DOULEUR THORACIQUE */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidRespiratorySymptoms.chestPain.present"
              {...register("pidRespiratorySymptoms.chestPain.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidRespiratorySymptoms.chestPain.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Douleur thoracique
            </label>
          </div>

          {chestPain && (
            <div className="pl-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Siège
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.location.right"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.location.right" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.location.right"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Droit
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.location.left"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.location.left" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.location.left"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Gauche
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.location.bilateral"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.location.bilateral" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.location.bilateral"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Bilatéral
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Localisation
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.site.medioThoracic"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.site.medioThoracic" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.site.medioThoracic"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Médio-thoracique
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.site.basiThoracic"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.site.basiThoracic" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.site.basiThoracic"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Basithoracique
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.site.retrosternal"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.site.retrosternal" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.site.retrosternal"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Rétrosternal
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.site.diffuse"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.site.diffuse" as any
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.site.diffuse"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Diffuse
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.type.oppression"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.type.oppression"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.type.oppression"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Oppression
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.type.constrictive"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.type.constrictive"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.type.constrictive"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Constrictive
                    </label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <input
                      type="checkbox"
                      id="pidRespiratorySymptoms.chestPain.type.burning"
                      {...register(
                        "pidRespiratorySymptoms.chestPain.type.burning"
                      )}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor="pidRespiratorySymptoms.chestPain.type.burning"
                      className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Brûlure
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.chestPain.type.other"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Autre type
                  </label>
                  <input
                    type="text"
                    id="pidRespiratorySymptoms.chestPain.type.other"
                    {...register("pidRespiratorySymptoms.chestPain.type.other")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidRespiratorySymptoms.chestPain.triggers"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Déclencheurs
                </label>
                <input
                  type="text"
                  id="pidRespiratorySymptoms.chestPain.triggers"
                  {...register("pidRespiratorySymptoms.chestPain.triggers")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>

        {/* HÉMOPTYSIE */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidRespiratorySymptoms.hemoptysis.present"
              {...register("pidRespiratorySymptoms.hemoptysis.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidRespiratorySymptoms.hemoptysis.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hémoptysie
            </label>
          </div>

          {hemoptysis && (
            <div className="pl-6 space-y-2">
              <label
                htmlFor="pidRespiratorySymptoms.hemoptysis.abundance"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Abondance
              </label>
              <select
                id="pidRespiratorySymptoms.hemoptysis.abundance"
                {...register("pidRespiratorySymptoms.hemoptysis.abundance")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              >
                <option value="">Sélectionner</option>
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Grande">Grande</option>
              </select>
            </div>
          )}
        </div>

        {/* EXPECTORATION */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="pidRespiratorySymptoms.expectoration.present"
              {...register("pidRespiratorySymptoms.expectoration.present")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="pidRespiratorySymptoms.expectoration.present"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Expectoration
            </label>
          </div>

          {expectoration && (
            <div className="pl-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.expectoration.frequency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Fréquence
                  </label>
                  <select
                    id="pidRespiratorySymptoms.expectoration.frequency"
                    {...register(
                      "pidRespiratorySymptoms.expectoration.frequency"
                    )}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Permanente">Permanente</option>
                    <option value="Intermittente">Intermittente</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.expectoration.timing"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Horaire
                  </label>
                  <select
                    id="pidRespiratorySymptoms.expectoration.timing"
                    {...register("pidRespiratorySymptoms.expectoration.timing")}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Matinal">Matinal</option>
                    <option value="Non matinal">Non matinal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.expectoration.quality"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Qualité
                  </label>
                  <select
                    id="pidRespiratorySymptoms.expectoration.quality"
                    {...register(
                      "pidRespiratorySymptoms.expectoration.quality"
                    )}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Muqueuse">Muqueuse</option>
                    <option value="Muco-purulente">Muco-purulente</option>
                    <option value="Purulente">Purulente</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="pidRespiratorySymptoms.expectoration.quantity"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Quantité
                  </label>
                  <select
                    id="pidRespiratorySymptoms.expectoration.quantity"
                    {...register(
                      "pidRespiratorySymptoms.expectoration.quantity"
                    )}
                    className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Grande">Grande</option>
                    <option value="Faible">Faible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pidRespiratorySymptoms.expectoration.odor"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Odeur
                </label>
                <input
                  type="text"
                  id="pidRespiratorySymptoms.expectoration.odor"
                  {...register("pidRespiratorySymptoms.expectoration.odor")}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
