"use client";

import type { ParkingLocation } from "@/lib/mock-parking-spaces";
import { ZAGREB_CENTER } from "@/lib/mock-parking-spaces";
import {
  formatDistance,
  type GmpSelectEvent,
  latLngFromPlaceLocation,
  nearestGaragesForDestination,
  type PlaceAutocompleteWidget,
} from "./zagreb-map-shared";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  scriptReady: boolean;
  apiKey: string;
  locations: ParkingLocation[];
  destination: { lat: number; lng: number } | null;
  onDestinationSelected: (coords: { lat: number; lng: number }) => void;
  onFocusGarage: (loc: ParkingLocation) => void;
  searchLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searchHelper: string;
  nearestTitle: string;
  nearestHint: string;
  distanceMeters: string;
  distanceKilometers: string;
};

export function DestinationSearchPanel({
  scriptReady,
  apiKey,
  locations,
  destination,
  onDestinationSelected,
  onFocusGarage,
  searchLabel,
  searchPlaceholder,
  searchAriaLabel,
  searchHelper,
  nearestTitle,
  nearestHint,
  distanceMeters,
  distanceKilometers,
}: Props) {
  const autocompleteContainerRef = useRef<HTMLDivElement | null>(null);

  const nearestGarages = useMemo(
    () => nearestGaragesForDestination(locations, destination),
    [locations, destination]
  );

  useEffect(() => {
    if (!scriptReady || !apiKey) return;
    const container = autocompleteContainerRef.current;
    if (!container) return;

    let cancelled = false;
    const elRef: { current: google.maps.places.PlaceAutocompleteElement | null } = { current: null };

    const onGmpSelect = async (ev: Event) => {
      const { placePrediction } = ev as GmpSelectEvent;
      if (!placePrediction) return;
      const place = placePrediction.toPlace();
      await place.fetchFields({ fields: ["location", "displayName"] });
      if (cancelled) return;
      const coords = latLngFromPlaceLocation(place.location);
      if (!coords) return;
      onDestinationSelected(coords);
    };

    void (async () => {
      try {
        await google.maps.importLibrary("places");
      } catch (e) {
        console.error("Google Maps Places library failed to load", e);
        return;
      }
      if (cancelled || !container) return;

      const Ctor = google.maps.places.PlaceAutocompleteElement;
      if (!Ctor) {
        console.error("PlaceAutocompleteElement is not available");
        return;
      }

      container.replaceChildren();
      const el = new Ctor({}) as PlaceAutocompleteWidget;
      el.includedRegionCodes = ["hr"];
      el.locationBias = {
        center: { lat: ZAGREB_CENTER[0], lng: ZAGREB_CENTER[1] },
        radius: 45000,
      };
      el.id = "zagreb-destination-search";
      el.placeholder = searchPlaceholder;
      el.setAttribute("aria-label", searchAriaLabel);
      if (cancelled || !container) return;
      el.addEventListener("gmp-select", onGmpSelect as EventListener);
      container.appendChild(el);
      elRef.current = el;
    })();

    return () => {
      cancelled = true;
      if (elRef.current) {
        elRef.current.removeEventListener("gmp-select", onGmpSelect as EventListener);
        elRef.current.remove();
        elRef.current = null;
      }
      container.replaceChildren();
    };
  }, [scriptReady, apiKey, searchPlaceholder, searchAriaLabel, onDestinationSelected]);

  return (
    <div className="space-y-3">
      <fieldset className="min-w-0">
        <legend className="sr-only">{searchLabel}</legend>
        <label
          htmlFor="zagreb-destination-search"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {searchLabel}
        </label>
        <div
          ref={autocompleteContainerRef}
          className="zagreb-place-autocomplete-host rounded-xl border border-zinc-200 bg-white px-1 py-0.5 shadow-sm transition-[box-shadow] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:focus-within:border-emerald-500"
        />
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{searchHelper}</p>
      </fieldset>

      {nearestGarages.length > 0 ? (
        <div>
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{nearestTitle}</p>
          <ul className="mt-2 flex max-h-40 flex-col gap-1 overflow-y-auto sm:max-h-48">
            {nearestGarages.map(({ loc, d }) => (
              <li key={loc.id}>
                <button
                  type="button"
                  onClick={() => onFocusGarage(loc)}
                  className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-transparent px-3 py-2 text-left text-base text-foreground transition hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80 sm:text-sm"
                >
                  <span className="min-w-0 truncate font-medium">{loc.name}</span>
                  <span className="shrink-0 tabular-nums text-xs text-zinc-500">
                    {formatDistance(d, distanceMeters, distanceKilometers)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : !destination ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">{nearestHint}</p>
      ) : null}
    </div>
  );
}
