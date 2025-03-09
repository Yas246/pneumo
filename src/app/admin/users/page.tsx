"use client";

import { AdminChangePasswordModal } from "@/components/admin/AdminChangePasswordModal";
import { ChangePasswordModal } from "@/components/admin/ChangePasswordModal";
import { CreateUserModal } from "@/components/admin/CreateUserModal";
import { DeleteUserModal } from "@/components/admin/DeleteUserModal";
import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import { deleteUser, getAllUsers } from "@/firebase/users";
import { useAuth } from "@/hooks/useAuth";
import { UserData } from "@/types/user";
import { KeyIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function UsersPage() {
  const router = useRouter();
  const { loading, isSuperAdmin } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isAdminChangePasswordModalOpen, setIsAdminChangePasswordModalOpen] =
    useState(false);

  useEffect(() => {
    if (!loading && !isSuperAdmin) {
      router.push("/dashboard");
    }
  }, [loading, isSuperAdmin, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
        toast.error("Erreur lors de la récupération des utilisateurs");
      } finally {
        setLoadingUsers(false);
      }
    };

    if (isSuperAdmin) {
      fetchUsers();
    }
  }, [isSuperAdmin]);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsDeletingUser(true);
    try {
      await deleteUser(selectedUser.uid);
      setUsers((current) =>
        current.filter((user) => user.uid !== selectedUser.uid)
      );
      toast.success("Utilisateur supprimé avec succès");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setIsDeletingUser(false);
    }
  };

  if (loading || !isSuperAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Gestion des Utilisateurs
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Gérez les comptes des médecins et infirmiers de la plateforme
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsChangePasswordModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center"
                >
                  <KeyIcon className="h-4 w-4 mr-2" />
                  Changer mon mot de passe
                </Button>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center"
                >
                  <UserPlusIcon className="h-4 w-4 mr-2" />
                  Créer un utilisateur
                </Button>
              </div>
            </div>
          </div>

          <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg overflow-hidden">
            {loadingUsers ? (
              <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-800">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <>
                {/* Vue mobile */}
                <div className="block sm:hidden">
                  {users.map((user) => (
                    <div
                      key={user.uid}
                      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.displayName || "Non défini"}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {user.email}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.role === "super-admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : user.role === "medecin"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                        Créé le {new Date(user.createdAt).toLocaleDateString()}
                      </p>

                      {user.role !== "super-admin" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsAdminChangePasswordModalOpen(true);
                            }}
                            className="flex-1 group inline-flex items-center justify-center px-3 py-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-md transition-all duration-200 hover:shadow-sm"
                          >
                            <KeyIcon className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
                            <span className="text-xs font-medium">
                              Modifier MDP
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteModalOpen(true);
                            }}
                            className="flex-1 group inline-flex items-center justify-center px-3 py-2 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 rounded-md transition-all duration-200 hover:shadow-sm"
                          >
                            <TrashIcon className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
                            <span className="text-xs font-medium">
                              Supprimer
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Vue desktop */}
                <table className="hidden sm:table min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Rôle
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        Date de création
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {users.map((user) => (
                      <tr
                        key={user.uid}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                          {user.displayName || "Non défini"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === "super-admin"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                : user.role === "medecin"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {user.role !== "super-admin" && (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsAdminChangePasswordModalOpen(true);
                                }}
                                className="group inline-flex items-center px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-md transition-all duration-200 hover:shadow-sm"
                                title="Modifier le mot de passe"
                              >
                                <KeyIcon className="h-4 w-4 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
                                <span className="text-xs font-medium">
                                  Modifier MDP
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsDeleteModalOpen(true);
                                }}
                                className="group inline-flex items-center px-2 py-1.5 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 rounded-md transition-all duration-200 hover:shadow-sm"
                                title="Supprimer l'utilisateur"
                              >
                                <TrashIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </main>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={(newUser: UserData) => {
          setUsers((current) => [...current, newUser]);
          setIsCreateModalOpen(false);
        }}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />

      {selectedUser && (
        <>
          <DeleteUserModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedUser(null);
            }}
            onConfirm={handleDeleteUser}
            user={selectedUser}
            isLoading={isDeletingUser}
          />

          <AdminChangePasswordModal
            isOpen={isAdminChangePasswordModalOpen}
            onClose={() => {
              setIsAdminChangePasswordModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          />
        </>
      )}
    </div>
  );
}
