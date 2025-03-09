import {
  Appointment,
  AppointmentWithPatient,
  CreateAppointmentData,
} from "@/types/appointment";
import { Patient } from "@/types/patient";
import { UserData } from "@/types/user";
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
import { getUser } from "./users";

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

export const createAppointment = async (
  appointmentData: CreateAppointmentData
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, APPOINTMENTS_COLLECTION),
      appointmentConverter.toFirestore({
        ...appointmentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    // Récupérer les informations de l'utilisateur qui crée le rendez-vous
    const user = await getUser(appointmentData.createdBy);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer un log pour la création du rendez-vous
    await createLog({
      userId: user.uid,
      userEmail: user.email,
      userRole: user.role,
      action: "CREATION_RDV",
      details: `Création d'un rendez-vous de type ${appointmentData.type} pour le patient ${appointmentData.patientId}`,
      targetId: docRef.id,
      targetType: "appointment",
    });

    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    throw new Error("Erreur lors de la création du rendez-vous");
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
    console.error("Erreur lors de la récupération du rendez-vous:", error);
    throw new Error("Erreur lors de la récupération du rendez-vous");
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
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...appointmentData,
      updatedAt: Timestamp.now(),
    });

    // Récupérer les informations de l'utilisateur qui modifie le rendez-vous
    const user = await getUser(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer un log pour la modification du rendez-vous
    await createLog({
      userId: user.uid,
      userEmail: user.email,
      userRole: user.role,
      action: "MODIFICATION_RDV",
      details: `Modification du rendez-vous ${id}`,
      targetId: id,
      targetType: "appointment",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    throw new Error("Erreur lors de la mise à jour du rendez-vous");
  }
};

export const deleteAppointment = async (
  id: string,
  userId: string
): Promise<void> => {
  try {
    // Récupérer les informations du rendez-vous avant la suppression
    const appointmentDoc = await getDoc(doc(db, APPOINTMENTS_COLLECTION, id));
    const appointmentData = appointmentDoc.data();

    // Supprimer le rendez-vous
    await deleteDoc(doc(db, APPOINTMENTS_COLLECTION, id));

    // Récupérer les informations de l'utilisateur qui supprime le rendez-vous
    const user = await getUser(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer un log pour la suppression du rendez-vous
    await createLog({
      userId: user.uid,
      userEmail: user.email,
      userRole: user.role,
      action: "SUPPRESSION_RDV",
      details: `Suppression du rendez-vous ${id}${
        appointmentData ? ` de type ${appointmentData.type}` : ""
      }`,
      targetId: id,
      targetType: "appointment",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous:", error);
    throw new Error("Erreur lors de la suppression du rendez-vous");
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
      where("createdBy", "==", userId)
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

    // Map appointments to include patient data
    return appointments.map((appointment) => {
      const patient = patientsMap.get(appointment.patientId);
      if (!patient) {
        console.warn(`Patient not found for appointment ${appointment.id}`);
        return {
          ...appointment,
          patient: {
            firstName: "Patient inconnu",
            lastName: "",
          },
        };
      }
      return {
        ...appointment,
        patient: {
          firstName: patient.firstName,
          lastName: patient.lastName,
        },
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
          role: data.role || "unknown",
          email: data.email,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        });
      }
    });

    console.log("Doctors map:", doctorsMap);

    // Map appointments to include patient and doctor data
    return appointments.map((appointment) => {
      const patient = patientsMap.get(appointment.patientId);
      const doctor = doctorsMap.get(appointment.createdBy);

      console.log("Processing appointment:", {
        id: appointment.id,
        createdBy: appointment.createdBy,
        doctor: doctor,
      });

      if (!patient) {
        console.warn(`Patient not found for appointment ${appointment.id}`);
        return {
          ...appointment,
          patient: {
            firstName: "Patient inconnu",
            lastName: "",
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
          firstName: patient.firstName,
          lastName: patient.lastName,
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
