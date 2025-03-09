"use client";

import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { pathologies } from "@/config/pathologies";
import { getPatient, updatePatient } from "@/firebase/patients";
import { usePermissions } from "@/hooks/usePermissions";
import type { Patient } from "@/types/patient";
import {
  ArchiveBoxIcon,
  ArrowLeftIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function PatientPage() {
  const { id } = useParams();
  const router = useRouter();
  const { canEdit, canArchive, canCreateAppointment } = usePermissions();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isArchiving, setIsArchiving] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (typeof id === "string") {
          const patientData = await getPatient(id);
          setPatient(patientData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du patient:", error);
        toast.error("Erreur lors de la récupération du patient");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleArchiveToggle = async () => {
    if (!patient || typeof id !== "string") return;

    setIsArchiving(true);
    try {
      const newStatus = patient.status === "archived" ? "active" : "archived";
      await updatePatient(id, {
        ...patient,
        status: newStatus,
      });

      // Mettre à jour l'état local
      setPatient({
        ...patient,
        status: newStatus,
      });

      toast.success(
        newStatus === "archived"
          ? "Patient archivé avec succès"
          : "Patient désarchivé avec succès"
      );

      // Ne pas rediriger vers le dashboard si on désarchive
      if (newStatus === "archived") {
        router.push("/dashboard");
      } else {
        setIsArchiving(false);
      }
    } catch (error) {
      console.error("Erreur lors de la modification du statut:", error);
      toast.error(
        patient.status === "archived"
          ? "Erreur lors de la désarchivation du patient"
          : "Erreur lors de l'archivage du patient"
      );
      setIsArchiving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Patient non trouvé
          </h1>
          <Link
            href="/dashboard"
            className="text-primary-600 hover:text-primary-700"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-8 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour au tableau de bord
            </Link>

            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Patient ID: {id}
                </p>
              </div>
              <div className="flex space-x-4">
                {canCreateAppointment && (
                  <Link href={`/appointments/new?patientId=${id}`}>
                    <Button variant="outline">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Nouveau rendez-vous
                    </Button>
                  </Link>
                )}
                {canEdit && (
                  <Link href={`/patients/${id}/edit`}>
                    <Button>
                      <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                      Modifier le dossier
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              {/* Informations personnelles */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Âge
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {calculateAge(patient.birthDate)} ans
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Téléphone
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Profession
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.profession}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Adresse
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Médecin traitant
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.treatingDoctor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Couverture Sociale
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.socialSecurity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pathologies */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Pathologies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {patient.pathologies?.map((pathologyId) => {
                    const pathology = pathologies.find(
                      (p) => p.id === pathologyId
                    );
                    if (!pathology) return null;
                    return (
                      <div
                        key={pathologyId}
                        className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                      >
                        <div className="flex-shrink-0 w-10 h-10 relative">
                          <Image
                            src={pathology.icon}
                            alt={pathology.name}
                            fill
                            className="object-contain dark:invert"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {pathology.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {pathology.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Motif de consultation */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Motif de consultation
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Raison
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.consultationReason || "Non spécifié"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Durée des symptômes
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient.symptomsDuration || "Non spécifié"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Symptômes diurnes
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {patient.diurnalSymptoms?.excessiveSleepiness && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          Somnolence excessive
                        </span>
                      )}
                      {patient.diurnalSymptoms?.headaches && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          Céphalées
                        </span>
                      )}
                      {patient.diurnalSymptoms?.asthenia && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          Asthénie
                        </span>
                      )}
                    </div>
                    {patient.diurnalSymptoms?.epworthScore > 0 && (
                      <p className="mt-2 text-sm text-gray-900 dark:text-white">
                        Score d&apos;Epworth:{" "}
                        {patient.diurnalSymptoms.epworthScore}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Symptômes nocturnes
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {patient.nocturnalSymptoms?.snoring && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Ronflement
                        </span>
                      )}
                      {patient.nocturnalSymptoms?.sleepApnea && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Apnées
                        </span>
                      )}
                      {patient.nocturnalSymptoms?.choking && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Étouffements
                        </span>
                      )}
                      {patient.nocturnalSymptoms?.agitation && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Agitation
                        </span>
                      )}
                      {patient.nocturnalSymptoms?.insomnia && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Insomnie
                        </span>
                      )}
                      {patient.nocturnalSymptoms?.nocturia && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Nycturie
                        </span>
                      )}
                    </div>
                    {patient.nocturnalSymptoms?.other && (
                      <p className="mt-2 text-sm text-gray-900 dark:text-white">
                        Autres: {patient.nocturnalSymptoms.other}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Antécédents */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Antécédents
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Personnels
                    </p>
                    <div className="mt-2 space-y-2">
                      {patient.personalHistory?.obesity && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Obésité
                        </p>
                      )}
                      {patient.personalHistory?.hta && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • HTA
                        </p>
                      )}
                      {patient.personalHistory?.orl && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • ORL: {patient.personalHistory.orl}
                        </p>
                      )}
                      {patient.personalHistory?.neuro && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Neuro: {patient.personalHistory.neuro}
                        </p>
                      )}
                      {patient.personalHistory?.smoking && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Tabagisme: {patient.personalHistory.smoking}
                        </p>
                      )}
                      {patient.personalHistory?.alcoholism && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Alcool: {patient.personalHistory.alcoholism}
                        </p>
                      )}
                      {patient.personalHistory?.diabetes && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Diabète: {patient.personalHistory.diabetes}
                        </p>
                      )}
                      {patient.personalHistory?.cardiovascularDiseases && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Cardiovasculaire:{" "}
                          {patient.personalHistory.cardiovascularDiseases}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Familiaux
                    </p>
                    <div className="mt-2 space-y-2">
                      {patient.familyHistory?.saosHistory && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Antécédents de SAOS
                        </p>
                      )}
                      {patient.familyHistory?.respiratoryPathologies && (
                        <p className="text-sm text-gray-900 dark:text-white">
                          • Pathologies respiratoires
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Examen clinique */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Examen clinique
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {patient.clinicalExam?.weight && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Poids
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.clinicalExam.weight} kg
                        </p>
                      </div>
                    )}
                    {patient.clinicalExam?.height && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Taille
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.clinicalExam.height} cm
                        </p>
                      </div>
                    )}
                    {patient.clinicalExam?.bmi && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          IMC
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.clinicalExam.bmi} kg/m²
                        </p>
                      </div>
                    )}
                    {patient.clinicalExam?.neckCircumference && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Tour de cou
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.clinicalExam.neckCircumference} cm
                        </p>
                      </div>
                    )}
                    {patient.clinicalExam?.abdominalPerimeter && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Périmètre abdominal
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.clinicalExam.abdominalPerimeter} cm
                        </p>
                      </div>
                    )}
                  </div>
                  {patient.clinicalExam?.bloodPressure && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tension artérielle
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.clinicalExam.bloodPressure}
                      </p>
                    </div>
                  )}
                  {patient.clinicalExam?.heartRate && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Fréquence cardiaque
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.clinicalExam.heartRate} bpm
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Diagnostic */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Diagnostic
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {patient.diagnosis?.saos && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        SAOS
                      </span>
                    )}
                    {patient.diagnosis?.sacs && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        SACS
                      </span>
                    )}
                    {patient.diagnosis?.soh && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        SOH
                      </span>
                    )}
                    {patient.diagnosis?.nocturalHypoventilation && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Hypoventilation nocturne
                      </span>
                    )}
                    {patient.diagnosis?.simpleSnoring && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Ronflement simple
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Traitement */}
              <div className="px-6 py-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Traitement
                </h2>
                <div className="space-y-6">
                  {patient.treatment?.hygieneDietetic?.weightLoss && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Mesures hygiéno-diététiques
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        • Perte de poids
                      </p>
                    </div>
                  )}
                  {patient.treatment?.hygieneDietetic
                    ?.alcoholAndSedativesStop && (
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      • Arrêt alcool et sédatifs
                    </p>
                  )}
                  {patient.treatment?.hygieneDietetic
                    ?.sleepHygieneImprovement && (
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      • Amélioration de l&apos;hygiène du sommeil
                    </p>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Appareillage
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {patient.treatment?.medicalTreatments?.ppc && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                          PPC
                        </span>
                      )}
                      {patient.treatment?.medicalTreatments?.oam && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                          OAM
                        </span>
                      )}
                    </div>
                    {patient.treatment?.medicalTreatments?.medications && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Traitement médical
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.treatment.medicalTreatments.medications}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right mt-8 px-4 sm:px-0">
            {canArchive && (
              <Button
                variant="outline"
                onClick={handleArchiveToggle}
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
                    {patient.status === "archived"
                      ? "Désarchivage..."
                      : "Archivage..."}
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
