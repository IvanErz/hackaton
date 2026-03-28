import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  copy: Dictionary["hero"];
};

export function Hero({ copy }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 bg-gradient-to-b from-emerald-50/50 to-background px-4 py-16 dark:border-zinc-800/80 dark:from-emerald-950/20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {copy.kicker}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{copy.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#spots"
            className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            {copy.ctaPrimary}
          </a>
          <a
            href="#map"
            className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-background px-8 text-sm font-semibold text-foreground transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            {copy.ctaMap}
          </a>
        </div>
      </div>
    </section>
  );
}
