import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  grid: Dictionary["grid"];
  locations: ParkingLocation[];
};

function StatusBadge({
  status,
  labels,
}: {
  status: ParkingLocation["status"];
  labels: Pick<Dictionary["grid"], "badgeOpen" | "badgeLimited">;
}) {
  if (status === "open") {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
        {labels.badgeOpen}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950/80 dark:text-amber-200">
      {labels.badgeLimited}
    </span>
  );
}

export function FreeSpacesGrid({ grid, locations }: Props) {
  const badgeLabels = { badgeOpen: grid.badgeOpen, badgeLimited: grid.badgeLimited };

  return (
    <section id="spots" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{grid.title}</h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">{grid.subtitle}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {locations.map((loc) => (
            <li
              key={loc.id}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-background p-5 shadow-sm transition hover:border-emerald-300/80 hover:shadow-md dark:border-zinc-800 dark:hover:border-emerald-800/60"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-snug text-foreground">{loc.name}</h3>
                <StatusBadge status={loc.status} labels={badgeLabels} />
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{loc.address}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                  {loc.freeCount}
                </span>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{grid.freeLabel}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-zinc-100 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <span>{loc.distanceLabel}</span>
                <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
                  ·
                </span>
                <span>{loc.pricePerHour}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
