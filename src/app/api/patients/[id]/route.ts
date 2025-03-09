import { deletePatient, getPatient, updatePatient } from "@/firebase/patients";
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
    const { id } = await params;
    const data = await request.json();
    await updatePatient(id, data);
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
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
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
