"use client";

import { ExtendedPatient } from "@/components/patients/display/types";
import { Button } from "@/components/shared/Button";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

interface PatientActionsProps {
  patient: ExtendedPatient;
  canArchive?: boolean;
  onArchiveToggle?: () => void;
  isArchiving?: boolean;
  className?: string;
}

export function PatientActions({
  patient,
  canArchive = false,
  onArchiveToggle,
  isArchiving = false,
  className = "",
}: PatientActionsProps) {
  if (!canArchive) return null;

  return (
    <div className={`text-right mt-8 px-4 sm:px-0 ${className}`}>
      <Button
        variant="outline"
        onClick={onArchiveToggle}
        disabled={isArchiving}
        className={clsx(
          "w-full sm:w-auto",
          patient.status === "archived"
            ? "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
            : "border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
        )}
      >
        {isArchiving ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {patient.status === "archived" ? "Désarchivage..." : "Archivage..."}
          </>
        ) : (
          <>
            <ArchiveBoxIcon className="h-5 w-5 mr-2" />
            {patient.status === "archived"
              ? "Désarchiver le dossier"
              : "Archiver le dossier"}
          </>
        )}
      </Button>
    </div>
  );
}
