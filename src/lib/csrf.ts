import { cookies } from "next/headers";

const CSRF_COOKIE_NAME = "csrf_token";
const CSRF_HEADER_NAME = "x-csrf-token";
const TOKEN_LENGTH = 32;
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

async function generateRandomToken(): Promise<string> {
  const array = new Uint8Array(TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function generateCsrfToken(): Promise<string> {
  const token = await generateRandomToken();
  const hashedToken = await hashToken(token);
  const cookieStore = await cookies();

  cookieStore.set(CSRF_COOKIE_NAME, hashedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_EXPIRY / 1000,
    path: "/",
  });

  return token;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  const cookieStore = await cookies();
  const storedHashedToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!storedHashedToken) {
    return false;
  }

  const hashedInputToken = await hashToken(token);

  const timingSafeEqual = (a: string, b: string): boolean => {
    if (a.length !== b.length) {
      return false;
    }
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  };

  return timingSafeEqual(hashedInputToken, storedHashedToken);
}

export async function csrfProtect(request: Request): Promise<void> {
  const method = request.method.toUpperCase();

  if (
    method === "GET" ||
    method === "HEAD" ||
    method === "OPTIONS" ||
    method === "TRACE"
  ) {
    return;
  }

  const token = request.headers.get(CSRF_HEADER_NAME);

  if (!token) {
    throw new CsrfError("Missing CSRF token");
  }

  const isValid = await validateCsrfToken(token);

  if (!isValid) {
    throw new CsrfError("Invalid CSRF token");
  }
}

export class CsrfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CsrfError";
  }
}

export function getCsrfHeaderName(): string {
  return CSRF_HEADER_NAME;
}

export function getCsrfCookieName(): string {
  return CSRF_COOKIE_NAME;
}

export async function clearCsrfToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CSRF_COOKIE_NAME);
}

export async function refreshCsrfToken(): Promise<string> {
  await clearCsrfToken();
  return generateCsrfToken();
}

export async function getCsrfTokenFromRequest(
  request: Request
): Promise<string | null> {
  return request.headers.get(CSRF_HEADER_NAME);
}

export function isCsrfProtectedRoute(
  pathname: string,
  publicRoutes: string[] = ["/api/csrf-token"]
): boolean {
  if (publicRoutes.includes(pathname)) {
    return false;
  }

  if (pathname.startsWith("/api/")) {
    return true;
  }

  return false;
}

export async function validateCsrfFromRequest(
  request: Request,
  publicRoutes: string[] = ["/api/csrf-token"]
): Promise<boolean> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!isCsrfProtectedRoute(pathname, publicRoutes)) {
    return true;
  }

  const method = request.method.toUpperCase();

  if (
    method === "GET" ||
    method === "HEAD" ||
    method === "OPTIONS" ||
    method === "TRACE"
  ) {
    return true;
  }

  const token = await getCsrfTokenFromRequest(request);

  if (!token) {
    return false;
  }

  return validateCsrfToken(token);
}
