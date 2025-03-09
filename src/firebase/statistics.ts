import { Patient } from "@/types/patient";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

// Mapping des noms de pathologies en français
const pathologyNames: { [key: string]: string } = {
  sleep: "Troubles respiratoires du sommeil",
  tumor: "Pneumopathies tumorales",
  bronchial: "Pneumopathies bronchiques",
  infection: "Infections pulmonaires",
};

export async function getStatistics() {
  try {
    // Récupérer tous les patients
    const patientsRef = collection(db, "patients");
    const patientsSnapshot = await getDocs(patientsRef);
    const patients = patientsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Patient)
    );

    console.log("Dates de création des patients:");
    patients.forEach((patient) => {
      if (patient.createdAt) {
        // Vérifier si c'est un Timestamp Firestore
        const date =
          (patient.createdAt as unknown as Timestamp).toDate?.() ||
          new Date(patient.createdAt);
        console.log(`Patient ${patient.id}: ${date.toISOString()}`);
      }
    });

    // Calculer les statistiques de base pour ce mois
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Calculer le total des patients
    const currentTotalPatients = patients.length;

    // Calculer les nouveaux patients créés ce mois
    const newPatientsThisMonth = patients.filter((patient) => {
      if (!patient.createdAt) return false;
      const creationDate =
        (patient.createdAt as unknown as Timestamp).toDate?.() ||
        new Date(patient.createdAt);
      return (
        creationDate.getMonth() === currentMonth &&
        creationDate.getFullYear() === currentYear
      );
    }).length;

    console.log("Mois actuel:", currentMonth + 1);
    console.log("Année actuelle:", currentYear);
    console.log("Nouveaux patients ce mois:", newPatientsThisMonth);

    // Calculer les nouveaux patients créés le mois dernier
    const newPatientsLastMonth = patients.filter((patient) => {
      if (!patient.createdAt) return false;
      const creationDate =
        (patient.createdAt as unknown as Timestamp).toDate?.() ||
        new Date(patient.createdAt);
      return (
        creationDate.getMonth() === lastMonth &&
        creationDate.getFullYear() === lastMonthYear
      );
    }).length;

    console.log("Mois dernier:", lastMonth + 1);
    console.log("Année dernière:", lastMonthYear);
    console.log("Nouveaux patients le mois dernier:", newPatientsLastMonth);

    // Calculer la tendance du total des patients
    const totalPatientsTrend =
      newPatientsLastMonth > 0
        ? ((newPatientsThisMonth - newPatientsLastMonth) /
            newPatientsLastMonth) *
          100
        : newPatientsThisMonth > 0
        ? 100
        : 0;

    console.log("Tendance calculée:", totalPatientsTrend);

    // Calculer les patients actifs et archivés actuels
    const currentActivePatients = patients.filter(
      (p) => p.status === "active"
    ).length;
    const currentArchivedPatients = patients.filter(
      (p) => p.status === "archived"
    ).length;

    // Calculer les changements de statut du mois en cours
    const statusChangesThisMonth = patients.filter((patient) => {
      if (!patient.statusChangedAt) return false;
      const lastChange =
        (patient.statusChangedAt as unknown as Timestamp).toDate?.() ||
        new Date(patient.statusChangedAt);
      return (
        lastChange.getMonth() === currentMonth &&
        lastChange.getFullYear() === currentYear
      );
    });

    // Calculer les changements de statut du mois dernier
    const statusChangesLastMonth = patients.filter((patient) => {
      if (!patient.statusChangedAt) return false;
      const lastChange =
        (patient.statusChangedAt as unknown as Timestamp).toDate?.() ||
        new Date(patient.statusChangedAt);
      return (
        lastChange.getMonth() === lastMonth &&
        lastChange.getFullYear() === lastMonthYear
      );
    });

    // Calculer les tendances des statuts actifs/archivés
    const activeChangesThisMonth = statusChangesThisMonth.filter(
      (p) => p.status === "active"
    ).length;
    const activeChangesLastMonth = statusChangesLastMonth.filter(
      (p) => p.status === "active"
    ).length;

    console.log("Changements actifs ce mois:", activeChangesThisMonth);
    console.log("Changements actifs mois dernier:", activeChangesLastMonth);

    const activePatientsTrend =
      activeChangesLastMonth > 0
        ? ((activeChangesThisMonth - activeChangesLastMonth) /
            activeChangesLastMonth) *
          100
        : activeChangesThisMonth > 0
        ? 100
        : 0;

    const archivedChangesThisMonth = statusChangesThisMonth.filter(
      (p) => p.status === "archived"
    ).length;
    const archivedChangesLastMonth = statusChangesLastMonth.filter(
      (p) => p.status === "archived"
    ).length;

    console.log("Changements archivés ce mois:", archivedChangesThisMonth);
    console.log("Changements archivés mois dernier:", archivedChangesLastMonth);

    const archivedPatientsTrend =
      archivedChangesLastMonth > 0
        ? ((archivedChangesThisMonth - archivedChangesLastMonth) /
            archivedChangesLastMonth) *
          100
        : archivedChangesThisMonth > 0
        ? 100
        : 0;

    // Calculer les rendez-vous pour ce mois
    const startDate = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-01`;
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const endDate = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${lastDay}`;

    const appointmentsRef = collection(db, "appointments");
    const appointmentsQuery = query(
      appointmentsRef,
      where("date", ">=", startDate),
      where("date", "<=", endDate)
    );
    const appointmentsSnapshot = await getDocs(appointmentsQuery);
    const appointmentsThisMonth = appointmentsSnapshot.size;

    // Calculer les rendez-vous du mois précédent
    const lastMonthStartDate = `${lastMonthYear}-${String(
      lastMonth + 1
    ).padStart(2, "0")}-01`;
    const lastMonthLastDay = new Date(
      lastMonthYear,
      lastMonth + 1,
      0
    ).getDate();
    const lastMonthEndDate = `${lastMonthYear}-${String(lastMonth + 1).padStart(
      2,
      "0"
    )}-${lastMonthLastDay}`;

    const lastMonthAppointmentsQuery = query(
      appointmentsRef,
      where("date", ">=", lastMonthStartDate),
      where("date", "<=", lastMonthEndDate)
    );
    const lastMonthAppointmentsSnapshot = await getDocs(
      lastMonthAppointmentsQuery
    );
    const appointmentsTrend =
      lastMonthAppointmentsSnapshot.size > 0
        ? ((appointmentsThisMonth - lastMonthAppointmentsSnapshot.size) /
            lastMonthAppointmentsSnapshot.size) *
          100
        : appointmentsThisMonth > 0
        ? 100
        : 0;

    // Calculer la distribution des pathologies
    const pathologyCount: { [key: string]: number } = {};
    patients.forEach((patient) => {
      patient.pathologies?.forEach((pathology) => {
        const pathologyName = pathologyNames[pathology] || pathology;
        pathologyCount[pathologyName] =
          (pathologyCount[pathologyName] || 0) + 1;
      });
    });

    const pathologyDistribution = Object.entries(pathologyCount).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    // Calculer les rendez-vous par mois (sur les 6 derniers mois)
    const monthlyAppointments = [];
    const months = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];

    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date();
      monthDate.setMonth(monthDate.getMonth() - i);
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth() + 1;
      const lastDayOfMonth = new Date(year, month, 0).getDate();

      const monthStartDate = `${year}-${String(month).padStart(2, "0")}-01`;
      const monthEndDate = `${year}-${String(month).padStart(
        2,
        "0"
      )}-${lastDayOfMonth}`;

      const monthQuery = query(
        appointmentsRef,
        where("date", ">=", monthStartDate),
        where("date", "<=", monthEndDate)
      );
      const monthSnapshot = await getDocs(monthQuery);

      monthlyAppointments.push({
        name: months[monthDate.getMonth()],
        count: monthSnapshot.size,
      });
    }

    return {
      totalPatients: currentTotalPatients,
      totalPatientsTrend,
      activePatients: currentActivePatients,
      activePatientsTrend,
      archivedPatients: currentArchivedPatients,
      archivedPatientsTrend,
      appointmentsThisMonth,
      appointmentsTrend,
      pathologyDistribution,
      monthlyAppointments,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}
