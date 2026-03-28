import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  defaultLocale,
  locales,
  LOCALE_COOKIE,
  LOCALE_REQUEST_HEADER,
  type Locale,
} from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const raw = request.cookies.get(LOCALE_COOKIE)?.value;
  let locale: Locale = defaultLocale;

  if (raw && locales.includes(raw as Locale)) {
    locale = raw as Locale;
  } else {
    const accept = request.headers.get("accept-language");
    if (accept && /^en/i.test(accept.trim())) {
      locale = "en";
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_REQUEST_HEADER, locale);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!raw || !locales.includes(raw as Locale)) {
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
