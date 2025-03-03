"use client";

import Link from "next/link";

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  lastVisit: string;
  status: "active" | "archived";
}

interface PatientListProps {
  status: "active" | "archived";
}

// Données temporaires pour la démonstration
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Jean Dupont",
    age: 45,
    diagnosis: "Pneumopathie tumorale",
    lastVisit: "2024-03-01",
    status: "active",
  },
  {
    id: "2",
    name: "Marie Martin",
    age: 62,
    diagnosis: "BPCO",
    lastVisit: "2024-02-28",
    status: "active",
  },
  {
    id: "3",
    name: "Pierre Durant",
    age: 53,
    diagnosis: "Asthme sévère",
    lastVisit: "2024-01-15",
    status: "archived",
  },
  {
    id: "4",
    name: "Camille Roux",
    age: 34,
    diagnosis: "Asthme",
    lastVisit: "2024-02-10",
    status: "active",
  },
  {
    id: "5",
    name: "Antoine Girard",
    age: 29,
    diagnosis: "Asthme",
    lastVisit: "2024-03-01",
    status: "archived",
  },
  {
    id: "6",
    name: "Camille Dupont",
    age: 34,
    diagnosis: "Asthme",
    lastVisit: "2024-02-10",
    status: "archived",
  },
];

export function PatientList({ status }: PatientListProps) {
  const filteredPatients = mockPatients.filter(
    (patient) => patient.status === status
  );

  if (filteredPatients.length === 0) {
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
        {filteredPatients.map((patient) => (
          <li key={patient.id}>
            <Link
              href={`/patients/${patient.id}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="px-4 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex items-center justify-between sm:justify-start flex-1">
                    <div className="flex items-center min-w-0">
                      <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">
                        {patient.name}
                      </p>
                      <p className="ml-2 text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                        {patient.age} ans
                      </p>
                    </div>
                    <div className="sm:hidden text-sm text-gray-500 dark:text-gray-400">
                      {patient.age} ans
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
                    <span className="font-medium sm:hidden">Diagnostic:</span>
                    <span className="ml-1 sm:ml-0">{patient.diagnosis}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium sm:hidden">
                      Dernière visite:
                    </span>
                    <span className="ml-1 sm:ml-0">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
