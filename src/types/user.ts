export type UserRole =
  | "super-admin"
  | "chef-service"
  | "medecin"
  | "prof"
  | "resident"
  | "infirmier";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
}

export type LogActionType =
  | "CREATION_COMPTE"
  | "SUPPRESSION_COMPTE"
  | "CHANGEMENT_MDP"
  | "CREATION_RDV"
  | "MODIFICATION_RDV"
  | "SUPPRESSION_RDV"
  | "REASSIGNMENT_RDV"
  | "CREATION_DOSSIER"
  | "MODIFICATION_DOSSIER"
  | "ARCHIVAGE_DOSSIER"
  | "DESARCHIVAGE_DOSSIER";

export interface CreateUserData {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
}

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

// Type pour créer un log (sans id ni timestamp, avec champs optionnels)
export type CreateLogEntry = {
  userId: string;
  userEmail?: string;
  userRole?: UserRole;
  action: LogActionType;
  details: string;
  targetId?: string;
  targetType?: string;
};
