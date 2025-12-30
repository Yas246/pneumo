import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/api/csrf-token",
  "/api/patients/search",
  "/api/images",
  "/api/init-admin",
  "/api/csrf-token/validate",
];

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    const method = request.method.toUpperCase();

    if (
      method === "GET" ||
      method === "HEAD" ||
      method === "OPTIONS" ||
      method === "TRACE"
    ) {
      return NextResponse.next();
    }

    const token = request.headers.get("x-csrf-token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing CSRF token" },
        { status: 403 }
      );
    }

    const validationResponse = await fetch(
      new URL("/api/csrf-token/validate", request.url),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": token,
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!validationResponse.ok) {
      return NextResponse.json(
        { error: "Invalid CSRF token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
