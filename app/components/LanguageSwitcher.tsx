"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, locales, type Locale } from "@/lib/i18n/config";

type Props = {
  currentLocale: Locale;
};

export function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();

  function setLocale(locale: Locale) {
    if (locale === currentLocale) return;
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${maxAge};SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-zinc-200 bg-zinc-50/80 p-0.5 text-xs font-semibold dark:border-zinc-700 dark:bg-zinc-900/60"
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const active = loc === currentLocale;
        const label = loc === "hr" ? "HR" : "EN";
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            aria-pressed={active}
            className={`min-w-[2.25rem] rounded-full px-2 py-1 transition-colors ${
              active
                ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
                : "text-zinc-600 hover:bg-zinc-200/80 hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
