/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormSectionProps } from "./types";

// Liste des pathologies avec leurs traitements associés
const pathologiesList = [
  {
    name: "SAOS",
    treatments: [
      "PPC",
      "Orthèse d'avancée mandibulaire",
      "Chirurgie ORL",
      "Chirurgie maxillo-faciale",
    ],
  },
  {
    name: "SACS",
    treatments: ["PPC", "Servoventilation", "Oxygénothérapie"],
  },
  {
    name: "SOH",
    treatments: ["PPC", "VNI", "Oxygénothérapie"],
  },
  {
    name: "Hypoventilation nocturne",
    treatments: ["VNI", "Oxygénothérapie"],
  },
  {
    name: "Ronchopathie",
    treatments: [
      "Orthèse d'avancée mandibulaire",
      "Chirurgie ORL",
      "Perte de poids",
    ],
  },
];

export function DiagnosisForm({ register, watch, setValue }: FormSectionProps) {
  // Surveiller les changements des pathologies sélectionnées
  const selectedPathologies = watch("diagnosis.pathologies" as any) || [];

  // Fonction pour gérer la sélection d'une pathologie
  const handlePathologyChange = (pathologyName: string, isChecked: boolean) => {
    const currentPathologies = selectedPathologies;
    if (isChecked) {
      // Ajouter la pathologie si elle n'existe pas déjà
      if (!currentPathologies.find((p: any) => p.name === pathologyName)) {
        const pathology = pathologiesList.find((p) => p.name === pathologyName);
        if (pathology) {
          const newPathology = {
            name: pathologyName,
            selected: true,
            treatments: pathology.treatments.map((t) => ({
              name: t,
              selected: false,
            })),
          };
          setValue("diagnosis.pathologies" as any, [
            ...currentPathologies,
            newPathology,
          ]);
        }
      }
    } else {
      // Supprimer la pathologie
      setValue(
        "diagnosis.pathologies" as any,
        currentPathologies.filter((p: any) => p.name !== pathologyName)
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Diagnostic
      </h2>
      <div className="space-y-6">
        {/* Liste des pathologies */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">
            Pathologies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pathologiesList.map((pathology) => {
              const isSelected = selectedPathologies.some(
                (p: any) => p.name === pathology.name && p.selected
              );
              return (
                <div key={pathology.name} className="space-y-4">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          handlePathologyChange(
                            pathology.name,
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {pathology.name}
                      </span>
                    </div>
                  </label>
                  {isSelected && (
                    <div className="ml-6 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Traitements proposés
                      </h4>
                      <div className="space-y-2">
                        {pathology.treatments.map((treatment) => (
                          <label
                            key={`${pathology.name}-${treatment}`}
                            className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <div className="flex h-5 items-center">
                              <input
                                type="checkbox"
                                {...register(
                                  `diagnosis.pathologies.${selectedPathologies.findIndex(
                                    (p: any) => p.name === pathology.name
                                  )}.treatments.${pathology.treatments.indexOf(
                                    treatment
                                  )}.selected` as any
                                )}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <span className="text-gray-700 dark:text-gray-300">
                                {treatment}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Autres traitements */}
        <div className="space-y-2">
          <label
            htmlFor="diagnosis.otherTreatments"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Autres traitements
          </label>
          <textarea
            {...register("diagnosis.otherTreatments" as any)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
