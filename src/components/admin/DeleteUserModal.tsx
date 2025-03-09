"use client";

import { Button } from "@/components/shared/Button";
import { UserData } from "@/types/user";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: UserData;
  isLoading: boolean;
}

export function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  user,
  isLoading,
}: DeleteUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Confirmer la suppression
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer le compte de{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {user.displayName}
              </span>{" "}
              ({user.email}) ? Cette action est irréversible.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Annuler
            </Button>
            <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
