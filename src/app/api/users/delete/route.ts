import { auth } from "@/firebase/admin";
import { csrfProtect } from "@/lib/csrf";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // Validation CSRF
  try {
    await csrfProtect(request);
  } catch (error) {
    if (error instanceof Error && error.name === "CsrfError") {
      return NextResponse.json(
        { message: `Erreur CSRF: ${error.message}` },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { message: "Erreur de validation CSRF" },
      { status: 403 }
    );
  }

  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { message: "UID de l'utilisateur manquant" },
        { status: 400 }
      );
    }

    console.log("Tentative de suppression de l'utilisateur:", uid);

    // Supprimer l'utilisateur avec l'API Admin
    await auth.deleteUser(uid);

    console.log("Utilisateur supprimé avec succès:", uid);

    return NextResponse.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur détaillée lors de la suppression:", error);

    // Récupérer le message d'erreur détaillé
    let errorMessage = "Erreur lors de la suppression de l'utilisateur";
    if (error instanceof Error) {
      errorMessage = error.message;
      // Loguer le stack trace pour le debugging
      console.error("Stack trace:", error.stack);
    }

    // Vérifier si c'est une erreur Firebase
    if (error && typeof error === "object" && "code" in error) {
      console.error("Code d'erreur Firebase:", error.code);
      errorMessage = `Erreur Firebase (${error.code}): ${errorMessage}`;
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
