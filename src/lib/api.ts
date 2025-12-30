import { CreateAppointmentData } from "@/types/appointment";
import { CreatePatientData, Patient } from "@/types/patient";
import { getCsrfHeaderName } from "./api-client";

async function getCsrfToken(): Promise<string> {
  const response = await fetch("/api/csrf-token");
  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token");
  }
  const data = await response.json();
  return data.token;
}

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getValidToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }
  cachedToken = await getCsrfToken();
  tokenExpiry = now + 23 * 60 * 60 * 1000;
  return cachedToken;
}

// Patients API
export async function createPatient(
  data: CreatePatientData,
  userId: string
): Promise<string> {
  const token = await getValidToken();
  const headerName = getCsrfHeaderName();

  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [headerName]: token,
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
  const token = await getValidToken();
  const headerName = getCsrfHeaderName();

  const response = await fetch(`/api/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      [headerName]: token,
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
  const token = await getValidToken();
  const headerName = getCsrfHeaderName();

  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [headerName]: token,
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

export async function deletePatient(id: string): Promise<void> {
  const token = await getValidToken();
  const headerName = getCsrfHeaderName();

  const response = await fetch(`/api/patients/${id}`, {
    method: "DELETE",
    headers: {
      [headerName]: token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || "Erreur lors de la suppression du patient"
    );
  }
}

export async function getHospitalization(
  patientId: string,
  hospitalizationId: string
) {
  const response = await fetch(
    `/api/patients/${patientId}/hospitalizations/${hospitalizationId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hospitalization");
  }

  return response.json();
}
