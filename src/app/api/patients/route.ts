import {
  createPatient as createPatientInDb,
  updatePatient as updatePatientInDb,
} from "@/firebase/patients";
import { NextResponse } from "next/server";
import { csrfProtect } from "@/lib/csrf";

export async function POST(request: Request) {
  try {
    await csrfProtect(request);
  } catch (error) {
    if (error instanceof Error && error.name === "CsrfError") {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json({ message: "Erreur de validation CSRF" }, { status: 403 });
  }

  try {
    const { userId, ...data } = await request.json();
    const patientId = await createPatientInDb(data, userId);

    return NextResponse.json({ id: patientId }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du patient:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du patient" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await csrfProtect(request);
  } catch (error) {
    if (error instanceof Error && error.name === "CsrfError") {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json({ message: "Erreur de validation CSRF" }, { status: 403 });
  }

  try {
    const { id, userId, ...data } = await request.json();
    await updatePatientInDb(id, data, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  }
}
