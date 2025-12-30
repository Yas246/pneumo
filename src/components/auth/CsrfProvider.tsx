"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const CSRF_HEADER_NAME = "x-csrf-token";

interface CsrfContextType {
  token: string | null;
  headerName: string;
  isLoading: boolean;
  refresh: () => Promise<void>;
  error: string | null;
}

const CsrfContext = createContext<CsrfContextType | null>(null);

interface CsrfProviderProps {
  children: ReactNode;
}

export function CsrfProvider({ children }: CsrfProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [headerName] = useState<string>(CSRF_HEADER_NAME);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      setError(null);
      const response = await fetch("/api/csrf-token");

      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      const data = await response.json();
      setToken(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = async () => {
    setIsLoading(true);
    await fetchToken();
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <CsrfContext.Provider
      value={{ token, headerName, isLoading, refresh, error }}
    >
      {children}
    </CsrfContext.Provider>
  );
}

export function useCsrfToken(): CsrfContextType {
  const context = useContext(CsrfContext);

  if (!context) {
    throw new Error("useCsrfToken must be used within a CsrfProvider");
  }

  return context;
}
