import { CreatePatientData, Patient } from "@/types/patient";
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

const PATIENTS_COLLECTION = "patients";

// Convertisseur pour les dates
const patientConverter = {
  toFirestore: (patient: Patient) => {
    return {
      ...patient,
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
  patientData: CreatePatientData
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, PATIENTS_COLLECTION),
      patientConverter.toFirestore({
        ...patientData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error);
    throw new Error("Erreur lors de la création du patient");
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

    return patientConverter.fromFirestore(docSnap);
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    throw new Error("Erreur lors de la récupération du patient");
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
  patientData: Partial<Patient>
): Promise<void> => {
  try {
    const docRef = doc(db, PATIENTS_COLLECTION, id);
    const updateData = {
      ...patientData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
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
