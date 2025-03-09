import { onAuthStateChange } from "@/firebase/auth";
import { getUser } from "@/firebase/users";
import type { UserData } from "@/types/user";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        console.log("Firebase user:", firebaseUser);
        const userData = await getUser(firebaseUser.uid);
        console.log("User data from Firestore:", userData);
        setUser(userData);
      } else {
        console.log("No Firebase user");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === "super-admin",
    isMedecin: user?.role === "medecin",
    isInfirmier: user?.role === "infirmier",
    hasWritePermission:
      user?.role === "super-admin" || user?.role === "medecin",
  };
}
