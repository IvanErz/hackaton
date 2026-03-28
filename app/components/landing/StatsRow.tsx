import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  stats: Dictionary["stats"];
};

export function StatsRow({ stats }: Props) {
  return (
    <section className="border-b border-zinc-200/80 bg-zinc-50/50 px-4 py-10 dark:border-zinc-800/80 dark:bg-zinc-950/30 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="text-3xl font-semibold tabular-nums text-foreground">{s.value}</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
