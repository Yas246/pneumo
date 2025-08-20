import { ExtendedPatientFormData, FormSectionProps } from "../../types";

export function ComplementaryExamsForm({
  register,
  disabled,
}: FormSectionProps<ExtendedPatientFormData>) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        VI. Examens complémentaires
      </h3>

      <div className="space-y-8">
        {/* Bilan à visée diagnostique */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Bilan à visée diagnostique
          </h4>

          {/* EFR / spirométrie */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              EFR / spirométrie
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VEMS (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.spirometry.vems", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VEMS/CV (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.spirometry.vemsCv", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 65"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stade GOLD
                </label>
                <select
                  {...register("bpcoDiagnosticTests.spirometry.goldStage", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                >
                  <option value="">Sélectionnez</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pléthysmographie */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Pléthysmographie
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CPT (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.plethysmography.cpt", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 5.2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  VR (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.plethysmography.vr", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 2.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CRF (L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bpcoDiagnosticTests.plethysmography.crf", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 3.1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bilan de retentissement */}
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Bilan de retentissement
          </h4>

          {/* Gaz du sang */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Gaz du sang
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  pH
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("bpcoImpactAssessment.bloodGas.ph", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 7.35"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PaO2 (mmHg)
                </label>
                <input
                  type="number"
                  {...register("bpcoImpactAssessment.bloodGas.paO2", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PaCO2 (mmHg)
                </label>
                <input
                  type="number"
                  {...register("bpcoImpactAssessment.bloodGas.paCO2", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Ex: 45"
                />
              </div>
            </div>
          </div>

          {/* Bilan biologique */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Bilan biologique
            </h5>

            {/* CBC */}
            <div className="mb-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors mb-3">
                <input
                  type="checkbox"
                  {...register("bpcoDiagnosticTests.biology.cbc.done")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  NFS - Numération formule sanguine
                </span>
              </label>

              <div className="ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hémoglobine (g/dL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("bpcoDiagnosticTests.biology.cbc.hemoglobin", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 14.2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    MCV (fL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register("bpcoDiagnosticTests.biology.cbc.mcv", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 85"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Globules blancs (/mm³)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "bpcoDiagnosticTests.biology.cbc.whiteBloodCells",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 7500"
                  />
                </div>
              </div>
            </div>

            {/* Biochimie */}
            <div className="mb-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors mb-3">
                <input
                  type="checkbox"
                  {...register("bpcoDiagnosticTests.biology.biochemistry.done")}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Biochimie
                </span>
              </label>

              <div className="ml-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Créatinine (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.creatinine",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ASAT (UI/L)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.ast",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ALAT (UI/L)
                  </label>
                  <input
                    type="number"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.alt",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CRP (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register(
                      "bpcoDiagnosticTests.biology.biochemistry.crp",
                      {
                        setValueAs: (value) =>
                          value === "" ? null : Number(value),
                      }
                    )}
                    disabled={disabled}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ex: 5.2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Microbiologie */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Microbiologie
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  BK expectoration
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.microbiology.bkSputum")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultat BK..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ECBU
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.microbiology.ecbc")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultat ECBU..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  PCR
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.microbiology.pcr")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultat PCR..."
                />
              </div>
            </div>
          </div>

          {/* Bronchoscopie */}
          <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Bronchoscopie
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Résultats
                </label>
                <textarea
                  {...register("bpcoDiagnosticTests.bronchoscopy.findings")}
                  disabled={disabled}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats de la bronchoscopie..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LBA
                </label>
                <textarea
                  {...register("bpcoDiagnosticTests.bronchoscopy.bal")}
                  disabled={disabled}
                  rows={2}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats LBA..."
                />
              </div>
            </div>
          </div>

          {/* Évaluation fonctionnelle */}
          <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Évaluation fonctionnelle
            </h5>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test de tolérance à la marche de 6 min
                </label>
                <input
                  type="text"
                  {...register(
                    "bpcoDiagnosticTests.functionalAssessment.walkTest"
                  )}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Distance parcourue, dyspnée..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ECG
                </label>
                <input
                  type="text"
                  {...register("bpcoDiagnosticTests.functionalAssessment.ecg")}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats ECG..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Échocardiographie
                </label>
                <input
                  type="text"
                  {...register(
                    "bpcoDiagnosticTests.functionalAssessment.echocardiography"
                  )}
                  disabled={disabled}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Résultats échocardiographie..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
