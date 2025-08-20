"use client";

import { PatientConsultationReason } from "@/components/patients/PatientConsultationReason";
import { PatientMedicalHistory } from "@/components/patients/PatientMedicalHistory";
import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { pathologies } from "@/config/pathologies";
import { getPatient, updatePatientStatus } from "@/firebase/patients";
import { useAuth } from "@/hooks/useAuth";
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

// Interface pour étendre le type Patient avec des champs dynamiques
export interface ExtendedPatient extends Patient {
  pleuralEffusionDiagnosis?: {
    type?: string;
    etiology?: string;
  };
  pleuralEffusionTreatment?: {
    conservative?: string;
    drainage?: string;
    surgical?: string;
    specificTreatment?: string;
  };
  bpcoConsultationReason?: {
    chronicCough?: boolean;
    chronicBronchitis?: boolean;
    chronicDyspnea?: boolean;
    acuteDyspneaAggravation?: boolean;
    frequentRespiratoryInfections?: boolean;
    other?: string;
  };
  bpcoMedicalHistory?: {
    asthma?: boolean;
    asthmaExacerbationsPerYear?: number;
    bpco?: boolean;
    bpcoExacerbationsPerYear?: number;
    tuberculosis?: boolean;
    pneumonia?: boolean;
    recurrentRespiratoryInfections?: boolean;
    professionalPollutants?: string;
    domesticPollutants?: string;
    urbanPollutants?: string;
    rgo?: boolean;
    hepatopathy?: string;
    nephropathy?: string;
    cardiopathy?: string;
    connectiveTissue?: string;
    neoplasia?: string;
    other?: string;
    surgicalHistory?: string;
    vaccinations?: string[];
    smokingStatus?: string;
    paquetsAnnees?: number;
    cannabis?: boolean;
    alcohol?: boolean;
  };
  bpcoClinicalExam?: {
    performanceScore?: string;
    generalState?: {
      goodConsciousness?: boolean;
      confusion?: boolean;
      asthenia?: boolean;
      generalStateAlteration?: boolean;
    };
  };
  bpcoDiagnosis?: {
    stage?: string;
    acuteExacerbation?: boolean;
    bronchialSuperinfection?: boolean;
    chronicRespiratoryFailure?: boolean;
  };
  bpcoTreatment?: {
    maintenance?: string;
    prescribedTreatments?: string[];
    longTermOxygen?: boolean;
    therapeuticEducation?: boolean;
    smokingCessation?: boolean;
  };
  bpcoFollowUp?: {
    lastConsultation?: string;
    nextEvaluation?: string;
    pneumologyFollowUp?: boolean;
    vaccinationsUpToDate?: boolean;
  };
  bpcoComplementaryExams?: {
    vems?: number;
    vemsCvf?: number;
    goldStage?: string;
    cpt?: number;
    vr?: number;
    crf?: number;
    ph?: number;
    pao2?: number;
    paco2?: number;
  };
  bpcoDiagnosticTests?: {
    spirometry?: {
      vems?: number;
      vemsCv?: number;
      goldStage?: number;
    };
    plethysmography?: {
      cpt?: number;
      vr?: number;
      crf?: number;
    };
    biology?: {
      cbc?: {
        done?: boolean;
        hemoglobin?: number;
        mcv?: number;
        whiteBloodCells?: number;
      };
      biochemistry?: {
        done?: boolean;
        creatinine?: number;
        ast?: number;
        alt?: number;
        crp?: number;
      };
    };
    microbiology?: {
      bkSputum?: string;
      ecbc?: string;
      pcr?: string;
    };
    bronchoscopy?: {
      findings?: string;
      bal?: string;
    };
    functionalAssessment?: {
      walkTest?: string;
      ecg?: string;
      echocardiography?: string;
    };
  };
  complementaryExams?: {
    polygraphyDate: string;
    iah: number;
    iahCentral: number;
    oxygenDesaturation: number;
    ct90: number;
    gazometryDate: string;
    ph: number;
    pao2: number;
    paco2: number;
    hco3: number;
    sao2: number;
    efrDate: string;
    cvf: number;
    vems: number;
    dlco: number;
    cpt: number;
    chestXray?: {
      imageUrl: string;
      notes?: string;
    };
    scanner?: {
      imageUrl?: string;
      videoUrl?: string;
      notes?: string;
    };
  };
}

export default function PatientPage() {
  const params = useParams() as { id: string };
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const { canEdit, canArchive, canCreateAppointment } = usePermissions();
  const [patient, setPatient] = useState<ExtendedPatient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isArchiving, setIsArchiving] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (typeof id === "string") {
          const patientData = await getPatient(id);
          if (patientData) {
            console.log("Patient pathologies:", patientData.pathologies);
            console.log(
              "Has pleuralEffusion:",
              Array.isArray(patientData.pathologies) &&
                patientData.pathologies.includes("pleuralEffusion")
            );
            console.log(
              "Has sleep:",
              Array.isArray(patientData.pathologies) &&
                patientData.pathologies.includes("sleep")
            );
            console.log(
              "Has bpco:",
              Array.isArray(patientData.pathologies) &&
                patientData.pathologies.includes("bpco")
            );

            setPatient(patientData as ExtendedPatient);
          } else {
            console.log("Patient data is null");
          }
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
    if (!patient || typeof id !== "string" || !user) return;

    setIsArchiving(true);
    try {
      const newStatus = patient?.status === "archived" ? "active" : "archived";
      await updatePatientStatus(id, newStatus, user.uid);

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
        patient?.status === "archived"
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

  const defaultExams: NonNullable<ExtendedPatient["complementaryExams"]> = {
    polygraphyDate: "",
    iah: 0,
    iahCentral: 0,
    oxygenDesaturation: 0,
    ct90: 0,
    gazometryDate: "",
    ph: 0,
    pao2: 0,
    paco2: 0,
    hco3: 0,
    sao2: 0,
    efrDate: "",
    cvf: 0,
    vems: 0,
    dlco: 0,
    cpt: 0,
    chestXray: {
      imageUrl: "",
      notes: "",
    },
    scanner: {
      imageUrl: "",
      videoUrl: "",
      notes: "",
    },
  };

  const exams = patient?.complementaryExams || defaultExams;

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

            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {patient?.firstName} {patient?.lastName}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Patient ID: {id}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {canCreateAppointment && (
                  <Link
                    href={`/appointments/new?patientId=${id}`}
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="w-full sm:w-auto">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Nouveau rendez-vous
                    </Button>
                  </Link>
                )}
                {canEdit && (
                  <Link
                    href={`/patients/${id}/edit`}
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full sm:w-auto">
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
                </div>
              </div>

              {/* Pathologies */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Pathologies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.isArray(patient?.pathologies)
                    ? patient.pathologies.map((pathologyId) => {
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
                      })
                    : null}
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
                      {patient?.consultationReason || "Non spécifié"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Durée des symptômes
                    </p>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {patient?.symptomsDuration || "Non spécifié"}
                    </p>
                  </div>

                  {/* Afficher les symptômes diurnes et nocturnes uniquement pour la pathologie du sommeil */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("sleep") && (
                      <>
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
                              Autres symptômes :{" "}
                              {patient.nocturnalSymptoms.other}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                  {/* Consultation Reason - Dynamic par pathologie */}
                  <PatientConsultationReason patient={patient} />
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

                    {/* Antécédents médicaux - Dynamiques par pathologie */}
                    <PatientMedicalHistory patient={patient} />
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
                    {patient?.clinicalExam?.weight > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Poids
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient?.clinicalExam?.weight} kg
                        </p>
                      </div>
                    )}
                    {patient?.clinicalExam?.height > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Taille
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient?.clinicalExam?.height} cm
                        </p>
                      </div>
                    )}
                    {patient?.clinicalExam?.bmi > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          IMC
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient?.clinicalExam?.bmi} kg/m²
                        </p>
                      </div>
                    )}
                    {patient?.clinicalExam?.neckCircumference > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Tour de cou
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient?.clinicalExam?.neckCircumference} cm
                        </p>
                      </div>
                    )}
                    {patient?.clinicalExam?.abdominalPerimeter > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Périmètre abdominal
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient?.clinicalExam?.abdominalPerimeter} cm
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
                  {patient.clinicalExam?.heartRate > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Fréquence cardiaque
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.clinicalExam.heartRate} bpm
                      </p>
                    </div>
                  )}
                  {patient.clinicalExam?.pulmonaryAuscultation && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Auscultation pulmonaire
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.clinicalExam.pulmonaryAuscultation}
                      </p>
                    </div>
                  )}
                  {patient.clinicalExam?.saturation > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Saturation
                      </p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {patient.clinicalExam.saturation}%
                      </p>
                    </div>
                  )}

                  {/* Examen clinique spécifique BPCO */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("bpco") && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Score de performance
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.bpcoClinicalExam?.performanceScore ||
                              "Non spécifié"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            État de conscience
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {patient.bpcoClinicalExam?.generalState
                              ?.goodConsciousness && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                Bonne conscience
                              </span>
                            )}
                            {patient.bpcoClinicalExam?.generalState
                              ?.confusion && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                Confusion
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Signes généraux
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {patient.bpcoClinicalExam?.generalState
                              ?.asthenia && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                                Asthénie
                              </span>
                            )}
                            {patient.bpcoClinicalExam?.generalState
                              ?.generalStateAlteration && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                                Altération de l&apos;état général
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>

              {/* Examens complémentaires */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Examens complémentaires
                </h2>
                <div className="space-y-6">
                  {/* Examens spécifiques à la pathologie du sommeil */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("sleep") && (
                      <>
                        {/* Images et Vidéos */}
                        <div className="space-y-4">
                          {/* Radiographie thoracique */}
                          {patient.complementaryExams?.chestXray?.imageUrl && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Radiographie thoracique
                              </p>
                              <div className="relative w-full max-w-lg mx-auto">
                                <Image
                                  src={
                                    patient.complementaryExams.chestXray
                                      .imageUrl
                                  }
                                  alt="Radiographie thoracique"
                                  width={500}
                                  height={500}
                                  className="rounded-lg shadow-lg"
                                />
                              </div>
                              {patient.complementaryExams.chestXray.notes && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  Notes:{" "}
                                  {patient.complementaryExams.chestXray.notes}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Scanner/TDM */}
                          {(patient.complementaryExams?.scanner?.imageUrl ||
                            patient.complementaryExams?.scanner?.videoUrl) && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Scanner/TDM
                              </p>
                              {patient.complementaryExams.scanner.imageUrl && (
                                <div className="relative w-full max-w-lg mx-auto mb-4">
                                  <Image
                                    src={
                                      patient.complementaryExams.scanner
                                        .imageUrl
                                    }
                                    alt="Scanner"
                                    width={500}
                                    height={500}
                                    className="rounded-lg shadow-lg"
                                  />
                                </div>
                              )}
                              {patient.complementaryExams.scanner.videoUrl && (
                                <div className="relative w-full max-w-lg mx-auto mb-4">
                                  <video
                                    controls
                                    className="w-full rounded-lg shadow-lg"
                                  >
                                    <source
                                      src={
                                        patient.complementaryExams.scanner
                                          .videoUrl
                                      }
                                      type="video/mp4"
                                    />
                                    Votre navigateur ne supporte pas la lecture
                                    de vidéos.
                                  </video>
                                </div>
                              )}
                              {patient.complementaryExams.scanner.notes && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  Notes:{" "}
                                  {patient.complementaryExams.scanner.notes}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Polygraphie */}
                        {(exams.polygraphyDate ||
                          exams.iah > 0 ||
                          exams.iahCentral > 0 ||
                          exams.oxygenDesaturation > 0 ||
                          exams.ct90 > 0) && (
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                              Polygraphie
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {exams.polygraphyDate && (
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Date
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {exams.polygraphyDate}
                                  </p>
                                </div>
                              )}
                              {exams.iah > 0 && (
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    IAH
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {exams.iah}
                                  </p>
                                </div>
                              )}
                              {exams.iahCentral > 0 && (
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    IAH Central
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {exams.iahCentral}
                                  </p>
                                </div>
                              )}
                              {exams.oxygenDesaturation > 0 && (
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Désaturation en O2
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {exams.oxygenDesaturation}%
                                  </p>
                                </div>
                              )}
                              {exams.ct90 > 0 && (
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    CT90
                                  </p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {exams.ct90}%
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                  {/* Examens communs à toutes les pathologies */}
                  {/* Gazométrie */}
                  {(exams.gazometryDate ||
                    exams.ph > 0 ||
                    exams.pao2 > 0 ||
                    exams.paco2 > 0 ||
                    exams.hco3 > 0 ||
                    exams.sao2 > 0) && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Gazométrie
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {exams.gazometryDate && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Date
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.gazometryDate}
                            </p>
                          </div>
                        )}
                        {exams.ph > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              pH
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.ph}
                            </p>
                          </div>
                        )}
                        {exams.pao2 > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              PaO2
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.pao2} mmHg
                            </p>
                          </div>
                        )}
                        {exams.paco2 > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              PaCO2
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.paco2} mmHg
                            </p>
                          </div>
                        )}
                        {exams.hco3 > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              HCO3
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.hco3} mmol/L
                            </p>
                          </div>
                        )}
                        {exams.sao2 > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              SaO2
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.sao2}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* EFR */}
                  {(exams.efrDate ||
                    exams.cvf > 0 ||
                    exams.vems > 0 ||
                    exams.dlco > 0 ||
                    exams.cpt > 0) && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        EFR
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {exams.efrDate && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Date
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.efrDate}
                            </p>
                          </div>
                        )}
                        {exams.cvf > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              CVF
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.cvf}%
                            </p>
                          </div>
                        )}
                        {exams.vems > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              VEMS
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.vems}%
                            </p>
                          </div>
                        )}
                        {exams.dlco > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              DLCO
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.dlco}%
                            </p>
                          </div>
                        )}
                        {exams.cpt > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              CPT
                            </p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {exams.cpt}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Examens spécifiques BPCO */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("bpco") && (
                      <>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            EFR / Spirométrie BPCO
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {patient.bpcoComplementaryExams?.vems && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  VEMS
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.vems} L
                                </p>
                              </div>
                            )}
                            {patient.bpcoComplementaryExams?.vemsCvf && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  VEMS/CV
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.vemsCvf} %
                                </p>
                              </div>
                            )}
                            {patient.bpcoComplementaryExams?.goldStage && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Stade GOLD
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.goldStage}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Pléthysmographie BPCO
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {patient.bpcoComplementaryExams?.cpt && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  CPT
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.cpt}
                                </p>
                              </div>
                            )}
                            {patient.bpcoComplementaryExams?.vr && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  VR
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.vr}
                                </p>
                              </div>
                            )}
                            {patient.bpcoComplementaryExams?.crf && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  CRF
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.crf}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Gaz du sang BPCO
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {patient.bpcoComplementaryExams?.ph && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  pH
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.ph}
                                </p>
                              </div>
                            )}
                            {patient.bpcoComplementaryExams?.pao2 && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  PaO2
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.pao2} mmHg
                                </p>
                              </div>
                            )}
                            {patient.bpcoComplementaryExams?.paco2 && (
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  PaCO2
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {patient.bpcoComplementaryExams?.paco2} mmHg
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                  {/* Examens spécifiques à l'épanchement pleural à implémenter ici si nécessaire */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("pleuralEffusion") && (
                      <>
                        {/* Section pour les examens spécifiques à l'épanchement pleural
                         À compléter avec les examens spécifiques à cette pathologie */}
                      </>
                    )}
                </div>
              </div>

              {/* Diagnostic */}
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Diagnostic
                </h2>
                <div className="space-y-4">
                  {/* Diagnostic pour la pathologie du sommeil */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("sleep") && (
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
                    )}

                  {/* Diagnostic BPCO */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("bpco") && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Stade BPCO
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.bpcoDiagnosis?.stage || "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Complications
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {patient.bpcoDiagnosis?.acuteExacerbation && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                Exacerbation aiguë
                              </span>
                            )}
                            {patient.bpcoDiagnosis?.bronchialSuperinfection && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                Surinfection bronchique
                              </span>
                            )}
                            {patient.bpcoDiagnosis
                              ?.chronicRespiratoryFailure && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                                Insuffisance respiratoire chronique
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Diagnostic pour l'épanchement pleural */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("pleuralEffusion") && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Type
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.pleuralEffusionDiagnosis?.type ||
                              "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Étiologie
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.pleuralEffusionDiagnosis?.etiology ||
                              "Non spécifié"}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Traitement */}
              <div className="px-6 py-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Traitement
                </h2>
                <div className="space-y-6">
                  {/* Traitement pour la pathologie du sommeil */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("sleep") && (
                      <>
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
                          {patient.treatment?.medicalTreatments
                            ?.medications && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Traitement médical
                              </p>
                              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                {
                                  patient.treatment.medicalTreatments
                                    .medications
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                  {/* Traitement BPCO */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("bpco") && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Traitement de fond
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.bpcoTreatment?.maintenance ||
                              "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Traitements prescrits
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {Array.isArray(
                              patient?.bpcoTreatment?.prescribedTreatments
                            ) &&
                              patient.bpcoTreatment.prescribedTreatments.includes(
                                "antibiotherapy"
                              ) && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                  Antibiotothérapie
                                </span>
                              )}
                            {Array.isArray(
                              patient?.bpcoTreatment?.prescribedTreatments
                            ) &&
                              patient.bpcoTreatment.prescribedTreatments.includes(
                                "corticosteroidsOral"
                              ) && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                  Corticoïdes oraux
                                </span>
                              )}
                            {Array.isArray(
                              patient?.bpcoTreatment?.prescribedTreatments
                            ) &&
                              patient.bpcoTreatment.prescribedTreatments.includes(
                                "respiratoryPhysiotherapy"
                              ) && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                  Kinésithérapie respiratoire
                                </span>
                              )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Autres traitements
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {patient.bpcoTreatment?.longTermOxygen && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Oxygénothérapie de longue durée
                              </span>
                            )}
                            {patient.bpcoTreatment?.therapeuticEducation && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Éducation thérapeutique
                              </span>
                            )}
                            {patient.bpcoTreatment?.smokingCessation && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Sevrage tabagique
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Traitement pour l'épanchement pleural */}
                  {Array.isArray(patient?.pathologies) &&
                    patient.pathologies.includes("pleuralEffusion") && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Traitement conservateur
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.pleuralEffusionTreatment?.conservative ||
                              "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Drainage
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.pleuralEffusionTreatment?.drainage ||
                              "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Traitement chirurgical
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.pleuralEffusionTreatment?.surgical ||
                              "Non spécifié"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Traitement spécifique
                          </p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {patient.pleuralEffusionTreatment
                              ?.specificTreatment || "Non spécifié"}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Suivi BPCO */}
          {Array.isArray(patient?.pathologies) &&
            patient.pathologies.includes("bpco") && (
              <div className="mt-8 px-4 sm:px-0">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-5">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Suivi BPCO
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Dernière consultation
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.bpcoFollowUp?.lastConsultation ||
                            "Non spécifié"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Prochaine évaluation
                        </p>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                          {patient.bpcoFollowUp?.nextEvaluation ||
                            "Non spécifié"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Suivi en pneumologie
                        </p>
                        <div className="mt-2">
                          {patient.bpcoFollowUp?.pneumologyFollowUp ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              Oui
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300">
                              Non
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Vaccinations à jour
                        </p>
                        <div className="mt-2">
                          {patient.bpcoFollowUp?.vaccinationsUpToDate ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              À jour
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                              À mettre à jour
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
