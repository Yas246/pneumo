import { generateCsrfToken, getCsrfHeaderName } from "@/lib/csrf";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await generateCsrfToken();
    return NextResponse.json(
      { token, headerName: getCsrfHeaderName() },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
