import { CreateAppointmentData } from "@/types/appointment";
import { CreatePatientData, Patient } from "@/types/patient";

// Patients API
export async function createPatient(
  data: CreatePatientData,
  userId: string
): Promise<string> {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la création du patient");
  }

  const result = await response.json();
  return result.id;
}

export async function updatePatient(
  id: string,
  data: Partial<Patient>,
  userId: string
): Promise<void> {
  const response = await fetch(`/api/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Erreur lors de la mise à jour du patient"
    );
  }
}

// Appointments API
export async function createAppointment(
  data: CreateAppointmentData
): Promise<string> {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Erreur lors de la création du rendez-vous"
    );
  }

  const result = await response.json();
  return result.id;
}
