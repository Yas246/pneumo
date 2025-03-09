import { auth } from "@/firebase/admin";
import { CreateUserData } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userData: CreateUserData = await request.json();
    console.log("Creating user with data:", userData);

    // Créer l'utilisateur avec l'API Admin
    const userRecord = await auth.createUser({
      email: userData.email,
      password: userData.password,
      displayName: userData.displayName,
    });
    console.log("User created:", userRecord);

    // Définir les claims personnalisés pour le rôle
    await auth.setCustomUserClaims(userRecord.uid, {
      role: userData.role,
    });
    console.log("Custom claims set for user:", {
      uid: userRecord.uid,
      role: userData.role,
    });

    return NextResponse.json({ uid: userRecord.uid });
  } catch (error: unknown) {
    console.error("Erreur lors de la création de l'utilisateur:", error);

    // Formater le message d'erreur
    let message =
      "Une erreur est survenue lors de la création de l'utilisateur";

    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "auth/email-already-exists") {
        message = "Cette adresse email est déjà utilisée";
      } else if (error.code === "auth/invalid-email") {
        message = "Adresse email invalide";
      } else if (error.code === "auth/invalid-password") {
        message = "Le mot de passe est invalide";
      }
    }

    return NextResponse.json({ message }, { status: 400 });
  }
}
