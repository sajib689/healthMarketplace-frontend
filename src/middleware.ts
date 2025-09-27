import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const url = request.nextUrl.clone();
  const token = request.cookies.get("token")?.value;
  // console.log(token);
  if (!token) {
    // Redirect to home if no token is present
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}

// Config to specify routes where this middleware should apply
export const config = {
  matcher: [
    // "/add-consultation",
    // "/add-jobs",
    // "/add-projects",
    // "/applied-jobs",
    // "/bid-requests",
    // "/book-consultation",
    // "/company",
    // "/company-profile",
    // "/consultation",
    // "/consultation/:path",
    // "/favorite",
    // "/job-list",
    // "/job-list/:path",
    // "/jobs",
    // "/messaging",
    // "/jobs/:path",
    // "/my-consultation",
    // "/my-project",
    // "/profile",
    // "/project",
  ],
};
