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
  missingApiKeyMessage: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searchHelper: string;
  nearestTitle: string;
  nearestHint: string;
  distanceMeters: string;
  distanceKilometers: string;
};

export function ZagrebMapLoader({
  locations,
  loadingLabel,
  freeSpotsLabel,
  capacityLabel,
  mockEstimateNote,
  missingApiKeyMessage,
  searchLabel,
  searchPlaceholder,
  searchAriaLabel,
  searchHelper,
  nearestTitle,
  nearestHint,
  distanceMeters,
  distanceKilometers,
}: Props) {
  const ZagrebMapDynamic = useMemo(
    () =>
      dynamic(
        () => import("./ZagrebMapSection").then((mod) => mod.ZagrebMapSection),
        {
          ssr: false,
          loading: () => (
            <div
              className="flex min-h-[280px] w-full flex-col gap-6"
              role="status"
              aria-live="polite"
            >
              <span className="sr-only">{loadingLabel}</span>
              <div
                className="h-28 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50"
                aria-hidden
              />
              <div
                className="min-h-[min(56vh,420px)] flex-1 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900/50 sm:min-h-[min(50vh,480px)]"
                aria-hidden
              />
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
      missingApiKeyMessage={missingApiKeyMessage}
      searchLabel={searchLabel}
      searchPlaceholder={searchPlaceholder}
      searchAriaLabel={searchAriaLabel}
      searchHelper={searchHelper}
      nearestTitle={nearestTitle}
      nearestHint={nearestHint}
      distanceMeters={distanceMeters}
      distanceKilometers={distanceKilometers}
    />
  );
}
