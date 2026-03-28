"use client";

import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import dynamic from "next/dynamic";
import { useMemo } from "react";

type Props = {
  locations: ParkingLocation[];
  loadingLabel: string;
  freeSpotsLabel: string;
  capacityLabel: string;
  mockEstimateNote: string;
};

export function ZagrebMapLoader({
  locations,
  loadingLabel,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
}: Props) {
  const ZagrebMapDynamic = useMemo(
    () =>
      dynamic(
        () => import("./ZagrebMap").then((mod) => mod.ZagrebMap),
        {
          ssr: false,
          loading: () => (
            <div
              className="flex h-[min(56vh,420px)] min-h-[240px] w-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100/80 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 sm:h-[min(50vh,480px)] sm:min-h-[280px]"
              role="status"
              aria-live="polite"
            >
              {loadingLabel}
            </div>
          ),
        }
      ),
    [loadingLabel]
  );

  return (
    <ZagrebMapDynamic
      locations={locations}
      freeSpotsLabel={freeSpotsLabel}
      capacityLabel={capacityLabel}
      mockEstimateNote={mockEstimateNote}
    />
  );
}
