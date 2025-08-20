import { FormSectionProps } from "../../types";

export function ClinicalExamForm({ register, watch }: FormSectionProps) {
  const pleuroPulmonaryNormal = watch(
    "pidClinicalExam.pleuroPulmonaryExam.normal"
  );
  const lymphNodesNormal = watch("pidClinicalExam.lymphNodes.normal");
  const cardiovascularNormal = watch(
    "pidClinicalExam.cardiovascularExam.normal"
  );
  const cutaneousNormal = watch("pidClinicalExam.cutaneousExam.normal");
  const entNormal = watch("pidClinicalExam.ent.normal");
  const jointNormal = watch("pidClinicalExam.jointExam.normal");
  const neurologicalNormal = watch("pidClinicalExam.neurologicalExam.normal");
  const abdominalNormal = watch("pidClinicalExam.abdominalExam.normal");
  const ophthalmologicNormal = watch(
    "pidClinicalExam.ophthalmologicExam.normal"
  );
  const renalNormal = watch("pidClinicalExam.renalExam.normal");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Examen Clinique
      </h3>

      {/* Examen général */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen général
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.generalExam.normal"
              {...register("pidClinicalExam.generalExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.weight"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Poids (kg)
            </label>
            <input
              type="number"
              step="0.1"
              id="clinicalExam.generalExam.weight"
              {...register("pidClinicalExam.generalExam.weight", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.height"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Taille (cm)
            </label>
            <input
              type="number"
              id="clinicalExam.generalExam.height"
              {...register("pidClinicalExam.generalExam.height", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.bmi"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              IMC
            </label>
            <input
              type="number"
              step="0.01"
              id="clinicalExam.generalExam.bmi"
              {...register("pidClinicalExam.generalExam.bmi", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.temperature"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Température (°C)
            </label>
            <input
              type="number"
              step="0.1"
              id="clinicalExam.generalExam.temperature"
              {...register("pidClinicalExam.generalExam.temperature", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.bloodPressure"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tension artérielle
            </label>
            <input
              type="text"
              id="clinicalExam.generalExam.bloodPressure"
              {...register("pidClinicalExam.generalExam.bloodPressure")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              placeholder="ex: 120/80 mmHg"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.heartRate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fréquence cardiaque (bpm)
            </label>
            <input
              type="number"
              id="clinicalExam.generalExam.heartRate"
              {...register("pidClinicalExam.generalExam.heartRate", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.respiratoryRate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fréquence respiratoire (cpm)
            </label>
            <input
              type="number"
              id="clinicalExam.generalExam.respiratoryRate"
              {...register("pidClinicalExam.generalExam.respiratoryRate", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.generalExam.saturation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Saturation (%)
            </label>
            <input
              type="number"
              id="clinicalExam.generalExam.saturation"
              {...register("pidClinicalExam.generalExam.saturation", {
                valueAsNumber: true,
              })}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        </div>
      </div>

      {/* Examen pleuro-pulmonaire */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen pleuro-pulmonaire
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.pleuroPulmonaryExam.normal"
              {...register("pidClinicalExam.pleuroPulmonaryExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!pleuroPulmonaryNormal && (
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.pleuroPulmonaryExam.signs.inspection"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Inspection
              </label>
              <textarea
                id="clinicalExam.pleuroPulmonaryExam.signs.inspection"
                {...register("pidClinicalExam.inspection")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.pleuroPulmonaryExam.signs.palpation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Palpation
              </label>
              <textarea
                id="clinicalExam.pleuroPulmonaryExam.signs.palpation"
                {...register("pidClinicalExam.palpation")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.pleuroPulmonaryExam.signs.percussion"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Percussion
              </label>
              <textarea
                id="clinicalExam.pleuroPulmonaryExam.signs.percussion"
                {...register("pidClinicalExam.percussion")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.pleuroPulmonaryExam.signs.auscultation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Auscultation
              </label>
              <textarea
                id="clinicalExam.pleuroPulmonaryExam.signs.auscultation"
                {...register("pidClinicalExam.auscultation")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Aires ganglionnaires */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Aires ganglionnaires
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.lymphNodes.normal"
              {...register("pidClinicalExam.lymphNodes.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!lymphNodesNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.lymphNodes.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.lymphNodes.details"
              {...register("pidClinicalExam.lymphNodes.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen cardiovasculaire */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen cardiovasculaire
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.cardiovascularExam.normal"
              {...register("pidClinicalExam.cardiovascularExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!cardiovascularNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.cardiovascularExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.cardiovascularExam.details"
              {...register("pidClinicalExam.cardiovascularExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen cutané */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen cutané
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.cutaneousExam.normal"
              {...register("pidClinicalExam.cutaneousExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!cutaneousNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.cutaneousExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.cutaneousExam.details"
              {...register("pidClinicalExam.cutaneousExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen ORL */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen ORL
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.ent.normal"
              {...register("pidClinicalExam.ent.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!entNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.ent.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.ent.details"
              {...register("pidClinicalExam.ent.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen articulaire */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen articulaire
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.jointExam.normal"
              {...register("pidClinicalExam.jointExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!jointNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.jointExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.jointExam.details"
              {...register("pidClinicalExam.jointExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen neurologique */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen neurologique
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.neurologicalExam.normal"
              {...register("pidClinicalExam.neurologicalExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!neurologicalNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.neurologicalExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.neurologicalExam.details"
              {...register("pidClinicalExam.neurologicalExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen abdominal */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen abdominal
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.abdominalExam.normal"
              {...register("pidClinicalExam.abdominalExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!abdominalNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.abdominalExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.abdominalExam.details"
              {...register("pidClinicalExam.abdominalExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen ophtalmologique */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen ophtalmologique
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.ophthalmologicExam.normal"
              {...register("pidClinicalExam.ophthalmologicExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!ophthalmologicNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.ophthalmologicExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.ophthalmologicExam.details"
              {...register("pidClinicalExam.ophthalmologicExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen rénal */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Examen rénal
        </h4>
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.renalExam.normal"
              {...register("pidClinicalExam.renalExam.normal")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Normal
            </span>
          </label>
        </div>

        {!renalNormal && (
          <div className="space-y-2">
            <label
              htmlFor="clinicalExam.renalExam.details"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Détails
            </label>
            <textarea
              id="clinicalExam.renalExam.details"
              {...register("pidClinicalExam.renalExam.details")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}
