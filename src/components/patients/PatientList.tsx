"use client";

import { getPatients } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
import type { Patient } from "@/types/patient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface PatientListProps {
  status: "active" | "archived";
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
        <div className="flex-shrink-0">
          <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              status === "active"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
            }`}
          >
            {status === "active" ? "En cours" : "Archivé"}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium sm:hidden">Motif:</span>
          <span className="ml-1 sm:ml-0">
            {patient.consultationReason || "Non spécifié"}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium sm:hidden">Dernière visite:</span>
          <span className="ml-1 sm:ml-0">
            {patient.lastVisit
              ? new Date(patient.lastVisit).toLocaleDateString()
              : "Non spécifié"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PatientList({ status }: PatientListProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isResident } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!user) return;

        const patientsData = await getPatients(user.uid, user.role);
        const filteredPatients = patientsData.filter(
          (p) => p.status === status
        );

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
  }, [user, status, isResident]);

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
