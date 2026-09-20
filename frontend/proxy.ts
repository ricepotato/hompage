import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";

const protectedRoutes = ["/protected"];

export default async function proxy(req: NextRequest) {
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);

  if (isProtectedRoute && !(await getSession())) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected"],
};
