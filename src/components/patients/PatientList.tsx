"use client";

import { getPatients } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import type { Patient } from "@/types/patient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface PatientListProps {
  status: "active" | "archived";
  selectedPathologies?: string[];
}

interface PatientListItemProps {
  patient: Patient;
  status: "active" | "archived";
}

function PatientListItem({ patient, status }: PatientListItemProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex items-center justify-between sm:justify-start flex-1">
          <div className="flex items-center min-w-0">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="ml-2 text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              {calculateAge(patient.birthDate)} ans
            </p>
          </div>
          <div className="sm:hidden text-sm text-gray-500 dark:text-gray-400">
            {calculateAge(patient.birthDate)} ans
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              status === "active"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
            }`}
          >
            {status === "active" ? "En cours" : "Archivé"}
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
        <div className="flex items-center text-sm">
          <span className="font-medium sm:hidden text-gray-500 dark:text-gray-400">
            Médecin traitant:
          </span>
          <span className="ml-1 sm:ml-0 inline-flex items-center px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors cursor-default">
            <svg
              className="w-3.5 h-3.5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {patient.treatingDoctor || "Non spécifié"}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium sm:hidden">Dernière mise à jour:</span>
          <span className="ml-1 sm:ml-0">
            {patient.updatedAt
              ? new Date(patient.updatedAt).toLocaleDateString()
              : "Non spécifié"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PatientList({
  status,
  selectedPathologies = [],
}: PatientListProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isResident } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!user) return;

        const patientsData = await getPatients(user.uid, user.role);
        let filteredPatients = patientsData.filter((p) => p.status === status);

        // Appliquer le filtre par pathologie si des pathologies sont sélectionnées
        if (selectedPathologies.length > 0) {
          filteredPatients = filteredPatients.filter(
            (patient) =>
              // S'assurer que patient.pathologies est un tableau
              Array.isArray(patient.pathologies) &&
              selectedPathologies.some((pathology) =>
                patient.pathologies.includes(pathology)
              )
          );
        }

        // Si c'est un résident, on affiche un message spécial
        if (isResident) {
          toast.success("Affichage de vos dossiers patients uniquement");
        }

        setPatients(filteredPatients);
      } catch (error) {
        console.error("Erreur lors de la récupération des patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [user, status, isResident, selectedPathologies]);

  if (loading) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-gray-500 dark:text-gray-400">
          Aucun patient {status === "active" ? "en cours" : "archivé"}
          {selectedPathologies.length > 0 &&
            " pour les pathologies sélectionnées"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden sm:rounded-lg">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link
              href={`/patients/${patient.id}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <PatientListItem patient={patient} status={status} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
