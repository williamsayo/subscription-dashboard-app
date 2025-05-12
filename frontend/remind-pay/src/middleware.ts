import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const authRoutes = ["/signup", "/login", "/"];

export const middleware = async (request: NextRequest) => {
    const authToken = request.cookies.get("token")?.value;
    const secret_key = new TextEncoder().encode(process.env.JSON_SECRET_KEY);

    const isAuthenticated = authToken
        ? await jwtVerify(authToken, secret_key).catch(() => false)
        : false;

    if (!isAuthenticated && !authRoutes.includes(request.nextUrl.pathname)) {
        const loginUrl = new URL(`/login`, request.url);
        loginUrl.searchParams.set("nexturl", request.nextUrl.pathname);

        return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && authRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup", "/"],
};
