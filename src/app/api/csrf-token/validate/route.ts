import { validateCsrfToken } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("x-csrf-token");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Missing token" },
        { status: 400 }
      );
    }

    const isValid = await validateCsrfToken(token);

    if (!isValid) {
      return NextResponse.json(
        { valid: false, error: "Invalid token" },
        { status: 403 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}
