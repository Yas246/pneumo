import {
  createPatient as createPatientInDb,
  updatePatient as updatePatientInDb,
} from "@/firebase/patients";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const patientId = await createPatientInDb(data);

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
    const { id, ...data } = await request.json();
    await updatePatientInDb(id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du patient" },
      { status: 500 }
    );
  }
}
