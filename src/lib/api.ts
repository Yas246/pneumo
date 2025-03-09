import { PatientFormData } from "@/components/patients/forms";

export async function createPatient(data: PatientFormData): Promise<void> {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la création du patient");
  }
}

export async function updatePatient(
  id: string | undefined,
  data: PatientFormData
): Promise<void> {
  if (!id) {
    throw new Error("ID du patient manquant");
  }

  const response = await fetch(`/api/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Erreur lors de la mise à jour du patient"
    );
  }
}
