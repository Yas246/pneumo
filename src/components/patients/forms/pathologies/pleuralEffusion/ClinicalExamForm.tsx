import { FormSectionProps } from "../../types";

export function ClinicalExamForm({ register, watch }: FormSectionProps) {
  const dyspnea = watch("pleuralClinicalExam.dyspnea");
  const basiThoracicPain = watch("pleuralClinicalExam.basiThoracicPain");
  const cough = watch("pleuralClinicalExam.cough");
  const hemoptysis = watch("pleuralClinicalExam.hemoptysis");
  const otherSigns = watch("pleuralClinicalExam.otherSigns");
  const liquidEffusionSyndrome = watch(
    "pleuralClinicalExam.liquidEffusionSyndrome"
  );
  const mixedEffusionSyndrome = watch(
    "pleuralClinicalExam.mixedEffusionSyndrome"
  );
  const cardioExam = watch("pleuralClinicalExam.cardioExam");
  const abdominalExam = watch("pleuralClinicalExam.abdominalExam");
  const lymphNodes = watch("pleuralClinicalExam.lymphNodes");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Examen Clinique
      </h3>

      {/* Dyspnée */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.dyspnea"
              {...register("pleuralClinicalExam.dyspnea")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Dyspnée
            </span>
          </label>
        </div>

        {dyspnea && (
          <div className="ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.dyspneaSadoulStage"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Stade Sadoul
            </label>
            <input
              type="text"
              id="clinicalExam.dyspneaSadoulStage"
              {...register("pleuralClinicalExam.dyspneaSadoulStage")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Douleur basi-thoracique */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.basiThoracicPain"
              {...register("pleuralClinicalExam.basiThoracicPain")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Douleur basi-thoracique
            </span>
          </label>
        </div>

        {basiThoracicPain && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.painLocation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Siège
              </label>
              <select
                id="clinicalExam.painLocation"
                {...register("pleuralClinicalExam.painLocation")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              >
                <option value="">Sélectionner</option>
                <option value="Droite">Droite</option>
                <option value="Gauche">Gauche</option>
                <option value="Bilatérale">Bilatérale</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.painType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Type
              </label>
              <input
                type="text"
                id="clinicalExam.painType"
                {...register("pleuralClinicalExam.painType")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Toux */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.cough"
              {...register("pleuralClinicalExam.cough")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Toux
            </span>
          </label>
        </div>

        {cough && (
          <div className="ml-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.coughType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Type
              </label>
              <select
                id="clinicalExam.coughType"
                {...register("pleuralClinicalExam.coughType")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              >
                <option value="">Sélectionner</option>
                <option value="Sèche">Sèche</option>
                <option value="Productive">Productive</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.expectoration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Aspect des expectorations
              </label>
              <input
                type="text"
                id="clinicalExam.expectoration"
                {...register("pleuralClinicalExam.expectoration")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Hémoptysie */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.hemoptysis"
              {...register("pleuralClinicalExam.hemoptysis")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Hémoptysie
            </span>
          </label>
        </div>

        {hemoptysis && (
          <div className="ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.hemoptysisAbundance"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Abondance
            </label>
            <select
              id="clinicalExam.hemoptysisAbundance"
              {...register("pleuralClinicalExam.hemoptysisAbundance")}
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

      {/* Autres signes */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.otherSigns"
              {...register("pleuralClinicalExam.otherSigns")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Autres signes
            </span>
          </label>
        </div>

        {otherSigns && (
          <div className="ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.otherSignsDescription"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="clinicalExam.otherSignsDescription"
              {...register("pleuralClinicalExam.otherSignsDescription")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Signes généraux */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          Signes généraux
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.asthenia"
              {...register("pleuralClinicalExam.generalSigns.asthenia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.asthenia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Asthénie
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.amg"
              {...register("pleuralClinicalExam.generalSigns.amg")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.amg"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              AMG
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.anorexia"
              {...register("pleuralClinicalExam.generalSigns.anorexia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.anorexia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Anorexie
            </label>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.fever"
              {...register("pleuralClinicalExam.generalSigns.fever")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.fever"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fièvre
            </label>
          </div>
        </div>
      </div>

      {/* État clinique */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.psOms"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            PS OMS
          </label>
          <input
            type="number"
            id="clinicalExam.psOms"
            {...register("pleuralClinicalExam.psOms", { valueAsNumber: true })}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.hemodynamicState"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            État hémodynamique
          </label>
          <select
            id="clinicalExam.hemodynamicState"
            {...register("pleuralClinicalExam.hemodynamicState")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Stable">Stable</option>
            <option value="Instable">Instable</option>
          </select>
        </div>
      </div>

      {/* État respiratoire */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.sao2"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            SaO2
          </label>
          <select
            id="clinicalExam.sao2"
            {...register("pleuralClinicalExam.sao2")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value=">95%">&gt;95%</option>
            <option value="<95%">&lt;95%</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.respiratoryRate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            FR
          </label>
          <select
            id="clinicalExam.respiratoryRate"
            {...register("pleuralClinicalExam.respiratoryRate")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="<20">&lt;20</option>
            <option value=">20">&gt;20</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.respiratoryStruggle"
              {...register("pleuralClinicalExam.respiratoryStruggle")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.respiratoryStruggle"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Signes de lutte respiratoire
            </label>
          </div>
        </div>
      </div>

      {/* Syndrome d'épanchement */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.liquidEffusionSyndrome"
              {...register("pleuralClinicalExam.liquidEffusionSyndrome")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Syndrome d&apos;épanchement liquidien
            </span>
          </label>
        </div>

        {liquidEffusionSyndrome && (
          <div className="ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.liquidEffusionLocation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Siège
            </label>
            <select
              id="clinicalExam.liquidEffusionLocation"
              {...register("pleuralClinicalExam.liquidEffusionLocation")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            >
              <option value="">Sélectionner</option>
              <option value="Droite">Droite</option>
              <option value="Gauche">Gauche</option>
              <option value="Bilatérale">Bilatérale</option>
            </select>
          </div>
        )}
      </div>

      {/* Syndrome d'épanchement mixte */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <input
              type="checkbox"
              id="clinicalExam.mixedEffusionSyndrome"
              {...register("pleuralClinicalExam.mixedEffusionSyndrome")}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Syndrome d&apos;épanchement mixte
            </span>
          </label>
        </div>

        {mixedEffusionSyndrome && (
          <div className="ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.mixedEffusionLocation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Siège
            </label>
            <select
              id="clinicalExam.mixedEffusionLocation"
              {...register("pleuralClinicalExam.mixedEffusionLocation")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            >
              <option value="">Sélectionner</option>
              <option value="Droite">Droite</option>
              <option value="Gauche">Gauche</option>
              <option value="Bilatérale">Bilatérale</option>
            </select>
          </div>
        )}
      </div>

      {/* Examen cardio */}
      <div className="mb-6">
        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.cardioExam"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Examen cardio
          </label>
          <select
            id="clinicalExam.cardioExam"
            {...register("pleuralClinicalExam.cardioExam")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Normal">Normal</option>
            <option value="Anormal">Anormal</option>
          </select>
        </div>

        {cardioExam === "Anormal" && (
          <div className="mt-2 ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.cardioExamDescription"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="clinicalExam.cardioExamDescription"
              {...register("pleuralClinicalExam.cardioExamDescription")}
              rows={2}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Examen abdominal */}
      <div className="mb-6">
        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.abdominalExam"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Examen abdominal
          </label>
          <select
            id="clinicalExam.abdominalExam"
            {...register("pleuralClinicalExam.abdominalExam")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Normal">Normal</option>
            <option value="Anormal">Anormal</option>
          </select>
        </div>

        {abdominalExam === "Anormal" && (
          <div className="mt-2 ml-6 space-y-2">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="clinicalExam.ascites"
                {...register("pleuralClinicalExam.ascites")}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label
                htmlFor="clinicalExam.ascites"
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ascite
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="clinicalExam.otherAbdominalFindings"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Autres
              </label>
              <textarea
                id="clinicalExam.otherAbdominalFindings"
                {...register("pleuralClinicalExam.otherAbdominalFindings")}
                rows={2}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Aires ganglionnaires */}
      <div className="mb-6">
        <div className="space-y-2">
          <label
            htmlFor="clinicalExam.lymphNodes"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Aires ganglionnaires
          </label>
          <select
            id="clinicalExam.lymphNodes"
            {...register("pleuralClinicalExam.lymphNodes")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="Libres">Libres</option>
            <option value="ADP">ADP</option>
          </select>
        </div>

        {lymphNodes === "ADP" && (
          <div className="mt-2 ml-6 space-y-2">
            <label
              htmlFor="clinicalExam.lymphNodesLocation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Localisation
            </label>
            <input
              type="text"
              id="clinicalExam.lymphNodesLocation"
              {...register("pleuralClinicalExam.lymphNodesLocation")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Autres examens */}
      <div className="mt-6 space-y-2">
        <label
          htmlFor="clinicalExam.otherExams"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Autres examens
        </label>
        <textarea
          id="clinicalExam.otherExams"
          {...register("pleuralClinicalExam.otherExams")}
          rows={3}
          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
        />
      </div>
    </div>
  );
}
