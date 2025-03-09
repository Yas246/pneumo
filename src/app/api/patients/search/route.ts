import { searchPatients } from "@/firebase/patients";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    console.log("API - Requête de recherche reçue avec query:", query);

    if (!query) {
      console.log("API - Query vide, retour tableau vide");
      return NextResponse.json({ patients: [] });
    }

    console.log("API - Début de la recherche");
    const patients = await searchPatients(query);
    console.log("API - Nombre de résultats trouvés:", patients.length);

    return NextResponse.json({ patients });
  } catch (error) {
    console.error("API - Erreur lors de la recherche des patients:", error);
    return NextResponse.json(
      { message: "Erreur lors de la recherche des patients" },
      { status: 500 }
    );
  }
}
