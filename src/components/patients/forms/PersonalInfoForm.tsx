/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { countryCodes, DEFAULT_COUNTRY_CODE } from "./phoneCountries";
import { FormSectionProps } from "./types";

export function PersonalInfoForm({
  register,
  errors,
  setValue,
  disabled,
  watch,
  isEditing = false,
}: FormSectionProps) {
  const { user } = useAuth();
  const [selectedCountryCode, setSelectedCountryCode] =
    useState(DEFAULT_COUNTRY_CODE);
  const phoneValue = watch("phone", "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.displayName) {
      setValue("treatingDoctor", user.displayName);
    }
  }, [user, setValue]);

  // Initialiser le numéro de téléphone avec l'indicatif par défaut si vide (uniquement en création)
  useEffect(() => {
    if (!isEditing && !phoneValue) {
      setValue("phone", DEFAULT_COUNTRY_CODE);
    }
  }, [isEditing, phoneValue, setValue]);

  // Initialiser le code pays sélectionné à partir du numéro de téléphone existant
  useEffect(() => {
    if (phoneValue) {
      // Trouver le code pays correspondant dans le numéro de téléphone
      for (const country of countryCodes) {
        if (phoneValue.startsWith(country.dialCode)) {
          setSelectedCountryCode(country.dialCode);
          break;
        }
      }
    }
  }, [phoneValue]);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrer les pays selon la recherche
  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

  // Sélectionner un pays
  const handleCountrySelect = (country: (typeof countryCodes)[0]) => {
    setSelectedCountryCode(country.dialCode);
    const currentPhone = phoneValue;
    if (currentPhone) {
      let phoneNumber = currentPhone;
      countryCodes.forEach((c) => {
        if (phoneNumber.startsWith(c.dialCode)) {
          phoneNumber = phoneNumber.substring(c.dialCode.length);
        }
      });
      setValue("phone", country.dialCode + phoneNumber);
    } else {
      setValue("phone", country.dialCode);
    }
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

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
          <div className="flex" ref={dropdownRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
                disabled={disabled}
                className="inline-flex items-center justify-between px-3 py-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-600 min-w-[120px]"
              >
                <span>
                  {
                    countryCodes.find((c) => c.dialCode === selectedCountryCode)
                      ?.flag
                  }{" "}
                  {selectedCountryCode}
                </span>
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un pays..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-48 overflow-auto">
                    {filteredCountries.length === 0 ? (
                      <div className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                        Aucun pays trouvé
                      </div>
                    ) : (
                      filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none transition-colors"
                        >
                          <span className="flex items-center">
                            <span className="mr-2">{country.flag}</span>
                            <span className="text-gray-900 dark:text-white">
                              {country.name}
                            </span>
                            <span className="ml-auto text-gray-500 dark:text-gray-400">
                              {country.dialCode}
                            </span>
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
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
