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
