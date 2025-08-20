import { FormSectionProps } from "../../types";

export function DiagnosisForm({ register, disabled }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VII. Diagnostic
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stade BPCO
            </label>
            <select
              {...register("bpcoDiagnosis.bpcoStage")}
              disabled={disabled}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="">Sélectionnez le stade</option>
              <option value="léger">Léger</option>
              <option value="Modéré">Modéré</option>
              <option value="Sévère">Sévère</option>
              <option value="Très sévère">Très sévère</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoDiagnosis.acuteExacerbation")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Exacerbation aiguë
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoDiagnosis.bronchialSuperinfection")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Surinfection bronchique
            </span>
          </label>

          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              {...register("bpcoDiagnosis.chronicRespiratoryFailure")}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Insuffisance respiratoire chronique
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
