import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  User,
} from "firebase/auth";
import { auth } from "./config";
import { createLog } from "./logs";
import { getUser } from "./users";

export interface AuthError {
  code: string;
  message: string;
}

// Inscription avec email/mot de passe
export const signUpWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw formatAuthError(error as AuthError);
  }
};

// Connexion avec email/mot de passe
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw formatAuthError(error as AuthError);
  }
};

// Connexion avec Google
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    throw formatAuthError(error as AuthError);
  }
};

// Déconnexion
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw formatAuthError(error as AuthError);
  }
};

// Observer les changements d'état de l'authentification
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Obtenir l'utilisateur courant
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Formater les erreurs d'authentification
const formatAuthError = (error: AuthError): Error => {
  let message = "Une erreur est survenue lors de l'authentification";

  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      message = "Email ou mot de passe incorrect";
      break;
    case "auth/email-already-in-use":
      message = "Cette adresse email est déjà utilisée";
      break;
    case "auth/invalid-email":
      message = "Adresse email invalide";
      break;
    case "auth/operation-not-allowed":
      message = "Opération non autorisée";
      break;
    case "auth/weak-password":
      message = "Le mot de passe est trop faible";
      break;
    case "auth/user-disabled":
      message = "Ce compte a été désactivé";
      break;
    default:
      message = "Une erreur est survenue lors de l'authentification";
  }

  return new Error(message);
};

// Ré-authentifier l'utilisateur
export const reauthenticate = async (password: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user?.email) {
    throw new Error("Utilisateur non connecté");
  }

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
};

// Changer le mot de passe avec ré-authentification
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  try {
    await reauthenticate(currentPassword);
    await updatePassword(user, newPassword);
  } catch (error) {
    throw formatAuthError(error as AuthError);
  }
};

// Changer le mot de passe d'un utilisateur (par le super-admin)
export const changeUserPassword = async (
  uid: string,
  newPassword: string
): Promise<void> => {
  try {
    // Récupérer les informations de l'utilisateur
    const userData = await getUser(uid);
    if (!userData) {
      throw new Error("Utilisateur non trouvé");
    }

    const tokenResponse = await fetch("/api/csrf-token");
    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch CSRF token");
    }
    const { token, headerName } = await tokenResponse.json();

    const response = await fetch(`/api/users/${uid}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [headerName]: token,
      },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message || "Erreur lors du changement de mot de passe"
      );
    }

    // Créer un log pour le changement de mot de passe
    await createLog({
      userId: uid,
      userEmail: userData.email,
      userRole: userData.role,
      action: "CHANGEMENT_MDP",
      details: `Changement du mot de passe pour ${userData.displayName}`,
      targetId: uid,
      targetType: "user",
    });
  } catch (error) {
    throw formatAuthError(error as AuthError);
  }
};
