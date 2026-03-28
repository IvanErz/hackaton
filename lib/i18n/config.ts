export const locales = ["hr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hr";

export const LOCALE_COOKIE = "parkspot_locale";

/** Set by middleware so Server Components agree with inferred locale before cookie is stored. */
export const LOCALE_REQUEST_HEADER = "x-parkspot-locale";
