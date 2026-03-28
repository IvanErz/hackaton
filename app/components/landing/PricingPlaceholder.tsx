import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  copy: Dictionary["pricing"];
};

export function PricingPlaceholder({ copy }: Props) {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-zinc-200/80 bg-zinc-50/50 px-4 py-16 dark:border-zinc-800/80 dark:bg-zinc-950/30 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{copy.title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-zinc-600 dark:text-zinc-400">{copy.body}</p>
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">{copy.footnote}</p>
      </div>
    </section>
  );
}
