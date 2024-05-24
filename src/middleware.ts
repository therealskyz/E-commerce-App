import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  //   const authHeader =
  //     req.headers.get("Authorization") || req.headers.get("authorization");

  //   if (authHeader == null) return false;

  //   const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
  //     .toString()
  //     .split(":");

  //   console.log(username, password);

  //   return
  return Promise.resolve(false);
}

export const config = {
  matcher: "/admin/:path*",
};
