import { pathologies } from "@/config/pathologies";
import { Patient } from "@/types/patient";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

// Mapping des noms de pathologies en français basé sur la configuration
const pathologyNames: { [key: string]: string } = {};
pathologies.forEach((pathology) => {
  pathologyNames[pathology.id] = pathology.name;
});

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
    // Initialiser le compteur pour toutes les pathologies
    pathologies.forEach((pathology) => {
      pathologyCount[pathology.name] = 0;
    });

    patients.forEach((patient) => {
      if (patient.pathologies && Array.isArray(patient.pathologies)) {
        patient.pathologies.forEach((pathology) => {
          const pathologyName = pathologyNames[pathology] || pathology;
          pathologyCount[pathologyName] =
            (pathologyCount[pathologyName] || 0) + 1;
        });
      }
    });

    const pathologyDistribution = Object.entries(pathologyCount)
      .filter(([, count]) => count > 0)
      .map(([name, count]) => ({
        name,
        count,
      }));

    // Calculer les tendances mensuelles par pathologie
    const pathologyTrends: { [key: string]: number } = {};
    pathologies.forEach((pathology) => {
      pathologyTrends[pathology.id] = 0;
    });

    // Compter les pathologies du mois en cours
    const pathologyCountThisMonth: { [key: string]: number } = {};
    pathologies.forEach((pathology) => {
      pathologyCountThisMonth[pathology.id] = 0;
    });

    patients.forEach((patient) => {
      if (
        patient.pathologies &&
        Array.isArray(patient.pathologies) &&
        patient.createdAt
      ) {
        const creationDate =
          (patient.createdAt as unknown as Timestamp).toDate?.() ||
          new Date(patient.createdAt);

        if (
          creationDate.getMonth() === currentMonth &&
          creationDate.getFullYear() === currentYear
        ) {
          patient.pathologies.forEach((pathology) => {
            pathologyCountThisMonth[pathology] =
              (pathologyCountThisMonth[pathology] || 0) + 1;
          });
        }
      }
    });

    // Compter les pathologies du mois dernier
    const pathologyCountLastMonth: { [key: string]: number } = {};
    pathologies.forEach((pathology) => {
      pathologyCountLastMonth[pathology.id] = 0;
    });

    patients.forEach((patient) => {
      if (
        patient.pathologies &&
        Array.isArray(patient.pathologies) &&
        patient.createdAt
      ) {
        const creationDate =
          (patient.createdAt as unknown as Timestamp).toDate?.() ||
          new Date(patient.createdAt);

        if (
          creationDate.getMonth() === lastMonth &&
          creationDate.getFullYear() === lastMonthYear
        ) {
          patient.pathologies.forEach((pathology) => {
            pathologyCountLastMonth[pathology] =
              (pathologyCountLastMonth[pathology] || 0) + 1;
          });
        }
      }
    });

    // Calculer les tendances pour chaque pathologie
    pathologies.forEach((pathology) => {
      const thisMonth = pathologyCountThisMonth[pathology.id] || 0;
      const lastMonth = pathologyCountLastMonth[pathology.id] || 0;

      pathologyTrends[pathology.id] =
        lastMonth > 0
          ? ((thisMonth - lastMonth) / lastMonth) * 100
          : thisMonth > 0
          ? 100
          : 0;
    });

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
      pathologyTrends,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    throw error;
  }
}

export async function getDemographicsStatistics(period?: string) {
  try {
    const patientsRef = collection(db, "patients");
    const patientsSnapshot = await getDocs(patientsRef);
    const patients = patientsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Patient)
    );

    // Filtrer par période si spécifiée
    let filteredPatients = patients;
    if (period && period !== "all") {
      const now = new Date();
      let startDate: Date;

      switch (period) {
        case "7d":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "90d":
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "6m":
          startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          break;
        case "1y":
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(0);
      }

      filteredPatients = patients.filter((patient) => {
        if (!patient.createdAt) return false;
        const creationDate =
          (patient.createdAt as unknown as Timestamp).toDate?.() ||
          new Date(patient.createdAt);
        return creationDate >= startDate;
      });
    }

    const totalPatients = filteredPatients.length;

    // Distribution par âge
    const ageDistribution: { [key: string]: number } = {
      "< 30 ans": 0,
      "30-45 ans": 0,
      "46-60 ans": 0,
      "61-75 ans": 0,
      "> 75 ans": 0,
    };

    // Distribution par sexe
    const sexDistribution: { [key: string]: number } = {
      Homme: 0,
      Femme: 0,
    };

    // Distribution par profession
    const professionDistribution: { [key: string]: number } = {};

    // Distribution par couverture sociale
    const coverageDistribution: { [key: string]: number } = {
      CNSS: 0,
      AMO: 0,
      Mutuelle: 0,
      Aucun: 0,
      Autre: 0,
    };

    // Pyramide des âges (tranches de 10 ans)
    const agePyramid: { [key: string]: { male: number; female: number } } = {};
    for (let i = 0; i < 100; i += 10) {
      const label = `${i}-${i + 9}`;
      agePyramid[label] = { male: 0, female: 0 };
    }
    agePyramid["100+"] = { male: 0, female: 0 };

    filteredPatients.forEach((patient) => {
      // Calcul de l'âge
      if (patient.birthDate) {
        const birthDate = new Date(patient.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        // Distribution par âge
        if (age < 30) {
          ageDistribution["< 30 ans"]++;
        } else if (age >= 30 && age <= 45) {
          ageDistribution["30-45 ans"]++;
        } else if (age >= 46 && age <= 60) {
          ageDistribution["46-60 ans"]++;
        } else if (age >= 61 && age <= 75) {
          ageDistribution["61-75 ans"]++;
        } else {
          ageDistribution["> 75 ans"]++;
        }

        // Pyramide des âges
        const pyramidAge =
          age >= 100
            ? "100+"
            : `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`;
        if (agePyramid[pyramidAge]) {
          if (patient.sex === "M") {
            agePyramid[pyramidAge].male++;
          } else if (patient.sex === "F") {
            agePyramid[pyramidAge].female++;
          }
        }
      }

      // Distribution par sexe
      if (patient.sex === "M") {
        sexDistribution["Homme"]++;
      } else if (patient.sex === "F") {
        sexDistribution["Femme"]++;
      }

      // Distribution par profession
      if (patient.profession && patient.profession.trim() !== "") {
        professionDistribution[patient.profession] =
          (professionDistribution[patient.profession] || 0) + 1;
      }

      // Distribution par couverture sociale
      if (patient.socialSecurity) {
        coverageDistribution[patient.socialSecurity]++;
      }
    });

    // Calculer les pourcentages pour la distribution par âge
    const ageDistributionArray = Object.entries(ageDistribution)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0,
      }))
      .sort((a, b) => {
        const order = [
          "< 30 ans",
          "30-45 ans",
          "46-60 ans",
          "61-75 ans",
          "> 75 ans",
        ];
        return order.indexOf(a.name) - order.indexOf(b.name);
      });

    // Calculer les pourcentages pour la distribution par sexe
    const sexDistributionArray = Object.entries(sexDistribution)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Calculer les pourcentages pour la distribution par profession
    const professionDistributionArray = Object.entries(professionDistribution)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Limiter aux 10 professions les plus fréquentes

    // Calculer les pourcentages pour la distribution par couverture sociale
    const coverageDistributionArray = Object.entries(coverageDistribution)
      .map(([name, count]) => ({
        name,
        count,
        percentage:
          totalPatients > 0 ? Math.round((count / totalPatients) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Convertir la pyramide des âges en tableau
    const agePyramidArray = Object.entries(agePyramid)
      .map(([age, values]) => ({
        age,
        male: values.male,
        female: values.female,
      }))
      .sort((a, b) => {
        const ageA = parseInt(a.age.split("-")[0]) || 100;
        const ageB = parseInt(b.age.split("-")[0]) || 100;
        return ageB - ageA; // Ordre décroissant (du plus âgé au plus jeune)
      })
      .filter((item) => item.male > 0 || item.female > 0); // Filtrer les tranches vides

    return {
      ageDistribution: ageDistributionArray,
      sexDistribution: sexDistributionArray,
      professionDistribution: professionDistributionArray,
      coverageDistribution: coverageDistributionArray,
      agePyramid: agePyramidArray,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des statistiques démographiques:",
      error
    );
    throw error;
  }
}

export async function getTemporalStatistics(period: string = "30d") {
  try {
    const patientsRef = collection(db, "patients");
    const patientsSnapshot = await getDocs(patientsRef);
    const patients = patientsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Patient)
    );

    const appointmentsRef = collection(db, "appointments");
    const appointmentsSnapshot = await getDocs(appointmentsRef);
    const appointments = appointmentsSnapshot.docs.map((doc) => doc.data());

    // Calculer la date de début selon la période
    const now = new Date();
    let startDate: Date;
    let previousStartDate: Date;
    let previousEndDate: Date;

    switch (period) {
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        previousEndDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        previousEndDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        previousEndDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "6m":
        startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 360 * 24 * 60 * 60 * 1000);
        previousEndDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      case "1y":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
        previousEndDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0);
        previousStartDate = new Date(0);
        previousEndDate = startDate;
    }

    // Déterminer l'intervalle de temps pour les graphiques
    let interval: "day" | "week" | "month";
    if (period === "7d" || period === "30d") {
      interval = "day";
    } else if (period === "90d") {
      interval = "week";
    } else {
      interval = "month";
    }

    // Générer les dates pour l'axe X
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= now) {
      dates.push(new Date(currentDate));
      if (interval === "day") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (interval === "week") {
        currentDate.setDate(currentDate.getDate() + 7);
      } else {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }

    // Fonction pour formater les dates
    const formatDate = (date: Date): string => {
      if (interval === "day") {
        return date.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        });
      } else if (interval === "week") {
        return `S${Math.ceil(date.getDate() / 7)}`;
      } else {
        return date.toLocaleDateString("fr-FR", { month: "short" });
      }
    };

    // Calculer la tendance de création de patients
    const patientCreationTrend = dates.map((date) => {
      const nextDate = new Date(date);
      if (interval === "day") {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (interval === "week") {
        nextDate.setDate(nextDate.getDate() + 7);
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }

      const count = patients.filter((patient) => {
        if (!patient.createdAt) return false;
        const creationDate =
          (patient.createdAt as unknown as Timestamp).toDate?.() ||
          new Date(patient.createdAt);
        return creationDate >= date && creationDate < nextDate;
      }).length;

      return {
        date: formatDate(date),
        count,
      };
    });

    // Calculer la tendance de création par pathologie
    const pathologyCreationTrend = dates.map((date) => {
      const nextDate = new Date(date);
      if (interval === "day") {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (interval === "week") {
        nextDate.setDate(nextDate.getDate() + 7);
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }

      const pathologyCounts: { [key: string]: number } = {};
      pathologies.forEach((pathology) => {
        pathologyCounts[pathology.name] = 0;
      });

      patients.forEach((patient) => {
        if (!patient.createdAt || !patient.pathologies) return;
        const creationDate =
          (patient.createdAt as unknown as Timestamp).toDate?.() ||
          new Date(patient.createdAt);

        if (creationDate >= date && creationDate < nextDate) {
          patient.pathologies.forEach((pathologyId) => {
            const pathologyName = pathologyNames[pathologyId] || pathologyId;
            if (pathologyCounts[pathologyName] !== undefined) {
              pathologyCounts[pathologyName]++;
            }
          });
        }
      });

      return {
        date: formatDate(date),
        ...pathologyCounts,
      };
    });

    // Calculer la tendance des rendez-vous
    const appointmentTrend = dates.map((date) => {
      const nextDate = new Date(date);
      if (interval === "day") {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (interval === "week") {
        nextDate.setDate(nextDate.getDate() + 7);
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }

      const count = appointments.filter((appointment) => {
        if (!appointment.date) return false;
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= date && appointmentDate < nextDate;
      }).length;

      return {
        date: formatDate(date),
        count,
      };
    });

    // Calculer les comparaisons période actuelle vs période précédente
    const currentPeriodPatients = patients.filter((patient) => {
      if (!patient.createdAt) return false;
      const creationDate =
        (patient.createdAt as unknown as Timestamp).toDate?.() ||
        new Date(patient.createdAt);
      return creationDate >= startDate && creationDate <= now;
    }).length;

    const previousPeriodPatients = patients.filter((patient) => {
      if (!patient.createdAt) return false;
      const creationDate =
        (patient.createdAt as unknown as Timestamp).toDate?.() ||
        new Date(patient.createdAt);
      return (
        creationDate >= previousStartDate && creationDate <= previousEndDate
      );
    }).length;

    const currentPeriodAppointments = appointments.filter((appointment) => {
      if (!appointment.date) return false;
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= startDate && appointmentDate <= now;
    }).length;

    const previousPeriodAppointments = appointments.filter((appointment) => {
      if (!appointment.date) return false;
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate >= previousStartDate &&
        appointmentDate <= previousEndDate
      );
    }).length;

    const patientChange =
      previousPeriodPatients > 0
        ? ((currentPeriodPatients - previousPeriodPatients) /
            previousPeriodPatients) *
          100
        : currentPeriodPatients > 0
        ? 100
        : 0;

    const appointmentChange =
      previousPeriodAppointments > 0
        ? ((currentPeriodAppointments - previousPeriodAppointments) /
            previousPeriodAppointments) *
          100
        : currentPeriodAppointments > 0
        ? 100
        : 0;

    return {
      patientCreationTrend,
      pathologyCreationTrend,
      appointmentTrend,
      comparison: {
        currentPeriod: {
          patients: currentPeriodPatients,
          appointments: currentPeriodAppointments,
        },
        previousPeriod: {
          patients: previousPeriodPatients,
          appointments: previousPeriodAppointments,
        },
        change: {
          patients: patientChange,
          appointments: appointmentChange,
        },
      },
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des statistiques temporelles:",
      error
    );
    throw error;
  }
}
