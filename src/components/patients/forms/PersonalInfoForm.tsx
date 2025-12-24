/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { countryCodes, DEFAULT_COUNTRY_CODE } from "./phoneCountries";
import { FormSectionProps } from "./types";

export function PersonalInfoForm({
  register,
  errors,
  setValue,
  disabled,
  watch,
}: FormSectionProps) {
  const { user } = useAuth();
  const [selectedCountryCode, setSelectedCountryCode] =
    useState(DEFAULT_COUNTRY_CODE);
  const phoneValue = watch("phone", "");

  useEffect(() => {
    if (user?.displayName) {
      setValue("treatingDoctor", user.displayName);
    }
  }, [user, setValue]);

  // Gérer le changement du code pays
  const handleCountryCodeChange = (newDialCode: string) => {
    setSelectedCountryCode(newDialCode);
    // Mettre à jour le numéro de téléphone avec le nouvel indicatif
    const currentPhone = phoneValue;
    if (currentPhone) {
      // Extraire le numéro sans l'indicatif actuel
      let phoneNumber = currentPhone;
      // Retirer tous les indicatifs possibles
      countryCodes.forEach((country) => {
        if (phoneNumber.startsWith(country.dialCode)) {
          phoneNumber = phoneNumber.substring(country.dialCode.length);
        }
      });
      // Ajouter le nouvel indicatif
      setValue("phone", newDialCode + phoneNumber);
    } else {
      setValue("phone", newDialCode);
    }
  };

  // Initialiser le numéro de téléphone avec l'indicatif par défaut si vide
  useEffect(() => {
    if (!phoneValue) {
      setValue("phone", DEFAULT_COUNTRY_CODE);
    }
  }, []);

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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Téléphone
          </label>
          <div className="flex">
            <select
              value={selectedCountryCode}
              onChange={(e) => handleCountryCodeChange(e.target.value)}
              disabled={disabled}
              className="inline-flex items-center px-3 py-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.dialCode}>
                  {country.flag} {country.dialCode}
                </option>
              ))}
            </select>
            <input
              type="tel"
              {...register("phone")}
              disabled={disabled}
              placeholder="Numéro de téléphone"
              className="flex-1 block px-4 py-3 rounded-r-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            {...register("lastVisit" as any)}
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
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
            disabled={disabled}
            className="block px-4 w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-3 transition-colors disabled:bg-gray-100 dark:disabled:bg-gray-600"
          >
            <option value="active">Actif</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>
    </div>
  );
}
