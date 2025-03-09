import { createAppointment } from "@/firebase/appointments";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const appointmentId = await createAppointment(data);
    return NextResponse.json({ id: appointmentId }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    return NextResponse.json(
      { message: "Erreur lors de la création du rendez-vous" },
      { status: 500 }
    );
  }
}
