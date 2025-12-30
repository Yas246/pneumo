import { auth } from "@/firebase/admin";
import { csrfProtect } from "@/lib/csrf";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    await csrfProtect(request);
  } catch (error) {
    if (error instanceof Error && error.name === "CsrfError") {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { message: "Erreur de validation CSRF" },
      { status: 403 }
    );
  }

  try {
    const { uid } = await request.json();

    // Supprimer l'utilisateur avec l'API Admin
    await auth.deleteUser(uid);

    return NextResponse.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json(
      { message: "Erreur lors de la suppression de l'utilisateur" },
      { status: 400 }
    );
  }
}
