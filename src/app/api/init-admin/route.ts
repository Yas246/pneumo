import { initializeSuperAdmin } from "@/firebase/initAdmin";
import { NextResponse } from "next/server";

const INIT_TOKEN = process.env.ADMIN_INIT_TOKEN;

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!INIT_TOKEN) {
      return NextResponse.json(
        { error: "Token non configuré sur le serveur" },
        { status: 500 }
      );
    }

    if (token !== INIT_TOKEN) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }

    await initializeSuperAdmin();
    return NextResponse.json({ message: "Super-admin initialisé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation" },
      { status: 500 }
    );
  }
}
