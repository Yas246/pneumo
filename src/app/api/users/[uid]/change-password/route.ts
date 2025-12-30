import { auth } from "@/firebase/admin";
import { csrfProtect } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
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
    const { newPassword } = await request.json();
    const { uid } = await params;

    if (!newPassword) {
      return NextResponse.json(
        { message: "Le nouveau mot de passe est requis" },
        { status: 400 }
      );
    }

    // Mettre à jour le mot de passe de l'utilisateur
    await auth.updateUser(uid, {
      password: newPassword,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return NextResponse.json(
      { message: "Erreur lors du changement de mot de passe" },
      { status: 500 }
    );
  }
}
