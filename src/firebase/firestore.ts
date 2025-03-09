import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";

// Types
export interface Patient {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  pathologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Appointment {
  id?: string;
  patientId: string;
  date: Date;
  type: string;
  notes?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

// Convertisseurs pour les dates
const patientConverter = {
  toFirestore: (patient: Patient): DocumentData => {
    return {
      ...patient,
      dateOfBirth: Timestamp.fromDate(patient.dateOfBirth),
      createdAt: patient.createdAt
        ? Timestamp.fromDate(patient.createdAt)
        : Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot): Patient => {
    const data = snapshot.data();
    if (!data) throw new Error("No data found in DocumentSnapshot");
    return {
      id: snapshot.id,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth.toDate(),
      email: data.email,
      phone: data.phone,
      pathologies: data.pathologies,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  },
};

// Patients
export const addPatient = async (patient: Patient): Promise<string> => {
  const docRef = await addDoc(
    collection(db, "patients"),
    patientConverter.toFirestore(patient)
  );
  return docRef.id;
};

export const updatePatient = async (
  id: string,
  patient: Partial<Patient>
): Promise<void> => {
  const docRef = doc(db, "patients", id);
  await updateDoc(docRef, {
    ...patient,
    updatedAt: Timestamp.now(),
  });
};

export const deletePatient = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "patients", id));
};

export const getPatient = async (id: string): Promise<Patient | null> => {
  const docRef = doc(db, "patients", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return patientConverter.fromFirestore(docSnap);
  }
  return null;
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const querySnapshot = await getDocs(collection(db, "patients"));
  return querySnapshot.docs.map((doc) => patientConverter.fromFirestore(doc));
};

export const getPatientsByPathology = async (
  pathology: string
): Promise<Patient[]> => {
  const q = query(
    collection(db, "patients"),
    where("pathologies", "array-contains", pathology)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => patientConverter.fromFirestore(doc));
};

// Rendez-vous
const appointmentConverter = {
  toFirestore: (appointment: Appointment): DocumentData => {
    return {
      ...appointment,
      date: Timestamp.fromDate(appointment.date),
      createdAt: appointment.createdAt
        ? Timestamp.fromDate(appointment.createdAt)
        : Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot): Appointment => {
    const data = snapshot.data();
    if (!data) throw new Error("No data found in DocumentSnapshot");
    return {
      id: snapshot.id,
      patientId: data.patientId,
      date: data.date.toDate(),
      type: data.type,
      notes: data.notes,
      status: data.status,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  },
};

export const addAppointment = async (
  appointment: Appointment
): Promise<string> => {
  const docRef = await addDoc(
    collection(db, "appointments"),
    appointmentConverter.toFirestore(appointment)
  );
  return docRef.id;
};

export const updateAppointment = async (
  id: string,
  appointment: Partial<Appointment>
): Promise<void> => {
  const docRef = doc(db, "appointments", id);
  await updateDoc(docRef, {
    ...appointment,
    updatedAt: Timestamp.now(),
  });
};

export const deleteAppointment = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "appointments", id));
};

export const getAppointment = async (
  id: string
): Promise<Appointment | null> => {
  const docRef = doc(db, "appointments", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return appointmentConverter.fromFirestore(docSnap);
  }
  return null;
};

export const getPatientAppointments = async (
  patientId: string
): Promise<Appointment[]> => {
  const q = query(
    collection(db, "appointments"),
    where("patientId", "==", patientId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) =>
    appointmentConverter.fromFirestore(doc)
  );
};

// Statistiques
export const getPatientStatistics = async () => {
  const patientsSnapshot = await getDocs(collection(db, "patients"));
  const appointmentsSnapshot = await getDocs(collection(db, "appointments"));

  return {
    totalPatients: patientsSnapshot.size,
    totalAppointments: appointmentsSnapshot.size,
    pathologyDistribution: await getPathologyDistribution(),
    appointmentStatusDistribution: await getAppointmentStatusDistribution(),
  };
};

const getPathologyDistribution = async () => {
  const patients = await getAllPatients();
  const distribution: Record<string, number> = {};

  patients.forEach((patient) => {
    patient.pathologies.forEach((pathology) => {
      distribution[pathology] = (distribution[pathology] || 0) + 1;
    });
  });

  return distribution;
};

const getAppointmentStatusDistribution = async () => {
  const appointmentsSnapshot = await getDocs(collection(db, "appointments"));
  const distribution: Record<string, number> = {
    scheduled: 0,
    completed: 0,
    cancelled: 0,
  };

  appointmentsSnapshot.docs.forEach((doc) => {
    const appointment = appointmentConverter.fromFirestore(doc);
    distribution[appointment.status]++;
  });

  return distribution;
};
