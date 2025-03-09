import type { UserData } from "@/types/user";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./config";

const USERS_COLLECTION = "users";
const SUPER_ADMIN_EMAIL = "super-admin@pneumo.ma";
const SUPER_ADMIN_PASSWORD = "superadmin123"; // À changer après la première connexion

export const initializeSuperAdmin = async (): Promise<void> => {
  try {
    // Vérifier si le super-admin existe déjà
    const usersSnapshot = await getDoc(
      doc(db, USERS_COLLECTION, "super-admin")
    );
    if (usersSnapshot.exists()) {
      console.log("Le super-admin existe déjà");
      return;
    }

    // Créer le compte super-admin
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      SUPER_ADMIN_EMAIL,
      SUPER_ADMIN_PASSWORD
    );

    // Créer le document utilisateur dans Firestore
    const superAdminData: UserData = {
      uid: userCredential.user.uid,
      email: SUPER_ADMIN_EMAIL,
      role: "super-admin",
      displayName: "Super Administrateur",
      createdAt: new Date(),
    };

    await setDoc(doc(db, USERS_COLLECTION, userCredential.user.uid), {
      ...superAdminData,
      createdAt: Timestamp.fromDate(superAdminData.createdAt),
    });

    console.log("Super-admin créé avec succès");
  } catch (error) {
    console.error("Erreur lors de la création du super-admin:", error);
    throw error;
  }
};
