import { FormSectionProps } from "../../types";

export function ClinicalExamForm({ register, watch }: FormSectionProps) {
  const dyspnea = watch("clinicalExam.dyspnea");
  const basiThoracicPain = watch("clinicalExam.basiThoracicPain");
  const cough = watch("clinicalExam.cough");
  const hemoptysis = watch("clinicalExam.hemoptysis");
  const otherSigns = watch("clinicalExam.otherSigns");
  const liquidEffusionSyndrome = watch("clinicalExam.liquidEffusionSyndrome");
  const mixedEffusionSyndrome = watch("clinicalExam.mixedEffusionSyndrome");
  const cardioExam = watch("clinicalExam.cardioExam");
  const abdominalExam = watch("clinicalExam.abdominalExam");
  const lymphNodes = watch("clinicalExam.lymphNodes");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Examen Clinique
      </h3>

      {/* Dyspnée */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.dyspnea"
            {...register("clinicalExam.dyspnea")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.dyspnea"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dyspnée
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
              {...register("clinicalExam.dyspneaSadoulStage")}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
            />
          </div>
        )}
      </div>

      {/* Douleur basi-thoracique */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.basiThoracicPain"
            {...register("clinicalExam.basiThoracicPain")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.basiThoracicPain"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Douleur basi-thoracique
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
                {...register("clinicalExam.painLocation")}
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
                {...register("clinicalExam.painType")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Toux */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.cough"
            {...register("clinicalExam.cough")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.cough"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Toux
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
                {...register("clinicalExam.coughType")}
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
                {...register("clinicalExam.expectoration")}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>

      {/* Hémoptysie */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.hemoptysis"
            {...register("clinicalExam.hemoptysis")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.hemoptysis"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Hémoptysie
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
              {...register("clinicalExam.hemoptysisAbundance")}
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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.otherSigns"
            {...register("clinicalExam.otherSigns")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.otherSigns"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres signes
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
              {...register("clinicalExam.otherSignsDescription")}
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.asthenia"
              {...register("clinicalExam.generalSigns.asthenia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.asthenia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Asthénie
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.amg"
              {...register("clinicalExam.generalSigns.amg")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.amg"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              AMG
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.anorexia"
              {...register("clinicalExam.generalSigns.anorexia")}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="clinicalExam.generalSigns.anorexia"
              className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Anorexie
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="clinicalExam.generalSigns.fever"
              {...register("clinicalExam.generalSigns.fever")}
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
            {...register("clinicalExam.psOms", { valueAsNumber: true })}
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
            {...register("clinicalExam.hemodynamicState")}
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
            {...register("clinicalExam.sao2")}
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
            {...register("clinicalExam.respiratoryRate")}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          >
            <option value="">Sélectionner</option>
            <option value="<20">&lt;20</option>
            <option value=">20">&gt;20</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="clinicalExam.respiratoryStruggle"
              {...register("clinicalExam.respiratoryStruggle")}
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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.liquidEffusionSyndrome"
            {...register("clinicalExam.liquidEffusionSyndrome")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.liquidEffusionSyndrome"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Syndrome d&apos;épanchement liquidien
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
              {...register("clinicalExam.liquidEffusionLocation")}
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
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="clinicalExam.mixedEffusionSyndrome"
            {...register("clinicalExam.mixedEffusionSyndrome")}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="clinicalExam.mixedEffusionSyndrome"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Syndrome d&apos;épanchement mixte
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
              {...register("clinicalExam.mixedEffusionLocation")}
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
            {...register("clinicalExam.cardioExam")}
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
              {...register("clinicalExam.cardioExamDescription")}
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
            {...register("clinicalExam.abdominalExam")}
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
                {...register("clinicalExam.ascites")}
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
                {...register("clinicalExam.otherAbdominalFindings")}
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
            {...register("clinicalExam.lymphNodes")}
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
              {...register("clinicalExam.lymphNodesLocation")}
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
          {...register("clinicalExam.otherExams")}
          rows={3}
          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
        />
      </div>
    </div>
  );
}
