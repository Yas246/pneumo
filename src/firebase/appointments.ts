import { Appointment, AppointmentWithPatient } from "@/types/appointment";
import { AppointmentPatient, Patient } from "@/types/patient";
import { UserData, UserRole } from "@/types/user";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
import { createLog } from "./logs";

const APPOINTMENTS_COLLECTION = "appointments";

const appointmentConverter = {
  toFirestore: (appointment: Appointment) => {
    return {
      ...appointment,
      createdAt: appointment.createdAt
        ? Timestamp.fromDate(appointment.createdAt)
        : Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot): Appointment => {
    const data = snapshot.data()!;
    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Appointment;
  },
};

export const getAppointments = async (
  userId: string,
  userRole: UserRole
): Promise<Appointment[]> => {
  try {
    let q = query(collection(db, APPOINTMENTS_COLLECTION));

    // Filtrer selon le rôle
    if (userRole === "resident") {
      // Les résidents ne voient que leurs propres rendez-vous
      q = query(
        collection(db, APPOINTMENTS_COLLECTION),
        where("creatorId", "==", userId)
      );
    } else if (userRole === "prof") {
      // Les profs voient leurs rendez-vous et ceux des résidents
      q = query(
        collection(db, APPOINTMENTS_COLLECTION),
        where("creatorRole", "in", ["prof", "resident"] as UserRole[])
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) =>
      appointmentConverter.fromFirestore(doc)
    );
  } catch (error) {
    console.error("Error getting appointments:", error);
    throw error;
  }
};

export const getAppointmentsWithPatients = async (
  userId: string,
  userRole: UserRole
): Promise<AppointmentWithPatient[]> => {
  try {
    let q = query(collection(db, APPOINTMENTS_COLLECTION));

    // Filtrer selon le rôle
    if (userRole === "resident") {
      // Les résidents ne voient que leurs propres rendez-vous
      q = query(
        collection(db, APPOINTMENTS_COLLECTION),
        where("creatorId", "==", userId)
      );
    } else if (userRole === "prof") {
      // Les profs voient leurs rendez-vous et ceux des résidents
      q = query(
        collection(db, APPOINTMENTS_COLLECTION),
        where("creatorRole", "in", ["prof", "resident"] as UserRole[])
      );
    }

    const querySnapshot = await getDocs(q);
    const appointments = querySnapshot.docs.map((doc) =>
      appointmentConverter.fromFirestore(doc)
    );

    // Fetch all patients in one batch
    const patientsSnapshot = await getDocs(collection(db, "patients"));
    const patientsMap = new Map<string, Patient>();
    patientsSnapshot.docs.forEach((doc) => {
      patientsMap.set(doc.id, { id: doc.id, ...doc.data() } as Patient);
    });

    // Fetch all doctors in one batch
    const doctorsSnapshot = await getDocs(collection(db, "users"));
    const doctorsMap = new Map<string, UserData>();
    doctorsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data) {
        doctorsMap.set(doc.id, {
          uid: doc.id,
          displayName: data.displayName || "Utilisateur inconnu",
          role: data.role || ("unknown" as UserRole),
          email: data.email,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        });
      }
    });

    // Map appointments to include patient and doctor data
    return appointments.map((appointment) => {
      const patient = patientsMap.get(appointment.patientId);
      const doctor = doctorsMap.get(appointment.creatorId);

      if (!patient) {
        return {
          ...appointment,
          patient: {
            id: "unknown",
            firstName: "Patient inconnu",
            lastName: "",
            email: "",
          },
          doctor: doctor
            ? {
                displayName: doctor.displayName,
                role: doctor.role,
              }
            : undefined,
        };
      }

      return {
        ...appointment,
        patient: {
          id: patient.id || "unknown",
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          birthDate: patient.birthDate,
          phone: patient.phone,
        },
        doctor: doctor
          ? {
              displayName: doctor.displayName,
              role: doctor.role,
            }
          : undefined,
      };
    });
  } catch (error) {
    console.error("Error getting appointments with patients:", error);
    throw error;
  }
};

export const createAppointment = async (
  appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  userId: string,
  userRole: UserRole
): Promise<Appointment> => {
  try {
    const appointment = {
      ...appointmentData,
      creatorId: userId,
      creatorRole: userRole,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "scheduled" as const,
    };

    const docRef = await addDoc(
      collection(db, APPOINTMENTS_COLLECTION),
      appointmentConverter.toFirestore(appointment as Appointment)
    );

    // Créer un log pour la création du rendez-vous
    await createLog({
      userId,
      userEmail: appointment.patient.email,
      userRole: userRole,
      action: "CREATION_RDV",
      details: `Création d'un rendez-vous pour ${appointment.patient.firstName} ${appointment.patient.lastName}`,
      targetId: docRef.id,
      targetType: "appointment",
    });

    return {
      ...appointment,
      id: docRef.id,
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const getAppointment = async (
  id: string
): Promise<Appointment | null> => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return appointmentConverter.fromFirestore(docSnap);
  } catch (error) {
    console.error("Error getting appointment:", error);
    throw error;
  }
};

export const getPatientAppointments = async (
  patientId: string
): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      where("patientId", "==", patientId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) =>
      appointmentConverter.fromFirestore(doc)
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    throw new Error("Erreur lors de la récupération des rendez-vous");
  }
};

export const updateAppointment = async (
  id: string,
  appointmentData: Partial<Appointment>,
  userId: string,
  userRole: UserRole
): Promise<void> => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...appointmentData,
      updatedAt: new Date(),
    });

    // Créer un log pour la modification du rendez-vous
    await createLog({
      userId,
      userEmail: appointmentData.patient?.email || "",
      userRole: userRole,
      action: "MODIFICATION_RDV",
      details: `Modification du rendez-vous pour ${appointmentData.patient?.firstName} ${appointmentData.patient?.lastName}`,
      targetId: id,
      targetType: "appointment",
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

export const deleteAppointment = async (
  id: string,
  userId: string,
  userRole: UserRole,
  patientInfo: AppointmentPatient
): Promise<void> => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await deleteDoc(docRef);

    // Créer un log pour la suppression du rendez-vous
    await createLog({
      userId,
      userEmail: patientInfo.email,
      userRole: userRole,
      action: "SUPPRESSION_RDV",
      details: `Suppression du rendez-vous pour ${patientInfo.firstName} ${patientInfo.lastName}`,
      targetId: id,
      targetType: "appointment",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, APPOINTMENTS_COLLECTION)
    );
    return querySnapshot.docs.map((doc) =>
      appointmentConverter.fromFirestore(doc)
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    throw new Error("Erreur lors de la récupération des rendez-vous");
  }
};

export const getUserAppointments = async (
  userId: string
): Promise<Appointment[]> => {
  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      where("creatorId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) =>
      appointmentConverter.fromFirestore(doc)
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    throw new Error("Erreur lors de la récupération des rendez-vous");
  }
};

export const getUserAppointmentsWithPatients = async (
  userId: string
): Promise<AppointmentWithPatient[]> => {
  try {
    const appointments = await getUserAppointments(userId);

    // Get unique patient IDs from appointments
    const patientIds = [...new Set(appointments.map((a) => a.patientId))];

    // Fetch all relevant patients in one batch
    const patientsSnapshot = await Promise.all(
      patientIds.map((id) => getDoc(doc(db, "patients", id)))
    );

    const patientsMap = new Map<string, Patient>();
    patientsSnapshot.forEach((doc) => {
      if (doc.exists()) {
        patientsMap.set(doc.id, { id: doc.id, ...doc.data() } as Patient);
      }
    });

    // Fetch all doctors in one batch
    const doctorsSnapshot = await getDocs(collection(db, "users"));
    const doctorsMap = new Map<string, UserData>();
    doctorsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data) {
        doctorsMap.set(doc.id, {
          uid: doc.id,
          displayName: data.displayName || "Utilisateur inconnu",
          role: data.role || ("unknown" as UserRole),
          email: data.email,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        });
      }
    });

    // Map appointments to include patient and doctor data
    return appointments.map((appointment) => {
      const patient = patientsMap.get(appointment.patientId);
      const doctor = doctorsMap.get(appointment.creatorId);

      if (!patient) {
        return {
          ...appointment,
          patient: {
            id: "unknown",
            firstName: "Patient inconnu",
            lastName: "",
            email: "",
          },
          doctor: doctor
            ? {
                displayName: doctor.displayName,
                role: doctor.role,
              }
            : undefined,
        };
      }

      return {
        ...appointment,
        patient: {
          id: patient.id || "unknown",
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          birthDate: patient.birthDate,
          phone: patient.phone,
        },
        doctor: doctor
          ? {
              displayName: doctor.displayName,
              role: doctor.role,
            }
          : undefined,
      };
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des rendez-vous avec patients:",
      error
    );
    throw new Error(
      "Erreur lors de la récupération des rendez-vous avec patients"
    );
  }
};

export const getAllAppointmentsWithPatients = async (): Promise<
  AppointmentWithPatient[]
> => {
  try {
    const appointments = await getAllAppointments();

    // Fetch all patients in one batch
    const patientsSnapshot = await getDocs(collection(db, "patients"));
    const patientsMap = new Map<string, Patient>();
    patientsSnapshot.docs.forEach((doc) => {
      patientsMap.set(doc.id, { id: doc.id, ...doc.data() } as Patient);
    });

    // Fetch all doctors in one batch
    const doctorsSnapshot = await getDocs(collection(db, "users"));
    const doctorsMap = new Map<string, UserData>();
    doctorsSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data) {
        doctorsMap.set(doc.id, {
          uid: doc.id,
          displayName: data.displayName || "Utilisateur inconnu",
          role: data.role || ("unknown" as UserRole),
          email: data.email,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        });
      }
    });

    // Map appointments to include patient and doctor data
    return appointments.map((appointment) => {
      const patient = patientsMap.get(appointment.patientId);
      const doctor = doctorsMap.get(appointment.creatorId);

      if (!patient) {
        return {
          ...appointment,
          patient: {
            id: "unknown",
            firstName: "Patient inconnu",
            lastName: "",
            email: "",
          },
          doctor: doctor
            ? {
                displayName: doctor.displayName,
                role: doctor.role,
              }
            : undefined,
        };
      }

      return {
        ...appointment,
        patient: {
          id: patient.id || "unknown",
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          birthDate: patient.birthDate,
          phone: patient.phone,
        },
        doctor: doctor
          ? {
              displayName: doctor.displayName,
              role: doctor.role,
            }
          : undefined,
      };
    });
  } catch (error) {
    console.error("Error getting appointments with patients:", error);
    throw error;
  }
};

export const assignDoctorToAppointment = async (
  appointmentId: string,
  newDoctorId: string,
  newDoctorRole: UserRole,
  newDoctorName: string,
  adminUserId: string,
  adminUserRole: UserRole
): Promise<void> => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);

    // Vérifier que l'utilisateur a les permissions nécessaires
    if (
      adminUserRole !== "super-admin" &&
      adminUserRole !== "chef-service" &&
      adminUserRole !== "prof"
    ) {
      throw new Error(
        "Vous n'avez pas les permissions pour réassigner un médecin"
      );
    }

    await updateDoc(docRef, {
      creatorId: newDoctorId,
      creatorRole: newDoctorRole,
      creatorName: newDoctorName,
      updatedAt: new Date(),
    });

    // Créer un log pour la réassignation du médecin
    await createLog({
      userId: adminUserId,
      userEmail: "",
      userRole: adminUserRole,
      action: "REASSIGNMENT_RDV",
      details: `Réassignation du rendez-vous ${appointmentId} au médecin ${newDoctorName}`,
      targetId: appointmentId,
      targetType: "appointment",
    });
  } catch (error) {
    console.error("Error assigning doctor to appointment:", error);
    throw error;
  }
};

export const getDoctors = async (): Promise<UserData[]> => {
  try {
    const doctorsSnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("role", "in", [
          "medecin",
          "resident",
          "chef-service",
          "prof",
        ] as UserRole[])
      )
    );

    return doctorsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        displayName: data.displayName || "Utilisateur inconnu",
        role: data.role || ("unknown" as UserRole),
        email: data.email,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting doctors:", error);
    throw error;
  }
};
