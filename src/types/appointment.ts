export interface Appointment {
  id?: string;
  patientId: string;
  date: string;
  time: string;
  duration: number;
  type: "consultation" | "suivi" | "examen";
  notes?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentWithPatient extends Appointment {
  patient: {
    firstName: string;
    lastName: string;
  };
  doctor?: {
    displayName: string;
    role: string;
  };
}

export type CreateAppointmentData = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;
