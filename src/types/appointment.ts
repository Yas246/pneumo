import { AppointmentPatient } from "./patient";
import { UserRole } from "./user";

export interface Appointment {
  id?: string;
  patientId: string;
  patient: AppointmentPatient;
  date: string;
  time: string;
  duration: number;
  type: "consultation" | "suivi" | "examen";
  notes?: string;
  status: "scheduled" | "completed" | "cancelled";
  creatorId: string;
  creatorRole: UserRole;
  creatorName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentWithPatient extends Appointment {
  patient: AppointmentPatient;
  doctor?: {
    displayName: string;
    role: UserRole;
  };
}

export type CreateAppointmentData = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt" | "patient"
>;
