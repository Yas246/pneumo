import { auth } from "@/firebase/admin";
import { createAppointment } from "@/firebase/appointments";
import { UserRole } from "@/types/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    // Vérifier le token et récupérer les informations de l'utilisateur
    const decodedToken = await auth.verifySessionCookie(sessionCookie);
    const { uid, role } = decodedToken.claims;

    if (!uid || !role) {
      return NextResponse.json(
        { message: "Informations d'utilisateur manquantes" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const appointment = await createAppointment(data, uid, role as UserRole);

    return NextResponse.json({ id: appointment.id }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);

    if (error instanceof Error && error.message.includes("auth")) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Erreur lors de la création du rendez-vous" },
      { status: 500 }
    );
  }
}
