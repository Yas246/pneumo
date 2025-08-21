"use client";

import { FormSectionProps } from "../../types";
export function DiseaseHistoryForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        IV. Histoire de la maladie
      </h3>

      <div className="space-y-6">
        {/* Début d'apparition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Début d&apos;apparition de 1er symptôme
          </label>
          <input
            type="date"
            {...register("asthmaDiseaseHistory.firstSymptomOnset")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* Évolution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Évolution
          </label>
          <select
            {...register("asthmaDiseaseHistory.evolution")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionnez</option>
            <option value="crises">Par crises</option>
            <option value="continue">Continue</option>
            <option value="remissions">Rémissions</option>
          </select>
        </div>

        {/* Hospitalisations antérieures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("asthmaDiseaseHistory.previousHospitalizations")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Hospitalisations antérieures
            </span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="number"
              {...register("asthmaDiseaseHistory.hospitalizationsCount", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              placeholder="Ex: 2"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Symptôme d'apparition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Début des symptômes
          </label>
          <select
            {...register("asthmaDiseaseHistory.symptomOnset")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionnez</option>
            <option value="aigu">Aigu</option>
            <option value="progressif">Progressif</option>
          </select>
        </div>

        {/* Fréquence des crises */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fréquence des crises
          </label>
          <select
            {...register("asthmaDiseaseHistory.crisisFrequency")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionnez</option>
            <option value="quotidienne">Quotidienne</option>
            <option value="hebdomadaire">Hebdomadaire</option>
            <option value="mensuelle">Mensuelle</option>
          </select>
        </div>

        {/* Moment des crises */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Moment des crises
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="nuit"
                {...register("asthmaDiseaseHistory.crisisTiming")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Nuit
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="matin"
                {...register("asthmaDiseaseHistory.crisisTiming")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Matin
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="exercice"
                {...register("asthmaDiseaseHistory.crisisTiming")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Exercice
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="allergene"
                {...register("asthmaDiseaseHistory.crisisTiming")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Exposition allergène
              </span>
            </label>
          </div>
        </div>

        {/* Durée d'une crise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durée d&apos;une crise
          </label>
          <input
            type="text"
            {...register("asthmaDiseaseHistory.crisisDuration")}
            disabled={disabled}
            placeholder="Ex: 30 minutes, quelques heures..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        {/* Facteurs déclenchants */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Facteurs déclenchants
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="poussiere"
                {...register("asthmaDiseaseHistory.triggeringFactors")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Poussière
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="effort"
                {...register("asthmaDiseaseHistory.triggeringFactors")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Effort
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="froid"
                {...register("asthmaDiseaseHistory.triggeringFactors")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Froid
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="stress"
                {...register("asthmaDiseaseHistory.triggeringFactors")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Stress
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                value="infections"
                {...register("asthmaDiseaseHistory.triggeringFactors")}
                disabled={disabled}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Infections
              </span>
            </label>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Autres facteurs
            </label>
            <input
              type="text"
              {...register("asthmaDiseaseHistory.otherTriggeringFactor")}
              disabled={disabled}
              placeholder="Précisez les autres facteurs déclenchants..."
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Réponse aux bronchodilatateurs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Réponse aux bronchodilatateurs (SABA)
          </label>
          <select
            {...register("asthmaDiseaseHistory.sabaResponse")}
            disabled={disabled}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">Sélectionnez</option>
            <option value="bonne">Bonne</option>
            <option value="incomplete">Incomplète</option>
            <option value="nulle">Nulle</option>
          </select>
        </div>

        {/* Hospitalisations / Urgences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("asthmaDiseaseHistory.hospitalUrgency")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Hospitalisations / Urgences
            </span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="number"
              {...register("asthmaDiseaseHistory.hospitalUrgencyCount", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              placeholder="Ex: 3"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Intubation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("asthmaDiseaseHistory.intubationResuscitation")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Intubation ou réanimation
            </span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="number"
              {...register("asthmaDiseaseHistory.intubationCount", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={disabled}
              placeholder="Ex: 1"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>

        {/* Autres */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Autres (Histoire de la maladie)
          </label>
          <textarea
            {...register("asthmaDiseaseHistory.otherDiseaseHistory")}
            disabled={disabled}
            rows={3}
            placeholder="Précisez..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
