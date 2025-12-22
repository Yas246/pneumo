"use client";

import { ExtendedPatient } from "@/components/patients/display/types";
import { Button } from "@/components/shared/Button";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface PatientHeaderProps {
  patient: ExtendedPatient;
  patientId: string;
  canEdit?: boolean;
  canCreateAppointment?: boolean;
  onDownloadPDF?: () => void;
  isGeneratingPDF?: boolean;
  className?: string;
}

export function PatientHeader({
  patient,
  patientId,
  canEdit = false,
  canCreateAppointment = false,
  onDownloadPDF,
  isGeneratingPDF = false,
  className = "",
}: PatientHeaderProps) {
  return (
    <div className={className}>
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Retour au tableau de bord
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {patient?.firstName} {patient?.lastName}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Patient ID: {patientId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {canCreateAppointment && (
            <Link
              href={`/appointments/new?patientId=${patientId}`}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                <span className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Nouveau rendez-vous
                </span>
              </Button>
            </Link>
          )}

          {canEdit && (
            <Link
              href={`/patients/${patientId}/edit`}
              className="w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto">
                <span className="flex items-center">
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                  Voir le dossier complet
                </span>
              </Button>
            </Link>
          )}

          <Button
            variant="outline"
            onClick={() => onDownloadPDF?.()}
            disabled={isGeneratingPDF || !patient}
            className="w-full sm:w-auto"
          >
            <span className="flex items-center">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
              {isGeneratingPDF ? "Génération..." : "Télécharger PDF"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
