export type UserRole = "medecin" | "infirmier" | "super-admin";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
}

export interface CreateUserData extends Omit<UserData, "uid" | "createdAt"> {
  password: string;
  createdAt: Date;
}

export type LogActionType =
  | "CREATION_COMPTE"
  | "SUPPRESSION_COMPTE"
  | "CHANGEMENT_MDP"
  | "CREATION_RDV"
  | "MODIFICATION_RDV"
  | "SUPPRESSION_RDV"
  | "CREATION_DOSSIER"
  | "MODIFICATION_DOSSIER"
  | "ARCHIVAGE_DOSSIER"
  | "DESARCHIVAGE_DOSSIER";

export interface LogEntry {
  id: string;
  userId: string;
  userEmail: string;
  userRole: UserRole;
  action: LogActionType;
  details: string;
  timestamp: Date;
  targetId?: string;
  targetType?: string;
}
