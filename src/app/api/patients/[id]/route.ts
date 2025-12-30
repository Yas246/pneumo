import { deletePatient, getPatient, updatePatient } from "@/firebase/patients";
import { csrfProtect } from "@/lib/csrf";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await params;
    const patient = await getPatient(id);
    if (!patient) {
      return Response.json({ message: "Patient non trouvé" }, { status: 404 });
    }
    return Response.json(patient);
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    return Response.json(
      { message: "Erreur lors de la récupération du patient" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    await csrfProtect(request);
  } catch (error) {
    if (error instanceof Error && error.name === "CsrfError") {
      return Response.json({ message: error.message }, { status: 403 });
    }
    return Response.json(
      { message: "Erreur de validation CSRF" },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const { userId, ...data } = await request.json();
    await updatePatient(id, data, userId);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    return Response.json(
      { message: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    await csrfProtect(request);
  } catch (error) {
    if (error instanceof Error && error.name === "CsrfError") {
      return Response.json({ message: error.message }, { status: 403 });
    }
    return Response.json(
      { message: "Erreur de validation CSRF" },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    await deletePatient(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du patient:", error);
    return Response.json(
      { message: "Erreur lors de la suppression du patient" },
      { status: 500 }
    );
  }
}
