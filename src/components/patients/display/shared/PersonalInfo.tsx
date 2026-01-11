"use client";

import { ExtendedPatient } from "@/components/patients/display/types";
import { SectionHeader } from "./SectionHeader";

interface PersonalInfoProps {
  patient: ExtendedPatient;
  className?: string;
}

export function PersonalInfo({ patient, className = "" }: PersonalInfoProps) {
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div
      className={`px-6 py-5 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      <SectionHeader title="Informations personnelles" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Âge
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {calculateAge(patient?.birthDate)} ans
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Téléphone
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {patient?.phone}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Profession
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {patient?.profession}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Adresse
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {patient?.address}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Médecin traitant
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {patient?.treatingDoctor}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Couverture Sociale
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {patient?.socialSecurity}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            IP HOSIX
          </p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {patient?.ipHosix || "Non spécifié"}
          </p>
        </div>
      </div>
    </div>
  );
}
