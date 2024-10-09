/* eslint-disable prettier/prettier */
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getCurrentUser } from "./components/services/authServices";



const AuthRoutes = ["/login", "/register"];

const roleBaseRoute = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};

type Roles = keyof typeof roleBaseRoute;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser()

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  if (
    user?.decodedToken?.user?.role&&
    roleBaseRoute[user?.decodedToken?.user?.role as Roles]
  ) {
    const routes = roleBaseRoute[user?.decodedToken?.user?.role as Roles];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/profile/:page*", "/admin", "/login", "/register", "/newsFeed"],
};
