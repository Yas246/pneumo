import { CreatePatientData, Patient, StatusChange } from "@/types/patient";
import {
  addDoc,
  arrayUnion,
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

const PATIENTS_COLLECTION = "patients";

// Convertisseur pour les dates
const patientConverter = {
  toFirestore: (patient: Patient) => {
    return {
      ...patient,
      phone: String(patient.phone || ""), // Force le stockage en string pour éviter les erreurs de type
      createdAt: patient.createdAt
        ? Timestamp.fromDate(patient.createdAt)
        : Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot): Patient => {
    const data = snapshot.data()!;
    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Patient;
  },
};

// Créer un nouveau patient
export const createPatient = async (
  patientData: CreatePatientData,
  userId: string
): Promise<Patient> => {
  try {
    console.log("Creating patient with data:", patientData);

    // Récupérer les informations de l'utilisateur créateur
    const creator = await getUser(userId);
    if (!creator) {
      throw new Error("Utilisateur non trouvé");
    }

    // Ajouter les informations du créateur
    const patientWithCreator = {
      ...patientData,
      creatorId: userId,
      creatorRole: creator.role,
      creatorName: creator.displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(
      collection(db, PATIENTS_COLLECTION),
      patientConverter.toFirestore(patientWithCreator as Patient)
    );

    // Créer un log pour la création du patient
    await createLog({
      userId,
      userEmail: creator.email,
      userRole: creator.role,
      action: "CREATION_DOSSIER",
      details: `Création du dossier patient pour ${patientData.firstName} ${patientData.lastName}`,
      targetId: docRef.id,
      targetType: "patient",
    });

    return {
      ...patientWithCreator,
      id: docRef.id,
    } as Patient;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

// Obtenir un patient par son ID
export const getPatient = async (id: string): Promise<Patient | null> => {
  try {
    const docRef = doc(db, PATIENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    console.log("Raw patient data from Firestore:", data);
    console.log("BPCO fields in data:", {
      bpcoConsultationReason: data.bpcoConsultationReason,
      bpcoMedicalHistory: data.bpcoMedicalHistory,
      bpcoClinicalExam: data.bpcoClinicalExam,
      bpcoDiagnosis: data.bpcoDiagnosis,
      bpcoTreatment: data.bpcoTreatment,
      bpcoFollowUp: data.bpcoFollowUp,
      bpcoComplementaryExams: data.bpcoComplementaryExams,
    });

    return {
      ...data,
      id: docSnap.id,
      diurnalSymptoms: {
        ...data.diurnalSymptoms,
        epworthDetails:
          data.diurnalSymptoms?.epworthDetails || Array(8).fill(0),
      },
    } as Patient;
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    throw error;
  }
};

// Obtenir tous les patients
export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PATIENTS_COLLECTION));
    return querySnapshot.docs.map((doc) => patientConverter.fromFirestore(doc));
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    throw new Error("Erreur lors de la récupération des patients");
  }
};

// Obtenir les patients par diagnostic
export const getPatientsByDiagnosis = async (
  diagnosisType: keyof Patient["diagnosis"]
): Promise<Patient[]> => {
  try {
    const q = query(
      collection(db, PATIENTS_COLLECTION),
      where(`diagnosis.${diagnosisType}`, "==", true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => patientConverter.fromFirestore(doc));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des patients par diagnostic:",
      error
    );
    throw new Error(
      "Erreur lors de la récupération des patients par diagnostic"
    );
  }
};

// Mettre à jour un patient
export const updatePatient = async (
  id: string,
  patientData: Partial<Patient>,
  userId?: string
): Promise<void> => {
  try {
    const docRef = doc(db, PATIENTS_COLLECTION, id);
    const updateData = {
      ...patientData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);

    // Ajouter le log de modification
    if (userId) {
      const user = await getUser(userId);
      if (user) {
        await createLog({
          userId: user.uid,
          userEmail: user.email,
          userRole: user.role,
          action: "MODIFICATION_DOSSIER",
          details: `Modification du dossier patient ID: ${id}`,
          targetId: id,
          targetType: "patient",
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    throw new Error("Erreur lors de la mise à jour du patient");
  }
};

// Supprimer un patient
export const deletePatient = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PATIENTS_COLLECTION, id));
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error);
    throw new Error("Erreur lors de la suppression du patient");
  }
};

export async function searchPatients(searchTerm: string): Promise<Patient[]> {
  console.log("Firebase - Début de la recherche pour:", searchTerm);
  const searchTermLower = searchTerm.toLowerCase();
  const patientsRef = collection(db, PATIENTS_COLLECTION);

  // Recherche par nom ou prénom
  console.log("Firebase - Construction des queries");

  // Récupérer tous les patients et filtrer côté serveur
  const querySnapshot = await getDocs(patientsRef);
  console.log("Firebase - Nombre total de patients:", querySnapshot.size);

  const results = new Map<string, Patient>();

  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const patient = { id: doc.id, ...data } as Patient;

    // Vérifier si le nom ou le prénom contient le terme recherché
    const firstNameMatch = patient.firstName
      .toLowerCase()
      .includes(searchTermLower);
    const lastNameMatch = patient.lastName
      .toLowerCase()
      .includes(searchTermLower);

    if (firstNameMatch || lastNameMatch) {
      results.set(doc.id, patient);
    }
  });

  const finalResults = Array.from(results.values());
  console.log("Firebase - Nombre de résultats trouvés:", finalResults.length);
  console.log("Firebase - Résultats:", finalResults);

  return finalResults;
}

export async function updatePatientStatus(
  patientId: string,
  newStatus: "active" | "archived",
  userId?: string
): Promise<void> {
  try {
    const patientRef = doc(db, PATIENTS_COLLECTION, patientId);
    const now = new Date();

    const statusChange: StatusChange = {
      status: newStatus,
      date: now,
    };

    await updateDoc(patientRef, {
      status: newStatus,
      statusHistory: arrayUnion(statusChange),
      statusChangedAt: now,
      updatedAt: now,
    });

    // Ajouter le log d'archivage/désarchivage
    if (userId) {
      const user = await getUser(userId);
      if (user) {
        const action =
          newStatus === "archived"
            ? "ARCHIVAGE_DOSSIER"
            : "DESARCHIVAGE_DOSSIER";
        const details =
          newStatus === "archived"
            ? `Archivage du dossier patient ID: ${patientId}`
            : `Désarchivage du dossier patient ID: ${patientId}`;

        await createLog({
          userId: user.uid,
          userEmail: user.email,
          userRole: user.role,
          action,
          details,
          targetId: patientId,
          targetType: "patient",
        });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut du patient:", error);
    throw new Error("Erreur lors de la mise à jour du statut du patient");
  }
}

export const getPatients = async (
  userId: string,
  userRole: string
): Promise<Patient[]> => {
  try {
    let q = query(collection(db, PATIENTS_COLLECTION));

    // Si c'est un résident, on ne récupère que ses patients
    if (userRole === "resident") {
      q = query(
        collection(db, PATIENTS_COLLECTION),
        where("creatorId", "==", userId)
      );
    }

    const querySnapshot = await getDocs(q);
    const patients: Patient[] = [];

    querySnapshot.forEach((doc) => {
      const patient = patientConverter.fromFirestore(doc);
      patients.push(patient);
    });

    return patients;
  } catch (error) {
    console.error("Error getting patients:", error);
    throw error;
  }
};
