import { CreateUserData, UserData, UserRole } from "@/types/user";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
import { createLog } from "./logs";

// Collection Firestore pour les utilisateurs
const USERS_COLLECTION = "users";

// Créer un nouvel utilisateur (uniquement par le super-admin)
export const createUser = async (userData: CreateUserData): Promise<void> => {
  try {
    console.log("Creating user with data:", userData);

    // Appeler l'API de création d'utilisateur côté serveur
    const response = await fetch("/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Erreur lors de la création de l'utilisateur"
      );
    }

    const { uid } = await response.json();
    console.log("User created with UID:", uid);

    // Créer le document utilisateur dans Firestore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDataForFirestore } = userData;
    const userDoc = {
      ...userDataForFirestore,
      uid,
      role: userData.role, // S'assurer que le rôle est explicitement défini
      createdAt: userData.createdAt.toISOString(),
    };

    console.log("Saving user document to Firestore:", userDoc);
    await setDoc(doc(db, USERS_COLLECTION, uid), userDoc);
    console.log("User document created in Firestore");

    // Créer un log pour la création d'utilisateur
    await createLog({
      userId: uid,
      userEmail: userData.email,
      userRole: userData.role,
      action: "CREATION_COMPTE",
      details: `Création du compte ${userData.role} pour ${userData.displayName}`,
      targetId: uid,
      targetType: "user",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Obtenir le rôle d'un utilisateur
export const getUserRole = async (uid: string): Promise<UserRole | null> => {
  console.log("Getting role for user:", uid);
  const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!userDoc.exists()) {
    console.log("No user document found");
    return null;
  }
  const role = userDoc.data().role as UserRole;
  console.log("User role:", role);
  return role;
};

// Obtenir les données d'un utilisateur
export const getUser = async (uid: string): Promise<UserData | null> => {
  console.log("Getting user data for:", uid);
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    if (!userDoc.exists()) {
      console.log("No user document found");
      return null;
    }
    const data = userDoc.data();
    console.log("Raw user data from Firestore:", data);

    // Vérifier que les données contiennent un rôle valide
    if (
      !data.role ||
      !["super-admin", "medecin", "infirmier", "chef-service", "prof", "resident"].includes(data.role)
    ) {
      console.error("Invalid or missing role in user data:", data);
      return null;
    }

    const userData: UserData = {
      uid: userDoc.id,
      email: data.email,
      displayName: data.displayName,
      role: data.role,
      createdAt: new Date(data.createdAt),
    };

    console.log("Parsed user data:", userData);
    return userData;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Obtenir tous les utilisateurs (uniquement pour le super-admin)
export const getAllUsers = async (): Promise<UserData[]> => {
  const usersQuery = query(collection(db, USERS_COLLECTION));
  const snapshot = await getDocs(usersQuery);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
    createdAt: new Date(doc.data().createdAt),
  })) as UserData[];
};

// Vérifier si l'utilisateur a les permissions d'écriture
export const hasWritePermission = async (uid: string): Promise<boolean> => {
  const role = await getUserRole(uid);
  return (
    role === "super-admin" || role === "medecin" || role === "chef-service"
  );
};

// Vérifier si l'utilisateur est super-admin
export const isSuperAdmin = async (uid: string): Promise<boolean> => {
  const role = await getUserRole(uid);
  return role === "super-admin" || role === "chef-service";
};

export const getUserByEmail = async (
  email: string
): Promise<UserData | null> => {
  const usersQuery = query(
    collection(db, USERS_COLLECTION),
    where("email", "==", email)
  );
  const snapshot = await getDocs(usersQuery);
  if (snapshot.empty) {
    return null;
  }
  const doc = snapshot.docs[0];
  return {
    ...doc.data(),
    uid: doc.id,
    createdAt: new Date(doc.data().createdAt),
  } as UserData;
};

// Supprimer un utilisateur
export const deleteUser = async (uid: string): Promise<void> => {
  try {
    // Récupérer les informations de l'utilisateur avant la suppression
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    const userData = userDoc.data() as UserData;

    // Appeler l'API de suppression
    const response = await fetch(`/api/users/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Gestion des réponses non-JSON (ex. 404 HTML)
        console.error("Parse error:", e);
        console.error("Réponse non-JSON:", await response.text());
        throw new Error(
          "Erreur serveur: Route non trouvée ou réponse invalide"
        );
      }
      throw new Error(errorData.message || "Erreur lors de la suppression");
    }

    // Supprimer le document Firestore
    await deleteDoc(doc(db, USERS_COLLECTION, uid));

    // Créer un log pour la suppression d'utilisateur
    await createLog({
      userId: uid,
      userEmail: userData.email,
      userRole: userData.role,
      action: "SUPPRESSION_COMPTE",
      details: `Suppression du compte ${userData.role} de ${userData.displayName}`,
      targetId: uid,
      targetType: "user",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
