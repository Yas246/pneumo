import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user, loading } = useAuth();

  console.log("Checking permissions for user:", {
    user,
    role: user?.role,
    loading,
  });

  const canCreate =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "medecin" ||
    user?.role === "prof" ||
    user?.role === "resident";

  const canEdit =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "medecin" ||
    user?.role === "prof" ||
    user?.role === "resident";

  const canArchive =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "medecin" ||
    user?.role === "prof";

  const canCreateAppointment =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "medecin" ||
    user?.role === "prof" ||
    user?.role === "resident";

  const canManageUsers =
    user?.role === "super-admin" || user?.role === "chef-service";

  const canViewResidentAppointments =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "prof";

  const canAssignDoctor =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "prof";

  const canViewAllAppointments =
    user?.role === "super-admin" ||
    user?.role === "chef-service" ||
    user?.role === "prof";

  console.log("Calculated permissions:", {
    loading,
    canCreate,
    canEdit,
    canArchive,
    canCreateAppointment,
    canManageUsers,
    canViewResidentAppointments,
    userRole: user?.role,
  });

  return {
    loading,
    canCreate,
    canEdit,
    canArchive,
    canCreateAppointment,
    canManageUsers,
    canViewResidentAppointments,
    canAssignDoctor,
    canViewAllAppointments,
  };
}
