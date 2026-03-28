import Link from "next/link";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  locale: Locale;
  copy: Dictionary["header"];
};

export function Header({ locale, copy }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white dark:bg-emerald-500"
            aria-hidden
          >
            P
          </span>
          <span className="hidden sm:inline">{copy.brand}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
          <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:gap-6">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              {copy.nav.howItWorks}
            </a>
            <a href="#spots" className="transition-colors hover:text-foreground">
              {copy.nav.freeSpaces}
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              {copy.nav.pricing}
            </a>
          </nav>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  );
}
