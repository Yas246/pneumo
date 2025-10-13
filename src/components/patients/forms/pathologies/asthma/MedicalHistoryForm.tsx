"use client";

import { FormSectionProps } from "../../types";
export function MedicalHistoryForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        III. Antécédents
      </h3>

      <div className="space-y-8">
        {/* Antécédents médicaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Médicaux
          </h4>
          <div className="space-y-4">
            {/* Asthme connu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.knownAsthma")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Asthme connu
                </span>
              </label>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Depuis
                </label>
                <input
                  type="date"
                  {...register("asthmaMedicalHistory.asthmaSince")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* Autres conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.allergicRhinitis")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Rhinite allergique
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.eczemaAtopicDermatitis")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Eczéma / Dermatite atopique
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.gerd")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  RGO
                </span>
              </label>
            </div>

            {/* Autre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autre
              </label>
              <input
                type="text"
                {...register("asthmaMedicalHistory.other")}
                disabled={disabled}
                placeholder="Précisez..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Antécédents chirurgicaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Chirurgicaux
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Antécédents chirurgicaux
            </label>
            <textarea
              {...register("asthmaMedicalHistory.surgicalHistory")}
              disabled={disabled}
              rows={3}
              placeholder="Décrivez les antécédents chirurgicaux..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Allergies connues */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Allergies connues
          </h4>
          <div className="space-y-4">
            {/* Allergènes respiratoires */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allergènes respiratoires
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    value="acariens"
                    {...register("asthmaMedicalHistory.respiratoryAllergens")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Acariens
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    value="pollen"
                    {...register("asthmaMedicalHistory.respiratoryAllergens")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Pollen
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    value="animaux"
                    {...register("asthmaMedicalHistory.respiratoryAllergens")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Poils animaux
                  </span>
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <input
                    type="checkbox"
                    {...register("asthmaMedicalHistory.dustAllergy")}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Allergie à la poussière
                  </span>
                </label>
              </div>
            </div>

            {/* Allergies médicamenteuses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.drugAllergies")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Allergies médicamenteuses
                </span>
              </label>

              <div>
                <input
                  type="text"
                  {...register("asthmaMedicalHistory.drugAllergiesDetails")}
                  disabled={disabled}
                  placeholder="Précisez les médicaments..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            {/* Autres allergies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.otherAllergies")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Autres allergies
                </span>
              </label>

              <div>
                <input
                  type="text"
                  {...register("asthmaMedicalHistory.otherAllergiesDetails")}
                  disabled={disabled}
                  placeholder="Précisez les autres allergies..."
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Antécédents familiaux */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Antécédents familiaux
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.parentAsthmatic")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Parent asthmatique
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input
                  type="checkbox"
                  {...register("asthmaMedicalHistory.familyAtopy")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Atopie familiale
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autres
              </label>
              <input
                type="text"
                {...register("asthmaMedicalHistory.familyOther")}
                disabled={disabled}
                placeholder="Précisez les autres antécédents familiaux..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Tabac */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Tabac
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Statut tabagique
              </label>
              <select
                {...register("asthmaMedicalHistory.smokingStatus")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="nonFumeur">Non fumeur</option>
                <option value="ancienFumeur">Ancien fumeur</option>
                <option value="fumeur">Fumeur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantité (PA)
              </label>
              <input
                type="number"
                {...register("asthmaMedicalHistory.tobaccoQuantity", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                disabled={disabled}
                placeholder="Ex: 10"
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>

            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("asthmaMedicalHistory.passiveSmoking")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Tabagisme passif
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <input
                type="checkbox"
                {...register("asthmaMedicalHistory.cannabis")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Cannabis
              </span>
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Autres (Toxiques)
            </label>
            <input
              type="text"
              {...register("asthmaMedicalHistory.otherToxic")}
              disabled={disabled}
              placeholder="Précisez les autres toxiques..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Affections ORL */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Affections ORL
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="rhiniteChronique"
                {...register("asthmaMedicalHistory.orlAffection")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Rhinite chronique
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="sinusiteChronique"
                {...register("asthmaMedicalHistory.orlAffection")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Sinusite chronique
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="polyposeNasale"
                {...register("asthmaMedicalHistory.orlAffection")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Polypose nasale
              </span>
            </label>
          </div>
        </div>

        {/* Facteurs endocriniens */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Facteurs endocriniens
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facteurs endocriniens
              </label>
              <select
                {...register("asthmaMedicalHistory.endocrineFactors")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Si oui
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="obesite"
                    {...register(
                      "asthmaMedicalHistory.endocrineFactorsDetails"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Obésité
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="grossesse"
                    {...register(
                      "asthmaMedicalHistory.endocrineFactorsDetails"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Grossesse
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="puberte"
                    {...register(
                      "asthmaMedicalHistory.endocrineFactorsDetails"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Puberté
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="periMenopause"
                    {...register(
                      "asthmaMedicalHistory.endocrineFactorsDetails"
                    )}
                    disabled={disabled}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Péri-ménopause
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Exposition professionnelle */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Exposition professionnelle
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Exposition professionnelle
              </label>
              <select
                {...register("asthmaMedicalHistory.professionalExposure")}
                disabled={disabled}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="">Sélectionnez</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Détails
              </label>
              <input
                type="text"
                {...register(
                  "asthmaMedicalHistory.professionalExposureDetails"
                )}
                disabled={disabled}
                placeholder="Précisez l'exposition professionnelle..."
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Allergie à la poussière et tabagisme passif */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
      </div>
    </div>
  );
}
