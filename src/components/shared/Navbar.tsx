"use client";

import { Button } from "@/components/shared/Button";
import { logout } from "@/firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const getNavigation = (isSuperAdmin: boolean) => {
  const baseNavigation = [
    {
      name: "Patients",
      href: "/dashboard",
      icon: UserGroupIcon,
    },
    {
      name: "Rendez-vous",
      href: "/appointments",
      icon: CalendarIcon,
    },
    {
      name: "Statistiques",
      href: "/statistics",
      icon: ChartBarIcon,
    },
  ];

  if (isSuperAdmin) {
    baseNavigation.push(
      {
        name: "Gestion des comptes",
        href: "/admin/users",
        icon: UsersIcon,
      },
      {
        name: "Logs système",
        href: "/admin/logs",
        icon: ClipboardDocumentListIcon,
      }
    );
  }

  return baseNavigation;
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSuperAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = getNavigation(isSuperAdmin);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <div className="flex-shrink-0">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
            </div>
            <div className="ml-4 text-gray-900 dark:text-white text-lg font-medium">
              Service de Pneumologie
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoading}
              className="hidden md:inline-flex"
            >
              {isLoading ? "Déconnexion..." : "Déconnexion"}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay sombre */}
        <div
          className={`absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panneau de navigation */}
        <div className="relative w-4/5 max-w-xs bg-white dark:bg-gray-800 h-full shadow-xl flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      fill
                      className="object-contain dark:invert"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    Service de Pneumologie
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoading}
                  className="w-full justify-center md:hidden"
                >
                  {isLoading ? "Déconnexion..." : "Déconnexion"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
