import { NextRequest, NextResponse } from "next/server";

// Event ID mapping
const EVENT_MAPPING: Record<number, string> = {
  1: "fcec",
  2: "craft",
  3: "sbc",
  4: "cic",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieString = request.headers.get("cookie") || "";

  // Parsing manual karena js-cookie tidak bisa langsung parse di server
  const parsedCookies: Record<string, string> = {};
  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    parsedCookies[key] = value;
  });

  const token = parsedCookies.token;
  const userCookie = parsedCookies.user;

  let isAdmin = false;
  let eventId: number | null = null;

  if (userCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      isAdmin = userData.isAdmin === true;
      eventId =
        userData.eventId !== null ? parseInt(userData.eventId, 10) : null;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  const redirectTo = (path: string) => {
    const url = new URL(path, request.url);
    return NextResponse.redirect(url);
  };

  const isEventPathValid = (path: string) => {
    if (!isAdmin || eventId === null || !EVENT_MAPPING[eventId]) return false;
    const eventName = EVENT_MAPPING[eventId];
    return path.startsWith(`/admin/${eventName}`);
  };

  // Daftar nama event dari EVENT_MAPPING
  const eventNames = Object.values(EVENT_MAPPING);

  try {
    // Cek jika user mencoba akses halaman event sebelum login
    if (eventNames.some((name) => pathname === `/${name}`) && !token) {
      console.log(`User belum login, redirect ke /login dari ${pathname}`);
      return redirectTo("/login");
    }

    if (pathname.startsWith("/dashboard") && !token) {
      console.log("User belum login, redirect ke /login dari /dashboard");
      return redirectTo("/login");
    }

    if (pathname.startsWith("/admin") && !isAdmin) {
      console.log("User bukan admin, redirect ke /dashboard dari", pathname);
      return redirectTo("/dashboard");
    }

    if (pathname === "/admin" && isAdmin) {
      if (eventId === null || !EVENT_MAPPING[eventId]) {
        console.log("Event ID tidak valid untuk admin, redirect ke /dashboard");
        return redirectTo("/dashboard");
      }
      const eventName = EVENT_MAPPING[eventId];
      console.log(`Admin redirect dari /admin ke /admin/${eventName}`);
      return redirectTo(`/admin/${eventName}`);
    }

    if (
      pathname.startsWith("/admin/") &&
      isAdmin &&
      !isEventPathValid(pathname)
    ) {
      const allowedEvent =
        eventId && EVENT_MAPPING[eventId] ? EVENT_MAPPING[eventId] : "unknown";
      console.log(
        `Admin mencoba masuk ${pathname}, hanya boleh /admin/${allowedEvent}, redirect ke /admin/${allowedEvent}`
      );
      return redirectTo(`/admin/${allowedEvent}`);
    }

    if (pathname.startsWith("/dashboard") && isAdmin) {
      if (eventId === null || !EVENT_MAPPING[eventId]) {
        console.log("Event ID tidak valid untuk admin, redirect ke /login");
        return redirectTo("/login");
      }
      const eventName = EVENT_MAPPING[eventId];
      console.log(`Admin redirect dari /dashboard ke /admin/${eventName}`);
      return redirectTo(`/admin/${eventName}`);
    }

    if ((pathname === "/login" || pathname === "/register") && token) {
      console.log(
        "User sudah login, redirect dari",
        pathname,
        "ke /dashboard atau /admin"
      );
      return redirectTo(
        isAdmin && eventId && EVENT_MAPPING[eventId]
          ? `/admin/${EVENT_MAPPING[eventId]}`
          : "/dashboard"
      );
    }

    console.log(
      `Middleware passed for ${pathname} - isAdmin: ${isAdmin}, eventId: ${eventId}`
    );
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return redirectTo("/error");
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/:event(fcec|craft|sbc|cic)",
  ],
};
