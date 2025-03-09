"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { onAuthStateChange } from "@/firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers le dashboard si l'utilisateur est déjà connecté
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-md w-full space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                className="object-contain dark:invert"
                priority
              />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Service de Pneumologie
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Gestion des Dossiers Patients
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-soft dark:shadow-gray-800 rounded-xl sm:px-10 transition-all">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
