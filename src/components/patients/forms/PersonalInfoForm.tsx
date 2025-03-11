import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { FormSectionProps } from "./types";

export function PersonalInfoForm({
  register,
  errors,
  setValue,
}: FormSectionProps) {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.displayName) {
      setValue("treatingDoctor", user.displayName);
    }
  }, [user, setValue]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Informations personnelles
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nom
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Prénom
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date de naissance
          </label>
          <input
            type="date"
            {...register("birthDate")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sex"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Sexe
          </label>
          <select
            {...register("sex")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          >
            <option value="">Sélectionnez le sexe</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Adresse
          </label>
          <input
            type="text"
            {...register("address")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Téléphone
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Profession
          </label>
          <input
            type="text"
            {...register("profession")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="treatingDoctor"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Médecin traitant
          </label>
          <input
            type="text"
            {...register("treatingDoctor")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="socialSecurity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Couverture Sociale
          </label>
          <select
            {...register("socialSecurity")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          >
            <option value="">Sélectionnez une couverture sociale</option>
            <option value="CNSS">CNSS</option>
            <option value="AMO">AMO</option>
            <option value="Mutuelle">Mutuelle</option>
            <option value="Aucun">Aucun</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lastVisit"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date de dernière visite
          </label>
          <input
            type="date"
            {...register("lastVisit")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Statut du dossier
          </label>
          <select
            {...register("status")}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors"
          >
            <option value="active">Actif</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>
    </div>
  );
}
