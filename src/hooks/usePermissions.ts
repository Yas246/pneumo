import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user, loading } = useAuth();

  console.log("Checking permissions for user:", {
    user,
    role: user?.role,
    loading,
  });

  const canCreate = user?.role === "super-admin" || user?.role === "medecin";
  const canEdit = user?.role === "super-admin" || user?.role === "medecin";
  const canArchive = user?.role === "super-admin" || user?.role === "medecin";
  const canCreateAppointment =
    user?.role === "super-admin" || user?.role === "medecin";

  console.log("Calculated permissions:", {
    loading,
    canCreate,
    canEdit,
    canArchive,
    canCreateAppointment,
    userRole: user?.role,
  });

  return {
    loading,
    canCreate,
    canEdit,
    canArchive,
    canCreateAppointment,
  };
}
