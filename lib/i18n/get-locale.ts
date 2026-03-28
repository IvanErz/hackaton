import { cookies, headers } from "next/headers";
import {
  defaultLocale,
  locales,
  LOCALE_COOKIE,
  LOCALE_REQUEST_HEADER,
  type Locale,
} from "./config";

export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const fromMiddleware = h.get(LOCALE_REQUEST_HEADER);
  if (fromMiddleware && locales.includes(fromMiddleware as Locale)) {
    return fromMiddleware as Locale;
  }

  const jar = await cookies();
  const raw = jar.get(LOCALE_COOKIE)?.value;
  if (raw && locales.includes(raw as Locale)) {
    return raw as Locale;
  }
  return defaultLocale;
}
