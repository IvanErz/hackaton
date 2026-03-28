import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  copy: Dictionary["footer"];
};

export function Footer({ copy }: Props) {
  return (
    <footer className="border-t border-zinc-200/80 bg-background px-4 py-10 dark:border-zinc-800/80 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} {copy.copyright}
        </p>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#" className="hover:text-foreground">
            {copy.privacy}
          </a>
          <a href="#" className="hover:text-foreground">
            {copy.terms}
          </a>
          <a href="#" className="hover:text-foreground">
            {copy.contact}
          </a>
        </nav>
      </div>
    </footer>
  );
}
