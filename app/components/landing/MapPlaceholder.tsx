import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { ZagrebMapLoader } from "./ZagrebMapLoader";

type Props = {
  copy: Dictionary["map"];
  locations: ParkingLocation[];
};

export function MapPlaceholder({ copy, locations }: Props) {
  return (
    <section id="map" className="scroll-mt-20 border-y border-zinc-200/80 bg-zinc-50/30 px-4 py-12 dark:border-zinc-800/80 dark:bg-zinc-950/20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{copy.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{copy.subtitle}</p>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm ring-1 ring-zinc-200/60 dark:border-zinc-800 dark:ring-zinc-800/80">
          <ZagrebMapLoader
            locations={locations}
            loadingLabel={copy.loadingMap}
            freeSpotsLabel={copy.freeInPopup}
          />
        </div>
      </div>
    </section>
  );
}
